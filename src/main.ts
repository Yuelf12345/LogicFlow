import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIconModules from  "@element-plus/icons-vue";

import router  from './router'
import { createPinia } from "pinia";

import components from './components'

const app = createApp(App)

for(let iconName in ElIconModules){ 
    if (Reflect.has(ElIconModules, iconName)) {
        // @ts-ignore
        const item = ElIconModules[iconName]
        app.component(iconName,item)
    }
}

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(components)
app.mount('#app')