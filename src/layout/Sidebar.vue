<template>
<div >
<el-col>
    <el-menu 
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu index="1" >
            <template slot="title"><i class="el-icon-document"></i>招投标信息</template>
             <el-menu-item-group>
                <!-- <router-link to="/home/law"><el-menu-item  index="1-1" >法律法规</el-menu-item></router-link>               -->
                <router-link to="/home/tender"><el-menu-item index="1-2">招标信息</el-menu-item></router-link>
                <!-- <router-link to="/home/user"><el-menu-item index="1-3">用户信息</el-menu-item></router-link> -->
                <router-link to="/home/utender"><el-menu-item index="1-4">中标信息</el-menu-item></router-link>
                <!-- <router-link to="/home/company"><el-menu-item index="1-5">公司信息</el-menu-item></router-link> -->
                <!-- <router-link to="/home/helloworld"><el-menu-item index="1-5">测试</el-menu-item></router-link> -->
             </el-menu-item-group>    
        </el-submenu>
         <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>法律法规</template>
        <el-menu-item-group>
           <router-link to="/home/law"><el-menu-item index="2-1">法律法规</el-menu-item></router-link>
        </el-menu-item-group>
         </el-submenu>
        <el-submenu index="3">
        <template slot="title"><i class="el-icon-tickets"></i>公司信息</template>
        <el-menu-item-group>
           <router-link to="/home/company"><el-menu-item index="3-1">公司信息</el-menu-item></router-link>
        </el-menu-item-group>
         </el-submenu>
        <el-submenu index="4">
        <template slot="title"><i class="el-icon-service"></i>用户信息</template>
        <el-menu-item-group>
           <router-link to="/home/user"><el-menu-item index="4-1">用户信息</el-menu-item></router-link>
        </el-menu-item-group>
         </el-submenu>
    </el-menu>
</el-col>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>