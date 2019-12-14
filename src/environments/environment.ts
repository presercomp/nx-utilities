export const environment = {
    production: false,    
    apiURL: '',    
    segEsperaInactivo: 300, /* 900 segundos = 15 minutos */
    segEsperaBloqueo: 30,
    encryptSecretKey: 'Th3Gh0$t1nTh3$heLl',
    dtOptions : {
      autoWidth: true,
      responsive: true,
      pagingType: 'simple',
      pageLength: 5,
      info: true,
      scrollCollapse: true,
      search: false,
      language: {
        url: 'assets/lang/dataTables.espanol.lang'
      }
    }
  };
  