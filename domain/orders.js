class Orders {
  constructor(
    orderId,
    userId,
    orderPay,
    cardNumber,
    cardExpdate,
    username,
    userPhone,
    userAddress,
    orderShip,
    orderStatus,
    orderPrice,
    orderType
  ) {
    this.id = 0
    this.orderId = orderId
    this.userId = userId
    this.orderPay = orderPay
    this.cardNumber = cardNumber
    this.cardExpdate = cardExpdate
    this.username = username
    this.userPhone = userPhone
    this.userAddress = userAddress
    this.orderShip = orderShip
    this.orderStatus = orderStatus
    this.orderPrice = orderPrice
    this.orderType = orderType
  }

  addOrdersSQL() {
    let sql = `INSERT INTO ORDERS(orderId, userId, orderPay, cardNumber, cardExpdate, username, userPhone, userAddress, orderShip, orderStatus, orderPrice, orderType) \
                     VALUES('${this.orderId}', '${this.userId}', '${this.orderPay}', '${this.cardNumber}', '${this.cardExpdate}', '${this.username}', '${this.userPhone}', '${this.userAddress}', '${this.orderShip}', '${this.orderStatus}', '${this.orderPrice}', '${this.orderType}')`
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
