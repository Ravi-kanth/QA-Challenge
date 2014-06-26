(function() {
  "use strict";
  var App, AppCtrl;

  App = angular.module("app", ['ngRoute', 'src.templates', 'mx.menu', 'services.alerts', 'app.filters', 'app.home', 'app.examples', 'app.receiver', 'app.list', 'app.add', 'app.view', 'app.edit', 'app.delete', 'app.signup', 'g4plus.flash-message', 'g4plus-date.directive', 'g4ActionsButton']);

  App.config(function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'src/app/home/home.jade',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/examples', {
      templateUrl: 'src/app/examples/examples.jade',
      controller: 'ExamplesCtrl'
    });
    $routeProvider.when('/receiver', {
      templateUrl: 'src/app/receiver/receiver.jade',
      controller: 'ReceiverCtrl'
    });
    $routeProvider.when('/list', {
      templateUrl: 'src/app/ui_flow/list/list.jade',
      controller: 'ListCtrl'
    });
    $routeProvider.when('/view/:id', {
      templateUrl: 'src/app/ui_flow/view/view.jade',
      controller: 'ViewCtrl'
    });
    $routeProvider.when('/add', {
      templateUrl: 'src/app/ui_flow/add/add.jade',
      controller: 'AddCtrl'
    });
    $routeProvider.when('/edit/:id', {
      templateUrl: 'src/app/ui_flow/edit/edit.jade',
      controller: 'EditCtrl'
    });
    $routeProvider.when('/signup', {
      templateUrl: 'src/app/signup/signup.jade',
      controller: 'SignupCtrl'
    });
    return $routeProvider.otherwise({
      redirectTo: "/home"
    });
  });

  App.controller("AppCtrl", AppCtrl = function($scope, $location) {
    return $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        return $scope.pageTitle = toState.data.pageTitle + " | G4Plus";
      }
    });
  });

  App.config(function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    return $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  });

}).call(this);
;(function() {
  var examples;

  examples = angular.module("app.examples", []);

  examples.controller("ExamplesCtrl", [
    '$scope', '$location', 'Alerts', function($scope, $location, Alerts) {
      $scope.methodForDoccoDemonstration = function() {
        return true;
      };
      $scope.toggle = function() {
        return $scope.methodExample = !$scope.methodExample;
      };
      $scope.passToController = function() {
        Alerts.set($scope.outgoingMessage);
        return $location.url('/receiver');
      };
      $scope.pageTitle = "Examples";
      $scope.twoWayBindingExample = "";
      $scope.methodExample = true;
      $scope.incomingMessage = Alerts.get();
      $scope.outgoingMessage = "Foo";
      $scope.itemsPerPage = 10;
      $scope.itemsPerPageList = [10, 25, 50, 100];
      return $scope.actionsList = [
        {
          label: 'Primary Action',
          action: null,
          icon: 'g4-icon-add'
        }, {
          label: 'Help',
          action: null,
          icon: 'g4-icon-help'
        }
      ];
    }
  ]);

}).call(this);
;(function() {
  var filters;

  filters = angular.module('app.filters', []);

  filters.filter('date', function() {
    return function(input) {
      var digits, parsed;
      if (typeof input === 'string') {
        digits = input.replace(/\D/g, '');
        switch (digits.length) {
          case 8:
            parsed = moment(digits, ['YYYYMMDD', 'MMDDYYYY']);
            break;
          case 6:
            parsed = moment(digits, ['YYMMDD', 'MMDDYY']);
        }
        if (parsed != null ? parsed.isValid() : void 0) {
          return parsed.format('YYYY/MM/DD');
        }
      }
      return input;
    };
  });

}).call(this);
;(function() {
  var home;

  home = angular.module("app.home", []);

  home.controller("HomeCtrl", [
    '$scope', function($scope) {
      $scope.methodForDoccoDemonstration = function() {
        return alert('hi!');
      };
      $scope.pageTitle = "MX Skeleton Project";
      return $scope.foo = "Welcome to the G4Plus Brunch/AngularJS/Jade Skeleton!";
    }
  ]);

}).call(this);
;(function() {
  var about;

  about = angular.module("app.receiver", ['services.alerts']);

  about.controller("ReceiverCtrl", [
    '$scope', '$location', 'Alerts', function($scope, $location, Alerts) {
      $scope.passToController = function() {
        Alerts.set($scope.outgoingMessage);
        return $location.path("/examples");
      };
      $scope.pageTitle = "Receiver Page";
      $scope.incomingMessage = Alerts.get();
      return $scope.outgoingMessage = "Bar";
    }
  ]);

}).call(this);
;(function() {
  var module;

  module = angular.module('services.alerts', []);

  module.factory('Alerts', function() {
    var message;
    message = "";
    return {
      set: function(mes) {
        return message = mes;
      },
      get: function() {
        return message;
      }
    };
  });

}).call(this);
;(function() {
  var signup;

  signup = angular.module("app.signup", []);

  signup.directive("usernamePattern", function() {
    return {
      require: "^ngModel",
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        var pattern;
        pattern = new RegExp('^[a-zA-Z][a-zA-Z0-9\.\_\-]+[a-zA-Z]$', 'g');
        return ctrl.$parsers.unshift(function(value) {
          if (!!value && value.match(pattern)) {
            ctrl.$setValidity('pattern', true);
            return value;
          } else {
            ctrl.$setValidity('pattern', false);
            return void 0;
          }
        });
      }
    };
  });

  signup.directive("passwordPattern", function() {
    return {
      require: "^ngModel",
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        var pattern;
        pattern = new RegExp('^[a-zA-Z0-9@_$]+$', 'g');
        return ctrl.$parsers.unshift(function(value) {
          var allReqFound, i, requiredChars;
          if (!!value && value.match(pattern)) {
            allReqFound = true;
            requiredChars = ['[$@_]', '[a-z]', '[A-Z]', '[0-9]'];
            for (i in requiredChars) {
              if (!value.match(requiredChars[i])) {
                allReqFound = false;
              }
            }
            if (allReqFound) {
              ctrl.$setValidity('pattern', true);
              return value;
            } else {
              ctrl.$setValidity('pattern', false);
              return void 0;
            }
          } else {
            ctrl.$setValidity('pattern', false);
            return void 0;
          }
        });
      }
    };
  });

  signup.directive("emailPattern", function() {
    return {
      require: "^ngModel",
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        var pattern;
        pattern = new RegExp('^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\\.([a-zA-Z])+([a-zA-Z])+$', 'i');
        return ctrl.$parsers.unshift(function(value) {
          if (!!value && value.match(pattern)) {
            ctrl.$setValidity('pattern', true);
            return value;
          } else {
            ctrl.$setValidity('pattern', false);
            return void 0;
          }
        });
      }
    };
  });

  signup.controller("SignupCtrl", [
    '$scope', function($scope) {
      $scope.showErrors = false;
      return $scope.success = function() {
        return alert("Huzzah! Some 'success' event should happen!");
      };
    }
  ]);

}).call(this);
;(function() {
  var add;

  add = angular.module('app.add', ['app.filters', 'ui.bootstrap']);

  add.controller('AddCtrl', [
    '$scope', '$location', '$window', '$filter', 'flashStorage', function($scope, $location, $window, $filter, flashStorage) {
      var postWs;
      postWs = {
        post: function() {},
        success: function(data, status, headers, config) {},
        error: function(data, status, headers, config) {}
      };
      $scope.postWs = function() {
        return postWs.post();
      };
      $scope.confirm = function() {
        $scope.postWs();
        $location.path("/list").replace();
        return $location.url("/view/" + $scope.item.code);
      };
      $scope.cancel = function() {
        return $window.history.back();
      };
      $scope.pageTitle = "Add [Object Type]";
      $scope.dateFilter = $filter('date');
      $scope.item = {
        code: "",
        title: "",
        description: "",
        date: "",
        checkbox: false
      };
      flashStorage.set({
        level: "danger",
        message: "[Object Type] could not be",
        tagline: "Error",
        icon: "icon-remove",
        action: "created",
        status: "500*"
      });
      $scope.message = flashStorage.get();
      return $scope.dateFilter = $filter('date');
    }
  ]);

  add.filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });

}).call(this);
;(function() {
  var del;

  del = angular.module('app.delete', ['ui.bootstrap']);

  del.controller('DeleteCtrl', [
    '$scope', '$http', '$modalInstance', 'code', function($scope, $http, $modalInstance, code) {
      var deleteWs;
      deleteWs = {
        "delete": function() {},
        success: function(data, status, headers, config) {
          return $modalInstance.close(true);
        },
        error: function(data, status, headers, config) {}
      };
      $scope.confirm = function() {
        return deleteWs.success();
      };
      $scope.dismiss = $scope.cancel = function() {
        return $modalInstance.dismiss();
      };
      $scope.code = code;
      return $scope.pageTitle = "Delete [Object Type]";
    }
  ]);

}).call(this);
;(function() {
  var edit;

  edit = angular.module('app.edit', ['app.filters', 'ui.bootstrap']);

  edit.controller('EditCtrl', [
    '$scope', '$location', '$window', '$filter', '$timeout', 'flashStorage', function($scope, $location, $window, $filter, $timeout, flashStorage) {
      var getWs, id, putWs;
      getWs = {
        get: function() {},
        success: function(data, status, headers, config) {
          return $scope.group = data;
        },
        error: function(data, status, headers, config) {}
      };
      putWs = {
        put: function() {},
        success: function(data, status, headers, config) {},
        error: function(data, status, headers, config) {}
      };
      $scope.getWs = function() {
        return getWs.get();
      };
      $scope.putWs = function() {
        return putWs.put();
      };
      $scope.confirm = function() {
        $location.path("/list").replace();
        return $timeout(function() {
          return $location.url("/view/" + $scope.item.code);
        }, 5);
      };
      $scope.cancel = function() {
        return $window.history.back();
      };
      $scope.pageTitle = "Edit [Object Type]";
      $scope.dateFilter = $filter('date');
      $scope.code = id = $location.url().replace(/^\D+/g, '');
      $scope.item = {
        code: $scope.code,
        title: "Item title",
        description: "Details about item",
        date: "",
        checkbox: true
      };
      flashStorage.set({
        level: "danger",
        message: "[Object Type] could not be",
        tagline: "Error",
        icon: "icon-remove",
        action: "edited",
        status: "500*"
      });
      $scope.message = flashStorage.get();
      return $scope.dateFilter = $filter('date');
    }
  ]);

  edit.filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });

}).call(this);
;(function() {
  var list;

  list = angular.module('app.list', ['ui.bootstrap', 'g4plus.pagination', 'g4plus.list-filter']);

  list.controller('ListCtrl', [
    '$scope', '$location', '$modal', '$filter', 'flashStorage', function($scope, $location, $modal, $filter, flashStorage) {
      var item, listWs, updateItemList, updateUrl, urlParams;
      listWs = {
        listWs: function() {},
        success: function(data, status, headers, config) {},
        error: function(data, status, headers, config) {}
      };
      $scope.openDelete = function(code) {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'src/app/ui_flow/delete/modal.jade',
          controller: 'DeleteCtrl',
          resolve: {
            code: function() {
              return code;
            }
          }
        });
        return modalInstance.result.then(function() {
          delete $scope.list[code - 1];
          $scope.list.length--;
          $scope.message = {
            item: "[Object Type]",
            type: "success",
            message: "was",
            action: "deleted",
            status: "200"
          };
          $scope.clearMessage($scope.message2);
          return $scope.clearMessage($scope.message3);
        });
      };
      updateUrl = function() {
        var key, queryString;
        queryString = "";
        for (key in $scope.params) {
          queryString = queryString + key + "=" + $scope.params[key] + "&";
        }
        queryString = queryString + "filter_option=" + $scope.filter_state.option + "&" + "filter_value=" + $scope.filter_state.value + "&";
        return $location.url("/list?" + queryString);
      };
      updateItemList = function() {
        var filtered_list;
        filtered_list = $filter('listFilter')($scope.list, $scope.filter_state.value, $scope.filter_state.option);
        $scope.paginated_list = filtered_list.slice(($scope.params.page - 1) * $scope.params.pageSize, $scope.params.page * $scope.params.pageSize);
        return $scope.list_length = filtered_list.length;
      };
      $scope.clearList = function() {
        if ($scope.params.select === "9") {
          $scope.list = [];
        } else {
          $scope.list = [
            {
              "id": 1,
              "code": "1",
              "title": "Alpha",
              "description": "Details about item"
            }, {
              "id": 2,
              "code": "2",
              "title": "Beta",
              "description": "Details about item"
            }, {
              "id": 3,
              "code": "3",
              "title": "Gamma",
              "description": "Details about item"
            }, {
              "id": 4,
              "code": "4",
              "title": "Delta",
              "description": "Details about item"
            }, {
              "id": 5,
              "code": "5",
              "title": "Epsilon",
              "description": "Details about item"
            }, {
              "id": 6,
              "code": "6",
              "title": "Alpha",
              "description": "Details about item"
            }, {
              "id": 7,
              "code": "7",
              "title": "Beta",
              "description": "Details about item"
            }, {
              "id": 8,
              "code": "8",
              "title": "Gamma",
              "description": "Details about item"
            }, {
              "id": 9,
              "code": "9",
              "title": "Delta",
              "description": "Details about item"
            }, {
              "id": 10,
              "code": "10",
              "title": "Epsilon",
              "description": "Details about item"
            }, {
              "id": 11,
              "code": "11",
              "title": "Alpha",
              "description": "Details about item"
            }, {
              "id": 12,
              "code": "12",
              "title": "Beta",
              "description": "Details about item"
            }, {
              "id": 13,
              "code": "13",
              "title": "Gamma",
              "description": "Details about item"
            }, {
              "id": 14,
              "code": "14",
              "title": "Delta",
              "description": "Details about item"
            }, {
              "id": 15,
              "code": "15",
              "title": "Epsilon",
              "description": "Details about item"
            }
          ];
        }
        $scope.list_length = $scope.list.length;
        return updateItemList();
      };
      $scope.pageTitle = '[Object Type] List';
      $scope.params = {
        select: "",
        "pageSize": "10",
        "page": "1"
      };
      $scope.filter_state = {
        option: "_all",
        value: "",
        optionList: [
          {
            key: '_all',
            label: 'All'
          }, {
            key: 'code',
            label: 'Code'
          }, {
            key: 'title',
            label: 'Title'
          }, {
            key: 'description',
            label: 'Description'
          }
        ],
        filterBy: function(value, option) {
          $scope.filter_state.value = value;
          $scope.filter_state.option = option;
          return updateUrl();
        }
      };
      $scope.select = {
        1: "Option 1",
        2: "Option 2",
        3: "Option 3",
        9: "Clear List"
      };
      $scope.list = [];
      flashStorage.set({
        level: "success",
        message: "Aircraft Program list was",
        tagline: "Success",
        icon: "icon-ok-circle",
        action: "retreived",
        status: "200*"
      });
      $scope.message = flashStorage.get();
      $scope.message2 = {
        level: "warning",
        message: "Aircraft Program list was",
        tagline: "Warning",
        icon: "icon-remove",
        action: "retreived",
        status: "200*"
      };
      $scope.message3 = {
        level: "danger",
        message: "Aircraft Program list could not be",
        tagline: "Error",
        icon: "icon-remove",
        action: "retreived",
        status: "500*"
      };
      urlParams = $location.search();
      for (item in urlParams) {
        if (item === 'filter_option') {
          $scope.filter_state.option = urlParams[item];
        } else if (item === 'filter_value') {
          $scope.filter_state.value = urlParams[item];
        } else {
          $scope.params[item] = urlParams[item];
        }
      }
      $scope.$watch('params', (function() {
        return updateUrl();
      }), true);
      $scope.$watch('params.select', (function() {
        return $scope.clearList();
      }));
      $scope.actionsList = [
        {
          label: 'Add [Object Type]',
          action: null,
          link: '#/add',
          linkState: null,
          icon: 'g4-icon-add'
        }, {
          label: 'Help',
          action: null,
          icon: 'g4-icon-help'
        }
      ];
      return updateItemList();
    }
  ]);

  list.filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });

  list.filter('listFilter', [
    '$filter', function($filter) {
      return function(input, value, option) {
        var filter_column, output;
        output = input;
        if (value.length) {
          if (option && option !== '_all') {
            filter_column = {};
            filter_column[option] = value;
            output = $filter('filter')(input, filter_column);
          } else {
            output = $filter('filter')(input, value);
          }
        }
        return output;
      };
    }
  ]);

}).call(this);
;(function() {
  var view;

  view = angular.module('app.view', ['app.filters', 'ui.bootstrap']);

  view.controller('ViewCtrl', [
    '$scope', '$location', '$modal', '$window', '$filter', 'flashStorage', function($scope, $location, $modal, $window, $filter, flashStorage) {
      var getWs, id, putWs;
      getWs = {
        get: function() {},
        success: function(data, status, headers, config) {},
        error: function(data, status, headers, config) {}
      };
      putWs = {
        put: function() {},
        success: function(data, status, headers, config) {},
        error: function(data, status, headers, config) {}
      };
      $scope.openDelete = function(code) {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'src/app/ui_flow/delete/modal.jade',
          controller: 'DeleteCtrl',
          resolve: {
            code: function() {
              return code;
            }
          }
        });
        return modalInstance.result.then(function() {
          return $location.url("/list");
        });
      };
      $scope.getWs = function() {
        return getWs.get();
      };
      $scope.putWs = function() {
        return putWs.put();
      };
      $scope.pageTitle = "View [Object Type]";
      $scope.dateFilter = $filter('date');
      $scope.code = id = $location.url().replace(/^\D+/g, '');
      $scope.item = {
        code: $scope.code,
        title: "Item title",
        description: "Details about item",
        date: "",
        checkbox: true
      };
      flashStorage.set({
        level: "danger",
        message: "[Object Type] could not be",
        tagline: "Error",
        icon: "icon-remove",
        action: "created",
        status: "500*"
      });
      $scope.message = flashStorage.get();
      $scope.dateFilter = $filter('date');
      $scope.isView = true;
      return $scope.actionsList = [
        {
          label: 'Edit',
          link: '#/edit/' + $scope.code,
          icon: 'g4-icon-edit'
        }, {
          label: 'Delete',
          action: (function() {
            return $scope.openDelete($scope.code);
          }),
          icon: 'g4-icon-delete'
        }, {
          label: 'Help',
          action: null,
          icon: 'g4-icon-help'
        }
      ];
    }
  ]);

  view.filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  });

}).call(this);
;
//# sourceMappingURL=app.js.map