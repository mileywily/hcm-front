/* Desarrollo */

// ng build --prod --aot=true --buildOptimizer=true
//   apiUrl: 'http://localhost/hcm-back/public/index.php/api/',
//apiUrl: 'http://sirdevapcser01.sidor.net/hcm-back/public/index.php/api/',

/* Producción */



export const environment = {
  production: true,
  
  apiUrl: 'http://xxxxxxxxxxxxxx/hcm-back/public/index.php/api/',
  apiUrlPermanencia: 'http://xxxxxxxxxxxxxx/permanencias-sql-back/public/index.php/api/',
  apiUrlSeguridad: 'http://xxxxxxxxxxxxxx/seguridad-back/public/index.php/api/',
  apiUrlLDAP: 'http://xxxxxxxxxxxxxx/ldap-back/public/index.php/api/',
  apiUrlDocumentation: 'http://xxxxxxxxxxxxxx/manuales/',
  apiUrlCargaFamiliar: 'http://xxxxxxxxxxxxxx/beneficiarios-siss-back/public/index.php/api/',
  apiUrlSiss: 'http://xxxxxxxxxxxxxx/beneficiarios-siss-back/public/index.php/api/',
};

