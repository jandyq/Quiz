namespace quiz.Controllers{
  const LOGIN = 'login';
  const REGISTER = 'register'

  export class UsersController{
    public user;
    public username;
    public password;
    public regUsername;
    public regPassword;

      constructor(private usersService, private $state) {}

    public login() {
      this.user = this.usersService.loginOrRegister(this.username, this.password, LOGIN)
        .then(() => this.$state.go('about'));
    }
    public register() {
      this.user = this.usersService.loginOrRegister(this.regUsername, this.regPassword, REGISTER)
        .then(() => this.$state.go('about'));
    }
    public logout() {

      this.usersService.logout();
    }
  }

  export class LogoutController {

    constructor(private usersService) {}


  }

  angular.module('quiz').controller('UsersController', UsersController);
}
