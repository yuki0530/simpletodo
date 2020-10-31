<template>
  <div class="signin">
    <h1 class="signin-title">おかえりなさい！</h1>
    <p class="signin-text">サインインしてSimpleTodoを利用しよう！</p>
    <div class="signin-item">
      <label for="mail">メールアドレス</label>
      <br>
      <input type="text" id="mail" v-model="username">
    </div>
    <div class="signin-item">
      <label for="">パスワード</label>
      <br>
      <input type="password" id="pass" v-model="password">
    </div>
    <div class="signin-btn" @click="signIn">
      サインイン
    </div>
    <p>
      <router-link class="signin-link" to="/">未登録の方はこちらから登録してください！</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import { db } from "@/firebase.js"

export default {
  name: "signin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then(user => {
        // サインインに成功したユーザーのUIDをパラメータにして、Todo画面に遷移
        // パラメータについては、router.js参照
        this.$router.push({ name: 'todo', params: {id: user.user.uid }})
      })
      .catch(error => {
        alert(error.message)
      })
    }
  },
};
</script>

<style scoped>
.signin {
  text-align: center;
}
.signin-title {
  color: #fff;
}
.signin-text {
  color: #fff;
}
.signin-item label {
  color: #fff;
}
.signin-item input {
  width: 40%;
  min-width: 300px;
  border: none;
  padding: 0.5em;
  margin-bottom: 30px;
  margin-top: 5px;
}
.signin-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 0 auto;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.signin-btn:hover {
  background: #fff;
  color: #6DCB93;
}
.signin-link {
  color: #fff;
}
</style>