export class Globals {

/**
 * @constant {string} URL_INICIO_SESION URL del servicio que valida el inicio de sesion del usuario
 */
public static readonly URL_INICIO_SESION = 'https://mighty-refuge-81707.herokuapp.com/api/auth/user/authenticate';

/**
 * @constant {string} URL_REGISTRO URL del servicio que registrará los nuevos usuarios
 */
public static readonly URL_REGISTRO = 'https://mighty-refuge-81707.herokuapp.com/api/auth/user/create';

/**
 * @constant {string} URL_CUENTAS URL de las cuentas que tiene el usuario
 */
public static readonly URL_CUENTAS = 'https://mighty-refuge-81707.herokuapp.com/api/accounts';

/**
 * @constant {string} URL_CUENTAS_REGISTRO URL de las cuentas que puede solicitar un usuario nuevo
 */
public static readonly URL_CUENTAS_REGISTRO = 'https://mighty-refuge-81707.herokuapp.com/api/catalogs/cards';

}