const controllers = require('./controllers');

const router = (app) => {
  // Login routes
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);

  // Signup routes
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);

  // Logout
  app.get('/logout', controllers.Account.logout);

  // Main app page
  app.get('/maker', controllers.Domo.makerPage);
  //domomakerB
  app.post('/maker', controllers.Domo.makeDomo);

  // Default route
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;