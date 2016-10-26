angular.module('bookService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Books', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/books');
			},
			create : function(todoData) {
				return $http.post('/api/books', bookData);
			},
			// delete : function(id) {
			// 	return $http.delete('/api/users/' + id);
			// }
		}
	}]);