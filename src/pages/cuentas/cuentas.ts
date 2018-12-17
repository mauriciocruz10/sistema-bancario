import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, ActionSheetButton, AlertController } from 'ionic-angular';
import { AppService } from '../../app/services/app.service';
import { Globals } from '../../app/globals';
import { Cuenta, Tarjeta } from './cuentas.model';

/**
 * @class Página de cuentas que tiene el usuario
 */
@IonicPage()
@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html',
})
export class CuentasPage {

  /**
   * @param {boolean} showFormulario Variable usada para mostrar/ocultar el formulario de solicitud de cuenta nueva
   */
  public showFormulario: boolean;

  /**
   * @param {Cuenta} cuentas Array de cuentas que pueden solicitarse
   */
  public cuentas: Cuenta[];

  /**
   * @param {Tarjeta} tarjeta Cuenta seleccionada por el usuario
   */
  public tarjeta: Tarjeta;

  /**
   * 
   * @param navCtrl Controlador para navegar entre páginas
   * @param appService Servicio para realizar peticiones http
   * @param actionSheetCtrl Controlador para mostrar las opciones de cuentas disponibles
   * @param alertCtrl Controlador de alerta usado para avisarle al cliente que la solicitud fue exitosa
   */
  constructor(public navCtrl: NavController,
    private appService: AppService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
    this.showFormulario = false;
    this.cuentas = new Array<Cuenta>();
  }

  /**
   * @function ionViewDidLoad Función ejecutada al termino de la carga del componente
   * @returns {void}
   */
  ionViewDidLoad() {
    this.consultaCuentas();
  }

  /**
   * @function consultaCuentas Función para consultar en el servicio las cuentas disponibles para solicitarse
   * @returns {void}
   */
  consultaCuentas(): any {
    this.appService.requestHTTPGet(Globals.URL_CUENTAS).subscribe(
      cuentas => {
        this.cuentas = cuentas.body.response;
      },
      error => {
      }
    )
  }

  /**
   * @function onClickNuevaCuenta Función ejecutada al hacer click en el botón de solicitud de cuenta nueva
   * @returns {void}
   */
  onClickNuevaCuenta() {

    this.appService.requestHTTPGet(Globals.URL_CUENTAS_REGISTRO).subscribe(cuentasRegistro => {
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Selecciona la cuenta que quieres solicitar',
        buttons: this.createButtons(cuentasRegistro.body.response.type_cards)
      });
      actionSheet.present();
    },
      error => {

      });
  }

  /**
   * @function createButtons Función usada para retornar el array de botones que tendrá el componente ActionSheetController
   * @param tarjetas Valores de una cuenta
   */
  createButtons(tarjetas: any): any {
    let buttons = [];
    tarjetas.forEach(element => {
      let button: ActionSheetButton = {
        text: element.name,
        handler: () => {
          this.tarjeta = element;
        }
      };
      buttons.push(button);
    });
    return buttons;
  }

  /**
   * @function onClickEnviar Función ejecutada al dar click en el botón enviar solicitud
   */
  onClickEnviar() {

    let body = {
      "userId": JSON.parse(sessionStorage.getItem('datos')).id,
      "type": this.tarjeta.type,
      "name": this.tarjeta.name
    };

    this.appService.requestHTTP(body, Globals.URL_CUENTAS).subscribe(cuenta => {
      this.showAlert(cuenta.body.success);
    },
      error => {

      });
  }

  /**
   * @function showAlert Función que arroja una alerta al usuario
   * @param mensaje Mensaje a mostrar en la alerta
   */
  showAlert(mensaje:string) {
    const alert = this.alertCtrl.create({
      title: 'Solicitud enviada!',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
}
