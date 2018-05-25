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
      <el-table :data="tender" border  style="width: 100%">
        <el-table-column  prop="id"  label="编号" align="center" width="50"></el-table-column>
        <el-table-column  prop="title"  label="招标项目" align="center" show-overflow-tooltip="true" width="150"></el-table-column>
        <el-table-column  prop="company_name"  label="招标公司" align="left" show-overflow-tooltip="true" width="150"></el-table-column>
        <el-table-column  prop="details"  label="招标详情" align="left" show-overflow-tooltip="true" width="300"></el-table-column>
        <el-table-column  prop="status"  label="招标状态" align="left" show-overflow-tooltip="true" width="78"></el-table-column>
        <el-table-column  prop="end_date"  label="截止日期" align="center" width="200"></el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
                <el-button  size="small" type="warning" @click="update(scope.row)">修改</el-button>        
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<el-dialog
  title="增加招标信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
   <el-form :data="tender">
    <el-form-item label="招标项目" :label-width="formLabelWidth">
      <el-input v-model="title" name="title" placeholder="请填写招标项目" ></el-input>
    </el-form-item>
    <el-form-item label="招标公司" :label-width="formLabelWidth">
      <el-input v-model="company_name" name="company_name" placeholder="请填写招标公司" ></el-input>
    </el-form-item>
    <el-form-item label="项目详情" :label-width="formLabelWidth">
      <el-input v-model="details" name="details" placeholder="请填写项目详情" ></el-input>
    </el-form-item>
    <el-form-item label="招标状态" :label-width="formLabelWidth">
      <el-input v-model="status" name="status" placeholder="请填写招标状态" ></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addTender">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="修改招标信息"
  :visible.sync="dialog"
  width="60%"
  :before-close="handleClose">
   <el-form :data="tender">
    <el-form-item label="招标项目" :label-width="formLabelWidth">
      <el-input v-model="utitle" name="title" ></el-input>
    </el-form-item>
    <el-form-item label="招标公司" :label-width="formLabelWidth">
      <el-input v-model="ucompany_name" name="company_name" ></el-input>
    </el-form-item>
    <el-form-item label="项目详情" :label-width="formLabelWidth">
      <el-input v-model="udetails" name="details" ></el-input>
    </el-form-item>
    <el-form-item label="招标状态" :label-width="formLabelWidth">
      <el-input v-model="ustatus" name="status" ></el-input>
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
        tender:[],
        dialogVisible: false,
        dialog:false,
        formLabelWidth: '120px',
        title:'',
        company_name:'',
        details:'',
        utitle:'',
        ucompany_name:'',
        udetails:'',
        ustatus:''
        }
    },
    mounted:function (){
    this.getData();
    }, 
    methods:{
      getData(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/tender/gettender').then(
              (res)=>{
                _this.tender=res.body;  
              }
            )
      },
      addTender(){  
            const _this=this;
            var title = this.title;
            var company_name = this.company_name;
            var details = this.details;
            var status = this.status;
            this.$http.post('http://localhost:3000/api/tender/addtender', {
              title: title,
              company_name: company_name,
              details:details,
              status:status,
            },{}).then((response) => {
                console.log(response.body);
                _this.getData();
                _this.dialogVisible = false;
                _this.title=''
                _this.company_name=''
                _this.details=''
            }).catch((res)=>{
              console.log(res.body)
            })     
      },
      update:function(row){
        const _this=this
        _this.dialog=true
        _this.utitle=row.title
        _this.ucompany_name=row.company_name
        _this.udetails=row.details
        _this.ustatus=row.status
        _this.uid=row.id
      },
      save:function(){
        const _this=this
        _this.dialog=false       
        this.$http.post('http://127.0.0.1:3000/api/tender/update',{
          'title':_this.utitle,
          'company_name':_this.ucompany_name,
          'details':_this.udetails,
          'status':_this.ustatus,
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
            this.$http.get('http://127.0.0.1:3000/api/tender/deleteTender?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.tender.splice(index,1);
            _this.getData();
         },
        reach(){
        const _this=this
        this.$http.get('http://127.0.0.1:3000/api/tender/search?title='+_this.input).then((res)=>{
          _this.tender=res.body
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    }  
    }
</script>

<style scoped>
.box{
  width: 1100px;

}
</style>