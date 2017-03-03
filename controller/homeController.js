/**
 * Created by Andreea on 04.12.2016.
 */
(function() {
        'use strict';

        var inject = ['$scope', 'utilService'];
        var homeController = function($scope, utilService){
            var self = this;

            utilService.makeGETReq('http://localhost:8080/users').then(function success(response) {
                self.data = response.data;
                //console.log(self.data);
            });


        };

        homeController.$inject = inject;
        angular.module('myApp').controller('homeController',homeController);
    }
)();