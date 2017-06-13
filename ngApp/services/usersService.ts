namespace quiz.Services {

  export class UsersService {
    private userData;
    private previousState;
    private USER_RESOURCE = this.$resource('/api/usersApi/:action');
    private ADMIN_RESOURCE = this.$resource('/api/usersApi/:id');

    constructor(private $resource, private $window, private $state) {}

    public loginOrRegister(username, password, action) {
      console.log('made it: ' +  action);

      this.userData = this.USER_RESOURCE.save({action: action}, {username: username, password: password})
      .$promise.then((data)=> {
        if(data.token) {
        this.$window.sessionStorage.setItem('token', data.token);
        }
      if (data.role) {
        this.$window.sessionStorage.setItem('role', data.role);
      }
    });
    return this.userData;
    }

    public getUserRole() {
      return this.$window.sessionStorage.role;
    }

    public getUserData() {
      console.log(this.$window.sessionStorage.token);
      return this.$window.sessionStorage.token;
    }

    public getPreviousState() {
      return this.previousState;
    }
    public setPreviousState(state) {
      this.previousState = state;
    }
    public logout() {
      this.userData = null;
      this.$window.sessionStorage.removeItem('token');
      alert("Until next time with QuizMaster, code well!");
      this.$state.go('home');
    }
  }
  angular.module('quiz').service('usersService', UsersService);
}
