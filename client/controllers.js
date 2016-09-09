angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };
}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('usersController',
  ['$scope', '$location', 'AuthService', 'UsersService',
    function($scope, $location, AuthService, UsersService){
      UsersService.getUsers(function(data){
        $scope.allUsers = data;
      });
      AuthService.currentUser(function(data){
        $scope.currentUser = data;
      });
}]);


angular.module('myApp').controller('messagesController',
  ['$scope', '$location', '$route', 'AuthService', 'UsersService', '$routeParams',
  function($scope, $location, $route, AuthService, UsersService, $routeParams){
    var id = $routeParams.id;
    var currentUser;
    AuthService.currentUser(function(data){
      currentUser = data;
      $scope.currentUser = data;
    });
    UsersService.getMessages(id, function(data){
      console.log(data);
      $scope.messages = data;
    });

    $scope.addMessage = function(){
      var newMessage = $scope.newMessage;
      newMessage.user_id = id;
      newMessage.author = currentUser.user.username;
      console.log(newMessage);
      UsersService.addMessage(id, newMessage, function(data){
        // $location.path('/profile/'+ data.user_id);
        $route.reload();
      });
    }
}]);
