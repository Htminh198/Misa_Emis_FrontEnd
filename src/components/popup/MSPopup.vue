<template>
  <div class="confirm-popup">
    <DxPopup
      :visible="popupVisible"
      :drag-enabled="false"
      :show-title="true"
      :width="415"
      :height="190"
      :title="title"
    
    >
      <div class="popup-text">
        {{ text }}
      </div>
      <div class="popup-event">
      <slot></slot>
      </div>
    </DxPopup>
  </div>
</template>

<script>
export default {
  name: "ms-popup",
  props: {
    popupVisible: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
  
  },
};
</script>

<style></style>
