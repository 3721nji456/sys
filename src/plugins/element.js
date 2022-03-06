import Vue from 'vue'
import { Button } from "element-ui";
import { Form,FormItem } from "element-ui";
import { input } from "element-ui";
import { message } from "element-ui";
import { Container } from "element-ui";
import { Header } from "element-ui";
import { Aside } from "element-ui";
import { Main } from "element-ui";
import { select } from "element-ui";
import { option } from "element-ui";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(select)
Vue.use(option)

Vue.prototype.$message=message

