<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加供货商</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
  <el-form ref="form" :model="aj" label-width="100px" style="width: 35%">
    <el-form-item label="公司名称">
      <el-input v-model="aj.va1" style=""></el-input>
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input v-model="aj.va2" ></el-input>
    </el-form-item>
    <el-form-item label="公司法人">
      <el-input v-model="aj.va3" ></el-input>
    </el-form-item>
    <el-form-item label="法人电话">
      <el-input v-model="aj.va4" ></el-input>
    </el-form-item>
    <el-form-item label="联络人">
      <el-input v-model="aj.va5" ></el-input>
    </el-form-item>
    <el-form-item label="联络人电话">
      <el-input v-model="aj.va6" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
    </el-card>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            aj:{
              va1:'',
              va2:'',
              va3:'',
              va4:'',
              va5:'',
              va6:'',
              va7:'',
            },

          }
        },
      methods:{
          async submit(){
            const {data: res} = await this.http.post("/addcompany",this.aj)
            if(res.status==30) {this.$message.error('添加失败，请完整输入数据')}
            else if(res.status==40) {this.$message.error('公司名称重复，请重新输入')}
            else if(res.status==50) {this.$message.error('号码输入错误，不是11位')}
            else if(res.status==60) {this.$message.error('法人号码输入错误，不是11位')}
            else if(res.status==70) {this.$message.error('联络人号码输入错误，不是11位')}
            else {this.$message.success('添加成功');this.reset();}
          },
          reset(){
            this.aj=''
          },
      },
    }
</script>

<style scoped>

</style>
