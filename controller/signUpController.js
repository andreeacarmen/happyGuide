/**
 * Created by Andreea on 22.11.2016.
 */
(function() {
        'use strict';

        var inject = ['$scope', 'utilService'];
        var signUpController = function($scope, utilService){
            var self = this;

            utilService.makeGETReq('http://localhost:8080/users/maria').then(function success(response) {
                console.log(response.data);
            });

            var data = {
                "activities": null,
                "description": null,
                "language": null,
                "location": null,
                "email": null,
                "telefonNr": null,
                "hourRate": 0,
                "username": "ION"
            };

            var endpoint = 'http://localhost:8080/users/ion/new';

            utilService.makePOSTReq(endpoint, data).then(function success(response){
                console.log(response);
            })

        };

        signUpController.$inject = inject;
        angular.module('myApp').controller('signUpController',signUpController);
    }
)();