/**
 * Created by Andreea on 22.11.2016.
 */
(function() {
        'use strict';

        var inject = ['$scope','$rootScope', 'utilService', '$location', '$cookies'];
        var loginController = function($scope, $rootScope, utilService, $location, $cookies){
            var self = this;

            self.isLoggedin = false;

            self.logout = function(){
                self.isLoggedin = false;
            };

            self.login = function(){
                //console.log($scope.username);
                //console.log($scope.password);
                var endpoint = 'http://localhost:8080/users/login';
                self.data = {
                    "username": $scope.username,
                    "password": $scope.password
                };

                utilService.username = $scope.username;
                //console.log(self.data);
                utilService.makePOSTReq(endpoint,self.data).then(function success(response){
                    //console.log(self.data);
                    //console.log("response" + response);

                    if(response.data == ""){
                        self.isLoggedin = false;
                    } else {
                        self.isLoggedin = true;
                        self.username = $scope.username;
                        console.log("succes " + response.data);
                        $rootScope.globals = {
                            currentSession: response.data
                        };
                        $location.path('/home');
                        //$window.location.href = '/query';
                        $cookies.put('app-data', $rootScope.globals);
                  //      $route.reload();
                        //console.log("Aici" + $rootScope.globals);

                    }

                });
                /*$http.post('http://localhost:8080/login', JSON.stringify({
                    username: $scope.username,
                    password: $scope.password
                })).then(function(respounse){
                    if(respounse.data == ""){
                        $scope.loginError =  true;
                    } else {
                        $rootScope.globals = {
                            currentSession: respounse.data
                        };
                        $location.path('/home');
                        //$window.location.href = '/query';
                        console.log($rootScope.globals.currentSession.sid);

                        $cookieStore.put('app-data', $rootScope.globals);
                    }
                });*/
            }
        };

        loginController.$inject = inject;
        angular.module('myApp').controller('loginController',loginController);
    }
)();