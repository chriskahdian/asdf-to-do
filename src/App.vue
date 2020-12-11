<template>
  <div>
    <input
      v-model="currentTodo"
      @keydown.enter="addTodo()"
      placeholder="Add a todo"
    />
    <ul class="todos">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{
          todo: true,
          editing: editedTodo === todo,
          completed: todo.completed
        }"
        @dblclick="editTodo(todo)"
      >
        <input
          class="check"
          type="checkbox"
          v-model="todo.completed"
        />
        {{ todo.label }}
        <button @click="removeTodo(todo)">x</button>
          <input
            class="edit"
            v-model="todo.label"
            @blur="cancelEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            @keyup.enter="doneEdit(todo)"
          />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      currentTodo: "",
      completed: "",
      editedTodo: null,
      originalEditedTodoValue: '',
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        label: this.currentTodo,
        completed: false,
      });
      this.currentTodo = "";
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      this.editedTodo = todo;
      this.originalEditedTodoValue = todo.label
    },
    doneEdit(todo) {
      this.editedTodo = null;
      if (!todo.label) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.label = this.originalEditedTodoValue;
    }
  },
};
</script>

<style>
  .edit {
    display: none;
  }
  li.editing .view {
    display: none;
  }
  li.editing .edit {
    display: block;
  }
</style>
