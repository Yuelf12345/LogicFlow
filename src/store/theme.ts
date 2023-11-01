import { defineStore } from 'pinia';


interface Config {
    bgColor?:string
}

const themeStore = defineStore('themeConfig', {
    state: (): Config => ({
        bgColor:'#f4f7f9'
    }),
    getters: {
        themeConfig: (state) => state
    },

    actions:{
        
    }
})

export default themeStore