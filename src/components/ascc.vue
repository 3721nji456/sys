<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计表</el-breadcrumb-item>
    </el-breadcrumb>
    单位：
    <el-select ref="aaj" v-model="ajj.va1" placeholder="请选择类型" style="margin-bottom: 15px">
      <el-option
        v-for="item in options.data"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" @click="drawLi">出表</el-button>
    <el-button type="primary" @click="download()">下载图表为图片</el-button>
    <div>
      <div id="chartLine" style="width: 600px;height: 500px"></div>
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
          va1: ''
        }
      }
    },
    created() {
      this.kk()
    },
    methods: {
      qq() {
        this.drawLi()
      },
      gg: function (item) {
        this.it.item = item
        this.drawL(item)
        this.drawLi(item)

      },
      async kk() {
        const {data: res} = await this.http.post("dand")
        this.options = res

      },
      async drawL(item) {
        var datan = []
        var datanu = []
          .log(item)
        const {data: res} = await this.http.post("jji", this.it)
        this.list = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < this.list.length; i++) {

          datan.push(this.list[i].inname)
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
                axisLabel: {
                  interval: 0,
                  rotate: 40
                },
                data: datan
              },
              yAxis: {
                name: '单位(' + item + ')',
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
      async drawLi(item) {

        var datan = []
        var datanu = []
        const {data: res} = await this.http.post("jjii", this.ajj)
        this.list = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < this.list.length; i++) {
          datan.push(this.list[i].inname+"("+this.list[i].incompany+")")
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
      async chuxls() {
        var datan = []
        var datanu = []
        const {data: res} = await this.http.post("jjii", this.ajj)
        this.list = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < this.list.length; i++) {

          datan.push(this.list[i].inname)
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
            },
          );
          //获取echarts图片的base64编码字符串 pixelRatio：图片精度  backgroundColor：背景颜色
          let imgURL = myChart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
          //后台请求：传递图表base64编码字符串
          this.http.post("/export", {'imagesBase64': imgURL}).then((res) => {
            if (res.data.flag) {
              //根据返回路径下载文件
              window.location.href = res.data.message;
            } else {
              alert("导出出错")
            }
          })
        })

      },
      download() {
        let qg = "aka"
        let mycanva = document.getElementsByTagName("canvas")[0]
        let image = mycanva.toDataURL("image/png");
        let $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", this.ajj.va1 + "表.png");
        $a.click();
      },
      ajq() {
        console.log(this.ajj.va1)
      },
    }
  }
</script>

<style scoped>

</style>
