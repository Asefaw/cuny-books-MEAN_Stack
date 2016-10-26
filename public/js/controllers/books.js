angular.module('bookController', [])

	// inject the Todo service factory into our controller
	.controller('mainBookController', ['$scope','$http','Books', function($scope, $http, Books) {
		$scope.formData = {};
		$scope.loading = true;

		 
		Books.get()
			.success(function(data) {
				$scope.books = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createBook = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.owner != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Books.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.books = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		// $scope.deleteTodo = function(id) {
		// 	$scope.loading = true;

		// 	Todos.delete(id)
		// 		// if successful creation, call our get function to get all the new todos
		// 		.success(function(data) {
		// 			$scope.loading = false;
		// 			$scope.todos = data; // assign our new list of todos
		// 		});
		// };
	}]);