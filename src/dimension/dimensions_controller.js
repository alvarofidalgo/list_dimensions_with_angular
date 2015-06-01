function DimensionsController(dimensionsView,dimensionsModel){

  var _that = this;    
    function showDimensionItem (callback){
                   return function(dimensionItem){                 
                      dimensionsView.showDimensionItem(dimensionItem.toDTO(),
                                                       callback,
                                                       _that.deleteDimension);
                   }
            }
          
    this.dimensionsItems = dimensionsView.dimensionsItems;

    this.start = function(){
      dimensionsModel.forEach(showDimensionItem(_that.prepareToModifyDescription));
    }
    this.insertDescription = function(){
        if (_that.descriptionInsert.trim()!='')
          dimensionsModel.insert(_that.descriptionInsert,
                                 showDimensionItem(_that.prepareToModifyDescription));
        dimensionsView.clearInsertDescription();
        this.descriptionInsert=dimensionsView.descriptionInsert;
    }

    this.prepareToModifyDescription = function(id){
                     dimensionsView.prepareModify('save',
                                                  id,
                                                  _that.modifyDescription);
                  }
    this.modifyDescription = function(id,description){
          dimensionsModel.modify({
                                   value:id,
                                   description:description
                                  },
                                 showDimensionItem(_that.prepareToModifyDescription));
    }  
    
    this.deleteDimension = function(id){
          dimensionsModel.delete(id,function(){
                               dimensionsView.deleteDimension(id);
                        });
    } 
  }