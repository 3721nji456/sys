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
      <el-table id="ruku" :data="inforlist.data" height="440" border stripe style="width: 1239px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="inname" width="150px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>物品名: {{ scope.row.inname }}</p>
              <p>货源: {{ scope.row.incompany }}</p>
              <div slot="reference">
                <span>{{ scope.row.inname }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="intype" width="150px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="150px"></el-table-column>
        <el-table-column label="单价" prop="indanjia" width="150px"></el-table-column>
        <el-table-column label="单位" prop="indan" width="150px"></el-table-column>
        <el-table-column label="货源" prop="incompany" width="150px"></el-table-column>
        <el-table-column label="最大值" prop="maxnum" width="150px"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.inname,scope.row.intype,scope.row.innum,scope.row.indanjia,scope.row.indan,scope.row.incompany,scope.row.maxnum)">编辑</el-button>
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
          <el-form-item label="物品名">
            <el-input v-model="aj.va1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="aj.va2" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="aj.vax" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="aj.q1" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="aj.va4" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="货源">
            <el-input v-model="aj.va5" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="警戒值">
            <el-input v-model="aj.vaxx"></el-input>
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
        infor:{
          data:[]
        },
        aj:{
          va1:'',
          va2:'',
          va3:'',
          va4:'',
          va5:'',
          va6:'',
          va7:'',
          q1:'',
          vax:'',
          vaxx:''
        },
        readonly: true,
        edit: true,
        msgg:''
      }
    },
    created() {
      this.getlist();
    },
    methods:{
      async getlist() {
        const {data: res} = await this.http.post("/allinfor")
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
        var selIn = xlsx.write(sel, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([selIn], { type: 'application/octet-stream' }), name)
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, selIn)
        }
        return selIn
      },
      exportExcel(){
        this.exportExcell("time.xlsx","#ruku")
      },
      show(a,b,c,g,d,e,f){
        this.aj.va1=a
        this.aj.va2=b
        this.aj.vax=c
        this.aj.q1=g
        this.aj.va4=d
        this.aj.va5=e
        this.aj.vaxx=f
        this.dialogVisible = true
      },
      async submit(){
        const {data: res} = await this.http.post("/updateinfor", this.aj)
        this.msgg=res
        if (res.status == 200) return this.$message.error('修改失败,警戒值必须大于0');
        this.$message.success('修改警戒值成功');
        this.dialogVisible = false
        await this.getlist()
      }
    }
  }
</script>

<style scoped>

</style>
