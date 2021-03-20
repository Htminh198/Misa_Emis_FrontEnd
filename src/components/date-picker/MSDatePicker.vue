<template>
  <date-picker
    :value="datetime"
    :clearable="false"
    :show-time-header="true"
    :type="type"
    :default="null"
    valueType="YYYY-MM-DDTHH:mm:ss"
    format="DD/MM/YYYY HH:mm"
    :show-time-panel="showTimePanel"
    placeholder="DD/MM/YYYY HH:mm"
    id="date-of-application"
    @input="updateDatetime"
    :lang="lang"
  >
    <template #icon-calendar>
      <div class="icon-calendar"></div>
    </template>
    <template #footer>
      <button @click="selectTime = !selectTime" class="mx-btn">
        <span v-if="selectTime">Chọn ngày</span>
        <span v-else>Chọn giờ</span>
      </button>
    </template>
  </date-picker>
</template>

<script>
import "vue2-datepicker/locale/vi";
export default {
  name: "ms-date-picker",
  props: {
    datetime: { type: String, default: null },
  },
  computed: {
    type() {
      return this.selectTime ? "time" : "datetime";
    },
  },
  data() {
    return {
      selectTime: false,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: true,
      },
    };
  },
  methods: {
    updateDatetime(e) {
      this.$emit("update:datetime", e);
    },
  },
};
</script>

<style></style>
