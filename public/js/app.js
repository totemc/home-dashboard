var dashboardApp = angular.module('dashboardApp', []);

function mainController($scope, $http){
	$http.get('/api/chores')
	    .success(function(data) {
	        $scope.chores = data;
	        console.log(data);
	    })
	    .error(function(data) {
	        console.log('Error: ' + data);
	    });
	$scope.name = {};
	$scope.deleteChore = function(id) {
		$http.delete('/api/chores/' + id)
			.success(function(data) {
		    	$scope.chores = data;
		    	console.log(data);
			})
			.error(function(data) {
		    	console.log('Error: ' + data);
			});
	}
}