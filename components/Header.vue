<template>
  <div class="image">
    <h1 class="todo-title">{{ today.day }} {{ today.date }}</h1>
    <span class="app-title">to-do list</span>
  </div>
</template>

<script>
export default {
  methods: {
    today() {
      let weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1 //January is 0!
      let yyyy = today.getFullYear()

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
  }
}
</script>