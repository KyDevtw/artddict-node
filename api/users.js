const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
TOKEN_SECRET = 'djlldl9879043fd54634ldke645645sdlfjgd'

const express = require('express')
const router = express.Router()

const User = require('../domain/user.js')

// mysql2 async-await用的
const dbMysql2 = require('../db/database')

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = 'get',
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql)

    switch (method) {
      case 'post': {
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId }
        // 合併id值
        const result = { ...instance, ...insertId }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'put': {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {}
        if (rows.affectedRows) result = { ...instance }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'delete': {
        // 仿照json-server的回傳
        res.status(200).json({})
        break
      }
      case 'get':
      default:
        {
          if (multirows) {
            // res.status(200).json({
            //   users: rows,
            // })
            res.status(200).json(rows)
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {}
            if (rows.length) result = rows[0]
            res.status(200).json(result)
          }
        }
        break
    }
  } catch (error) {
    // 錯誤處理
    const errsql = `error sql = ${sql}`
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: errsql,
      // message: error,
    })
  }
}

// instance 物件實體，預設為空物件
async function userLogin(sql, req, res, instance) {
  try {
    const [rows, fields] = await dbMysql2.promisePool.query(sql)

    // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
    let result = {}
    if (rows.length) {
      result = rows[0]

      req.session.regenerate(function (err) {
        if (err) {
          res.status(200).json({ status: 2, message: '登入失敗' })
        }

        req.session.loginId = result.id
        req.session.loginName = result.name
        // req.session.loginEmail = result.email
        req.session.loginUsername = result.username
        req.session.loginCreatedDate = result.createDate

        // 如果要用全訊息可以用以下的回傳
        // res.json({ status: 0, message: '登入成功' })

        // ~~cookie test~~
        // res.cookie('loginId', result.id, { signed: true, maxAge: 600000 });  //set cookie
        // res.cookie('loginName', result.name, { signed: true, maxAge: 600000 });  //set cookie
        // res.cookie('loginUsername', result.username, { signed: true, maxAge: 600000 });  //set cookie
        // res.cookie('loginCreatedDate', result.createDate, { signed: true, maxAge:600000});  //set cookie
        // ~~cookie test~~
        console.log("created sid=" + req.session.id);
        // res.status(200).json(result)
        res.status(200).json(result)
      })
    } else {
      res.status(200).json({ status: 1, message: '帳號或密碼錯誤' })

      //res.status(200).json(result)
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}

//登入頁面的login 驗證
router.post('/login', async (req, res) => {

  //傳給客戶端訊息
  const output = {
    // 登入成功
    success: false,
    //帳密都錯
    code: 0,
    error: '沒有 account 或沒有 password 欄位',
    //除錯的檢查
    // body: req.body,
    body: req.body,
    id: ""

  }

  if (!req.body.username || !req.body.password) {
    return res.json(output);
  }
  // console.log(req.body.username)
  const [members] = await dbMysql2.promisePool.query("SELECT * FROM users WHERE `username`=?", [req.body.username]);
  console.log("是你嗎", [members])
  if (!members.length) {
    output.code = 401;
    output.error = "帳號或密碼錯誤(沒有此帳號)";
    return res.json(output);
  }

  const member = members[0];
  console.log(member)
  // 驗證密碼 bcrypt.compare
  const result = await bcrypt.compare(req.body.password, member.password);
  if (!result) {
    output.code = 405;
    output.error = "帳號或密碼錯誤(密碼錯誤)";
    return res.json(output);
  }

  const { id, email, name } = member;
  // req.session.member = {id, email, nickname};  // 使用 session
  console.log('id', id)
  // output.token = jwt.sign({id, email, name}, process.env.TOKEN_SECRET,{ expiresIn: '180000'}); // 三分鐘過期
  output.token = jwt.sign({ id, email, name }, TOKEN_SECRET);
  output.success = true;
  output.error = '';
  output.code = 200;
  output.body = member;
  output.id = id; //如果不要把id傳到前面 就把這行刪掉

  res.json(output);
});


//在各個頁面用來驗證的checklogin

router.post('/checklogin', function (req, res, next) {
  let payload;
  try {
    payload = jwt.verify(req.body.token, TOKEN_SECRET);
    return res.json(payload);
  } catch (ex) {
    return res.json({
      error: ex.toString()
    });
  }
})


// 以下為路由

// 處理會員登入
router.post('/login', function (req, res, next) {
  let user = new User(
    req.body.username,
    'name',
    req.body.password,
  )

  // 回應都寫在userLogin方法裡(async-await)
  userLogin(user.getUserUserByUsernameAndPasswordSQL(), req, res, user)
})

// 處理會員登出
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(200).json({ status: 1, message: '登出失敗' })
      return
    }

    // 清除所有的session
    req.session = null

    res.clearCookie('skey')
    res.status(200).json({ status: 0, message: '登出成功' })
  })
})

// 檢查是否登入
// router.get('/checklogin', function (req, res, next) {
//   const sess = req.session
//   console.log(sess)
//   const id = sess.loginId
//   const username = sess.loginUsername
//   const name = sess.loginName
//   const createDate = sess.loginCreatedDate

//   console.log("request sid=" + sess.loginId);
//   console.log("requset request cookie=" + req.headers.cookie);
//   const isLogined = !!name

//   if (isLogined) {
//     res.status(200).json({ id, name, username,  createDate })
//   } else {
//     // 登出狀態時回傳`{id:0}`
//     res.status(200).json({ id: 0 })
//   }
// })

// get 處理獲取全部的資料列表
// AND查詢加入`?name=eddy&email=XXX&username=XXXX
router.get('/', (req, res, next) => {
  //console.log(req.query)

  if (!Object.keys(req.query).length) executeSQL(User.getAllUserSQL(), res)
  else executeSQL(User.getUserByQuerySQL(req.query), res)
})

// get 處理獲取單一筆的會員，使用id
router.get('/:userId', (req, res, next) => {
  executeSQL(User.getUserByIdSQL(req.params.userId), res, 'get', false)
})


// get 獲取訂單，使用會員id
router.get('/getOrder/:userId', (req, res, next) => {
  executeSQL(User.getUserOrderByIdSQL(req.params.userId), res, 'get', true)
})

// get 獲取商品訂單細節，使用orderid
router.get('/getOrderProDetail/:id?', (req, res, next) => {
  executeSQL(User.getUserOrderProDetailByOrderIdSQL(req.params.id), res, 'get', true)
})

// get 獲取票券訂單細節，使用orderid
router.get('/getOrderTicDetail/:id?', (req, res, next) => {
  executeSQL(User.getUserOrderTicDetailByOrderIdSQL(req.params.id), res, 'get', true)
})

// get 獲取票券，使用會員id
router.get('/getTicket/:userId', (req, res, next) => {
  executeSQL(User.getUserTicketByIdSQL(req.params.userId), res, 'get', true)
})


// get 獲取票券細節，使用eventId
router.get('/getTicketDetail/:id?', (req, res, next) => {
  executeSQL(User.getUserTicketDetailByEventIdSQL(req.params.id), res, 'get', true)
})


// get 獲取我的收藏，使用會員id
router.get('/userFav/:userId', (req, res, next) => {
  executeSQL(User.getUserFavByIdSQL(req.params.userId), res, 'get', true)
})

//delete 刪除一筆會員收藏，使用eventId
router.delete('/userFavDelete/:id?', (req, res, next) => {
  executeSQL(User.deleteUserFavByIdSQL(req.params.id), res, 'delete', false)
})



// post 新增一筆會員資料
router.post('/', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  let passwordhash = ''
  await bcrypt.hash(req.body.password, 11)
    .then(hash => {
      passwordhash = hash
    });
  //從request json 資料建立新的物件
  let user = new User(
    req.body.username,
    req.body.name,
    passwordhash,
  )

  executeSQL(user.addUserSQL(req.body.username,req.body.name,passwordhash), res, 'post', false, user)
})

//delete 刪除一筆資料
// router.delete('/:userId', (req, res, next) => {
//   executeSQL(User.deleteUserByIdSQL(req.params.userId), res, 'delete', false)
// })

// put 更新會員資料
router.put('/:userId', (req, res) => {
  let user = new User(
    req.body.username,
    req.body.name,
    'password',
    req.body.gender,
    req.body.mobile,
    req.body.birthday,
    req.body.address,
  )

  // id值為數字
  user.id = +req.params.userId
  const sql_cmd = user.updateUserByIdSQL(req.params.userId);
  try {
    executeSQL(sql_cmd, res, 'put', false, user)
  }
  catch {
    console.log(`failed to execute!!`)
    console.log(`${sql_cmd}`)

  }
})



// put 更新密碼
// router.put('/pwd/:userId', (req, res) => {

//   let user = new User(
//     'username',
//     'name',
//     req.body.password,
//     'gender',
//     'mobile',
//     'birthday',
//     'address',
//   )

//   // id值為數字
//   user.id = +req.params.userId

//   executeSQL(user.updatePwdByIdSQL(req.params.userId), res, 'put', false, user)
// })

router.put('/pwd/:userId', async (req, res) => {

  let user = new User(
    'username',
    'name',
    req.body.password,
    'gender',
    'mobile',
    'birthday',
    'address',
  )

  let passwordhash = ''
  await bcrypt.hash(req.body.password, 11)
    .then(hash => {
      passwordhash = hash
    });

  // id值為數字
  user.id = +req.params.userId

  executeSQL(user.updatePwdByIdSQL(req.params.userId,passwordhash), res, 'put', false, user)
})

//export default router
module.exports = router
