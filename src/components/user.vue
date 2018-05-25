<template>
  <div class="w">
    <div>
        <el-row>
          <el-col :span="18">
            <el-input v-model="input" placeholder="请输入查询名称" size="medium"></el-input>
          </el-col>
          <template>
            <el-button type="success" @click="reach()">查询</el-button>
          </template>
        </el-row>
    </div>
  <div>
      <el-table :data="user" border  style="width: 100%">
          <el-table-column  prop="id"  label="编号" align="center" width="80"></el-table-column>
          <el-table-column  prop="name"  label="姓名" align="center" width="160"></el-table-column>
          <el-table-column  prop="password"  label="密码" align="center"  width="160"></el-table-column>
          <el-table-column  prop="company_name"  label="公司名称" align="center" width="350"></el-table-column>   
          <el-table-column label="操作" align="center" width="207">
              <template scope="scope">
                <el-button  size="small" type="warning" @click="update(scope.row)">修改</el-button>        
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
<el-dialog
  title="修改信息"
  :visible.sync="dialog"
  width="60%"
  :before-close="handleClose">
   <el-form :data="user">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="uname" name="name" ></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="upassword" name="password" ></el-input>
    </el-form-item>
    <el-form-item label="公司名称" :label-width="formLabelWidth">
      <el-input v-model="ucompany_name" name="company_name" ></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary"  @click="save">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
        dialogVisible: false,
        dialog:false,
        formLabelWidth: '120px',
        user:[],
        input: '',
        uname:'',
        upassword:'',
        ucompany_name:'',
        uid:''
    } 
  },

  mounted:function (){
    this.getData();
  },
   methods:{ 
          getData(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/use/getuser').then(
              (res)=>{
                _this.user=res.body;  
              }
            )
          },
         handleDelete(index, row) {  
           const _this=this;
            console.log("单个删除的index：",index);
            console.log("单个删除的row：",row);
            console.log(row.id)
            this.$http.get('http://127.0.0.1:3000/api/use/deleteUser?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.user.splice(index,1);
            _this.getData();
         },
         handleEdit(index, row) {  
                this.editFormVisible = true;    
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      update:function(row){
        const _this=this
        _this.dialog=true
        _this.uname=row.name
        _this.upassword=row.password
        _this.ucompany_name=row.company_name
        _this.uid=row.id
      },
      save:function(){
        const _this=this
        _this.dialog=false       
        this.$http.post('http://127.0.0.1:3000/api/use/update',{
          'name':_this.uname,
          'password':_this.upassword,
          'company_name':_this.ucompany_name,
          'id':_this.uid
        }).then((res)=>{
          console.log(res)
          this.getData()
          this.$message({
              message: '修改成功',
              type: 'success'
            });
        }).catch((res)=>{
          console.log(res)
        })
      },
      reach(){
        const _this=this
        console.log(_this.input)
        this.$http.get('http://127.0.0.1:3000/api/use/search?name='+_this.input).then((res)=>{
          console.log(res.body)
          _this.user=res.body
        })
      }
  
  }
}
</script>

<style scoped>
.w{
    height: 500px;
    background-color: #E9EEF3;
}
.box{
  width: 1100px;

}
</style>