angular.module('wechat.controllers', [])

.controller('MessagesCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService){ 
  $scope.popupMessageOpthins = function(message) {
      $scope.popup.index = $scope.messages.indexOf(message);
      $scope.popup.optionsPopup = $ionicPopup.show({
          templateUrl: "templates/popup.html",
          scope: $scope,
      });
      $scope.popup.isPopup = true;
  };

  $scope.markMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      if (message.showHints) {
          message.showHints = false;
          message.noReadMessages = 0;
      }else {
          message.showHints = true;
          message.noReadMessages = 1;
      }
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
      messageService.updateMessage(message);
  };

  $scope.topMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      if (message.isTop) {
          message.isTop = 0;
      }else {
          message.isTop = new Date().getTime();
      }
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
      messageService.updateMessage(message);
  };

  $scope.deleteMessage = function() {
      var index = $scope.popup.index;
      var message = $scope.messages[index];
      $scope.messages.splice(index, 1); //临时删除
      $scope.popup.optionsPopup.close();
      $scope.popup.isPopup = false;
  };

  $scope.messageDetils = function(message) {
      $state.go("messageDetail", {
          "messageId": message.id
      });
  };

  $scope.$on("$ionicView.beforeEnter", function(){
      $scope.messages = messageService.getAllMessages();
      // console.log($scope.messages);
      $scope.popup = {
          isPopup: false,
          index: 0
      };
  });

})
.controller('messageDetailCtrl',  ['$scope', '$state', '$stateParams',
    'messageService', '$ionicScrollDelegate', '$timeout', 
    function($scope, $state, $stateParams, messageService, $ionicScrollDelegate, $timeout){
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');

        $scope.doRefresh = function() {
            // console.log("ok");
            $scope.messageNum += 5;
            $timeout(function() {
                $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                    $stateParams.messageId);
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };

        $scope.userInfo = function(message) {
            $state.go('userInfo', {
                "userId": message.id
            })
        }
        
        $scope.$on("$ionicView.beforeEnter", function() {
            $scope.message = messageService.getMessageById($stateParams.messageId);
            $scope.message.noReadMessages = 0;
            $scope.message.showHints = false;
            messageService.updateMessage($scope.message);
            $scope.messageNum = 10;
            $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                $stateParams.messageId);
            $timeout(function() {
                viewScroll.scrollBottom();
            }, 0);
        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
}])

.controller('FriendsCtrl', function($scope, $state, userService) {
    $scope.userInfo = function(user) {
        $state.go("userInfo", {
            "userId": user.id
        });
    };

    $scope.$on("$ionicView.beforeEnter", function() {
        $scope.users = userService.getUsers();
        /*userService.getUsers().then(function(data){
            $scope.users = data;
        });*/
    });
})
.controller('userInfoCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'userService', 
  function($scope, $state, $stateParams, $ionicHistory, userService) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.messageDetils = function(message) {
        $state.go("messageDetail", {
            "messageId": message.id
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.user = userService.getUserById($stateParams.userId);
        
        /*userService.getUsers().then(function(data){
            $scope.users = data;
        });*/
        // $scope.user = userService.getUser($stateParams.index);

    })
}])

.controller('FindCtrl', ['$scope', function($scope){
  
}])

.controller('MyPageCtrl', ['$scope', function($scope){
  
}])