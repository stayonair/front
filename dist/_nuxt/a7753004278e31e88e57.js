(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{291:function(t,e,n){var content=n(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(5).default)("2863fd0a",content,!0,{sourceMap:!1})},295:function(t,e,n){"use strict";var r=n(291);n.n(r).a},296:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".app_button[data-v-761c1ffe]{position:relative;padding:1rem;border-radius:2rem;font:inherit;line-height:normal;overflow:visible;transition:all .2s;-webkit-appearance:none;-moz-appearance:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.app_button[data-v-761c1ffe]:focus,.app_button[data-v-761c1ffe]:hover{cursor:pointer;opacity:.6}.app_button[data-v-761c1ffe]:disabled{background-color:#d1d1d1;border:1px solid #d1d1d1}.is_white[data-v-761c1ffe]{border:1px solid #fafcff;background-color:#fafcff;color:#2f7db3}.is_gray[data-v-761c1ffe]{border:1px solid #707070;background-color:#707070;color:#fafcff}.is_pink[data-v-761c1ffe]{border:1px solid #ff7989;background-color:#ff7989;color:#fafcff}.is_transparent[data-v-761c1ffe]{border:2px solid #fafcff;background-color:transparent;color:#fafcff}.icon[data-v-761c1ffe]{position:absolute;top:1.2rem;left:1.6rem}",""])},297:function(t,e,n){"use strict";n(42),n(83);var r={name:"AppButton",props:{text:{type:String,default:""},icon:{type:String,default:""},color:{type:String,default:"white",validator:function(t){return["white","gray","pink","transparent"].includes(t)}},disabled:{type:Boolean,default:!1},type:{type:String,default:"submit",validator:function(t){return["submit","button"].includes(t)}}},computed:{buttonClasses:function(){var t={app_button:!0};return t["is_".concat(this.color)]=!0,t},awesomeIcon:function(){return this.icon}},methods:{handleClick:function(t){this.$emit("click",t)}}},o=(n(295),n(0)),component=Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app_button__wrapper"},[n("div",{staticClass:"app_button__container"},[n("button",{class:t.buttonClasses,attrs:{type:t.type,disabled:t.disabled},on:{click:t.handleClick}},[t.icon?n("i",{staticClass:"icon",class:t.awesomeIcon}):t._e(),t._v("\n      "+t._s(t.text)+"\n    ")])])])},[],!1,null,"761c1ffe",null);e.a=component.exports},323:function(t,e,n){var content=n(351);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(5).default)("3934dac3",content,!0,{sourceMap:!1})},350:function(t,e,n){"use strict";var r=n(323);n.n(r).a},351:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".--noon[data-v-16cb57b7]{background:linear-gradient(180deg,#026cb9,#5ba7d6 75%,#fddade)}.aside_menu--noon[data-v-16cb57b7]{background:linear-gradient(180deg,#026cb9,#5ba7d6 60%,#fddade 80%)}.signup_name__container[data-v-16cb57b7]{background:linear-gradient(180deg,#026cb9,#5ba7d6 75%,#fddade);padding:3.5rem 0;min-height:100vh}.app_icon[data-v-16cb57b7]{margin:0 auto 12rem;width:10rem}.app_icon[data-v-16cb57b7] .icon--balloon{fill:#fafcff}.create_name__container[data-v-16cb57b7]{width:27rem;margin:0 auto;position:relative}.create_name__input[data-v-16cb57b7]{color:#fff;font-size:4rem;width:100%;padding:.4rem 1rem;margin-bottom:3rem;outline:none;border:none;background-color:hsla(0,0%,100%,.3)}.under-line[data-v-16cb57b7]{width:28rem;height:.4rem;background-color:#fff;border-radius:3rem;margin:auto;position:absolute;top:5rem;left:-.5rem}.create_name__description[data-v-16cb57b7]{font:Medium 14px/22px Vibur;color:#fafcff;margin-bottom:3rem}.border--white[data-v-16cb57b7]{background-color:#fafcff;height:.4rem;width:2.4rem;margin:0 auto 4rem;border-radius:.2rem}.button--submit[data-v-16cb57b7] .app_button{width:100%;padding:1.4rem 2.4rem;border-radius:2.4rem;margin-top:1rem;font-weight:700}",""])},379:function(t,e,n){"use strict";n.r(e);n(28);var r=n(7),o=n(102),c=n(297),d=n(17),l={components:{IconBalloon:o.a,AppButton:c.a},data:function(){return{userName:""}},methods:{createName:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.auth().currentUser.updateProfile({displayName:this.userName}).then(function(){console.log("Update successful"),e.$router.push("/posts")}).catch(function(t){console.error(t)});case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},f=(n(350),n(0)),component=Object(f.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"signup_name__container --noon"},[n("div",{staticClass:"app_icon"},[n("icon-balloon")],1),t._v(" "),n("div",{staticClass:"create_name__container"},[n("form",{staticClass:"form__container",on:{submit:function(e){return e.preventDefault(),t.createName()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"create_name__input",attrs:{type:"text"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}}),t._v(" "),n("div",{staticClass:"under-line"}),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"border--white"}),t._v(" "),n("app-button",{staticClass:"button--submit",attrs:{color:"white",text:"SUBMIT"}})],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"create_name__description"},[this._v("\n        リスナーとして表示される名前を入力してください。"),e("br"),this._v("\n        コメント、いいねの欄に表示されます。"),e("br"),this._v("\n        トラベラーネームもリスナーネームと同じ名前になります。\n      ")])}],!1,null,"16cb57b7",null);e.default=component.exports}}]);