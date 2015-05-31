function Store(){

      var _elements = [];

           return {get:function(callback){

                      for (var index=0;index<_elements.length;index++)
                      	  callback(_elements[index]);
                   },
                   insert:function(description,callback){
                    var data = {value:''.concat(_elements.length+1),description:description};
                        _elements.push(data);
                        callback(data);
                   },
                   modify:function(item,callback){
                    var pos =0;
                      for (var i=0;i<_elements.length;i++)
                        if (_elements[i].value===item.value){
                             _elements[i]=item;
                             pos=i;
                          }
                      callback(_elements[pos]);
                   },
                   delete:function(id,callback){

                      var newDimensions = _elements.filter(function(element){
                               return element.value!=id
                            });
                      for (;_elements.length>0;_elements.pop());
                      for (var index=0;index<newDimensions.length;_elements.push(newDimensions[index++]));
                      callback();
                   }
           }

}