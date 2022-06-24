<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品信息管理</el-breadcrumb-item>
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
        <el-table-column label="物品名称" prop="goodsname" width="200px">

        </el-table-column>
        <el-table-column label="物品类型" prop="goodstype" width="200px"></el-table-column>
        <el-table-column label="物品单价" prop="unitprice" width="150px"></el-table-column>
        <el-table-column label="物品单位" prop="unit" width="150px"></el-table-column>
        <el-table-column label="供应商" prop="goodscom" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.goodsname,scope.row.goodstype,scope.row.unitprice,scope.row.unit,scope.row.goodscom,scope.row.id)">
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
        <el-form ref="aj" :model="aj" :rules="rules" label-width="100px">
          <el-form-item label="物品名称" prop="va1">
            <el-input v-model="aj.va1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="物品地址" prop="va2">
            <el-input v-model="aj.va2"></el-input>
          </el-form-item>
          <el-form-item label="物品单价" prop="va3">
            <el-input v-model="aj.va3"></el-input>
          </el-form-item>
          <el-form-item label="物品单位" prop="va4">
            <el-input v-model="aj.va4"></el-input>
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
<!--          <el-form-item label="供应商" prop="va5">-->
<!--            <el-input v-model="aj.va5"></el-input>-->
<!--          </el-form-item>-->
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
        rules:{
          va1:[{required:true,message:'请输入',trigger:'blur'}],
          va2:[{required:true,message:'请输入',trigger:'blur'}],
          va3:[{required:true,message:'请输入',trigger:'blur'}],
          va4:[{required:true,message:'请输入',trigger:'blur'}],
          va5:[{required:true,message:'请输入',trigger:'blur'}],
          va6:[{required:true,message:'请输入',trigger:'blur'}],
        },
        readonly: true,
        edit: true,
        op:'',
      }
    },
    created() {
      this.getlist();
      this.selcom();
    },
    methods: {
      async getlist() {
        const {data: res} = await this.http.post("/findAllgoods")
        this.inforlist = res
        console.log(this.inforlist)
      },
      async getsea() {
        const {data: res} = await this.http.post("/searchgoods", this.com)
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
      show(a, b, c, d, e, f) {
        this.aj.va1 = a
        this.aj.va2 = b
        this.aj.va3 = c
        this.aj.va4 = d
        this.aj.va5 = e
        this.aj.va6 = f
        this.dialogVisible = true
      },
      async submit() {
        const {data: res} = await this.http.post("/updategoods", this.aj)

        if (res.status == 10) {
          this.$message.success('编辑成功');
          this.dialogVisible = false
          this.reset();
          await this.getlist()
        }else {
          this.$message.error('信息重复')
        }

      },
      async selcom(){
        const {data: res} = await this.http.post("/selcom")
        this.op=res
        console.log(res)
        console.log(this.op)
      },
      deleteb(e){
        this.axios({
          url:'deleteg',
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
