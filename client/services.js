angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // authorization service functions
    function isLoggedIn(){
      if(user){ return true; }
      else { return false; }
    }

    function currentUser(callback){
      return $http.get('/user/currentUser')
      .success(function(data){
        callback(data);
      })
      .error(function(data){
        console.log("error fetching currentUser: ", data);
      })
    }

    function getUserStatus(){
      return $http.get('/user/status')
      .success(function(data){
        if(data.status){ user = true; }
        else { user = false; }
      })
      .error(function(data){
        user = false;
      });
    }

    function login(username, password){
      var deferred = $q.defer();

      $http.post('/user/login',
        {username: username, password: password})
        .success(function(data, status){
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        .error(function(data){
          user = false;
          deferred.reject();
        });
        return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
        .success(function(data){
          user = false;
          deferred.resolve();
        })
        .error(function(data){
          user = false;
          deferred.reject();
        });
        return deferred.promise;
    }

    function register(username, password){
      var deferred = $q.defer();

      $http.post('/user/register',
      {username: username, password: password})
      .success(function(data, status){
        if(status === 200 && data.status){
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .error(function(data){
        deferred.reject();
      });
      return deferred.promise;
    }

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

}]);

angular.module('myApp').factory('UsersService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http){

    function getUsers(callback){
      return $http.get('/user/')
      .success(function(response){
        callback(response);
      })
      .error(function(response){
        console.log("failed to get users: ", response);
      });
    }

    function getSingleUser(id, callback){
      return $http.get('/user/'+id)
      .success(function(response){
        callback(response);
      })
      .error(function(response){
        console.log("failed to get the single user: ", response);
      })
    }

    function getMessages(user_id, callback){
      return $http.get('/messages/'+ user_id)
      .success(function(response){
        callback(response);
      })
      .error(function(response){
        console.log("failed to get messages: ", response);
      })
    }

    function addMessage(user_id, data, callback){
      return $http.post('/messages/add/'+user_id, data)
      .success(function(response){
        callback(response);
      })
      .error(function(response){
        console.log("failed to add message: ", response)
      })
    }

    return ({
      getUsers: getUsers,
      getMessages: getMessages,
      addMessage: addMessage,
      getSingleUser: getSingleUser
    });

}]);
