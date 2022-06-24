<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <form action="http://192.168.88.238:8080/imageUpload" method="post" enctype="multipart/form-data" charset=utf-8 target="iframe">-->
<!--      <p @click="upimage">从相册中选取</p>-->
<!--      <input type="file" ref="fileInput"  @change="getFile" style="display: none" name="fileName" id="filename" accept="image/png, image/jpeg, image/jpg">-->
<!--          <img id="img" src="" STYLE="width: 200px;height: 200px">-->
<!--        <input type="submit" @click="onUpload" value="上传">-->
<!--    </form>-->
<!--    <iframe id="frame" name="iframe" style="display:none;" ></iframe>-->
    <el-card class="elc1" style="width: 240px">
        <h1 class="p" style="text-align: center">上传头像</h1>
    <form action="http://localhost:8080/imageUpload" method="post" enctype="multipart/form-data" target="iframe" id="immg">
      <input class="file" type="file" name="fileName" id="filename" accept="image/png, image/jpeg, image/jpg"
             @change="onLoadImage();">
      <div id="onLoadImage" style="height: 120px;width: 120px;border: solid #000000;margin-left: 40px">
      </div>
      <el-button type="primary" class="bb1" id="submitBtn" @click="checkSubmit()" >上传</el-button>
    </form>
    <iframe id="frame" name="iframe" style="display:none;"></iframe>
    </el-card>
    <el-card class="elc2">
      <h1>修改密码</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpass" style="width: 400px">
          <el-input v-model="ruleForm.oldpass" show-password></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="width: 400px">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width: 400px">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <div id="parent">
      <el-button round @click="toChild"  type="primary" style="margin-left: 200px;height: 60px">刷新头像</el-button>
      <child ref="child" v-show="false"></child>
    </div>
  </div>


</template>

<script>
  import {Axios as axios} from "axios";
  import child from "../components/home"
  export default {
    name: 'parent',
    components:{child},
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
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
        userImg: '',  // 头像
        changeimage: '',
        name: '',
        image: '',
        ruleForm: {
          oldpass:'',
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          oldpass: [
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

      toChild(){
        /** this.$refs.child返回child组件实例 **/
        // this.$refs.child.childmethod()
        this.$refs.child.cc()
      },


      qwde(){
        console.log("134")
      },

// // 第一步
// //从相册中上传
//       upimage() {
//         this.$refs.fileInput.click();
//       },
// //第二部 预览图片
//       getFile(event) {
//         const files = event.target.files
//         let filename = files[0].name          //只有一个文件
//         if (filename.lastIndexOf('.') <= 0) {
//           return alert("Please add a valid image!")        //判断图片是否有效
//         }
//         const fileReader = new FileReader()                //内置方法new           	     FileReader()   读取文件
//         fileReader.addEventListener('load', () => {
//           this.userImg = fileReader.result
//           document.getElementById("img").src = this.userImg
//         })
//
//         fileReader.readAsDataURL(files[0])
//         this.image = files[0]
//
// //到这里后, 选择图片就可以显示出来了
//         this.changeimage = false;    // 点击查看头像关闭选项
//       },
//
// //第四步: 上传文件了
//       onUpload() {
//
//         let fd = new FormData()              //内置方法new FormData()  新建一个表格
//         fd.append('file', this.image)          //把image添加进去
//                                     //(       第二次有效打印           )
//         this.http.post("/imageUpload", this.filename).then(res => {                 //第一个参:this.postUrl就是上面保存好的要上传的地址           //(      第三次有效打印    )
//           window.reload()
//           if (res.status === 200 && res.data) {
//             let data = res.data.data
//             let imageUrl = data.url                                        //上传成功 , 后台返回了一个图片地址
//             this.imageUrl = imageUrl
//           }
//         }).catch(error => {
//           console.log(error)
//         })
//       },


      //检查图片
      checkImage() {
        var fileName = $("#filename").val();
        fileName = fileName.replace("E://eeee//canku//src//main//resources//static//image//", "");
        var flag = true;
        if (fileName == "") {
          flag = false;
          alert("请选择图片");
        } else {
          var size = $("#filename")[0].files[0].size;
          if (size / 1000 > 5000) {
            flag = false;
            alert("图片大小不能超过5000KB");
          }
        }
        if (!flag)
          $("#filename").val("");
        return flag;
      },

      //预览图片
      onLoadImage() {

        if (this.checkImage()) {
          var file = $('#filename').get(0).files[0];
          var reader = new FileReader();
          //将文件以Data URL形式读入页面
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            console.log(this.result)
            //显示文件
            $("#onLoadImage").html('<img src="' + this.result + '" alt="" ' + 'style="height: 120px;width: 120px;"/>');

          }
        }

      },

      //上传图片
      checkSubmit() {
        if (this.checkImage()) {
          $("#submitBtn").attr('type', 'submit');
          this.$message.success('上传成功');
          $("#onLoadImage").html('<img src=">');
        } else {
          $("#submitBtn").attr('type', 'button');
        }
      },


      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const {data: res} = await this.http.post("pass", this.ruleForm);
            if (res.status == 200)this.$message.success('修改成功'); this.resetForm(formName);
            if (res.status == 300)this.$message.error('修改失败,原密码错误');
            if (res.status == 301)this.$message.error('原密码和新密码不能相同');

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
  .file{  left:63px; top:85px; height:120px; filter:alpha(opacity:0);opacity: 0;width:120px;
    position: absolute;
  }
  .el-button{
    position: relative; left: 70px;top:10px;
  }
  .elc1{
    margin: 0 0 0 0;
    position: absolute;
  }
  .elc2{
    position: absolute;left: 460px;width: 600px;height: 400px;top:200px;
  }

</style>
