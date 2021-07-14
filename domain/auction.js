// mysql2 async-await用的
const dbMysql2 = require("../db/database");

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
  static getAucByQuerySQL(query,a) {
    const where = [];

    if (query.search) where.push(`aucName LIKE '%${query.search}%'`);

    if (query.category === 'Paintings') where.push(`aucClass = 'H'`);
    if (query.category === 'clothes') where.push(`aucClass = 'C03'`);
    if (query.category === 'furniture') where.push(`aucClass = 'C02'`);
    if (query.category === 'stationery') where.push(`aucClass = 'C05'`);
    if (query.category === 'books') where.push(`aucClass = 'C01'`);
    if (query.category === 'accessories') where.push(`aucClass = 'C04'`);

    let bbb = parseInt(query.priceRange)
    console.log(bbb)
    const priceRangeArr = query.priceRange.split(',')
    console.log("新",priceRangeArr[0],priceRangeArr[1])
    if (query.priceRange){
        where.push(`aucPriceNow BETWEEN ${priceRangeArr[0]} AND ${priceRangeArr[1]}`)
    }

    let sql = "";

    if (where.length) {
      sql = `SELECT * FROM auctionitems WHERE ` + where.join(" AND ");
    }
    else {
      sql = `SELECT * FROM auctionitems`;
    }
    if (query.arrangement === 't-less') sql += ` ORDER BY aucDeadline ASC`
    if (query.arrangement === 't-more') sql += ` ORDER BY aucDeadline DESC`
    if (query.arrangement === 'p-high') sql += ` ORDER BY aucPriceNow DESC`
    if (query.arrangement === 'p-less') sql += ` ORDER BY aucPriceNow ASC`
    // if (String(a.l_sql)) sql+= a.l_sql
    console.log(sql)
    return sql;
  }

  static deleteUserByIdSQL(id) {
    let sql = `DELETE FROM USERS WHERE ID = ${id}`;
    return sql;
  }

  static getAucArrByQuerySQL() {

  }

  static getbidInfoByQuerySQL (id){
    let sql =`SELECT aucName,aucId,aucPriceStart,aucPriceNow,aucDeadline,Sid,Price,aucCreated_at,name,aucImg
    FROM auctionitems
    LEFT JOIN aucbuyerinfo
    ON auctionitems.aucId = aucbuyerinfo.auction_id
    LEFT JOIN users
    ON users.id = aucbuyerinfo.Member_Id
    WHERE auction_id = ${id}
    ORDER BY price DESC`
    return sql
  }


  // static getAllUserSQL() {
  //   let sql = `SELECT * FROM USERS`;
  //   return sql;
  // }
}

//export default User
module.exports = Auction;
