"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("@babel/polyfill");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./src/routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */

/* eslint-disable eol-last */
var app = (0, _express["default"])();
var port = process.env.PORT || 6500;
app.use(_express["default"].json());
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '50mb'
})); // app.use('*', cloudinaryConfig);

app.use(_express["default"].json());
app.use('/', _index["default"]);
app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'YaY! first endpoint works'
  });
});
app.listen(port, function () {
  return console.log("Server started on port ".concat(port));
});
var _default = app;
exports["default"] = _default;