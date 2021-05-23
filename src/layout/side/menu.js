
export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    styleObject: {
      type: Object,
      required: false,
      default: () => { }
    },
    customClass: {
      type: String,
      required: false,
      default: () => ''
    },
    mode: {
      type: String,
      required: false,
      default: 'vertical'
    },
    uniqueOpened: {
      type: Boolean,
      required: false,
      default: true
    },
    collapse: {
      type: Boolean,
      required: false,
      default: false
    },
    collapseTransition: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  created() {
  },
  methods: {
    renderIcon: function (h, icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const attrs = {
        class: icon
      }
      return h('i', { attrs: { ...attrs } })
    },
    renderMenuItem: function (h, menu) {
      return h('el-menu-item-group', {}, [
        h('el-menu-item', { props: { index: menu.meta.id.toString(), route: menu.path } }, [
          this.renderIcon(h, menu.meta.icon),
          h('span', [menu.meta.title])
        ])
      ])
    },
    renderSubMenu: function (h, menu) {
      const this2_ = this
      const subItem = [h('template', { slot: 'title' }, [this.renderIcon(h, menu.meta.icon), h('span', [menu.meta.title])])]
      const itemArr = []
      menu.children.forEach(function (item) {
        itemArr.push(this2_.renderItem(h, item))
      })
      return h(
        'el-submenu',
        {
          props: {
            index: menu.meta.id.toString(),
            popperClass: this.$props.customClass,
            popperAppendToBody: true
          }
        },
        subItem.concat(itemArr)
      )
    },
    renderItem: function (h, menu) {
      // render 父菜单 or 最终一级菜单
      if (!menu.hidden) {
        return menu.children && menu.children.length
          ? this.renderSubMenu(h, menu) // 父菜单：还有子菜单的情况
          : this.renderMenuItem(h, menu) // 最后一级的菜单
      }
    },
    renderMenu: function (h, menuTree) {
      // render 菜单
      const this2_ = this
      const menuArr = []
      menuTree.forEach(function (menu) {
        if (!menu.hidden) {
          menuArr.push(this2_.renderItem(h, menu))
        }
      })
      return menuArr
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  },
  render(h) {
    return h(
      'el-menu',
      {
        props: {
          router: true,
          uniqueOpened: this.$props.uniqueOpened,
          collapseTransition: this.$props.collapseTransition,
          collapse: this.$props.collapse,
          mode: this.$props.mode,
          defaultActive: this.$route.meta.id.toString()
        },
        style: { ...this.$props.styleObject }
      },
      this.renderMenu(h, this.menu)
    )
  }
}
