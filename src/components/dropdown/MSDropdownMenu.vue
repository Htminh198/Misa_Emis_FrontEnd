<template>
  <div class=" dropdown-menu  ">
    <ul :class="{ show: showDropdown }">
      <router-link
        :to="url + '/' + item.class"
        v-for="(item,index) in listData"
        :key="index"
      >
        <li
          @click="onClick(item)"
          :class="{
            active: active && dropdownItemActive === item.id
          }"
        >
          <div class="text">{{ item.name }}</div>
          <div class="icon-check"></div></li
      ></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ms-dropdown-menu",
  props: {
    listData: {
      type: [Array,Object],
      default: null
    },
    url: {
      type: String,
      default: ""
    },
    showDropdown: {
      type: Boolean,
      default: false
    },
    onHandleClick: {
      type: Function,
      default: () => {}
    },

    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownItemActive: 0
    };
  },
  methods: {
    onClick(e) {
      this.onHandleClick();
      this.dropdownItemActive = e.id;
    }
  }
};
</script>

<style></style>
