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

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.age], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//请求全部数据
router.get('/get',(req,res)=>{
    var sql=$sql.user.get
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

router.post('/toUser',(req,res)=>{
    // console.log(req.body);
    var sql =$sql.user.add;
    var params=req.body;
    conn.query(sql,[params.userName,params.password],function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result)
            jsonWrite(res, result);
            // res.json(result)
        }
    })
});
//删除用户接口
router.get('/deleteUser',(request,response)=>{
    var sql=$sql.user.delete;
    var id=request.query.id;
    console.log(id);
    conn.query(sql,[id],function(err,result){
        if (err) {
            jsonWrite(response, "删除失败");
        }
        if (result) {
            // console.log(result)
            jsonWrite(response, "删除成功");
            // res.json(result)
        }
    })
});


module.exports = router;