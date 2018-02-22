(function () {
    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');
    require('../controllers/CanvasController');

    angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            //route
            $routeProvider
                .when("/", {
                    templateUrl: "../partials/canvas.html",
                    controller: "CanvasController"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);
}());