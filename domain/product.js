class product {
  constructor(
    proName,
    proId,
    proPrice,
    proClass,
    proImg,
    proMutImg,
    proHotNew,
    proDes
  ) {
    this.id = 0;
    (this.proName = proName),
      (this.proId = proId),
      (this.proPrice = proPrice),
      (this.proClass = proClass),
      (this.proImg = proImg),
      (this.proMutImg = proMutImg),
      (this.proHotNew = proHotNew),
      (this.proDes = proDes);
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

  static是與實例化無關;
  static getProductByIdSQL(id) {
    let sql = `SELECT * FROM product WHERE id = ${id}`;
    return sql;
  }

  // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`;
  //   return sql;
  // }

  // static是與實例化無關
  static getProductByQuerySQL(query) {
    const where = [];

    if (query.id) where.push(`id = '${query.id}'`);
    if (query.proId) where.push(`proId = '${query.proId}'`);
    if (query.proName) where.push(`rpoName = '${query.proName}'`);

    let sql = "";

    if (where.length)
      sql = `SELECT * FROM product WHERE ` + where.join(" AND ");
    else sql = `SELECT * FROM product`;

    return sql;
  }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM product WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllProductSQL() {
    let sql = `SELECT * FROM product`;
    return sql;
  }
}

//export default User
module.exports = product;
