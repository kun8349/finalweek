import{S as u}from"./sweetalert2.all-91b9c703.js";import{_ as b,c as i,b as s,d as m,w as l,t as o,k as v,C as g,F as f,r as _,o as c,z as y,p as x,f as O}from"./index-eb793fcd.js";const{VITE_URL:D,VITE_PATH:k}={VITE_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"kevin-jiang",BASE_URL:"/finalweek/",MODE:"production",DEV:!1,PROD:!0},w={data(){return{OrderData:{},is_paid:!1,isLoading:!0}},methods:{getOrder(){this.isLoading=!0,this.$http.get(`${D}api/${k}/order/${this.$route.params.id}`).then(a=>{this.OrderData=a.data.order,this.isLoading=!1})},changeStatus(){this.is_paid=!0,u.fire({icon:"success",title:"付款成功",showConfirmButton:!1,timer:1e3})}},mounted(){this.getOrder()}},t=a=>(x("data-v-8454831a"),a=a(),O(),a),L=t(()=>s("div",{id:"load"},[s("div",null,"G"),s("div",null,"N"),s("div",null,"I"),s("div",null,"D"),s("div",null,"A"),s("div",null,"O"),s("div",null,"L")],-1)),V={class:"container"},S=t(()=>s("h2",{class:"mt-12 mb-3"},"訂單成立",-1)),I=t(()=>s("p",null,"感謝您訂購我們的商品，收到訂單後，預計1~2天出貨，請您耐心等候",-1)),E=t(()=>s("div",{class:"w-75 mx-auto mt-25"},[s("ul",{class:"progressbar list-unstyled d-flex justify-content-between mb-0"},[s("li",null,"購物車"),s("li",null,"填寫資料"),s("li",{class:"active"},"完成訂單")]),s("div",{class:"progress",style:{height:"5px"}},[s("div",{class:"progress-bar progress-bar-striped progress-bar-animated",role:"progressbar","aria-valuenow":"33.3","aria-valuemin":"0","aria-valuemax":"100",style:{width:"100%"}})])],-1)),T={class:"row justify-content-center mt-10 mb-25"},A={class:"col-lg-8 bg-secondary"},B={class:"text-center py-6 px-9"},C=t(()=>s("h2",null,"訂單資訊",-1)),N=t(()=>s("hr",{class:"text-black mt-6"},null,-1)),j={class:"row justify-content-center"},R={class:"col-lg-9"},U={class:"w-100"},P={key:0,class:"text-start fs-3"},F={class:""},H=t(()=>s("td",{class:"pb-5"},"訂單編號",-1)),z={class:"pb-5"},G={class:""},M=t(()=>s("td",{class:"pb-5"},"成立時間",-1)),q={class:"pb-5"},J={class:""},K=t(()=>s("td",{class:"pb-5"},"姓名",-1)),Q={class:"pb-5"},W={class:""},X=t(()=>s("td",{class:"pb-5"},"電話",-1)),Y={class:"pb-5"},Z={class:""},$=t(()=>s("td",{class:"pb-5"},"信箱",-1)),ss={class:"pb-5"},ts={class:""},es=t(()=>s("td",{class:"pb-5"},"地址",-1)),os={class:"pb-5"},as=t(()=>s("td",{class:"pb-5"},"留言",-1)),cs={class:"pb-5"},is=t(()=>s("td",{class:"pb-5"},"訂單金額",-1)),ds={class:"pb-5"},ns={class:""},rs=t(()=>s("td",{class:"pb-5"},"付款狀態",-1)),ls={class:"pb-5"},_s={key:0,class:"text-success"},ps={key:1,class:"text-danger"};function hs(a,d,us,bs,e,r){const p=_("AppLoading"),h=_("router-link");return c(),i(f,null,[s("div",null,[m(p,{active:e.isLoading,"onUpdate:active":d[0]||(d[0]=n=>e.isLoading=n)},{default:l(()=>[L]),_:1},8,["active"])]),s("div",V,[S,I,E,s("div",T,[s("div",A,[s("div",B,[C,N,s("div",j,[s("div",R,[s("table",U,[e.OrderData.user?(c(),i("tbody",P,[s("tr",F,[H,s("td",z,o(e.OrderData.id),1)]),s("tr",G,[M,s("td",q,o(e.OrderData.create_at),1)]),s("tr",J,[K,s("td",Q,o(e.OrderData.user.name),1)]),s("tr",W,[X,s("td",Y,o(e.OrderData.user.tel),1)]),s("tr",Z,[$,s("td",ss,o(e.OrderData.user.email),1)]),s("tr",ts,[es,s("td",os,o(e.OrderData.user.address),1)]),s("tr",null,[as,s("td",cs,o(e.OrderData.message),1)]),s("tr",null,[is,s("td",ds,o(e.OrderData.total),1)]),s("tr",ns,[rs,s("td",ls,[e.is_paid?(c(),i("span",_s,"完成付款")):(c(),i("span",ps,"尚未付款"))])])])):v("",!0)]),e.is_paid?(c(),g(h,{key:1,to:"/",class:"fs-5"},{default:l(()=>[y("返回首頁")]),_:1})):(c(),i("button",{key:0,type:"button",class:"btn btn-primary btn-lg py-4 px-12 mt-5 mb-10",onClick:d[1]||(d[1]=(...n)=>r.changeStatus&&r.changeStatus(...n))}," 確認付款 "))])])])])])])],64)}const gs=b(w,[["render",hs],["__scopeId","data-v-8454831a"]]);export{gs as default};