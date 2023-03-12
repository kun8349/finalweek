<template>
    <header class="home bg-primary">
    <div class="container py-3">
      <nav class="navbar navbar-expand-lg bg-body-tertiary flex-wrap">
        <div class="container-fluid px-0">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="p-0 me-0 me-lg-2">
            <a class="navbar-brand" href="#">Logo</a>
          </div>
          <div class="collapse navbar-collapse ms-auto d-none" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link text-white nav-hover fs-4 me-2" to="/">
                    <span>首頁</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white nav-hover fs-4 me-2" to="/product">
                    <span>所有商品</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white nav-hover fs-4 me-2" to="/blogs">
                    <span>部落格</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            <router-link to="/member" class="me-3">
              <span class="material-symbols-outlined text-white icon-hover me-4" style="font-size: 35px;">
                person
              </span>
            </router-link>
            <router-link to="/cart" class="">
              <span class="material-symbols-outlined text-white icon-hover position-relative" style="font-size: 35px;">
                shopping_cart
              </span>
              <span
                  class="text-primary position-absolute top-25 start-100 translate-middle badge rounded-pill bg-white"
                  style="font-size: 12px; font-weight: 900 !important;"
                >
                  {{ cart.length }}
              </span>
            </router-link>
          </div>
        </div>
      </nav>
      <!-- 手機板樣式 -->
      <div class="collapse navbar-collapse ms-auto d-lg-none" id="navbarSupportedContent">
            <ul class="navbar-nav mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link fs-4 text-white border-bottom border-white border-2" to="/"><span>首頁</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-4 text-white border-bottom border-white border-2" to="/product"><span>所有商品</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-4 text-white border-bottom border-white border-2" to=""><span>狗狗專區</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-4 text-white border-bottom border-white border-2" to=""><span>貓咪專區</span></router-link>
              </li>
            </ul>
      </div>
    </div>
    </header>
    <div>
        <router-view/>
    </div>
    <footer class="bg-primary py-3">
    <div class="text-center py-5">
      <p class="mb-0">
        非營業用途 |
        2020 © BauShop企業有限公司
      </p>
      <div class="mt-3">
        <a href="#"><img src="../assets/ic-social-fb.png" alt="fb-icon" width="60px" class="me-3 img-hover"></a>
        <a href="#"><img src="../assets/ic_social_ig.png" alt="ig-icon" width="60px" class="me-3 img-hover"></a>
        <a href="#"><img src="../assets/ic_social_line.png" alt="line-icon" width="60px" class="me-3 img-hover"></a>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cart'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  methods: {
    ...mapActions(cartStore, ['getToCart'])
  },
  mounted () {
    this.getToCart()
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
.icon-hover:hover{
  text-decoration: underline 5px !important;
  text-underline-offset: 5px;
}
.img-hover:hover {
  transition: all 0.5s;
  transform: scale(1.2);
}
.footer-hover:hover{
  color:white !important;
  text-decoration:underline !important;
  text-underline-offset:5px;
}

</style>
