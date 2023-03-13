<template>
    <div class="login-wrapper position-relative">
        <div class="text-center position-absolute" style="top: 25%;">
            <img src="../../assets/logo-removebg-preview.png" alt="logo">
        </div>
        <form class="form-floating">
            <h3 class="mb-5 text-center">管理員登入</h3>
            <div class="form-floating mb-3">
                <input type="email" class="form-control w-100" id="floatingInput" placeholder="name@example.com" v-model="user.username">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password">
                <label for="floatingPassword">Password</label>
            </div>
            <button type="button" class="btn btn-primary w-100 btn mt-3 fs-5" @click="login">登入</button>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_URL}admin/signin`, this.user)
        .then(res => {
          const { token, expired } = res.data
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin')
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(() => {
          this.$router.push('/')
          Swal.fire({
            icon: 'error',
            title: '登入失敗',
            showConfirmButton: false,
            timer: 1000
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    .login-wrapper {
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        height: 100vh; /* 設定高度為視窗高度 */
    }
</style>
