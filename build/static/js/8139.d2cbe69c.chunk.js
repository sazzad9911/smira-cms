"use strict";(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[8139],{8139:function(e,a,s){s.r(a);var n=s(885),l=s(2791),r=s(9271),t=s(2930),c=s(4912),i=s(7266),d=s(3108),o=s(184);a.default=function(){var e=(0,i.v0)(d.Z),a=(0,r.UO)().uid,s=l.useState(null),m=(0,n.Z)(s,2),u=(m[0],m[1]),h=l.useState(),f=(0,n.Z)(h,2),p=f[0],g=f[1],j=l.useState(),x=(0,n.Z)(j,2),b=x[0],N=x[1],v=l.useState(),y=(0,n.Z)(v,2),C=y[0],_=y[1],w=l.useState(),S=(0,n.Z)(w,2),Z=S[0],E=S[1],D=l.useState(),A=(0,n.Z)(D,2),k=A[0],q=A[1];l.useEffect((function(){(0,t.qC)(t.HQ+"/getData",{tableName:"user",condition:"uid='".concat(a,"'")}).then((function(e){if(Array.isArray(e)&&e.length>0)return e[0].membership_type?(_(e[0].membership_type),E((0,t.TJ)(e[0].starting_date)),q((0,t.TJ)(e[0].ending_date))):_("non"),u(e);console.log(e.message)}))}),[a]),l.useEffect((function(){(0,t.qC)(t.HQ+"/getData",{tableName:"membership"}).then((function(e){if(Array.isArray(e)&&e.length>0)return N(e);console.log(e.message)}))}));return(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"page-header",children:[(0,o.jsx)("h3",{className:"page-title",children:" Change Membership Plan "}),(0,o.jsx)("nav",{"aria-label":"breadcrumb",children:(0,o.jsxs)("ol",{className:"breadcrumb",children:[(0,o.jsx)("li",{className:"breadcrumb-item",children:(0,o.jsx)("a",{href:"!#",onClick:function(e){return e.preventDefault()},children:"Plans"})}),(0,o.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Add"})]})})]}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-12 grid-margin",children:(0,o.jsx)("div",{className:"card",children:(0,o.jsxs)("div",{className:"card-body",children:[(0,o.jsx)("h4",{className:"card-title",children:"Information"}),(0,o.jsxs)("form",{className:"form-sample",children:[(0,o.jsx)("p",{className:"card-description",children:"Edit plans and offer "}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(c.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Select Plan"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsxs)("select",{value:C,onChange:function(e){_(e.target.value)},className:"form-control",children:[(0,o.jsx)("option",{value:"non",children:"Non Member"}),b?b.map((function(e,a){return(0,o.jsx)("option",{value:e.type,children:e.name},a)})):(0,o.jsx)("option",{children:"Select one"})]})})]})})}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(c.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Starting Date"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(c.Z.Control,{value:Z,onChange:function(e){return E(e.target.value)},placeholder:"",type:"date"})})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)(c.Z.Group,{className:"row",children:[(0,o.jsx)("label",{className:"col-sm-3 col-form-label",children:"Ending Date"}),(0,o.jsx)("div",{className:"col-sm-9",children:(0,o.jsx)(c.Z.Control,{value:k,onChange:function(e){return q(e.target.value)},placeholder:"",type:"date"})})]})})]}),p?(0,o.jsx)("div",{className:"alert alert-primary",role:"alert",children:p}):(0,o.jsx)(o.Fragment,{})]}),(0,o.jsx)("button",{onClick:function(){if(b)if(C)if("non"==C)(0,t.qC)(t.HQ+"/query",{query:"UPDATE user SET membership_type=NULL,starting_date=NULL,ending_date=NULL WHERE uid='".concat(a,"'")}).then((function(e){if(e.affectedRows)return g("Membership plan change successfully completed");g(e.message),console.log(e)}));else{if(!Z||!k)return void g("Please select a starting or ending date.");if((0,t.ri)(Z,k)<0)return void g("Invalid! Starting date must be previous from ending date");(0,t.qC)(t.HQ+"/updateData",{auth:e.currentUser,tableName:"user",columns:["membership_type","starting_date","ending_date"],values:[C,(0,t.cR)(new Date(Z)),(0,t.cR)(new Date(k))],condition:"uid='".concat(a,"'")}).then((function(e){if(e.affectedRows)return g("Membership plan change successfully completed");g(e.message)}))}else g("Invalid selection.");else g("Error loading membership plans")},className:"btn btn-gradient-secondary btn-rounded btn-fw",children:"SAVE"})]})})})})]})}}}]);
//# sourceMappingURL=8139.d2cbe69c.chunk.js.map