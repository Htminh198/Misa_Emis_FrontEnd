<template>
  <div class="mission-allowance-detail">
    <div class="detail-title">
      <div class="detail-text">
        <div style="font-size:24px;font-weight:bolder;margin-top:-5px ;">
          {{ title }}
        </div>
        - Công tác
      </div>
      <div class="detail-icon-cancel" @click="onClose"></div>
    </div>
    <div class="detail-content">
      <div class="detail-form">
        <div class="left">
          <ms-field
            label="Người đề nghị"
            targetID="proposer"
            :messageErr="messageErr.proposer"
            required
          >
            <DxSelectBox
              :value.sync="defaultApplication.proposerID"
              placeholder=""
              :search-enabled="true"
              :noDataText="noDataText"
              :data-source="employees.data"
              searchModeOption="contains"
              searchExprOption="Name"
              searchTimeoutOption="200"
              minSearchLengthOption="0"
              :onSelectionChanged="onChangeProposer"
              :show-data-before-search="true"
              display-expr="fullName"
              value-expr="employeeID"
              ref="autoFocus"
            >
            </DxSelectBox>
          </ms-field>
          <ms-field label="Đơn vị công tác">
            <DxSelectBox
              :items="departments"
              :value="defaultApplication.departmentID"
              placeholder=""
              display-expr="name"
              value-expr="id"
              :read-only="true"
            />
          </ms-field>
          <ms-field
            label="Người duyệt"
            targetID="acceptedBy"
            :messageErr="messageErr.acceptedBy"
            required
          >
            <DxSelectBox
              :value.sync="defaultApplication.censorID"
              placeholder=""
              :noDataText="noDataText"
              :search-enabled="true"
              :data-source="employees.data"
              searchModeOption="contains"
              searchExprOption="Name"
              searchTimeoutOption="200"
              minSearchLengthOption="0"
              :show-data-before-search="true"
              display-expr="fullName"
              value-expr="employeeID"
            />
          </ms-field>
          <ms-field
            label="Ngày đề nghị"
            targetID="recommendedDate"
            :messageErr="messageErr.recommendedDate"
            required
          >
            <ms-date-picker
              :datetime.sync="defaultApplication.recommendedDate"
            ></ms-date-picker>
          </ms-field>
          <ms-field
            label="Ngày đi"
            targetID="departureDay"
            :messageErr="messageErr.departureDay"
            required
          >
            <ms-date-picker
              :datetime.sync="defaultApplication.departureDay"
            ></ms-date-picker>
          </ms-field>
          <ms-field
            label="Ngày về"
            targetID="dateBack"
            :messageErr="messageErr.dateBack"
            required
          >
            <ms-date-picker
              :datetime.sync="defaultApplication.dateBack"
            ></ms-date-picker>
          </ms-field>
          <ms-field label="Địa điểm công tác">
            <DxTextBox :value.sync="defaultApplication.place" />
          </ms-field>
          <ms-field label="Lí do công tác">
            <DxTextArea :height="90" :value.sync="defaultApplication.reason" />
          </ms-field>
        </div>
        <div class="right">
          <ms-field label="Người liên quan">
            <DxTagBox
              :items="employees"
              :value.sync="defaultApplication.peopleInvolIds"
              :search-enabled="true"
              :noDataText="noDataText"
              :height="90"
              placeholder=""
              display-expr="fullName"
              value-expr="employeeID"
            />
          </ms-field>
          <ms-field label="Yêu cầu hỗ trợ">
            <DxTextArea
              :height="90"
              :value.sync="defaultApplication.requestSupport"
            />
          </ms-field>
          <ms-field label="Người hỗ trợ">
            <DxTagBox
              :items="employees"
              :search-enabled="true"
              :noDataText="noDataText"
              :height="90"
              :value.sync="defaultApplication.peopleSupportIds"
              placeholder=""
              display-expr="fullName"
              value-expr="employeeID"
            />
          </ms-field>
          <ms-field label="Ghi chú">
            <DxTextArea :height="90" :value.sync="defaultApplication.note" />
          </ms-field>
          <ms-field label="Trạng thái" required>
            <DxSelectBox
              :value.sync="defaultApplication.status"
              placeholder=""
              :search-enabled="true"
              :data-source="status"
              searchModeOption="contains"
              searchExprOption="Name"
              searchTimeoutOption="200"
              minSearchLengthOption="0"
              :show-data-before-search="true"
              display-expr="name"
              value-expr="id"
            />
          </ms-field>
        </div>
      </div>
      <div class="w-full" style=" margin-top:10px">
        <b style="font-size:18px;">Nhân viên đi cùng</b>
      </div>
      <div class="content-nodata">
        <div class="nodata"><i>Chưa có dữ liệu</i></div>
        <ms-button
          class="ms-button-filled"
          :iconStyle="{
            width: '16px',
            height: '16px',
            maskPosition: '-292px -76px',
            backgroundColor: '#3C4ADA',
            marginRight: '10px',
          }"
          :buttonStyle="{
            marginRight: '5px',
            marginLeft: '-15px',
          }"
          text="Chọn"
        ></ms-button>
      </div>
    </div>
    <div class="detail-footer">
      <div class="event">
        <ms-button
          class="ms-button-secondary"
          :buttonStyle="{
            marginRight: '20px',
          }"
          text="Hủy"
          @onClick="onClosePopup"
        ></ms-button>
        <ms-button
          class="ms-button-primary"
          :buttonStyle="{
            marginRight: '20px',
          }"
          text="Lưu"
          @onClick="onSubmit"
        ></ms-button>
      </div>
    </div>
    <ms-popup
      text="Thông tin đã được thay đổi. Bạn có muốn lưu lại không?"
      title="Thông báo"
      :popupVisible="confirmPopup"
    >
      <ms-button
        class="ms-button-secondary"
        @onClick="
          () => {
            confirmPopup = false;
          }
        "
        text="Hủy"
      >
      </ms-button>
      <ms-button
        class="ms-button-secondary"
        :buttonStyle="{ margin: '0 8px' }"
        text="Không lưu"
        @onClick="onClosePopup"
      >
      </ms-button>
      <ms-button @onClick="onSubmit" class="ms-button-primary" text="Lưu">
      </ms-button>
    </ms-popup>
  </div>
</template>

<script>
import employeeAPI from "@/api/components/Employee/EmployeeAPI.js";
import applicationApi from "@/api/components/Application/ApplicationAPI.js";

import department from "@/assets/json/department.json";
import notify from "devextreme/ui/notify";

export default {
  name: "mission-allowance-detail",
  props: {
    onClosePopup: {
      type: Function,
      default: () => {},
    },
    applicationID: { type: Number, default: 0 },
  },
  data() {
    return {
      confirmPopup: false,
      isChange: true,
      title: "Thêm đơn",
      noDataText: "Không có dữ liệu!",

      employees: [],
      defaultApplication: {
        id: "",
        proposerID: "",
        recommendedDate: this.getDateNow(),
        departureDay: "",
        dateBack: "",
        place: "",
        reason: "",
        censorID: "",
        status: 1,
        departmentID: "",
        peopleInvolIds: "",
        peopleSupportIds: "",
        note:"",
      },
      status: [
        {
          id: 1,
          name: "Chờ duyệt",
        },
        {
          id: 2,
          name: "Đã duyệt",
        },
        {
          id: 3,
          name: "Từ chối",
        },
      ],
      departments: department.department,
      messageErr: {
        proposer: "",
        acceptedBy: "",
        recommendedDate: "",
        departureDay: "",
        dateBack: "",
      },
    };
  },
  methods: {
    // hứng dữ liệu của người đề nghị
    onChangeProposer(e) {
      this.defaultApplication.departmentID = e.selectedItem.departmentID;
    },
    // đóng popup Confirm
    onClose() {
      if (this.isChange) this.confirmPopup = true;
      else this.onClosePopup();
    },

    // lấy dữ liệu theo id
    async setApplication(id) {
      this.defaultApplication = await applicationApi.getById(id);
      this.defaultApplication = this.defaultApplication.data;
        this.defaultApplication.peopleSupportIds=this.defaultApplication.peopleSupportIds.split(',');
    this.defaultApplication.peopleInvolIds=this.defaultApplication.peopleInvolIds.split(',');
     if(this.defaultApplication.peopleSupportIds[0]=="") this.defaultApplication.peopleSupportIds.pop();
     if(this.defaultApplication.peopleSupportIds[0]=="") this.defaultApplication.peopleSupportIds.pop();
    },

    // xử lí khi ấn đồng ý lưu
    async onSubmit() {
    this.defaultApplication.peopleSupportIds=this.defaultApplication.peopleSupportIds.toString();
    this.defaultApplication.peopleInvolIds=this.defaultApplication.peopleInvolIds.toString();
  
      //validate dữ liệu
      if (this.validate()) {
        if (this.applicationID === 0) {
          // gọi api thêm dữ liẹu
          await applicationApi.insert(this.defaultApplication);
          notify("Thêm thành công", "success", 1000);
        } else {
          //gọi api chỉnh sửa
          await applicationApi.update(
            this.applicationID,
            this.defaultApplication
          );
          notify("Chỉnh sửa thành công", "success", 1000);
        }
        this.confirmPopup = false;
        this.onClosePopup();
        
      } else notify("Có lỗi xảy ra!", "error", 1000);
    },

    // validate dữ liệu
    validate() {
      var flag = true;
      this.messageErr.proposer = "";
      this.messageErr.acceptedBy = "";
      this.messageErr.recommendedDate = "";
      this.messageErr.departureDay = "";
      this.messageErr.dateBack = "";

      // check người đề nghị có trốn không
      if (this.defaultApplication.proposerID === "") {
        flag = false;
        this.messageErr.proposer = "Người đề nghị không được để trống.";
      }
      // check người duyệt có trống không
      if (this.defaultApplication.censorID === "") {
        flag = false;
        this.messageErr.acceptedBy = "Người duyệt không được để trống.";
      }
      // check ngày đề nghị có trống không
      if (this.defaultApplication.recommendedDate === "") {
        flag = false;
        this.messageErr.recommendedDate = "Ngày đề nghị không được để trống.";
      }
      //check ngày đi có trống không
      if (this.defaultApplication.departureDay === "") {
        flag = false;
        this.messageErr.departureDay = "Ngày đi không được để trống.";
      }
      //check ngày về có trống không
      if (this.defaultApplication.dateBack === "") {
        flag = false;
        this.messageErr.dateBack = "Ngày về không được để trống.";
      }
      //check ngày đề nghị có lớn hơn ngày đi không
      if (
        this.dateCompare(
          this.defaultApplication.recommendedDate,
          this.defaultApplication.departureDay
        ) > 0
      ) {
        flag = false;
        this.messageErr.recommendedDate =
          "Ngày đề nghị không được lớn hơn ngày đi .";
        this.messageErr.departureDay =
          "Ngày đi không được nhỏ hơn ngày đề nghị.";
      } else if (
        //check ngày về có nhỏ hơn ngày đi hay không
        this.dateCompare(
          this.defaultApplication.departureDay,
          this.defaultApplication.dateBack
        ) > 0
      ) {
        flag = false;
        this.messageErr.dateBack = "Ngày về không được nhỏ hơn ngày đi.";
        this.messageErr.departureDay = "Ngày đi không được lớn hơn ngày về.";
      }

      return flag;
    },

    // lấy ngày hiện tại
    getDateNow() {
      var now = new Date();

      return now.toISOString();
    },
// so sánh 2 ngày
    dateCompare(a, b) {
      var date1 = new Date(a);
      var date2 = new Date(b);

      return date1 - date2;
    },
    
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.autoFocus.instance.focus();
      setTimeout(() => {
        this.$refs.autoFocus.instance.focus();
      }, 1000);
    });

    if (this.applicationID !== 0) {
      this.title = "Sửa đơn";
      this.setApplication(this.applicationID);
    }
  },
  async created() {
    this.employees = await employeeAPI.getAll();
  },
};
</script>

<style>
.dx-state-focused {
  border: 0 !important;
  outline: 0 !important;
}
</style>
