"use strict";(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[2583],{2583:function(e,a,n){n.r(a);var t=n(885),s=n(2791),l=n(8687),r=n(1523),i=n(2930),c=n(184);a.default=function(){var e=(0,l.v9)((function(e){return e.brands})),a=s.useState([]),n=(0,t.Z)(a,2),r=n[0],i=n[1],o=s.useState(1),h=(0,t.Z)(o,2),u=h[0],m=h[1],b=s.useState(null),x=(0,t.Z)(b,2),j=x[0],f=x[1];return s.useEffect((function(){if(e){var a=[];e.forEach((function(e,n){n<10*u&&n>=10*u-10&&a.push(e)})),f(a);for(var n=e.length/10,t=parseInt(n),s=[],l=0;l<t;l++)s.push(t);n>t?(s.push(t),i(s)):i(t)}}),[u+e]),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"page-header",children:[(0,c.jsx)("h3",{className:"page-title",children:" Brand List "}),(0,c.jsx)("nav",{"aria-label":"breadcrumb",children:(0,c.jsxs)("ol",{className:"breadcrumb",children:[(0,c.jsx)("li",{className:"breadcrumb-item",children:(0,c.jsx)("a",{href:"!#",onClick:function(e){return e.preventDefault()},children:"Brands"})}),(0,c.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"All"})]})})]}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsx)("div",{className:"col-lg-12 grid-margin stretch-card",children:(0,c.jsx)("div",{className:"card",children:(0,c.jsxs)("div",{className:"card-body",children:[(0,c.jsx)("h4",{className:"card-title",children:"All Data"}),(0,c.jsx)("div",{className:"table-responsive",children:(0,c.jsxs)("table",{className:"table table-striped",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:" Logo "}),(0,c.jsx)("th",{children:" Name "}),(0,c.jsx)("th",{children:" Action "})]})}),(0,c.jsx)("tbody",{children:j?j.map((function(e,a){return(0,c.jsx)(d,{data:e},a)})):(0,c.jsx)(c.Fragment,{})})]})})]})})}),r.length>0?(0,c.jsx)("nav",{children:(0,c.jsxs)("ul",{className:"pagination",children:[(0,c.jsx)("li",{className:"page-item",children:(0,c.jsx)("button",{onClick:function(){u>1&&m(u-1)},className:"page-link",children:"Previous"})}),r.map((function(e,a){return(0,c.jsx)("li",{className:u==a+1?"page-item active":"page-item",children:(0,c.jsx)("button",{onClick:function(){m(a+1)},className:"page-link",children:a+1})},a)})),(0,c.jsx)("li",{className:"page-item",children:(0,c.jsx)("button",{onClick:function(){u<r.length&&m(u+1)},className:"page-link",children:"Next"})})]})}):(0,c.jsx)(c.Fragment,{})]})]})};var d=function(e){var a=e.data,n=s.useState(!1),d=(0,t.Z)(n,2),o=d[0],h=(d[1],(0,l.I0)());return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:"py-1",children:(0,c.jsx)("img",{src:a.image,alt:"user icon"})}),(0,c.jsxs)("td",{children:[" ",a.name]}),o?(0,c.jsx)(c.Fragment,{}):(0,c.jsxs)("td",{children:[(0,c.jsx)("button",{onClick:function(){var e;e=a.id,(0,i.qC)(i.HQ+"/deleteData",{tableName:"brands",condition:"id="+e}).then((function(a){console.log(a),(0,i.qC)(i.HQ+"/deleteData",{tableName:"deals",condition:"brand_id="+e}).then((function(e){console.log(e)})),(0,i.qC)(i.HQ+"/deleteData",{tableName:"banner",condition:"brand_id="+e}).then((function(e){console.log(e)})),(0,i.qC)(i.HQ+"/deleteData",{tableName:"restaurant",condition:"brand_id="+e}).then((function(e){console.log(e)})),(0,i.qC)(i.HQ+"/deleteData",{tableName:"slider",condition:"brand_id="+e}).then((function(e){console.log(e)})),(0,i.qC)(i.HQ+"/deleteData",{tableName:"outlets",condition:"brand_id="+e}).then((function(e){console.log(e)})),(0,i.qC)(i.HQ+"/getData",{tableName:"brands"}).then((function(e){Array.isArray(e)&&h((0,i.dk)(e))}))})),(0,i.qC)(i.HQ+"/deleteData",{tableName:"deals",condition:"brand_id="+e}).then((function(e){console.log(e),(0,i.qC)(i.HQ+"/getData",{tableName:"deals",orderColumn:"date"}).then((function(e){Array.isArray(e)&&h((0,i.ry)(e))}))}))},className:"btn btn-gradient-danger btn-rounded btn-fw",children:"Delete"}),(0,c.jsx)(r.rU,{style:{marginLeft:"5px"},to:"/brands/update/"+a.id,className:"btn btn-gradient-danger btn-rounded btn-fw",children:"Update"})]})]})}}}]);
//# sourceMappingURL=2583.4d8ca2c4.chunk.js.map