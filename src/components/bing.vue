<template>
  <div>
    <span>物品名：</span>
    <el-select ref="aaj" v-model="ajj.va2" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="getdanwei">
      <el-option
        v-for="item in name"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>单位：</span>
    <el-select ref="aaj" v-model="ajj.va3" placeholder="请选择" style="margin-bottom: 15px;width: 100px">
      <el-option
        v-for="item in danwei"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" @click="getdata">出表</el-button>
    <el-button type="primary" @click="download()">下载图表为图片</el-button>
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
        },
        year: '',
        name: '',
        danwei: '',
        data:'',
      }
    },
    created() {
      this.getyear()
      this.getname()
    },
    methods: {

      //获取年
      async getyear(){
        const {data:res} = await this.http.post("/getcom")
        this.year=res
      },
      //获取名
      async getname(){
        const {data:res} = await this.http.post("disgetname",this.ajj)
        this.name=res
        this.ajj.va2=''
      },
      //获取单位
      async getdanwei(){
        const {data:res} = await this.http.post("/getdanwei",this.ajj)
        this.danwei=res
        this.ajj.va3=''
      },


      async test(){
        const {data: res} = await this.http.post("test")
      },
      async getdata(){
        const {data: res} = await this.http.post("getbingg",this.ajj)
        console.log(res)
        let datan = []
        let datanu = []
        for(let i=0;i<res.length;i++){
          if(i%2==0){
            datan.push(res[i])
          }else {
            datanu.push(res[i])
          }
        }
        let chart=[]
        for(let i=0;i<res.length;i=i+2){
          chart.push({
            value:res[i],
            name:res[i+1]
          })
        }
        console.log(chart)
        console.log(datan)
        console.log(datanu)
        // datan.unshift("")
        // datan.push("")
        // datanu.unshift("")
        // datanu.push("")
        const echarts = require('echarts');
        let newPromise = new Promise((resolve =>
            resolve()
        ))
        newPromise.then(() => {
          let myChart = echarts.init(document.getElementById('chartLine'));
          myChart.setOption(
            {
              title: {
                text: '各公司对'+this.ajj.va2+'占比图',
                subtext: '占比',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '50%',
                  data: chart,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
          );
        })
      },
      download() {
        let mycanva = document.getElementsByTagName("canvas")[0]
        console.log(mycanva)
        let image = mycanva.toDataURL("image/png");
        let $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", '各公司对'+this.ajj.va2+'占比图');
        $a.click();
      },
    }
  }
</script>

<style scoped>

</style>
