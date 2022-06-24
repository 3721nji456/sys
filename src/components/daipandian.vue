<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>带盘点</el-breadcrumb-item>
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
      </el-row>
      <!--表格区域-->
      <el-table id="pandian" :data="inforlist.data" height="430" border stripe style="width: 1249px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="goods" width="180px"></el-table-column>
        <el-table-column label="类型" prop="type" width="100px"></el-table-column>
        <el-table-column label="单价" prop="danjia" width="200px"></el-table-column>
        <el-table-column label="单位" prop="danwei" width="40px"></el-table-column>
        <el-table-column label="货源" prop="company" width="195px"></el-table-column>
        <el-table-column label="数量" prop="num" width="150px"></el-table-column>
        <el-table-column label="盘点数量" prop="hesuan" width="150px"></el-table-column>
        <el-table-column v-if="false" label="time" prop="time" width="150px" ></el-table-column>
        <el-table-column v-if="false" label="total" prop="total" width="150px" ></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.goods,scope.row.type,scope.row.num,scope.row.danjia,scope.row.danwei,scope.row.company,scope.row.hesuan,scope.row.time)">核算数量</el-button>
          </template>
        </el-table-column>


      </el-table>
      <el-pagination :data="inforlist"
                     layout="total"
                     :total="inforlist.count">
      </el-pagination>

      <el-button type="primary" @click="finish">完成盘算</el-button>

      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="35%"
      >
        <el-form ref="form" :model="aj" label-width="80px">
          <el-form-item label="物品名">
            <el-input v-model="aj.va1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="aj.va2" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="aj.vax" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="aj.q1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="aj.va4" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="货源">
            <el-input v-model="aj.va5" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="盘点数量">
            <el-input v-model="aj.vaxx"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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

      }
    },
    created() {
      this.getlist()
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      async getlist() {
        const {data: res} = await this.http.post("/getpan")
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
      async finish() {
        const {data: res} = await this.http.post("/finish", this.multipleSelection)
        if(res.status==20){this.$message.error("请完成数量盘点")}
        else if(res.status==10){        this.$message.success("成功")}
        console.log(res)
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
      async submit(){
        const {data: res} = await this.http.post("/updatepan", this.aj)
        this.msgg=res
        if (res.status == 200) return this.$message.error('修改失败,盘点数数必须大于等于0');
        this.$message.success('盘点数量录入成功成功');
        this.dialogVisible = false
        await this.getlist()
      }
    }
  }
</script>

<style scoped>

</style>
