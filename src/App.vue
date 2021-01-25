<template>
  <div class="bigDiv">
    <div class="appName">
      <h1>asdf to-do</h1>
    </div>
    <hr>
    <md-field>
      <md-input
        v-model="currentTodo"
        @keydown.enter="addTodo()"
        placeholder="add to-do | double click edit | drag rearrange"
        class="addATodo"
      >
      </md-input>
    </md-field>
    <draggable
      class="dragContainer"
      v-model="todos"
      @start="drag = true"
      @end="drag = false"
    >
        <md-card
          md-with-hover
          v-for="todo in todos"
          :key="todo.id"
          :class="{
              todo: true,
              editing: editedTodo === todo,
              completed: todo.completed

            }"
        >
          <md-card-content>
            <div class="regular">
              <md-checkbox
                class="check"
                v-model="todo.completed"
              />
              <span class="todoListItem" @dblclick="editTodo(todo)">
                {{ todo.label }}
              </span>
              <md-button class="remove" @click="removeTodo(todo)" >DELETE</md-button>
            </div>
            <input
              type="text"
              class="edit"
              v-model="todo.label"
              @blur="cancelEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              @keyup.enter="doneEdit(todo)"
            />
          </md-card-content>
        </md-card>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
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
    },
  },
};
</script>

<style>
  body{
    background-image: linear-gradient(white, rgba(216, 229, 255, 0.300), white);
  }
  .appName{
    text-align: center;
  }
  hr{
    border-top: 1px solid;
    width: 100%;
  }
  .edit {
    display: none;
  }
  .editing .edit {
    display: block;
    margin-left: 20px
  }
  .editing .regular{
    display: none;
  }
  .bigDiv{
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    border: 1px solid;
    text-align: left;
    background-image: linear-gradient(white, rgb(255, 252, 237));
  }
  .dragContainer{
    display: flex;
    flex-direction: column;
  }
  .check{
    border: 1px solid;
    transform: scale(0.75);
  }
  .completed .check{
    background-color: black;
  }
  .addATodo{
    text-align: center;
  }
  .remove{
    transform: scale(0.5);
  }
  .completed {
    text-decoration: line-through;
  } 
  .remove{
    float: right;
  }
</style>