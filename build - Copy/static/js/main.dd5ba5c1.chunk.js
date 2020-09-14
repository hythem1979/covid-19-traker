(this["webpackJsonpcofid-19-traker"]=this["webpackJsonpcofid-19-traker"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},201:function(e,t,a){},202:function(e,t,a){},204:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),o=a.n(c),s=(a(98),a(19)),l=a.n(s),i=a(30),u=a(15),m=a(236),d=a(237),f=a(238),v=a(230),p=a(234),h=a(12),E=(a(100),a(235));a(101);var y=function(e){var t=e.title,a=e.cases,n=e.active,c=e.color,o=e.total,s=e.onClick;return r.a.createElement(v.a,{onClick:s,className:"infoBox ".concat(n&&"infoBox--selected"),style:{borderColor:c}},r.a.createElement(p.a,null,r.a.createElement(E.a,{className:"infoBox__title",color:"textSecondary"},t),r.a.createElement("h2",{className:"infoBox__cases",style:{color:c}},a),r.a.createElement(E.a,{className:"infoBox__total",color:"textSecondary"},o," Total")))},b=a(84),w=a(17),j=a.n(w),g={legend:{display:!1},elements:{point:{radius:0}},maintainAspectRatio:!1,tooltips:{mode:"index",intersect:!1,callbacks:{label:function(e,t){return j()(e.value).format("+0,0")}}},scales:{xAxes:[{type:"time",time:{format:"MM/DD/YY",tooltipFormat:"ll"}}],yAxes:[{gridLines:{display:!1},ticks:{callback:function(e,t,a){return j()(e).format("0a")}}}]}},O=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cases",n=[];for(var r in e.cases){if(t){var c={x:r,y:e[a][r]-t};n.push(c)}t=e[a][r]}return n};var x=function(e){var t=e.caseType,a=void 0===t?"cases":t,c=e.graphBGColor,o=e.className,s=e.country,m=Object(n.useState)({}),d=Object(u.a)(m,2),f=d[0],v=d[1];return Object(n.useEffect)((function(){return Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://disease.sh/v3/covid-19/historical/".concat("worldwide"===s?"all":s,"?lastdays=120")).then((function(e){return e.json()})).then((function(e){var t;t=O("worldwide"===s?e:e.timeline,a),v(t)}));case 2:case"end":return e.stop()}}),e)})))(),function(){}}),[a,s]),r.a.createElement("div",{className:o},(null===f||void 0===f?void 0:f.length)>0&&r.a.createElement(b.Line,{options:g,data:{datasets:[{backgroundColor:c,color:"#cc1034",data:f}]}}))},k=a(241),N=a(242),_=(a(201),a(86)),C=a(239),S=a(240),B={cases:{hex:"#FF5722",multiplier:800},recovered:{hex:"#7dd71d",multiplier:800},deaths:{hex:"#f31a0a",multiplier:2e3}},I=function(e){var t=Object(_.a)(e);return t.sort((function(e,t){return e.cases>t.cases?-1:1})),t},T=function(e){return e?"+".concat(j()(e).format("0.0a")):"+0"},D=function(e){var t=e.countries,a=e.casesType,n=e.center,c=e.zoom;return r.a.createElement("div",{className:"map"},r.a.createElement(k.a,{center:n,zoom:c},r.a.createElement(N.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",noWrap:"true",minZoom:"1.4",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cases";return e.map((function(e){return r.a.createElement(C.a,{key:e.country,center:[e.countryInfo.lat,e.countryInfo.long],color:B[t].hex,fillColor:B[t].hex,fillOpacity:.4,radius:Math.sqrt(e[t])*B[t].multiplier},r.a.createElement(S.a,null,r.a.createElement("div",{className:"info-container"},r.a.createElement("div",{className:"info-flag",style:{backgroundImage:"url(".concat(e.countryInfo.flag,")")}}),r.a.createElement("div",{className:"info-name"},e.country),r.a.createElement("div",{className:"info-confirmed"},"Cases: ",j()(e.cases).format("0,0")),r.a.createElement("div",{className:"info-recovered"},"Recovered: ",j()(e.recovered).format("0,0")),r.a.createElement("div",{className:"info-deaths"},"Deaths: ",j()(e.deaths).format("0,0")))))}))}(t,a)))};a(202);var R=function(e){var t=e.countries;return r.a.createElement("div",{className:"table"},r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(e){var t=e.country,a=e.cases;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,t),r.a.createElement("td",null,r.a.createElement("strong",null,j()(a).format("0,0"))))})))))},F=(a(203),{cases:"#FF5722",recovered:"#7dd71d",deaths:"#f31a0a"});var M=function(){var e,t=Object(n.useState)([]),a=Object(u.a)(t,2),c=a[0],o=a[1],s=Object(n.useState)("worldwide"),E=Object(u.a)(s,2),b=E[0],w=E[1],j=Object(n.useState)({}),g=Object(u.a)(j,2),O=g[0],k=g[1],N=Object(n.useState)([]),_=Object(u.a)(N,2),C=_[0],S=_[1],B=Object(n.useState)({lat:34.80746,lng:0}),M=Object(u.a)(B,2),W=M[0],z=M[1],A=Object(n.useState)(2),L=Object(u.a)(A,2),G=L[0],J=L[1],Y=Object(n.useState)([]),q=Object(u.a)(Y,2),H=q[0],K=q[1],V=Object(n.useState)("cases"),Z=Object(u.a)(V,2),$=Z[0],P=Z[1];Object(n.useEffect)((function(){return Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://disease.sh/v3/covid-19/all").then((function(e){return e.json()})).then((function(e){k(e)}));case 2:case"end":return e.stop()}}),e)})))(),function(){}}),[]),Object(n.useEffect)((function(){return function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://disease.sh/v3/covid-19/countries").then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return{name:e.country,value:e.countryInfo.iso3}})),a=I(e);S(a),K(e),o(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()(),function(){}}),[]);var Q=function(){var e=Object(i.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.value,n="worldwide"===a?"https://disease.sh/v3/covid-19/all":"https://disease.sh/v3/covid-19/countries/".concat(a),e.next=4,fetch(n).then((function(e){return e.json()})).then((function(e){w(a),k(e),"worldwide"===a?(J(2),z([34.80746,0])):(J(4),z([e.countryInfo.lat,e.countryInfo.long]))}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"app__left"},r.a.createElement("div",{className:"app__header"},r.a.createElement("h1",null,"COVID-19 TRACKER"),r.a.createElement(m.a,{className:"app__dropdown"},r.a.createElement(d.a,{variant:"outlined",onChange:Q,value:b},r.a.createElement(f.a,{value:"worldwide"},"Worldwide"),c.map((function(e){return r.a.createElement(f.a,{key:e.name,value:e.value},e.name)}))))),r.a.createElement("div",{className:"app__status"},r.a.createElement(y,{title:"Coronavirus Cases",onClick:function(e){return P("cases")},active:"cases"===$,color:F.cases,cases:T(O.todayCases),total:T(O.cases)}),r.a.createElement(y,{title:"Recovered",onClick:function(e){return P("recovered")},active:"recovered"===$,color:F.recovered,cases:T(O.todayRecovered),total:T(O.recovered)}),r.a.createElement(y,{title:"Deaths",onClick:function(e){return P("deaths")},active:"deaths"===$,color:F.deaths,cases:T(O.todayDeaths),total:T(O.deaths)})),r.a.createElement(D,{countries:H,casesType:$,center:W,zoom:G})),r.a.createElement(v.a,{className:"app__rigth"},r.a.createElement(p.a,null,r.a.createElement("h3",null,"Live Cases By Country"),r.a.createElement(R,{countries:C}),r.a.createElement("h3",{className:"app__graphTitle"},"worldwide"===b?"Worldwide":null===(e=c.filter((function(e){return e.value===b}))[0])||void 0===e?void 0:e.name," Historical ",Object(h.a)($)),r.a.createElement(x,{country:b,caseType:$,graphBGColor:F[$],className:"app__graph"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},93:function(e,t,a){e.exports=a(204)},98:function(e,t,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.dd5ba5c1.chunk.js.map