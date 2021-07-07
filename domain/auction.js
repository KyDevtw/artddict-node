class Auction {
  constructor(aucClass, aucName, aucDes, aucId, aucPriceStart, aucPriceNow, aucDeadline, aucImg) {
    this.id = 0;
    this.aucClass = aucClass;
    this.aucName = aucName;
    this.aucDes = aucDes;
    this.aucId = aucId;
    this.aucPriceStart = aucPriceStart;
    this.aucPriceNow = aucPriceNow;
    this.aucDeadline = aucDeadline;
    this.aucImg = aucImg;
  }

  static getAllAucSQL(){
    let sql = `SELECT * FROM auctionitems`

    return sql;
  }

  static getaucByIdSQL(id) {
    let sql = `SELECT * FROM auctionitems WHERE aucId = ${id}`
    return sql
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

  // // static是與實例化無關
  // static getUserByIdSQL(id) {
  //   let sql = `SELECT * FROM USERS WHERE id = ${id}`;
  //   return sql;
  // }

  // // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`;
  //   return sql;
  // }

  // // static是與實例化無關
  // static getUserByQuerySQL(query) {
  //   const where = [];

  //   if (query.aucName) where.push(`aucName = '${query.aucName}'`);
  //   if (query.aucDeadline) where.push(`aucDeadline = '${query.aucDeadline}'`);
  //   if (query.aucPriceNow) where.push(`aucPriceNow = '${query.aucPriceNow}'`);

  //   let sql = "";

  //   if (where.length) sql = `SELECT * FROM auctionitems WHERE ` + where.join(" AND ");
  //   else sql = `SELECT * FROM auctionitems`;

  //   return sql;
  // }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  // static getAllUserSQL() {
  //   let sql = `SELECT * FROM USERS`;
  //   return sql;
  // }
}

//export default User
module.exports = Auction;
