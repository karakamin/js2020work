new Vue ({
    el:'#app',  //綁定 app
    data:{
        products: [
            {
            id: 1000,
            unit: '個',
            category: '生起司',
            title: '綜合莓果生塔司蛋糕',
            origin_price: 850,
            price: 550,
            description: '新鮮三樣莓果',
            content: '本店強打推薦綜合莓果生起司蛋糕',
            is_enabled: 0,
            imageUrl: 'https://images.unsplash.com/photo-1553343682-4ae306b3ad4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1862&q=80',
            },
            {
            id: 1001,
            unit: '盒',
            category: '塔',
            title: '綜合小塔',
            origin_price: 850,
            price: 600,
            description: '綜合小甜塔',
            content: '一盒六入可挑選口味',
            is_enabled: 1,
            imageUrl: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80',
            }
        ],
          tempProduct:{},
          
    },
    methods: {
        updateProduct(){
            if(this.tempProduct.id) {
                console.log(this.tempProduct.id);
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products[i] = this.tempProduct;
                    }
                });
            } else {
                const id = new Date().getTime();
                this.tempProduct.id = id;
                this.products.push(this.tempProduct);
            }
            this.tempProduct = {}
            $('#productModal').modal('hide');
        },
        openModal(isNew, item){
            switch(isNew) {
                case 'new':
                    this.tempProduct = {};
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    this.tempProduct = Object.assign({}, item);
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    $('#delProductModal').modal('show');
                    this.tempProduct = Object.assign({}, item);
                    break;
                    default:
                    break;
            }
        },
        delProduct() {
            if(this.tempProduct.id) {
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products.splice(i, 1);
                        this.tempProduct = {};
                    }
                });
            }
            $('#delProductModal').modal('hide');
        },
    },
});