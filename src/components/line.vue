<template>
  <div>
    <span>年：</span>
    <el-select ref="aaj" v-model="ajj.va1" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="getname">
      <el-option
        v-for="item in year"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
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
    <span>出入库类型：</span>
    <el-select v-model="ajj.va4" style="margin-bottom: 10px;width: 100px">
      <el-option value="入库">入库</el-option>
      <el-option value="出库">出库</el-option>
    </el-select>
    <el-button type="primary" @click="getdata">出表</el-button>
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
          va4:''
        },
        year: '',
        name: '',
        danwei: '',
        data:'',
      }
    },
    created() {
      this.getyear()
    },
    methods: {

      //获取年
      async getyear(){
        const {data:res} = await this.http.post("/timeyear")
        this.year=res
      },
      //获取名
      async getname(){
        const {data:res} = await this.http.post("/getname",this.ajj)
        this.name=res
        this.ajj.va2=''
      },
      //获取单位
      async getdanwei(){
        const {data:res} = await this.http.post("/getdanwei",this.ajj)
        this.danwei=res
        this.ajj.va3=''
      },
      async drawLi(item) {

        var datan = []
        var datanu = []
        const {data: res} = await this.http.post("jjii", this.ajj)
        this.list = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < this.list.length; i++) {
          datan.push(this.list[i].inname + "(" + this.list[i].incompany + ")")
          datanu.push(this.list[i].innum)
        }
        datan.unshift("")
        datan.push("")
        datanu.unshift("")
        datanu.push("")
        const echarts = require('echarts');
        let newPromise = new Promise((resolve =>
            resolve()
        ))
        newPromise.then(() => {
          let myChart = echarts.init(document.getElementById('chartLine'));
          myChart.setOption(
            {
              title: {
                text: '库存图',
                x: 'center'
              },
              tooltip: {
                trigger: 'axis'

              },
              legend: {
                data: ['库存'],
                x: 'right'
              },
              grid: {
                left: '4%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datan
              },
              yAxis: {
                name: '单位(' + this.ajj.va1 + ')',
                type: 'value'
              },
              series:
                [{
                  name: '库存',
                  type: 'bar',
                  barWidth: '20%',
                  // 设置折线图颜色
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#4876FF'
                      }
                    }
                  },
                  stack: '总量',
                  data: datanu
                }]
            }
          );
        })

      },
      q(){
        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }
          ]
        }
      },
      async test(){
        const {data: res} = await this.http.post("test")
      },
      async getdata(){
        const {data: res} = await this.http.post("getdata",this.ajj)
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
                text: this.ajj.va1+'各月份'+this.ajj.va2+'('+this.ajj.va3+')'+this.ajj.va4+'量统计图',
                x: 'center'
              },
              xAxis: {
                type: 'category',
                data: datan
              },

              yAxis: {
                name:this.ajj.va3,
                type: 'value'
              },
              series: [
                {
                  data: datanu,
                  type: 'line',
                  smooth: true
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
