import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Actualiza esta importación
import { environment } from 'src/environments/environment.prod';
interface FormularioData {
  [key: string]: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  ultimaFechaEnvio: string = '';  // Almacena la fecha del último envío
  correoInvalido: boolean = false;  // Indica si el correo es inválido
  formFields = [
    { id: 'name', type: 'text', placeholder: 'Nombre' },
    { id: 'email', type: 'email', placeholder: 'E-MAIL' },
    { id: 'phone', type: 'tel', placeholder: 'Numero' },
    { id: 'message', type: 'textarea', placeholder: 'Mensaje' }
  ];

  formulario: FormGroup = new FormGroup({});
  formularioData: FormularioData = { name: '', email: '', phone: '', message: '' };
  correoEnviado: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm() {
    if (this.formulario.valid) {
      this.enviarCorreo(this.formulario.value);
    } else {
      console.error('Formulario inválido. Por favor, complete correctamente todos los campos.');
    }
  }
  enviarCorreo(formularioData: FormularioData) {
    
    this.http.post(environment.apiUrl, {
      name: formularioData['name'],
      email: formularioData['email'],
      message: formularioData['message'],
      phone: formularioData['phone']
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        console.log('Correo enviado:', response);
        this.correoEnviado = true;  // Marcar el correo como enviado
      },
      error: (error: any) => {
        console.error('Error al enviar el correo:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Cuerpo de la respuesta:', error.error);
        }
      }
    });
  }
}