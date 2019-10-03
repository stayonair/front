(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{291:function(t,e,r){var content=r(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(5).default)("2863fd0a",content,!0,{sourceMap:!1})},294:function(t,e,r){var content=r(305);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(5).default)("766a8e40",content,!0,{sourceMap:!1})},295:function(t,e,r){"use strict";var n=r(291);r.n(n).a},296:function(t,e,r){(t.exports=r(4)(!1)).push([t.i,".app_button[data-v-761c1ffe]{position:relative;padding:1rem;border-radius:2rem;font:inherit;line-height:normal;overflow:visible;transition:all .2s;-webkit-appearance:none;-moz-appearance:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.app_button[data-v-761c1ffe]:focus,.app_button[data-v-761c1ffe]:hover{cursor:pointer;opacity:.6}.app_button[data-v-761c1ffe]:disabled{background-color:#d1d1d1;border:1px solid #d1d1d1}.is_white[data-v-761c1ffe]{border:1px solid #fafcff;background-color:#fafcff;color:#2f7db3}.is_gray[data-v-761c1ffe]{border:1px solid #707070;background-color:#707070;color:#fafcff}.is_pink[data-v-761c1ffe]{border:1px solid #ff7989;background-color:#ff7989;color:#fafcff}.is_transparent[data-v-761c1ffe]{border:2px solid #fafcff;background-color:transparent;color:#fafcff}.icon[data-v-761c1ffe]{position:absolute;top:1.2rem;left:1.6rem}",""])},297:function(t,e,r){"use strict";r(42),r(83);var n={name:"AppButton",props:{text:{type:String,default:""},icon:{type:String,default:""},color:{type:String,default:"white",validator:function(t){return["white","gray","pink","transparent"].includes(t)}},disabled:{type:Boolean,default:!1},type:{type:String,default:"submit",validator:function(t){return["submit","button"].includes(t)}}},computed:{buttonClasses:function(){var t={app_button:!0};return t["is_".concat(this.color)]=!0,t},awesomeIcon:function(){return this.icon}},methods:{handleClick:function(t){this.$emit("click",t)}}},o=(r(295),r(0)),component=Object(o.a)(n,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app_button__wrapper"},[r("div",{staticClass:"app_button__container"},[r("button",{class:t.buttonClasses,attrs:{type:t.type,disabled:t.disabled},on:{click:t.handleClick}},[t.icon?r("i",{staticClass:"icon",class:t.awesomeIcon}):t._e(),t._v("\n      "+t._s(t.text)+"\n    ")])])])},[],!1,null,"761c1ffe",null);e.a=component.exports},304:function(t,e,r){"use strict";var n=r(294);r.n(n).a},305:function(t,e,r){(t.exports=r(4)(!1)).push([t.i,".app_input__container[data-v-24b8a503]{position:relative}.app_input[data-v-24b8a503]{display:inline-block;width:100%;margin:0;padding:1.4rem 2.4rem;background-color:rgba(250,252,255,.6);font-size:1.4rem;line-height:1;border:none;border-radius:2.4rem;-webkit-appearance:none;-moz-appearance:none;transition:all .2s}.app_input[data-v-24b8a503]::-moz-placeholder{color:#444;background-color:#fafcff}.app_input[data-v-24b8a503]:-ms-input-placeholder{color:#444}.app_input[data-v-24b8a503]::placeholder{color:#444;background-color:#fafcff}.app_input[data-v-24b8a503]::-webkit-input-placeholder{color:#444;background-color:#fafcff}.app_input[data-v-24b8a503]::-ms-input-placeholder{color:#444;background-color:#fafcff}.app_input[data-v-24b8a503]:-ms-input-placeholder{color:#444!important;background-color:#fafcff}.app_input[data-v-24b8a503]::-moz-placeholder{text-align:right;background-color:transparent}.app_input[data-v-24b8a503]::placeholder{text-align:right;background-color:transparent}.app_input[data-v-24b8a503]:hover{border-color:#333}.app_input[data-v-24b8a503]:focus{border-color:#111;outline:0}.app_input.is_error[data-v-24b8a503]{color:#333}.app_input.is_error[data-v-24b8a503],.app_input.is_error[data-v-24b8a503]:focus,.app_input.is_error[data-v-24b8a503]:hover{border-color:#333}.app_input[data-v-24b8a503]:-webkit-autofill{box-shadow:inset 0 0 0 1000px #fafcff!important}.app_input__inner_label[data-v-24b8a503]{position:absolute;top:50%;right:2rem;-webkit-transform:translateY(-50%);transform:translateY(-50%)}",""])},306:function(t,e,r){"use strict";r(19);var n=r(33),o={methods:{errorContains:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"errors";return!!this[t]&&("object"===Object(n.a)(this[t])?!!this[t].length:!!this[t])}}},l={name:"AppInput",props:{value:{type:[String,Number],default:null},type:{type:String,default:""},name:{type:String,required:!0},placeholder:{type:[String,Number],default:null},pattern:{type:String,default:".*"},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},isError:{type:Boolean,default:!1},min:{type:[String,Number],default:null},max:{type:[String,Number],default:null},innerLabel:{type:String,default:""},autocomplete:{type:String,default:""}},methods:{updateInput:function(t){this.$emit("input",t.target.value)},blurInput:function(t){this.$emit("blur",t.target.value)}}},c=(r(304),r(0)),d={components:{AppInput:Object(c.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app_input__wrapper"},[r("div",{staticClass:"app_input__container"},[r("input",{staticClass:"app_input",class:{is_error:t.isError},attrs:{type:t.type,name:t.name,placeholder:t.placeholder,pattern:t.pattern,disabled:t.disabled,max:t.max,min:t.min,autocomplete:t.autocomplete,required:t.required},domProps:{value:t.value},on:{input:t.updateInput,blur:t.blurInput}}),t._v(" "),r("p",{staticClass:"app_input__inner_label"},[t._v("\n      "+t._s(t.innerLabel)+"\n    ")])])])},[],!1,null,"24b8a503",null).exports},mixins:[o],props:{value:{type:[String,Number],default:""},label:{type:String,default:""},subLabel:{type:String,default:""},type:{type:String,default:""},name:{type:String,required:!0},placeholder:{type:[String,Number],default:null},pattern:{type:String,default:".*"},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},errors:{type:Array,default:function(){return[]}},innerLabel:{type:String,default:""}},methods:{updateInput:function(t){this.$emit("input",t)},blurInput:function(t){this.$emit("blur",t)}}},f=Object(c.a)(d,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form_item"},[r("div",{staticClass:"form_item__inner"},[r("div",{staticClass:"form_input__body form_item__body"},[r("app-input",{staticClass:"form_input__input form_item__content",attrs:{value:t.value,type:t.type,name:t.name,placeholder:t.placeholder,pattern:t.pattern,disabled:t.disabled,required:t.required,"is-error":t.errorContains(),"inner-label":t.innerLabel},on:{input:t.updateInput,blur:t.blurInput}})],1),t._v(" "),t.errorContains()?r("error-messages",{staticClass:"form_input__error_messages form_item__error_messages",attrs:{errors:t.errors}}):t._e()],1)])},[],!1,null,"21301dea",null);e.a=f.exports},330:function(t,e,r){var content=r(371);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(5).default)("6c450969",content,!0,{sourceMap:!1})},370:function(t,e,r){"use strict";var n=r(330);r.n(n).a},371:function(t,e,r){(t.exports=r(4)(!1)).push([t.i,".form__container{margin:0 auto;min-height:100vh;display:flex;justify-content:center;align-items:center;text-align:center;background:#111}.title{font-family:Quicksand,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;display:block;font-weight:300;font-size:100px;color:#35495e;letter-spacing:1px}.subtitle{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links{padding-top:15px}",""])},386:function(t,e,r){"use strict";r.r(e);var n=r(306),o=r(297),l={components:{FormInput:n.a,AppButton:o.a},data:function(){return{formData:{email:""}}},methods:{sendForm:function(){console.log(this.formData)}}},c=(r(370),r(0)),component=Object(c.a)(l,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"signin__container"},[r("form",{staticClass:"form__container",on:{submit:function(e){return e.preventDefault(),t.sendForm(e)}}},[r("form-input",{attrs:{name:"form-input","inner-label":"Email"},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),t._v(" "),r("app-button",{attrs:{color:"white",text:"CONTINUE"}})],1),t._v(" "),r("nuxt-link",{attrs:{to:"record"}},[t._v("録音")])],1)},[],!1,null,null,null);e.default=component.exports}}]);