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

router.get('/getuser',(req,res)=>{
    var sql='SELECT * FROM `user`';
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

router.post("/update",function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var password = req.body.password;
    var company_name = req.body.company_name;
    var sql = "update user set name = '"+ name +"',password = '"+ password +"',company_name= '"+company_name+"' where id = " + id;
    console.log(sql);
    conn.query(sql,function(err,result){
        if(err){
            jsonWrite(res,"删除成功")
        }else {
            jsonWrite(res,"删除失败")
        }
    });
});

router.get('/deleteUser',(request,response)=>{
    console.log(request.query);
    var sql='DELETE FROM `user` WHERE id=?';
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
    var name = req.query.name;
    var sql = "SELECT * FROM user WHERE name LIKE '%"+name+"%'";
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