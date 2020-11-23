export default $axios => ({
  async fetchList(category) {
    try {
      const list = await $axios.$get('/product?category=' + category);
      if (typeof (list) === 'object') {
        return {
          list: Object.values(list),
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
});
