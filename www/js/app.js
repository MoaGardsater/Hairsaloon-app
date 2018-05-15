angular.module('HairdresserApp', ['ionic'])

  // Lägg till denna metod för att visa flikarna längst ner även på Android.
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position("bottom");
  })
//Här finns alla states för siten, dessa behövs för att kunna navigera sig runt.
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("tabs", {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      .state("tabs.home", {
        url: "/home",
        views: {
          "home-tab": {
            templateUrl: "templates/home.html"
          }
        }
      })

      .state("tabs.list", {
        url: "/list",
        views: {
          "list-tab": {
            controller: "ListController",
            templateUrl: "templates/list.html"
          }
        }
      })
      .state("tabs.detail", {
        url: "/list/:aID",
        views: {
          "list-tab": {
            templateUrl: "templates/detail.html",
            controller: "ListController"
          }
        }
      })

    $urlRouterProvider.otherwise("/tab/home");
  })

  // Min Controller
  .controller("ListController", function ($scope, $http, $state, $stateParams, $filter) {
  
    // Hämta JSON-listan via http.get()
    $http.get('../model/data.json')
      .success(function (data) {
        $scope.rooms = data;
        $scope.whichsaloon = $state.params.aID;
        console.log($scope.whichsaloon);
        // $state innehåller all info om en aktuell state
        console.log("$state : " + $state);
        // $stateParams innehåller enbart info om
        // parametrar t.ex. aID som vi skickar via href
        // Titta i filen list.html under ion-item
        console.log("$stateParams : " + $stateParams.aID);
      })

  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })