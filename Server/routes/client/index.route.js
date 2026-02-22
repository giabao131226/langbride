
const homeRoutes = require("./home.route")
const TDLRoutes = require('./todolist.route')

module.exports = (app) => {
    app.use("/",homeRoutes);
    app.use("/to-do-list",TDLRoutes)
};