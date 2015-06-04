function DimensionsController(dimensionsView,dimensionsModel){

  var _that = this,   
      operationsModify = { 
                     save:dimensionsModel.modify,
                     modify :dimensionsModel.changeTypeItem
                    }
    function showDimensionItem (){
                   return function(dimensionItem){                
                      dimensionsView.showDimensionItem(dimensionItem.toDTO(),
                                                       _that.modifyDescription,
                                                       _that.deleteDimension);
                   }
            }
          
    this.dimensionsItems = dimensionsView.dimensionsItems;

    this.start = function(){
      dimensionsModel.forEach(showDimensionItem(_that.modifyDescription));
    }

    this.insertDescription = function(){
        if (_that.descriptionInsert.trim()!='')
          dimensionsModel.insert(_that.descriptionInsert,showDimensionItem());
        dimensionsView.clearInsertDescription();
        this.descriptionInsert=dimensionsView.descriptionInsert;
    }

    this.modifyDescription = function(id,description,states){
         var dimensionItem = dimensionsModel.buildDimensionItem(id,description,states.nextState);
             operationsModify[states.actualState](dimensionItem,showDimensionItem());
    }  
    
    this.deleteDimension = function(id){
          dimensionsModel.delete(id,function(){
                               dimensionsView.deleteDimension(id);
                        });
    }

    this.start();
  }