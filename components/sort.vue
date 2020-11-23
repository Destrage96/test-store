<template>
  <div class="sort__container">
    <Row>
      <Col>
        <Select v-model="sortVal" @on-select="$_onChangeSort">
          <span slot="prefix">Сортировать по: </span>
          <Option value="price" label="цене">По цене</Option>
          <Option value="rate" label="популярности">По популярности</Option>
        </Select>
      </Col>
    </Row>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'sort',

  props: {
    category: {
      type: Number,
      default: 0
    },

    productsList: {
      type: Array,
      default: []
    },
  },

  mounted() {
    this.products = _.cloneDeep(this.productsList);

    this.products = this.products.sort(function (obj1, obj2) {
      return obj1.price - obj2.price;
    })

    this.$_onSetStore();
  },

  data: function () {
    return {
      products: [],
      sortVal: 'price'
    }
  },

  methods: {
    $_onChangeSort(v) {
      if (v.value === 'price') {
        this.products = _.cloneDeep(this.productsList);
        this.products = this.products.sort(function (obj1, obj2) {
          return obj1.price - obj2.price;
        })
      } else if (v.value === 'rate') {
        this.products = _.cloneDeep(this.productsList);
        this.products = this.products.sort(function (obj1, obj2) {
          return obj2.rating - obj1.rating;
        })
      }
      this.$_onSetStore();
    },

    $_onSetStore() {
      if (this.category === 1) {
        this.$store.commit('products/SET_CATEGORY_ONE', this.products)
      } else if (this.category === 2) {
        this.$store.commit('products/SET_CATEGORY_TWO', this.products)
      } else if (this.category === 3) {
        this.$store.commit('products/SET_CATEGORY_THREE', this.products)
      }
    }
  }
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

@media screen and (max-width: 470px) {
  .sort__container {
    .ivu-select {
      font-size: 10px;
      line-height: 12px;

      .ivu-select-selection .ivu-select-selected-value {
        font-size: 10px;
      }
    }
  }

  .ivu-select-item {
    font-size: 10px !important;
    z-index: 10;
  }

  .ivu-icon-ios-arrow-down:before {
    content: "\1F893";
    font-size: 15px;
  }
}
</style>
