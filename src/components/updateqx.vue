<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>

      <!--表格区域-->
      <el-table :data="inforlist.data" height="440" border stripe style="width: 649px">
        <el-table-column label="id" prop="id" width="200px" v-if="false"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="username" width="200px">
        </el-table-column>
        <el-table-column label="权限" prop="role" width="200px"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.username,scope.row.role,scope.row.id)">修改权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :data="inforlist"
                     layout="total"
                     :total="inforlist.count">
      </el-pagination>

      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="35%"
        >
        <el-form ref="form" :model="aj" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="aj.va1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-input v-model="aj.va2" :disabled="edit"></el-input>
          </el-form-item>
          <span style="margin-left: 0px;margin-bottom: 10px">将修改的权限</span>
          <el-select v-model="aj.va3" style="margin-bottom: 10px">
            <el-option value="super">super</el-option>
            <el-option value="normal">normal</el-option>
          </el-select>
          <el-form-item label="id" v-if="false">
            <el-input v-model="aj.va4" :disabled="edit" v-if="false"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="open(aj.va4,aj.va3)">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import FileSaver from 'file-saver';
  import xlsx from 'xlsx';

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
          va6: '',
          va7: '',
          q1: ''
        },
        readonly: true,
        edit: true,
        msgg: ''
      }
    },
    created() {
      this.getlist();
    },
    methods: {
      async getlist() {
        const {data: res} = await this.http.post("/findalluser")
        this.inforlist = res
      },
      async getsea() {
        const {data: res} = await this.http.post("/searyg", this.sea)
        this.inforlist = res
      },
      // 导出Excel表格
      exportExcell(name, tableName) {
        //name表示生成excel的文件名     tableName表示表格的id
        var sel = xlsx.utils.table_to_book(document.querySelector(tableName))
        var selIn = xlsx.write(sel, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([selIn], {type: 'application/octet-stream'}), name)
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, selIn)
        }
        return selIn
      },
      async getpassword(e) {
        await this.axios({
          url: 'findpwd',
          method: 'post',
          dataType: 'text',
          data: {
            e
          }
        }).then(res => {
          this.pwd = res.data.data
        })
      },

      show(a, b, c) {
        this.aj.va1 = a
        this.aj.va2 = b
        this.aj.va4 = c
        this.dialogVisible = true
      },
      updateqx(a, b) {
        this.axios({
          url: 'updateqx',
          method: 'post',
          dataType: 'text',
          data: {
            a, b
          }
        }).then(res => {
          this.getlist()
          this.$message.success("修改成功")
        })

      },
      open(a, b) {
        this.getpassword(a);
        this.$prompt('请输入要修改权限用户的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '密码格式不正确'
        }).then(({value}) => {
          this.aj.va3 = ''
          if (this.pwd == value) {
            this.updateqx(a, b)
            this.dialogVisible = false
          } else {
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
