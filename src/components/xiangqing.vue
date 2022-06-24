<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="sea.name" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getsea"></el-button>
          </el-input>
        </el-col>
        <el-button type="primary" @click="exportExcel()" value="导出">导出为excel表格</el-button>
      </el-row>
      <!--表格区域-->
      <el-table id="xiangqing" :data="inforlist.data" height="430" border stripe style="width: 1249px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="inname" width="200px">

        </el-table-column>
        <el-table-column label="类型" prop="intype" width="200px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="150px"></el-table-column>
        <el-table-column label="单价" prop="indanjia" width="150px"></el-table-column>
        <el-table-column label="单位" prop="indan" width="150px"></el-table-column>
        <el-table-column label="总价" prop="intotal" width="150px"></el-table-column>
        <el-table-column label="货源" prop="incompany" width="200px"></el-table-column>

      </el-table>
      <el-pagination :data="inforlist"
                     layout="total"
                     :total="inforlist.count">
      </el-pagination>

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
          va5: ''
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
        const {data: res} = await this.http.post("/allinfor")
        this.inforlist = res
      },
      async getsea() {
        const {data: res} = await this.http.post("/seary", this.sea)
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
      exportExcel() {
        this.exportExcell("time.xlsx", "#xiangqing")
      },
      show(a, b, c, d, e) {
        this.aj.va1 = a
        this.aj.va2 = b
        this.aj.va3 = c
        this.aj.va4 = d
        this.aj.va5 = e
        this.dialogVisible = true
      },
      async submit() {
        const {data: res} = await this.http.post("/updateinfor", this.aj)
      }
    }
  }
</script>

<style scoped>

</style>
