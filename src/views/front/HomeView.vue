<template>
  <div>
    <AppLoading v-model:active="isLoading">
        <div id="load">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
    </AppLoading>
  </div>
  <!-- banner -->
  <div class="banner d-flex align-items-center">
    <div class="container opacity-100">
      <h2 class="text-dark fw-bold fs-1">歡慶開幕，全館免運！</h2>
      <button type="button" class="btn btn-primary btn-lg mt-2" @click="()=>returnRouterProduct()">立即選購</button>
    </div>
  </div>
  <!-- 下單須知 -->
  <div class="bg-secondary">
    <div class="container py-4 pb-lg-8">
      <div data-aos="flip-left">
        <h2 class="text-center fs-1 mt-10 fw-semibold">下單需知</h2>
      </div>
      <ul class="row list-unstyled">
        <li class="col-lg-3">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="text-center p-8">
              <span class="material-symbols-outlined" style="font-size: 60px;">
                local_shipping
              </span>
              <h3 class="mt-3">快速出貨</h3>
              <p>週日或免運活動除外</p>
            </div>
          </div>
        </li>
        <li class="col-lg-3">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="text-center p-8">
              <span class="material-symbols-outlined" style="font-size: 60px;">
                paid
              </span>
              <h3 class="mt-3">台灣現貨</h3>
              <p>訂單未滿99元不出貨<br>
                (不含運費)
              </p>
            </div>
          </div>
        </li>
        <li class="col-lg-3">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="text-center p-8">
              <span class="material-symbols-outlined" style="font-size: 60px;">
                videocam
              </span>
              <h3 class="mt-3">全程錄影</h3>
              <p>為保證你我權益<br>
                開箱請全程錄影
              </p>
            </div>
          </div>
        </li>
        <li class="col-lg-3">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="text-center p-8">
              <span class="material-symbols-outlined" style="font-size: 60px;">
                receipt_long
              </span>
              <h3 class="mt-3">開立發票</h3>
              <p>
                本賣場合法開立發票
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 熱銷 -->
  <div class="py-20">
    <div class="container">
      <div data-aos="flip-left">
        <h2 class="text-center mb-10 text-primary fs-1 fw-semibold">熱銷排行</h2>
      </div>
      <div class="row">
        <div class="col-lg-3" v-for="product in top8" :key="product.id+'top10'">
          <div data-aos="fade-up">
            <div class="cursor-pointer">
              <div
                class="card border-0 rounded-0 mb-4 card-overlay"
                @click="()=>returnRouterSingle(product.id)"
              >
                <div class="position-relative">
                    <img :src="product.imageUrl" class="card-img-top rounded-0" alt="貓咪產品">
                    <div class="overlay d-flex justify-content-center">
                      <p
                        class="mb-0 text-white m-0 p-2 w-100 fs-3 d-flex justify-content-center"
                      >
                          查看更多
                      </p>
                    </div>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title text-hover-black">{{ product.title }}</h5>
                    <p class="text-primary mb-1 fs-5">NT${{ product.price }}</p>
                    <del class="text-textSecondary">NT${{ product.origin_price }}</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" text-center">
        <button type="button" class="btn btn-outline-primary btn-lg" @click="()=>returnRouterProduct()">
          查看更多
        </button>
      </div>
    </div>
  </div>
  <!-- 小教室 -->
  <div class="bg-secondary">
    <div class="container py-20">
      <div data-aos="flip-left">
        <h2 class="text-center mb-12 fs-1 fw-semibold">貓咪小教室</h2>
      </div>
      <template v-if="blogs.length > 0">
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div class="row">
            <div class="col-lg-4 mb-12">
              <img class="img-fluid" src="../../assets/幼貓.jfif" alt="新手養貓必看文章">
            </div>
            <div class="col-lg-8 mb-12" style="position: relative;">
              <h3>{{ blogs[1].title }}</h3>
              <p>
                {{ blogs[1].description.slice(0, 150) + '...'  }}
              </p>
              <div class="" style="position: absolute; bottom: 0; right: 12px;">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-lg text-end"
                  @click="()=>returnRouterBlogs(blogs[1].id)"
                >
                  查看更多
                </button>
              </div>
            </div>
            <div class="col-lg-8" style="position: relative;">
              <h3>{{ blogs[0].title }}</h3>
              <p>{{ blogs[0].description.slice(0, 150) + '...'  }}</p>
              <div class="" style="position: absolute; bottom: 0;">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-lg"
                  @click="()=>returnRouterBlogs(blogs[0].id)"
                >
                  查看更多
                </button>
              </div>
            </div>
            <div class="col-lg-4">
              <img class="img-fluid" src="../../assets/貓咪紙箱.jpg" alt="貓咪紙箱文章">
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart.js'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      top8: {},
      blogs: {},
      isLoading: true
    }
  },
  methods: {
    getProductsAll () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/products/All`)
        .then(res => {
          const productsAll = res.data.products
          const sortedProducts = productsAll.sort((a, b) => a.price - b.price)
          this.top8 = sortedProducts.slice(0, 8)
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '取得產品資料失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getBlogs () {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/articles`)
        .then(res => {
          this.blogs = res.data.articles
          this.isLoading = false
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '取得部落格資料失敗٩(ŏ﹏ŏ、)۶',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    returnRouterSingle (item) {
      this.$router.push(`/product/${item}`)
      window.scrollTo(0, 0)
    },
    returnRouterProduct () {
      this.$router.push('/product')
      window.scrollTo(0, 0)
    },
    returnRouterBlogs (item) {
      this.$router.push(`/blogs/${item}`)
      window.scrollTo(0, 0)
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  mounted () {
    this.getProductsAll()
    this.getBlogs()
  }
}
</script>

<style scoped>
.banner{
    background-image: url(../../assets/bg-xl.png);
    background-position: top;
    background-size: cover;
    height: 90vh;
    width: 100%;
    background-repeat: no-repeat;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}
.card-overlay:hover .overlay {
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
}
.btn-hover:hover{
    opacity: 1 !important;
}
.cursor-pointer{
  cursor: pointer
}
#load {
  position:absolute;
  width:600px;
  height:36px;
  left:50%;
  top:40%;
  margin-left:-300px;
  overflow:visible;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor:default;
}
#load div {
  position:absolute;
  width:20px;
  height:36px;
  opacity:0;
  font-family:Helvetica, Arial, sans-serif;
  animation:move 3s linear infinite;
  -o-animation:move 3s linear infinite;
  -moz-animation:move 3s linear infinite;
  -webkit-animation:move 3s linear infinite;
  transform:rotate(180deg);
  -o-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -webkit-transform:rotate(180deg);
  color: black;
}
#load div:nth-child(2) {
  animation-delay:0.2s;
  -o-animation-delay:0.2s;
  -moz-animation-delay:0.2s;
  -webkit-animation-delay:0.2s;
}
#load div:nth-child(3) {
  animation-delay:0.4s;
  -o-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
#load div:nth-child(4) {
  animation-delay:0.6s;
  -o-animation-delay:0.6s;
  -moz-animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
#load div:nth-child(5) {
  animation-delay:0.8s;
  -o-animation-delay:0.8s;
  -moz-animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
#load div:nth-child(6) {
  animation-delay:1s;
  -o-animation-delay:1s;
  -moz-animation-delay:1s;
  -webkit-animation-delay:1s;
}
#load div:nth-child(7) {
  animation-delay:1.2s;
  -o-animation-delay:1.2s;
  -moz-animation-delay:1.2s;
  -webkit-animation-delay:1.2s;
}
@keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {left: 41%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -moz-transform:rotate(-180deg);
    -webkit-transform:rotate(-180deg);
    -o-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
@-moz-keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {
    left:41%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -moz-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
@-webkit-keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  10% {
    left:41%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  40% {
    left:59%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%;
    -webkit-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
</style>
