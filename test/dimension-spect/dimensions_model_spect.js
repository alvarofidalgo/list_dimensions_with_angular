describe('Model to dimensions',function(){
	var dimensionsModel,store,callback,data;
	    
	    beforeEach(module('dimensions'));

	      beforeEach(inject(function(_store_,_dimensionsModel_) {
	      data = dataGenerator();
          store = _store_;
          dimensionsModel = _dimensionsModel_;
          callback= sinon.spy();
        }));
    context('when list elements ',function(){
	    it ('when data in store',function(){
             var result =generateDataResult("modify");
	             store.put(data);
	             dimensionsModel.forEach(callback);
	             expect(callback).have.been.called;
	             expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(data).toDTO());
	             
	             store.flush();
	    });

	    it ('when no in store',function(){     
             dimensionsModel.forEach(callback);
             expect(callback).have.not.been.called;

	    });
	   
	   	it ('when two data in store',function(){   
	   	    store.put(data);
	   	    store.put(data);  
            dimensionsModel.forEach(callback);
            expect(callback).have.been.callCount(2);

	    });
	   });

    context ('when insert element ',function(){
    	it ('insert one description ',function(){
	        dimensionsModel.insert(data.description,callback);
	        expect(callback).have.been.called;
	        expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(data).toDTO());
	        store.flush();
        })
    });

    context('when modfiy element ',function(){
    	it('modify item ',function(){
    		var element = {value:'1',description:'desc'};
    		store.put(data);  
	    	 dimensionsModel.modify(element,callback);
	    	 expect(callback).have.been.called;
	    	 expect(callback.args[0][0].toDTO()).to.deep.equal(new DimensionItem(element).toDTO());
	        store.flush();
    	 })
    });

    context('when delete element ',function(){
    	it('call back should be called with argument ',function(){
    		dimensionsModel.delete('id',callback);
    		expect(callback).have.been.called;
    	})
    })
})