// Event 路由建立

const express = require("express");
const router = express.Router();

// 引入 Event SQL 語法
const Event = require("../domain/auction.js");

// mysql2 async-await用的
const dbMysql2 = require("../db/database");



module.exports = router;
