<template>
  <div class="h-full w-full container">
    <div class="w-full content-header" v-if="deleteMode">
      <div class="selected">
        Đã chọn <b>{{ itemsSelected.length }}</b>
      </div>
      <div
        class="unselected"
        @click="
          () => {
            deleteMode = false;
          }
        "
      >
        Bỏ chọn
      </div>
      <ms-button
        class="ms-button-danger"
        :iconStyle="{
          width: '20px',
          height: '20px',
          maskPosition: '-170px -26px',
          backgroundColor: 'var( --primary)',
        }"
        :buttonStyle="{
          marginRight: '5px',
          marginLeft: '-15px',
        }"
        text="Xóa"
        @onClick="onMutilDelete"
      ></ms-button>
    </div>
    <div class="w-full content-header" v-if="!deleteMode">
      <div class="content-header-title">Quản lý công tác</div>
      <div class="content-header-selectbox">
        Trạng thái:
        <div class="center-text">
          <DxSelectBox
            :items="status"
            v-model="payload.status"
            placeholder=""
            display-expr="name"
            value-expr="id"
            :onValueChanged="onChangeStatusFilter"
          />
        </div>
      </div>
      <div class="content-header-right">
        <ms-input
          class="search"
          :prefix="require('../../../assets/icons/search.png')"
          placeholder="Tìm kiếm"
          :value="payload.filter"
          @onChange="onChaneSearchValue"
          :styles="{ width: '240px' }"
          :style="{ width: '240px' }"
        ></ms-input>
        <ms-button
          class="ms-button-primary"
          :iconStyle="{
            width: '16px',
            height: '16px',
            maskPosition: '-292px -76px',
          }"
          :buttonStyle="{
            marginRight: '5px',
            marginLeft: '-15px',
            marginTop: ' 4px',
          }"
          text="Thêm"
          @onClick="onCreate"
        ></ms-button>
        <ms-button
          class="ms-button-secondary"
          :iconStyle="{
            width: '16px',
            height: '18px',
            maskPosition: '-244px -51px',
          }"
          :buttonStyle="{
            marginTop: ' 4px',
          }"
          @onClick="onOpenFilter"
        ></ms-button>
      </div>
    </div>
    <div class=" w-full content-main">
      <ms-grid
        id="applicationId"
        :tbody="listApplication.data.data"
        :data.sync="data"
        :totalElements="listApplication.data.totalEleMent"
        :pageNumber="pageNumber"
        :class="[isFilter ? 'w-filter' : 'w-full']"
        :deleteMode="deleteMode"
        @onSelectionChanged="onSelectionRows"
        @onEdit="onEdit"
        @onDelete="onDelete"
        @onChangePageSize="onChangePageSize"
        @onChangePageNumber="onChangePageNumber"
      ></ms-grid>
      <ms-filter
        v-if="isFilter"
        :isFilter.sync="isFilter"
        :data="data.menu"
        @onSubmit="onFilter"
        :payload="payload"
      ></ms-filter>
    </div>
    <div v-if="popupVisible">
      <DxPopup
        class="details"
        :width="900"
        :height="622"
        :visible="popupVisible"
        :v-if="popupVisible"
        :show-title="false"
        :close-on-outside-click="false"
        ><MissionAllowanceDetail
          :applicationID="isAdd ? 0 : applicationID"
          :onClosePopup="onClosePopup"
      /></DxPopup>
    </div>
    <ms-popup :text="message" title="Thông báo" :popupVisible="deletePopup">
      <ms-button
        class="ms-button-secondary"
        @onClick="
          () => {
            deletePopup = false;
          }
        "
        text="Hủy"
      >
      </ms-button>

      <ms-button
        @onClick="onConfirmDelete"
        class="ms-button-primary-danger"
        :buttonStyle="{ margin: '0 8px' }"
        text="Xóa"
      >
      </ms-button>
    </ms-popup>
  </div>
</template>

<script>
import status from "@/assets/json/status.json";
import notify from "devextreme/ui/notify";
import data from "@/assets/json/mission-allowance.json";
import applicationApi from "@/api/components/Application/ApplicationAPI.js";
import MissionAllowanceDetail from "@/views/management-request/mission-allowance/MissionAllowanceDetail";
export default {
  name: "mission-allowance-view",
  data() {
    return {

     
      isFilter: false,
      data: data,
      status: JSON.parse(JSON.stringify(status.status)),
      statusValue: 0,
      popupVisible: false,
      deleteMode: false,
      itemsSelected: [],
      applicationID: 0,
      pageNumber: 1,
      isAdd: true,
      message: "",
      deletePopup: false,
      listApplication: [],
      payload: {
        pageSize: 25,
        offset: 0,
        status: 0,
        filter: "",
        proposerName: {
          isFilter: false,
          type: "",
          params: "",
        },
        censorName: {
          isFilter: false,
          type: "",
          params: "",
        },
      },
    };
  },
  components: { MissionAllowanceDetail },
  methods: {
    
    // mở popup edit 
      onEdit(e) {
      this.isAdd = false;
      this.applicationID = e;
      this.popupVisible = true;
    },

    // xử lí confirm khi xóa 
    async onConfirmDelete() {
      // nếu là chế độ xóa nhiều 
      if (this.deleteMode) {
        await applicationApi.deletes('"' + this.itemsSelected.join(",") + '"');
      } else {
        //xóa khi xóa 1 hóa đơn
        await applicationApi.delete(this.itemsSelected);
      }

      // lấy lại dữ liệu
      this.getAll();
      // gọi toats
      notify("Xóa thành công", "success", 1000);
      this.deletePopup = false;
    },

    // xử lí trước khi xóa 
    async onDelete(e) {

      // gọi popup
      this.deletePopup = true;
      this.message = "Bạn có muốn xóa đơn đề nghị công tác này?";
      this.itemsSelected = e;
    },
    // xử lí trước khi xóa nhiều
    async onMutilDelete() {
      //gọi popup
      this.deletePopup = true;
      this.message = "Bạn có muốn xóa những đơn đề nghị công tác này?";
    },
    // mở tag filter
    onOpenFilter() {
      this.isFilter = !this.isFilter;
    },
    // xử lí khi filter 
    onFilter(e) {
     // set lại payload
      this.payload=e;
      this.filter="";
      //lấy lại dữ liệu
     this.getAll();
    },
    //xử lí trước khi thêm mới 
    onCreate() {
      this.isAdd = true;
      this.popupVisible = true;
    },

    // đóng popup thêm , sửa 
    onClosePopup() {
      this.popupVisible = false;
      this.getAll();
    },
    // chọn nhiều hàng trong hóa đơn
    onSelectionRows(e) {
      this.itemsSelected = JSON.parse(JSON.stringify(e));
      if (this.itemsSelected.length === 0) this.deleteMode = false;
      else this.deleteMode = true;
    },
    // lọc theo trạng thái hóa đơn
    onChangeStatusFilter() {
      this.payload.offset = 0;
      this.pageNumber = 1;
      this.getAll();
    },

    // lọc theo số trang
    onChangePageSize(e) {
      this.payload.pageSize = e;
      this.payload.offset = 0;
      this.pageNumber = 1;
      this.getAll();
    },

    // lọc theo index trang
    onChangePageNumber(e) {
      this.pageNumber = e;
      this.payload.offset = (e - 1) * this.payload.pageSize;
      this.getAll();
    },

    // lọc theo param gõ vào
    onChaneSearchValue(e) {
      this.payload.filter = e;
      this.pageNumber = 1;
      this.payload.offset = 0;
      this.getAll();
    },

    // lấy dữ liệu từ serve
    async getAll() {
      console.log(this.payload);
      this.listApplication = await applicationApi.paging(this.payload);
    },
  },
  async created() {
    await this.getAll();
    console.log(this.status);
  },
};
</script>

<style></style>
