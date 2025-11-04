/* Desarrollo */

// ng build --prod --aot=true --buildOptimizer=true
//   apiUrl: 'http://localhost/hcm-back/public/index.php/api/',
//apiUrl: 'http://sirdevapcser01.sidor.net/hcm-back/public/index.php/api/',

/*export const environment = {
  production: true,
  apiUrl: 'http://sirdevapcser01.sidor.net/hcm-back/public/index.php/api/',
  apiUrlLDAP: 'http://sirprdsvvapc21.sidor.net/ldap-back/public/index.php/api/',
  apiUrlPermanencia: 'http://vmwdcon1.sidor.net/permanencias-sql-back/public/index.php/api/',
  apiUrlSeguridad: 'http://sirprdsvvapc21.sidor.net/seguridad-back/public/index.php/api/',
  apiUrlCargaFamiliar: 'http://sirdevapcser01.sidor.net/beneficiarios-siss-back/public/index.php/api/',
  apiUrlSiss: 'http://sirdevapcser01.sidor.net/beneficiarios-siss-back/public/index.php/api/',
  
  

};*/



/* Producción */



export const environment = {
  production: true,
  
  apiUrl: 'http://vmwpser1.sidor.net/hcm-back/public/index.php/api/',
  apiUrlPermanencia: 'http://vmwpcon1.sidor.net/permanencias-sql-back/public/index.php/api/',
  apiUrlSeguridad: 'http://sirprdsvvapc21.sidor.net/seguridad-back/public/index.php/api/',
  apiUrlLDAP: 'http://sirprdsvvapc21.sidor.net/ldap-back/public/index.php/api/',
  apiUrlDocumentation: 'http://vmwpser1.sidor.net/manuales/',
  apiUrlCargaFamiliar: 'http://vmwpser1.sidor.net/beneficiarios-siss-back/public/index.php/api/',
  apiUrlSiss: 'http://vmwpser1.sidor.net/beneficiarios-siss-back/public/index.php/api/',
};

