import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  facturaForm!: FormGroup;
  impuesto = 0.21;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', [Validators.required, this.validarNumeroFactura.bind(this)]],
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      detalles: this.fb.array([])
    });
  }


  validarNumeroFactura(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;
    // Validar formato: FAC-XXXXXX
    const regex = /^FAC-\d{6}$/;
    return regex.test(valor) ? null : { formatoFactura: true };
  }

  get detalles() {
    return this.facturaForm.get('detalles') as FormArray;
  }

  private crearDetalle(): FormGroup {
    return this.fb.group({
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [null, [Validators.required, Validators.min(0.01)]],
      descuento: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  agregarDetalle() {
    this.detalles.push(this.crearDetalle());
  }

  eliminarDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  calcularSubtotal(): number {
    return this.detalles.controls.reduce((total, detalle) => {
      const cantidad = Number(detalle.get('cantidad')?.value) || 0;
      const precio = Number(detalle.get('precioUnitario')?.value) || 0;
      const descuento = Number(detalle.get('descuento')?.value) || 0;
      const descuentoAplicado = (precio * cantidad * descuento) / 100;
      return total + (precio * cantidad - descuentoAplicado);
    }, 0);
  }

  calcularIVA(): number {
    return this.calcularSubtotal() * this.impuesto;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIVA();
  }

  onSubmit() {
    if (this.facturaForm.valid && this.detalles.length > 0) {
      const factura = {
        ...this.facturaForm.value,
        subtotal: this.calcularSubtotal(),
        iva: this.calcularIVA(),
        total: this.calcularTotal()
      };
      console.log('Factura:', factura);
      alert('Factura guardada correctamente');
    } else {
      alert('Completa todos los campos requeridos y agrega al menos un detalle');
    }
  }
}
