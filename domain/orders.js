class Orders {
  constructor(
    orderId,
    userMail,
    orderPay,
    userName,
    userPhone,
    userAddress,
    orderShip,
    created_at
  ) {
    this.id = 0
    this.orderId = orderId
    this.userMail = userMail
    this.orderPay = orderPay
    this.userName = userName
    this.userPhone = userPhone
    this.userAddress = userAddress
    this.orderShip = orderShip
    this.created_at = created_at
  }

  // addOrderSQL() {
  //   let sql = `INSERT INTO USERS(name, username, password, email, login, createdDate) \
  //                    VALUES('${this.name}', '${this.username}', '${this.password}', '${this.email}', 0, NOW())`
  //   return sql
  // }

  // updateUserByIdSQL(id) {
  //   let sql = `UPDATE USERS \
  //                SET name = '${this.name}', username = '${this.username}', password = '${this.password}', email = '${this.email}', login = ${this.login} \
  //                WHERE id =  ${id}`
  //   return sql
  // }

  // static是與實例化無關
  // static getUserByIdSQL(id) {
  //   let sql = `SELECT * FROM USERS WHERE id = ${id}`
  //   return sql
  // }

  // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`
  //   return sql
  // }

  // static是與實例化無關
  // static getUserByQuerySQL(query) {
  //   const where = []

  //   if (query.name) where.push(`name = '${query.name}'`)
  //   if (query.email) where.push(`email = '${query.email}'`)
  //   if (query.username) where.push(`username = '${query.username}'`)

  //   let sql = ''

  //   if (where.length) sql = `SELECT * FROM USERS WHERE ` + where.join(' AND ')
  //   else sql = `SELECT * FROM USERS`

  //   return sql
  // }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`
  //   return sql
  // }

  static getAllOrdersSQL() {
    let sql = `SELECT * FROM ORDERS`
    return sql
  }
}

//export default orders
module.exports = Orders
