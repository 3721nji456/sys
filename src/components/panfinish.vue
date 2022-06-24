<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>盘点记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <!--搜索区域-->
      <el-date-picker
        v-model="time.time"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button type="primary" @click="getlist" style="margin-bottom: 15px;">显示盘算清单</el-button>
      <el-button type="primary" @click="updateck" style="margin-left: 62%">更新库存</el-button>

      <!--表格区域-->
      <el-table id="pandian" :data="inforlist.data" height="430" border stripe style="width: 1259px" @selection-change="handleSelectionChange">
        <el-table-column :selectable="checkSelect" type="selection" width="45" ></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="goods" width="90px"></el-table-column>
        <el-table-column label="类型" prop="type" width="90px"></el-table-column>
        <el-table-column label="单价" prop="danjia" width="90px"></el-table-column>
        <el-table-column label="单位" prop="danwei" width="40px"></el-table-column>
        <el-table-column label="货源" prop="company" width="160px"></el-table-column>
        <el-table-column label="数量" prop="num" width="100px"></el-table-column>
        <el-table-column label="盘点数量" prop="hesuan" width="90px"></el-table-column>
        <el-table-column label="盘盈/亏" prop="pan" width="90px"></el-table-column>
        <el-table-column label="盘盈/亏(金额)" prop="panprice" width="100px"></el-table-column>
        <el-table-column label="盘点操作人" prop="username" width="100px"></el-table-column>
        <el-table-column label="盘点审核人" prop="finishname" width="100px"></el-table-column>
        <el-table-column label="盘点发起时间" prop="time" width="100px"></el-table-column>
        <el-table-column v-if="false" label="time" prop="time" width="150px" ></el-table-column>
        <el-table-column v-if="false" label="total" prop="total" width="150px" ></el-table-column>
        <el-table-column v-if="false" label="finish" prop="finish" width="150px" ></el-table-column>


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
          count: 0,
        },
        sea: {
          name: '',
          count: ''
        },
        total: 0,
        dialogVisible: false,
        infor: {
          data: []
        },
        aj: {
          va1: '',
          va2: '',
          va3: '',
          va4: '',
          va5: '',
          va6:'',
          vax:'',
          vaxx:'',
          q1:'',
        },
        readonly: true,
        edit: true,
        multipleSelection:[],
        inputData:[],
        time:{
          time:''
        },
        bbo:'',
      }
    },
    created() {

    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async getlist() {
        const {data: res} = await this.http.post("/getpanfinish",this.time)
        this.inforlist = res
        console.log(this.inforlist)
      },
      async getsea() {
        const {data: res} = await this.http.post("/seary", this.sea)
        this.inforlist = res
      },
      g(){
        console.log(this.multipleSelection)
        console.log(JSON.parse(JSON.stringify(this.multipleSelection)))
      },
      c(){
        const {data: res} =  this.http.post("/c",this.multipleSelection)
      },
      finish(){
        const {data: res} =  this.http.post("/finish",this.multipleSelection)
      },
      gcg(){
        const {data: res} =  this.http.post("/gcg",this.multipleSelection)
      },
      show(a,b,c,g,d,e,f,h){
        this.aj.va1=a
        this.aj.va2=b
        this.aj.vax=c
        this.aj.q1=g
        this.aj.va4=d
        this.aj.va5=e
        this.aj.vaxx=f
        this.aj.va6=h
        this.dialogVisible = true
      },

      getr(){
        console.log(this.time.time)
      },
      checkSelect (row,index) {
        let isChecked = true;
        console.log(row.finish)
        if (row.finish === 'true') { // 判断里面是否存在某个参数
          isChecked = false
        } else {
          isChecked = true
        }
        return isChecked
      },
       async updateck(){
        const {data: res} = await this.http.post("/updateck",this.multipleSelection)
         if(res.status==10){        this.$message.success("更新成功");
           this.inforlist='';}
         else if(res.status==20){this.$message.error("请勾选")}


      },

    }
  }
</script>

<style scoped>

</style>
