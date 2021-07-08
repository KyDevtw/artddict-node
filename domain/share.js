const express = require("express");

const Share = require(__dirname + "/../api/Share");

const router = express.Router();

/*
列表 + 篩選 (包含關鍵字搜尋）

單項商品

 */

// 取得所有商品 + 篩選 ?
// router.get("/", async (req, res) => {
//   res.json("hi");
// });

// 新增商品測試
router.get("/add", async (req, res) => {
  const p1 = new Product({
    author: "abc",
    bookname: "XX大全",
  });
  const obj1 = await p1.save();

  const p2 = await Product.getItem(23);
  p2.data.author = "林小新2";
  const obj2 = await p2.save();

  const p3 = await Product.getItem(25);
  res.json([req.baseUrl, req.url, obj1, obj2, await p3.remove()]);
});

// 取得單項商品
router.get("/all", async (req, res) => {
  // res.json(await Product.getRows({cate:3}));
  res.json(await Product.getRows({ keyword: "林", orderBy: "price-desc" }));
});

// 取得單項商品
router.get("/:sid", async (req, res) => {
  let p = await Product.getRow(req.params.sid);

  res.json([req.baseUrl, req.url, p]);
});

app.post("/upload-photos", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data = [];

      //loop all files
      _.forEach(_.keysIn(req.files.photos), (key) => {
        let photo = req.files.photos[key];

        //move photo to uploads directory
        photo.mv("./uploads/" + photo.name);

        //push file details
        data.push({
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        });
      });

      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
