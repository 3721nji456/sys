<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>趋势表</el-breadcrumb-item>
    </el-breadcrumb>
    年份：
    <el-select ref="aaj" v-model="ajj.va2" placeholder="请选择年份" style="margin-bottom: 15px;width: 120px" @change="kkk">
      <el-option
        v-for="item in option"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    月份：
    <el-select ref="aaj" v-model="ajj.va3" placeholder="请选择月份" style="margin-bottom: 15px;width: 120px" @change="kkkk">
      <el-option
        v-for="item in optio"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    单位：
    <el-select ref="aaj" v-model="ajj.va4" placeholder="请选择单位" style="margin-bottom: 15px;width: 120px">
      <el-option
        v-for="item in opti"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    出入库类型：
    <el-select ref="aaj" v-model="ajj.va1" placeholder="请选择出入库类型" style="margin-bottom: 15px;width: 170px">
      <el-option
        :label="a"
        :value="a">
      </el-option>
      <el-option
        :label="b"
        :value="b">
      </el-option>
    </el-select>
    <el-button type="primary" @click="drawLii">出表</el-button>
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
        option: '',
        optio: '',
        opti: '',
        list: '',
        innamerecord: '',
        innumrecord: '',
        a: '出库',
        b: '入库'
      }
    },
    created() {
      this.kk()
      this.k()
      this.formattor()
    },
    methods: {
      async kk() {
        const {data: res} = await this.http.post("dand")
        this.options = res
      },
      async k() {
        const {data: res} = await this.http.post("timeyear")
        this.option = res
      },
      async kkk() {
        const {data: res} = await this.http.post("selectmonthh", this.ajj)
        this.optio = res
        this.optio.unshift("")
        await this.kkkk()
      },
      async kkkk() {
        const {data: res} = await this.http.post("selectdd", this.ajj)
        this.opti = res
        this.opti.unshift("")
      },
      async drawLii(item) {
        var datan = []
        var datanu = []
        const {data: res} = await this.http.post("ttimeyyyy", this.ajj)
        if (res.status == 300) return this.$message.error('出表失败，请选择出入库类型');
        this.list = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < this.list.length; i++) {
          console.log(this.list[i].innamerecord)
          datan.push(this.list[i].innamerecord)
          datanu.push(this.list[i].innumrecord)
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
                data: datan,
              },
              yAxis: {
                name: '单位(' + this.ajj.va4 + ')',
                type: 'value'
              },
              series:
                [{
                  name: '库存',
                  type: 'bar',
                  barWidth: '5%',
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
    }
  }
</script>

<style scoped>

</style>
