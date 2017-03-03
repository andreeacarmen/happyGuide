
/**
 * Created by Andreea on 22.11.2016.
 */
(function() {
        'use strict';

        var inject = ['$scope', 'utilService'];
        var signUpController = function($scope, utilService){
            var self = this;

            $scope.submit = function() {

                var endpoint = 'http://localhost:8080/users/new';
                var art = document.getElementById('artCheckBox').checked ? 1 : 0;
                var shopping = document.getElementById('shoppingCheckBox').checked ? 1 : 0;
                var clubs = document.getElementById('clubsCheckBox').checked ? 1 : 0;


                self.data = {
                    "activities":null,
                    "description": $scope.description,
                    "language": null,
                    "location": $scope.city,
                    "email": $scope.email,
                    "telefonNr": null,
                    "name": $scope.name,
                    "hourRate": $scope.price,
                    "username": $scope.user,
                    "password": $scope.password
                };

                console.log("LAA");
                utilService.makePOSTReq(endpoint,self.data).then(function success(response){
                    console.log("facem");
                    console.log(response.data);
                });

                window.location.replace("#/home");
        };

        };

        signUpController.$inject = inject;
        angular.module('myApp').controller('signUpController',signUpController);
    }
)();