<template>
    <div class="main-footer">
<!--      <div class="menu"><a href="#">网站地图</a><a href="#">友情链接</a><a href="#">隐私政策</a><a href="#">常见问题</a><a-->
<!--        href="#"-->
<!--      >关于我们</a><a href="#">联系我们</a></div>-->
      <div class="copyright"></div>
      <div class="copyright">计科2005第三组</div>
      <img class="logo" src="@/assets/menu-logo.png">
    </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      isLogin: false
    }
  },
  computed: {
    // ...mapGetters([
    //   'token'
    // ])
  },
  mounted () {
    // this.loadUser()
  },
  methods: {
    // loadUser() {
    //   if (this.token) {
    //     this.isLogin = true
    //   } else {
    //     this.isLogin = false
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.main-footer {
  position: relative;
  bottom: 0px;
  overflow: hidden;
  height: 180px;
  width: 100%;
  background: #331414;
  color: #ffffff;
  text-align: center;
  font-family: "微软雅黑";
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 2.25px;
}
.view-times {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 15px;
  height: 35px;
  text-align: center;
  line-height: 32px;
}

.num {
  width: 20px;
  height: 32px;
  background-color: rgba(255,255,255,0.1);
  z-index: 9999;
  color: #ffffff;
  font-size: 14px;
  line-height: 32px;
  margin: 0 0.2rem;
  padding-left: 3px;
  float: left;
}

.menu {
  letter-spacing: 0;
  margin-top: 1rem;
}

.menu a {
  margin: 0 0.5rem;
  color: #ffffff;
  text-decoration: none;
}

.copyright {
  letter-spacing: 0;
  font-family: "微软雅黑";
}

.logo {
  margin: 20px 0;
  /* length: 30%; */
  width: 10%;
}
</style>
