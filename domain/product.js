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
    proDes,
    proNum,
    userId,
    comments,
    starValue,
    created_at
  ) {
    this.id = 0;
    this.proName = proName;
    this.proId = proId;
    this.proPrice = proPrice;
    this.proClass = proClass;
    this.proImg = proImg;
    this.proMutImg = proMutImg;
    this.proHotNew = proHotNew;
    this.proDes = proDes;
    this.proNum = proNum;
    this.userId = userId;
    this.comments = comments;
    this.starValue = starValue;
    this.created_at = created_at;
  }

  addCommentsSQL() {
    let sql = `INSERT INTO PROCOMMENTS(proNum, userId, comments, starValue) VALUES ('${this.proNum}', '${this.userId}', '${this.comments}', '${this.starValue}')`;
    return sql;
  }

  static getCommentsdbySQL(query) {
    let sql = `SELECT * FROM proComments INNER JOIN product ON product.id = proComments.proNum WHERE id = ${query.id}`;
    return sql;
  }

  static getStarSumbySQL(query) {
    let sql = `SELECT SUM(starValue) AS starTotal FROM proComments INNER JOIN product ON product.id = proComments.proNum WHERE id = ${query.id}`;
    return sql;
  }

  static getAllProductSQL(query) {
    let sql = `SELECT * FROM product`;
    return sql;
  }

  static getProductIdbySQL(id) {
    let sql = `SELECT * FROM product LEFT JOIN proComments ON product.id = proComments.proNum WHERE id = ${id}`;

    return sql;
  }

  static getClassesByQuerySQL(query) {
    console.log("CLASSES");
    console.log("queryyyyyyyy", query);
    console.log("123456");

    let sql = "";

    switch (query.category) {
      case "allproduct":
        sql = `SELECT * FROM product`;
        break;
      case "newarrival":
        sql = `SELECT * FROM product WHERE proHotNew  = "1"`;
        break;
      case "hotproduct":
        sql = `SELECT * FROM product WHERE proHotNew  = "2"`;
        break;
      case "books":
        sql = `SELECT * FROM product WHERE proClass = "C01"`;
        break;
      case "furniture":
        sql = `SELECT * FROM product WHERE proClass = "C02"`;
        break;
      case "clothes":
        sql = `SELECT * FROM product WHERE proClass = "C03"`;
        break;
      case "accessories":
        sql = `SELECT * FROM product WHERE proClass = "C04"`;
        break;
      case "stationery":
        sql = `SELECT * FROM product WHERE proClass = "C05"`;
        break;
      case "casual":
        sql = `SELECT * FROM product WHERE proClass = "C06"`;
        break;
      default:
        sql = "";
        // sql = `SELECT * FROM product`;
        break;
    }

    const where = [];

    if (query.search) where.push(`proName LIKE '%${query.search}%'`);

    if (sql == "SELECT * FROM product") {
      if (where.length) {
        sql += ` WHERE ` + where;
        console.log("All");
      }
    }

    if (sql !== "") {
      if (where.length) {
        sql += ` AND ` + where;
        console.log("456");
      }
    }

    if (sql === "") {
      if (where.length) {
        sql += `SELECT * FROM product WHERE ` + where;
        console.log("123");
      }
    }

    if (sql == "SELECT * FROM product") {
      if (query.priceRange === "[0,0]") {
        sql += " WHERE `proPrice` BETWEEN 0 AND 0 ";
      }
      if (query.priceRange === "[0,2000]") {
        sql += " WHERE `proPrice` BETWEEN 0 AND 2000 ";
      }
      if (query.priceRange === "[0,4000]") {
        sql += " WHERE `proPrice` BETWEEN 0 AND 4000 ";
      }
      if (query.priceRange === "[0,6000]") {
        sql += " WHERE `proPrice` BETWEEN 0 AND 6000 ";
      }
      if (query.priceRange === "[0,8000]") {
        sql += " WHERE `proPrice` BETWEEN 0 AND 8000 ";
      }
      if (query.priceRange === "[2000,2000]") {
        sql += " WHERE `proPrice` BETWEEN 2000 AND 2000 ";
      }
      if (query.priceRange === "[2000,4000]") {
        sql += " WHERE `proPrice` BETWEEN 2000 AND 4000 ";
      }
      if (query.priceRange === "[2000,6000]") {
        sql += " WHERE `proPrice` BETWEEN 2000 AND 6000 ";
      }
      if (query.priceRange === "[2000,8000]") {
        sql += " WHERE `proPrice` BETWEEN 2000 AND 8000 ";
      }
      if (query.priceRange === "[4000,4000]") {
        sql += " WHERE `proPrice` BETWEEN 4000 AND 4000 ";
      }
      if (query.priceRange === "[4000,6000]") {
        sql += " WHERE `proPrice` BETWEEN 4000 AND 6000 ";
      }
      if (query.priceRange === "[4000,8000]") {
        sql += " WHERE `proPrice` BETWEEN 4000 AND 8000 ";
      }
      if (query.priceRange === "[6000,8000]") {
        sql += " WHERE `proPrice` BETWEEN 6000 AND 8000 ";
      }
      if (query.priceRange === "[8000,8000]") {
        sql += " WHERE `proPrice` BETWEEN 8000 AND 8000 ";
      }
    }

    if (sql !== "") {
      if (query.priceRange === "[0,0]") {
        sql += " AND `proPrice` BETWEEN 0 AND 0 ";
      }
      if (query.priceRange === "[0,2000]") {
        sql += " AND `proPrice` BETWEEN 0 AND 2000 ";
      }
      if (query.priceRange === "[0,4000]") {
        sql += " AND `proPrice` BETWEEN 0 AND 4000 ";
      }
      if (query.priceRange === "[0,6000]") {
        sql += " AND `proPrice` BETWEEN 0 AND 6000 ";
      }
      if (query.priceRange === "[0,8000]") {
        sql += " AND `proPrice` BETWEEN 0 AND 8000 ";
      }
      if (query.priceRange === "[2000,2000]") {
        sql += " AND `proPrice` BETWEEN 2000 AND 2000 ";
      }
      if (query.priceRange === "[2000,4000]") {
        sql += " AND `proPrice` BETWEEN 2000 AND 4000 ";
      }
      if (query.priceRange === "[2000,6000]") {
        sql += " AND `proPrice` BETWEEN 2000 AND 6000 ";
      }
      if (query.priceRange === "[2000,8000]") {
        sql += " AND `proPrice` BETWEEN 2000 AND 8000 ";
      }
      if (query.priceRange === "[4000,4000]") {
        sql += " AND `proPrice` BETWEEN 4000 AND 4000 ";
      }
      if (query.priceRange === "[4000,6000]") {
        sql += " AND `proPrice` BETWEEN 4000 AND 6000 ";
      }
      if (query.priceRange === "[4000,8000]") {
        sql += " AND `proPrice` BETWEEN 4000 AND 8000 ";
      }
      if (query.priceRange === "[6000,8000]") {
        sql += " AND `proPrice` BETWEEN 6000 AND 8000 ";
      }
      if (query.priceRange === "[8000,8000]") {
        sql += " AND `proPrice` BETWEEN 8000 AND 8000 ";
      }
    }

    if (sql === "") {
      if (query.priceRange === "[0,0]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 0 AND 0 ";
      }
      if (query.priceRange === "[0,2000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 0 AND 2000 ";
      }
      if (query.priceRange === "[0,4000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 0 AND 4000 ";
      }
      if (query.priceRange === "[0,6000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 0 AND 6000 ";
      }
      if (query.priceRange === "[0,8000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 0 AND 8000 ";
      }
      if (query.priceRange === "[2000,2000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BEWEEN 2000 AND 2000 ";
      }
      if (query.priceRange === "[2000,4000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 2000 AND 4000 ";
      }
      if (query.priceRange === "[2000,6000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 2000 AND 6000 ";
      }
      if (query.priceRange === "[2000,8000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 2000 AND 8000 ";
      }
      if (query.priceRange === "[4000,4000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 4000 AND 4000 ";
      }
      if (query.priceRange === "[4000,6000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 4000 AND 6000 ";
      }
      if (query.priceRange === "[4000,8000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 4000 AND 8000 ";
      }
      if (query.priceRange === "[6000,8000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 6000 AND 8000 ";
      }
      if (query.priceRange === "[8000,8000]") {
        sql += "SELECT * FROM product WHERE `proPrice` BETWEEN 8000 AND 8000 ";
      }
    }

    if (sql !== "") {
      if (query.arrangement === "highToLow") sql += ` ORDER BY proPrice DESC`;
      if (query.arrangement === "lowToHigh") sql += ` ORDER BY proPrice ASC`;
      console.log("995");
    }

    if (sql === "") {
      if (query.arrangement === "highToLow") {
        sql = `SELECT * FROM product ORDER BY proPrice DESC`;
      }
      if (query.arrangement === "lowToHigh") {
        sql = `SELECT * FROM product ORDER BY proPrice ASC`;
      }
      console.log("789");
    }

    let pageNow = query.page || 1;
    let pageSQL = ` LIMIT ${(pageNow - 1) * 9},9`;
    if (sql) {
      sql += pageSQL;

      console.log(sql);
      return sql;
    }
  }

  static getPriceSearchByQuerySQL(query) {
    console.log("heool");
    const where = [];

    if (query.search) where.push(`proName LIKE '%${query.search}%'`);

    let sql = "";

    if (where.length) {
      sql = `SELECT * FROM product WHERE ` + where.join(" AND ");
    } else {
      sql = `SELECT * FROM product`;
    }

    if (query.arrangement === "highToLow") sql += ` ORDER BY proPrice DESC`;
    if (query.arrangement === "lowToHigh") sql += ` ORDER BY proPrice ASC`;

    return sql;
  }
}

//export default User
module.exports = product;
