<template>
  <div class="dropdown">
    <span>
      <button
        class="menu-item btn-normal"
        :class="[data.class, active ? 'active' : '']"
        @click="onShowDropdown(data.id)"
      >
        {{ data.name }}<i class="icon"></i></button
    ></span>

    <ms-dropdown-menu
      :showDropdown.sync="showDropdown"
      :listData="data.dropdownList"
      :url="'/' + data.class"
      :onHandleClick="() => onHandleClick(data.id)"
      :active="active"
    ></ms-dropdown-menu>
  </div>
</template>

<script>
export default {
  name: "ms-dropdown",
  props: {
    data: {
      type: Object,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    onHandleClick: {
      type: Function,
      default: () => {}
    },
    onShowDropdown: {
      type: Function,
      default: () => {}
    },
    showDropdown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownItemActive: 1
    };
  }
};
</script>

<style scoped></style>
