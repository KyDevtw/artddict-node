const express = require("express");
const router = express.Router();
const nodeMailer = require('nodemailer');
const fs = require('fs');
const { getMaxListeners } = require("process");
//生成一個日期物件
const date = new Date();
//獲取當下年份
const year = date.getFullYear();
//判斷一下是否是個位數，是的話就在前面加個0
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
//判斷一下是否是個位數，是的話就在前面加個0 因為想呈現20200506
const day = date.getDate() <10 ? `0${date.getDate()}` : date.getDate();
const timeStr = `${year}${month}${day}`;
console.log(timeStr)

//htmlMail，這個變數將會是整個信件內容
let htmlMail = `<h3>真開心您對我們下個月的藝術活動有興趣</h3>
<h4>詳細的活動日期與時間會再藉由Mail通知您</h4>
<h4 >並賦予你專屬折扣碼！請不要錯過ARTDDICT的任何訊息！</h4>
<small>【個人資料聲明】
    1) 本活動由 ARTDDICT (台灣) 有限公司主辦。<br>
    2) 參加是次活動時，本公司將收集 閣下的個人資料（包括姓名、電話及地址等資料），並作為是次活動之活動聯繫、活動公告、隨後安排、聯絡及紀錄等行銷目的使用之用途。主辦單位為
    達成前文所述目的取得你的個人資料傳遞給主辦單位之聯營公司、附屬公司、及/或其他商業機構，以及為本公司進行資料維護、處理及寄發之服務供應商，而不論傳輸地點是否在香港。
    3) 如閣下不欲提供相關個人資料，則將影響閣下參加是次活動或取得主辦單位活動參與之權益。<br>
    【免責聲明】
    1) 參加者如因參與任何活動而導致的任何損傷及損失，主辦單位及協辦單位均不會負責。
    2) 本公司毋須因參加者於登記、登入、連接個人社交網絡、報名參與活動或換領獎賞途中的任何失誤、延誤、失
    敗、中斷、攔截、暫停、斯詐或違反保安事項；或本公司控制範圍內的任可原因，對所產生的任何損失、損害
    賠償或索償，向參加者或任何第三方負責或承擔任何責任。參加者同意並承諾，不會為參加此活動而招致的任
    何損失、損害或開支，包括但不限於參加者的資料、軟件、電腦、電話、電子產品、電訊設備或其他設備的任
    何損失或損害，要求本公司負責或承擔任何責任。</small>
`



// create transporter for sending email
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    type: "login",
    port: 465,
    secure: false,
    auth: {
        user: 'artddict.now@gmail.com',
        pass: 'artddictmfee14',
    },
    tls: {
        rejectUnauthorized: false
    }
});



router.post('/', (req, res, next) => {
    console.log(req.body.email);
    let mailOptions = {
        from: 'artddict.now@gmail.com',
        to: req.body.email,
        subject: "非常感謝的你來信",
        html:htmlMail,
      };
     
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
          res.json({ status: "Email sent"+`${req.body.email}` });
        }
      });
    
    
});





module.exports = router;