<template>
  <div class="menu">
    <template v-for="(item, index) in menuData">
      <router-link
        :to="'/' + item.class"
        :key="index"
        v-if="typeof item.dropdownList == 'undefined'"
      >
        <div
          class="menu-item"
          :class="{ active: itemActive === item.id }"
          @click="
            () => {
              itemActive = item.id;
            }
          "
        >
          {{ item.name }}
        </div>
      </router-link>
      <ms-dropdown
        :key="index"
        v-if="typeof item.dropdownList != 'undefined'"
        :data="item"
        :active="itemActive === item.id"
        :onHandleClick="onHandleClick"
        :onShowDropdown="onShowDropdown"
        :showDropdown="itemDrop === item.id"
      >
      </ms-dropdown>
    </template>
  </div>
</template>

<script>
import menuData from "../../assets/json/menu.json";

export default {
  name: "ms-menu",

  data() {
    return {
      menuData: menuData,
      itemActive: 1,
      itemDrop: 0,
    };
  },
  methods: {
    onHandleClick(e) {
      this.itemActive = e;
      this.itemDrop = 0;
    },
    onShowDropdown(e) {
      this.itemDrop = this.itemDrop === e ? 0 : e;
    },
  },
};
</script>

<style></style>
