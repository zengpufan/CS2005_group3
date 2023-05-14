<template xmlns:el-row="http://www.w3.org/1999/html" xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <MainHeader></MainHeader>
    <!--  左侧为当前文物和评论区，右侧为推荐文物  -->
    <el-row>
      <!--  左侧文物和评论区: 上面是文物和详情，下面是评论区    -->
      <el-col :span="18">
        <!--  上面文物和详情: 左侧文物，右侧详情-->
        <el-row type="flex">
          <!--   文物介绍       -->
          <el-col :span="12">
            <el-card style>
              <!--文物图片-->
              <div class="block">
                <span class="demonstration"></span>
                <el-image-viewer
                    v-if="imgViewerVisible"
                    @close="()=>{this.imgViewerVisible = false;}"
                    :url-list="imgList"
                />
                <img alt="q" :src="currentArtifact.pic" class="image" @click="showImgViewer">
              </div>

              <div style="padding: 100px;">
                <!--文物信息-->
                <span>文物名称: {{ currentArtifact.name }}</span>
                <br>
                <span>作者: {{ currentArtifact.author }}</span>
                <br>
                <span>文物时期: {{ currentArtifact.period }}</span>
                <br>
                <span>文物详情访问这：
          <a v-bind:herf="currentArtifact.url" @click="toSourceWebsite( currentArtifact.url)">原地址</a>
        </span>

                <!--收藏功能-->
                <div class="bottom clearfix">
                  <el-button type="primary" @click="changeButton" v-if="!isStared">
                    收藏
                    <i class="el-icon-star-off"></i>
                  </el-button>
                </div>
                <div class="bottom clearfix">
                  <el-button type="primary" @click="changeButton" v-if="isStared">
                    已收藏
                    <i class="el-icon-star-on"></i>
                  </el-button>
                </div>
                <span>共有{{ this.starCount }}次收藏</span>

              </div>
            </el-card>
          </el-col>
          <!--   详情介绍       -->
          <el-col :span="12">
            <el-card style="height: 100%">
              <span>详细介绍 : </span>
              <br>
              <span class="author-name">{{ currentArtifact.description }} </span>
            </el-card>
          </el-col>
        </el-row>
        <!--  评论区  -->
        <div>
          <div
              v-for="(item, i) in comments"
              :key="i"
              class="author-title reply-father"
          >
            <div class="author-info">
              <span class="author-name">用户id : {{ item.userId }}</span>
              <span class="author-info">{{ item.content }}</span>
              <span class="author-time">发布于 : {{ item.time }}</span>
            </div>

          </div>
          <div @click="inputFocus" v-clickoutside="hideReplyBtn" class="my-reply">
            <div class="reply-info">
              <div
                  tabindex="0"
                  contenteditable="true"
                  id="replyInput"
                  spellcheck="false"
                  placeholder="想不想输入评论?"
                  class="reply-input"
                  @focus="showReplyBtn"
                  @input="onDivInput($event)"
              ></div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
              <el-button
                  class="reply-btn"
                  size="medium"
                  @click="sendComment"
                  type="primary"
              >
                发表评论
              </el-button>
            </div>          <!--发表评论按钮-->
          </div>
        </div>
      </el-col>

      <!--  右侧推荐文物    -->
      <el-col :span="6">
        <!--        <el-card style="height: 100%">-->
        <span>相关文物推荐</span>
        <el-col :getter="[30, 30]" v-if="similarArtifacts.length > 0">
          <el-row :md="8" :lg="6" v-for="item in similarArtifacts" :key="item.id">
            <a-card hoverable style="width: 240px">
              <template #cover>
                <img alt="baocuo" :src="item.imageUrl" @click="toDetailPage(item.id)"/>
              </template>
              <a-card-meta :title="item.author">
                <template #description>{{ item.artifactName }}</template>
              </a-card-meta>
            </a-card>
          </el-row>
        </el-col>
        <!--        </el-card>-->
      </el-col>

    </el-row>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import {onMounted, reactive, ref} from "vue";
import MainHeader from '../components/MainHeader/MainHeader.vue'
import MainFooter from '../components/MainFooter/MainFooter.vue'
import axios from 'axios'
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'
import {ElImageViewer} from "element-plus";
// import Router from "@/router";
let storage = window.localStorage
// let that=this;
// const toDetailPage = (artifactId) => {
//   const router = useRouter();
//   router.push({path: '/antiqueDetail', query: {id: artifactId}})
// }
export default {
  name: 'antiqueDetail',
  components: {MainFooter, MainHeader, ElMessage, ElImageViewer},
  data() {
    return {
      isStared: 0,
      starCount: 12,
      currentArtifact: {
        name: '默认名称',
        pic: 'src/assets/timg.jpeg',
        period: '100-1-1',
        url: 'www.baidu.com',
        id: '0',
        description: 'none',
        author: 'me'
      },
      btnShow: false,
      replyComment: '',
      myName: 'GQS',
      //myId: 12,
      comments: [],
      form: {
        rid: '',
        uid: ''
      },
      form2: {
        rid: '',
        uid: ''
      },
      commentForm: {
        rid: '',
        uid: '',
        content: ''
      },
      similarArtifacts: [],
      imgViewerVisible: false,
      imgList: []
    }
  },
  created() {
    this.pageInit()
  },
  methods: {
    // //点击图片跳转到详情页面
    toDetailPage(id) {
      // let _this = this
      //this.router=useRouter();

      this.$router.replace({path: '/antiqueDetail', query: {id: id}});
      //router.push({path: '/antiqueDetail', query: {id: id}})
    },
    //点击连接跳转到原网站
    toSourceWebsite(url) {
      let path = url
      window.location.href = url
    },
    pageInit() {
      const route = useRoute();
      this.form.rid = route.query.id;
      this.form.uid = storage.getItem('username')

      this.commentForm.uid = storage.getItem('username')
      this.commentForm.rid = this.form.rid

      //获取文物主体文物的信息和图片
      axios.post('api/artifact/getArtifactById', {id: this.form.rid}).then((response) => {
        //console.log(response.data);
        this.currentArtifact.name = response.data.data.artifactName;
        this.currentArtifact.pic = response.data.data.imageUrl;
        this.currentArtifact.period = response.data.data.relicTime;
        this.currentArtifact.url = response.data.data.moreUrl;
        this.currentArtifact.id = response.data.data.id;
        this.currentArtifact.description = response.data.data.description;
        this.currentArtifact.author = response.data.data.author;
        this.imgList.push(response.data.data.imageUrl);
        //console.log(this.currentArtifact)
        this.isStared = this.currentArtifact.if_collect
      }).catch(function (error) {
        console.log(error)
      });

      //获取文物的评论
      axios.get('/api/artifactcomment/all.do', {params: {ArtifactId: this.form.rid}}).then((response) => {
        console.log(response.data);
        this.comments = response.data?.data?.data
      }).catch(function (error) {
        console.log(error)
      })

      //获取相似的文物
      axios.post('/api/artifact/getSimilarArtifactsById',
          {currPage: 1, pageSize: 3, id: this.form.rid})
          .then((response) => {
            this.similarArtifacts = response.data.data.list;
            //console.log(this.similarArtifacts);
          })
          .catch(function (error) {
                //console.log(this.currentArtifact.id);
                console.log("get similar artifact error")
                console.log(error);
              }
          )


    },
    changeButton() {
      //this.form2.rid = this.$route.query.id
      this.form2.rid = this.form.rid
      this.form2.uid = storage.getItem('username')
      this.isStared = !this.isStared;
      if (this.isStared == 1) {
        this.starCount += 1;
      } else {
        this.starCount -= 1;
      }

      if (this.currentArtifact.if_collect === 1) {
        axios.post('http://localhost:8085/user_admin/deleteCollect', this.form2// 注意数据是直接保存到json对象
        ).then((response) => {
              if (response.data.state === 200) {
                this.$message({
                  showClose: true,
                  type: 'warning',
                  message: '已取消收藏'
                })
                this.isStared = 0
                this.currentArtifact.if_collect = 0
              }
            }
        ).catch(function (error) {
          console.log(error)
        })
      } else {
        axios.post('controller/artifactFavorite/save.do', this.form2// 注意数据是直接保存到json对象
        ).then((response) => {
              if (response.data.state === 200) {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '收藏成功'
                })
                this.isStared = 1
                this.currentArtifact.if_collect = 1
              }
            }
        ).catch(function (error) {
          console.log(error)
        })
      }
    },
    inputFocus() {
      var replyInput = document.getElementById('replyInput')
      replyInput.style.padding = '8px 8px'
      replyInput.style.border = '2px solid blue'
      replyInput.focus()
    },
    showReplyBtn() {
      this.btnShow = true
    },
    hideReplyBtn() {
      var replyInput = document.getElementById('replyInput')
      this.btnShow = false
      replyInput.style.padding = '10px'
      replyInput.style.border = 'none'
    },
    //发表评论
    sendComment() {
      if (!this.replyComment) {
        ElMessage.error("评论不能为空")
      } else {
        let a = {}
        let input = document.getElementById('replyInput')
        let timeNow = new Date().getTime()
        let time = this.dateStr(timeNow)
        a.name = storage.getItem('username')
        a.content = this.replyComment
        a.time = time
        a.userId = this.form.uid
        this.comments.push(a)
        this.commentForm.content = a.content
        //this.replyComment = ''
        //input.innerHTML = ''
        axios.post('/api/controller/Artifactcomment/save.do',
            {artifactId: this.currentArtifact.id, content: this.replyComment}
            , {
              headers: {'token': storage.getItem("token")}
            }
        ).then((response) => {
          // console.log(storage.getItem("token"))
          // console.log(this.replyComment);
          // console.log(this.currentArtifact.id);
          // console.log("resp:\n" + response);
          if (response.data.code == 0) {
            ElMessage.success('评论成功！')
            input.innerHTML = '';
            //this.$router.go(0)
          }
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      }

    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML
    },
    dateStr(date) {
      // 获取js 时间戳
      var time = new Date().getTime()
      // 去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000)
      // 存储转换值
      var s
      if (time < 60 * 10) {
        // 十分钟内
        return '刚刚'
      } else if (time < 60 * 60 && time >= 60 * 10) {
        // 超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        // 超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        // 超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
      } else {
        // 超过30天ddd
        var date2 = new Date(parseInt(date))
        return (
            date2.getFullYear() +
            '/' +
            (date2.getMonth() + 1) +
            '/' +
            date2.getDate()
        )
      }
    },
    showImgViewer() {
      this.imgViewerVisible = true;
      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'hidden';
      document.addEventListener("touchmove", m, false); // 禁止页面滑动

    },
    closeImgViewer() {
      console.log("close clicked");
      this.imgViewerVisible = false;
      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'auto';
      document.removeEventListener("touchmove", m, true);
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 300px;
  height: 300px;
}

.my-reply {
  padding: 10px;
  background-color: #fafbfc;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;
    //根据屏幕宽度自适应
    //@media screen and(max-width:1200px) {
    //  width: 80%;
    //}
    .reply-input {
      min-height: 20px;
      line-height: 22px;
      padding: 10px 10px;
      color: black;
      background-color: #fff;
      border-radius: 5px;
      // &:empty::before{
      //   content attr(placeholder);
      // }
      &:empty:before {
        content: attr(placeholder);
      }

      &:focus:before {
        content: none;
      }

      &:focus {
        padding: 8px 8px;
        border: 2px solid blue;
        box-shadow: none;
        outline: none;
      }
    }
  }

  .reply-btn-box {
    margin-top: 10px;
    height: 25px;
    display: inline-block;

    .reply-btn {
      position: relative;
      float: right;
      margin-left: 15px;
      // margin-right: 15px;
    }
  }
}

.my-comment-reply {
  margin-left: 50px;

  .reply-input {
    width: auto;
  }
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(74, 136, 199, .3)
}

.reply-father {
  padding: 10px;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .author-info {
    display: inline-block;
    margin-left: 5px;
    width: 60%;
    height: 40px;
    line-height: 20px;

    span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }

    .author-time {
      font-size: 14px;
    }
  }

  .icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;
    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }

    span {
      cursor: pointer;
    }

    .iconfont {
      margin: 0 5px;
    }
  }

  .talk-box {
    margin: 0 50px;

    p {
      margin: 0;
    }

    .reply {
      font-size: 16px;
      color: #000;
    }
  }

  .reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
}
</style>
