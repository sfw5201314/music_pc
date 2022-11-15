import { defineStore } from "pinia";
//模块划分
export const shopStore = defineStore("shop", {
  state: () => {
    return {
      age: 18,
      name: "shop模块",
    };
  },
  getters: {
    changeAge() {
      console.log("getters");
      return this.age + 1000;
    },
  },
  actions: {
    upNum(val) {
      this.age += val;
    },
  },
});
