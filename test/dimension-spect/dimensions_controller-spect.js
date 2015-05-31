
describe(' Modify dimension ', function () {
var dimensionController,dimensionView,dimensionsModel,store,data;
  beforeEach(module('dimensions'));
  
  beforeEach(inject(function(_store_,_dimensionsView_,_dimensionsModel_) {
          store = _store_;
          dimensionView = _dimensionsView_;
          dimensionView.enabledModifyButton = sinon.spy();
          dimensionView.showDimensionItem = sinon.spy();
          dimensionView.clearInsertDescription = sinon.spy();
          dimensionView.deleteDimension = sinon.spy();
          dimensionsModel = _dimensionsModel_;
  }));

  beforeEach(inject(function ($injector){
          var controller = $injector.get('$controller');
             data =  dataGenerator();   
             
             dimensionController = function(){
                    return controller('dimensions_controller',
                              { 
                                'dimensionsView':dimensionView,
                                 'dimensionsModel': dimensionsModel                       
                              });
                  }
          
          })); 

  context(' When init aplication ',function(){

      it ('when have data in store ',function(){
        var dataResult = generateDataResult("modify");
            store.put(data); 
         var ctrl= dimensionController();
            
            expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                         ctrl.prepareToModifyDescription);
            store.flush();
      });

     it ('when no data in store ',function(){
        dimensionController();
        expect(dimensionView.showDimensionItem).have.not.been.called;
      })

  });

  context('When user insert dimension elenment',function(){

      it ('Will can insert a not empty data',function(){
        var dataResult = generateDataResult("modify"),
            controllerInsert = dimensionController();
            controllerInsert.descriptionInsert = dataResult.description;
            controllerInsert.insertDescription()
            
            expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                        controllerInsert.prepareToModifyDescription,
                                                                        controllerInsert.deleteDimension);
            expect(dimensionView.clearInsertDescription).have.been.called;

      });

      it ('Will not can insert an empty data ',function(){
         var  controllerInsert = dimensionController();
          controllerInsert.descriptionInsert = "    ";
          controllerInsert.insertDescription();
          expect(dimensionView.showDimensionItem).have.not.been.called;
      })
  });

  context ('When modify dimensions ',function(){

       it (' Will prepare to modify ',function(){

           var  controllerModify = dimensionController();
            dimensionView.prepareModify = sinon.spy();
            controllerModify.prepareToModifyDescription("1");
            expect(dimensionView.prepareModify ).have.been.calledWith('save',
                                                                      "1",
                                                                      controllerModify.modifyDescription);
       });

       it ('description will be saved',function(){
            var dataResult = generateDataResult("modify"),
                controllerModify = dimensionController();
                store.put(data); 
                dataResult.description ='description2';
                controllerModify.modifyDescription('1',dataResult.description);
                expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                            controllerModify.prepareToModifyDescription,
                                                                            controllerModify.deleteDimension);
                
       });
  });

  context('when delete dimension ',function(){

      it(' call method delete view ',function(){
        var controllerDelete = dimensionController();
            controllerDelete.deleteDimension('id');

            expect(dimensionView.deleteDimension).have.been.calledWith('id');

      });

  });
});

