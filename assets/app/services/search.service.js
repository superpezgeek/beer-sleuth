(function() {
  function SearchSvc($timeout, $resource) {
    SearchSvc.search = search;

    function search(term) {
      var params = { name: term };
      var promise = api.search(params).$promise;

      return promise;
    }

    var api = $resource('https://intense-bayou-8980.herokuapp.com/beers/typeahead', {}, {
      search: {
        method: 'GET',
        isArray: true
      }
    });

    return SearchSvc;
  }

  SearchSvc.$inject = ['$timeout', '$resource'];

  angular
    .module('beersleuth.services')
    .factory('SearchSvc', SearchSvc);
})();
