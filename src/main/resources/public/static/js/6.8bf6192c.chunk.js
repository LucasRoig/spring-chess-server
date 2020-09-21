(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{105:function(t,e,a){"use strict";a.d(e,"b",function(){return o}),a.d(e,"a",function(){return r});var n=a(96),s=a.n(n),o=s.a.struct({whiteName:s.a.String,blackName:s.a.String,id:s.a.Number}),r=s.a.struct({name:s.a.String,id:s.a.Number,gameHeaders:s.a.list(o)})},110:function(t,e,a){"use strict";a.d(e,"a",function(){return u}),a.d(e,"b",function(){return d});var n=a(26),s=a(29),o=a(28),r=a(30),i=a(0),c=a(16),u=function(t){function e(){var t,a;Object(n.a)(this,e);for(var r=arguments.length,i=new Array(r),u=0;u<r;u++)i[u]=arguments[u];return(a=Object(s.a)(this,(t=Object(o.a)(e)).call.apply(t,[this].concat(i)))).close=function(){!function(){var t=document.getElementById(l);t&&(Object(c.unmountComponentAtNode)(t),t.parentNode.removeChild(t))}()},a}return Object(r.a)(e,t),e}(i.Component),l="modal-window";function d(t){!function(t){var e=document.getElementById(l);e||((e=document.createElement("div")).id=l,document.body.appendChild(e)),Object(c.render)(t,e)}(t)}},111:function(t,e,a){},112:function(t,e,a){"use strict";var n=a(15),s=a(96),o=a.n(s),r=a(94),i=a(105),c=o.a.struct({name:o.a.String},"PostDatabaseRequest");e.a={listDatabases:function(){return n.a.get("/database").then(function(t){if(200===t.status)return t.data;throw t}).then(function(t){return console.log(t),t}).catch(function(t){console.error(t)})},postDatabase:function(t){var e=t.name,a=c({name:e});return n.a.post("/database",a).then(function(t){if(200===t.status||201===t.status)return console.log(t.data),t.data;throw t}).catch(function(t){console.error(t)})},getDetails:function(t){return n.a.get("/database/"+t).then(function(t){if(200===t.status){var e=Object(i.a)(t.data);return console.log(e),e}throw t}).catch(function(t){console.error(t)})},createGame:function(t){var e=new r.a;return n.a.post("/database/"+t+"/game",e).then(function(t){if(200===t.status||201===t.status)return Object(i.b)({whiteName:t.data.whiteName,blackName:t.data.blackName,id:t.data.id});throw t}).catch(function(t){console.error(t)})},deleteDatabase:function(t){return n.a.delete("/database/"+t).then(function(t){if(200===t.status)return!0;throw t}).catch(function(t){console.error(t)})},importPgn:function(t,e){var a=new FormData;return a.append("pgnFile",e,e.name),n.a.post("/database/"+t+"/uploadPgn",a).then(function(t){if(200!==t.status&&201!==t.status)throw t;return t.data})}}},198:function(t,e,a){"use strict";a.r(e);var n=a(26),s=a(27),o=a(29),r=a(28),i=a(30),c=a(43),u=a(0),l=a.n(u),d=(a(111),a(112)),m=a(110),f=a(11),b=a.n(f),h=function(t){function e(){var t,a;Object(n.a)(this,e);for(var s=arguments.length,i=new Array(s),c=0;c<s;c++)i[c]=arguments[c];return(a=Object(o.a)(this,(t=Object(r.a)(e)).call.apply(t,[this].concat(i)))).handleCancel=function(){a.props.onCancel(),a.close()},a.handleConfirm=function(){a.props.onConfirm(),a.close()},a}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"modal is-active"},l.a.createElement("div",{className:"modal-background",onClick:this.handleCancel}),l.a.createElement("div",{className:"modal-card"},l.a.createElement("header",{className:"modal-card-head"},l.a.createElement("p",{className:"modal-card-title"},this.props.title)),l.a.createElement("section",{className:"modal-card-body"},l.a.createElement("p",null,this.props.message)),l.a.createElement("footer",{className:"modal-card-foot space-between"},l.a.createElement("button",{className:"button",onClick:this.handleCancel},this.props.cancelButtonText),l.a.createElement("button",{className:"button "+this.props.confirmButtonClass,onClick:this.handleConfirm},this.props.confirmButtonText))))}}]),e}(m.a);h.propTypes={title:b.a.string,message:b.a.string,onConfirm:b.a.func,onCancel:b.a.func,confirmButtonText:b.a.string,cancelButtonText:b.a.string,confirmButtonClass:b.a.string},h.defaultProps={title:"Confirmation",message:"\xcates-vous s\xfbr ?",onConfirm:function(){return null},onCancel:function(){return null},confirmButtonText:"Valider",cancelButtonText:"Annuler",confirmButtonClass:"is-success"};var p=function(t){return l.a.createElement("tr",{onClick:t.onClick},l.a.createElement("td",null,t.database.name),l.a.createElement("td",null,t.database.gameHeaders.length),l.a.createElement("td",null),l.a.createElement("td",null,l.a.createElement("button",{className:"button is-danger",onClick:function(e){e.stopPropagation(),function(t){Object(m.b)(l.a.createElement(h,t))}({title:"Suppression de la base "+t.database.name,message:"\xcates vous s\xfbr de vouloir supprimer la base "+t.database.name,confirmButtonText:"Supprimer",confirmButtonClass:"is-danger",onConfirm:function(){var e=t.database.id;d.a.deleteDatabase(e).then(function(a){a&&t.onDelete(e)})}})}},"Supprimer")))},v=function(t){var e=Object(u.useState)(""),a=Object(c.a)(e,2),n=a[0],s=a[1];return l.a.createElement("div",{className:"field has-addons"},l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",placeholder:"Cr\xe9er une base",value:n,onChange:function(t){return s(t.target.value)}})),l.a.createElement("div",{className:"control"},l.a.createElement("span",{className:"button is-success",onClick:function(){0!==n.length&&d.a.postDatabase({name:n}).then(function(e){t.onDatabaseCreated(e)})},disabled:0===n.length},"Valider")))},g=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(o.a)(this,Object(r.a)(e).call(this,t))).onDatabaseCreated=function(t){var e=a.state.databases;e.push(t),a.setState({databases:e})},a.onDatabaseDeleted=function(t){var e=a.state.databases;e=e.filter(function(e){return e.id!==t}),a.setState({databases:e})},a.state={databases:[],loading:!1},a}return Object(i.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.setState({loading:!0}),d.a.listDatabases().then(function(e){t.setState({databases:e})})}},{key:"render",value:function(){var t=this;return l.a.createElement("div",null,l.a.createElement(v,{onDatabaseCreated:this.onDatabaseCreated}),l.a.createElement("table",{className:"databases table is-striped is-hoverable is-fullwidth"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Nom"),l.a.createElement("th",null,"Nombre de parties"),l.a.createElement("th",null,"Types"),l.a.createElement("th",null))),l.a.createElement("tbody",null,this.state.databases&&this.state.databases.map(function(e){return l.a.createElement(p,{database:e,key:e.id,onDelete:t.onDatabaseDeleted,onClick:function(){return t.props.history.push("/database/"+e.id)}})}))))}}]),e}(u.Component);e.default=g},87:function(t,e,a){"use strict";a.d(e,"b",function(){return n}),a.d(e,"a",function(){return s});var n="w",s="b"},93:function(t,e,a){"use strict";a.d(e,"a",function(){return r});var n=a(26),s=a(27),o=a(87),r=function(){function t(e,a,s){Object(n.a)(this,t),this.fen=e,this.lastMove=a,this.previousPosition=s,this.nextPosition=null,this.comment="",this.sublines=[],this.previousPosition?"w"===this.lastMove.color?this.moveNumber=this.previousPosition.moveNumber+1:this.moveNumber=this.previousPosition.moveNumber:this.moveNumber=0}return Object(s.a)(t,[{key:"sideToMove",value:function(){return this.lastMove&&this.lastMove.color!==o.a?o.a:o.b}},{key:"addNextPosition",value:function(t){this.nextPosition?this.nextPosition.fen!==t.fen&&(this.sublines.find(function(e){return e.fen===t.fen})||this.sublines.push(t)):this.nextPosition=t}}]),t}()},94:function(t,e,a){"use strict";a.d(e,"a",function(){return o});var n=a(26),s=a(93),o=function t(){Object(n.a)(this,t),this.positions=[],this.startingPosition=new s.a("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),this.whiteName="white",this.blackName="black"}}}]);
//# sourceMappingURL=6.8bf6192c.chunk.js.map