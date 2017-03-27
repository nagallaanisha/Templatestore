var app = angular.module("templateStore.templates",['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/templates',{
        templateUrl: 'templates/templates.html',
        controller: 'TemplatesCtrl'
    })
    
    .when('/templates/:templateId',{
        templateUrl: 'templates/templates-detail.html',
        controller: 'TemplatesDetailsCtrl' 
        
    });
}]);

app.controller('TemplatesCtrl',['$scope','$http',function($scope,$http){
  $http.get('json/templates.json').success(function(data){
     $scope.templates=data;
  });
}]);

app.controller('TemplatesDetailsCtrl',['$scope','$routeParams','$http','$filter',function($scope,$routeParams,$http,$filter){
    var templateId = $routeParams.templateId;
   $http.get('json/templates.json').success(function(data){
     $scope.template=$filter('filter')(data,function(d){
         return d.id == templateId;
     })[0];
       $scope.MainImage = $scope.template.images[0].name;
   });
    $scope.setImage = function(image){
         $scope.MainImage = image.name;
    }
}]);