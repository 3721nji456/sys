<template>
  <div>
    <span>单位：</span>
    <el-select ref="aaj" v-model="ajj.va3" placeholder="请选择" style="margin-bottom: 15px;width: 100px">
      <el-option
        v-for="item in options.data"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" @click="drawLi">出表</el-button>
<!--    <el-button type="primary" @click="qaq">出</el-button>-->
<!--    <el-button type="primary" @click="qq">表</el-button>-->
    <div>
      <div id="chartLine" style="width: 1200px;height: 500px"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: {
          data: ''
        },
        aj: {
          va: ''
        },
        it: {
          item: ''
        },
        ajj: {
          va1: '',
          va2: '',
          va3: '',
          va4: ''
        },
        year: '',
        name: '',
        danwei: '',
        data: '',
        se:'',

      }
    },
    created() {
      this.kk()
    },
    methods: {
      async kk() {
        const {data: res} = await this.http.post("dand")
        this.options = res

      },
      //获取年
      async getyear() {
        const {data: res} = await this.http.post("/timeyear")
        this.year = res
      },
      //获取名
      async getname() {
        const {data: res} = await this.http.post("/getname", this.ajj)
        this.name = res
        this.ajj.va2 = ''
      },
      //获取单位
      async getdanwei() {
        const {data: res} = await this.http.post("/getdanwei", this.ajj)
        this.danwei = res
        this.ajj.va3 = ''
      },

      async qaq(){
        const {data: res} = await this.http.post("/doub", this.ajj)
        const {data: result} = await this.http.post("/doubb", this.ajj)
        // console.log(JSON.parse(JSON.stringify(res)))
        for(let i=0;i<res.length;i++){
          if(i%2==0){
            this.da.push(res[i])
          }else {
            this.dan.push(res[i])
          }
        }
        for(let j=0;j<result.length;j++){
          if(j%2==0){
            this.daa.push(result[j])
          }else {
            this.daan.push(result[j])
          }
        }
      },
      async qq(){
        const {data: result} = await this.http.post("/doubb", this.ajj)
        console.log(JSON.parse(JSON.stringify(result)))
        for(let j=0;j<result.length;j++){
          if(i%2==0){
            this.daa.push(result[j])
          }else {
            this.daan.push(result[j])
          }
        }
        console.log(JSON.parse(JSON.stringify(this.daa)))
        console.log(JSON.parse(JSON.stringify(this.daan)))
      },
      async drawLi(item) {
        var da=[]
         var dan=[]
         var daa=[]
         var daan=[]
        const {data: res} = await this.http.post("/doub", this.ajj)
        const {data: result} = await this.http.post("/doubb", this.ajj)
        // console.log(JSON.parse(JSON.stringify(res)))
        for(let i=0;i<res.length;i++){
          if(i%2==0){
            da.push(res[i])
          }else {
            dan.push(res[i])
          }
        }
        for(let j=0;j<result.length;j++){
          if(j%2==0){
            daa.push(result[j])
          }else {
            daan.push(result[j])
          }
        }
        console.log(dan)
        const echarts = require('echarts');
        let newPromise = new Promise((resolve =>
            resolve()
        ))
        newPromise.then(() => {
          let myChart = echarts.init(document.getElementById('chartLine'));
          myChart.setOption(
            {
              title: {
                text: '总出入库图',
                x: 'center'
              },
              xAxis: {
                type: 'category',
                data: dan
              },
              yAxis: {
                name: '单位(' + this.ajj.va3 + ')',
                type: 'value'
              },
              series: [
                {
                  name:'1',
                  data: da,
                  type: 'bar'
                },
                {
                  name:'2',
                  data: daa,
                  type: 'bar'
                }
              ]
            }
          );
        })

      },
    }
  }
</script>

<style scoped>

</style>
