class User {
  constructor(username, name, password, gender, mobile, birthday, address, userImg, userfav, userCoupon) {
    this.id = 0
    this.username = username;
    this.name = name;
    this.password = password;
    this.gender = gender;
    this.mobile = mobile;
    this.birthday = birthday;
    this.address = address;
    this.userImg = userImg;
    this.userfav = userfav;
    this.userCoupon = userCoupon;
    this.login = 0;
  }

  addUserSQL(username,name,passwordhash) {
    let sql = `INSERT INTO USERS(username, name, password, login, createdDate) \
                   VALUES('${username}', '${name}', '${passwordhash}',  0, NOW())`
    console.log("sql",sql)
    return sql
  }

  // updateUserByIdSQL(id) {
  //   let sql = `UPDATE USERS \
  //              SET username = '${this.username}', name = '${this.name}', gender = '${this.gender}', mobile = '${this.mobile}' , birthday = '${this.birthday}', address = '${this.address}', login = ${this.login} \
  //              WHERE id =  ${id}`
    
  //   return sql
  // }

  updateUserByIdSQL(id) {
    let sql = `UPDATE USERS \ SET `
    if (this.username != null) {
      sql += `username = '${this.username}',`
    }
    if (this.name != null) {
      sql += `name = '${this.name}', `
    }
    if (this.gender != null ) {
      sql += `gender = '${this.gender}', `
    }
    if (this.mobile != null) {
      sql += `mobile = '${this.mobile}' , `
    }
    if (this.birthday != null) {
      sql += `birthday = '${this.birthday}', `
    }
    if (this.address != null) {
      sql += `address = '${this.address}', `
    } 
    sql += `login = ${this.login} \ WHERE id = ${id}`
      
    
    return sql
  }

  updatePwdByIdSQL(id) {
    console.log(`pwd received = ${this.password}`)
    let sql = `UPDATE USERS \
               SET password = '${this.password}', login = ${this.login} \
               WHERE id =  ${id}`
    return sql
  }

  // updatePwdByIdSQL(id) {
  //   let sql = `UPDATE USERS \ SET`
  //   if (this.password != null) {
  //     sql += `password = '${this.password}\ WHERE id = ${id}`
  //   }
  // }



  // static是與實例化無關
  static getUserByIdSQL(id) {
    let sql = `SELECT * FROM users WHERE id = ${id}`
    return sql
  }

  
  // get 會員訂單
  static getUserOrderByIdSQL(id) {
    let sql = `SELECT orders.orderId, orders.created_at, orders.orderPrice, orders.orderStatus FROM orders JOIN users ON orders.userId = users.id WHERE users.id = ${id}`
    return sql
  }


  // get 會員-商品訂單細節 by userId
  static getUserOrderProDetailByOrderIdSQL(orderid) {
    let sql = `SELECT orders.orderPay, orders.cardNumber, orders.cardExpdate, orders.orderPrice, orders.username, orders.userPhone, orders.userAddress, orders.orderShip,  product.proImg, product.proName, product.proId, product.id, order_details.orderSpec, order_details.orderQty FROM orders LEFT JOIN order_details ON orders.orderId = order_details.orderId LEFT JOIN product ON order_details.proId = product.proId LEFT JOIN users ON orders.userId = users.id WHERE orders.orderId = ${orderid}`
    return sql
  }

  // get 會員-票卷訂單細節 by orderId
  static getUserOrderTicDetailByOrderIdSQL(orderid) {
    let sql = `SELECT orders.orderPay, orders.cardNumber, orders.cardExpdate, orders.orderPrice, orders.username, orders.userPhone, orders.userAddress, orders.orderShip, event.eventImg, event.eventName, event.eventId, order_details.orderSpec, order_details.orderQty FROM orders LEFT JOIN order_details ON orders.orderId = order_details.orderId LEFT JOIN event ON order_details.eventId = event.eventId LEFT JOIN users ON orders.userId = users.id WHERE orders.orderId = ${orderid}`
    return sql
  }

  // get 會員票券
  static getUserTicketByIdSQL(id) {
    let sql = `SELECT event.eventImg, event.eventId, event.eventName,order_details.orderQty, event.eventDateStart, event.eventDateEnd ,event.id FROM event LEFT JOIN order_details ON event.eventId = order_details.eventId LEFT JOIN orders ON order_details.orderId = orders.orderId LEFT JOIN users ON orders.userId = users.id WHERE users.id = ${id}`
    return sql
  }

  // get 票券細節
  static getUserTicketDetailByEventIdSQL(eventId) {
    let sql = `SELECT event.eventName, order_details.orderSpec FROM event LEFT JOIN order_details ON event.eventId = order_details.eventId LEFT JOIN orders ON order_details.orderId = orders.orderId LEFT JOIN users ON orders.userId = users.id WHERE event.eventId = ${eventId}`
    return sql
  }

  // get 會員收藏
  static getUserFavByIdSQL(id) {
    let sql = `SELECT  event.eventId, event.eventImg, event.eventName, event.eventCity, event.eventDateStart FROM event LEFT JOIN user_favorite ON event.eventId = user_favorite.eventId LEFT JOIN users ON user_favorite.userId = users.id WHERE users.id = ${id}`
    return sql
  }


  // delete 會員收藏
  static deleteUserFavByIdSQL(eventId) {
      let sql = `DELETE FROM user_favorite WHERE eventId = ${eventId}`
      return sql
    }
  

  // login用
  getUserUserByUsernameAndPasswordSQL() {
    let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`
    return sql
  }

  // static是與實例化無關
  static getUserByQuerySQL(query) {
    const where = []

    if (query.name) where.push(`name = '${query.name}'`)
    // if (query.email) where.push(`email = '${query.email}'`)
    if (query.username) where.push(`username = '${query.username}'`)

    let sql = ''

    if (where.length) sql = `SELECT * FROM USERS WHERE ` + where.join(' AND ')
    else sql = `SELECT * FROM USERS`

    return sql
  }

  

  static getAllUserSQL() {
    let sql = `SELECT * FROM USERS`
    return sql
  }
}

//export default User
module.exports = User
