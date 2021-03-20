<template>
  <div class="header">
    <div class="app-info" id="app-info">
      <div class="toggle"></div>
      <div class="logo-img"></div>
      <div class="logo-text">Chấm công</div>
    </div>
    
    <ms-menu class="header__menu"></ms-menu>
    <div class="header__right">
      <div class="version">Beta 2.34</div>
      <div class="notification"></div>
      <div class="avatar"></div>
    </div>
  </div>
</template>

<script>


export default {

  name: "Header",
  data() {
    return {

      itemActive: 1
    };
  }
};
</script>

<style></style>
