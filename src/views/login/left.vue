<template>
  <div class="app-container">
    <img src="/static/img/login.jpg" alt="" >
  </div>
</template>

<script>
export default {
  name: 'Left'
}
</script>

<style scoped>
img{
    width:100%;
    height: 30%;
}
.app-container {
  left: 0px;
  top: 0px;
  padding: 0;
  width: 480px;
  height: 900px;
  background: linear-gradient(
    135deg,
    rgba(57, 90, 255, 0) 0%,
    rgba(15, 47, 209, 1) 100%
  );
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
</style>
