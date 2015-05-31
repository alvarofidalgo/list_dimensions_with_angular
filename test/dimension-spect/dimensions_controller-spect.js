
describe(' Modify dimension ', function () {
  //TODO : EL STORE Y EL DATA ME LOS VOY A QUITAR DE UN PLUMAZO
var dimensionController,dimensionView,dimensionsModel,storeInserter;
  beforeEach(module('dimensions'));
  
  beforeEach(inject(function(_store_,_dimensionsView_,_dimensionsModel_) {
          storeInserter = store_inserter(_store_);
          dimensionView = _dimensionsView_;
          dimensionsModel = _dimensionsModel_;
          
          sinon.spy(dimensionView,'showDimensionItem');
          sinon.spy(dimensionView,'clearInsertDescription');
          sinon.spy(dimensionView,'deleteDimension');
          sinon.spy(dimensionView,'prepareModify');

          sinon.spy(dimensionsModel,'forEach');
          sinon.spy(dimensionsModel,'insert');
          sinon.spy(dimensionsModel,'modify');
          sinon.spy(dimensionsModel,'delete');
  }));

  beforeEach(inject(function ($injector){
          var controller = $injector.get('$controller');
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
            storeInserter.insertAny();
        var ctrl= dimensionController();
            expect(dimensionsModel.forEach).have.been.called;
            expect(dimensionView.showDimensionItem).have.been.calledWith(storeInserter.modelLastInserter(),
                                                                         ctrl.prepareToModifyDescription);
            storeInserter.restoreStore();
      });

     it ('when no data in store ',function(){
        dimensionController();
        expect(dimensionsModel.forEach).have.been.called;
        expect(dimensionView.showDimensionItem).have.not.been.called;
      })

  });

  context('When user insert dimension elenment',function(){

      it ('Will can insert a not empty data',function(){
        
        var dataResult = storeInserter.anyModel();
            controllerInsert = dimensionController();
            controllerInsert.descriptionInsert = dataResult.description;
            controllerInsert.insertDescription()
            
            expect(dimensionsModel.insert).have.been.called;
            expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                        controllerInsert.prepareToModifyDescription,
                                                                        controllerInsert.deleteDimension);
            expect(dimensionView.clearInsertDescription).have.been.called;

      });

      it ('Will not can insert an empty data ',function(){
         var  controllerInsert = dimensionController();
          controllerInsert.descriptionInsert = "    ";
          controllerInsert.insertDescription();
          expect(dimensionsModel.insert).have.not.been.called;
          expect(dimensionView.showDimensionItem).have.not.been.called;
      })
  });

  context ('When modify dimensions ',function(){

       it (' Will prepare to modify ',function(){

           var  controllerModify = dimensionController();
            controllerModify.prepareToModifyDescription("1");
            expect(dimensionsModel.modify).have.not.been.called;
            expect(dimensionView.prepareModify ).have.been.calledWith('save',
                                                                      "1",
                                                                      controllerModify.modifyDescription);
       });

       it ('description will be modified',function(){
                storeInserter.insertAny();
            var dataResult = storeInserter.modelLastInserter(),
                controllerModify = dimensionController();
                dataResult.description ='description2';
                controllerModify.modifyDescription(dataResult.id,dataResult.description);
                expect(dimensionsModel.modify).have.been.called;
                expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                            controllerModify.prepareToModifyDescription,
                                                                            controllerModify.deleteDimension);
                
               storeInserter.restoreStore();
       });
  });

  context('when delete dimension ',function(){

      it(' call method delete view ',function(){

        var controllerDelete = dimensionController();
            controllerDelete.deleteDimension('id');
            expect(dimensionsModel.delete).have.been.called;
            expect(dimensionView.deleteDimension).have.been.calledWith('id');

      });

  });
});

