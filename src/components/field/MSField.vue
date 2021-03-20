<template>
  <div class="dx-field">
    <div class="dx-field-label">
      {{ label }} <span v-if="required" style="color:red">*</span>
    </div>
    <div class="dx-field-value" :class="[messageErr===''?'':'error']">
      <slot></slot>
      <div
        class="validate-icon"
        :id="targetID"
        v-if="targetID !==''"
        v-show="messageErr!==''"
        @mouseenter="toggleDefault"
        @mouseleave="toggleDefault"
      >
   
      </div> 
      <DxTooltip
        :visible="visible"
        :close-on-outside-click="false"
        :position="'top'"
        :target="'#'.concat(targetID)"
      >
  <div class="messageErr"> {{messageErr}}</div> 
      </DxTooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "ms-field",
  props: {
    label: {
      type: String,
      default: "",
    },
    targetID: {
      type: String,
      default: "",
    },
    test: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    messageErr:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      
    };
  },
  methods: {
    toggleDefault() {
      this.visible = !this.visible;
    },
  },
  computed: {
    //   target:()=>{
    //       var value=`#`+'proposer'
    //    alert(this.targetID)
    //       return value
    //   }
  },
};
</script>

<style></style>
