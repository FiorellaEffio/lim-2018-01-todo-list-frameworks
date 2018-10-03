<template>
  <div>
    <input type="text" class="todo-input" placeholder="¿Qué necesitas hacer?"
    v-model="newTodo" @keyup.enter="addTodo">
    <todo-item v-for="(todo,index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining" @removedTodo="removeTodo" @finishedEdit="finishedEdit">
    </todo-item>
    <!-- Container for completed, not completed and all the todos -->
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Marcar todos
        </label>
      </div>
      <div>
        {{ remaining }} tareas pendientes
      </div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}" @click="filter = 'all'">Todos</button>
        <button :class="{ active: filter == 'active'}" @click="filter = 'active'">Activos</button>
        <button :class="{ active: filter == 'completed'}" @click="filter = 'completed'">Completados</button>
      </div>
      <div>
        <button v-if="showClearCompletedButton" @click="clearCompleted">Eliminar Completados</button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'Terminar proyecto',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Comprar arroz',
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Arreglar el foco del baño',
          'completed': false,
          'editing': false,
        }
      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if( this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter =='completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo() {
      if(this.newTodo.trim().length === 0) {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing:false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo) {
      if(todo.title.trim() === '') {
        todo.title = this.beforeEditCache
        return
      }
      todo.editing = false
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    checkAllTodos() {
      this.todos.forEach((todo) => {
        todo.completed = event.target.checked
      })
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style language="scss">
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width:100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

</style>
