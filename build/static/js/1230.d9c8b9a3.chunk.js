/*! For license information please see 1230.d9c8b9a3.chunk.js.LICENSE.txt */
(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[1230],{4371:function(e,t,r){"use strict";r.r(t);var n=r(5861),a=r(885),l=r(7757),s=r.n(l),i=r(2791),c=r(4912),d=(r(6016),r(8687)),o=r(4569),u=r.n(o),h=r(2930),f=r(7266),m=r(3108),v=r(184);t.default=function(){var e=i.useState(),t=(0,a.Z)(e,2),r=t[0],l=t[1],o=i.useState(),x=(0,a.Z)(o,2),p=(x[0],x[1],i.useState()),b=(0,a.Z)(p,2),j=b[0],g=b[1],N=i.useState(!1),C=(0,a.Z)(N,2),S=C[0],E=C[1],I=i.useState(null),y=(0,a.Z)(I,2),L=y[0],F=y[1],A=(0,f.v0)(m.Z),w=i.useState(),T=(0,a.Z)(w,2),O=(T[0],T[1],i.useState(!1)),U=(0,a.Z)(O,2),R=U[0],M=U[1];(0,d.v9)((function(e){return e.brands}));i.useEffect((function(){(0,h.qC)(h.HQ+"/getData",{tableName:"flash_banner"}).then((function(e){Array.isArray(e)&&F(e)}))}),[S]);var q=function(){var e=(0,n.Z)(s().mark((function e(t,r,n){var a,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=URL.createObjectURL(n[0]),(l=new Image).onload=function(){return l.width==r&&l.height==t?(console.log("correct"),M(!0),!0):(M(!1),URL.revokeObjectURL(l.src),!1)},l.src=a;case 4:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}();return(0,v.jsxs)("div",{children:[(0,v.jsxs)("div",{className:"page-header",children:[(0,v.jsx)("h3",{className:"page-title",children:" Flash Popup "}),(0,v.jsx)("nav",{"aria-label":"breadcrumb",children:(0,v.jsxs)("ol",{className:"breadcrumb",children:[(0,v.jsx)("li",{className:"breadcrumb-item",children:(0,v.jsx)("a",{href:"!#",onClick:function(e){return e.preventDefault()},children:"All"})}),(0,v.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Images"})]})})]}),(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col-12 grid-margin",children:(0,v.jsx)("div",{className:"card",children:(0,v.jsxs)("div",{className:"card-body",children:[(0,v.jsx)("h4",{className:"card-title",children:"Information"}),(0,v.jsxs)("form",{className:"form-sample",children:[(0,v.jsx)("p",{className:"card-description",children:" Add image for a single offer "}),(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)(c.Z.Group,{className:"row",children:[(0,v.jsx)("label",{className:"col-sm-3 col-form-label",children:"Add Banner Image-500*700"}),(0,v.jsx)("div",{className:"col-sm-9",children:(0,v.jsx)(c.Z.Control,{onChange:function(e){l(e.target.files),q(700,500,e.target.files)},type:"file"})})]})})}),j?(0,v.jsx)("div",{className:"alert alert-primary",role:"alert",children:j}):(0,v.jsx)(v.Fragment,{})]}),(0,v.jsx)("button",{onClick:function(){if(R){var e=new FormData;e.append("file",r[0]),u().post(h.HQ+"/uploadWithData",e).then((function(e){e.data.url&&(0,h.qC)(h.HQ+"/setData",{auth:A.currentUser,tableName:"flash_banner",columns:["image"],values:[e.data.url]}).then((function(e){console.log(e),e.insertId?(g("Image Saved."),E(!S)):g(e.message)}))}))}else g("You can only add 700*500 size image")},className:"btn btn-gradient-secondary btn-rounded btn-fw",children:"SAVE"})]})})})}),(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col-lg-12 grid-margin stretch-card",children:(0,v.jsx)("div",{className:"card",children:(0,v.jsxs)("div",{className:"card-body",children:[(0,v.jsx)("h4",{className:"card-title",children:"Information"}),(0,v.jsx)("div",{className:"table-responsive",children:(0,v.jsxs)("table",{className:"table table-striped",children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{children:" Number "}),(0,v.jsx)("th",{children:" Image "}),(0,v.jsx)("th",{children:" Action "})]})}),(0,v.jsx)("tbody",{children:L?L.length>0?L.map((function(e,t){return(0,v.jsxs)("tr",{children:[(0,v.jsx)("td",{children:(0,v.jsx)("p",{children:t+1})}),(0,v.jsx)("img",{style:{width:"100px",height:"100px",margin:"5px"},src:e.image,alt:e.name}),(0,v.jsx)("td",{children:(0,v.jsx)("button",{className:"btn btn-gradient-danger btn-rounded btn-fw",onClick:function(){var t;t=e.id,(0,h.qC)(h.HQ+"/deleteData",{tableName:"flash_banner",condition:"id="+t}).then((function(e){console.log(e),E(!S)}))},children:"Delete"})})]},t)})):(0,v.jsx)("tr",{children:(0,v.jsx)("td",{children:"No data available"})}):(0,v.jsx)("tr",{children:(0,v.jsx)("td",{children:"Loading..."})})})]})})]})})})})]})}},6016:function(e){e.exports=function(){"use strict";var e={CUSTOMFILE:'.custom-file input[type="file"]',CUSTOMFILELABEL:".custom-file-label",FORM:"form",INPUT:"input"},t=3,r=function(t){var r="",n=t.parentNode.querySelector(e.CUSTOMFILELABEL);return n&&(r=n.textContent),r},n=function(e){if(e.childNodes.length>0)for(var r=[].slice.call(e.childNodes),n=0;n<r.length;n++){var a=r[n];if(a.nodeType!==t)return a}return e},a=function(t){var r=t.bsCustomFileInput.defaultText,a=t.parentNode.querySelector(e.CUSTOMFILELABEL);a&&(n(a).textContent=r)},l=!!window.File,s="fakepath",i="\\",c=function(e){if(e.hasAttribute("multiple")&&l)return[].slice.call(e.files).map((function(e){return e.name})).join(", ");if(-1!==e.value.indexOf(s)){var t=e.value.split(i);return t[t.length-1]}return e.value};function d(){var t=this.parentNode.querySelector(e.CUSTOMFILELABEL);if(t){var r=n(t),l=c(this);l.length?r.textContent=l:a(this)}}function o(){for(var t=[].slice.call(this.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),r=0,n=t.length;r<n;r++)a(t[r])}var u="bsCustomFileInput",h={FORMRESET:"reset",INPUTCHANGE:"change"};return{init:function(t,n){void 0===t&&(t=e.CUSTOMFILE),void 0===n&&(n=e.FORM);for(var a=[].slice.call(document.querySelectorAll(t)),l=[].slice.call(document.querySelectorAll(n)),s=0,i=a.length;s<i;s++){var c=a[s];Object.defineProperty(c,u,{value:{defaultText:r(c)},writable:!0}),d.call(c),c.addEventListener(h.INPUTCHANGE,d)}for(var f=0,m=l.length;f<m;f++)l[f].addEventListener(h.FORMRESET,o),Object.defineProperty(l[f],u,{value:!0,writable:!0})},destroy:function(){for(var t=[].slice.call(document.querySelectorAll(e.FORM)).filter((function(e){return!!e.bsCustomFileInput})),r=[].slice.call(document.querySelectorAll(e.INPUT)).filter((function(e){return!!e.bsCustomFileInput})),n=0,l=r.length;n<l;n++){var s=r[n];a(s),s[u]=void 0,s.removeEventListener(h.INPUTCHANGE,d)}for(var i=0,c=t.length;i<c;i++)t[i].removeEventListener(h.FORMRESET,o),t[i][u]=void 0}}}()}}]);
//# sourceMappingURL=1230.d9c8b9a3.chunk.js.map