module.exports = (app) => {
  app.use("/api", require("./candidates"));
  app.use("/api", require("./voters"));
};
