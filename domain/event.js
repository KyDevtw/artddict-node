// event SQL 語法 建立 Class
// SELECT `id`, `eventClass`, `eventId`, `eventName`, `eventDescription`, `eventDateStart`, `eventDateEnd`, `eventPrice`, `eventImg`, `eventCity`, `museumId`, `userId`, `created_at`, `updated_at` FROM `event` 
class Event {
  constructor(
    eventClass,
    eventId,
    eventName,
    eventDescription,
    eventDateStart,
    eventDateEnd,
    eventPrice,
    eventImg,
    eventCity,
    museumId,
  ) {
    this.id = 0;
    this.eventClass = eventClass;
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventDescription = eventDescription;
    this.eventDateStart = eventDateStart;
    this.eventDateEnd = eventDateEnd;
    this.eventPrice = eventPrice;
    this.eventImg = eventImg;
    this.eventCity = eventCity;
    this.museumId = museumId;
  }

  // addUserSQL() {
  //   let sql = `INSERT INTO USERS(name, username, password, email, login, createdDate) \
  //                  VALUES('${this.name}', '${this.username}', '${this.password}', '${this.email}', 0, NOW())`;
  //   return sql;
  // }

  // updateUserByIdSQL(id) {
  //   let sql = `UPDATE USERS \
  //              SET name = '${this.name}', username = '${this.username}', password = '${this.password}', email = '${this.email}', login = ${this.login} \
  //              WHERE id =  ${id}`;
  //   return sql;
  // }

  // static是與實例化無關
  // static getUserByIdSQL(id) {
  //   let sql = `SELECT * FROM USERS WHERE id = ${id}`;
  //   return sql;
  // }

  // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`;
  //   return sql;
  // }

  // static是與實例化無關
  static getEventByQuerySQL(query) {
    let perPage = 9;  // 每頁有幾筆
    let page = params.page || 1;  // 查看第幾頁
    let cate = parseInt(params.cate) || 0;  // 分類編號
    let keyword = params.keyword || '';  // 搜尋產品名稱或者作者姓名


    let orderBy = params.orderBy || '';  // 排序
    if (cate) {
      where += " AND category_sid=" + cate;
    }
    if (keyword) {
      let k2 = db.escape("%" + keyword + "%");
      where += ` AND (author LIKE ${k2} OR bookname LIKE ${k2}) `;
    }

    let orderStr = "";
    switch (orderBy) {
      case "latest":
        orderStr = " ORDER BY `eventDateStart` ASC ";
        break;
      case "oldest":
        orderStr = " ORDER BY `price` DESC ";
        break;
    }


    const where = [];

    if (query.id) where.push(`id = '${query.id}'`);
    if (query.eventId) where.push(`eventId = '${query.eventId}'`);
    if (query.eventName) where.push(`eventName = '${query.eventName}'`);

    let sql = "";

    if (where.length) sql = `SELECT * FROM EVENT WHERE ` + where.join(" AND ");
    else sql = `SELECT * FROM EVENT`;

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllEventSQL() {
    let sql = `SELECT * FROM EVENT`;
    return sql;
  }
}

//export default Event
module.exports = Event
