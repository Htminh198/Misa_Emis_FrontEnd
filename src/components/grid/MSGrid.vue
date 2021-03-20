<template>
  <div class="grid h-full">
    <div class="custom-grid w-full">
      <DxDataGrid
        id="gridContainer"
        noDataText="Không có dữ liệu"
        :data-source="tbody"
        :show-borders="true"
        :allow-column-reordering="true"
        ref="dataGrid"
        @content-ready="handleContentReady"
        @selection-changed="onSelectionChanged"
        :key-expr="id"
        :hoverStateEnabled="true"
      >
        <DxPaging :enabled="false"></DxPaging>
        <DxColumn
          data-field=""
          caption=""
          header-cell-template="header-filter"
          :width="52"
          :height="10"
          data-type=""
          :fixed="true"
        >
        </DxColumn>
        <DxSelection
          mode="multiple"
          show-check-boxes-mode="always"
          select-all-mode="page"
        />
        <DxColumn
          v-for="item in gridHeader"
          :key="item.id"
          :width="200"
          :data-field="item.class"
          :caption="item.name"
          :visible="item.isShow"
          header-cell-template="title-header"
          :fixed="item.isFixed"
          fixed-position="left"
          :dataType="item.class === 'status' ? '' : 'date'"
          format="dd/MM/yyyy HH:mm"
        >
          <DxLookup
            :data-source="status"
            value-expr="id"
            display-expr="name"
            v-if="item.class === 'status'"
          />
        </DxColumn>

        <DxColumn
          :data-field="id"
          :width="120"
          caption=""
          cell-template="event"
          data-type=""
          :fixed="true"
          :allow-reordering="false"
          fixed-position="right"
        />

        <template #title-header="{ data }">
          <div class="grid-header">
            <div>{{ data.column.caption }}</div>
            <div class="lock-reordering"></div>
          </div>
        </template>
        <template #header-filter>
          <div class="header-filter">
            <div class="icon" id="icon1" @click="toggleDefault"></div>

            <DxPopover
              :width="320"
              :visible="defaultVisible"
              target="#icon1"
              position="bottom"
              class="header-filter"
            >
              <div class="header-filter-header">
                <div class="title">Tùy chỉnh cột</div>
                <div class="icon-cancel" @click="toggleDefault"></div>
              </div>
              <div class="selection">
                <DxTextBox
                  placeholder="Tìm kiếm..."
                  :show-clear-button="true"
                  :value.sync="searchParam"
                />
                <DxDataGrid
                  id="gridContainer-selection"
                  :data-source="listHeader"
                  :show-borders="true"
                  :selected-row-keys.sync="rowsActive"
                  @content-ready="handleContentReady2"
                  key-expr="id"
                >
                  <DxSelection mode="multiple" />

                  <DxRowDragging
                    :allow-reordering="true"
                    :on-reorder="onReorder"
                    :show-drag-icons="false"
                    :allow-filtering="true"
                  />

                  <DxColumn
                    width="176"
                    data-field="name"
                    caption=""
                    cell-template="name"
                  />
                  <DxColumn
                    width="36"
                    data-field=""
                    caption=""
                    cell-template="drag-icon"
                  >
                  </DxColumn>
                  <template #drag-icon>
                    <div class="dx-datagrid-drag-icon"></div>
                  </template>
                  <template #name="{data}" ``>{{ data.value }}</template>
                </DxDataGrid>
                <div class="event">
                  <ms-button
                    class="ms-button-secondary"
                    text="Mặc định"
                    :buttonStyle="{
                      marginLeft: '20px',
                      marginRight: '50px',
                    }"
                    @onClick="onDefaultHeader"
                  ></ms-button>
                  <ms-button
                    class="ms-button-primary"
                    text="Lưu"
                    @onClick="onChangeHeader"
                  ></ms-button>
                </div>
              </div>
            </DxPopover>
          </div>
        </template>
        <template #event="{data}">
          <div class="row-event">
            <ms-button
              :id="'edit' + data.value"
              class="ms-button-secondary ms-button-default"
              :iconStyle="{
                width: '18px',
                height: '20px',
                maskPosition: '-291px -26px',
                backgroundColor: 'var( --black)',
              }"
              :buttonStyle="{
                borderRadius: '50%',
                marginRight: '20px',
              }"
              @onClick="onEdit(data)"
            ></ms-button>

            <ms-button
              class="ms-button-secondary ms-button-default"
              :iconStyle="{
                width: '20px',
                height: '20px',
                maskPosition: '-171px -26px',
                backgroundColor: 'red',
              }"
              :buttonStyle="{
                borderRadius: '50%',
              }"
              @onClick="onDelete(data)"
            ></ms-button>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <div class="paging w-full">
      <div class="page-total" id="test">
        Tổng số bản ghi: <b>{{ totalElements }}</b>
      </div>
      <diV class="page-left">
        <div class="page-select-box">
          <div class="center-text checked-text">
            <DxSelectBox
              :items="page"
              :value.sync="numberElementsOfPage"
              item-template="customItem"
              :onValueChanged="onChangePageSize"
            >
              <template #customItem="{ data }">
                <div class="page-custom-item">
                  <div class="page-name">
                    {{ data }}
                  </div>
                  <div
                    class="page-selected"
                    v-if="data === numberElementsOfPage"
                  ></div>
                </div>
              </template>
            </DxSelectBox>
          </div>
        </div>
        <div class="page-infor">
          từ <b>{{ elementFrom }}</b> đến <b>{{ elementTo }}</b> bản ghi
        </div>
        <div class="page-paging">
          <div
            class="btn-prev "
            @click="prevClick"
            :class="{ disable: pageNumber < 2 }"
          ></div>
          <div
            @click="nextClick"
            :class="{
              disable:
                Math.ceil(totalElements / numberElementsOfPage) <= pageNumber,
            }"
            class="btn-next"
          ></div>
        </div>
      </diV>
    </div>
  </div>
</template>

<script>
import status from "@/assets/json/status.json";
import employees from "../../assets/json/employee.json";
export default {
  name: "ms-grid",
  props: {
    id: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: null,
    },
    tbody: {
      type: [Object, Array],
      default: null,
    },
    deleteMode: {
      type: Boolean,
      default: false,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    totalElements: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      prefix: "",
      selectedEmployeeNames: "Nobody has been selected",
      numberElementsOfPage: 25,
      selectionChangedBySelectBox: false,
      gridHeader: { ...this.data.menu },
      listHeader: JSON.parse(JSON.stringify(this.data.menu)),
      headerDefault: JSON.parse(JSON.stringify(this.data.menu)),
      status: status.status.splice(1, 3),
      defaultVisible: false,
      rowsActive: [],
      elementFrom: 0,
      elementTo: 0,

      page: [15, 25, 50, 100],
      employees: employees,
      searchParam: "",
      totalItem: this.tbody.length,
    };
  },
  methods: {
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
    onEdit(e) {
      this.$emit("onEdit", e.value);
    },
    onDelete(e) {
      this.$emit("onDelete", e.value);
    },
    async onReorder(e) {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = this.listHeader.indexOf(visibleRows[e.toIndex].data);
      const fromIndex = this.listHeader.indexOf(e.itemData);
      const newTasks = [...this.listHeader];

      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);

      this.listHeader = JSON.parse(JSON.stringify(this.newTasks));
      this.data.menu = JSON.parse(JSON.stringify(this.listHeader));
      this.handleRowsActive();
      this.gridHeader = { ...this.data.menu };
    },
    toggleDefault() {
      this.defaultVisible = !this.defaultVisible;
    },
    countInfor() {
      this.elementFrom = (this.pageNumber - 1) * this.numberElementsOfPage + 1;
      this.elementTo = this.elementFrom + this.totalItem - 1;
    },

    onSelectionChanged({ selectedRowKeys }) {
      this.$emit("onSelectionChanged", selectedRowKeys);
    },
    async onChangePageSize() {
      await this.$emit("onChangePageSize", this.numberElementsOfPage);
    },

    prevClick() {
      if (this.pageNumber >= 2) this.pageNumber = this.pageNumber - 1;
      this.onChangePageNumber();
    },
    nextClick() {
      if (
        Math.ceil(this.totalElements / this.numberElementsOfPage) >
        this.pageNumber
      ) {
        this.pageNumber = this.pageNumber + 1;
        this.onChangePageNumber();
      }
    },
    onChangePageNumber() {
      this.$emit("onChangePageNumber", this.pageNumber);
    },

    async onChangeHeader() {
      await this.data.menu.forEach((element) => {
        if (this.rowsActive.find((e) => e === element.id) === undefined)
          element.isShow = false;
        else element.isShow = true;
      });
      this.handleRowsActive();
      this.gridHeader = { ...this.data.menu };
      this.toggleDefault();
    },
    async onDefaultHeader() {
      this.data.menu = await JSON.parse(JSON.stringify(this.headerDefault));
      this.handleRowsActive();
      this.gridHeader = { ...this.data.menu };
      this.toggleDefault();
    },
    handleContentReady(e) {
      e.component.columnOption("command:select", "visibleIndex", 0);
    },
    handleContentReady2(e) {
      e.component.columnOption("command:select", "visibleIndex", -1);
    },
    handleRowsActive() {
      this.rowsActive = [];
      this.data.menu.forEach((element) => {
        if (element.isShow) {
          this.rowsActive.push(element.id);
        }
      });
    },
  },
  computed: {},
  watch: {
    deleteMode: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (this.deleteMode === false) {
        const dataGrid = this.$refs["dataGrid"].instance;
        dataGrid.clearSelection();
      }
    },
    tbody: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.totalItem = this.tbody.length;
      this.countInfor();
    },
  },
  created() {
    this.handleRowsActive();
    this.countInfor();
  },
};
</script>

<style>
.dx-datagrid-rowsview .dx-state-hover {
  background-color: var(--date-picker-hover-bg) !important;
}
.dx-datagrid-rowsview .dx-state-hover .row-event {
  display: flex !important;
}
</style>
