describe('Model to dimensions',function(){

	var dimensionsModel,callback,storeInserter,clock;
	    
	beforeEach(module('dimensions'));

    beforeEach(inject(function(_store_,_dimensionsModel_) {
	      
          storeInserter = store_inserter (_store_);
          dimensionsModel = _dimensionsModel_;
          callback= sinon.spy();
          clock = sinon.useFakeTimers();   

        }));

    context('when list elements ',function(){
	   
	    it ('And exists data',function(){
             
	         var dataInserted = storeInserter.insertAny();

	             dimensionsModel.forEach(function(result){
                     expect(result.toDTO()).to.deep.equal(new DimensionItem(dataInserted).toDTO());
	                 storeInserter.restoreStore();
	             });
	         
	             
	    });

	    it ('And not exist data',function(){  
             dimensionsModel.forEach(callback);
             clock.tick(10);
             expect(callback).have.not.been.called;

	    });
	   
	   });

    context ('when insert element ',function(){
    	it ('And insert description ',function(){
    		var dataInsert = {description:'desc',value:'1'};
		        dimensionsModel.insert(dataInsert.description,function(result){
		        	expect(result.toDTO()).to.deep.equal(new DimensionItem(dataInsert).toDTO());
		             dimensionsModel.delete(dataInsert.value,callback);
		        });
        })
    });

    context('when modfiy element ',function(){
    	it(' and modify description ',function(){
    	  var dataModify =  storeInserter.insertAny();
	    	  dimensionsModel.modify(dataModify,function(result){
                  expect(result.toDTO()).to.deep.equal(new DimensionItem(dataModify).toDTO());
                  storeInserter.restoreStore();
	    	  });
    	 })
    });

    context('when delete element ',function(){
    	it('and delete an id element ',function(){
    		dimensionsModel.delete('id',callback);
    		clock.tick(100);
    		expect(callback).have.been.called;
    	})
    })
})