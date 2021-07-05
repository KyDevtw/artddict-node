class Map {
    constructor(musId,musName,musCity,musImg,MusPx,MusPy) {
        this.id=0,
        this.musId=musId,
        this.musName=musName,
        this.musCity=musCity,
        this.musImg=musImg,
        this.MusPx=MusPx,
        this.MusPy=MusPy
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
  static getMusByQuerySQL(query) {
    const where = [];

    if (query.id) where.push(`id = '${query.id}'`);
    if (query.musId) where.push(`musId = '${query.musId}'`);
    if (query.musName) where.push(`musName = '${query.musName}'`);

    let sql = "";

    if (where.length) sql = `SELECT * FROM museum WHERE ` + where.join(" AND ");
    else sql = `SELECT * FROM museum`;

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllMapSQL() {
    let sql = `SELECT * FROM museum`;
    return sql;
  }
}
  
  
  module.exports = Map
  