import ElTable from 'element-ui/lib/table'
import SColumn from './item/index'
import './style/index.css'
export default {
  name: 'AntTable',
  components: { SColumn },
  props: Object.assign({}, ElTable.props, {
    getDataList: {
      type: Function,
      require: true
    },
    columns: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    },
    pagination: { // 分页的配置
      type: Object,
      require: false,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        }
      }
    }
  }),
  data() {
    return {
      dataList: [],
      loading: false,
      localPagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        hideOnSinglePage: false
      }
    }
  },
  watch: {
    'pagination': {
      deep: true,
      handle: function (val) {
        if (val) {
          this.localPagination = Object.assign({}, this.localPagination, this.pagination)
        }
      }
    }
  },
  created() {
    if (this.pagination)
      this.localPagination = Object.assign({}, this.localPagination, this.pagination)
    this.loadData()
  },
  methods: {
    /**
     * 
     * @param {*} searchForm 搜索
     * @param {*} sorter 排序
     */
    loadData() {
      this.loading = true
      const pageInfo = { pageSize: this.localPagination.pageSize, pageNum: this.localPagination.currentPage }
      const parameter = Object.assign({}, pageInfo)
      if (this.localPagination.total > 0 && this.localPagination.total / pageInfo.pageSize < pageInfo.pageNum - 1) return
      const result = this.$props.getDataList(parameter)
      if (result && (result instanceof Promise || '[object Promise]' === result.toString())) {
        result.then((res) => {
          this.loading = false
          this.localPagination.total = res.count
          this.dataList = res.data
        })
      } else {
        throw new Error('getDataList need return a Promise')
      }
    },
    sizeChange(size) {
      this.localPagination.pageSize = size
      this.loadData()
    },
    currentChange(pageNum) {
      this.localPagination.currentPage = pageNum
      this.loadData()
    }
  },
  render() {
    const props = {
      ...this.$props,
      data: this.dataList
    }
    const tableColumn = (
      <s-column {...{ props: { columns: this.$props.columns } }}></s-column>
    )
    const table = (
      <el-table {...{ props, on: { ...this.$listeners } }} style="width:100%">
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
        {tableColumn}
      </el-table>
    )

    const pagination = (
      <el-pagination {...{ props: this.localPagination }} onSize-change={this.sizeChange} onCurrent-change={this.currentChange}>
      </el-pagination >
    )
    return (
      <div class="table-wrapper" v-loading={this.loading}>
        {table}
        <div class="table-pagination">
          {pagination}
        </div>
      </div>
    )
  }
}