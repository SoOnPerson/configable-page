/*
 * @Author: SoOnPerson
 * @Date: 2021-04-20 16:52:10
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-20 19:34:53
 * @Descripttion: 调试使用的数据而已， 顺便想想继承之类的使用
 */
function SearchItem({ label, code }) {
  this.id = parseInt(Math.random() * 100000)
  this.label = label
  this.code = code
}
function InputItem({ label, code }) {
  SearchItem.call(this, { label, code })
  this.type = 'input'
}
function DateItem({ label, code, type }) {
  SearchItem.call(this, { label, code })
  this.type = type || 'date'
}
// function SelectItem({ label, code }) {
//   SearchItem.call(this, { label, code })
// }
export default [
  new InputItem({ label: '姓名', code: 'name' }),
  new InputItem({ label: '手机号', code: 'phone' }),
  new DateItem({ label: '创建时间', code: 'createdTime' }),
  new DateItem({ label: '结束时间', code: 'endTime', type: 'daterange' }),
  // new SelectItem({ label: '姓名', code: 'name' })
]