
const homeRoutes = require("./home.route")
const TDLRoutes = require('./todolist.route')
const profileRoutes = require("./profile.route");
const testRoutes = require("./tes.route")

module.exports = (app) => {
    app.use("/",homeRoutes);
    app.use("/to-do-list",TDLRoutes)
    app.use("/profile",profileRoutes)
    app.use("/test",testRoutes)
};