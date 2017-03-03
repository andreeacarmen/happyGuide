
(function() {
        'use strict';

        var inject = ['$scope', 'utilService', '$q'];
        var guideController = function($scope, utilService, $q){
            var self = this;
            self.init = init;


            function init() {
                console.log("init");
                getUserData();
            }

            function getUserData(){
                return utilService.makeGETReq('http://localhost:8080/users').then(function success(response) {
                    self.data = response.data;
                    var userName = window.location.href;
                    if (userName[userName.length - 1] == '/')
                        userName = userName.substr(0, userName.length - 2);
                    userName = userName.substr(userName.lastIndexOf('/') + 1).replace("%20", " ");

                    for (var i = 0, length = self.data.length; i < length; i++) {
                        var user = self.data[i];
                        if (user.username == userName) {
                            self.user = user;
                            console.log(self.user);
                        }

                    }

                    var url = 'http://api.openweathermap.org/data/2.5/weather?q='
                        +self.user.location+'&APPID=4fd4eec44412cb90e8d5514c07b40c91&units=metric';

                    utilService.makeGETReq(url).then(function succes(response){
                        console.log(response.data);
                        self.lat = response.data.coord.lat;
                        self.lon = response.data.coord.lon;

                        self.iconUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + self.lat
                            + "," + self.lon + "&zoom=13&size=300x300&sensor=false";
                    });
                });
            }


            function guideLocate() {

            }

            /*  function guideLocate() {
                  self.lat = utilService.houseLocation.lat;
                  self.lon = utilService.houseLocation.lon;

                  self.iconUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + self.lat
                      + "," + self.lon + "&zoom=13&size=300x300&sensor=false";

              }*/

        };

        guideController.$inject = inject;
        angular.module('myApp').controller('guideController',guideController);
    }
)();