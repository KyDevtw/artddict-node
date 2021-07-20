// Event 路由建立

const express = require("express");
const router = express.Router();

// 引入 Event SQL 語法
const Auction = require("../domain/auction.js");

// mysql2 async-await用的
const dbMysql2 = require("../db/database");
const { query } = require("express");

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
    console.log("有撈出來嗎", rows)
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

    let totalrows = rowA.length
    let totalPages = Math.ceil(rowA.length / perPage)

    pagesInfo.totalRows = totalrows
    pagesInfo.totalPages = totalPages

    sql += pagesInfo.l_sql
    console.log(sql)
    const [rowsData, fieldsA] = await dbMysql2.promisePool.query(sql);
    let rowsDataA = JSON.parse(JSON.stringify(rowsData))

    console.log("總列數", totalrows, "總頁數", totalPages)

    console.log("夜面資料", pagesInfo)

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
      res.status(200).json(result, '5');
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

// 以下為路由

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

const getaucMemeberInfoSQL = async (query)=> {
  console.log(query.id)
  let sql_n=`SELECT DISTINCT aucId,aucName
  FROM auctionitems
  LEFT JOIN aucbuyerinfo
  ON auctionitems.aucId = aucbuyerinfo.auction_id
  WHERE (Member_Id = ${query.id})`
  const [rows_n, fields] = await dbMysql2.promisePool.query(sql_n);
  const newrow_n = JSON.parse(JSON.stringify(rows_n))
  // console.log(newrow_n)

  let rows_all = []
  for(let i =0; i<(newrow_n.length);i++){
    let sql_q = `SELECT aucName,Sid,MAX(Price) AS MaxPrice,aucPriceNow,aucDeadline,aucImg,aucId
    FROM auctionitems
    LEFT JOIN aucbuyerinfo
    ON auctionitems.aucId = aucbuyerinfo.auction_id
    WHERE (Member_Id = ${query.id}) AND (aucId = ${newrow_n[i].aucId}) `
    const [rows_q, fields] = await dbMysql2.promisePool.query(sql_q);
    rows_all.push(rows_q[0])
  }

  //為了計算頁數轉換成json
  let rowscount = JSON.parse(JSON.stringify(rows_all))

  //建立一個物件 錯誤先行 
  let output = {
    error: '',
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
  };


  let page = query.pages || 1;
  output.page = parseInt(page);

  const perPage = 3
  output.totalRows= rowscount.length
  output.totalPages = Math.ceil(rowscount.length / perPage)
  console.log('totalrows', output.totalRows,'totalPages', output.totalPages)

  output.rows = output.rows.concat(rowscount)

  if (output.totalRows > 0) {
    if (page < 1) {
      output.error = 'page 值太小';
    } else if (page > output.totalPages) {
      output.error = 'page 值太大';
    } else {
      // sql = ` LIMIT ${(page - 1) * perPage}, ${perPage}`;
      output.rows = output.rows.slice((page - 1) * perPage,(page - 1) * perPage+3)
    }
  }
  console.log(output)
  return output
}


//會員競標頁 API
const getaucOrderInfoSQL = async (query)=> {
  console.log(query)
  let sql_a = `SELECT orders.username,orders.orderId,userPhone,userAddress,orderShip,orderStatus,orderPrice,auctionitems.aucId,aucName,auctionitems.aucDeadline
  FROM orders
  LEFT JOIN order_details
  ON orders.orderId = order_details.orderId
  LEFT JOIN auctionitems
  ON order_details.aucId = auctionitems.aucId
  WHERE userId = '${query.userId}' AND orderType = 'c'`

  const [rows_a, fields_a] = await dbMysql2.promisePool.query(sql_a);
  console.log(rows_a)
  //為了計算幾列
  let rowscountA = JSON.parse(JSON.stringify(rows_a))

  //建立一個物件 錯誤先行 
  let output = {
    error: '',
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
  };

  let page = query.pages || 1;
  output.page = parseInt(page);

  const perPage = 3
  output.totalRows= rowscountA.length
  output.totalPages = Math.ceil(rowscountA.length / perPage)
  console.log('totalrows', output.totalRows,'totalPages', output.totalPages)

  output.rows = output.rows.concat(rowscountA)

  if (output.totalRows > 0) {
    if (page < 1) {
      output.error = 'page 值太小';
    } else if (page > output.totalPages) {
      output.error = 'page 值太大';
    } else {
      // sql = ` LIMIT ${(page - 1) * perPage}, ${perPage}`;
      output.rows = output.rows.slice((page - 1) * perPage,(page - 1) * perPage+3)
    }
  }
  console.log(output)
  return output
}


// router.get('/', function (req, res, next) {
//   console.log(req.query)
//   console.log('555')
//   res.send('respond with a resource')
// })




router.get("/aucSeaArr/:search?/:arrangement?/:priceRange?/:category?/:pages?", async (req, res, next) => {
  console.log(req.query)

  let a = (await getListData(req));
  if (!Object.keys(req.query).length)
    executeSQL(Auction.getAllAucSQL(), res);
  else
    executeSeaSQL(Auction.getAucByQuerySQL(req.query, a), res, "get", true, {}, a)
})

//測試用
router.get('/api/list/:pages?', async (req, res) => {
  console.log(req.query);
  // let a = String(await getListData(req));
  // executeSQL(await getListData(req), res);
  // executeSQL(Auction.getAucByQuerySQL(req.query, a), res)
});

router.get("/auc_member/:id?/:pages?", async (req, res, next) => {
  console.log(req.query)
  let auc_memberD = await getaucMemeberInfoSQL(req.query)
  res.status(200).json(auc_memberD);
});

router.get("/trysess",(req,res)=>{
  console.log(req.query)
})

//會員結標頁
router.get("/auc-order/:userId?", async (req, res, next) => {
    // console.log(req.query)
    let auc_order = await  getaucOrderInfoSQL(req.query)
    res.status(200).json(auc_order)
});


router.get("/auction-list", (req, res, next) => {
  console.log(req.query);

  if (!Object.keys(req.query).length)
    executeSQL(Auction.getAllAucSQL(), res);
});

router.get("/:aucId?", async(req, res, next) => {
  // console.log("傳入的參數",req.query)
  let sql_d = Auction.getaucByIdSQL(req.query.aucId);
  let sql_p = Auction.getbidInfoByQuerySQL(req.query.aucId);
  // console.log(sql_d)
  // console.log(sql_p)

  const [rows_d, fields_d] = await dbMysql2.promisePool.query(sql_d);
  const [rows_p, fields_p] = await dbMysql2.promisePool.query(sql_p);
  // console.log(rows_d,rows_p)
  // console.log(rows_d,Object.values(JSON.parse(JSON.stringify(rows_p))))
  let new_p = Object.values(JSON.parse(JSON.stringify(rows_p)))
  let new_d = Object.values(JSON.parse(JSON.stringify(rows_d)))
  new_p.unshift(new_d[0])
  console.log(new_p)

  res.status(200).json(new_p);
});














module.exports = router;
