import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/main.css'
import axios from 'axios';
import 'element-plus/theme-chalk/index.css';


import {ElForm} from 'element-plus'
import {ElButton} from 'element-plus'
import {ElFormItem} from 'element-plus'
import {ElInput} from 'element-plus'
import {ElMessage} from "element-plus";
import {ElCard} from "element-plus";
import {ElMenu} from "element-plus";
import {ElCol} from "element-plus";
import {ElRow} from "element-plus";
import {ElTable} from "element-plus";
import {ElImageViewer} from "element-plus";

const app = createApp(App)
app.use(ElForm);
app.use(ElButton);
app.use(ElFormItem);
app.use(ElInput);
app.use(ElMessage);
app.use(ElCard);
app.use(ElMenu);
app.use(ElCol);
app.use(ElRow);
app.use(ElTable);
app.use(ElImageViewer)
app.config.globalProperties.$axios = axios
//axios.defaults.baseURL = '/api'; //后端地址
app.provide('$axios', axios)
app.use(router).use(Antd)




app.mount('#app')
