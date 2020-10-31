<template>
  <div class="todos-container">
    <!-- v-forを使ってプロパティの受け渡し -->
    <Task v-for="task in tasks" :task="task" :key="task.id" />
  </div>
</template>

<script>
import Task from "@/components/Task"

export default {
  // プロパティの受け取り（Todo.vueからTasks.vueへ）
  props: ['tasks'],
  components: {
    Task,
  }
}
</script>

<style scoped>
.todos-container {
  padding: 16px;
  margin: 0 50px;
}
/* ウィンドウ幅が最大479pxまでの場合（スマホの場合）に適用 */
@media screen and (max-width: 479px) {
  .todos-container {
    margin: 0;
  }
}
</style>