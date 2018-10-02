var app = new Vue({
  el:'#app',
  data: {
    seen: true,
    todos: [
      { text: 'Learn Javascript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome'}
    ],
    message:'fiorella'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }

});

app.todos.push({text:'holi'})
