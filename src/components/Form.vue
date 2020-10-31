<template>
  <div class="input-container">
    <p class="form-text">タスクを追加！</p>
    <textarea v-model="text"></textarea>
    <div class="form-btn" @click="addTask">
      Add
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js"
import { db } from "@/firebase.js"

export default {
  data() {
    return {
      text: null
    }
  },
  methods: {
    addTask() {
      // $routeでクエリパラメータの取得
      const userId = this.$route.params.id
      // userコレクションの各ユーザーのtasksコレクションにタスクを登録
      db.collection('users').doc(userId).collection('tasks').add({
        // タスクと登録日付と完了状態
        text: this.text,
        createdAt: new Date().getTime(),
        isDone: false
      }).then(() => {
        // 登録成功したら空欄に
        this.text = null
      })
    },
  }
}
</script>

<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
  text-align: center;
}
.form-text {
  color: #fff;
}
textarea {
  width: 50%;
  height: 100%;
  border: none;
}
.form-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 20px auto 10px;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.form-btn:hover {
  background: #fff;
  color: #6DCB93;
}

/* ウィンドウ幅が最大479pxまでの場合（スマホの場合）に適用 */
@media screen and (max-width: 479px) {
  textarea {
    width: 100%;
  }
  .form-btn {
    width: 200px;
  }
}
</style>