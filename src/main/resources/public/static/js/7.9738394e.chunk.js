(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{105:function(t,e,a){"use strict";a.d(e,"b",function(){return s}),a.d(e,"a",function(){return r});var n=a(96),i=a.n(n),s=i.a.struct({whiteName:i.a.String,blackName:i.a.String,id:i.a.Number}),r=i.a.struct({name:i.a.String,id:i.a.Number,gameHeaders:i.a.list(s)})},111:function(t,e,a){},112:function(t,e,a){"use strict";var n=a(15),i=a(96),s=a.n(i),r=a(94),o=a(105),u=s.a.struct({name:s.a.String},"PostDatabaseRequest");e.a={listDatabases:function(){return n.a.get("/database").then(function(t){if(200===t.status)return t.data;throw t}).then(function(t){return console.log(t),t}).catch(function(t){console.error(t)})},postDatabase:function(t){var e=t.name,a=u({name:e});return n.a.post("/database",a).then(function(t){if(200===t.status||201===t.status)return console.log(t.data),t.data;throw t}).catch(function(t){console.error(t)})},getDetails:function(t){return n.a.get("/database/"+t).then(function(t){if(200===t.status){var e=Object(o.a)(t.data);return console.log(e),e}throw t}).catch(function(t){console.error(t)})},createGame:function(t){var e=new r.a;return n.a.post("/database/"+t+"/game",e).then(function(t){if(200===t.status||201===t.status)return Object(o.b)({whiteName:t.data.whiteName,blackName:t.data.blackName,id:t.data.id});throw t}).catch(function(t){console.error(t)})},deleteDatabase:function(t){return n.a.delete("/database/"+t).then(function(t){if(200===t.status)return!0;throw t}).catch(function(t){console.error(t)})},importPgn:function(t,e){var a=new FormData;return a.append("pgnFile",e,e.name),n.a.post("/database/"+t+"/uploadPgn",a).then(function(t){if(200!==t.status&&201!==t.status)throw t;return t.data})}}},194:function(t,e,a){"use strict";a.r(e);var n=a(26),i=a(27),s=a(29),r=a(28),o=a(30),u=a(0),c=a.n(u),l=(a(111),a(112)),m=a(105),h=function(t){return c.a.createElement("tr",{onClick:t.onClick},c.a.createElement("td",null,t.game.whiteName),c.a.createElement("td",null,t.game.blackName),c.a.createElement("td",null),c.a.createElement("td",null,c.a.createElement("button",{className:"button",onClick:function(e){e.stopPropagation(),t.history.push("/training/"+t.game.id)}},"Training"),c.a.createElement("button",{className:"button is-danger",onClick:function(t){t.stopPropagation()}},"Supprimer")))},d=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(s.a)(this,Object(r.a)(e).call(this,t))).createGame=function(){l.a.createGame(a.state.database.id).then(function(t){var e=a.state.database;a.setState({database:m.a.update(e,{gameHeaders:{$push:[t]}})})})},a.onFileChanged=function(t){a.setState({selectedPgn:t.target.files[0]})},a.uploadPgn=function(){var t=a.state.selectedPgn;t&&l.a.importPgn(a.state.database.id,t)},a.state={database:null,selectedPgn:null},a}return Object(o.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this;l.a.getDetails(this.props.match.params.id).then(function(e){console.log(e),t.setState({database:e})})}},{key:"render",value:function(){var t=this;return c.a.createElement(c.a.Fragment,null,this.state.database?c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"title is-1"},this.state.database.name),c.a.createElement("div",null,c.a.createElement("button",{className:"button",onClick:this.createGame},"Add new Game")),c.a.createElement("div",null,c.a.createElement("input",{type:"file",onChange:this.onFileChanged}),c.a.createElement("button",{className:"button",onClick:this.uploadPgn},"Importer")),c.a.createElement("table",{className:"databases table is-striped is-hoverable is-fullwidth"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"White"),c.a.createElement("th",null,"Black"),c.a.createElement("th",null),c.a.createElement("th",null))),c.a.createElement("tbody",null,this.state.database.gameHeaders.map(function(e){return c.a.createElement(h,{key:e.id,game:e,onClick:function(){return t.props.history.push("/game/"+e.id)},history:t.props.history})})))):c.a.createElement("div",null,"Loading"))}}]),e}(u.Component);e.default=d},87:function(t,e,a){"use strict";a.d(e,"b",function(){return n}),a.d(e,"a",function(){return i});var n="w",i="b"},93:function(t,e,a){"use strict";a.d(e,"a",function(){return r});var n=a(26),i=a(27),s=a(87),r=function(){function t(e,a,i){Object(n.a)(this,t),this.fen=e,this.lastMove=a,this.previousPosition=i,this.nextPosition=null,this.comment="",this.sublines=[],this.previousPosition?"w"===this.lastMove.color?this.moveNumber=this.previousPosition.moveNumber+1:this.moveNumber=this.previousPosition.moveNumber:this.moveNumber=0}return Object(i.a)(t,[{key:"sideToMove",value:function(){return this.lastMove&&this.lastMove.color!==s.a?s.a:s.b}},{key:"addNextPosition",value:function(t){this.nextPosition?this.nextPosition.fen!==t.fen&&(this.sublines.find(function(e){return e.fen===t.fen})||this.sublines.push(t)):this.nextPosition=t}}]),t}()},94:function(t,e,a){"use strict";a.d(e,"a",function(){return s});var n=a(26),i=a(93),s=function t(){Object(n.a)(this,t),this.positions=[],this.startingPosition=new i.a("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),this.whiteName="white",this.blackName="black"}}}]);
//# sourceMappingURL=7.9738394e.chunk.js.map