<template>
  <div v-show="bo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/infor' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>入库</el-breadcrumb-item>
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
<!--      <el-button type="primary" @click="chan" style="margin-bottom: 15px">切换入库</el-button>-->
      <!--选框区域-->
      <el-form v-show="chang">
        <span v-show="chang">类型：</span>
<!--        <el-select ref="aaj" v-show="chang" v-model="aj.va1" placeholder="请选择类型" style="margin-bottom: 15px;width:180px"-->
<!--                   @change="k">-->
<!--          <el-option-->
<!--            v-for="item in options.value1"-->
<!--            :key="item"-->
<!--            :label="item"-->
<!--            :value="item">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <el-select ref="aaj" v-show="chang" v-model="aj.va1" placeholder="请选择类型" style="margin-bottom: 15px;width:180px"
                   @change="newname">
          <el-option
            v-for="item in oj"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span v-show="chang">物品名：</span>
<!--        <el-select ref="aaj" v-show="chang" v-model="aj.va2" style="width:180px" placeholder="请选择物品名"-->
<!--                   @change="kk">-->
<!--          <el-option-->
<!--            v-for="item in op"-->
<!--            :key="item"-->
<!--            :label="item"-->
<!--            :value="item">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <el-select ref="aaj" v-show="chang" v-model="aj.va2" style="width:180px" placeholder="请选择物品名"
                   @change="newunitprice">
          <el-option
            v-for="item in op"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span v-show="chang">单价：</span>
        <!--        <el-input ref="aaj" v-show="chang" placeholder="请输入单价" v-model="aj.q1" style="width: 120px"-->
        <!--                  @change="c"></el-input>-->
        <el-select ref="aaj" v-show="chang" placeholder="请输入单价" v-model="aj.q1" style="width: 120px"
                   @change="newunit">
          <el-option
            v-for="item in po"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span v-show="chang">元</span>
        <span v-show="chang">单位：</span>
        <!--        <el-select ref="aaj" v-show="chang" v-model="aj.va4" style="width:120px" placeholder="请选择单位">-->
        <!--          <el-option-->
        <!--            v-for="item in opp"-->
        <!--            :key="item"-->
        <!--            :label="item"-->
        <!--            :value="item">-->
        <!--          </el-option>-->
        <!--        </el-select>-->
        <el-select ref="aaj" v-show="chang" v-model="aj.va4" style="width:120px" placeholder="请选择单位"
                   @change="newcompany">
          <el-option
            v-for="item in opp"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span v-show="chang">数量：</span>
        <el-input ref="aaj" v-show="chang" placeholder="请输入数量" v-model="aj.vax" style="width: 120px"
                  @change="c"></el-input>

        <br>
        <span v-show="chang">总价：</span>
        <el-input ref="aaj" v-show="chang" v-model="aj.q2" style="width: 120px;margin-bottom: 15px"
                  :disabled="edit"></el-input>
        <span v-show="chang">元</span>
        <span v-show="chang">货源：</span>
<!--        <el-select ref="aaj" v-show="chang" v-model="aj.va5" style=";width:120px" placeholder="请选择货源">-->
<!--          <el-option-->
<!--            v-for="item in options.value5"-->
<!--            :key="item"-->
<!--            :label="item"-->
<!--            :value="item">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <el-select ref="aaj" v-show="chang" v-model="aj.va5" style=";width:120px" placeholder="请选择货源">
          <el-option
            v-for="item in pop"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button type="info" v-show="chang" @click="jie">入库</el-button>
      </el-form>
      <el-form v-show="!chang">
        <span v-show="!chang">类型：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.vva2" placeholder="请输入类型"
                  style="margin-bottom: 15px;width: 180px;"></el-input>
        <span v-show="!chang">物品名：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.vva1" placeholder="请输入物品名"
                  style="margin-bottom: 15px;width: 180px"></el-input>
        <span v-show="!chang">数量：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.vvax" placeholder="请输入数量"
                  style="margin-bottom: 15px;width: 120px" @change="cheng"></el-input>
        <span v-show="!chang">单价：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.qq1" placeholder="请输入单位"
                  style="margin-bottom: 15px;width: 120px" @change="cheng"></el-input>
        <span v-show="!chang">元</span>
        <span v-show="!chang">单位：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.vva4" placeholder="请输入单位"
                  style="margin-bottom: 15px;width: 120px"></el-input>
        <br>
        <span v-show="!chang">总价：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.qq2" placeholder="" style="margin-bottom: 15px;width: 120px"
                  :disabled="edit"></el-input>
        <span v-show="!chang">元</span>
        <span v-show="!chang">货源：</span>
        <el-input ref="aaj" v-show="!chang" v-model="ajj.vva5" placeholder="请输入货源"
                  style="margin-bottom: 15px;width: 120px"></el-input>

        <el-button type="info" v-show="!chang" @click="jjie">入库</el-button>

      </el-form>
      <!--表格区域-->
      <el-table id="ruku" :data="inforlist.data" height="310" border stripe style="width: 1099px"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0px'}">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="物品名" prop="" width="200px">
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
        <el-table-column label="类型" prop="intype" width="200px"></el-table-column>
        <el-table-column label="数量" prop="innum" width="150px"></el-table-column>
        <el-table-column label="单价" prop="" width="150px">
          <template slot-scope="scope">
            <p>{{scope.row.indanjia}}</p>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="indan" width="150px"></el-table-column>

        <el-table-column label="总价" prop="intotal" width="200px"></el-table-column>
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
        options: {
          value1: '',
          value2: '',
          value4: '',
          value5: ''
        }
        ,
        aj: {
          va1: '',
          va2: '',
          va3: '',
          va4: '',
          va5: '',
          va6: '',
          va7: '',
          q1: '',
          q2: '',
          vax: ''
        },
        ajj: {
          vva1: '',
          vva2: '',
          vva3: '',
          vva4: '',
          vva5: '',
          vva6: '',
          vva7: '',
          qq1: '',
          qq2: '',
          vvax: '',
        },
        v: [],
        vv: [],
        chang: true,
        total: 0,
        op: '',
        opp: '',
        edit: true,
        oj:'',
        bo:'',
        po:'',
        pop:''
      }
    },
    created() {
      this.getlist();
      this.sel();
      this.getcount()
      this.newtype()
    },
    methods: {
      async getlist() {
        const {data: res} = await this.http.post("/allinfor")
        this.inforlist = res
      },
      cheng() {
        this.ajj.qq2 = this.ajj.vvax * this.ajj.qq1
      },
      c() {
        this.aj.q2 = this.aj.vax * this.aj.q1
      },
      async getsea() {
        const {data: res} = await this.http.post("/sear", this.sea)
        this.inforlist = res
      },
      async k() {
        const {data: res} = await this.http.post("/selectinforname", this.aj)
        this.op = res
        this.aj.va2 = ''
      },

      async kk() {
        const {data: res} = await this.http.post("/selectinfordan", this.aj)
        this.opp = res
        this.aj.va4 = ''
      },
      async sel() {
        const {data: res} = await this.http.post("/select")
        this.options = res
      },
      async jie() {
        const {data: res} = await this.http.post("/jie", this.aj)
        this.v = res
        if (res.status == 1) return this.$message.error('请选择类型');
        if (res.status == 2) return this.$message.error('请选择物品名');
        if (res.status == 3) return this.$message.error('请输入数量');
        if (res.status == 4) return this.$message.error('请输入单价');
        if (res.status == 5) return this.$message.error('请输入单位');
        if (res.status == 6) return this.$message.error('请输入货源');
        if (res.status == 201) return this.$message.error('入库失败,数量必须大于0');
        this.$message.success('入库成功');
        this.reset()
        await this.getlist()
        await this.sel()
      },
      async jjie() {
        const {data: res} = await this.http.post("/jjie", this.ajj)
        this.vv = res
        if (res.status == 1) return this.$message.error('请输入类型');
        if (res.status == 2) return this.$message.error('请输入物品名');
        if (res.status == 3) return this.$message.error('请输入数量');
        if (res.status == 4) return this.$message.error('请输入单价');
        if (res.status == 5) return this.$message.error('请输入单位');
        if (res.status == 6) return this.$message.error('请输入货源');
        if (res.status == 201) return this.$message.error('入库失败,数量必须大于0');
        this.$message.success('入库成功');
        this.reset()
        await this.getlist()
        await this.sel()
      },
      chan() {
        this.chang = !this.chang
        this.reset()
      },
      reset() {
        this.aj.va1 = ''
        this.aj.va2 = ''
        this.aj.va3 = ''
        this.aj.va4 = ''
        this.aj.va5 = ''
        this.aj.q1 = ''
        this.aj.q2 = ''
        this.ajj.vva1 = ''
        this.ajj.vva2 = ''
        this.ajj.vva3 = ''
        this.ajj.vva4 = ''
        this.ajj.vva5 = ''
        this.ajj.qq1 = ''
        this.ajj.qq2 = '',
          this.aj.vax = '',
          this.ajj.vvax = ''
      },

      // 导出Excel表格
      exportExcell(name, tableName) {
        //name表示生成excel的文件名     tableName表示表格的id
        var xlsxParam = {raw: true}
        var sel = xlsx.utils.table_to_book(document.querySelector(tableName), xlsxParam)
        var selIn = xlsx.write(sel, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([selIn], {type: 'application/octet-stream'}), name)
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, selIn)
        }
        return selIn
      },
      exportExcel() {
        this.exportExcell("time.xlsx", "#ruku")
      },
      async getcount(){
        const {data: res} = await this.http.post("/getcount")
        this.vas=res.count
        if(this.vas===0){
          this.bo=true
        }else {
          this.bo=false
        }
        console.log(this.vas)
      },
      async newtype() {
        const {data: res} = await this.http.post("/newtype", this.aj)
        this.oj = res
        this.aj.va2 = ''
        console.log(res)
      },

      async newname() {
        const {data: res} = await this.http.post("/newname", this.aj)
        this.op = res
        this.aj.va2 = ''
        this.aj.q1=''
        this.aj.va4=''
        this.aj.vax=''
        this.aj.q2=''
        this.aj.va5=''
        console.log(res)
      },

      async newunitprice() {
        const {data: res} = await this.http.post("/newunitprice", this.aj)
        this.po = res
        this.aj.q1=''
        this.aj.va4=''
        this.aj.vax=''
        this.aj.q2=''
        this.aj.va5=''
        console.log(res)
      },

      async newunit() {
        const {data: res} = await this.http.post("/newunit", this.aj)
        this.opp = res
        this.aj.va4=''
        this.aj.vax=''
        this.aj.q2=''
        this.aj.va5=''
        console.log(res)
      },
      async newcompany() {
        const {data: res} = await this.http.post("/newcompany", this.aj)
        this.pop = res
        this.aj.vax=''
        this.aj.q2=''
        this.aj.va5=''
        console.log(res)
      },
    }
  }
</script>

<style scoped>

</style>
