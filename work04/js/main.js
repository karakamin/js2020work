new Vue({
    el: "#app", //綁定於 id = app 之下
    data: {
      isYear: new Date().getFullYear(), //取得當前年
      company: " 路邊點心屋",
      products: [],
      pagination: {},
      //productsNo:[],
      // loadingBtn: "",
      tempProduct: {
        imageUrl: [],
      },
      create: false,
      status: {
        fileUploading: false,
      },
      user: {
        token: "",
        uuid: "fb885474-3b59-4203-aa95-b9bec4ed4e4c",
      },
    },
    created() {
      // 取得 token 的 cookies
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // 若無法取得 token 則返回 Login 頁面
      if (this.user.token === "") {
        window.location = "backindex.html";
      }
      this.getProducts();
    },
    methods: {
       // 取得產品清單資料
      getProducts(page = 1) {
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
        //預設帶入 token
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        axios.get(api).then((response) => {
            this.products = response.data.data;
            this.pagination = response.data.meta.pagination;
            //this.productsNo = response.data.meta.total;           
          })
          .catch((error) => {
            alert("無法取得產品列表清單，資料取得異常");
            // const errorMgs = error.response.data;
            //alert(errorMgs.message);
            console.log(error.response.data)
          });
      },
      // 點選新增產品、編輯、刪除時開啟 Modal 視窗
      openModal(create, item) {
        switch (create) {
          case "new":
            this.tempProduct = {
              imageUrl: [],
            };
            this.create = true;
            $("#productModal").modal("show");  //使 id = productModal 打開
            break;
          case "edit":
            this.tempProduct = Object.assign({}, item);  //將指定 id 使用 Object.assign 拷貝至 tempProduct
            // console.log(this.tempProduct);
            // 使用 refs 觸發子元件方法
            // console.log(this);
            this.$refs.productModel.getDetail(this.tempProduct.id);
            this.create = false;
            break;
          case "delete":
            this.tempProduct = Object.assign({}, item);
            $("#delProductModal").modal("show");
            break;
          default:
            break;
        }
      },
    },
  });