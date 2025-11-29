import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  // Simular base de datos de emails registrados
  emailsRegistrados = ['admin@example.com', 'usuario@example.com', 'test@example.com'];

  validarEmailUnico(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      // Simular llamada a API con delay de 1 segundo
      return of(this.emailsRegistrados.includes(control.value)).pipe(
        delay(1000),
        map(existe => existe ? { emailExiste: true } : null)
      );
    };
  }

  validarUsernameDisponible(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      // Simular validación: usernames que comienzan con 'admin' están reservados
      return of(control.value.toLowerCase().startsWith('admin')).pipe(
        delay(800),
        map(reservado => reservado ? { usernameReservado: true } : null)
      );
    };
  }
}
