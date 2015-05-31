function DimensionItem(item){

	this.toDTO = function(){
		return {id:item.value,
		        description:item.description,
		        type:"modify",
		        enabledDescription:false
		        }
	}
}

function DimensionsModel(store){

    function parserToDimensionItem(callback){
    	  return function (dimensionElement){
    	  	       callback(new DimensionItem(dimensionElement));
    	  }
    }

	return {forEach:function(callback){
                    store.get(parserToDimensionItem(callback));
	        },
	        insert:function(description,callback){
                    store.insert(description,parserToDimensionItem(callback));
	        },
	        modify:function(itemModify,callback){
	        	  store.modify(itemModify,parserToDimensionItem(callback));
	        },
	        delete:function(id,callback){
	        	store.delete(id,callback)
	        }

	   }

}