<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理零库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="zerolist.data" height="400" border stripe style="width: 849px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="inid" width="200px" v-if="false"></el-table-column>
        <el-table-column label="物品名" prop="inname" width="200px"></el-table-column>
        <el-table-column label="类型" prop="intype" width="200px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="100px"></el-table-column>
        <el-table-column label="单位" prop="indan" width="100px"></el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          　　　　<template slot-scope="scope">
          　　　　　　<el-button type="info" @click="deleteb(scope.row.inid)">删除</el-button>
          　　　　</template>
          　　</el-table-column>
      </el-table>
      <el-pagination :data="zerolist"
                     layout="total"
                     :total="zerolist.count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            zerolist:'',
            count:0
          }
        },
      created() {
          this.getzero()
      },
      methods:{
        getzero(){
          this.axios({
            url:'numberzero',
            method:'post'
          }).then(res=>{
            this.zerolist=res.data
          })
        },
        deleteb(e){
          this.axios({
            url:'delete',
            method:'post',
            dataType: 'text',
            data:{
              e
            }
          }).then(res=>{
            this.getzero()
            this.$message.success("删除成功")
          })

        }
      }
    }
</script>

<style scoped>

</style>
