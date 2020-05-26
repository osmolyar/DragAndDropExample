require("@babel/register")({
    extensions: [".ts", ".js"],
});
module.exports = require("./wdio.local.config");