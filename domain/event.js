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
    cityName,
    shareComment,
    shareImg,
    eventNum,
    userId
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
    this.shareComment = shareComment;
    this.shareImg = shareImg;
    this.eventNum = eventNum;
    this.userId = userId;
  }

  
  addShareSQL() {
    let sql = `INSERT INTO SHARE(shareComment, shareImg, eventNum, userId) VALUES ('${this.shareComment}', 'NULL', '${this.eventNum}', 'NULL')`;
    return sql;
  }

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
    let sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity LEFT JOIN share ON event.id = share.eventNum WHERE id = ${id}`;
    return sql;
  }

  // static是與實例化無關
  static getEventByQuerySQL(query) {
    //let perPage = 9; // 每頁有幾筆
    // let page = query.page || 1; // 查看第幾頁

    const where = [];

    if (query.city) where.push(`cityName = '${query.city}'`);

    let order = "";

    if (query.order) {
      switch (query.order) {
        case "latest":
          order = " ORDER BY eventDateStart ASC";
          break;
        case "oldest":
          order = " ORDER BY eventDateStart DESC";
          break;
      }
    }

    let sql = "";

    if (where.length && order) {
      sql =
        `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity WHERE ` +
        where +
        order;
    } else {
      sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity ORDER BY eventDateStart ASC`;

      // let t_sql = `SELECT COUNT(1) num FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity`;
    }

    // let total = t_sql[0]["num"];

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllEventSQL() {
    let sql = `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity ORDER BY eventDateStart ASC`;
    return sql;
  }

  // 分享區塊
  static getShareSQL(id) {
    let sql = `SELECT * FROM event LEFT JOIN share ON event.id = share.eventNum WHERE id = ${id}`;
    return sql;
  }
}




//export default Event
module.exports = Event
