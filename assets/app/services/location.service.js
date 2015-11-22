(function() {
  function LocationSvc($q, $cordovaGeolocation, $cordovaNetwork, $ionicLoading) {
    return {
      get: function() {
        var deferred = $q.defer();

        if(!navigator.connection || $cordovaNetwork.isOnline()) {
          $ionicLoading.show();

          $cordovaGeolocation
          .getCurrentPosition({
            timeout: 35000,
            maximumAge: Infinity,
            enableHighAccuracy: false
          })
          .then(function (currentPosition) {
            var params = {
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude
            };

            $ionicLoading.hide();
            deferred.resolve(params);
          })
          .catch(function() {
            $ionicLoading.hide();
            deferred.reject('no-gps');
          });
        } else {
          deferred.reject('no-connection');
        }

        return deferred.promise;
      }
    };
  }

  LocationSvc.$inject = [ '$q', '$cordovaGeolocation', '$cordovaNetwork', '$ionicLoading', '$ionicLoading' ];

  angular
    .module('beersleuth.services')
    .factory('LocationSvc', LocationSvc);
})();
