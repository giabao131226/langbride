const homeRoutes = require("./home.route");
const manageAccountRoutes = require("./manageAccount.route");
const managePostRoutes = require("./managePost.route");

module.exports = (app) => {
    app.use("/admin1", homeRoutes);
    app.use("/admin1/quan-ly-tai-khoan",manageAccountRoutes)
    app.use("/admin1/quan-ly-bai-dang",managePostRoutes)
}