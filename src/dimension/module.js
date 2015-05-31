angular.module('dimensions', [])

angular.module('dimensions')
    .service('states',ConfigurerStates)
    .service('viewModel',ViewModel)
    .service ('dimensionsView',DimensionView)
    .service('store',Store)
    .service ('dimensionsModel',DimensionsModel)
    .controller('dimensions_controller',DimensionsController);
  