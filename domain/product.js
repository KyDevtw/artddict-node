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

  static getAllProductSQL(query) {
    let sql = `SELECT * FROM product`;
    return sql;
  }
  // static getClassBySQLnew(proClass) {
  //   let sql = `SELECT * FROM product WHERE proHotNew  = "1"`;
  //   return sql;
  // }
  // static getClassBySQLhot(proClass) {
  //   let sql = `SELECT * FROM product WHERE proHotNew  = "2"`;
  //   return sql;
  // }

  // static getClassBySQLbooks(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C01"`;
  //   return sql;
  // }

  // static getClassBySQLfurniture(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C02"`;
  //   return sql;
  // }

  // static getClassBySQLclothes(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C03"`;
  //   return sql;
  // }

  // static getClassBySQLaccessories(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C04"`;
  //   return sql;
  // }

  // static getClassBySQLstationery(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C05"`;
  //   return sql;
  // }

  // static getClassBySQLcasual(proClass) {
  //   let sql = `SELECT * FROM product WHERE proClass = "C06"`;
  //   return sql;
  // }

  static getClassesByQuerySQL(query) {
    console.log("CLASSES");

    let sql = "";

    // if(query.category){
    // else if (query.category === "allproduct") sql = `SELECT * FROM product`;
    // else if (query.category === "newarrival")
    //   sql = `SELECT * FROM product WHERE proHotNew  = "1"`;
    // else if (query.category === "hotproduct")
    //   sql = `SELECT * FROM product WHERE proHotNew  = "2"`;
    // else if (query.category === "books")
    //   sql = `SELECT * FROM product WHERE proClass = "C01"`;
    // else if (query.category === "furniture")
    //   sql = `SELECT * FROM product WHERE proClass = "C02"`;
    // else if (query.category === "clothes")
    //   sql = `SELECT * FROM product WHERE proClass = "C03"`;
    // else if (query.category === "accessories")
    //   sql = `SELECT * FROM product WHERE proClass = "C04"`;
    // else if (query.category === "stationery")
    //   sql = `SELECT * FROM product WHERE proClass = "C05"`;
    // else if (query.category === "casual")
    //   sql = `SELECT * FROM product WHERE proClass = "C06"`;

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

    console.log(sql);
    return sql;
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

    console.log(sql);
    return sql;
  }
  // static async getRows(params = {}) {
  //   let perPage = params.perPage || 5; // 每頁有幾筆
  //   let page = params.page || 1; // 查看第幾頁
  //   let cate = parseInt(params.cate) || 0; // 分類編號
  //   let keyword = params.keyword || ""; // 搜尋產品名稱或者作者姓名
  //   let orderBy = params.orderBy || ""; // 排序

  //   let where = " WHERE 1 ";
  //   if (cate) {
  //     where += " AND category_sid=" + cate;
  //   }
  //   if (keyword) {
  //     let k2 = db.escape("%" + keyword + "%");
  //     where += ` AND (author LIKE ${k2} OR bookname LIKE ${k2}) `;
  //   }

  //   let orderStr = "";
  //   switch (orderBy) {
  //     case "price":
  //     case "price-asc":
  //       orderStr = " ORDER BY `price` ASC ";
  //       break;
  //     case "price-desc":
  //       orderStr = " ORDER BY `price` DESC ";
  //       break;
  //     case "pages":
  //     case "pages-asc":
  //       orderStr = " ORDER BY `pages` ASC ";
  //       break;
  //     case "pages-desc":
  //       orderStr = " ORDER BY `pages` DESC ";
  //       break;
  //   }

  //   let t_sql = `SELECT COUNT(1) num FROM \`product\` ${where}`;
  //   let [r1] = await db.query(t_sql);
  //   let total = r1[0]["num"];

  //   let r2,
  //     totalPages = 0;
  //   if (total) {
  //     totalPages = Math.ceil(total / perPage);
  //     let r_sql = `SELECT * FROM \`product\` ${where} ${orderStr} LIMIT ${
  //       (page - 1) * perPage
  //     }, ${perPage}`;
  //     [r2] = await db.query(r_sql);
  //   }
  //   return {
  //     total,
  //     totalPages,
  //     perPage,
  //     page,
  //     params,
  //     data: r2,
  //   };
  // }
}

//export default User
module.exports = product;
