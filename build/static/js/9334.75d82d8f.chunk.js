"use strict";(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[9334],{9334:function(e,a,s){s.r(a);var l=s(5861),r=s(885),n=s(7757),t=s.n(n),c=s(2791),i=s(4912),d=(s(6016),s(8687)),o=s(4569),m=s.n(o),h=s(2930),u=s(7266),x=s(3108),j=s(6167),f=s(184);a.default=function(){var e=c.useState(),a=(0,r.Z)(e,2),s=a[0],n=a[1],o=c.useState(),p=(0,r.Z)(o,2),v=p[0],N=p[1],b=c.useState(),g=(0,r.Z)(b,2),Z=g[0],w=g[1],S=c.useState("Restaurant"),y=(0,r.Z)(S,2),C=y[0],k=(y[1],c.useState()),I=(0,r.Z)(k,2),R=I[0],A=I[1],D=c.useState(!1),O=(0,r.Z)(D,2),U=O[0],E=O[1],G=c.useState(null),L=(0,r.Z)(G,2),F=L[0],J=L[1],_=(0,u.v0)(x.Z),H=c.useState("Restaurant"),P=(0,r.Z)(H,2),Q=(P[0],P[1],c.useState(!1)),q=(0,r.Z)(Q,2),B=q[0],T=q[1],W=(0,d.v9)((function(e){return e.brands})),V=c.useState(),z=(0,r.Z)(V,2),K=z[0],M=z[1],X=c.useState([]),Y=(0,r.Z)(X,2),$=Y[0],ee=Y[1];c.useEffect((function(){if(W){var e=[];W.forEach((function(a,s){e.push({label:a.name,value:a.id})})),M(e)}}),[W]),c.useEffect((function(){(0,h.qC)(h.HQ+"/getData",{tableName:"offer",condition:"id=1"}).then((function(e){Array.isArray(e)&&0!=e.length?(J(e),n(e[0].name),N(e[0].details)):J([])}))}),[U]);var ae=function(){var e=(0,l.Z)(t().mark((function e(a,s,l){var r,n;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=URL.createObjectURL(l[0]),(n=new Image).onload=function(){return n.width==s&&n.height==a?(console.log("correct"),T(!0),!0):(T(!1),URL.revokeObjectURL(n.src),!1)},n.src=r;case 4:case"end":return e.stop()}}),e)})));return function(a,s,l){return e.apply(this,arguments)}}();return(0,f.jsxs)("div",{children:[(0,f.jsxs)("div",{className:"page-header",children:[(0,f.jsx)("h3",{className:"page-title",children:" Favorite Categories "}),(0,f.jsx)("nav",{"aria-label":"breadcrumb",children:(0,f.jsxs)("ol",{className:"breadcrumb",children:[(0,f.jsx)("li",{className:"breadcrumb-item",children:(0,f.jsx)("a",{href:"!#",onClick:function(e){return e.preventDefault()},children:"All"})}),(0,f.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Poster"})]})})]}),(0,f.jsx)("div",{className:"row",children:(0,f.jsx)("div",{className:"col-12 grid-margin",children:(0,f.jsx)("div",{className:"card",children:(0,f.jsxs)("div",{className:"card-body",children:[(0,f.jsx)("h4",{className:"card-title",children:"Information"}),(0,f.jsxs)("form",{className:"form-sample",children:[(0,f.jsx)("p",{className:"card-description",children:" Add Poster with brand list "}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsxs)(i.Z.Group,{className:"row",children:[(0,f.jsx)("label",{className:"col-sm-3 col-form-label",children:"Title"}),(0,f.jsx)("div",{className:"col-sm-9",children:(0,f.jsx)(i.Z.Control,{value:s,placeholder:"optional",onChange:function(e){return n(e.target.value)},type:"text"})})]})}),(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsxs)(i.Z.Group,{className:"row",children:[(0,f.jsx)("label",{className:"col-sm-3 col-form-label",children:"Details"}),(0,f.jsx)("div",{className:"col-sm-9",children:(0,f.jsx)(i.Z.Control,{value:v,onChange:function(e){return N(e.target.value)},placeholder:"optional",type:"text"})})]})})]}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsxs)(i.Z.Group,{className:"row",children:[(0,f.jsx)("label",{className:"col-sm-3 col-form-label",children:"Select Brands"}),(0,f.jsxs)("div",{className:"col-sm-9",children:[(0,f.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:JSON.parse(JSON.stringify($)).map((function(e,a){return(0,f.jsx)("p",{style:{margin:"5px"},children:e.label},a)}))}),K&&K.length>0?(0,f.jsx)(j.NU,{options:K,value:$,onChange:function(e){ee(e)},labelledBy:"Select"}):(0,f.jsx)(f.Fragment,{})]})]})}),(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsxs)(i.Z.Group,{className:"row",children:[(0,f.jsx)("label",{className:"col-sm-3 col-form-label",children:"Add Poster Image-1300*800"}),(0,f.jsx)("div",{className:"col-sm-9",children:(0,f.jsx)(i.Z.Control,{onChange:function(e){w(e.target.files),ae(800,1300,e.target.files)},type:"file"})})]})})]}),R?(0,f.jsx)("div",{className:"alert alert-primary",role:"alert",children:R}):(0,f.jsx)(f.Fragment,{})]}),(0,f.jsx)("button",{onClick:function(){if(B)if(Z&&$){var e=JSON.parse(JSON.stringify($)),a=null;e.forEach((function(e){a=a?a+","+e.value:e.value}));var l=new FormData;l.append("file",Z[0]),m().post(h.HQ+"/uploadWithData",l).then((function(e){e.data.url&&(0,h.qC)(h.HQ+"/updateData",{auth:_.currentUser,tableName:"offer",columns:["name","image","details","type","brands"],values:[s,e.data.url,v,C||"",a],condition:"id=1"}).then((function(e){console.log(e),e.affectedRows?(A("Image Saved."),E(!U)):A(e.message)}))}))}else A("Image and brands field are can not be empty");else A("Select 1300*800 image file")},className:"btn btn-gradient-secondary btn-rounded btn-fw",children:"SAVE"})]})})})}),(0,f.jsx)("div",{className:"row",children:(0,f.jsx)("div",{className:"col-lg-12 grid-margin stretch-card",children:(0,f.jsx)("div",{className:"card",children:(0,f.jsxs)("div",{className:"card-body",children:[(0,f.jsx)("h4",{className:"card-title",children:"Information"}),(0,f.jsx)(i.Z.Group,{className:"row"}),(0,f.jsx)("div",{className:"table-responsive",children:(0,f.jsxs)("table",{className:"table table-striped",children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:" Image "}),(0,f.jsx)("th",{children:" Title "})]})}),(0,f.jsx)("tbody",{children:F?F.length>0?F.map((function(e,a){return(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:(0,f.jsx)("img",{src:e.image,alt:e.name})}),(0,f.jsx)("td",{children:e.name})]},a)})):(0,f.jsx)("tr",{children:(0,f.jsx)("td",{children:"No data available"})}):(0,f.jsx)("tr",{children:(0,f.jsx)("td",{children:"Loading..."})})})]})})]})})})})]})}}}]);
//# sourceMappingURL=9334.75d82d8f.chunk.js.map