/*! For license information please see 2029.3a49d81d.chunk.js.LICENSE.txt */
(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[2029],{2029:function(e,l,a){"use strict";a.r(l);var r=a(885),n=a(2791),t=a(4912),s=(a(6016),a(8687)),c=a(2930),o=a(184);l.default=function(){var e=n.useState(new Date),l=(0,r.Z)(e,2),a=(l[0],l[1],(0,s.v9)((function(e){return e.membership}))),i=n.useState(),u=(0,r.Z)(i,2),d=u[0],m=u[1],h=n.useState(),f=(0,r.Z)(h,2),v=f[0],p=f[1],x=n.useState(),N=(0,r.Z)(x,2),b=N[0],j=N[1],g=n.useState(),C=(0,r.Z)(g,2),y=C[0],S=C[1],E=n.useState(),w=(0,r.Z)(E,2),F=w[0],T=w[1],Z=n.useState("silver"),A=(0,r.Z)(Z,2),I=A[0],L=A[1],O=n.useState(""),P=(0,r.Z)(O,2),M=P[0],U=P[1],G=n.useState(),R=(0,r.Z)(G,2),q=R[0],k=R[1];n.useEffect((function(){if(a){var e=a.filter((function(e){return e.type==I}));e&&(m(e[0].hotel),p(e[0].night),j(e[0].account),S(e[0].price),T(e[0].time),k(e[0].plans))}}),[I]);return(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"page-header",children:[(0,o.jsx)("h3",{className:"page-title",children:" Add Plans "}),(0,o.jsx)("nav",{"aria-label":"breadcrumb",children:(0,o.jsxs)("ol",{className:"breadcrumb",children:[(0,o.jsx)("li",{className:"breadcrumb-item",children:(0,o.jsx)("a",{href:"!#",onClick:function(e){return e.preventDefault()},children:"Plans"})}),(0,o.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Add"})]})})]}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-12 grid-margin",children:(0,o.jsx)("div",{className:"card",children:(0,o.jsxs)("div",{className:"card-body",children:[(0,o.jsx)("h4",{className:"card-title",children:"Information"}),(0,o.jsxs)("form",{className:"form-sample",children:[(0,o.jsx)("p",{className:"card-description",children:"Edit plans and offer "}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Select Plan"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)("select",{onChange:function(e){L(e.target.value)},className:"form-control",children:a?a.map((function(e,l){return(0,o.jsx)("option",{value:e.type,children:e.name},l)})):(0,o.jsx)("option",{children:"Select one"})})})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Price"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(t.Z.Control,{value:y,onChange:function(e){return S(e.target.value)},placeholder:"Price of the plan",type:"number"})})]})})]}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Time/year"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(t.Z.Control,{value:F,onChange:function(e){return T(e.target.value)},placeholder:"time period in hour",type:"number"})})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Nights ,can be unlimited or number"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(t.Z.Control,{value:v,onChange:function(e){return p(e.target.value)},placeholder:"number of nights spend",type:"text"})})]})})]}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Hotels, can be all or number"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(t.Z.Control,{value:d,onChange:function(e){return m(e.target.value)},placeholder:"number of hotel can stay",type:"text"})})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Partner Account, can be no or number"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(t.Z.Control,{value:b,onChange:function(e){return j(e.target.value)},placeholder:"partner account count",type:"text"})})]})})]}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(t.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Add plans details, comas separated"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)("textarea",{value:q,onChange:function(e){return k(e.target.value)},class:"form-control",placeholder:"eg. 70 Nights / 2 Year validity,2 Room ,8 Peoples ",id:"exampleFormControlTextarea1",rows:"3"})})]})})}),M?(0,o.jsx)("div",{class:"alert alert-primary",role:"alert",children:M}):(0,o.jsx)(o.Fragment,{})]}),(0,o.jsx)("button",{onClick:function(){d&&v&&b&&y&&F&&I&&q?isNaN(d)&&"all"!=d?U("Hotels can be only number or all."):isNaN(v)&&"unlimited"!=v?U("Nights can be only number or unlimited."):isNaN(b)&&"no"!=b?U("Accounts can be only number or no."):(U("please wait..."),(0,c.qC)(c.HQ+"/updateData",{tableName:"membership",columns:["price","time","night","hotel","account","plans"],values:[y,F,v,d,b,q],condition:"type='"+I+"'"}).then((function(e){U("Successfully updated the plan. You can reload the page"),setTimeout((function(){window.location.reload()}),300)})).catch((function(e){console.log(e.message)}))):U("Fields cannot be empty")},className:"btn btn-gradient-secondary btn-rounded btn-fw",children:"SAVE"})]})})})})]})}},6016:function(e){e.exports=function(){"use strict";var e={CUSTOMFILE:'.custom-file input[type="file"]',CUSTOMFILELABEL:".custom-file-label",FORM:"form",INPUT:"input"},l=3,a=function(l){var a="",r=l.parentNode.querySelector(e.CUSTOMFILELABEL);return r&&(a=r.textContent),a},r=function(e){if(e.childNodes.length>0)for(var a=[].slice.call(e.childNodes),r=0;r<a.length;r++){var n=a[r];if(n.nodeType!==l)return n}return e},n=function(l){var a=l.bsCustomFileInput.defaultText,n=l.parentNode.querySelector(e.CUSTOMFILELABEL);n&&(r(n).textContent=a)},t=!!window.File,s="fakepath",c="\\",o=function(e){if(e.hasAttribute("multiple")&&t)return[].slice.call(e.files).map((function(e){return e.name})).join(", ");if(-1!==e.value.indexOf(s)){var l=e.value.split(c);return l[l.length-1]}return e.value};function i(){var l=this.parentNode.querySelector(e.CUSTOMFILELABEL);if(l){var a=r(l),t=o(this);t.length?a.textContent=t:n(this)}}function u(){for(var l=[].slice.call(this.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),a=0,r=l.length;a<r;a++)n(l[a])}var d="bsCustomFileInput",m={FORMRESET:"reset",INPUTCHANGE:"change"};return{init:function(l,r){void 0===l&&(l=e.CUSTOMFILE),void 0===r&&(r=e.FORM);for(var n=[].slice.call(document.querySelectorAll(l)),t=[].slice.call(document.querySelectorAll(r)),s=0,c=n.length;s<c;s++){var o=n[s];Object.defineProperty(o,d,{value:{defaultText:a(o)},writable:!0}),i.call(o),o.addEventListener(m.INPUTCHANGE,i)}for(var h=0,f=t.length;h<f;h++)t[h].addEventListener(m.FORMRESET,u),Object.defineProperty(t[h],d,{value:!0,writable:!0})},destroy:function(){for(var l=[].slice.call(document.querySelectorAll(e.FORM)).filter((function(e){return!!e.bsCustomFileInput})),a=[].slice.call(document.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),r=0,t=a.length;r<t;r++){var s=a[r];n(s),s[d]=void 0,s.removeEventListener(m.INPUTCHANGE,i)}for(var c=0,o=l.length;c<o;c++)l[c].removeEventListener(m.FORMRESET,u),l[c][d]=void 0}}}()}}]);
//# sourceMappingURL=2029.3a49d81d.chunk.js.map