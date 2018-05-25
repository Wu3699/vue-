<template>
  <div>
    <div>
        <el-row>
          <el-col :span="18">
            <el-input v-model="input" placeholder="请输入查询名称" size="medium"></el-input>
          </el-col>
          <template>
            <el-button type="success" @click="reach()">查询</el-button>
            <el-button type="success" @click="dialogVisible = true">新增</el-button>
          </template>
        </el-row>
    </div>
    <div class="box">
      <el-table :data="utender" border  style="width: 100%">
      <el-table-column  prop="id"  label="编号" align="center" width="50"></el-table-column>
      <el-table-column  prop="user_name"  label="中标用户" align="center" width="150"></el-table-column>
      <el-table-column  prop="tender_company_name"  label="中标公司" align="center" width="200"></el-table-column> 
      <el-table-column  prop="tender_title"  label="中标项目" align="left" show-overflow-tooltip="true" width="300"></el-table-column>
      <el-table-column  prop="create_time"  label="创建日期" align="center" width="200"></el-table-column>
      <el-table-column label="操作" width="198">
             <template scope="scope">
                <el-button  size="small" type="warning" @click="update(scope.row)">修改</el-button>        
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
      </el-table-column>
    </el-table>
    </div>

<el-dialog
  title="增加中标信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
   <el-form :data="utender">
    <el-form-item label="中标用户" :label-width="formLabelWidth">
      <el-input v-model="user_name" name="user_name" placeholder="请填写中标用户" ></el-input>
    </el-form-item>
    <el-form-item label="中标公司" :label-width="formLabelWidth">
      <el-input v-model="tender_company_name" name="tender_company_name" placeholder="请填写中标公司" ></el-input>
    </el-form-item>
    <el-form-item label="中标项目" :label-width="formLabelWidth">
      <el-input v-model="tender_title" name="tender_title" placeholder="请填写中标项目" ></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addUtender">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="修改信息"
  :visible.sync="dialog"
  width="60%"
  :before-close="handleClose">
   <el-form :data="utender">
    <el-form-item label="中标用户" :label-width="formLabelWidth">
      <el-input v-model="uuser_name" name="user_name" ></el-input>
    </el-form-item>
    <el-form-item label="中标公司" :label-width="formLabelWidth">
      <el-input v-model="utender_company_name" name="tender_company_name" ></el-input>
    </el-form-item>
    <el-form-item label="中标项目" :label-width="formLabelWidth">
      <el-input v-model="utender_title" name="tender_title" ></el-input>
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
        utender:[],
        dialogVisible: false,
        dialog:false,
        formLabelWidth: '120px',
        uuser_name:'',
        input:'',
        utender_company_name:'',
        utender_title:'',
        tender_title:''
        }
    },
    mounted:function (){
    this.getData();
    },
    methods:{
      getData(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/utender/getutender').then(
              (res)=>{
                _this.utender=res.body;  
              }
            )
      },
       addUtender(){  
            const _this=this;
            var user_name = this.user_name;
            var tender_company_name = this.tender_company_name;
            var tender_title = this.tender_title;
            this.$http.post('http://localhost:3000/api/utender/addutender', {
              user_name: user_name,
              tender_company_name: tender_company_name,
              tender_title:tender_title,
            },{}).then((response) => {
                console.log(response.body);
                _this.getData();
                _this.dialogVisible = false;
                _this.user_name=''
                _this.tender_company_name=''
                _this.tender_title=''
            }).catch((res)=>{
              console.log(res.body)
            })
            
      },
       update:function(row){
        const _this=this
        _this.dialog=true
        _this.uuser_name=row.user_name
        _this.utender_company_name=row.tender_company_name
        _this.utender_title=row.tender_title
        _this.uid=row.id
      },
      save:function(){
        const _this=this
        _this.dialog=false       
        this.$http.post('http://127.0.0.1:3000/api/utender/update',{
          'user_name':_this.uuser_name,
          'tender_company_name':_this.utender_company_name,
          'tender_title':_this.utender_title,
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
            this.$http.get('http://127.0.0.1:3000/api/utender/deleteTender?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.utender.splice(index,1);
            _this.getData();
         },
      reach(){
        const _this=this
        this.$http.get('http://127.0.0.1:3000/api/utender/search?tender_title='+_this.input).then((res)=>{
          _this.utender=res.body
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