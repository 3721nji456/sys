<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出库</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="sea.name" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getsea"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--选框区域-->
      <el-form >
        类型：
      <el-select ref="aaj"  v-show="chang" v-model="aj.va1" placeholder="请选择类型" style="margin-bottom: 15px">
        <el-option
          v-for="item in options.value1"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        物品名：
      <el-select ref="aaj" v-show="chang" v-model="aj.va2" style="margin-left: 20px;" placeholder="请选择物品名">
        <el-option
          v-for="item in options.value2"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        数量：
      <el-input  ref="aaj" v-show="chang" placeholder="请输入数量" v-model="aj.va3" style="width: 120px;margin-left:20px;"></el-input>
        单位：
        <el-select ref="aaj" v-show="chang"
                 v-model="aj.va4"
                 style="margin-left: 20px;"
                 placeholder="请选择单位">
        <el-option
          v-for="item in options.value4"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button v-show="chang" @click="jie">出库</el-button>
      </el-form>

      <!--表格区域-->
      <el-table :data="inforlist.data" height="400" border stripe style="width: 849px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="inname" width="200px"></el-table-column>
        <el-table-column label="类型" prop="intype" width="200px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="200px"></el-table-column>
        <el-table-column label="单位" prop="indan" width="200px"></el-table-column>
      </el-table>
      <el-pagination :data="inforlist"
                     layout="total"
                     :total="inforlist.count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inforlist: {
          data: [],
          count: '',
        },
        sea: {
          name: '',
          count: ''
        },
        options: {
          value1: '',
          value2: '',
          value4: ''
        }
        ,
        aj: {
          va1: '',
          va2: '',
          va3: '',
          va4: ''
        },
        ajj:{
          vva1: '',
          vva2: '',
          vva3: '',
          vva4: ''
        },
        v: [],
        vv:[],
        chang: true,
        inname:'',
        innum:''
      }
    },
    created() {
      this.getlist();
      this.sel();
    },
    methods: {
      async getlist() {
        const {data: res} = await this.http.post("/allinfor")
        this.inforlist = res




        }
      },
      async getsea() {
        const {data: res} = await this.http.post("/sear", this.sea)
        this.inforlist = res
      },
      async sel() {
        const {data: res} = await this.http.post("/select")
        this.options = res
        console.log(res)
      },
      async jie() {
        const {data: res} = await this.http.post("/jjjie", this.aj)
        this.v = res
        if (res.status == 201) return this.$message.error('数量必须大于0');
        if (res.status == 202) return this.$message.error('出库数量大于库存');
        if (res.status == 200)this.$message.success('出库成功');
        this.reset()
        this.getlist()
      },
      reset(){
        this.aj.va1=''
        this.aj.va2=''
        this.aj.va3=''
        this.aj.va4=''
        this.ajj.vva1=''
        this.ajj.vva2=''
        this.ajj.vva3=''
        this.ajj.vva4=''
      },
      te(){
        const promise = new Promise((resolve,reject)=>{
          console.log(1)
          resolve()
          console.log(2)
          })
        promise.then(()=>{
          console.log(3)
        })
        console.log(4)
        },
      tee() {
        let countTotal = (a) => {
          var a = '';
          var b = '';
              a = 100;
              b = a;
          countTotal=b
          console.log(countTotal)
          console.log(b)

        }
      },
    },
  }
</script>

<style scoped>

</style>
