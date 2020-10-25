<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    const root = document.querySelector('html')
    const deviceWidth = root.clientWidth

    root.style.fontSize = (deviceWidth / 360) * 16 + 'px'

    window.addEventListener('resize', () => {
      const root = document.querySelector('html')
      const deviceWidth = root.clientWidth
      root.style.fontSize = (deviceWidth / 360) * 16 + 'px'
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

:root {
  --theme-color: #1177da;
}

*{
  box-sizing: border-box;
}

body{
  font-family: 'Open Sans', sans-serif;
  color: #444;
  background-color: #fefefe;
  /* background-image: linear-gradient(#fc6c48 0%, #ef5081 100%); */
  background-color: #f4f7fc;
  /* background-repeat: no-repeat;
  background-size: cover; */
  margin: 0;
  min-height: 100vh;
  position: relative;
}
</style>
