import _ from 'lodash';

const __SESSION_PRODUCT_CART_LIST_KEY = '__intl_wk_product_cart_list';

export const state = () => ({
    products: JSON.parse(localStorage.getItem(__SESSION_PRODUCT_CART_LIST_KEY)) || []
});

export const getters = {
    LIST: (state) => {
        return state.products
    }
};

export const mutations = {
    SET_LIST_PRODUCT: (store, product) => {
        store.products.push(product);
        localStorage.setItem(__SESSION_PRODUCT_CART_LIST_KEY, JSON.stringify(store.products));
    },

    SET_LIST_PRODUCTS: (store, products) => {
        store.products = products;
        localStorage.setItem(__SESSION_PRODUCT_CART_LIST_KEY, JSON.stringify(store.products));
    }
};

export const actions = {
    ADD_PRODUCT({commit}, product) {
        commit('SET_LIST_PRODUCT', product);
    },

    DELETED_PRODUCT({commit, getters}, product) {
        let productsCart = _.cloneDeep(getters['LIST']);
        let index = productsCart.map(x => {
            return x.id;
        }).indexOf(product.id);

        if (index !== -1) {
            productsCart.splice(index, 1);
        }
        commit('SET_LIST_PRODUCTS', productsCart)
    }
};
