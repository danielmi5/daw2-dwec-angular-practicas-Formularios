import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  usuariosRegistrados: any[] = [];
  mensajeExito: string = '';
  contraseniasCoinciden: boolean = false;

  comprobarContrasenias() {
    const contrasenia = this.usuario.password || '';
    const contrasenia2 = this.usuario.confirmPassword || '';
    this.contraseniasCoinciden = !!(contrasenia && contrasenia2 && contrasenia !== contrasenia2);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.comprobarContrasenias();
      if (this.contraseniasCoinciden) {
        alert('Las contraseñas no coinciden');
        return;
      }

      this.usuariosRegistrados.push({...this.usuario});
      this.mensajeExito = `¡Bienvenido, ${this.usuario.nombre}!`;
      form.resetForm();
      this.contraseniasCoinciden = false;
      console.log('Usuarios registrados:', this.usuariosRegistrados);
    }
  }
}
