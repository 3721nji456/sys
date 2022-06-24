<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>删除账号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="userlist.data" height="400" border stripe style="width: 649px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="id" prop="id" width="200px" v-if="false"></el-table-column>
        <el-table-column label="用户名" prop="username" width="200px"></el-table-column>
<!--        <el-table-column label="密码" prop="password" width="200px"></el-table-column>-->
        <el-table-column label="权限" prop="role" width="200px"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          　　　　<template slot-scope="scope">
          　　　　　　<el-button type="danger" @click="open(scope.row.id)">删除</el-button>
          　　　　</template>
          　　</el-table-column>
      </el-table>
      <el-pagination :data="userlist"
                     layout="total"
                     :total="userlist.count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  //deleteb(scope.row.id)
  export default {
    data(){
      return{
        userlist:'',
        count:0,
        num:123,
        pwd:'',
        p:''
      }
    },
    created() {
      this.getzero()
    },
    methods:{
      getzero(){
        this.axios({
          url:'alluser',
          method:'post'
        }).then(res=>{
          this.userlist=res.data
        })
      },
      deleteb(e){
        this.axios({
          url:'deleteUserById',
          method:'post',
          dataType: 'text',
          data:{
            e
          }
        }).then(res=>{
          this.getzero()
          this.$message.success("删除成功")
        })

      },
      async getpassword(e){
        await this.axios({
          url:'findpwd',
          method:'post',
          dataType: 'text',
          data:{
            e
          }
        }).then(res=>{
          this.pwd=res.data.data
        })
      },

      open(e) {
        this.getpassword(e);
        this.$prompt('请输入要删除用户的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          if(this.pwd==value){
            this.deleteb(e)
          }else{
            this.$message({
              type: 'error',
              message: '密码错误'
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
