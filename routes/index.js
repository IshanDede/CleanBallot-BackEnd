module.exports = (app) => {
  app.use("/api", require("./candidates"));
  app.use("/api", require("./voters"));
  app.use("/api", require("./auth.route"));
};
