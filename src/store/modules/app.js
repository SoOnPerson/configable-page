/*
 * @Author: SoOnPerson
 * @Date: 2021-04-18 22:14:37
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 15:12:38
 * @Descripttion:
 */
const app = {
  state: {
    collapse: false // 展开
  },
  mutations: {
    CHANGE_COLLAPSE: (state) => {
      state.collapse = !state.collapse
    }
  }
};
export default app;
