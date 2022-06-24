<template>
  <div v-show="bo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>盘点</el-breadcrumb-item>
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
        <el-button type="primary" @click="exportExcel()" value="导出">导出为excel表格</el-button>
        <el-button type="primary" @click="c">生成盘点表</el-button>
      </el-row>
      <!--表格区域-->
      <el-table id="pandian" :data="inforlist.data" height="430" border stripe style="width: 1249px" @selection-change="handleSelectionChange">
        <el-table-column  type="selection" width="55" ></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="inname" width="200px"></el-table-column>
        <el-table-column label="类型" prop="intype" width="200px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="150px"></el-table-column>
        <el-table-column label="单价" prop="indanjia" width="150px"></el-table-column>
        <el-table-column label="单位" prop="indan" width="150px"></el-table-column>
        <el-table-column label="总价" prop="intotal" width="150px"></el-table-column>
        <el-table-column label="货源" prop="incompany" width="200px"></el-table-column>

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
      name: 'child',
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
            va5: ''
          },
          readonly: true,
          edit: true,
          multipleSelection:[],
          bo:true,
          vas:'2333'
        }
      },
      created() {
        this.getlist()
        this.getcount()
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        async getlist() {
          const {data: res} = await this.http.post("/allinfor")
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
          this.$message.success("生成成功")
          this.getlist()
        },
        gcg(){
          const {data: res} =  this.http.post("/gcg",this.multipleSelection)
        },
        cc(){
          console.log("一眼顶针");
          console.log(this.vas)
        },
        async getcount(){
          const {data: res} = await this.http.post("/getcount")
          this.vas=res.count
          if(this.vas===0){
            this.bo=true
          }else {
            this.bo=false
          }
          console.log(this.vas)
        }
      }
    }
</script>

<style scoped>

</style>
