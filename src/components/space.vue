<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>个人中心</el-breadcrumb-item>
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


    <!--表格区域-->
    <el-table :data="inforlist.data" height="400" border stripe style="width: 1099px">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="用户" prop="inusername" width="150px"></el-table-column>
      <el-table-column label="物品名" prop="innamerecord" width="150px"></el-table-column>
      <el-table-column label="类型" prop="intyperecord" width="150px"></el-table-column>
      <el-table-column label="数量" prop="innumrecord" width="150px"></el-table-column>
      <el-table-column label="单位" prop="indanrecord" width="100px"></el-table-column>
      <el-table-column label="时间" prop="recordtime" width="200px"></el-table-column>
      <el-table-column label="出入库类型" prop="cktype" width="150px"></el-table-column>
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
          ajj: {
            vva1: '',
            vva2: '',
            vva3: '',
            vva4: ''
          },
          v: [],
          vv: [],
          chang: true,

        }
      },
      created() {
        this.getlist();
        this.sel();
      },
      methods: {
        async getlist() {
          const {data: res} = await this.http.post("/allinforrecord")
          this.inforlist = res
        },
        async getsea() {
          const {data: res} = await this.http.post("/searc", this.sea)
          this.inforlist = res
        },
        async jie() {
          const {data: res} = await this.http.post("/jjjie", this.aj)
          this.v = res
          if (res.status !== 200) return this.$message.error('出库失败');
          this.$message.success('出库成功');
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
        }
      },
    }
</script>

<style scoped>

</style>
