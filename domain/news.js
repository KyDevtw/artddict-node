class NewsComm {
    constructor(newsComId,userId,NewsCom,creates_at) {
        this.newsComId=0,
        this.userId=userId,
        this.NewsCom=NewsCom, 
        this.creates_at=creates_at
    }
  
    addNewsComToSever() {
    let sql = `INSERT INTO news_comment(userId, NewsCom,creates_at) \
    VALUES('${this.userId}', '${this.NewsCom}', NOW())`;
                   console.log(this.userId,this.NewsCom)
    return sql;
  }

  // updateUserByIdSQL(id) {
  //   let sql = `UPDATE USERS \
  //              SET name = '${this.name}', username = '${this.username}', password = '${this.password}', email = '${this.email}', lo｀gin = ${this.login} \
  //              WHERE id =  ${id}`;
  //   return sql;
  // }

  //static是與實例化無關
//   static getNewByIdSQL(query) {
//     let sql = `SELECT * FROM museum LEFT JOIN event ON museum.musId = event.museumId LEFT JOIN city ON cityId = museum.NewsCom WHERE musId = ${query.idMuseum}`;
//     return sql;
//   }

  // login用
  // getUserUserByUsernameAndPasswordSQL() {
  //   let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`;
  //   return sql;
  // }

  // static是與實例化無關
//   static getMusByQuerySQL(query) {
//     const where = [];

//     if (query.musId) where.push(`musId = '${query.musId}'`);
//     if (query.userId) where.push(`userId = '${query.userId}'`);
//     //必須對應路由過來的key
//     if (query.city) where.push(`cityName = '${query.city}'`);

//     let sql = "";

//     if (where.length) sql = `SELECT * FROM museum LEFT JOIN city ON city.cityId = museum.NewsCom WHERE ` +
//     where.join('AND');

//     return sql;
//   }

  // static deleteUserByIdSQL(id) {
  //   let sql = `DELETE FROM USERS WHERE ID = ${id}`;
  //   return sql;
  // }

  static getAllNewsSQL() {
    let sql = `SELECT * FROM news_comment `;
    return sql;
  }
}
  
  
  module.exports = NewsComm
  