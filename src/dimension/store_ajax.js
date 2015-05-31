// COSAS DE INTERES 
// EN LA LLAMADA PUT EL ITEM QUE LLEGA ES UN JSON DE LA SIGUIENTE FORMA
// {
//   value:"IDENTIFICADOR",
//   description:"DESCRIPCION"
//  }
//EN LA LLAMADA GET SE ESPERA UNA LISTA DE OBJETOS JSON CON LA MISMA ESTRUCTURA QUE EL ANTERIOR
// EN POST Y EN PUT LA VUELTA ES EL OBJETO INSERTADO O MODIFICADO CON LA MISMA ESTRUCTURA QUE EL ANTERIOR
// EL DELETE NO ESPERA NINGUN DATO YA QUE SOLO SE BORRA (HAY QUE RELLENARLO)
function Store($http){

           return {get:function(callback){
                       $http.get('rellenarlo')
                           .success(function(data) {
                               for (var index=0;index<data.length;index++)
                      	           callback(data[index]);
                            })
                   },
                   insert:function(description,callback){
                        $http.post('rellenarlo')
                           .success(function(data) {
                                 callback(data);
                            })

                   },
                   modify:function(item,callback){
                       $http.put('rellenarlo')
                             .success(function(data) {
                                 callback(data);
                              })
                   },
                   delete:function(id,callback){
                      $http.delete('rellenarlo')
                              .success(function() {
                                 callback();
                              })
                   }

           }

}