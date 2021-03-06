/**
 * TODO BONUS remove angular 1 and use the latest angular or any newer javascript framework, basically rewrite the frontend
 */
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider.when('/authenticate', {
            templateUrl: 'logon.html'
        }).when('/content', {
            templateUrl: 'content.html'
        });
        $httpProvider.interceptors.push('AuthHeaderInterceptor');
        $httpProvider.interceptors.push('httpResponseInterceptor');

        $locationProvider.hashPrefix('');
    }
]);

myApp.factory('AuthHeaderInterceptor',
    function ($q, $cookies) {
        return {
            request: function (config) {
                console.log('inside interceptor' + $cookies.get('CSRF'));
                config.headers = config.headers || {};
                config.headers['XSRF'] = $cookies.get('CSRF');
                return config || $q.when(config);
            }
        };
    });

// http interceptor to handle redirection to login on 401, 403 response from API
myApp.factory('httpResponseInterceptor',
    ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    // Something like below:
                    $location.path('authenticate');
                } else if (rejection.status === 400) {
                    $location.path('content');
                }
                return $q.reject(rejection);
            }
        };
    }]);

myApp.controller('AccessCtrl',
    ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {

        $scope.items = [];
        $scope.getItems = function () {
            $http({
                method: 'GET',
                url: '/resources'
            }).then(function (response) {
                $scope.items = response.data;
            }, function (error) {
                console.log("Error loading resources" + error);
            });
        };

        $scope.click = function (resourceUrl) {
            $scope.resourceContent = '';
            $http({
                method: 'GET',
                url: resourceUrl
            }).then(function (response) {
                $scope.resourceContent = response.data;
                $location.path('content');
            }, function (error) {
                console.log("Error loading resources" + error);
                $scope.resourceContent = error.data.message
            });
        };

        $scope.user = {};

        $scope.login = () => {
            $scope.resourceContent = '';
            let credentials = $scope.user.username + ':' + $scope.user.password;
            $http({
                method: 'POST',
                url: '/authenticate',
                headers: {
                    'Authorization': 'Basic ' + btoa(credentials),
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log("BLAH:" +  JSON.stringify(response));
                $scope.resourceContent = response.data;
                $location.path('content');
            }, function (response) {
                console.log( JSON.stringify(response));
                if (response.message) {
                    $scope.resourceContent = response.message;
                } else {
                    $scope.resourceContent = 'Unable to log in';
                }
            });
        };

    }]);
