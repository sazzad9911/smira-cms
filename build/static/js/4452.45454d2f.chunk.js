"use strict";(self.webpackChunkpurple_react_free=self.webpackChunkpurple_react_free||[]).push([[4452],{4452:function(e,n,r){r.r(n);var t=r(885),s=r(2791),i=r(8687),l=r(2930),c=r(7266),a=r(3108),d=r(184);n.default=function(){var e=s.useState("Hotels"),n=(0,t.Z)(e,2),r=(n[0],n[1],(0,i.v9)((function(e){return e.hotelBooking})),(0,i.v9)((function(e){return e.userInfo})),(0,i.v9)((function(e){return e.hotels})),(0,i.v9)((function(e){return e.deals})),(0,i.v9)((function(e){return e.bookAppointment})),s.useState(null)),u=(0,t.Z)(r,2),o=u[0],x=u[1],j=s.useState(),m=(0,t.Z)(j,2),f=m[0],p=m[1],v=((0,i.I0)(),(0,c.v0)(a.Z),s.useState(!1)),b=(0,t.Z)(v,2),g=(b[0],b[1],(0,i.v9)((function(e){return e.brands})),s.useState(1)),N=(0,t.Z)(g,2),k=N[0],y=N[1],C=s.useState([]),_=(0,t.Z)(C,2),Z=_[0],A=_[1];return s.useEffect((function(){(0,l.qC)(l.HQ+"/getData",{tableName:"booking_enquiry",orderColumn:"date"}).then((function(e){Array.isArray(e)?p(e):console.log(e.message)}))}),[]),s.useEffect((function(){if(f){var e=[];f.forEach((function(n,r){r<10*k&&r>=10*k-10&&e.push(n)})),x(e);for(var n=f.length/10,r=parseInt(n),t=[],s=0;s<r;s++)t.push(r);n>r?(t.push(r),A(t)):A(t)}}),[k+f]),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"page-header",children:[(0,d.jsx)("h3",{className:"page-title",children:" All Enquiry "}),(0,d.jsx)("nav",{"aria-label":"breadcrumb",children:(0,d.jsxs)("ol",{className:"breadcrumb",children:[(0,d.jsx)("li",{className:"breadcrumb-item",children:(0,d.jsx)("a",{href:"#",onClick:function(e){return e.preventDefault()},children:"Customers"})}),(0,d.jsx)("li",{className:"breadcrumb-item active","aria-current":"page",children:"Enquiry"})]})})]}),(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)("div",{className:"col-lg-12 grid-margin stretch-card",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("div",{className:"card-body",children:(0,d.jsx)("div",{className:"table-responsive",children:(0,d.jsxs)("table",{className:"table table-striped",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:" Name "}),(0,d.jsx)("th",{children:" Email "}),(0,d.jsx)("th",{children:"Membership"}),(0,d.jsx)("th",{children:" Phone "}),(0,d.jsx)("th",{children:" Date "}),(0,d.jsx)("th",{children:" Address "}),(0,d.jsx)("th",{children:"Room"}),(0,d.jsx)("th",{children:"Children"}),(0,d.jsx)("th",{children:"Adults"}),(0,d.jsx)("th",{children:"Check In"}),(0,d.jsx)("th",{children:"Check Out"})]})}),(0,d.jsx)("tbody",{children:o?o.map((function(e,n){return(0,d.jsx)(h,{data:e},n)})):(0,d.jsx)("tr",{children:(0,d.jsx)("td",{children:"Loading.."})})})]})})})})}),Z.length>1?(0,d.jsx)("nav",{style:{width:"100%",overflow:"scroll"},areaLabel:"Page navigation example",children:(0,d.jsxs)("ul",{className:"pagination",children:[(0,d.jsx)("li",{className:"page-item",children:(0,d.jsx)("button",{onClick:function(){k>1&&y(k-1)},className:"page-link",children:"Previous"})}),Z.map((function(e,n){return(0,d.jsx)("li",{className:k==n+1?"page-item active":"page-item",children:(0,d.jsx)("button",{onClick:function(){y(n+1)},className:"page-link",children:n+1})},n)})),(0,d.jsx)("li",{className:"page-item",children:(0,d.jsx)("button",{onClick:function(){k<Z.length&&y(k+1)},className:"page-link",children:"Next"})})]})}):(0,d.jsx)(d.Fragment,{})]})]})};var h=function(e){var n=e.data,r=(0,i.v9)((function(e){return e.userInfo}));(0,i.v9)((function(e){return e.hotels}));return(0,d.jsxs)("tr",{children:[(0,d.jsxs)("td",{children:[" ",r?r.filter((function(e){return e.uid==n.uid}))[0].name:""," "]}),(0,d.jsxs)("td",{children:[" ",r?r.filter((function(e){return e.uid==n.uid}))[0].email:""," "]}),(0,d.jsxs)("td",{children:[" ",r?r.filter((function(e){return e.uid==n.uid}))[0].membership_type:"non"," "]}),(0,d.jsxs)("td",{children:[" ",r?r.filter((function(e){return e.uid==n.uid}))[0].phone:""," "]}),(0,d.jsx)("td",{children:(0,l.Ny)(n.date)}),(0,d.jsx)("td",{children:n.address}),(0,d.jsx)("td",{children:n.room}),(0,d.jsx)("td",{children:n.children}),(0,d.jsx)("td",{children:n.adults}),(0,d.jsxs)("td",{children:[" ",(0,l.Ny)(n.check_in)," "]}),(0,d.jsxs)("td",{children:[" ",(0,l.Ny)(n.check_out)," "]})]})}}}]);
//# sourceMappingURL=4452.45454d2f.chunk.js.map