// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'INSERT INTO `user`(id,name,password) VALUES(0,?,?)',
        get:'SELECT * FROM `user`',
        delete:'DELETE FROM `user` WHERE id=?'
    },
    law:{
        add:  'INSERT INTO `law`(id,title,content) VALUES(0,?,?)',
        get: 'SELECT * FROM `law`',
        delete:'DELETE FROM `law` WHERE id=?',
    },
    company:{
        get: 'SELECT * FROM `company`',
        add: 'INSERT INTO `company`(id,name,details,tel) VALUES(0,?,?,?)',
    },
    tender:{
        get: 'SELECT * FROM `tender`',
        add: 'INSERT INTO `tender`(id,title,company_name,details,status) VALUES(0,?,?,?,?)',
    }
}

module.exports = sqlMap;