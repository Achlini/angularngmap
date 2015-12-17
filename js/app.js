var mapApp = angular.module('mapApp',['ngMap','ngMaterial','firebase'])


mapApp.controller('mapController', function ($scope,$mdDialog,NgMap,$firebaseArray) {

  var ref = new Firebase("https://angngmapfire.firebaseio.com/markers");
  $scope.markers = $firebaseArray(ref);



  NgMap.getMap().then(function(map) {
      $scope.map = map;
    });



      $scope.showDialog=function(e,$event) {

        $scope.pos = e.latLng.toJSON();

         var parentEl = angular.element(document.body);
         $mdDialog.show({
           parent: parentEl,
           targetEvent: $event,
           template:
             '<md-dialog aria-label="List dialog" style="width:50%">' +
             '<center><h3 class="md-headline">Add info</h3></center>'+
             '  <md-dialog-content class="md-padding">'+
             '<md-input-container md-no-float class="md-block">'+
             '  <label>First name</label>'+
             '    <input ng-model="user.firstName">'+
             '</md-input-container>'+
             '<md-input-container md-no-float class="md-block">'+
             '  <label>Last name</label>'+
             '    <input ng-model="user.lastName">'+
             '</md-input-container>'+
             '  </md-dialog-content>' +
             '  <md-dialog-actions>' +
             '    <md-button ng-click="add(user)" class="md-primary">' +
             '      Add' +
             '    </md-button>' +
             '    <md-button ng-click="closeDialog()" class="md-primary">' +
             '      Close Dialog' +
             '    </md-button>' +
             '  </md-dialog-actions>' +
             '  </md-dialog-content>' +
             '</md-dialog>',
           locals: {
             pos: $scope.pos,
             map:$scope.map,
             markers:$scope.markers
           },
           controller:"dialogctrl"
        });

      }


      $scope.show=function (evt,m) {
        $scope.mr = m;
        console.log($scope.mr);
        $scope.map.showInfoWindow('info',this);
      }


});

mapApp.controller('dialogctrl',function($scope,$mdDialog,pos,map, markers){


  $scope.closeDialog = function() {
    $mdDialog.hide();
  }

  $scope.add = function(u) {
    u.pos=pos;
    markers.$add(u);

  $mdDialog.hide();
};




});
