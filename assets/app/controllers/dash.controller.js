(function() {
  function DashCtrl(BeerMdl, LocationSvc) {
    var vm = this;

    vm.search = search;
    vm.selectBeer = selectBeer;

    var location;
    var map;

    google.maps.event.addDomListener(window, 'load', _initMap);

    function search(term) {
      if (!term) {
        vm.results = null;
        vm.bars = null;

        return;
      }

      if (term.split('').length < 3) { return; }

      BeerMdl.typeahead(term).then(function(res) {
        vm.results = res;
      });
    }

    function selectBeer(beer) {
      vm.searchTerm = beer.name;
      vm.results = null;
      vm.bars = null;

      if (location && Object.keys(location).length) {
        return __searchBars();
      } else {
        return LocationSvc.get().then(__searchBars);
      }

      function __searchBars(location) {
        BeerMdl.searchBars(beer, location).then(function(res) {
          vm.bars = res;

          _displayMap(location);
        });
      }
    }

    function _displayMap(location) {
      if (!map) { return; }

      var markers = [];
      var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);
      var bounds = new google.maps.LatLngBounds();

      angular.forEach(vm.bars, function(bar) {
        var barLatLng = new google.maps.LatLng(bar.location[0],bar.location[1]);
        bounds.extend(barLatLng);

        var marker = new google.maps.Marker({
          position: barLatLng,
          map: map,
          title: bar.name
        });

        google.maps.event.addListener(marker, 'click', (function(marker) {
          return function() {
            infoWindow.setContent(bar.name);
            infoWindow.open(map, marker);
          };
        })(marker));

        map.fitBounds(bounds);
      });
    }

    function _initMap() {
      var latlng = new google.maps.LatLng(40.4397, -79.9764);
      var myOptions = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('map'), myOptions);
    }
  }

  DashCtrl.$inject = [ 'BeerMdl', 'LocationSvc' ];

  angular
    .module('beersleuth.controllers')
    .controller('DashCtrl', DashCtrl);
})();

