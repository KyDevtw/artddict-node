const { json } = require("body-parser");

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

  static getAllProductSQL(query) {
    let sql = `SELECT * FROM product`;
    return sql;
  }
  static async getRows(params = {}) {
    let perPage = params.perPage || 5; // 每頁有幾筆
    let page = params.page || 1; // 查看第幾頁
    let cate = parseInt(params.cate) || 0; // 分類編號
    let keyword = params.keyword || ""; // 搜尋產品名稱或者作者姓名
    let orderBy = params.orderBy || ""; // 排序

    let where = " WHERE 1 ";
    if (cate) {
      where += " AND category_sid=" + cate;
    }
    if (keyword) {
      let k2 = db.escape("%" + keyword + "%");
      where += ` AND (author LIKE ${k2} OR bookname LIKE ${k2}) `;
    }

    let orderStr = "";
    switch (orderBy) {
      case "price":
      case "price-asc":
        orderStr = " ORDER BY `price` ASC ";
        break;
      case "price-desc":
        orderStr = " ORDER BY `price` DESC ";
        break;
      case "pages":
      case "pages-asc":
        orderStr = " ORDER BY `pages` ASC ";
        break;
      case "pages-desc":
        orderStr = " ORDER BY `pages` DESC ";
        break;
    }

    let t_sql = `SELECT COUNT(1) num FROM \`product\` ${where}`;
    let [r1] = await db.query(t_sql);
    let total = r1[0]["num"];

    let r2,
      totalPages = 0;
    if (total) {
      totalPages = Math.ceil(total / perPage);
      let r_sql = `SELECT * FROM \`product\` ${where} ${orderStr} LIMIT ${
        (page - 1) * perPage
      }, ${perPage}`;
      [r2] = await db.query(r_sql);
    }
    return {
      total,
      totalPages,
      perPage,
      page,
      params,
      data: r2,
    };
  }
}

//export default User
module.exports = product;
