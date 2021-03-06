angular.module("association", [ 'ui.bootstrap' ])

  // Association controller
  .controller("AssociationCtrl", function($scope, $http, $window) {
    $scope.success = false;
    $scope.device = {};
    $scope.alerts = [];
    $scope.device.href = '';
    $scope.device.hasUrl = false;

    var url = $window.location.search.split("url=").pop().split('&').shift();
    var hasUrl = $window.location.search.indexOf("url=") != -1;
    if(hasUrl) {
      $scope.device.url = url;
      $scope.device.hasUrl = true;
    }

    // ----- PUT /id/identifier -----
    $scope.device.update = function(item, event) {
      var json = { url: $scope.device.url };

      $http.put('../associations/' + $scope.device.identifier + '/url', json)
        .success(function(data, status, headers, config) {
          $scope.success = true;
          var message = 'Successfully associated device identifier ' +
                        $scope.device.identifier + ' with URL ' +
                        $scope.device.url;
          $scope.alerts.push( { type: "success", message: message } );
          $scope.device.href = 'contextnear/transmitter/' +
                               $scope.device.identifier;
          $scope.device.query = 'Query context near the device';
        })
        .error(function(data, status, headers, config) {
          var message = "Association failed. Status code " + status;
          $scope.alerts.push( { type: "danger", message: message } );
        });
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
