(function() {
  function BeerMdl(SearchSvc, LocationSvc, $resource) {
    BeerMdl.typeahead = typeahead;
    BeerMdl.searchBars = searchBars;

    var location;

    function typeahead(term) {
      return SearchSvc.search(term);
    }

    function searchBars(beer) {
      if (location && Object.keys(location).length) {
        return _searchBars();
      } else {
        return LocationSvc.get().then(_searchBars);
      }

      function _searchBars(res) {
        location = res || location;
        var params = {
          beer: beer._id,
          location: location.latitude + ',' + location.longitude,
          radius: 49999
        };

        return api.searchBars(params).$promise;
      }
    }

    var api = $resource('https://intense-bayou-8980.herokuapp.com/locations', {}, {
      searchBars: {
        method: 'GET',
        isArray: true
      }
    });

    return BeerMdl;
  }

  BeerMdl.$inject = ['SearchSvc', 'LocationSvc', '$resource'];

  angular
    .module('beersleuth.services')
    .factory('BeerMdl', BeerMdl);
})();

