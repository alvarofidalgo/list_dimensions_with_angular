function store_inserter(store){

   var inserters =[];
	 return {insertAny:function(){
	 	                var length =inserters.length+1,
	 	                     data = {value:''+length,description:'desc'+length};
	 	                     inserters.push(data);
	 	                     store.insert(data.description,function(){});
	 	                     return data;
	                     },
	         restoreStore:function(){
	         	       while (inserters.length>0){
	         	       	   var data = inserters.pop();
	         	       	       store.delete(data.id,function(){});
	         	       }
	         },
	         modelLastInserter:function(type){
                    var lastInserted = inserters[inserters.length-1];
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