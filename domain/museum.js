class Museum {
    constructor(musId,musName,musCity,musImg,Px,Py,cityId,cityNme,eventId,eventName,eventDate) {
        this.id=0,
        this.musId=musId,
        this.musName=musName,
        this.musCity=musCity,
        this.musImg=musImg,
        this.Px=Px,
        this.Py=Py,
        this.cityId=cityId,
        this.cityNme=cityNme,
        this.eventId=eventId,
        this.eventName=eventName,
        this.eventDate=eventDate
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

  //static是與實例化無關
  static getMusByIdSQL(id) {
    let sql = `SELECT * FROM museum LEFT JOIN city ON museum.musCity = city.cityId LEFT JOIN location ON location.city = museum.musCity WHERE id = ${id}`;
    return sql;
  }

  // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`;
  //   return sql;
  // }

  // static是與實例化無關
  static getMusByQuerySQL(query) {
    const where = [];

    if (query.musId) where.push(`musId = '${query.musId}'`);
    if (query.musName) where.push(`musName = '${query.musName}'`);
    //必須對應路由過來的key
    if (query.city) where.push(`cityName = '${query.cityName}'`);

    let sql = "";

    if (where.length) sql = `SELECT * FROM museum LEFT JOIN city ON city.cityId = museum.musCity WHERE ` +
    where.join(" AND ");

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllMusSQL() {
    let sql = `SELECT * FROM museum LEFT JOIN city ON museum.musCity = city.cityId`;
    return sql;
  }
}
  
  
  module.exports = Museum
  