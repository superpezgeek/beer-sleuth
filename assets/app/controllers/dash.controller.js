(function() {
  function DashCtrl(BeerMdl) {
    var vm = this;

    vm.search = search;
    vm.selectBeer = selectBeer;

    function search(term) {
      if (!term) {
        vm.results = null;
        vm.bars = null;

        return;
      }

      BeerMdl.typeahead(term).then(function(res) {
        vm.results = res;
      });
    }

    function selectBeer(beer) {
      vm.searchTerm = beer.name;
      vm.results = null;
      vm.bars = null;

      BeerMdl.searchBars(beer).then(function(res) {
        vm.bars = res;
      });
    }
  }

  DashCtrl.$inject = [ 'BeerMdl' ];

  angular
    .module('beersleuth.controllers')
    .controller('DashCtrl', DashCtrl);
})();

