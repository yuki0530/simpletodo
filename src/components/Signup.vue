<template>
  <div class="signup">
    <h1 class="signup-title">SimpleTodoへようこそ！</h1>
    <p class="signup-text">アカウントを登録してSimpleTodoを利用しよう！</p>
    <div class="signup-item">
      <label for="mail">メールアドレス</label>
      <br>
      <input type="text" id="mail" v-model="username">
    </div>
    <div class="signup-item">
      <label for="pass">パスワード（6文字以上）</label>
      <br>
      <input type="password" id="pass" v-model="password">
    </div>
    <div class="signup-btn" @click="signUp">
      登録
    </div>
    <p>
      <router-link class="signup-link" to="/signin">サインインはこちらから</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import { db } from "@/firebase.js";

export default {
  name: "signup",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
      .then(user => {
        // FirestoreのドキュメントにユーザーUID、emailフィールドにアドレスをセットする
        db.collection('users').doc(user.user.uid).set({
          email: this.username
        })
        // サインイン画面に遷移
        this.$router.push('/signin')
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
};
</script>

<style scoped>
.signup {
  text-align: center;
}
.signup-title {
  color: #fff;
}
.signup-text {
  color: #fff;
}
.signup-item label {
  color: #fff;
}
.signup-item input {
  width: 40%;
  min-width: 300px;
  border: none;
  padding: 0.5em;
  margin-bottom: 30px;
  margin-top: 5px;
}
.signup-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 0 auto;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.signup-btn:hover {
  background: #fff;
  color: #6DCB93;
}
.signup-link {
  color: #fff;
}
</style>