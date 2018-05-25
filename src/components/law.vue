<template>
  <div class="w">
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
<el-table :data="laws" border  style="width: 100%">
    <el-table-column  prop="id"  label="编号" align="center" width="80px"></el-table-column>
    <el-table-column  prop="title"  label="标题" align="center" width="300"></el-table-column>
    <el-table-column  prop="content"  label="内容" align="left" show-overflow-tooltip="true" width="350"></el-table-column>
    <el-table-column label="操作" width="170">
      <template scope="scope">
        <el-button  size="small" type="warning" @click="update(scope.row)">修改</el-button>        
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
</el-table>
  

<el-dialog
  title="增加信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
   <el-form :data="laws">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="title" name="title" placeholder="请填写标题" ></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="content" name="content" placeholder="请填写内容"></el-input>
    </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addLaw">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="修改信息"
  :visible.sync="dialog"
  width="60%"
  :before-close="handleClose">
   <el-form :data="laws">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="utitle" name="title" ></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="ucontent" name="content" ></el-input>
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
        laws:[],
        input: '',
        input: '',
        title:'',
        content:'',
        utitle:'',
        ucontent:'',
        uid:''
    } 
  },

  mounted:function (){
    this.getData();
  },
   methods:{
          getData(){
            const _this=this;
            this.$http.get('http://localhost:3000/api/law/getlaw').then(
              (res)=>{
                _this.laws=res.body;  
              }
            )
          },
          addLaw(){  
            const _this=this;
            var title = this.title;
            var content = this.content;
            console.log(title+content)
            this.$http.post('http://localhost:3000/api/law/addLaw', {
              title: title,
              content: content
            },{}).then((response) => {
                console.log(response.body);
                _this.getData();
                _this.dialogVisible = false;
                _this.content=''
                _this.title=''
            }).catch((res)=>{
              console.log(res.body)
            })
            
          },
          deLaw(id){
            const _this=this;
                  this.$http.get('http://localhost:3000/api/law/deleteLaw?id='+id).then(
                  (res)=>{
                    console.log(res.body);
                    _this.getData();
                  }
                )
          },
          //操作中的单个删除
         handleDelete(index, row) {  
           const _this=this;
            console.log("单个删除的index：",index);
            console.log("单个删除的row：",row);
            console.log(row.id)
            this.$http.get('http://127.0.0.1:3000/api/law/deleteLaw?id='+row.id).then(function(res){
              console.log(res.body)
            },function(res){
              console.log(res)
            })
            this.laws.splice(index,1);
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
        _this.utitle=row.title
        _this.ucontent=row.content
        _this.uid=row.id
      },
      save:function(){
        const _this=this
        _this.dialog=false
        // console.log(_this.ucontent+_this.utitle+_this.uid)
        this.$http.post('http://127.0.0.1:3000/api/law/update',{
          'content':_this.ucontent,
          'title':_this.utitle,
          'id':_this.uid
        }).then((res)=>{
          console.log(res)
          this.getData()
        }).catch((res)=>{
          console.log(res)
        })
      },
      reach(){
        const _this=this
        console.log(_this.input)
        this.$http.get('http://127.0.0.1:3000/api/law/search?title='+_this.input).then((res)=>{
          console.log(res.body)
          _this.laws=res.body
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

</style>