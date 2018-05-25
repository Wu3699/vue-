<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <!-- <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="addUser">提交</a> -->

      <input type="text" name="userName" v-model="userName"> <br>
      <input type="text" name="password" v-model="password"> <br>
      <a href="javascript:;" @click="toUser">增加</a>
    </form>
    <input type="text">
    <button @click="deleteUser">删除</button>

    <ul>
      <li v-for="item in users">
        {{item.id}}  {{item.name}}  {{item.password}}
        <button @click="deleteUser(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      username:'',
      password:'',
      age: '',
      users:[]
    }
  },
  methods: {
    addUser() {
      var name = this.userName;
      var age = this.age;
      console.log(name+age)
      this.$http.post('http://localhost:3000/api/user/addUser', {
        username: name,
        age: age
      },{}).then((response) => {
        console.log(response.body);
      })
    },
    toUser(){
      const _this=this;
      var name = this.userName;
      var password = this.password;
      console.log(name+password)
      this.$http.post('http://localhost:3000/api/user/toUser', {
        userName: name,
        password: password
      },{}).then((response) => {
        console.log(response.body);
           _this.getData();
      })
    },
    deleteUser(id){
      const _this=this;
      this.$http.get('http://localhost:3000/api/user/deleteUser?id='+id).then(
      (res)=>{
        console.log(res.body);
        _this.getData();
      }
    )
    },
    getData(){
      const _this=this;
      this.$http.get('http://localhost:3000/api/user/get').then(
        (res)=>{
          _this.users=res.body;
        }
      )
    }
  },
  created:function(){
    this.getData();
  }
}
</script>
