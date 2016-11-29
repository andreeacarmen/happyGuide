// create the module and name it
var myApp = angular.module('myApp', ['ngRoute']);

// configure the routes
myApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'view/home.html'
        })
        .when('/home', {
            templateUrl : 'view/home.html'
            })
        .when('/register', {
            templateUrl : 'view/signup.html',
            controllerAs: 'signUpController',
            controller  : 'signUpController'
        })
        .when('/about',{
            templateUrl: 'view/about.html'
        })
        .when('/contact',{
            templateUrl: 'view/contact.html'
        })
});




