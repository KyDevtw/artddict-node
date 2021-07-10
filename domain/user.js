class User {
  constructor(username, name, password, gender, mobile, birthday, address, userImg, userfav, userCoupon) {
    this.id = 0
    this.username = username;
    this.name = name;
    this.password = password;
    this.gender = gender;
    this.mobile = mobile;
    this.birthday = birthday;
    this.address = address;
    this.userImg = userImg;
    this.userfav = userfav;
    this.userCoupon = userCoupon;
    this.login = 0;
  }

  addUserSQL() {
    let sql = `INSERT INTO USERS(username, name, password, login, createdDate) \
                   VALUES('${this.username}', '${this.name}', '${this.password}',  0, NOW())`
    return sql
  }

  // updateUserByIdSQL(id) {
  //   let sql = `UPDATE USERS \
  //              SET username = '${this.username}', name = '${this.name}', gender = '${this.gender}', mobile = '${this.mobile}' , birthday = '${this.birthday}', address = '${this.address}', login = ${this.login} \
  //              WHERE id =  ${id}`
    
  //   return sql
  // }

  updateUserByIdSQL(id) {
    let sql = `UPDATE USERS \ SET `
    if (this.username != null) {
      sql += `username = '${this.username}',`
    }
    if (this.name != null) {
      sql += `name = '${this.name}', `
    }
    if (this.gender != null ) {
      sql += `gender = '${this.gender}', `
    }
    if (this.mobile != null) {
      sql += `mobile = '${this.mobile}' , `
    }
    if (this.birthday != null) {
      sql += `birthday = '${this.birthday}', `
    }
    if (this.address != null) {
      sql += `address = '${this.address}', `
    } 
    sql += `login = ${this.login} \ WHERE id = ${id}`
      
    
    return sql
  }

  updatePwdByIdSQL(id) {
    console.log(`pwd received = ${this.password}`)
    let sql = `UPDATE USERS \
               SET password = '${this.password}', login = ${this.login} \
               WHERE id =  ${id}`
    return sql
  }

  // updatePwdByIdSQL(id) {
  //   let sql = `UPDATE USERS \ SET`
  //   if (this.password != null) {
  //     sql += `password = '${this.password}\ WHERE id = ${id}`
  //   }
  // }



  // static是與實例化無關
  static getUserByIdSQL(id) {
    let sql = `SELECT * FROM USERS WHERE id = ${id}`
    return sql
  }

  // login用
  getUserUserByUsernameAndPasswordSQL() {
    let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`
    return sql
  }

  // static是與實例化無關
  static getUserByQuerySQL(query) {
    const where = []

    if (query.name) where.push(`name = '${query.name}'`)
    // if (query.email) where.push(`email = '${query.email}'`)
    if (query.username) where.push(`username = '${query.username}'`)

    let sql = ''

    if (where.length) sql = `SELECT * FROM USERS WHERE ` + where.join(' AND ')
    else sql = `SELECT * FROM USERS`

    return sql
  }

  static deleteUserByIdSQL(id) {
    let sql = `DELETE FROM USERS WHERE id = ${id}`
    return sql
  }

  static getAllUserSQL() {
    let sql = `SELECT * FROM USERS`
    return sql
  }
}

//export default User
module.exports = User
