<template>
    <div class="container">
        <div class="login-wrapper">
            <form class="form-floating">
                <div class="text-center">
                    <img
                        src="../../assets/logo-removebg-preview.png"
                        alt="logo"
                        class="img-fluid"
                        style="width: 100px;"
                    >
                </div>
                <h3 class="mb-3 text-center">會員登入</h3>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control w-100" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-check my-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                    <label class="form-check-label" for="flexCheckChecked">
                        Remember me
                    </label>
                </div>
                <button type="button" class="btn btn-primary w-100 btn mt-3 fs-5">登入</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
     .login-wrapper {
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        height: 75vh; /* 設定高度為視窗高度 */
    }
</style>
