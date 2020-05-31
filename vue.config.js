// vue.config.js
module.exports = {
    // options...
    devServer: {
          proxy: 'https://af-vue-todos.azurewebsites.net/api/getTodos',
      }
  }