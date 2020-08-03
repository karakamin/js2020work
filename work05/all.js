import zh from './zh_TW.js';

// 依據不同驗證狀態，設定對應的 className
VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });

 //載入自訂規則
VeeValidate.localize('tw', zh);

// 將 VeeValidate 驗證工具，以全域註冊的方式，做為 input 欄位驗證使用
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

// 將 VeeValidate 驗證工具，以全域註冊的方式，做為 表單驗證使用
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

new Vue ({
    el: '#app',
    data:{
        form:{
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
        },
    },
    created() {
        console.log(this);
    },
    methods: {
        submitForm() {
          console.log('送出表單');
        }
      },

})