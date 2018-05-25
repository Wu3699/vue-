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

router.get('/getlaw',(req,res)=>{
    var sql=$sql.law.get
    conn.query(sql,function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result)
            jsonWrite(res, result);
            // res.json(result)
        }
    })
    
}); 

router.post('/addLaw', (req, res) => {
    var sql = $sql.law.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.title, params.content], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/deleteLaw',(request,response)=>{
    console.log(request.query);
    var sql=$sql.law.delete;
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

router.post("/update",function(req,res){
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var sql = "update law set title = '"+ title +"',content = '"+ content +"' where id = " + id;
    console.log(sql);
    conn.query(sql,function(err,result){
        if(err){
            jsonWrite(res,"删除成功")
        }else {
            jsonWrite(res,"删除失败")
        }
    });
});

router.get("/search",function(req,res){
    console.log(req.query)
    var title = req.query.title;
    console.log(title)
    var sql = "SELECT * FROM law WHERE title LIKE '%"+title+"%'";
    console.log(sql);
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