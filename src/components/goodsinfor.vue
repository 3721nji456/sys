<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加物品信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="aj" label-width="100px" style="width: 35%">
        <el-form-item label="物品名称">
          <el-input v-model="aj.va1" style=""></el-input>
        </el-form-item>
        <el-form-item label="物品类型">
          <el-input v-model="aj.va2" ></el-input>
        </el-form-item>
        <el-form-item label="物品单价">
          <el-input v-model="aj.va3" ></el-input>
        </el-form-item>
        <el-form-item label="物品单位">
          <el-input v-model="aj.va4" ></el-input>
        </el-form-item>
        <el-form-item label="供应商">
        <el-select  v-model="aj.va5"  placeholder="请选择物供应商">
          <el-option
            v-for="item in op"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
        op: {
          value1:''
        },
      }
    },
    created() {
      this.selcom()
    },
    methods:{
      async submit(){
        const {data: res} = await this.http.post("/addgoods",this.aj)
        if(res.status==30) {this.$message.error('添加失败，物品名重复')}
        else {this.$message.success('添加成功');this.reset();}
      },
      reset(){
        this.aj.va1=''
        this.aj.va2=''
        this.aj.va3=''
        this.aj.va4=''
        this.aj.va5=''

      },
      async selcom(){
        const {data: res} = await this.http.post("/selcom")
        this.op=res
        console.log(res)
        console.log(this.op)
      },
    },
  }
</script>

<style scoped>

</style>
