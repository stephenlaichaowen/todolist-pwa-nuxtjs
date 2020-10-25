<template>
  <div>
    <div class="image">
      <h1 class="todo-title">{{ today.day }} {{ today.date }}</h1>
      <span class="app-title">to-do list</span>
    </div>
    <section class="todo-wrapper">
      <form @keydown.enter.prevent="">
        <input
          type="text"
          class="input-todo"
          v-bind:class="{ active: new_todo }"
          placeholder="Take the garbage out"
          v-model="new_todo"
          v-on:keyup.enter="addItem"
        />
        <div
          class="btn btn-add"
          v-bind:class="{ active: new_todo }"
          @click="addItem"
        >
          +
        </div>
      </form>

      <div v-if="pending.length > 0">
        <p class="status busy">
          You have {{ pending.length }} pending item<span
            v-if="pending.length > 1"
            >s</span
          >
        </p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="(item, index) in pending" v-bind:key="item.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_' + item.id"
              v-model="item.done"
              type="checkbox"
            />
            <label class="checkbox" v-bind:for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <transition name="slide-fade">
        <p class="status free" v-if="!pending.length">
          <img
            src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg"
            alt="celebration"
          />Time to chill! You have no todos.
        </p>
      </transition>

      <div v-if="completed.length > 0 && showComplete">
        <p class="status">Completed tasks: {{ completedPercentage }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in completed" v-bind:key="item.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_' + item.id"
              v-model="item.done"
              type="checkbox"
            />
            <label v-bind:for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>
      <div class="control-buttons">
        <div
          class="btn btn-secondary"
          v-if="completed.length > 0"
          @click="toggleShowComplete"
        >
          <span v-if="!showComplete">Show</span
          ><span v-else>Hide</span> Complete
        </div>
        <div
          class="btn btn-secondary"
          v-if="todoList.length > 0"
          @click="clearAll"
        >
          Clear All
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoList: [
        { id: 0, title: 'Go to codepen and get inspired', done: false },
        { id: 1, title: 'Pick a project', done: false },
        { id: 4, title: 'Create a new pen', done: true }
      ],
      new_todo: '',
      showComplete: false
    }
  },
  computed: {},
  mounted() {
    this.getTodos()
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList))
      },
      deep: true
    }
  },
  computed: {
    pending: function() {
      return this.todoList.filter(function(item) {
        return !item.done
      })
    },
    completed: function() {
      return this.todoList.filter(function(item) {
        return item.done
      })
    },
    completedPercentage: function() {
      return (
        Math.floor((this.completed.length / this.todoList.length) * 100) + '%'
      )
    },
    today: function() {
      var weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 //January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = {
        day: weekday[today.getDay()],
        date: mm + '-' + dd + '-' + yyyy
      }

      return today
    }
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list'))
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: this.new_todo,
          done: false
        })
      }
      // reset new_todo
      this.new_todo = ''
      // save the new item in localstorage
      return true
    },
    deleteItem(item) {
      this.todoList.splice(this.todoList.indexOf(item), 1)
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete
    },
    clearAll() {
      this.todoList = []
    }
  }
}
</script>

<style scoped>
.image {
  position: relative;
  height: 7.5rem;
  background-color: var(--theme-color);
}

.image h1 {
  position: absolute;
  top: 0;
  left: 0;
}

.app-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.625rem;
  color: white;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translateX(-50%);
  text-transform: uppercase;
}

.todo-wrapper {
  /* height: 100vh; */
  border-radius: 0.25rem;
  /* padding: 2.5rem 1.25rem; */
  padding: 1.5rem 1.25rem 2.5rem;
  -webkit-box-shadow: 0 0 0.9375rem 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0.9375rem 0 rgba(0, 0, 0, 0.05);
  background-color: #f4f7fc;
  overflow: hidden;
  position: relative;
}

.todo-title {
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.8);
  /* color: #f65c65; */
  font-weight: normal;
  margin-left: 1rem;
}

form {
  overflow: overlay;
}

form label {
  display: block;
  text-align: center;
  font-size: 1.2em;
}

.btn,
input {
  line-height: 2em;
  border-radius: 0.1875rem;
  border: 0;
  display: inline-block;
  margin: 0.9375rem 0;
  padding: 0.2em 1em;
  font-size: 1em;
}

input[type='text'] {
  border: 0.0625rem solid #ddd;
  min-width: 80%;
  transition: all ease-in 0.25s;
}

input:focus {
  outline: none;
  border: 0.0625rem solid #a3b1ff;
}

input::placeholder {
  color: rgba(0, 0, 0, 0.3);
  font-style: italic;
}

.btn {
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  border-width: 0.0625rem;
  border-style: solid;
}

.btn-add {
  background: var(--theme-color);
  /* background: #ddd; */
  color: #fefefe;
  border-color: #ddd;
  min-width: 17%;
  pointer-events: none;
  transition: all ease-in 0.25s;
  font-size: 2.2em;
  line-height: 0.5em;
  padding: 0.3em 0.3em;
  float: right;
}

.btn-add.active {
  /* background: #6664ff;
  border-color: #6664ff; */
  /* background: white; */
  pointer-events: visible;
}

.btn-add.active:hover {
  background: #4442f6;
  border-color: #4442f6;
}

.btn-add:active {
  transform: scale(0.95);
}
.control-buttons {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
}
.btn-secondary {
  display: inline-block;
  position: relative;
  border: 0;
  padding: 0;
  margin: 0 0.625rem;
}

.btn-secondary:after {
  position: absolute;
  content: '';
  width: 0;
  height: 0.1875rem;
  background-color: #f4586e;
  bottom: 0rem;
  left: 0;
  transition: all ease-in 0.25s;
}

.btn-secondary:hover:after {
  width: 100%;
}

ul.todo-list {
  padding: 0;
  margin-bottom: 1.875rem;
}

ul.todo-list li {
  position: relative;
  list-style-type: none;
  display: block;
  margin: 0.625rem 0;
  background: #e0e8f5;
  border-radius: 0.1875rem;
  padding-left: 2.375rem; /* custom checkbox width + 16 */
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-right: 3.0625rem; /* delete button + 5 */
  overflow: hidden;
}

ul.todo-list.archived li {
  background: #fff;
}

.todo-text {
  position: relative;
  display: inline-block;
  padding: 0 0.5em;
  color: black;
  /* color: var(--theme-color); */
}

ul.todo-list li .delete {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0;
  width: 0;
  background-color: #f56468;
  color: #fff;
  transition: all ease-in 0.25s;
}

ul.todo-list li .delete:after {
  position: absolute;
  content: '';
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 50%;
  background-image: url('https://nourabusoud.github.io/vue-todo-list/images/trash.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translate(-50%, -50%) scale(0.5);
  transition: all ease-in 0.25s;
}

ul.todo-list li:hover .delete {
  width: 2.75rem;
  opacity: 1;
}

ul.todo-list li:hover .delete:after {
  transform: translate(-50%, -50%) scale(1);
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  display: none;
}

.todo-checkbox + label {
  position: absolute;
  cursor: pointer;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 0.125rem;  
  border: 2px solid #1177fa;
  background-color: #fff;
}

.todo-checkbox:checked + label:after {
  position: absolute;
  content: '';
  top: 30%;
  left: 50%;
  height: 0.1875rem;
  width: 0.375rem;
  border: solid #fc6c48;
  border-width: 0 0 0.125rem 0.125rem;
  transform-origin: center center;
  transform: rotate(-45deg) translate(-50%, -50%);
}

.todo-checkbox:checked + label:after {
  display: block;
}

.todo-checkbox:checked ~ .todo-text {
  color: #888;
  text-decoration: line-through;
}

.status.free {
  font-weight: bold;
  text-align: center;
  margin: 2.5rem 0;
}
.status.free img {
  display: block;
  width: 3.125rem;
  margin: 0.625rem auto;
  vertical-align: middle;
}

.todo-item-enter-active,
.todo-item-leave-active {
  transition: opacity ease 0.25s, transform ease-in-out 0.3s;
  transform-origin: left center;
}

/* .todo-item-leave-active below version 2.1.8 */
.todo-item-enter,
.todo-item-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
/* .slide-fade-leave-active below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

/* Footer */
footer {
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  bottom: 1.25rem;
  left: 0;
}

footer a {
  color: #fff;
}
</style>