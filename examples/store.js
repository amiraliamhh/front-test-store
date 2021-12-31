import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      count: 1
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
