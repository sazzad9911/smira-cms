/*! For license information please see 5209.a26498c2.chunk.js.LICENSE.txt */
(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[5209],{5209:function(e,l,a){"use strict";a.r(l);var n=a(885),r=a(2791),t=a(4912),s=(a(6016),a(4569)),c=a.n(s),i=a(2930),o=a(7266),d=a(3108),u=a(8687),m=a(9271),h=a(184);l.default=function(){var e=r.useState(new Date),l=(0,n.Z)(e,2),a=(l[0],l[1],r.useState()),s=(0,n.Z)(a,2),f=s[0],v=s[1],p=r.useState(),x=(0,n.Z)(p,2),j=x[0],N=x[1],b=r.useState(),g=(0,n.Z)(b,2),S=g[0],C=g[1],y=r.useState(),E=(0,n.Z)(y,2),T=(E[0],E[1]),w=r.useState(),F=(0,n.Z)(w,2),I=F[0],L=F[1],U=r.useState(""),Z=(0,n.Z)(U,2),O=Z[0],A=Z[1],M=(0,o.v0)(d.Z),q=r.useState(null),P=(0,n.Z)(q,2),R=(P[0],P[1],(0,u.v9)((function(e){return e.brands}))),G=(0,m.UO)().id;r.useEffect((function(){if(R){var e=R.filter((function(e){return e.id==G}));v(e[0].name),N(e[0].type),C(e[0].address),L(e[0].phone)}}),[R]);return(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{className:"page-header",children:[(0,h.jsx)("h3",{className:"page-title",children:" Update Brand "}),(0,h.jsx)("nav",{"aria-label":"breadcrumb",children:(0,h.jsxs)("ol",{className:"breadcrumb",children:[(0,h.jsx)("li",{className:"breadcrumb-item",children:(0,h.jsx)("a",{href:"#",onClick:function(e){return e.preventDefault()},children:"Brand"})}),(0,h.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Update"})]})})]}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-12 grid-margin",children:(0,h.jsx)("div",{className:"card",children:(0,h.jsxs)("div",{className:"card-body",children:[(0,h.jsx)("h4",{className:"card-title",children:"Information"}),(0,h.jsxs)("form",{className:"form-sample",children:[(0,h.jsx)("p",{className:"card-description",children:" update brand "}),(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)("div",{className:"col-md-6",children:(0,h.jsxs)(t.Z.Group,{className:"row",children:[(0,h.jsx)("label",{className:"col-sm-3 col-form-label",children:"Brand Name"}),(0,h.jsx)("div",{className:"col-sm-9",children:(0,h.jsx)(t.Z.Control,{value:f,onChange:function(e){return v(e.target.value)},placeholder:"Brand name",type:"text"})})]})}),(0,h.jsx)("div",{className:"col-md-6",children:(0,h.jsxs)(t.Z.Group,{className:"row",children:[(0,h.jsx)("label",{className:"col-sm-3 col-form-label",children:"Brand Type"}),(0,h.jsx)("div",{className:"col-sm-9",children:(0,h.jsxs)("select",{value:j,onChange:function(e){return N(e.target.value)},className:"form-control",children:[(0,h.jsx)("option",{value:"",children:"Select"}),(0,h.jsx)("option",{value:"Restaurant",children:"Restaurant"}),(0,h.jsx)("option",{value:"Games",children:"Games"}),(0,h.jsx)("option",{value:"Camping",children:"Camping"}),(0,h.jsx)("option",{value:"Travel",children:"Travel"}),(0,h.jsx)("option",{value:"Shopping",children:"Shopping"}),(0,h.jsx)("option",{value:"Health",children:"Health"}),(0,h.jsx)("option",{value:"Services",children:"Services"}),(0,h.jsx)("option",{value:"Spa & Salons",children:"Spa & Salons"})]})})]})})]}),(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)("div",{className:"col-md-6",children:(0,h.jsxs)(t.Z.Group,{className:"row",children:[(0,h.jsx)("label",{className:"col-sm-3 col-form-label",children:"Phone Number"}),(0,h.jsx)("div",{className:"col-sm-9",children:(0,h.jsx)(t.Z.Control,{value:I,onChange:function(e){return L(e.target.value)},placeholder:"your phone number",type:"number"})})]})}),(0,h.jsx)("div",{className:"col-md-6",children:(0,h.jsxs)(t.Z.Group,{className:"row",children:[(0,h.jsx)("label",{className:"col-sm-3 col-form-label",children:"Address"}),(0,h.jsx)("div",{className:"col-sm-9",children:(0,h.jsx)(t.Z.Control,{value:S,onChange:function(e){return C(e.target.value)},placeholder:"address",type:"text"})})]})}),(0,h.jsx)("div",{className:"col-md-6",children:(0,h.jsxs)(t.Z.Group,{className:"row",children:[(0,h.jsx)("label",{className:"col-sm-3 col-form-label",children:"Upload Logo"}),(0,h.jsx)("div",{className:"col-sm-9",children:(0,h.jsx)(t.Z.Control,{onChange:function(e){!function(e){var l=new FormData;l.append("file",e[0]),c().post(i.HQ+"/uploadWithData",l).then((function(e){e.data.url&&(0,i.qC)(i.HQ+"/updateData",{auth:M.currentUser,tableName:"brands",columns:["image"],values:[e.data.url],condition:"id="+G}).then((function(e){console.log(e),A("Image Saved.")}))}))}(e.target.files),T(e.target.files)},name:"file",type:"file"})})]})})]})]}),O?(0,h.jsx)("div",{class:"alert alert-primary",role:"alert",children:O}):(0,h.jsx)(h.Fragment,{}),(0,h.jsx)("button",{onClick:function(){f&&S&&I&&j?(A("Please wait..."),(0,i.qC)(i.HQ+"/updateData",{auth:M.currentUser,tableName:"brands",columns:["name","type","address","phone"],values:[f.replace(/[^\w\s]/gi,""),j,S,I],condition:"id="+G}).then((function(e){console.log(e),A("Successfully updated the brand. You can reload the page"),setTimeout((function(){window.location.reload()}),300)}))):A("Please fill all the required fields")},className:"btn btn-gradient-secondary btn-rounded btn-fw",children:"SAVE"})]})})})})]})}},6016:function(e){e.exports=function(){"use strict";var e={CUSTOMFILE:'.custom-file input[type="file"]',CUSTOMFILELABEL:".custom-file-label",FORM:"form",INPUT:"input"},l=3,a=function(l){var a="",n=l.parentNode.querySelector(e.CUSTOMFILELABEL);return n&&(a=n.textContent),a},n=function(e){if(e.childNodes.length>0)for(var a=[].slice.call(e.childNodes),n=0;n<a.length;n++){var r=a[n];if(r.nodeType!==l)return r}return e},r=function(l){var a=l.bsCustomFileInput.defaultText,r=l.parentNode.querySelector(e.CUSTOMFILELABEL);r&&(n(r).textContent=a)},t=!!window.File,s="fakepath",c="\\",i=function(e){if(e.hasAttribute("multiple")&&t)return[].slice.call(e.files).map((function(e){return e.name})).join(", ");if(-1!==e.value.indexOf(s)){var l=e.value.split(c);return l[l.length-1]}return e.value};function o(){var l=this.parentNode.querySelector(e.CUSTOMFILELABEL);if(l){var a=n(l),t=i(this);t.length?a.textContent=t:r(this)}}function d(){for(var l=[].slice.call(this.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),a=0,n=l.length;a<n;a++)r(l[a])}var u="bsCustomFileInput",m={FORMRESET:"reset",INPUTCHANGE:"change"};return{init:function(l,n){void 0===l&&(l=e.CUSTOMFILE),void 0===n&&(n=e.FORM);for(var r=[].slice.call(document.querySelectorAll(l)),t=[].slice.call(document.querySelectorAll(n)),s=0,c=r.length;s<c;s++){var i=r[s];Object.defineProperty(i,u,{value:{defaultText:a(i)},writable:!0}),o.call(i),i.addEventListener(m.INPUTCHANGE,o)}for(var h=0,f=t.length;h<f;h++)t[h].addEventListener(m.FORMRESET,d),Object.defineProperty(t[h],u,{value:!0,writable:!0})},destroy:function(){for(var l=[].slice.call(document.querySelectorAll(e.FORM)).filter((function(e){return!!e.bsCustomFileInput})),a=[].slice.call(document.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),n=0,t=a.length;n<t;n++){var s=a[n];r(s),s[u]=void 0,s.removeEventListener(m.INPUTCHANGE,o)}for(var c=0,i=l.length;c<i;c++)l[c].removeEventListener(m.FORMRESET,d),l[c][u]=void 0}}}()}}]);
//# sourceMappingURL=5209.a26498c2.chunk.js.map