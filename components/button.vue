<template>
  <div class="button__container">
    <Button type="primary"></Button>
  </div>
</template>

<script>
export default {
  name: 'button',

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data: function () {

  },

  methods: {}
};
</script>

<style lang="scss">
@import "../assets/css/colors.scss";

.sort__container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;

  .ivu-select {
    width: auto;
    font-family: PT Sans, sans-serif;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: flex-end;
    color: $color-black;

    .ivu-select-selection {
      background-color: transparent;
      border: none;

      .ivu-select-selected-value {

      }
    }
  }
}

.ivu-select-visible .ivu-select-selection {
  box-shadow: none;
}

.ivu-select-selected-value {
  color: $color-gray;
}

.ivu-select-dropdown {
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.ivu-select-item {
  color: $color-gray;

  &:hover {
    color: $color-black;
  }
}

.ivu-select-arrow {
  height: 10px;
}

.ivu-icon-ios-arrow-down:before {
  content: "\1F893";
  font-size: 20px;
}

.ivu-select-item-selected, .ivu-select-item-selected:hover {
  color: $color-black;
}
</style>
