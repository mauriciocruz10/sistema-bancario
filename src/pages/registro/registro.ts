import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AppService } from '../../app/services/app.service';
import { Globals } from '../../app/globals';

/**
 * @class Página de registro de usuario
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  private nombre:string;
  private apellido:string;
  private email:string;
  private password:string;

  /**
   * @param {boolean} disabledButton Variable para habilitar/deshabilitar el botón de registro
   */
  public disabledButton:boolean;

  /**
   * @param {boolean} showErrorRegistro Variable usada para mostrar/ocultar el mensaje de error si falla el registro
   */
  public showErrorRegistro:boolean;

  /**
   * @param {string} errorRegistroLabel Variable usada para imprimir el mensaje de error si falla el registro
   */
  public errorRegistroLabel:string;

  /**
   * 
   * @param navCtrl Controlador para navegar entre las páginas
   * @param appService Servicio para realizar peticiones http
   */
  constructor(public navCtrl: NavController, 
    private appService:AppService) {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.password = '';
    this.disabledButton = true;
    this.showErrorRegistro = false;
    this.errorRegistroLabel = '';
  }

  /**
   * @function onChangeNombre Función ejecutada cuando cambia el valor del nombre
   * @param nombre Nombre capturado
   */
  onChangeNombre(nombre:string){
    this.validarCampos();
    this.nombre = nombre;
  }

    /**
   * @function onChangeApellido Función ejecutada cuando cambia el valor del apellido
   * @param apellido Apellido capturado
   */
  onChangeApellido(apellido:string){
    this.validarCampos();
    this.apellido = apellido;
  }

    /**
   * @function onChangeEmail Función ejecutada cuando cambia el valor del email
   * @param email Email capturado
   */
  onChangeEmail(email:string){
    this.validarCampos();
    this.email = email;
  }

    /**
   * @function onChangePassword Función ejecutada cuando cambia el valor del password
   * @param password Password capturado
   */
  onChangePassword(password:string){
    this.validarCampos();
    this.password = password;
  }

  /**
   * @function validarCampos Función para deshabilitar el botón de registro cuando todos los campos esten llenos
   * @returns {void}
   */
  validarCampos() {
    this.showErrorRegistro = false;
    if (this.email != "" && this.password != "" && this.nombre != "" && this.apellido != "") {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }

  /**
   * @function onClickRegistrame Función ejecutada al dar click en registrarme
   * @returns {void}
   */
  onClickRegistrame(){
    let body = {
      "email": this.email,
      "firstname": this.nombre,
      "lastname": this.apellido,
      "password": this.password
      }
    
      this.appService.requestHTTP(body, Globals.URL_REGISTRO).subscribe(
        registro => {
          if(registro.status == 202){
            this.errorRegistroLabel = registro.body.success;
            this.showErrorRegistro = true;
          }
        },
        error => {
          this.errorRegistroLabel = error.error.succes;
          this.showErrorRegistro = true;
        }
      );
  }

}
