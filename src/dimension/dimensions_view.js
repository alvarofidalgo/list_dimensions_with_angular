function DimensionView(viewModel){
        var _that = this;
        this.dimensionsItems = [];
        this.descriptionInsert = viewModel.descriptionInsert;

        function buildDimensionWidget(item,callbackModify,callbackDelete){
            var dimensionWidget = new viewModel.dimensionWidget();
                dimensionWidget.descriptionText(item.type,item.description);
                dimensionWidget.buttomModify(item.type,callbackModify);
                dimensionWidget.idText(item.id);
                dimensionWidget.buttonDelete(callbackDelete);
                return dimensionWidget;
        }

        function changeStateItem (typeModify,idModify,callback){ 
           return  _that.dimensionsItems.reduce(function(modified,item){
                 if (item.id===idModify){
                    item.buttomModify(typeModify,callback);
                    item.descriptionText(typeModify,item.description);
                    modified = true;
                  }  
                  return modified;
             },false); 
        }
        
        this.clearInsertDescription = function(){           
              viewModel.clearInsertDescription();
        }

        this.showDimensionItem =function(item,callbackModify,callbackDelete){
              if (changeStateItem(item.type,item.id,callbackModify)===false)
                    _that.dimensionsItems.push(buildDimensionWidget(item,callbackModify,callbackDelete));

        }

        this.deleteDimension=function(id){
          var newDimensions = this.dimensionsItems.filter(function(dimensionWidget){
                               return dimensionWidget.id!=id
                            });
              for (;this.dimensionsItems.length>0;this.dimensionsItems.pop());
              for (var index=0;index<newDimensions.length;this.dimensionsItems.push(newDimensions[index++]));
        }

}