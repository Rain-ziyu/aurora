import { defineStore } from 'pinia'

export const useMetaStore = defineStore('metaStore', {
  state: () => {
    return {
      title: 'RainZiYu的个人博客'
    }
  }
})
