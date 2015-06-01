
describe(' Modify dimension ', function () {

var dimensionController,dimensionView,dimensionsModel,storeInserter,clock;
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
          clock = sinon.useFakeTimers(); 
  }));

  beforeEach(inject(function ($injector){
          var controller = $injector.get('$controller');
             ctrl = controller('dimensions_controller',
                              { 
                                'dimensionsView':dimensionView,
                                 'dimensionsModel': dimensionsModel                       
                              });
          })); 

  context(' When init aplication ',function(){

   
      it (' And exist Data in store ',function(){
            storeInserter.insertAny();
            ctrl.start();
             clock.tick(10);
            expect(dimensionsModel.forEach).have.been.called;
            expect(dimensionView.showDimensionItem).have.been.calledWith(storeInserter.modelLastInserter(),
                                                                         ctrl.prepareToModifyDescription);
            storeInserter.restoreStore();
      });

     it (' And not exist data in store ',function(){
        ctrl.start();
        clock.tick(10);
        expect(dimensionsModel.forEach).have.been.called;
        expect(dimensionView.showDimensionItem).have.not.been.called;
      });

  });

  context('When insert new dimension',function(){

      beforeEach(function(){
          ctrl.start();
      })

      it (' And description is filled',function(){
            
        var dataResult = storeInserter.anyModel();           
            ctrl.descriptionInsert = dataResult.description;
            ctrl.insertDescription() ;
            clock.tick(10);         
            expect(dimensionsModel.insert).have.been.called;
            expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                        ctrl.prepareToModifyDescription,
                                                                        ctrl.deleteDimension);
            expect(dimensionView.clearInsertDescription).have.been.called;

      });

      it (' And description is empty ',function(){

          ctrl.descriptionInsert = "    ";
          ctrl.insertDescription();
          clock.tick(10);
          expect(dimensionsModel.insert).have.not.been.called;
          expect(dimensionView.showDimensionItem).have.not.been.called;
      })
  });

  context ('When modify dimensions ',function(){

       beforeEach(function(){
          ctrl.start();
          storeInserter.insertAny();
       })

       it (' First pepare to modify ',function(){


            ctrl.prepareToModifyDescription("1");
            clock.tick(10);
            expect(dimensionsModel.modify).have.not.been.called;
            expect(dimensionView.prepareModify ).have.been.calledWith('save',
                                                                      "1",
                                                                      ctrl.modifyDescription);
       });

       it (' Second modify description ',function(){
                            
            var dataResult = storeInserter.modelLastInserter();
                dataResult.description ='description2';
                ctrl.modifyDescription(dataResult.id,dataResult.description);
                clock.tick(10);
                expect(dimensionsModel.modify).have.been.called;
                expect(dimensionView.showDimensionItem).have.been.calledWith(dataResult,
                                                                            ctrl.prepareToModifyDescription,
                                                                            ctrl.deleteDimension);             
               storeInserter.restoreStore();
       });
  });

  context('when delete dimension ',function(){

      it(' Deelete dimension from model ',function(){

            ctrl.start();
            ctrl.deleteDimension('id');
            clock.tick(10);
            expect(dimensionsModel.delete).have.been.called;
            expect(dimensionView.deleteDimension).have.been.calledWith('id');

      });

  });
});

