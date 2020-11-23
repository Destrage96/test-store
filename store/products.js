const __SESSION_PRODUCTS_LIST_CATEGORY_1_KEY = '__intl_wk_products_1_list';
const __SESSION_PRODUCTS_LIST_CATEGORY_2_KEY = '__intl_wk_products_2_list';
const __SESSION_PRODUCTS_LIST_CATEGORY_3_KEY = '__intl_wk_products_3_list';

export const state = () => ({
    categoryOne: JSON.parse(localStorage.getItem(__SESSION_PRODUCTS_LIST_CATEGORY_1_KEY)) || null,
    categoryTwo: JSON.parse(localStorage.getItem(__SESSION_PRODUCTS_LIST_CATEGORY_2_KEY)) || null,
    categoryThree: JSON.parse(localStorage.getItem(__SESSION_PRODUCTS_LIST_CATEGORY_3_KEY)) || null
});

export const getters = {
    CATEGORY_ONE: (state) => {
        return state.categoryOne
    },

    CATEGORY_TWO: (state) => {
        return state.categoryTwo
    },

    CATEGORY_THREE: (state) => {
        return state.categoryThree
    }
};

export const mutations = {
    SET_CATEGORY_ONE: (store, list) => {
        store.categoryOne = list;
        localStorage.setItem(__SESSION_PRODUCTS_LIST_CATEGORY_1_KEY, JSON.stringify(list));
    },

    SET_CATEGORY_TWO: (store, list) => {
        store.categoryTwo = list;
        localStorage.setItem(__SESSION_PRODUCTS_LIST_CATEGORY_2_KEY, JSON.stringify(list));
    },

    SET_CATEGORY_THREE: (store, list) => {
        store.categoryThree = list;
        localStorage.setItem(__SESSION_PRODUCTS_LIST_CATEGORY_3_KEY, JSON.stringify(list));
    }
};

export const actions = {
    async FETCH_LIST({commit}, {category}) {
        try {
            let productsList = await this.$api.products.fetchList(category);
            productsList = productsList.list.sort(function (obj1, obj2) {
                return obj1.price - obj2.price;
            })

            if (category === 1 && productsList.length > 0) {
                commit('SET_CATEGORY_ONE', productsList);
            } else if (category === 2 && productsList.length > 0) {
                commit('SET_CATEGORY_TWO', productsList);
            } else if (category === 3 && productsList.length > 0) {
                commit('SET_CATEGORY_THREE', productsList);
            }

            return productsList || []
        } catch (e) {
            throw e;
        }
    }
};
