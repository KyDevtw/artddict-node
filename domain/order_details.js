class OrderDetails {
  constructor(orderId, orderQty, proId, orderSpec) {
    this.id = 0
    this.orderId = orderId
    this.orderQty = orderQty
    this.proId = proId
    this.orderSpec = orderSpec
  }

  addOrderDetailsSQL() {
    let sql = `INSERT INTO ORDER_DETAILS(orderId, orderQty, proId, orderSpec) \
                     VALUES('${this.orderId}', '${this.orderQty}', '${this.proId}', '${this.orderSpec}')`
    console.log(sql)
    return sql
  }

  static getOrderDetailsById(orderId) {
    let sql = `SELECT * FROM ORDER_DETAILS WHERE ORDERID = ${orderId}`
    console.log(sql)
    return sql
  }

  static getAllOrderDetailsSQL() {
    let sql = `SELECT * FROM ORDER_DETAILS`
    return sql
  }
}

//export default orders
module.exports = OrderDetails
