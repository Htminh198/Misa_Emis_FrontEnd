<template>

  <button
    
    :style="buttonStyle"
    :class="[text === '' ? 'noText' : 'btn',iconStyle===null?'':'hasIcon']"
    @click="onClick"
    :type='type'
  >
    <div class="btn-icon" v-if="iconStyle!==null" :style="iconStyle"></div>
    {{ text }}
  </button>
  
</template>
<script>
export default {
  name: "ms-button",
  props: {
    type: {
      type: String,
      default:'',
     },
    text: {
      type: String,
      default: "",
    },
    iconStyle: {
      type: Object,
      default: null,
    },
    buttonStyle: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>
<style scoped></style>
