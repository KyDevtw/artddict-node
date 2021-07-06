// Event 路由建立

const express = require("express");
const router = express.Router();


// 引入 Event SQL 語法
const Event = require("../domain/event.js");

// mysql2 async-await用的
const dbMysql2 = require("../db/database");

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = "get",
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql);

    switch (method) {
      case "post": {
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId };
        // 合併id值
        const result = { ...instance, ...insertId };
        //回傳
        res.status(200).json(result);
        break;
      }
      case "put": {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {};
        if (rows.affectedRows) result = { ...instance };
        //回傳
        res.status(200).json(result);
        break;
      }
      case "delete": {
        // 仿照json-server的回傳
        res.status(200).json({});
        break;
      }
      case "get":
      default:
        {
          if (multirows) {
            // res.status(200).json({
            //   users: rows,
            // })
            res.status(200).json(rows);
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {};
            if (rows.length) result = rows[0];
            res.status(200).json(result);
          }
        }
        break;
    }
  } catch (error) {
    // 錯誤處理
    console.log(error);

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    });
  }
}

// instance 物件實體，預設為空物件
async function userLogin(sql, req, res, instance) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql);

    // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
    let result = {};
    if (rows.length) {
      result = rows[0];

      req.session.regenerate(function (err) {
        if (err) {
          res.status(200).json({ status: 2, message: "登入失敗" });
        }

        req.session.loginId = result.id;
        req.session.loginName = result.name;
        req.session.loginEmail = result.email;
        req.session.loginUsername = result.username;
        req.session.loginCreatedDate = result.createDate;

        // 如果要用全訊息可以用以下的回傳
        // res.json({ status: 0, message: '登入成功' })
        res.status(200).json(result);
      });
    } else {
      res.status(200).json({ status: 1, message: "帳號或密碼錯誤" });

      //res.status(200).json(result)
    }
  } catch (error) {
    // 錯誤處理
    console.log(error);

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    });
  }
}

// 以下為路由



// 檢查是否登入
// router.get("/checklogin", function (req, res, next) {
//   const sess = req.session;

//   const id = sess.loginId;
//   const username = sess.loginUsername;
//   const name = sess.loginName;
//   const email = sess.loginEmail;
//   const createDate = sess.loginCreatedDate;

//   const isLogined = !!name;

//   if (isLogined) {
//     res.status(200).json({ id, name, username, email, createDate });
//   } else {
//     // 登出狀態時回傳`{id:0}`
//     res.status(200).json({ id: 0 });
//   }
// });

// get 處理獲取全部的資料列表
// AND查詢加入`?name=eddy&email=XXX&username=XXXX

router.get("/event-list/detail/:id?", (req, res, next) => {
  executeSQL(Event.getEventByIdSQL(req.params.userId), res, "get", false);

});

router.get("/event-list", (req, res, next) => {
  console.log(req.query)

  if (!Object.keys(req.query).length) executeSQL(Event.getAllEventSQL(), res);
  else executeSQL (Event.getEventByQuerySQL(req.query), res);

  //   if (!Object.keys(req.query).length) executeSQL(User.getAllEventSQL(), res);
  //   else executeSQL(User.getUserByQuerySQL(req.query), res);
});



//export default router
module.exports = router;
