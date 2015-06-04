function ViewModel(states){
    
   this.descriptionInsert ="";
   
   this.clearInsertDescription = function(){
   	      this.descriptionInsert="";
   }

   this.dimensionWidget = function(){
    var _that = this;
       this.position;

   
  		this.descriptionText = function(typeStatus,text){	      
  	       this.readOnly = !states[typeStatus]['enabledDesription'];
  	       this.description = text;
  		}

  		this.buttomModify = function(typeButton,callback){		
  			this.class = states[typeButton]['class'];
  			this.modify = function(){                 
  				         callback(_that.id,_that.description,states[typeButton]['states']);
  				     }
  		}

      this.buttonDelete = function(callback){
           this.delete = function(){
                callback(_that.id);
           }
      }

  		this.idText = function (text){
  	       this.id = text;
  		}
   }
	
}
