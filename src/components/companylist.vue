<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供货商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="com.name" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getsea"></el-button>
          </el-input>
        </el-col>
        <el-button type="primary" @click="exportExcel()" value="导出">导出为excel表格</el-button>
      </el-row>
      <!--表格区域-->
      <el-table id="xiangqing" :data="inforlist.data" height="430" border stripe style="width: 1249px">
        <el-table-column type="index"></el-table-column>
        <el-table-column v-if="false" label="id" prop="id" width="200px"></el-table-column>
        <el-table-column label="供货商名称" prop="companyname" width="200px">

        </el-table-column>
        <el-table-column label="供货商地址" prop="companyposition" width="200px"></el-table-column>
        <el-table-column label="公司法人" prop="cor" width="150px"></el-table-column>
        <el-table-column label="法人电话" prop="corphone" width="150px"></el-table-column>
        <el-table-column label="联络人" prop="liaison" width="150px"></el-table-column>
        <el-table-column label="联络人电话" prop="liphone" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.companyname,scope.row.companyposition,scope.row.cor,scope.row.corphone,scope.row.liaison,scope.row.liphone,scope.row.id)">
              编辑
            </el-button>
            <el-button type="danger" @click="open(scope.row.id)">删除</el-button>
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
        <el-form ref="form" :model="aj" label-width="100px">
          <el-form-item label="公司名称">
            <el-input v-model="aj.va1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="aj.va2"></el-input>
          </el-form-item>
          <el-form-item label="法人名称">
            <el-input v-model="aj.va3"></el-input>
          </el-form-item>
          <el-form-item label="法人电话">
            <el-input v-model="aj.va4"></el-input>
          </el-form-item>
          <el-form-item label="联络人">
            <el-input v-model="aj.va5"></el-input>
          </el-form-item>
          <el-form-item label="联络人电话">
            <el-input v-model="aj.va6"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import xlsx from "xlsx";

  export default {
    data() {
      return {
        inforlist: {
          data: [],
          count: 0,
        },
        com: {
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
        },
        readonly: true,
        edit: true,
      }
    },
    created() {
      this.getlist();
    },
    methods: {
      async getlist() {
        const {data: res} = await this.http.post("/findAllcompany")
        this.inforlist = res
        console.log(this.inforlist)
      },
      async getsea() {
        const {data: res} = await this.http.post("/searchcompany", this.com)
        this.inforlist = res
        console.log(this.inforlist)
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
      exportExcel() {
        this.exportExcell("time.xlsx", "#xiangqing")
      },
      show(a, b, c, d, e, f, h) {
        this.aj.va1 = a
        this.aj.va2 = b
        this.aj.va3 = c
        this.aj.va4 = d
        this.aj.va5 = e
        this.aj.va6 = f
        this.aj.va7 = h
        this.dialogVisible = true
      },
      async submit() {
        const {data: res} = await this.http.post("/updatecompany", this.aj)

        if (res.status == 50) {
          this.$message.error('号码输入错误，不是11位')
        } else if (res.status == 60) {
          this.$message.error('法人号码输入错误，不是11位')
        } else if (res.status == 70) {
          this.$message.error('联络人号码输入错误，不是11位')
        } else {
          this.$message.success('添加成功');
          this.dialogVisible = false
          this.reset();
        }
        await this.getlist()
      },
      deleteb(e){
        this.axios({
          url:'deletec',
          method:'post',
          dataType: 'text',
          data:{
            e
          }
        }).then(res=>{
          this.getlist()
        })
      },
      open(e) {
        this.$confirm('此操作将永久删除该库存信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteb(e)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
