<template>
  <div class="cart__container">
    <Badge :count="lengthProducts" overflow-count="9">
      <a href="#" @click="cartShow = true">
        <img src="../assets/images/cart.svg" alt="cart" class="badge__icon-car">
      </a>
    </Badge>

    <Drawer v-model="cartShow" :mask-closable="false" :closable="false">
      <div class="cart__header">
        <h3 class="cart__title">Корзина</h3>

        <a class="cart__button-close" @click="$_onCloseCart">
          <img src="../assets/images/close.svg" alt="close">
        </a>
      </div>

      <div class="cart__empty" v-if="emptyProductsList === true && formSent === false">
        <p class="empty-title">
          Пока что вы ничего не добавили
          в{{ '\u00A0' }}корзину.
        </p>

        <Button type="primary" @click="cartShow = false">Перейти к выбору</Button>
      </div>

      <div v-if="formSent === false && emptyProductsList === false">
        <div class="cart__content">
          <p class="cart__title">Товары в корзине</p>

          <Cards/>
        </div>

        <div class="cart__form">
          <p class="cart__title">Оформить заказ</p>
          <Form ref="cartForm" :rules="formRules" :model="formModel" autocomplete="on">
            <Form-item prop="name">
              <Input v-model.trim="formModel.name" clearable
                     placeholder="Ваше имя"/>
            </Form-item>
            <Form-item prop="phone">
              <the-mask v-model.trim="formModel.phone" type="tel" class="ivu-input ivu-input-large"
                        placeholder="Tелефон" :mask="'+7 (###) ###-##-##'"/>
            </Form-item>
            <Form-item prop="address">
              <Input v-model="formModel.address" placeholder="Адрес"/>
            </Form-item>
            <Button class="big-button" type="primary" :loading="loading"
                    @click="submitForm()"
                    @keyup.native.enter="submitForm()">
              Отправить
            </Button>
          </Form>

          <div v-if="errorText === true" class="cart__form-error-text">
            <p class="attention-point">!!</p>
            <p class="attention-text">Все поля обязательные.<br> После удачной отправки формы содержимое корзины
              очищается</p>
          </div>
        </div>
      </div>

      <div class="cart__form-sent" v-if="formSent === true">
        <div class="form-sent__wrap">
          <img src="../assets/images/ok-hand.svg" alt="ok" class="emoji-ok">
          <h3 class="form-sent__title">Заявка успешно отправлена</h3>
          <p class="form-sent__subtitle">Вскоре наш менеджер свяжется с Вами</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Cards from '../components/cart-cards';
import {TheMask} from 'vue-the-mask';

export default {
  name: 'cart',

  components: {Cards, TheMask},

  mounted() {
    this.products = this.$store.getters['product-cart/LIST'] || [];
  },

  data: function () {
    return {
      loading: false,
      cartShow: false,
      formSent: false,
      errorText: false,
      formModel: {
        name: '',
        phone: '',
        address: ''
      },

      formRules: {
        name: [
          {required: true, message: ' ', trigger: 'change'},
        ],
        phone: [
          {required: true, message: ' ', trigger: 'change'},
          {
            required: true, validator: (rule, value, callback) => {
              let errors = [];
              if (!value || !value.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')) {
                errors.push(' ');
              }
              callback(errors);
            }, trigger: 'change',
          },
        ],
        address: [
          {required: true, message: ' ', trigger: 'change'}
        ],
      },
    }
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
    emptyProductsList() {
      return _.isEmpty(this.products);
    },

    lengthProducts() {
      return this.products.length;
    }
  },

  methods: {
    submitForm() {
      this.$refs['cartForm'].validate((valid) => {
        if (valid) {
          this.errorText = false;
          this.formSent = true;
          this.products = [];
        } else {
          this.errorText = true;
        }
      });
    },

    $_onCloseCart() {
      this.cartShow = false;
      this.formSent = false;
      this.formModel = {
        name: '',
        phone: '',
        address: ''
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/main";

.cart__container {

  //badge

  .ivu-badge {
    top: -10px;
  }

  .ivu-badge-count {
    height: 13px;
    width: 13px;
    min-width: 13px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 8px;
    right: 4px;
    box-shadow: none;
    background-color: $color-gray;
    padding: 0;

    font-family: PT Sans, sans-serif;
    font-weight: 700;
    font-size: 8px;
    color: #FFFFFF;
  }

  .badge__icon-car {
    height: 26px;
    width: 24px;
  }
}

//content
.ivu-drawer {
  width: 460px !important;
  max-width: 460px !important;

  .cart__content {
    margin-bottom: 30px;
  }

  .cart__title {
    padding-bottom: 16px;
    font-family: PT Sans, sans-serif;
    font-size: 18px;
    line-height: 23px;
    color: $color-gray;
  }
}

.v-transfer-dom {
  .ivu-drawer-mask {
    background-color: #FFFFFF;
    opacity: 0.8;
  }
}

.ivu-drawer-content {
  padding: 52px 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  right: 0;
  overflow: auto;

  .ivu-drawer-body {
    padding: 0 48px;

    .cart__empty {
      .empty-title {
        font-family: PT Sans, sans-serif;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
        margin-bottom: 32px;
      }
    }
  }
}

.cart__header {
  padding: 14px 0 24px;
  display: flex;
  justify-content: space-between;

  .cart__title {
    height: 40px;
    margin: 0;
    font-family: PT Sans, sans-serif;
    font-weight: 700;
    font-size: 32px;
    color: #000000;
  }

  .cart__button-close {
    border: none;
    background: none;
  }
}

//form

.cart__form {
  .cart__form-error-text {
    display: flex;
    margin: 30px 0;
    text-align: left;
    align-items: flex-start;

    .attention-point {
      margin-right: 8px;
      font-family: PT Sans, sans-serif;
      font-weight: 700;
      font-size: 32px;
      line-height: 41px;
      display: flex;
      align-items: flex-end;
      color: #EB5757;
    }

    .attention-text {
      padding-top: 4px;
      font-family: PT Sans, sans-serif;
      font-size: 16px;
      line-height: 21px;
      color: #000000;
    }
  }
}

//form-sent

.cart__form-sent {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .form-sent__wrap {
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 80%;

    .emoji-ok {
      width: 70px;
      height: 70px;
      margin-bottom: 24px;
    }

    .form-sent__title {
      margin: 0 0 2px;
      font-family: PT Sans, sans-serif;
      font-weight: 700;
      font-size: 24px;
      line-height: 31px;
      color: #000000;
    }

    .form-sent__subtitle {
      font-family: PT Sans, sans-serif;
      font-size: 16px;
      line-height: 21px;
      color: $color-gray;
    }
  }
}

@media screen and (max-width: 470px) {
  .ivu-drawer {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
