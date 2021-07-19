// Orders 路由建立

const express = require('express')
const router = express.Router()

// 引入 Orders SQL 語法
const Orders = require('../domain/orders.js')

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
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}

// post 新增一筆訂單資料
router.post('/orders', (req, res, next) => {
  let order = new Orders(
    req.body.orderid,
    'userid',
    req.body.orderpay,
    req.body.cardnumber,
    req.body.cardexpdate,
    req.body.username,
    req.body.userphone,
    req.body.useraddress,
    req.body.ordership,
    '0',
    req.body.orderprice,
    req.body.ordertype
  )
  // console.log(order)
  executeSQL(order.addOrdersSQL(), res, 'post', false)
})

// get 處理獲取單一筆的訂單，使用id
router.get('/:orderId', (req, res, next) => {
  console.log(req.params.orderId)
  executeSQL(Orders.getOrderById(req.params.orderId), res, 'get', false)
})

//export default router
module.exports = router
