(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{439:function(e,t,r){var content=r(487);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(5).default)("9fba7024",content,!0,{sourceMap:!1})},486:function(e,t,r){"use strict";var n=r(439);r.n(n).a},487:function(e,t,r){t=e.exports=r(4)(!1);var n=r(194)(r(488));t.push([e.i,".signup_name__container[data-v-7ae110d9]{background:linear-gradient(rgba(46,211,211,.8),rgba(66,106,131,.8),rgba(72,77,109,.8)),url("+n+");background-size:cover;background-position:top;padding:3.5rem 0;min-height:100vh}.soa-logo[data-v-7ae110d9]{margin:0 auto 12rem;width:10rem}.soa-logo[data-v-7ae110d9] .icon--balloon{fill:#fafcff}.create_name__container[data-v-7ae110d9]{width:27rem;margin:0 auto;position:relative}.create_name__input[data-v-7ae110d9]{color:#fff;font-size:4rem;width:100%;padding:.4rem 1rem;margin-bottom:3rem;outline:none;border:none;background-color:hsla(0,0%,100%,.3)}.under-line[data-v-7ae110d9]{width:28rem;height:.4rem;background-color:#fff;border-radius:3rem;margin:auto;position:absolute;top:5rem;left:-.5rem}.create_name__description[data-v-7ae110d9]{font:Medium 14px/22px Vibur;color:#fafcff;margin-bottom:3rem}.border--yellow[data-v-7ae110d9]{background-color:#ffc400;height:.4rem;width:2.4rem;margin:0 auto 4rem;border-radius:.2rem}.button--submit[data-v-7ae110d9] .app_button{width:100%;padding:1.4rem 2.4rem;border-radius:2.4rem;margin-top:1rem}",""])},488:function(e,t,r){e.exports=r.p+"img/cc4af9c.png"},499:function(e,t,r){"use strict";r.r(t);r(25);var n=r(6),o=r(46),c=r(123),d=r(16),m={components:{IconBalloon:o.a,AppButton:c.a},data:function(){return{userName:""}},methods:{createName:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.c.auth().currentUser.updateProfile({displayName:this.userName}).then(function(){console.log("Update successful")}).catch(function(e){console.error(e)});case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},l=(r(486),r(0)),component=Object(l.a)(m,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"signup_name__container"},[r("div",{staticClass:"soa-logo"},[r("icon-balloon")],1),e._v(" "),r("div",{staticClass:"create_name__container"},[r("form",{staticClass:"form__container",on:{submit:function(t){return t.preventDefault(),e.createName()}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],staticClass:"create_name__input",attrs:{type:"text"},domProps:{value:e.userName},on:{input:function(t){t.target.composing||(e.userName=t.target.value)}}}),e._v(" "),r("div",{staticClass:"under-line"}),e._v(" "),e._m(0),e._v(" "),r("div",{staticClass:"border--yellow"}),e._v(" "),r("app-button",{staticClass:"button--submit",attrs:{color:"white",text:"SUBMIT"}})],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"create_name__description"},[this._v("\n        リスナーとして表示される名前を入力してください。"),t("br"),this._v("\n        コメント、いいねの欄に表示されます。"),t("br"),this._v("\n        トラベラーネームもリスナーネームと同じ名前になります。\n      ")])}],!1,null,"7ae110d9",null);t.default=component.exports}}]);