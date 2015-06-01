function store_inserter(store){

	 return {insertAny:function(){
	 	                var length =store.elements.length+1,
	 	                     data = {value:''+length,description:'desc'+length};
	 	                     store.elements.push(data);
	 	                     return data;
	                     },
	         restoreStore:function(){
	         	       store.elements = [];
	         },
	         modelLastInserter:function(type){
                    var lastInserted = store.elements[store.elements.length-1];
                         type = type||'modify';
                         return { id:lastInserted.value,
                         	      description:lastInserted.description,
                         	      type:type
                                 }

	         },
	         anyModel:function(type){
	         	  type = type || 'modify';
	         	  return  {id:'1',
	         	           description:'descriptio',
	         	           type:type
	         	           };
	         } 

	 }
}