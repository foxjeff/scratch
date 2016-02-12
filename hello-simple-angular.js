var app = angular.module("myApp", []);

app.controller("HelloController", function($scope, $http) {
  $scope.helloTo = {};
  $scope.helloTo.title = "Weirdo, AngularJS";
  
  $scope.myData = {};
  $scope.myData.textf = function() {return "A text from a function"; };
  $scope.myData.showIt = true;
  $scope.myData.switch = 3;
  $scope.myData.items = [ {text : "one"}, {text : "two"}, {text : "three"} ];
  $scope.myData.myObject = { erpa : "value-1", katang : "value-2", blerg : "value-3"};
  $scope.myData.sortField = "text";
  $scope.myData.sortField2 = "name";
  $scope.myData.reverse = true;

  $scope.katang = {};
  $scope.katang.foo = "bar";

  $scope.myData.doClick = function(event) {
    alert("clicked: " + event.clientX + ", " + event.clientY);
  };

  $scope.myData.doClick2 = function(item, event) {
    alert("clicked: " + item.text + " @ " + event.clientX + ", " + event.clientY);
  };

  $scope.myData.doClick3 = function(item, event) {

    var responsePromise = $http.get("foo.json");

    responsePromise.success(function(data, status, headers, config) {
      $scope.myData.fromServer = data.name;
    });
    responsePromise.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });
  };

  $scope.myForm = {};
  $scope.myForm.car  = ["nissan"];
  
  $scope.myForm.options = [
    { id : "nissan", name: "Nissan" },
    { id : "toyota", name: "Toyota" },
    { id : "fiat"  , name: "Fiat" }
  ];
  
  // $scope.myData.textf = function() {return "class=\"erpa\"" };

});

app.directive('myDir', function() {
  var hrmf = {};
  hrmf.foo = "blarg";
  return {
    restrict: 'E',
    scope: {},
    template: '<div><h3>Directive: {{ hrmf.foo }}</h3><input type="text" ng-model="hrmf.foo" /></div>'
  };
});
