<template>
  <div class="cart-cards__container">
    <div v-for="product in products"
         class="cart-cards__wrap"
         :key="product.id">
      <Card style="width:264px" class="cart-cards__card">
        <div class="cart-cards__content">
          <img :src="'http://front-test.idalite.com' + product.photo" class="cart-cards__image"/>

          <div class="cart-cards__description">
            <p class="cart-cards__name">{{ product.name }}</p>
            <p class="cart-cards__price">{{ product.price }} ₽</p>


            <Rate :rate="product.rating"/>
          </div>
        </div>

        <a @click.prevent="$_onDeleteCart(product)" class="cart-cards__trash-link">
          <div class="cart-cards__icon-trash"/>
        </a>
      </Card>
    </div>
  </div>
</template>

<script>
import Rate from '../components/rate';

export default {
  name: 'product-card',

  components: {Rate},

  mounted() {
    this.products = this.$store.getters['product-cart/LIST'] || [];
  },

  computed: {
    products: {
      get() {
        return this.$store.getters['product-cart/LIST'] || [];
      },

      set(value) {
        return this.$store.commit('product-cart/SET_LIST_PRODUCTS', value)
      }
    },
  },

  methods: {
    $_onDeleteCart(product) {
      this.$store.dispatch('product-cart/DELETED_PRODUCT', product);
      this.products = this.$store.getters['product-cart/LIST'];
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/colors.scss";

.cart-cards__container {
  margin-right: 2px;
  margin-left: 2px;

  .cart-cards__wrap {
    .cart-cards__card {
      width: 100% !important;
      margin-bottom: 10px;

      .ivu-card-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .cart-cards__content {
        display: flex;

        .cart-cards__image {
          width: 70px;
          height: 90px;
        }

        .cart-cards__description {
          .cart-cards__name {
            max-width: 170px;
            margin-bottom: 6px;
            font-family: PT Sans, sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 18px;
            text-align: left;
            color: $color-gray;
          }

          .cart-cards__price {
            margin-bottom: 16px;
            font-family: PT Sans, sans-serif;
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            color: $color-black;
          }
        }
      }

      .cart-cards__trash-link {
        height: auto;
        margin: auto 0;

        .cart-cards__icon-trash {
          height: 32px;
          width: 32px;
          background-image: url("../assets/images/trash.svg");

          &:hover {
            background-image: url("../assets/images/trash-black.svg");
          }
        }
      }
    }
  }
}
</style>
