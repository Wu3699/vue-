// node 后端服务器
 
const userApi = require('./api/userApi');
const lawApi = require('./api/lawApi');
const comApi = require('./api/comApi');
const tenderApi = require('./api/tenderApi');
const utenderApi = require('./api/utenderApi');
const useApi = require('./api/useApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true'); //告诉客户端可以在HTTP请求中带上Cookie
  next();
})

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/law',lawApi);
app.use('/api/company',comApi);
app.use('/api/tender',tenderApi);
app.use('/api/utender',utenderApi);
app.use('/api/use',useApi);
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');