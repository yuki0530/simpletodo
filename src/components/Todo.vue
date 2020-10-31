<template>
    <div class="todo">
      <h1 class="todo-title">SimpleTodo</h1>
      <h2 class="todo-text">{{ useremail }}さんのやることリスト</h2>
      <!-- 入力エリア -->
      <Form />
      <!-- タスクエリア -->
      <!-- プロパティの受け渡し -->
      <Tasks :tasks="tasks" />
      <div class="todo-btn" @click="signOut">
        サインアウト
      </div>
    </div>
</template>

<script>
import Tasks from "@/components/Tasks"
import Form from "@/components/Form"
import firebase from "@/firebase.js"
import { db } from "@/firebase.js"

export default {
  name: 'todo',
  data() {
    return {
      tasks: [],
      useremail: firebase.auth().currentUser.email
    }
  },
  components: {
    Tasks,
    Form,
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    // リロードしたら警告
    handler (event) {
      event.returnValue = "Data you've inputted won't be synced"
    }
  },
  mounted() {
    // $routeでクエリパラメータの取得
    const userId = this.$route.params.id
    // usersコレクションのユーザーごとのtasksコレクションを取得
    // onSnapshotでデータの更新を監視
    db.collection('users').doc(userId).collection('tasks').orderBy('createdAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc
        // 変更されたレコードの配列上のインデックス番号を特定する
        // 配列のfindIndexで、tasks配列のうち task.id プロパティがchange.doc.idと同じもののIndex番号を取得
        const index = this.tasks.findIndex(task => task.id === change.doc.id)
        // タスクが追加された時、tasks配列に追加
        if (change.type === 'added') {
          this.tasks.push({id: doc.id, ...doc.data()})
        }
        // タスクが削除された時、tasks配列を削除
        if (change.type === "removed") {
          this.tasks.splice(index, 1)
        }
      })
    })
  },
  // リロードしたら警告
  created () {
    window.addEventListener("beforeunload", this.handler)
  },
  // リロードしたら警告
  destroyed () {
    window.removeEventListener("beforeunload", this.handler)
  }
}
</script>

<style scoped>
.todo {
  text-align: center;
}
.todo-title {
  color: #fff;
}
.todo-text {
  color: #fff;
}
.todo-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 50px auto 50px;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.todo-btn:hover {
  background: #fff;
  color: #6DCB93;
}
/* ウィンドウ幅が最大479pxまでの場合（スマホの場合）に適用 */
@media screen and (max-width: 479px) {
  .todo-btn {
    width: 200px;
  }
}
</style>