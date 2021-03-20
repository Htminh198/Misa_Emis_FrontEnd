<template>
  <div id="root">
   
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>

</script>

<style >
@import "./assets/styles/root.css";
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
}

#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  @import "./themes/generated/variables.base.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
