class OrderDetails {
  constructor(orderId, orderSpec, orderQty, eventId, proId, aucId) {
    this.id = 0
    this.orderId = orderId
    this.orderSpec = orderSpec
    this.orderQty = orderQty
    this.eventId = eventId
    this.proId = proId
    this.aucId = aucId
  }

  addOrderDetailsSQL() {
    let sql = `INSERT INTO ORDER_DETAILS(orderId, orderSpec, orderQty, eventId, proId, aucId) \
                     VALUES('${this.orderId}', '${this.orderSpec}', '${this.orderQty}', '${this.eventId}', '${this.proId}', '${this.aucId}')`
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
