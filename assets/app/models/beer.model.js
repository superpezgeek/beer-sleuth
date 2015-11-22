(function() {
  function BeerMdl(SearchSvc, LocationSvc) {
    BeerMdl.typeahead = typeahead;
    BeerMdl.getBars = getBars;

    function typeahead(term) {
      return SearchSvc.search(term);
    }

    function getBars(beer) {
      LocationSvc.get().then(function(location) {
        console.log(location);
        console.log(beer);
      });
    }

    return BeerMdl;
  }

  BeerMdl.$inject = ['SearchSvc', 'LocationSvc'];

  angular
    .module('beersleuth.services')
    .factory('BeerMdl', BeerMdl);
})();

