function DimensionItem(item,type){
    type= type  || 'modify';
	this.toDTO = function(){
		return {id:item.value,
		        description:item.description,
		        type:type
		        }
	}
}

function DimensionsModel(store){

    function parserToDimensionItem(callback){

    	  return function (dimensionElement){
    	  	       callback(new DimensionItem(dimensionElement));
    	  }
    }

     

	return {
		    buildDimensionItem:function(id,description,type){
               return new DimensionItem({
               	                         value:id,
               	                         description:description
               	                         },type)
	        },
	        changeTypeItem:function(item,callback){
                    callback(item);
	        },
		    forEach:function(callback){
                    store.get(parserToDimensionItem(callback));
	        },
	        insert:function(description,callback){
                    store.insert(description,parserToDimensionItem(callback));
	        },
	        modify:function(itemModify,callback){
	        	  store.modify(itemModify.id,itemModify.description,parserToDimensionItem(callback));
	        },
	        delete:function(id,callback){
	        	store.delete(id,callback)
	        }
	   }
}