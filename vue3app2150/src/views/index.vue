<script setup>
import https from "../utils/request";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { onMounted, reactive, ref } from "vue";
import {useRouter} from 'vue-router'
import MainHeader from '../components/MainHeader/MainHeader.vue'
import MainFooter from '../components/MainFooter/MainFooter.vue'

const router =useRouter()
const formState = reactive({
  author: "",
  isAscend: undefined,
  artifactName: "",
  currPage: 1,
  pageSize: 4,
  startTime: null,
  endTime: null,
});
const formState2 = reactive({
  keyword: "",
  currPage: 1,
  pageSize: 4,
});

const indexList = ref('1')
const total = ref(4)

const current1 = ref(1);
const list = ref([]);
const onChange = (value) => {
  indexList.value === '1' ?  submitSelectByKeyword(value) :submit(value)
};
const handleSelect = (value) => {
  let obj = {
    0: {
      startTime: "0",
      endTime: "1800",
    },
    1: {
      startTime: "1800",
      endTime: "1950",
    },
    2: {
      startTime: "1950",
      endTime: "2023",
    },
  };
  formState.startTime = obj[value].startTime;
  formState.endTime = obj[value].endTime;
};

//通过关键字搜索
const submitSelectByKeyword = (value) => {
  formState2.currPage = value || 1;
  indexList.value = '1'
  https({
    method: 'post',
    url: 'api/artifact/searchArtifact',
    data: formState2
  }).then((res) => {
    list.value = res.data?.data?.list;
    total.value = res.data?.data?.totalCount
  });
};
const submit = (value) => {
  indexList.value = '2'
  formState.currPage = value || 1;
  https
    .post("api/artifact/getArtifactsByDetail", { ...formState })
    .then((res) => {
      list.value = res.data?.data?.list;
      total.value = res.data?.data?.totalCount
    });
};

const handleGo=(artifactId)=>{
    router.push({path:'/antiqueDetail',query:{id:artifactId}})
}
onMounted(() => {
  submitSelectByKeyword()
});
</script>

<template>
  <MainHeader></MainHeader>
  <div class="content-box">

    <a-config-provider :locale="zhCN">
      <a-form :model="formState">
        <a-row :gutter="30">
          <a-col :md="12" :lg="6">
            <a-form-model-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input v-model:value="formState.author" placeholder="请输入作者">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="12" :lg="6">
            <a-form-model-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input v-model:value="formState.artifactName" placeholder="请输入名字">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="12" :lg="6">
            <a-form-item :wrapperCol="{ span: 24 }">
              <a-select v-model:value="formState.isAscend" placeholder="please select">
                <a-select-option value="0">时间升序</a-select-option>
                <a-select-option value="1">时间降序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :lg="6">
            <a-form-item :wrapperCol="{ span: 24 }">
              <a-select placeholder="please select" @change="handleSelect">
                <a-select-option value="0">古代</a-select-option>
                <a-select-option value="1">近代</a-select-option>
                <a-select-option value="2">现代</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :lg="6">
            <a-form-item>
              <a-button type="primary" @click="submit(1)">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-form :model="formState2">
        <a-row :gutter="30">
          <a-col :md="12" :lg="6">
            <a-form-model-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input v-model:value="formState2.keyword" placeholder="请输入关键字">
              </a-input>
            </a-form-model-item>
          </a-col>

          <a-col :md="12" :lg="6">
            <a-form-item>
              <a-button type="primary" @click="submitSelectByKeyword(1)">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <!--      文物显示部分-->
      <a-row :getter="[30, 30]" v-if="list.length > 0">
        <a-col :md="8" :lg="6" v-for="item in list" :key="item.id">
          <a-card hoverable style="width: 240px">
            <template #cover >
              <img alt="baocuo" :src="item.imageUrl" @click="handleGo(item.id)"/>
            </template>
            <a-card-meta :title="item.author">
              <template #description>{{ item.artifactName }}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-row type="flex" justify="end" style="margin-top: 2rem" v-if="list.length > 0">
        <a-col :sm="24" :md="24" :xl="13" :xxl="11">
          <a-pagination show-quick-jumper :defaultPageSize="3" v-model:current="current1" :total="total"
            @change="onChange" :pageSizeOptions="[3, 6, 9, 12]" />
        </a-col>
      </a-row>
    </a-config-provider>

  </div>
  <MainFooter></MainFooter>
</template>

<style scoped>
.content-box {
  padding: 2rem;
}
</style>
