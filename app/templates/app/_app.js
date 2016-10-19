'use strict';

angular.module('<%= appName %>', [ 'ngRoute','<%= appName %>-main','templates' ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('<%= appName %>-main',['ngRoute'<% if(ngforce) { %>, 'ngForce'<% } %>])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  })
  .controller('MainCtrl', function ($scope, $injector) {
    var vfr;

    $scope.awesomeThings = [
      'NPM',
      'Yeoman',
      'bower',
      'gulp',
      'Proxly'
    ];

    try {
      vfr = $injector.get('vfr');
      $scope.awesomeThings.push('Visualforce!');
    } catch (e) {
      $scope.awesomeThings.push('Localhost!');
    }

  });
 