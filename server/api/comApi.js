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

router.get('/getcompany',(req,res)=>{
    var sql=$sql.company.get;
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

router.post('/addcompany', (req, res) => {
    var sql = $sql.company.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.details,params.tel], function(err, result) {
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
    var name = req.body.name;
    var details = req.body.details;
    var tel = req.body.tel;
    var sql = "update company set name = '"+ name +"',details = '"+ details +"',tel= '"+tel+"' where id = " + id;
    console.log(sql);
    conn.query(sql,function(err,result){
        if(err){
            jsonWrite(res,"删除成功")
        }else {
            jsonWrite(res,"删除失败")
        }
    });
});

router.get('/deleteCom',(request,response)=>{
    var sql='DELETE FROM `company` WHERE id=?';
    var id=request.query.id;
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
    var name = req.query.name;
    var sql = "SELECT * FROM company WHERE name LIKE '%"+name+"%'";
    conn.query(sql,function(err,result){
        console.log(result)
        console.log(err)
        jsonWrite(res,result)
    });
})

module.exports = router;