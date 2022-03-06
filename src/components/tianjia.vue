<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="elc2">
      <h1>账号添加</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="use" style="width: 400px">
          <el-input v-model="ruleForm.use"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="width: 400px">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width: 400px">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select    v-model="ruleForm.role" placeholder="请选择类型" style="margin-bottom: 15px">
            <el-option
              :key="no"
              :label="no"
              :value="no">
            </el-option>
            <el-option
              :key="mo"
              :label="mo"
              :value="mo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          use:'',
          pass: '',
          checkPass: '',
          role:''
        },
          no:'normal',
          mo:'super',
        rules: {
          use: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {


      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const {data: res} = await this.http.post("save", this.ruleForm);
            if (res.status == 200) return this.$message.success('添加成功'); this.resetForm(formName)
            if (res.status == 300)this.$message.error('添加失败,用户已存在');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    }


  }

</script>

<style scoped>

</style>
