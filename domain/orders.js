class Orders {
  constructor(
    orderId,
    userName,
    creditType,
    name,
    userPhone,
    userAddress,
    shipMethod,
    totalPrice
  ) {
    this.id = 0
    this.orderId = orderId
    this.userName = userName
    this.creditType = creditType
    this.name = name
    this.userPhone = userPhone
    this.userAddress = userAddress
    this.shipMethod = shipMethod
    this.totalPrice = totalPrice
  }

  addOrdersSQL() {
    let sql = `INSERT INTO ORDERS(orderId, userName, creditType, name, userPhone, userAddress, shipMethod, totalPrice) \
                     VALUES('${this.orderId}', '${this.userName}', '${this.creditType}', '${this.name}', '${this.userPhone}', '${this.userAddress}', '${this.shipMethod}', '${this.totalPrice}')`
    console.log(sql)
    return sql
  }

  static getOrderById(orderId) {
    let sql = `SELECT * FROM ORDERS WHERE ORDERID = ${orderId}`
    console.log(sql)
    return sql
  }

  static getAllOrdersSQL() {
    let sql = `SELECT * FROM ORDERS`
    return sql
  }
}

//export default orders
module.exports = Orders
