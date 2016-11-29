/**
 * Created by Andreea on 22.11.2016.
 */
(function() {
        'use strict';

        var inject = ['$scope', 'utilService'];
        var loginController = function($scope, utilService){
            var self = this;

        };

        loginController.$inject = inject;
        angular.module('myApp').controller('loginController',loginController);
    }
)();