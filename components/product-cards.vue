<template>
  <div class="product__container">
    <div v-for="product in products"
         class="product__wrap"
         :key="product.id">
      <Card style="width:264px" class="product__card">
        <div class="product__content">
          <Rate :rate="product.rating"/>

          <img :src="'http://front-test.idalite.com' + product.photo" class="product__image"/>

          <a @click.prevent="$_onChangeProduct(product)">
            <div :class="$_onChangeProductIcon(product)"/>
          </a>
        </div>

        <div class="product__description">
          <p class="product__name">{{ product.name }}</p>
          <p class="product__price">{{ product.price }} ₽</p>
        </div>
      </Card>
    </div>

    <Spin fix v-if="loading === true">
      <Icon type="ios-loading" size=18
            class="demo-spin-icon-load"/>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import Rate from '../components/rate';

export default {
  name: 'product-card',

  props: {
    products: {
      type: Array,
      default: []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  components: {Rate},

  mounted() {
    this.productsCart = this.$store.getters['product-cart/LIST'] || [];
  },

  data: function () {
    return {
      productsCart: []
    }
  },

  methods: {
    $_onChangeProduct(product) {
      let v = this.productsCart.map(item => item.id);
      if (v.includes(product.id)) {
        this.$store.dispatch('product-cart/DELETED_PRODUCT', product);
      } else {
        this.$store.dispatch('product-cart/ADD_PRODUCT', product);
      }

      this.productsCart = this.$store.getters['product-cart/LIST'];
    },

    $_onChangeProductIcon(product) {
      if (this.productsCart.find(item => item.id === product.id)) {
        return 'delete-product product__icon-car';
      }
      return 'add-product product__icon-car';
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/colors.scss";

.product__container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;

  .product__wrap {
    margin-left: 1px;

    .product__card {
      flex: 1 1 auto;
      margin: 0 8px 15px;

      .product__content {
        display: flex;
        justify-content: space-between;

        .product__image {
          width: 140px;
          height: 180px;
        }

        .product__icon-car {
          width: 19px;
          background-size: cover;
        }
      }

      .product__description {
        margin-top: 16px;

        .product__name {
          font-family: PT Sans, sans-serif;
          font-size: 14px;
          line-height: 18px;
          display: flex;
          align-items: flex-end;
          color: $color-gray;
          height: 40px;
        }

        .product__price {
          margin-top: 5px;
          font-family: PT Sans, sans-serif;
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          color: $color-black;
        }
      }
    }
  }
}

.add-product {
  height: 18px;
  background-image: url("../assets/images/cart-card.svg");

  &:hover {
    background-image: url("../assets/images/cart.svg");
  }
}

.delete-product {
  height: 22px;
  background-image: url("../assets/images/trash.svg");

  &:hover {
    background-image: url("../assets/images/trash-black.svg");
  }
}

//spin

.ivu-spin {
  color: $color-gray;
}

.ivu-spin-fix {
  width: 84%;
  right: 0;
  top: 70px;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.demo-spin {
  height: 100px;
  position: relative;
}

@media screen and (max-width: 470px) {
  .product__container {
    justify-content: center;
  }
}
</style>
