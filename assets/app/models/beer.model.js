(function() {
  function BeerMdl(SearchSvc, $resource) {
    BeerMdl.typeahead = typeahead;
    BeerMdl.searchBars = searchBars;

    var location;

    function typeahead(term) {
      return SearchSvc.search(term);
    }

    function searchBars(beer, location) {
      var params = {
        beer: beer._id,
        location: location.latitude + ',' + location.longitude,
        radius: 49999
      };

      return api.searchBars(params).$promise;
    }

    var api = $resource('https://intense-bayou-8980.herokuapp.com/locations', {}, {
      searchBars: {
        method: 'GET',
        isArray: true
      }
    });

    return BeerMdl;
  }

  BeerMdl.$inject = ['SearchSvc', '$resource'];

  angular
    .module('beersleuth.services')
    .factory('BeerMdl', BeerMdl);
})();

