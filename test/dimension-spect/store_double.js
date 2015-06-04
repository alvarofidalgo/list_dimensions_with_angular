function Store($timeout){

          $timeout =  $timeout  || setTimeout;
           return {elements:[],
                   get:function(callback){

                    var that=this;
                    $timeout(function(){
                      for (var index=0;index<that.elements.length;index++)
                      	  callback(that.elements[index]);

                      },10);
                   },
                   insert:function(description,callback){
                    var that=this,
                        data = {value:''.concat(that.elements.length+1),description:description};
                        $timeout(function(){
                           that.elements.push(data);
                            callback(data);
                          },1);
                   },
                   modify:function(id,description,callback){
                    var pos =0,that=this;
                    $timeout(function(){
                      for (var i=0;i<that.elements.length;i++)
                        if (that.elements[i].value===id){
                             that.elements[i]={value:id,
                                               description:description};
                             pos=i;
                          }
                      callback(that.elements[pos]);
                    },1);
                   },
                   delete:function(id,callback){
                     var that=this;
                     $timeout(function(){
                        newDimensions = that.elements.filter(function(element){
                               return element.value!=id
                            });
                      for (;that.elements.length>0;that.elements.pop());
                      for (var index=0;index<newDimensions.length;that.elements.push(newDimensions[index++]));
                      callback();
                    },1);

                   }
           }

}