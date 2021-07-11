// Event 路由建立

const express = require("express");
const router = express.Router();

// 引入 Event SQL 語法
const Auction = require("../domain/auction.js");

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
  instance = {},
  pagesInfo = {},
) {
  try {
    //把資料從資料庫撈出來
    const [rows, fields] = await dbMysql2.promisePool.query(sql);
    console.log("有撈出來嗎", sql)
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
          // console.log(multirows)
          if (multirows) {
            // res.status(200).json({
            //   users: rows,
            // })
            // console.log(rows)
            res.status(200).json(rows);
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {};
            // console.log("到達",rows)
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


//auction查詢排列頁碼處理送出
async function executeSeaSQL(
  sql,
  res,
  method = "get",
  multirows = true,
  instance = {},
  pagesInfo = {},
) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql);

    let rowA = JSON.parse(JSON.stringify(rows))
    const perPage = 9;

    let totalrows =rowA.length
    let totalPages = Math.ceil(rowA.length/perPage)

    pagesInfo.totalRows = totalrows
    pagesInfo.totalPages = totalPages
    
    sql += pagesInfo.l_sql
    console.log(sql)
    const [rowsData, fieldsA] = await dbMysql2.promisePool.query(sql);
    let rowsDataA = JSON.parse(JSON.stringify(rowsData))

    console.log("總列數",totalrows,"總頁數",totalPages)

    console.log("夜面資料",pagesInfo)

    rowsDataA.unshift(pagesInfo)

    if (multirows) {
      // res.status(200).json({
      //   users: rows,
      // })
      // console.log(rows)
      res.status(200).json(rowsDataA);
    } else {
      // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
      let result = {};
      // console.log("到達",rows)
      if (rows.length) result = rows[0];
      res.status(200).json(result,'5');
    }
  }
  catch (error) {
    // 錯誤處理
    console.log(error);

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    });
  }
}

// // instance 物件實體，預設為空物件
// async function userLogin(sql, req, res, instance) {
//   try {
//     const [rows, fields] = await dbMysql2.promisePool.query(sql);

//     // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
//     let result = {};
//     if (rows.length) {
//       result = rows[0];

//       req.session.regenerate(function (err) {
//         if (err) {
//           res.status(200).json({ status: 2, message: "登入失敗" });
//         }

//         req.session.loginId = result.id;
//         req.session.loginName = result.name;
//         req.session.loginEmail = result.email;
//         req.session.loginUsername = result.username;
//         req.session.loginCreatedDate = result.createDate;

//         // 如果要用全訊息可以用以下的回傳
//         // res.json({ status: 0, message: '登入成功' })
//         res.status(200).json(result);
//       });
//     } else {
//       res.status(200).json({ status: 1, message: "帳號或密碼錯誤" });

//       //res.status(200).json(result)
//     }
//   } catch (error) {
//     // 錯誤處理
//     console.log(error);

//     // 顯示錯誤於json字串
//     res.status(200).json({
//       message: error,
//     });
//   }
// }

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
const getListData = async (req) => {
  //建立一個物件 錯誤先行 
  let output = {
    success: false,
    error: '',
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    l_sql: '',
  };

  //設定現在的頁數是第幾頁
  let page = req.query.pages || 1;
  page = parseInt(page);

  sql = ""

  let t_sql = "SELECT COUNT(1) num FROM `auctionitems` ";

  let [r1] = await dbMysql2.promisePool.query(t_sql);
  // console.log("我是r1喔", [r1])
  const perPage = 9; // 每頁要呈現幾筆資料
  const totalRows = r1[0].num; // 資料表的總筆數

  const totalPages = Math.ceil(totalRows / perPage); // 總共有幾頁
  // console.log('perPage', perPage, 'totalRows', totalRows, 'totalPages', totalPages)

  let rows = []; // 某分頁的資料預設為空的
  if (totalRows > 0) {
    if (page < 1) {
      output.error = 'page 值太小';
    } else if (page > totalPages) {
      output.error = 'page 值太大';
    } else {
      sql = ` LIMIT ${(page - 1) * perPage}, ${perPage}`;

      // [rows] = await dbMysql2.promisePool.query(sql);

    }
  }//如果 output.error 沒東西 代表正確取的資料 
  const l_sql = sql
  if (!output.error) {
    //進來更改預設 成正確
    output = {
      success: true,
      error: null,
      totalRows,
      totalPages,
      page,
      rows,
      l_sql,
    };
  }
  // console.log(sql)
  // console.log(typeof(sql))
  return output;

};

router.get('/', function (req, res, next) {
  console.log(req.query)
  console.log('555')
  res.send('respond with a resource')
})


router.get("/aucSeaArr/:search?/:arrangement?/:category?/:pages?", async (req, res, next) => {
  console.log(req.query)

  let a = (await getListData(req));
  // console.log("h1", a)
  if (!Object.keys(req.query).length)
    executeSQL(Auction.getAllAucSQL(), res);
  else
    // console.log(req.query);
  // executeSQL(await (getListData(req.query)),res);
  executeSeaSQL(Auction.getAucByQuerySQL(req.query, a), res, "get", true, {}, a)
})

//測試用
router.get('/api/list/:pages?', async (req, res) => {
  console.log(req.query);
  let a = String(await getListData(req));
  // executeSQL(await getListData(req), res);
  executeSQL(Auction.getAucByQuerySQL(req.query, a), res)
});


router.get("/auction-list", (req, res, next) => {
  console.log(req.query);

  if (!Object.keys(req.query).length)
    executeSQL(Auction.getAllAucSQL(), res);
});

router.get("/:aucId?", (req, res, next) => {
  console.log(req.params.aucId)
  executeSQL(Auction.getaucByIdSQL(req.params.aucId), res, "get", false);
});

module.exports = router;
