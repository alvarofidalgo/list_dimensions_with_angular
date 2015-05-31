describe('View Model Angular',function(){
	 var viewModel;
	    beforeEach(module('dimensions'));

	    beforeEach(inject(function(_viewModel_) {
          var viewModel_builder = _viewModel_;
              viewModel = new _viewModel_.dimensionWidget();
      }));


	    it ('when call  with modify option',function(){
	    
             viewModel.buttomModify("modify");
             viewModel.descriptionText("modify","");
             expect(viewModel.readOnly).to.be.equal(true);
             expect(viewModel.class).to.be.equal("glyphicon glyphicon-pencil");
	    });

      it ('when call  with save option',function(){
             viewModel.buttomModify("save");
             viewModel.descriptionText("save","");
            expect(viewModel.readOnly).to.be.equal(false);
             expect(viewModel.class).to.be.equal("glyphicon glyphicon-save");
      });

})

  