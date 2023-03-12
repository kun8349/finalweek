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
    <div class="container">
        <h2 class="mt-18 mb-5">單一產品</h2>
        <div class="row">
            <div class="col-lg-5">
                <img class="img-fluid w-100" :src="mainImageUrl" alt="單一產品圖">
                <div class="row mt-3">
                    <div class="col-md-3 d-flex" v-for="(image,index) in product.imagesUrl" :key="index+'image'">
                        <img
                            :src="product.imageUrl"
                            alt="次要圖片"
                            class="img-fluid me-2 img-hover"
                            @click="()=>changeMainImage(product.imageUrl)"
                        >
                        <img
                            :src="image"
                            alt="次要圖片"
                            class="img-fluid img-hover"
                            @click="()=>changeMainImage(image)"
                        >
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card mt-20 border-0">
                    <div class="card-body p-5">
                        <h2 class="card-title">{{ product.title }}</h2>
                        <p class="card-text mt-4 break-after">
                            {{ product.description }}
                        </p>
                        <p class="fs-3 text-primary fw-semibold">NT${{ product.price }}
                            <del class="fs-4 ms-3 text-textSecondary fw-normal">NT${{product.origin_price}}</del>
                        </p>
                        <div class="d-lg-flex mt-lg-5">
                            <div class="d-flex align-items-center mb-3 mb-lg-0">
                                <label for="input-quantity" class="me-2">
                                數量
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    id="input-quantity"
                                    class="form-control w-auto me-2 rounded-0 p-lg-3"
                                    v-model="NewQty"
                                    :disabled="loadingItem === product.id"
                                >
                            </div>
                            <button
                              type="button"
                              class="btn btn-primary text-white me-2 rounded-0 p-lg-3"
                              @click="()=>addToCart(product.id, NewQty)"
                              :disabled="loadingItem === product.id"
                            >
                              加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center mt-18">
                <div class="bg-secondary p-8 pb-12">
                    <h2 class="">產品說明</h2>
                    <h4 class="mt-5">說明</h4>
                    <p>幫助愛寵預防口腔問題，且維持口腔清新、健康</p>
                    <h4 class="mt-5">內容</h4>
                    <p> - 每包8根 - 適用年齡建議4個月以上 - 建議一天 1 - 2 根</p>
                </div>
            </div>
            <div class="my-18">
                <h2 class="text-center mb-10">相關產品</h2>
                <swiper :pagination="true" :modules="modules" class="mySwiper" :slides-per-view="3" :slides-per-group="3" :space-between="15">
                    <swiper-slide v-for="product in relatedProduct" :key="product.id+'relatedProduct'">
                      <router-link :to="`/product/${product.id}`">
                      <div class="card border-0 rounded-0 mb-4 card-overlay">
                          <div class="position-relative">
                              <img
                                  :src="product.imageUrl"
                                  class="card-img-top rounded-0"
                                  alt="貓咪產品"
                              >
                              <div class="overlay d-flex justify-content-center">
                                  <p class="mb-0 text-white m-0 p-2 w-100 fs-3 d-flex justify-content-center opacity-75"
                                  >
                                      查看更多
                                  </p>
                              </div>
                          </div>
                          <div class="card-body text-center">
                              <h5 class="card-title text-hover-black">{{ product.title }}</h5>
                              <p class="text-primary mb-1">NT${{ product.price }}</p>
                              <del class="text-textSecondary">NT${{ product.origin_price }}</del>
                          </div>
                      </div>
                    </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      product: {},
      relatedProduct: {},
      NewQty: 1,
      mainImageUrl: '',
      isLoading: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination]
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      // 回傳掉 undefined
      if (!this.$route.params.id) {
        return
      }
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/product/${this.$route.params.id}`)
        .then(res => {
          this.product = res.data.product
          this.mainImageUrl = this.product.imageUrl
          this.NewQty = 1
          this.nowCategory = res.data.product.category
          this.getProductsAll(res.data.product.category)
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
    getProductsAll (category) {
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/products/All`)
        .then(res => {
          const productAll = res.data.products
          const feedingCat = productAll.filter(item => item.category === category)
          this.relatedProduct = feedingCat
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
    //   const data = {
    //     product_id: item,
    //     qty
    //   }
    //   this.loadingItem = item
    //   this.$http.post(`${VITE_URL}api/${VITE_PATH}/cart`, { data })
    //     .then(res => {
    //       this.loadingItem = ''
    //       // Swal.fire({
    //       //   position: 'top-end',
    //       //   icon: 'success',
    //       //   title: '加入購物車成功(ﾉ>ω<)ﾉ',
    //       //   showConfirmButton: false,
    //       //   timer: 1500,
    //       //   toast: true
    //       // })
    //       this.getProduct()
    //     })
    //     .catch(() => {
    //       // Swal.fire({
    //       //   icon: 'error',
    //       //   title: '加入購物車失敗(‘⊙д-)',
    //       //   showConfirmButton: false,
    //       //   timer: 1500
    //       // })
    //     })
    // },
    changeMainImage (image) {
      this.mainImageUrl = image
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  watch: {
    $route () {
      this.getProduct()
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    this.getProduct()
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(cartStore, ['loadingItem'])
  }

}

</script>

<style lang="scss" scoped>
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
.break-after {
  content: "\A";
  white-space: pre;
}
.img-hover:hover{
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
