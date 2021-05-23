/*
 * @Author: SoOnPerson
 * @Date: 2021-04-21 19:55:43
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-23 16:39:59
 * @Descripttion: 
 */
export default {
  name: 'SColumn',
  props: {
    columns: {
      type: Array,
      require: false,
      default: () => []
    }
  },
  methods: {
    renderItem(item) {
      const props = Object.assign({}, {
        headerAlign: "center",
        align: "center",
        showOverflowTooltip: true
      }, item)
      const scopedSlots = {
        default: (scope) => {
          switch (item.showType) {
            case 'image':
              return (
                <el-image
                  src={scope.row[item.prop]}
                  alt
                  style="width:80px;height: 80px"
                  lazy
                ></el-image>
              )
            default: {
              return (
                <span>{scope.row[item.prop]}</span>
              )
            }

          }
        }
      }
      if (["selection", "index", "expand"].includes(item.type)) {
        scopedSlots.default = null
      }
      console.log(item.prop);
      return (
        <el-table-column {...{ props, scopedSlots }}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
        </el-table-column>
      )
    }
  },
  render() {
    return (
      <template>
        <el-table-column {...{ props: { width: "1px" } }}></el-table-column>
        {
          this.$props.columns.map(column => {
            return this.renderItem(column)
          })
        }
      </template>
    )
  }
}