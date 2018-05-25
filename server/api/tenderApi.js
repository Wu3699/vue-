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

router.get('/gettender',(req,res)=>{
    var sql='SELECT * FROM `tender`';
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

router.post('/addtender', (req, res) => {
    var sql = $sql.tender.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.title, params.company_name,params.details,params.status], function(err, result) {
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
    var title = req.body.title;
    var company_name = req.body.company_name;
    var details = req.body.details;
    var status = req.body.status;
    var sql = "update tender set title = '"+ title +"',company_name = '"+ company_name +"',details= '"+details+"',status='"+status+"' where id = " + id;
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
    var sql='DELETE FROM `tender` WHERE id=?';
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
    var title = req.query.title;
    var sql = "SELECT * FROM tender WHERE title LIKE '%"+title+"%'";
    conn.query(sql,function(err,result){
        console.log(result)
        console.log(err)
        // if(err){
            jsonWrite(res,result)
        // }else{
        //     jsonWrite(res,"查询失败")
        // }
    });
})

module.exports = router;