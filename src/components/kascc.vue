<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>趋势表</el-breadcrumb-item>
    </el-breadcrumb>
    <span>年份：</span>
    <el-select ref="aaj" v-model="ajj.va2" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="kkk">
      <el-option
        v-for="item in option"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>月份：</span>
    <el-select ref="aaj" v-model="ajj.va3" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="kkkk">
      <el-option
        v-for="item in optio"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>物品名：</span>
    <el-select ref="aaj" v-model="ajj.va5" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="huoyuan">
      <el-option
        v-for="item in optoioo"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>单价：</span>
    <el-select ref="aaj" v-model="ajj.qq1" placeholder="请选择" style="margin-bottom: 15px;width: 100px" @change="danwei">
      <el-option
        v-for="item in oppp"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>单位：</span>
    <el-select ref="aaj" v-model="ajj.va4" placeholder="请选择" style="margin-bottom: 15px;width: 100px">
      <el-option
        v-for="item in opti"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <br>
    <span>货源：</span>
    <el-select ref="aaj" v-model="ajj.va6" placeholder="请选择" style="margin-bottom: 15px;width: 100px">
      <el-option
        v-for="item in optoiooo"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <span>出入库类型：</span>
    <el-select ref="aaj" v-model="ajj.va1" placeholder="请选择"
               style="margin-bottom: 15px;width: 100px;margin-right: 10px">
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
    <el-button type="primary" @click="download()">下载图表为图片</el-button>
    <!--    <el-button type="primary" @click="qaj()" >console</el-button>-->
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
          va4: '',
          va5: '',
          va6: '',
          qq1: ''
        },
        option: '',
        optio: '',
        opti: '',
        optoioo: '',
        optoiooo: '',
        oppp: '',
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
        await this.wupin()
        await this.kkkk()
        await this.hy()
      },
      async kkkk() {
        const {data: res} = await this.http.post("selectdd", this.ajj)
        this.opti = res
        this.opti.unshift("")
        await this.wupin()
      },
      async hy() {
        const {data: res} = await this.http.post("selecthy", this.ajj)
        this.optoiooo = res
        this.optoiooo.unshift("")
      },
      async wupin() {
        const {data: res} = await this.http.post("selectwupin", this.ajj)
        this.optoioo = res
        this.optoioo.unshift("")
      },
      async huoyuan() {
        const {data: res} = await this.http.post("selecthuoyuan", this.ajj)
        this.optoiooo = res
        this.optoiooo.unshift("")
        await this.danjia()
      },
      async danjia() {
        const {data: res} = await this.http.post("selectdanjia", this.ajj)
        this.oppp = res
        this.oppp.unshift("")
      },
      async danwei(){
        const {data:res} = await this.http.post("selectdanwei",this.ajj)
        this.opti=res
        this.opti.unshift("")
      },
      async drawLii(item) {
        var datan = []
        var datanu = []
        const {data: res} = await this.http.post("ttimeyyyy", this.ajj)
        if (res.status == 300) return this.$message.error('出表失败，请选择');
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
                text: '趋势   图',
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
                  rotate: 40,
                  fontSize: 20
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
                  barWidth: '50%',
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
      download() {
        let mycanva = document.getElementsByTagName("canvas")[0]
        console.log(mycanva)
        let image = mycanva.toDataURL("image/png");
        let $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", this.ajj.va2 + '年' + this.ajj.va3 + '月' + this.ajj.va5 + '' + this.ajj.qq1 + '(单价)' + this.ajj.va4 + '（单位）' + this.ajj.va6 + "(货源)" + this.ajj.va1 + "表.png");
        $a.click();
      },
      qaj() {
        console.log(this.ajj.va3)
      }
    }
  }
</script>

<style scoped>

</style>
