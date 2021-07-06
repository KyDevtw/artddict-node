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
    cityName
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
    this.cityName = cityName;
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

  static getEventByIdSQL(id) {
    let sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity WHERE id = ${id}`;
    return sql;
  }

  // static是與實例化無關
  static getEventByQuerySQL(query) {
    let perPage = 9; // 每頁有幾筆
    let page = query.page || 1; // 查看第幾頁

    // let keyword = query.keyword || "";  // 搜尋功能

    // let orderBy = query.orderBy || "";  // 排序
    // if (cate) {
    //   where += " AND eventClass=" + cate;
    // }
    // if (keyword) {
    //   let k2 = db.escape("%" + keyword + "%");
    //   where += ` AND eventName LIKE ${k2} `;
    // }

    // let orderStr = "";
    // switch (orderBy) {
    //   case "latest":
    //     orderStr = " ORDER BY `eventDateStart` ASC ";
    //     break;
    //   case "oldest":
    //     orderStr = " ORDER BY `eventDateStart` ASC` DESC ";
    //     break;
    // }

    const where = [];

    if (query.city) where.push(`cityName = '${query.city}'`);
    if (query.museum) where.push(`musName = '${query.date}'`);
    if (query.order) where.push(`eventDateStart >= '${query.date}'`);

    let sql = "";

    if (where.length)
      sql =
        `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity WHERE ` +
        where.join(" AND ");
    else
      sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity`;

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllEventSQL() {
    let sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity`;
    return sql;
  }
}



//export default Event
module.exports = Event
