new Vue({
    el: "#app", //綁定於 id = app 之下
    data: {
      isYear: new Date().getFullYear(), //取得當前年
      company: " 路邊點心屋",
      user: {
        email: "",
        password: "",
        token: "",
        uuid: "fb885474-3b59-4203-aa95-b9bec4ed4e4c",
      },
    },
    methods: {
      //登入
      signin() {
        //物件函式縮寫，原寫法為 singin : function(){ xxx }
        const api = `https://course-ec-api.hexschool.io/api/auth/login`; // 將完整驗證登入的路徑賦值給 api
        axios.post(api, this.user).then((response) => {
            const token = response.data.token; //取得token
            const expired = response.data.expired; //取得token有效時間
            // 寫入 cookie token
            // expires 設置有效時間
            document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
            alert("登入成功！");
            window.location = "productsList.html"; //成功後跳轉頁面
          })
          .catch((error) => {
            alert("驗證異常");
            //console.log(this.user);
            console.log(error.response.data.errors);
          });
      },    
    },
  });