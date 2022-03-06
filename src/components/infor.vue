<template>
    <div >
<!--      <el-container v-for="item in infor" :key="main">-->
<!--        {{item}}-->
<!--      </el-container>-->
<!--      <el-select v-model="value1" multiple placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->

<!--      <el-select-->
<!--        v-model="value2"-->
<!--        multiple-->
<!--        collapse-tags-->
<!--        style="margin-left: 20px;"-->
<!--        placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <div>-->
<!--        {{ this.newsList}}-->
<!--      </div>-->
      <h1>欢迎进入系统</h1>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          infor: [],
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value1: [],
          value2: [],
          newsList:''
        }
      },
      created() {
        this.getlist();
        this.getNewsList()
        this.getList()
      },
      methods: {
        logout() {
          window.sessionStorage.clear();
          this.$router.push("/login");
        },
        async getlist() {
          const {data: res} = await this.http.post("/allinfor")
          this.infor = res
        },
        toggerCollapse() {
          this.isCollapse= !this.isCollapse
        },
        async nn(){
          const {data: res} = await this.http.post("/nn")
          this.nn = res
        },
        getNewsList(){
          this.axios.post('allinfor').then((response)=>{
            this.newsList=response.data.data;
          }).catch((response)=>{
          })
        },
        getList(){
          this.axios({
            url:'allinfor',
            method:'post'
          }).then(res=>{
          })
        }
      }
    }

</script>

<style scoped>

</style>
