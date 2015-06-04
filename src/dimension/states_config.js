  function ConfigurerStates(){

           return  {
                 modify:{ 
                          class:"glyphicon glyphicon-pencil",
                          enabledDesription :false,
                          states:{
                               actualState:'modify',
                               nextState : 'save'
                          }
                          
                        },
                 save:  {
                         class:"glyphicon glyphicon-save",
                         enabledDesription:true,
                         states:{
                               actualState:'save',
                               nextState : 'modify'
                          }

                        }
                      };
               }