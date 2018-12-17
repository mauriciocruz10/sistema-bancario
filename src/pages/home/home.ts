import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/services/app.service';
import { Globals } from '../../app/globals';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * @class Página principal de inicio de sesión o de registro del usuario
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * @param {boolean} disabledButton Variable usada para habilitar/deshabilitar el botón de inicio de sesión
   */
  public disabledButton: boolean;

  /**
   * @param {boolean} showErrorLogin Variable usada para mostrar/ocultar el mensaje de error si falla el inicio de sesión
   */
  public showErrorLogin:boolean;

  private email: string;
  private password: string;

  /**
   * 
   * @param navCtrl Controlador para manejar la navegación de la página
   * @param appService Servicio para realizar peticiones http
   */
  constructor(public navCtrl: NavController,
    private appService: AppService) {
    this.disabledButton = true;
    this.email = "";
    this.password = "";
    this.showErrorLogin = false;
  }

  /**
   * @function onClickIniciarSesion Ejecuta el inicio de sesión cuando el usuario hace click en el boton de inicio de sesión
   * @returns {void}
   */
  onClickIniciarSesion() {

    let body = {
      "email": this.email,
      "password": this.password
    };

    this.appService.requestHTTP(body, Globals.URL_INICIO_SESION).subscribe(
      inicioSesion => {
        const helper = new JwtHelperService();
        sessionStorage.setItem('token', inicioSesion.body.token);
        sessionStorage.setItem('datos', JSON.stringify(helper.decodeToken(inicioSesion.body.token)));
        this.navCtrl.push('CuentasPage');
      },
      error => {
        if(error.status == 404){
          this.showErrorLogin = true;
        }
      }
    )
  }

  /**
   * @function onChangeEmail Función ejecutada al cambiar de valor el campo email
   * @param value Email capturado
   * @returns {void}
   */
  onChangeEmail(value) {
    this.email = value;
    this.validarCampos();
  }

  /**
   * @function onChangePass Función ejecutada al cambiar de valor el password
   * @param value Password capturada
   * @returns {void}
   */
  onChangePass(value) {
    this.password = value;
    this.validarCampos();
  }

  /**
   * @function validarCampos Función que deshabilita el botón de inicio de sesión cuando los campos de email y password no están vacios
   * @returns {void}
   */
  validarCampos() {
    this.showErrorLogin = false;
    if (this.email != "" && this.password != "") {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }

  /**
   * @function onClickRegistrarse Función para cambiar a la pantalla de registro
   * @returns {void}
   */
  onClickRegistrarse(){
    this.navCtrl.push('RegistroPage');
  }

}
