<template>
  <div class="todo-container">
    <div class="task-container">
      <input type="checkbox" v-model="task.isDone">
      <div v-bind:class="{done: task.isDone}">{{ task.text }}</div>
    </div>
    <div class="task-btn-container">
      <!-- task.idはfirebaseに登録されているドキュメントIDのこと -->
      <div class="task-btn" @click="delTask(task.id)">
        Delete
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import { db } from "@/firebase.js"

export default {
  // プロパティの受け取り（Tasks.vueからTask.vueへ）
  props: ['task'],
  methods: {
    // task.idを引数に取る
    delTask: function(id) {
      const userId = this.$route.params.id
      // ここにタスクコレクション内の消したいドキュメント（task.id）を指定
      const taskId = db.collection('users').doc(userId).collection('tasks').doc(id)
      // 上記で指定したドキュメントを削除
      taskId.delete().then(function() {})
    }
  }
}
</script>

<style scoped>
.todo-container {
  display: flex;
  padding: 8px;
  justify-content: space-between;
}

.task-container {
  word-wrap: break-word;
  width: 80%;
  text-align: left;
  display: flex;
}

.done{
	text-decoration: line-through;
	color: gray;
}

.task-btn-container {
  width: 20%;
}

.task-btn {
  cursor: pointer;
  width: 80px;
  border: 2px solid #fff;
  margin: 0 auto;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}

.task-btn:hover {
  background: #fff;
  color: #6DCB93;
}

/* ウィンドウ幅が最大479pxまでの場合（スマホの場合）に適用 */
@media screen and (max-width: 479px) {
  .todo-container {
    display: block;
  }
  .task-container {
    width: 100%;
    margin: 0 auto;
  }
  .task-btn-container {
    width: 100%;
  }
  .task-btn {
    width: 200px;
    margin-top: 20px;
  }
}
</style>