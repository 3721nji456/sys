<template>
  <div id="child" style="height: 100%">
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div>
          <img src="../assets/home1.png" alt="" class="img">
          <span>库存管理系统</span>
        </div>
        <div class="inn">
          <img src="" id="im" style="width: 60px;height: 60px;border-radius: 30px">
<!--          <el-button @click="ccc">ccc</el-button>-->
          <span>{{nn.nname}}</span>
          <span>{{nn.nrole}}</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!--页面主题区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="togger-button" @click="toggerCollapse">||</div>
          <!--侧边栏菜单-->
          <el-menu unique-opened  :collapse="isCollapse" :collapse-transition="false" :router="true">
            <!-- 一级菜单-->
            <el-submenu index="1">
              <!-- 一级菜单模板区-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>操作库存</span>
              </template>

              <!-- 二级菜单-->
              <el-menu-item :index="'/ruku'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>入库</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="'/chuku'">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>出库</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="'/space'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>出入库记录</span>
                </template>
              </el-menu-item>
<!--              <el-menu-item :index="'/chuli'" v-show="can">-->
<!--                <template slot="title">-->
<!--                  &lt;!&ndash; 图标&ndash;&gt;-->
<!--                  <i class="el-icon-location"></i>-->
<!--                  &lt;!&ndash; 文本&ndash;&gt;-->
<!--                  <span>处理零库存</span>-->
<!--                </template>-->
<!--              </el-menu-item>-->
              <el-menu-item :index="'/xiangqing'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>物品详情</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="'/jinjie'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>警戒值设置</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <!-- 一级菜单模板区-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>个人中心</span>
              </template>

              <!-- 二级菜单-->

              <el-menu-item :index="'/tianjia'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>账号添加</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="'/img'">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>账号管理</span>
                </template>
              </el-menu-item>

              <el-menu-item :index="'/shanchu'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>删除账号</span>
                </template>
              </el-menu-item>

              <el-menu-item :index="'/updatepx'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>修改权限</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <!-- 一级菜单模板区-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>统计</span>
              </template>

              <!-- 二级菜单-->
              <el-menu-item :index="'/ascc'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>统计图</span>
                </template>
              </el-menu-item>
              <!-- 二级菜单-->
              <el-menu-item :index="'/kascc'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>趋势图</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/line'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>折线图</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/bing'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>占比图</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/ruchu'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>出入库图</span>
                </template>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="4">
              <!-- 一级菜单模板区-->
              <template slot="title" >
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>盘点</span>
              </template>

              <!-- 二级菜单-->
              <el-menu-item :index="'/pandian'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>盘点</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/daipandian'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>待盘点</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/panfinish'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>盘点记录</span>
                </template>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="5" >
              <!-- 一级菜单模板区-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>供货商管理</span>
              </template>

              <!-- 二级菜单-->
              <el-menu-item :index="'/companyinfor'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>供货商添加</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/companylist'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>供货商列表</span>
                </template>
              </el-menu-item>

            </el-submenu>


            <el-submenu index="6">
              <!-- 一级菜单模板区-->
              <template slot="title" >
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>物品管理</span>
              </template>

              <!-- 二级菜单-->
              <el-menu-item :index="'/goodsinfor'" >
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>添加物品信息</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单-->
              <el-menu-item :index="'/goodslist'" v-show="can">
                <template slot="title">
                  <!-- 图标-->
                  <i class="el-icon-location"></i>
                  <!-- 文本-->
                  <span>物品信息管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--右侧主体内容-->
        <el-main >

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


  export default {
    name: 'child',
    data() {
      return {
        infor: [],
        isCollapse: false,
        nn:{
          nname:'',
          nrole:'',
          newname:''
        },
        imgurl:'http://localhost:8080/image/',
        imm:'',
        img:'',
        rrole:'',
        can:false,
        nnc:'',
      }

    },
    created() {
      this.getlist();
      this.getnn();
      this.cc();
      this.rolee()
      this.ncn()
    },

    methods: {
      childmethod(){
        this.cc()
      },
      parentHandleclick() {
        this.cc()
      },
      logout() {
        window.sessionStorage.clear();
        this.$router.push("/login");
      },
      async getlist() {
        const {data: res} = await this.http.post("/allinfor")
        this.infor = res
      },
      toggerCollapse() {
        this.isCollapse= !this.isCollapse
      },
      async getnn(){
        const {data: res} = await this.http.post("/nn")
        this.nn = res
        window.sessionStorage.getItem("name");
      },

      ncn(){
        this.axios({
          url:'nn',
          method:'post',
          data:{
          },
          xhrField:{
            withCredentials:true
          }
        }).then(res=>{
          this.nnc=res
        })
      },

      async cc(){
        const {data: res} = await this.http.post("/selectimg")
        this.imm=res
        this.img=this.imgurl+res
        $("#im").attr('src', this.img);
      },
      async rolee(){
        const {data: res} = await this.http.post("/rol")
        this.rrole=res.role
        if(this.rrole==="super"){
          this.can=true
        }if(this.rrole==="normal") {
          this.can=false
        }
      },
      ccc(){
        var bb=1
        function aa(bb) {
          bb=2;
          alert(bb);
        }
        aa(bb);
        alert(bb)
        for(var i=0;i<3;i++){
          setTimeout(()=>console.log(i),1)
        }
      }
    },
    open() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    ab(){
      console.log("ssssssssss")
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;
    }

    span {
      margin-left: 15px;
    }
  }

  .img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .inn{
    position: absolute;
    right: 100px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .togger-button {
    background-color: rgba(106, 130, 151, 0.97);
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
