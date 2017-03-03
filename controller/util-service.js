/**
 * Created by Andreea on 22.11.2016.
 */
(function() {
        var inject = ['$http'];
        var utilService = function($http){
            var self = this;
            var username;

            self.houseLocation = {
                lat: 34.0522,
                lon: -118.2437
            };

            self.makeGETReq = function(endpoint) {
                return $http({method: 'GET', url: endpoint});
            };

            self.makePOSTReq = function(endpoint, data) {
                return $http({
                    method: 'POST',
                    url: endpoint,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
            };


            self.makePUTReq = function(endpoint, data) {
                return $http({
                    method: 'PUT',
                    url: endpoint,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
            }

        };

        utilService.$inject = inject;
        angular.module('myApp').service('utilService',utilService);
    }()
);