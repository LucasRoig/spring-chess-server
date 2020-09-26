(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{102:function(t,e,n){"use strict";var a=n(27),o=n(26),i=n(15),r=n(94),s=n(93),c=function t(){var e=this;Object(o.a)(this,t),this.gameToDto=function(t){var n={};return n.blackName=t.blackName,n.whiteName=t.whiteName,n.positions=[],t.id&&t.id>=0&&(n.id=t.id),e.visitPosition(t.startingPosition,n),n},this.visitPosition=function(t,n){var a={};if(a.positionIndex=e.counter,e.counter++,a.commentAfter=t.comment,a.fen=t.fen,a.lastMoveSan=t.lastMove?t.lastMove.san:"",t.nextPosition){var o=e.visitPosition(t.nextPosition,n);a.nextPosition=o.positionIndex}var i=[],r=!0,s=!1,c=void 0;try{for(var u,l=t.sublines[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var m=u.value,d=e.visitPosition(m,n);i.push(d.positionIndex)}}catch(f){s=!0,c=f}finally{try{r||null==l.return||l.return()}finally{if(s)throw c}}return 0===i.length?a.sublines="":a.sublines=i.join(";"),n.positions.push(a),a},this.counter=0},u=function(){function t(){Object(o.a)(this,t)}return Object(a.a)(t,[{key:"dtoToGame",value:function(t){var e=new r.a;if(e.whiteName=t.whiteName,e.blackName=t.blackName,e.id=t.id,t.positions.length>0){var n=[],a=!0,o=!1,i=void 0;try{for(var s,c=t.positions[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var u=s.value;n[u.positionIndex]=u}}catch(l){o=!0,i=l}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}e.startingPosition=this.parsePosition(n,0)}return e}},{key:"parsePosition",value:function(t,e,n){var a=t[e],o=e>0?this.parseMove(a):void 0,i=new s.a(a.fen,o,n);if(i.comment=a.commentAfter,a.nextPosition>0){var r=this.parsePosition(t,a.nextPosition,i);i.nextPosition=r}if(a.sublines.length>0){var c=!0,u=!1,l=void 0;try{for(var m,d=a.sublines.split(";")[Symbol.iterator]();!(c=(m=d.next()).done);c=!0){var f=m.value,h=this.parsePosition(t,parseInt(f),i);i.sublines.push(h)}}catch(p){u=!0,l=p}finally{try{c||null==d.return||d.return()}finally{if(u)throw l}}}return i}},{key:"parseMove",value:function(t){return{san:t.lastMoveSan,color:"b"===t.fen.split(" ")[1]?"w":"b"}}}]),t}();e.a={fetchGame:function(t){return i.a.get("/game/"+t).then(function(t){if(200===t.status){var e=(new u).dtoToGame(t.data);return console.log(e),e}throw t}).catch(function(t){console.error(t)})},saveGame:function(t){var e=(new c).gameToDto(t);return console.log(e),i.a.post("/game/"+t.id,e).then(function(t){if(200!==t.status)throw t}).catch(function(t){console.error(t)})},deleteGame:function(t){return i.a.delete("/game/"+t.id).then(function(t){if(200!==t.status)throw t;return!0}).catch(function(t){console.error(t)})}}},107:function(t,e,n){"use strict";n.d(e,"b",function(){return i}),n.d(e,"a",function(){return r});var a=n(96),o=n.n(a),i=o.a.struct({whiteName:o.a.String,blackName:o.a.String,id:o.a.Number}),r=o.a.struct({name:o.a.String,id:o.a.Number,gameHeaders:o.a.list(i)})},112:function(t,e,n){},119:function(t,e,n){"use strict";n.d(e,"a",function(){return h});var a=n(26),o=n(27),i=n(29),r=n(28),s=n(30),c=n(0),u=n.n(c),l=n(98),m=n(11),d=n.n(m),f=function(t){function e(){var t,n;Object(a.a)(this,e);for(var o=arguments.length,s=new Array(o),c=0;c<o;c++)s[c]=arguments[c];return(n=Object(i.a)(this,(t=Object(r.a)(e)).call.apply(t,[this].concat(s)))).handleCancel=function(){n.props.onCancel(),n.close()},n.handleConfirm=function(){n.props.onConfirm(),n.close()},n}return Object(s.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"modal is-active"},u.a.createElement("div",{className:"modal-background",onClick:this.handleCancel}),u.a.createElement("div",{className:"modal-card"},u.a.createElement("header",{className:"modal-card-head"},u.a.createElement("p",{className:"modal-card-title"},this.props.title)),u.a.createElement("section",{className:"modal-card-body"},u.a.createElement("p",null,this.props.message)),u.a.createElement("footer",{className:"modal-card-foot space-between"},u.a.createElement("button",{className:"button",onClick:this.handleCancel},this.props.cancelButtonText),u.a.createElement("button",{className:"button "+this.props.confirmButtonClass,onClick:this.handleConfirm},this.props.confirmButtonText))))}}]),e}(l.a);function h(t){Object(l.b)(u.a.createElement(f,t))}f.propTypes={title:d.a.string,message:d.a.string,onConfirm:d.a.func,onCancel:d.a.func,confirmButtonText:d.a.string,cancelButtonText:d.a.string,confirmButtonClass:d.a.string},f.defaultProps={title:"Confirmation",message:"\xcates-vous s\xfbr ?",onConfirm:function(){return null},onCancel:function(){return null},confirmButtonText:"Valider",cancelButtonText:"Annuler",confirmButtonClass:"is-success"}},122:function(t,e,n){"use strict";function a(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=n(15),i=n(96),r=n.n(i),s=n(94),c=n(107),u=r.a.struct({name:r.a.String},"PostDatabaseRequest");e.a={listDatabases:function(){return o.a.get("/database").then(function(t){if(200===t.status)return t.data;throw t}).then(function(t){return console.log(t),t}).catch(function(t){console.error(t)})},postDatabase:function(t){var e=t.name,n=u({name:e});return o.a.post("/database",n).then(function(t){if(200===t.status||201===t.status)return console.log(t.data),t.data;throw t}).catch(function(t){console.error(t)})},getDetails:function(t){return o.a.get("/database/"+t).then(function(t){if(200===t.status){var e=Object(c.a)(t.data);return console.log(e),e}throw t}).catch(function(t){console.error(t)})},createGame:function(t){var e=new s.a;return o.a.post("/database/"+t+"/game",e).then(function(t){if(200===t.status||201===t.status)return Object(c.b)({whiteName:t.data.whiteName,blackName:t.data.blackName,id:t.data.id});throw t}).catch(function(t){console.error(t)})},deleteDatabase:function(t){return o.a.delete("/database/"+t).then(function(t){if(200===t.status)return!0;throw t}).catch(function(t){console.error(t)})},importPgn:function(t,e){var n=new FormData;return n.append("pgnFile",e,e.name),o.a.post("/database/"+t+"/uploadPgn",n).then(function(t){if(200!==t.status&&201!==t.status)throw t;return c.b.apply(void 0,a(t.data))})}}},196:function(t,e,n){"use strict";n.r(e);var a=n(26),o=n(27),i=n(29),r=n(28),s=n(30),c=n(0),u=n.n(c),l=(n(112),n(122)),m=n(107),d=n(102),f=n(119),h=function(t){return u.a.createElement("tr",{onClick:t.onClick},u.a.createElement("td",null,t.game.whiteName),u.a.createElement("td",null,t.game.blackName),u.a.createElement("td",null),u.a.createElement("td",null,u.a.createElement("button",{className:"button",onClick:function(e){e.stopPropagation(),t.history.push("/training/"+t.game.id)}},"Training"),u.a.createElement("button",{className:"button is-danger",onClick:function(e){t.onDelete(t.game),e.stopPropagation()}},"Supprimer")))},p=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(i.a)(this,Object(r.a)(e).call(this,t))).createGame=function(){l.a.createGame(n.state.database.id).then(function(t){var e=n.state.database;n.setState({database:m.a.update(e,{gameHeaders:{$push:[t]}})})})},n.deleteGame=function(t){var e={title:"Suppression de la partie "+t.whiteName+" - "+t.blackName,message:"\xcates vous s\xfbr de vouloir supprimer la partie "+t.whiteName+" - "+t.blackName,confirmButtonText:"Supprimer",confirmButtonClass:"is-danger",onConfirm:function(){d.a.deleteGame(t).then(function(e){if(e){var a=n.state.database,o=a.gameHeaders.indexOf(t);o>=0&&n.setState({database:m.a.update(a,{gameHeaders:{$splice:[[o,1]]}})})}})}};Object(f.a)(e)},n.onFileChanged=function(t){n.setState({selectedPgn:t.target.files[0]})},n.uploadPgn=function(){var t=n.state.selectedPgn;t&&l.a.importPgn(n.state.database.id,t).then(function(t){var e=n.state.database;n.setState({database:m.a.update(e,{gameHeaders:{$push:[t]}})})})},n.state={database:null,selectedPgn:null},n}return Object(s.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){var t=this;l.a.getDetails(this.props.match.params.id).then(function(e){console.log(e),t.setState({database:e})})}},{key:"render",value:function(){var t=this;return u.a.createElement(u.a.Fragment,null,this.state.database?u.a.createElement(u.a.Fragment,null,u.a.createElement("h1",{className:"title is-1"},this.state.database.name),u.a.createElement("div",null,u.a.createElement("button",{className:"button",onClick:this.createGame},"Add new Game")),u.a.createElement("div",null,u.a.createElement("input",{type:"file",onChange:this.onFileChanged}),u.a.createElement("button",{className:"button",onClick:this.uploadPgn},"Importer")),u.a.createElement("table",{className:"databases table is-striped is-hoverable is-fullwidth"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"White"),u.a.createElement("th",null,"Black"),u.a.createElement("th",null),u.a.createElement("th",null))),u.a.createElement("tbody",null,this.state.database.gameHeaders.map(function(e){return u.a.createElement(h,{key:e.id,game:e,onClick:function(){return t.props.history.push("/game/"+e.id)},onDelete:t.deleteGame,history:t.props.history})})))):u.a.createElement("div",null,"Loading"))}}]),e}(c.Component);e.default=p},87:function(t,e,n){"use strict";n.d(e,"b",function(){return a}),n.d(e,"a",function(){return o});var a="w",o="b"},93:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var a=n(26),o=n(27),i=n(87),r=function(){function t(e,n,o){Object(a.a)(this,t),this.fen=e,this.lastMove=n,this.previousPosition=o,this.nextPosition=null,this.comment="",this.sublines=[],this.previousPosition?"w"===this.lastMove.color?this.moveNumber=this.previousPosition.moveNumber+1:this.moveNumber=this.previousPosition.moveNumber:this.moveNumber=0}return Object(o.a)(t,[{key:"sideToMove",value:function(){return this.lastMove&&this.lastMove.color!==i.a?i.a:i.b}},{key:"addNextPosition",value:function(t){this.nextPosition?this.nextPosition.fen!==t.fen&&(this.sublines.find(function(e){return e.fen===t.fen})||this.sublines.push(t)):this.nextPosition=t}}]),t}()},94:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var a=n(26),o=n(93),i=function t(){Object(a.a)(this,t),this.positions=[],this.startingPosition=new o.a("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),this.whiteName="white",this.blackName="black"}},98:function(t,e,n){"use strict";n.d(e,"a",function(){return u}),n.d(e,"b",function(){return m});var a=n(26),o=n(29),i=n(28),r=n(30),s=n(0),c=n(16),u=function(t){function e(){var t,n;Object(a.a)(this,e);for(var r=arguments.length,s=new Array(r),u=0;u<r;u++)s[u]=arguments[u];return(n=Object(o.a)(this,(t=Object(i.a)(e)).call.apply(t,[this].concat(s)))).close=function(){!function(){var t=document.getElementById(l);t&&(Object(c.unmountComponentAtNode)(t),t.parentNode.removeChild(t))}()},n}return Object(r.a)(e,t),e}(s.Component),l="modal-window";function m(t){!function(t){var e=document.getElementById(l);e||((e=document.createElement("div")).id=l,document.body.appendChild(e)),Object(c.render)(t,e)}(t)}}}]);
//# sourceMappingURL=6.5cff89ca.chunk.js.map