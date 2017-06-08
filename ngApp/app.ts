namespace quiz {

    angular.module('quiz', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: quiz.Controllers.UsersController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: quiz.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('admin', {
              url: '/admin',
              templateUrl: '/ngApp/views/admin.html',
              controller: quiz.Controllers.UsersController,
              controllerAs: 'controller',
              data: {
                isLoggedIn: true,
                privileges: 'A'
              }
            })
            .state('register', {
              url: '/register',
              templateUrl: '/ngApp/views/register.html',
              controller: quiz.Controllers.UsersController,
              controllerAs: 'controller',

            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });
    angular.module('quiz').run(($rootScope, $state, usersService, $window) => {
      $rootScope.$on('$stateChangeStart', (e, state) => {
        if($state.current.name) {
          $window.sessionStorage.setItem('previousState', $state.current.name);
        }
      });
      $rootScope.$on('$stateChangeStart', (e, state) => {
        if (state.data && state.data.isLoggedIn) {
          if (!usersService.getUserData()) {
          e.preventDefault();
          $state.go('home');
        } else if (!validateUserPrivileges(usersService.getUserRole(), state.data.privileges)) {
        e.preventDefault();
        $state.go($window.sessionStorage.priviousState);
        }
      }
      });
    });
    function validateUserPrivileges(userRole, requiredRole){
      return assignRoleValue(userRole) <= assignRoleValue(requiredRole);
    }

    function assignRoleValue(role) {
      switch(role) {
          case 'A':
          return 1;
          case 'U':
          return 2;
      }
    }


}
