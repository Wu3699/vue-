var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.get('/getutender',(req,res)=>{
    var sql='SELECT * FROM `utender`';
    conn.query(sql,function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result)
            jsonWrite(res, result);
           
        }
    })
    
});

router.post('/addutender', (req, res) => {
    var sql = 'INSERT INTO `utender`(id,user_name,tender_company_name,tender_title) VALUES(0,?,?,?)';
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.user_name, params.tender_company_name,params.tender_title], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post("/update",function(req,res){
    var id = req.body.id;
    var user_name = req.body.user_name;
    var tender_company_name = req.body.tender_company_name;
    var tender_title = req.body.tender_title;
    var sql = "update utender set user_name = '"+ user_name +"',tender_company_name = '"+ tender_company_name +"',tender_title= '"+tender_title+"' where id = " + id;
    console.log(sql);
    conn.query(sql,function(err,result){
        if(err){
            jsonWrite(res,"删除成功")
        }else {
            jsonWrite(res,"删除失败")
        }
    });
});


router.get('/deleteTender',(request,response)=>{
    console.log(request.query);
    var sql='DELETE FROM `utender` WHERE id=?';
    var id=request.query.id;
    console.log(id);
    conn.query(sql,[id],function(err,result){
        if (err) {
            jsonWrite(response, "删除失败");
        }
        if (result) {
            jsonWrite(response, "删除成功");
        }
    })
});

router.get("/search",function(req,res){
    var tender_title = req.query.tender_title;
    var sql = "SELECT * FROM utender WHERE tender_title LIKE '%"+tender_title+"%'";
    conn.query(sql,function(err,result){
        console.log(result)
        console.log(err)
        jsonWrite(res,result)
    });
})

module.exports = router;