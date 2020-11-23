<template>
  <div class="container">
    <Sort :category="3" :productsList="products"/>

    <ProductCards :products="productsList"/>
  </div>
</template>

<script>
import {mixinEventId} from '~/lib/mixins/event-ids';
import Sort from '~/components/sort';
import ProductCards from '~/components/product-cards';
import _ from "lodash";

export default {
  layout: 'default',

  components: {Sort, ProductCards},
  mixins: [mixinEventId],

  mounted() {
    if (!_.isEmpty(this.productsList)) {
      this.productsList = this.$store.getters['products/CATEGORY_THREE'];

      this.products = _.cloneDeep(this.productsList).sort(function (obj1, obj2) {
        return obj1.price - obj2.price;
      })
    } else {
      this.fetchProductsList();
    }
  },

  data() {
    return {
      isLoading: false,
      products: []
    }
  },

  computed: {
    productsList: {
      get() {
        return this.$store.getters['products/CATEGORY_THREE'] || [];
      },

      set(value) {
        return this.$store.commit('products/SET_CATEGORY_THREE', value)
      }
    }
  },

  methods: {
    async fetchProductsList() {
      this.isLoading = true;
      try {
        this.products = await this.$store.dispatch('products/FETCH_LIST', {category: 3});
      } catch (e) {
        this.$root.$emit(this.EVENT_ID_ALERT_SHOW, {
          type: 'error',
          text: 'Ошибка загрузки данных'
        })
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
