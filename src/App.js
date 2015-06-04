angular.module('ExampleList',['ngRoute','dimensions'])
		.config(['$routeProvider',
		  function($routeProvider) {
			$routeProvider.
			  when('/', {
				templateUrl: 'index.html',
				controller: 'dimensions_controller',
				controllerAs :'controller'
			  });
		  }])


