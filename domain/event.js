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
    let sql = `INSERT INTO SHARE(shareComment, shareImg, eventNum, userId) VALUES ('${this.shareComment}', '${this.shareImg}', '${this.eventNum}', 'NULL')`;
    return sql;
  }

  updateShareSQL() {
    let sql = `UPDATE SHARE SET shareComment = '${this.shareComment}', 
              shareImg = '${this.shareImg}' WHERE eventNum = ${this.eventNum}`;
    return sql;
  }

  static deleteEventByIdSQL(eventNum) {
    let sql = `DELETE FROM SHARE WHERE eventNum = ${eventNum}`;
    return sql;
  }

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

    const where = [];

    if (query.city) where.push(`cityName = '${query.city}'`);
    if (query.class) where.push(`eventClass = '${query.class}'`);

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
    
    //  當前頁數預設 1
    let pageNow = query.page || 1;
    let pageSQL = ` LIMIT ${(pageNow - 1) * 9},9`;

    let sql = "";

    if (where.length && order) {
      sql =
        `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity WHERE ` +
        where.join(" AND ") +
        order +
        pageSQL;
    } else {
      sql =
        `SELECT * FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity ORDER BY eventDateStart ASC` +
        pageSQL;

      // let t_sql = `SELECT COUNT(1) num FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity`;
    }

    return sql;
  }

  static getEventCountSQL(query) {
    const where = [];

    if (query.city) where.push(`cityName = '${query.city}'`);
    if (query.class) where.push(`eventClass = '${query.class}'`);

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

    let sql2 = "";

    if (where.length && order) {
      sql2 =
        `SELECT COUNT(1) num FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity WHERE ` +
        where.join(" AND ") +
        order;
    } else {
      sql2 = `SELECT COUNT(1) num FROM event LEFT JOIN city ON event.eventCity = city.cityId LEFT JOIN location ON location.city = event.eventCity ORDER BY eventDateStart ASC`;

    }

    return sql2;
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
