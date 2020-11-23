import products from '../api/products';

export default $axios => ({
    products: products($axios),
})
