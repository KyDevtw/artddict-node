// Event 路由建立

const express = require("express");
const router = express.Router();
const _ = require("lodash");

// 引入 Event SQL 語法
const Event = require("../domain/event.js");

// mysql2 async-await用的
const dbMysql2 = require("../db/database");
const { result } = require("lodash");

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


// !! For 分頁頁碼

async function executeSQLForPage(sql, sql2, res) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql);
    const [rows2, fields2] = await dbMysql2.promisePool.query(sql2);

    let result = {};
    if (rows2.length) result = rows2[0];

    //  每頁9筆資料
    const perPage = 9;

    // 總頁數,ceil()為無條件進位
    const totalPages = Math.ceil(result.num / perPage);

    res.status(200).json({
      eventData: rows,
      totalCount: result,
      totalPages: totalPages,
    });
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

// get 處理獲取全部的資料列表
// AND查詢加入`?name=eddy&email=XXX&username=XXXX





// router.get("/", (req, res, next) => {
//   console.log(req.query);

//   if (!Object.keys(req.query).length) executeSQL(Event.getAllEventSQL(), res);
//   else executeSQL(Event.getEventByQuerySQL(req.query), res);
// });


// !!!分頁測試
router.get("/", (req, res, next) => {

  const eventData = executeSQLForPage(Event.getEventByQuerySQL(req.query),Event.getEventCountSQL(req.query), res);

  // res.json(totalPage);
});

router.get("/event-list/:id?", (req, res, next) => {
  executeSQL(Event.getEventByIdSQL(req.params.id), res, "get", false);
});

router.get("/share/:id?", (req, res, next) => {
  executeSQL(Event.getShareSQL(req.params.id), res, "get", false);
});



// ??單檔上傳測試
/*--------------------------*/
router.post("/uploadShare", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //使用輸入框的名稱來獲取上傳檔案 (例如 "avatar")
      let sharePic = req.files.file;

      // 設定絕對路徑
      const path = require("path").join(__dirname, "..");
      const uploadPath = path + "/public/eventpic/share/";

      //使用 mv() 方法來移動上傳檔案到要放置的目錄裡 (例如 "uploads")
      sharePic.mv(uploadPath + sharePic.name);

      //送出回應
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: sharePic.name,
          mimetype: sharePic.mimetype,
          size: sharePic.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
/*--------------------------*/


// ??多檔上傳測試
/*--------------------------*/
router.post('/uploadPic', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let data = []; 
  
          //loop all files
          _.forEach(_.keysIn(req.files.file), (key) => {
            let photo = req.files.file[key];

            // 設定絕對路徑
            const path = require("path").join(__dirname, "..");
            const uploadPath = path + "/public/eventpic/share/";

            //move photo to uploads directory
            photo.mv(uploadPath + photo.name);

            //push file details
            data.push({
              name: photo.name,
              mimetype: photo.mimetype,
              size: photo.size,
            });
          });
  
          //return response
          res.send({
              status: true,
              message: 'Files are uploaded',
              data: data
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});


// router.post("/uploadShare", (req, res) => {
//   const newpath = __dirname + "../public/eventpic/share";
//   const file = req.files.file;
//   const filename = file.name;

//   file.mv(`${newpath}/${filename}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: "File upload failed", code: 200 });
//     }
//     res.status(200).send({ message: "File Uploaded", code: 200 });
    
//   });
//   return;
// });




// delete 刪除一筆資料
router.delete("/delete/:id?", (req, res, next) => {
  executeSQL(Event.deleteEventByIdSQL(req.params.id), res, "delete", false);
});


// post 新增一筆資料
router.post("/upload", (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  //從request json 資料建立新的物件
  let shareImg = JSON.stringify(req.body.sharePhoto);
  let event = new Event(
    "eventClass",
    "eventId",
    "eventName",
    "eventDescription",
    "eventDateStart",
    "eventDateEnd",
    "eventPrice",
    "eventImg",
    "eventCity",
    "useumId",
    "cityName",
    req.body.shareComment,
    shareImg,
    req.body.id,
    "userId"
  );

  executeSQL(event.addShareSQL(), res, "post", false, event);
});


// put 更新一筆資料
router.put("/shareUpdate", (req, res, next) => {
 
  let shareImg = JSON.stringify(req.body.sharePhoto);
  let event = new Event(
    "eventClass",
    "eventId",
    "eventName",
    "eventDescription",
    "eventDateStart",
    "eventDateEnd",
    "eventPrice",
    "eventImg",
    "eventCity",
    "useumId",
    "cityName",
    req.body.shareComment,
    shareImg,
    req.body.id,
    "userId"
  );

  executeSQL(event.updateShareSQL(), res, "put", false, event);
});





//export default router
module.exports = router;
