<template>
  <div>
    <div id="header">
      <Search v-on:query-change="queryChange" />
    </div>
    <div id="main-container">
      <h2>Todos</h2>
      <TodoAdd v-on:add-todo="addTodo"/>
      <Todos v-bind:todos="copyTodos" v-on:delete-todo="deleteTodo"  />
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Todos from './components/Todos'
import Search from './components/Search'
import TodoAdd from './components/TodoAdd'
//import axios from 'axios';

export default {
  name: 'App',
  components: {Todos, Search, TodoAdd},
  methods:{

    deleteTodo(id){
      this.todos = this.todos.filter(todo => todo.id != id);
      this.copyTodos = [...this.todos];
    },

    async addTodo(todo){
      // Azure Functions
      /*const data = await fetch('https://af-vue-todos.azurewebsites.net/api/insertTodo', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());

      if(data.result == 'success'){
        console.log('todo inserted');
      }
      */
      this.todos.push(todo);
      this.copyTodos = [...this.todos];
    },

    queryChange(query){

      if(query.trim() === ''){
        this.copyTodos = [...this.todos];
      }else{
        const temp = this.todos.filter(item =>{
          return item.title.includes(query);
        });
        this.copyTodos = [...temp];
      }
    }
  },
  data(){
   return {
     todos: [],
     copyTodos:[],
     info: null
   }
  },
  async created(){
    this.copyTodos = [...this.todos];
    
  },

 async mounted () {
    
   /*  const data = await fetch('https://af-vue-todos.azurewebsites.net/api/getTodos')
    .then(res => res.json());

    this.copyTodos = [...data];
     */
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    padding: 0;
    margin: 0;
  }

  #main-container{
    border: solid 1px #ccc;
    width: 600px;
    margin: 100px auto;
  }

  #header{
    background: black;
    padding: 10px;
  }

  h2{
    padding: 0 10px;
  }
</style>
