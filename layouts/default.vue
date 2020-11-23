<template>
  <div class="layout">
    <GeneralNotice/>
    <Layout>
      <Header class="layout-header-bar">
        <div class="header-content">
          <div class="header-left-content">
            <Icon @click.native="collapsedSider" :class="rotateIcon" class="mobile-icon"
                  :style="{margin: '0 20px'}" type="md-menu" size="24"/>
            <nuxt-link :to="{name: 'index'}" class="layout-logo">TestList</nuxt-link>
          </div>


          <Cart/>
        </div>
      </Header>
      <Layout class="main-layout">
        <Content>
          <Layout>
            <Sider :style="{background: '#fff', width: '160px',  maxWidth: '160px', minWidth: '0'}"
                   ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
              <h3 class="sidebar-title">Каталог</h3>
              <Menu :active-name="$route.name" width="auto" :class="menuitemClasses">
                <MenuItem name="index" :to="{name: 'index'}">
                  Рюкзаки
                </MenuItem>
                <MenuItem name="messenger-bags" :to="{name: 'messenger-bags'}">
                  Сумки-мессенджеры
                </MenuItem>
                <MenuItem name="business-bags" :to="{name: 'business-bags'}">
                  Деловые сумки
                </MenuItem>
              </Menu>
            </Sider>

            <Content>
              <nuxt/>
            </Content>

            <div class="content-mask" v-if="contentMusk === true"/>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Cart from '../components/cart';
import GeneralNotice from '~/components/general-notice';

export default {
  components: {Cart, GeneralNotice},

  data() {
    return {
      isCollapsed: true,
      contentMusk: false
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider() {
      this.contentMusk = !this.contentMusk;
      this.$refs.side1.toggleCollapse();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/main.scss";

.layout {
  height: 100%;
  background: #f5f7f9;
  position: relative;
}

.ivu-layout {
  height: 100%;
  background: #fff;
}

.main-layout {
  overflow: auto;
  margin-top: 20px;
}

//layout-header

.ivu-layout-header {
  width: 100%;
  height: 46px;
  padding: 20px 0 0;
  position: relative;
  left: 0;
  right: 0;
  background-color: #fff;

  .header-content {
    max-width: 1300px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin: 0 auto;

    .header-left-content {
      display: flex;
    }
  }
}

.layout-logo {
  width: 100px;
  height: 30px;

  font-family: PT Sans, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: $color-gray;
}

.layout-header-bar {
  height: 66px;
  background: #fff;
  box-shadow: 0 8px 20px -18px #11111152;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

//icon-mobile

.menu-icon {
  height: fit-content;
  transition: all .3s;
  color: $color-gray;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.mobile-icon {
  display: none;
}

//layout-menu

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-layout-sider {
  .sidebar-title {
    font-family: PT Sans, sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 41px;
    color: $color-black;
  }
}

.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
  width: fit-content;
  padding: 16px 0;
  font-family: PT Sans, sans-serif;
  font-size: 16px;
  line-height: 21px;
  color: $color-gray-light;
  border-bottom: 1px solid #ffffff;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  padding-bottom: 1px;
  margin-bottom: 15px;
  background-color: transparent;
  color: $color-black;
  border-color: $color-black;

  &:after {
    display: none;
  }
}

.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: $color-black;
}

.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

//layout-content

.ivu-layout.ivu-layout-has-sider {
  max-width: 1300px;
  padding: 0 15px;
  margin: 22px auto;
}

.content-mask {
  position: absolute;
  top: 67px;
  bottom: 0;
  left: 172px;
  right: 0;
  background-color: #FFFFFF;
  opacity: 0.8;
  height: 100%;
  z-index: 1000;
}

@media screen and (min-width: 471px) {
  .ivu-layout-sider {
    display: block;
    flex: 0 0 200px !important;
  }
}

@media screen and (max-width: 470px) {
  .ivu-layout-sider {
    border-right: 1px solid $color-gray-light;
  }

  .mobile-icon {
    display: block;
  }

  .main-layout {
    margin-top: 0;
  }
}
</style>
