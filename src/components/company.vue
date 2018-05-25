<template>
<div>
    <div>
        <el-row>
          <el-col :span="18">
            <el-input v-model="input" placeholder="请输入查询公司" size="medium"></el-input>
          </el-col>
          <template>
            <el-button type="success" @click="reach()">查询</el-button>
            <el-button type="success" @click="dialogVisible = true">新增</el-button>
          </template>
        </el-row>
    </div>
    <div class="box">
      <el-table :data="coms" border  style="width: 100%">
        <el-table-column  prop="id"  label="编号" align="center" width="50"></el-table-column>
        <el-table-column  prop="name"  label="名称" align="center" width="150"></el-table-column>   
        <el-table-column  prop="details"  label="详情" align="left" show-overflow-tooltip="true" width="300"></el-table-column>
        <el-table-column  prop="tel"  label="电话号码" align="center" width="150"></el-table-column>
        <el-table-column  prop="create_time"  label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column  prop="status"  label="状态" align="center" width="78"></el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button  size="small" type="warning" @click="update(scope.row)">修改</el-button>        
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

<el-dialog
  title="增加公司信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
   <el-form :data="coms">
    <el-form-item label="名称" :label-width="formLabelWidth" >
      <el-input v-model="name" name="name" placeholder="请填写名称"></el-input>
    </el-form-item>
    <el-form-item label="详情" :label-width="formLabelWidth">
      <el-input v-model="details" name="details" placeholder="请填写公司详情信息" ></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="tel" name="tel" placeholder="请填写电话"></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addCompany">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="修改信息"
  :visible.sync="dialog"
  width="60%"
  :before-close="handleClose">
   <el-form :data="coms">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="uname" name="name" ></el-input>
    </el-form-item>
    <el-form-item label="详情" :label-width="formLabelWidth">
      <el-input v-model="udetails" name="details" ></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="utel" name="tel" ></el-input>
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
    data(){
       return{
        dialogVisible: false,
        dialog:false,
        formLabelWidth: '120px',
        coms:[],
        name:'',
        details:'',
        tel:'',
        create_time:'',
        input: '',
        uname:'',
        udetails:'',
        utel:''
       }
    },
    mounted:function (){
    this.getData();
    },
    methods:{
      getData(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/company/getcompany').then(
              (res)=>{
                _this.coms=res.body;  
              }
            )
      },
      addCompany(){  
            const _this=this;
            var name = this.name;
            var details = this.details;
            var tel = this.tel;
            this.$http.post('http://localhost:3000/api/company/addcompany', {
              name: name,
              details: details,
              tel:tel,
            },{}).then((response) => {
                console.log(response.body);
                _this.getData();
                _this.dialogVisible = false;
                _this.name=''
                _this.details=''
                _this.tel=''
            }).catch((res)=>{
              console.log(res.body)
            })
      },
      update:function(row){
        const _this=this
        _this.dialog=true
        _this.uname=row.name
        _this.udetails=row.details
        _this.utel=row.tel
        _this.uid=row.id
      },
      save:function(){
        const _this=this
        _this.dialog=false       
        this.$http.post('http://127.0.0.1:3000/api/company/update',{
          'name':_this.uname,
          'details':_this.udetails,
          'tel':_this.utel,
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
      handleDelete(index, row) {  
           const _this=this;
            this.$http.get('http://127.0.0.1:3000/api/company/deleteCom?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.coms.splice(index,1);
            _this.getData();
      },
      reach(){
        const _this=this
        this.$http.get('http://127.0.0.1:3000/api/company/search?name='+_this.input).then((res)=>{
          _this.coms=res.body
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>
.box{
  width: 1100px;

}
</style>