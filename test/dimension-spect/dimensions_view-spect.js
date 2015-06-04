describe('Dimensions view',function(){
	 var dimensionsView,viewModel,callback,storeInserter;
	    beforeEach(module('dimensions'));

	    beforeEach(inject(function(_dimensionsView_,_viewModel_) {
           storeInserter = store_inserter();
           dimensionsView = _dimensionsView_;
           viewModel = _viewModel_;
           viewModel.clearInsertDescription = sinon.stub();
           callback=sinon.spy();
        }));

    function initWidgets(widget1,widget2){          
           widget1.buttomModify = sinon.spy();
           widget1.descriptionText = sinon.spy();
           widget1.id ="1";
           widget1.description="desc1"

           widget2.buttomModify = sinon.spy();
           widget2.descriptionText = sinon.spy();
           widget2.id ="2";

           dimensionsView.dimensionsItems.push(widget1);
           dimensionsView.dimensionsItems.push(widget2);     
    }

   context('delete descriptions ',function(){

	    it ('description insert will can delete',function(){
               dimensionsView.clearInsertDescription();
               expect(viewModel.clearInsertDescription).have.been.called;
	    });
    })

  /*  context('when modify operation ',function(){
     var widget1,widget2,callbackModify;
      beforeEach(function(){
           widget1 = new viewModel.dimensionWidget();
           widget2 = new viewModel.dimensionWidget();
           callback = sinon.spy();
           initWidgets(widget1,widget2);

      });

      it ('will can prepare view to update ',function(){
            
            dimensionsView.prepareModify('save',"1",callbackModify);
            expect(widget1.buttomModify).have.been.calledWith("save",callbackModify);
            expect(widget1.descriptionText).have.been.calledWith("save",widget1.description); 
            expect(dimensionsView.dimensionsItems.length).to.be.equal(2);


        });

        it( 'will restore to show mode ',function(){
            dimensionsView.prepareModify('modify',"2",callbackModify);
            expect(widget2.buttomModify).have.been.calledWith("modify",callbackModify);
            expect(widget2.descriptionText).have.been.calledWith("modify",widget2.description); 
            expect(dimensionsView.dimensionsItems.length).to.be.equal(2);
        })

      });*/

   context('when show elements ',function(){
  
     var callbackModify,callbackDelete; 
      beforeEach(function(){
           callbackModify=sinon.spy();
           callbackDelete = sinon.spy();

      });

      it ('New items will can show',function(){
        var item = storeInserter.anyModel();

            dimensionsView.showDimensionItem(item,callbackModify,callbackDelete);
            expect(dimensionsView.dimensionsItems.length).to.be.equal(1);
            expect(dimensionsView.dimensionsItems[0]["class"]).to.be.equal("glyphicon glyphicon-pencil");
              
      });

      it( ' Only insert elemenents with distinct id ',function(){
        var itemModify = storeInserter.anyModel();
            itemSave = storeInserter.anyModel('save');
            dimensionsView.showDimensionItem(itemModify);
            dimensionsView.showDimensionItem(itemSave);

            expect(dimensionsView.dimensionsItems.length).to.be.equal(1);
            expect(dimensionsView.dimensionsItems[0]["class"]).to.be.equal("glyphicon glyphicon-save");
      });
   });

   context(' When delete elements ',function(){
      var widget1,widget2;
      beforeEach(function(){
           widget1 = new viewModel.dimensionWidget();
           widget2 = new viewModel.dimensionWidget();
           callback = sinon.spy();
          initWidgets(widget1,widget2);

      });

      it (' exist elements will can removed ',function(){
             dimensionsView.deleteDimension(widget1.id);
             expect(dimensionsView.dimensionsItems.length).to.be.equal(1);
      });

   });


})