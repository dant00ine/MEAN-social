var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'usersController',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController'
    })
    .when('/profile/:id', {
      templateUrl: 'partials/profile.html',
      controller: 'messagesController',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>'
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function($rootScope, $location, $route, AuthService){
  $rootScope.$on('$routeChangeStart',
    function(event, next, current){
      AuthService.getUserStatus()
      .then(function(){
        if(next.access.restricted && AuthService.isLoggedIn() === false){
          $location.path('/login');
          $route.reload();
        }
      });

    });
});
