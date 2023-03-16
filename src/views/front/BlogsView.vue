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
    <div class="banner d-flex align-items-center">
        <div class="container">
            <h2 class="text-white fw-bold fs-1 d-flex align-items-center justify-content-center">部落格</h2>
        </div>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-20">
        <div
            class="col-8 mb-5"
            v-for="blog in data"
            :key="blog.id+'blog'"
            @click="()=>returnRouterBlogs(blog.id)"
        >
            <div class="card mb-3 rounded-0 border-0 shadow-effect">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="blog.imageUrl" class="img-fluid rounded-0" alt="部落格圖" style="height: 100%;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ blog.title }}</h5>
                            <p class="card-text">{{ blog.description.slice(0, 100) + '...' }}</p>
                            <p class="card-text"><small class="text-muted">more...</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <Pagination :pages="pages" @emit-pages="getBlogs"></Pagination>
    </div>
    </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      isLoading: true,
      data: {},
      pages: {},
      maxText: 30
    }
  },
  components: {
    Pagination
  },
  methods: {
    getBlogs (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_URL}api/${VITE_PATH}/articles`)
        .then(res => {
          this.data = res.data.articles
          this.pages = res.data.pagination
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
    returnRouterBlogs (item) {
      this.$router.push(`/blogs/${item}`)
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    this.getBlogs()
  }
}
</script>

<style lang="scss" scoped>
.banner{
    background-image: url('https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    background-position: center;
    background-size: cover;
    height: 60vh;
    width: 100%;
    background-repeat: no-repeat;
}
.shadow-effect:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
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
