<template>
    <div class="todo" v-bind:class="{completed: todo.completed}">
        <div class="todo-body">
            <input type="checkbox" v-on:change="checkTodo" v-bind:checked="todo.completed? 'checked':''" /> {{todo.title}}
        </div>
        <div class="todo-actions">
            <button @click="$emit('delete-todo', todo.id)">Eliminar</button>
        </div>       
    </div>
</template>

<script>
const UPDATE_URL = 'https://af-vue-todos.azurewebsites.net/api/updateTodo';
export default {
    name: 'TodoItem',
    props: ['todo'],
    methods: {
        async checkTodo(){
            this.todo.completed = !this.todo.completed
            // Azure Functions
            const data = await fetch(UPDATE_URL, {
                method: 'POST',
                body: JSON.stringify(this.todo),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json());

            if(data.result == 'success'){
                console.log('todo updated');
            }
        }
    }
}
</script>

<style scoped>
    .todo{
        border-bottom: solid 1px #ccc;
        padding: 10px;
    }

    .todo:not(.completed):hover{
        background-color: #eee;
    }

    .completed{
        color: #ccc;
        text-decoration: line-through;
    }
    .completed .todo-body{
        text-decoration: line-through;
    }

    .todo-body, .todo-actions{
        display: inline-block;
        vertical-align: top;
    }

    .todo-body{
        width: 85%;
    }
    .todo-actions{
        padding: 0 10px;
        width: 10%;
    }

    button{
        border: none;
        border-radius: 3px;
        padding: 10px;
        background-color: #ccc;
        color: black;
    }
    button:hover{
        background-color: #da2020;
        color: white;
    }
</style>