
const homeRoutes = require("./home.route")
const TDLRoutes = require('./todolist.route')
const profileRoutes = require("./profile.route");

module.exports = (app) => {
    app.use("/",homeRoutes);
    app.use("/to-do-list",TDLRoutes)
    app.use("/profile",profileRoutes)
};