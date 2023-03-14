<template>
    <div class="bg-primary">
        <nav class="navbar navbar-expand-lg navbar-primary">
            <div class="container-fluid  d-flex justify-content-center">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav d-flex me-auto mb-2 mb-lg-0 align-items-center">
                        <li class="nav-item me-2">
                            <img src="../assets/logo-removebg-preview.png" alt="logo">
                        </li>
                        <li class="nav-item me-2 fs-4">
                          <!-- 一直找不到/admin/product路由 -->
                          <router-link
                                class="nav-link text-white nav-hover"
                                to="/admin/product"
                                :class="{'nav-link-active': this.changeColor === '產品列表'}"
                                @click="()=>toggleColor('產品列表')"
                            >
                                <span>產品列表</span>
                            </router-link>
                        </li>
                        <li class="nav-item me-2 fs-4">
                            <router-link
                                class="nav-link text-white nav-hover"
                                to="/admin/order"
                                :class="{'nav-link-active': this.changeColor === '訂單'}"
                                @click="()=>toggleColor('訂單')"
                            >
                                <span>訂單</span>
                            </router-link>
                        </li>
                        <li class="nav-item me-2 fs-4 dropdown">
                            <router-link
                                class="nav-link text-white nav-hover"
                                to="/admin/blogs"
                                :class="{'nav-link-active': this.changeColor === '部落格'}"
                                @click="()=>toggleColor('部落格')"
                            >
                                <span>部落格</span>
                            </router-link>
                            <!-- <a
                              class="nav-link dropdown-toggle text-white"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              :class="{'nav-link-active': this.changeColor === '文章'}"
                              @click="()=>toggleColor('')"
                            >
                                文章
                            </a>
                            <ul class="dropdown-menu bg-secondary rounded-0" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item fs-5 text-primary" href="#">貼文</a></li>
                                <li><a class="dropdown-item fs-5 text-primary" href="#/admin/blogs">部落格</a></li>
                            </ul> -->
                        </li>
                        <li class="nav-item fs-4">
                            <router-link
                                class="nav-link text-white nav-hover"
                                to="/admin/coupon"
                                :class="{'nav-link-active': this.changeColor === '優惠券'}"
                                @click="()=>toggleColor('優惠券')"
                            >
                                <span>優惠券</span>
                            </router-link>
                        </li>
                    </ul>
                    <div class="d-flex me-5">
                        <button
                            type="button"
                            class="fs-5 fw-bold text-white btn-primary btn"
                            @click="()=>logout()"
                        >
                            登出
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <div class="container-fluid">
        <router-view/>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      changeColor: '產品列表'
    }
  },
  methods: {
    check () {
      this.$http.post(`${VITE_URL}api/user/check`)
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '驗證成功(｡◕∀◕｡)',
            showConfirmButton: false,
            timer: 1000,
            toast: true
          })
        })
        .catch(() => {
          this.$router.push('/login')
          Swal.fire({
            icon: 'error',
            title: '登入失敗',
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    logout () {
      document.cookie = `myToken=;expires=${new Date()}`
      this.$router.push('/')
    },
    toggleColor (page) {
      this.changeColor = page
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // token 設置在 headers 內，是 axios 包裝好的語法
    this.$http.defaults.headers.common.Authorization = token
    this.check()
    // this.$router.push('/admin/product')
  }
}
</script>

<style lang="scss" scoped>
.nav-hover:hover>span {
  /* text-decoration: underline !important;
  text-underline-offset: 10px; */
  padding-bottom: 5px;
  border-bottom: 5px solid #ffff;
}
.nav-link-active > span {
  padding-bottom: 5px;
  border-bottom: 5px solid #ffff;
}
</style>
