<template>
  <div class="rate__container">
    <div :class="'rate-musk ' + $_rateBg()">
      <img src="../assets/images/rate-icon.svg" alt="star">
    </div>

    <span class="rate__value">{{ rate }}</span>
  </div>
</template>

<script>
export default {
  name: 'rate',

  props: {
    rate: {
      type: Number,
      default: 0
    }
  },

  methods: {

    $_rateBg() {
      if (this.rate === 0 || this.rate <= 1.9) {
        return 'rate-very-bad'
      } else if (this.rate === 2 && this.rate < 3) {
        return 'rate-bad'
      } else if (this.rate === 3 && this.rate < 4) {
        return 'rate-normal'
      } else if (this.rate === 4 && this.rate < 5) {
        return 'rate-good'
      } else if (this.rate === 5) {
        return 'rate-excellent'
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/colors.scss";

.rate__container {
  display: flex;
  align-items: center;
  height: 20px;
  width: max-content;

  .rate__value {
    font-family: PT Sans, sans-serif;
    font-weight: 700;
    font-size: 10px;
    line-height: 13px;
    color: $color-yellow;
  }

  .rate-musk {
    position: relative;
    width: 13px;
    height: 13px;
    margin-right: 5px;
    z-index: 1;

    &:before {
      content: "\01F7CA";
      height: 100%;
      width: 100%;
      position: absolute;
      color: $color-yellow;
      font-size: 18px;
      top: -6px;
      left: -1px;
      z-index: 2;
    }

    img {
      position: absolute;
      width: 13px;
      height: 13px;
      background-color: transparent;
      z-index: 4;

      overflow: hidden;
    }
  }

  .rate-very-bad {
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      height: 75%;
      width: 100%;
      z-index: 3;
    }
  }

  .rate-bad {
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      height: 65%;
      width: 100%;
      z-index: 3;
    }
  }

  .rate-normal {
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      height: 50%;
      width: 100%;
      z-index: 3;
    }
  }

  .rate-good {
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      height: 40%;
      width: 100%;
      z-index: 3;
    }
  }

  .rate-excellent {
    &:after {
      content: "";
      position: absolute;
      background-color: white;
      height: 0;
      width: 100%;
      z-index: 3;
    }
  }
}
</style>
