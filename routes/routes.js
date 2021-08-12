const userRoutes = require("./users.js"); //load up the users route

const appRouter = (app, fs) => {
  //route to handle empty route
  app.get("/", (req, res) => {
    res.send("Developing an API server");
  });

  userRoutes(app, fs); //running the user route
};

module.exports = appRouter;
