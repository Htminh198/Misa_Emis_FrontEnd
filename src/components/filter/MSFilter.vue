<template>
  <div class="filter">
    <div class="filter-title">
      <div class="title">Bộ lọc</div>
      <div class="icon-cancel" @click="onHandleClick"></div>
    </div>

    <ms-input
      class="search"
      :prefix="require('../../assets/icons/search.png')"
      placeholder="Tìm kiếm"
      style="margin-left: 10px;"
      :onChange="
        (e) => {
         searchParam=e;
        }
      "
    ></ms-input>

    <div class="filter-content">
      <ms-filter-item
        v-for="item in data"
        :item="item"
        :key="item.id"     
         v-show="
          item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          removeAccents(item.name.toLowerCase()).includes(
            searchParam.toLowerCase()
          )
        "
        :payload.sync="payload"
      ></ms-filter-item>
    </div>
    <div class="event">
      <ms-button
        class="ms-button-secondary"
        text="Bỏ lọc"
        :buttonStyle="{
          marginLeft: '20px',
          marginRight: '20px',
        }"
        @onClick="onHandleClick"
      ></ms-button>
     
      <ms-button class="ms-button-primary" @onClick="onSubmit" text="Áp dụng"></ms-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ms-filter",
  props: {
    isFilter: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: null,
    },
     payload: {
      type: Object,
      default: null,
    },

  },
  data() {
    return { searchParam: "" };
  },
  methods: {
    onHandleClick() {
      this.$emit("update:isFilter", false);
    },
    onSubmit(){
 this.payload
       this.$emit("onSubmit", this.payload);
    }
    ,
     removeAccents(str) {
      var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
      ];
      for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
      }
      return str;
    },
  },
};
</script>

<style scoped></style>
