// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicWechat', ['ionic', 'wechat.controllers', 'wechat.services', 'wechat.directives'])

.run(function($ionicPlatform, $http, messageService, userService, dateService) {

  var url = '';
  /*if (ionic.Platform.isAndroid) {
    url = "/android_assets/www/";
  }*/

  $http.get(url + "data/json/messages.json").then(function(response) {
      messageService.init(response.data.messages);
  });
  $http.get(url + "data/json/friends1.json").then(function(response){
      //console.log(response.data.results);
      userService.init(response.data.results)
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.tabs.position('bottom'); // other values: top
  $ionicConfigProvider.platform.android.tabs.style('standard');

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.messages', {
    url: '/messages',
    views: {
      'tab-Messages': {
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })
  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-Friends': {
        templateUrl: 'templates/friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })
  .state('tab.find', {
    url: '/find',
    views: {
      'tab-Find':{
        templateUrl: 'templates/find.html',
        controller: 'FindCtrl'
      }
    }
  })
  .state('tab.mypage', {
    url: '/mypage',
    views: {
      'tab-MyPage':{
        templateUrl: 'templates/mypage.html',
        controller: 'MyPageCtrl'
      }
    }
  })

  .state('messageDetail',{
    url: '/messageDetail/:messageId',
    templateUrl: "templates/message-detail.html",
    controller: "messageDetailCtrl"
  })
  .state('userInfo', {
    url: '/userInfo/:userId',
    templateUrl: "templates/userInfo.html",
    controller: "userInfoCtrl"
  })

  $urlRouterProvider.otherwise('tab/messages');

})