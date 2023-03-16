import{g as c,h as e}from"./index-ce61cd7a.js";import{S as o}from"./sweetalert2.all-62b27999.js";const{VITE_URL:a,VITE_PATH:s}={VITE_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"kevin-jiang",BASE_URL:"/finalweek/",MODE:"production",DEV:!1,PROD:!0},h=c("cart",{state:()=>({cart:[],total:0,finalTotal:0,loadingItem:"",isToLoading:!1,couponPrice:0,orderPrice:0}),actions:{getToCart(){this.isToLoading=!0,e.get(`${a}api/${s}/cart`).then(t=>{this.cart=t.data.data.carts,this.total=t.data.data.total,this.finalTotal=t.data.data.finalTotal,this.isToLoading=!1})},addToCart(t,i=1){const r={product_id:t,qty:i};this.loadingItem=t,e.post(`${a}api/${s}/cart`,{data:r}).then(n=>{this.isLoading=!1,this.loadingItem="",o.fire({position:"top-end",icon:"success",title:"加入購物車成功",padding:"5px",width:"280px",showConfirmButton:!1,timer:1500,toast:!0,showCloseButton:!0}),this.getToCart()}).catch(()=>{o.fire({icon:"error",title:"加入購物車失敗(‘⊙д-)",showCloseButton:!0,showConfirmButton:!1,timer:1500,customClass:{container:"50px"}})})},deleteSingle(t){this.loadingItem=t.id,e.delete(`${a}api/${s}/cart/${t.id}`).then(i=>{o.fire({position:"top-end",icon:"success",title:"成功刪除單一產品",showCloseButton:!0,showConfirmButton:!1,padding:"5px",width:"280px",timer:1500,toast:!0}),this.getToCart(),this.loadingItem=""}).catch(()=>{o.fire({icon:"error",title:"刪除單一品項失敗٩(ŏ﹏ŏ、)۶",showConfirmButton:!1,showCloseButton:!0,timer:1500,customClass:{container:"50px"}})})},getCoupon(t){const i={code:String(t)};e.post(`${a}api/${s}/coupon`,{data:i}).then(r=>{const n=r.data.data.final_total;this.couponPrice=Math.floor(n),this.orderPrice=this.total-this.couponPrice,o.fire({position:"top-end",icon:"success",title:"優惠券折扣成功",showConfirmButton:!1,timer:1500,toast:!0})}).catch(()=>{this.couponPrice=0,o.fire({position:"top-end",icon:"error",title:"不存在此優惠券",showConfirmButton:!1,timer:1500,toast:!0})})}},getters:{}});export{h as c};