describe('Model to dimensions',function(){

	var dimensionsModel,callback,storeInserter;
	    
	beforeEach(module('dimensions'));

    beforeEach(inject(function(_store_,_dimensionsModel_) {
	      
          storeInserter = store_inserter (_store_);
          dimensionsModel = _dimensionsModel_;
          callback= sinon.spy();

        }));
    context('when list elements ',function(){
	    it ('when data in store',function(){
             
	         var dataInserted = storeInserter.insertAny(),
	             result =storeInserter.modelLastInserter();
	             dimensionsModel.forEach(callback);
	             expect(callback).have.been.called;
	             expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(dataInserted).toDTO());
	             storeInserter.restoreStore();
	    });

	    it ('when no in store',function(){     
             dimensionsModel.forEach(callback);
             expect(callback).have.not.been.called;

	    });
	   
	   	it ('when two data in store',function(){   
	   	    storeInserter.insertAny();
	   	    storeInserter.insertAny();
            dimensionsModel.forEach(callback);
            expect(callback).have.been.callCount(2);
            storeInserter.restoreStore();

	    });
	   });

    context ('when insert element ',function(){
    	it ('insert one description ',function(){
    		var dataInsert = {description:'desc',value:'1'};
		        dimensionsModel.insert(dataInsert.description,callback);
		        expect(callback).have.been.called;
		        expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(dataInsert).toDTO());
		        dimensionsModel.delete(dataInsert.value,callback);
        })
    });

    context('when modfiy element ',function(){
    	it('modify item ',function(){
    	  var dataModify =  storeInserter.insertAny();
	    	  dimensionsModel.modify(dataModify,callback);
	    	  expect(callback).have.been.called;
	    	  expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(dataModify).toDTO());
	          storeInserter.restoreStore();

    	 })
    });

    context('when delete element ',function(){
    	it('call back should be called with argument ',function(){
    		dimensionsModel.delete('id',callback);
    		expect(callback).have.been.called;
    	})
    })
})