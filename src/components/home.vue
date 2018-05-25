
<template > 
<div class="main">
  <el-container>
  <el-header >投标管理系统后台</el-header>
  <el-main>
  <el-row>
    <el-col :span="3" >
      <sidebar></sidebar>
    </el-col>
    <el-col :span="20">
      <div class="right">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
  </el-main>
</el-container>

</div>
</template>

<script>
import sidebar from '@/layout/Sidebar'
  export default {
    components:{ sidebar},
    data () {
      return {
        
    }
    
  }
  }
</script>


<style>
.sideBar{
  /* position: absolute; */
  width: 10%;
  height: 500px;
}
.el-header {
    font-size: 25px;
    background-color:rgb(64, 158, 255);
    color:white;
    text-align: center;
}
 .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
.right{
  width: 90%;
  height: 500px;

}

</style>  


