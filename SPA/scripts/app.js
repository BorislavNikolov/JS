const app = Sammy("#rootElement", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);
    this.get('#/dashboard', homeController.getDashboard);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Cause
    this.get('#/createCause', causeController.getCreateCause);
    this.post('#/createCause', causeController.postCreateCause);
    this.get('#/detailsCause/:causeId', causeController.getDetailsCause);
    this.get('#/deleteCause/:causeId', causeController.postDeleteCause);
});

(() => {
    app.run('#/home');
})();