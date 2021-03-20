<template>
  <div
    class="filter-item "
    style="margin:0 10px 10px 10px"
    :class="{ active: selected }"
  >
    <DxCheckBox
      :text="item.name"
      :value.sync="selected"
      :onValueChanged="onChange"
    ></DxCheckBox>
    <div class="filter-box" v-if="selected">
      <div style="margin:10px ">
        <DxSelectBox
          :items="type"
          v-model="typeValue"
          placeholder=""
          :onValueChanged="onChange"
        />
      </div>
    
      <div style="margin:10px ">
        <DxTextBox
          :show-clear-button="true"
          :value.sync="params"
          v-if="checkType()"
          :onValueChanged="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ms-filter-item",
  props: {
    item: {
      type: Object,
      default: null,
    },
    payload: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      type: ["Bằng", "Khác", "Trống", "Không trống"],
      typeValue: "",
      selected: false,
      params: "",
      test: {},
    };
  },
  methods: {
    checkType() {
      if (this.typeValue === "") return false;
      if (this.typeValue === "Trống") return false;
      if (this.typeValue === "Không trống") return false;
      return true;
    },

    onChange() {
      this.payload[this.item.class] = {
        isFilter: this.selected,
        type: this.typeValue,
        params: this.params,
      };
   this.$emit("update:payload", this.payload);
    },
  },
};
</script>

<style></style>
