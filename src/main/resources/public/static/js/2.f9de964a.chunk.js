(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(e,t,n){},121:function(e,t,n){},122:function(e,t,n){"use strict";var i=n(27),o=n(26),a=n(15),s=n(94),r=n(93),c=function e(){var t=this;Object(o.a)(this,e),this.gameToDto=function(e){var n={};return n.blackName=e.blackName,n.whiteName=e.whiteName,n.positions=[],e.id&&e.id>=0&&(n.id=e.id),t.visitPosition(e.startingPosition,n),n},this.visitPosition=function(e,n){var i={};if(i.positionIndex=t.counter,t.counter++,i.commentAfter=e.comment,i.fen=e.fen,i.lastMoveSan=e.lastMove?e.lastMove.san:"",e.nextPosition){var o=t.visitPosition(e.nextPosition,n);i.nextPosition=o.positionIndex}var a=[],s=!0,r=!1,c=void 0;try{for(var l,u=e.sublines[Symbol.iterator]();!(s=(l=u.next()).done);s=!0){var m=l.value,h=t.visitPosition(m,n);a.push(h.positionIndex)}}catch(v){r=!0,c=v}finally{try{s||null==u.return||u.return()}finally{if(r)throw c}}return 0===a.length?i.sublines="":i.sublines=a.join(";"),n.positions.push(i),i},this.counter=0},l=function(){function e(){Object(o.a)(this,e)}return Object(i.a)(e,[{key:"dtoToGame",value:function(e){var t=new s.a;if(t.whiteName=e.whiteName,t.blackName=e.blackName,t.id=e.id,e.positions.length>0){var n=[],i=!0,o=!1,a=void 0;try{for(var r,c=e.positions[Symbol.iterator]();!(i=(r=c.next()).done);i=!0){var l=r.value;n[l.positionIndex]=l}}catch(u){o=!0,a=u}finally{try{i||null==c.return||c.return()}finally{if(o)throw a}}t.startingPosition=this.parsePosition(n,0)}return t}},{key:"parsePosition",value:function(e,t,n){var i=e[t],o=t>0?this.parseMove(i):void 0,a=new r.a(i.fen,o,n);if(a.comment=i.commentAfter,i.nextPosition>0){var s=this.parsePosition(e,i.nextPosition,a);a.nextPosition=s}if(i.sublines.length>0){var c=!0,l=!1,u=void 0;try{for(var m,h=i.sublines.split(";")[Symbol.iterator]();!(c=(m=h.next()).done);c=!0){var v=m.value,p=this.parsePosition(e,parseInt(v),a);a.sublines.push(p)}}catch(f){l=!0,u=f}finally{try{c||null==h.return||h.return()}finally{if(l)throw u}}}return a}},{key:"parseMove",value:function(e){return{san:e.lastMoveSan,color:"b"===e.fen.split(" ")[1]?"w":"b"}}}]),e}();t.a={fetchGame:function(e){return a.a.get("/game/"+e).then(function(e){if(200===e.status){var t=(new l).dtoToGame(e.data);return console.log(t),t}throw e}).catch(function(e){console.error(e)})},saveGame:function(e){var t=(new c).gameToDto(e);return console.log(t),a.a.post("/game/"+e.id,t).then(function(e){if(200!==e.status)throw e}).catch(function(e){console.error(e)})}}},123:function(e,t,n){"use strict";var i=n(26),o=n(27),a=n(29),s=n(28),r=n(30),c=n(0),l=n.n(c),u=n(143),m=n.n(u),h=(n(161),n(162),function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];return(n=Object(a.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).turnColor=function(){if(n.props.position){var e=n.props.position.split(" ");if(e.length>1&&"b"===e[1])return"black"}return"white"},n}return Object(r.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:this.props.className},l.a.createElement(m.a,{width:"100%",style:{height:0,paddingBottom:"100%"},className:this.props.className,fen:this.props.position,orientation:this.props.orientation,movable:{free:!1,dests:this.props.legalMoves,color:this.props.movableColor},premovable:{enabled:!1},lastMove:this.props.lastMove,onMove:this.props.onMove,turnColor:this.turnColor(),viewOnly:this.props.viewOnly}))}}]),t}(l.a.Component));h.defaultProps={movableColor:"both",orientation:"white",lastMove:[],viewOnly:!1},t.a=h},139:function(e,t,n){"use strict";var i=n(26),o=n(27),a=n(29),s=n(28),r=n(30),c=n(0),l=n.n(c),u=n(87),m=(n(121),n(191)),h=Object(m.d)("mainLineMoveContextMenu")(function(e){var t=e.id,n=e.trigger,i=n?n.onItemClick:null;console.log(n);var o="";return n&&(o=n.position.moveNumber+(n.position.sideToMove()===u.a?".":"...")+n.san),l.a.createElement(m.a,{id:t,className:"context-menu"},n&&l.a.createElement("p",{className:"title"},o),n&&l.a.createElement(m.c,{attributes:{className:"item"},onClick:i,data:{action:"DELETE_NEXT_POSITIONS"}},"Supprimer la suite"))}),v=Object(m.d)("subLineMoveContextMenu")(function(e){var t=e.id,n=e.trigger,i={className:"item"},o=function(e,t,i){console.log("debug"),n.onItemClick(e,t,i)},a="";return n&&(a=n.position.moveNumber+(n.position.sideToMove()===u.a?".":"...")+n.san),l.a.createElement(m.a,{id:t,className:"context-menu"},n&&l.a.createElement("p",{className:"title"},a),n&&l.a.createElement(m.c,{attributes:i,onClick:o,data:{action:"DELETE_NEXT_POSITIONS"}},"Supprimer la suite"),n&&l.a.createElement(m.c,{attributes:i,onClick:o,data:{action:"PROMOTE_SUBLINE"}},"Promouvoir la variante"),n&&l.a.createElement(m.c,{attributes:i,onClick:o,data:{action:"DELETE_SUBLINE"}},"Supprimer la variante"))}),p=function(){function e(t,n,o,a,s){var r=this;Object(i.a)(this,e),this.san=t,this.position=n,this.handleClick=o,this.classes="move ",this.onContextualAction=s,a===n&&(this.classes+=" active"),this.attributes={className:this.classes,onClick:function(){return r.handleClick(r.position)}}}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement(m.b,{id:"mainLineMoveContextMenu",attributes:this.attributes,position:this.position,san:this.san,collect:function(e){return e},onItemClick:this.onContextualAction},this.san)}}]),e}(),f=function(){function e(t){Object(i.a)(this,e),this.moveNumber=t}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"move-number"},this.moveNumber)}}]),e}(),d=function(){function e(){Object(i.a)(this,e)}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"empty-move"},"...")}}]),e}(),b=function(){function e(t){Object(i.a)(this,e),this.comment=t}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"comment"},this.comment)}}]),e}(),E=function(){function e(t,n,o,a,s){Object(i.a)(this,e),this.comment=t,this.sublines=n.map(function(e){return new N(e,o,a,s)})}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"interrupt"},this.comment&&""!==this.comment&&l.a.createElement("div",{className:"comment"},this.comment),this.sublines.length>0&&l.a.createElement("div",{className:"sublines"},this.sublines.map(function(e){return e.render()})))}}]),e}(),N=function(){function e(t,n,o,a){var s=this;for(Object(i.a)(this,e),this.moves=[],this.sublines=[];null!==t;){if(t.lastMove.color===u.b?this.moves.push(new k(t.lastMove.san,t.moveNumber+".",t,n,o,a)):0===this.moves.length?this.moves.push(new k(t.lastMove.san,t.moveNumber+"...",t,n,o,a)):this.moves.push(new k(t.lastMove.san,null,t,n,o,a)),t.comment&&""!==t.comment&&this.moves.push(new b(t.comment)),t.sublines.length>0){this.sublines.push(new e(t.nextPosition,n,o,a)),t.sublines.forEach(function(t){return s.sublines.push(new e(t,n,o,a))});break}t=t.nextPosition}}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"subline"},this.moves.map(function(e){return e.render()}),this.sublines.length>0&&l.a.createElement("div",{className:"sublines"},this.sublines.map(function(e){return e.render()})))}}]),e}(),k=function(){function e(t,n,o,a,s,r){var c=this;Object(i.a)(this,e),this.san=t,this.moveNumber=n,this.position=o,this.handleClick=a,this.classes="subline-move ",this.onContextualAction=r,s===o&&(this.classes+=" active"),this.attributes={className:this.classes,onClick:function(){return c.handleClick(c.position)}}}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement(m.b,{id:"subLineMoveContextMenu",attributes:this.attributes,position:this.position,san:this.san,collect:function(e){return e},onItemClick:this.onContextualAction},this.moveNumber&&l.a.createElement("div",{className:"move-number"},this.moveNumber),this.san)}}]),e}(),g=function(){function e(t,n,o,a){Object(i.a)(this,e),this.notation=[];for(var s=t.startingPosition.nextPosition;null!==s;){var r=s.lastMove.color===u.b;r&&this.notation.push(new f(s.moveNumber)),this.notation.push(new p(s.lastMove.san,s,n,o,a)),(s.comment&&""!==s.comment||s.previousPosition.sublines.length>0)&&(r&&this.notation.push(new d),this.notation.push(new E(s.comment,s.previousPosition.sublines,n,o,a)),r&&(this.notation.push(new f(s.lastMove.san)),this.notation.push(new d))),s=s.nextPosition}}return Object(o.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"notation"},this.notation.map(function(e){return e.render()}),l.a.createElement(h,null),l.a.createElement(v,null))}}]),e}(),w=(n(106),n(192)),O=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];return(n=Object(a.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={moves:[]},n.handleClickOnMove=function(e){var t=e.uci.substring(0,2),i=e.uci.substring(2,4);if(5!==e.uci.length)"e1"===t&&"O-O"===e.san?n.props.makeMove("e1","g1"):"e8"===t&&"O-O"===e.san?n.props.makeMove("e8","g8"):"e1"===t&&"O-O-O"===e.san?n.props.makeMove("e1","c1"):"e8"===t&&"O-O-O"===e.san?n.props.makeMove("e8","c8"):n.props.makeMove(t,i);else{var o=e.uci.substring(4);n.props.makeMove(t,i,o)}},n._fetchData=function(){console.log("fetch data from lichess"),fetch("https://explorer.lichess.ovh/master?fen="+n.props.currentPosition.fen,{cache:"force-cache"}).then(function(e){return e.json()}).then(function(e){return n.setState({moves:e.moves})})},n.fetchData=Object(w.a)(n._fetchData,500),n}return Object(r.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"tool-book"},0===this.state.moves.length&&l.a.createElement("div",null,l.a.createElement("div",{className:"title"},"Explorateur d'ouvertures et tables de finales"),l.a.createElement("div",null,"Aucune partie trouv\xe9e")),this.state.moves.length>0&&l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Coup"),l.a.createElement("th",null,"Parties"),l.a.createElement("th",null,"Blancs / Nulle / Noirs"))),l.a.createElement("tbody",null,this.state.moves.map(function(t){return l.a.createElement("tr",{key:t.san,onClick:function(){return e.handleClickOnMove(t)}},l.a.createElement("td",null,t.san),l.a.createElement("td",null,t.white+t.black+t.draws),l.a.createElement("td",null,l.a.createElement(y,{white:t.white,black:t.black,draws:t.draws})))}))))}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"componentDidUpdate",value:function(e,t,n){e.currentPosition.fen!==this.props.currentPosition.fen&&this.fetchData()}}]),t}(c.Component),y=function(e){var t=e.white,n=e.black,i=e.draws,o=t+n+i;if(0===o)return l.a.createElement("div",null);var a=parseInt(t/o*100),s=parseInt(n/o*100),r=parseInt(i/o*100),c={width:a+"%"},u={width:s+"%"},m={width:r+"%"};return l.a.createElement("div",{className:"bar"},0!==t&&l.a.createElement("span",{className:"white",style:c},a,"%"),0!==i&&l.a.createElement("span",{className:"draws",style:m},r,"%"),0!==n&&l.a.createElement("span",{className:"black",style:u},s,"%"))},P=(n(141),n(107)),M=n.n(P),j=function(){function e(t,n){Object(i.a)(this,e),this.name=t,this.lines=[];for(var o=0;o<n;o++)this.lines.push({});this.depth=0,this.selDepth=0}return Object(o.a)(e,[{key:"update",value:function(e){var t=W(e.pv,S);this.depth=e.depth,this.selDepth=e.seldepth;var n=e.multipv-1,i=e.score.split(" ")[1]/100;this.lines[n]=new C(i,t)}}]),e}(),C=function e(t,n){Object(i.a)(this,e),this.score=t,this.line=n},x=["depth","seldepth","time","nodes","pv","multipv","score","currmove","currmovenumber","hashfull","nps","tbhits","cpuload","string","refutation","currline","bmc"],T="",S="",I=function(){},D=new Worker("/stockfish.js"),A={},L=!1,B=function(){},_=function(e){console.log("Send to engine : "+e),D.postMessage(e)};D.onmessage=function(e){e.data.startsWith("info")||console.log("received : ",e.data),G(e.data)};var U;_("setoption name multipv value "+(U=3)),A=new j("Stockfish 10",U);var G=function(e){if("readyok"===e)_("position fen "+T),S=T,_("go depth 20");else if(e.startsWith("info")){L=!0;var t=q(e);A.update(t),I(A)}else e.startsWith("bestmove")&&(L=!1,B(),B=function(){})},W=function(e,t){var n=e.trim().split(" "),i=new M.a(t);return n.map(function(e){var t=e.substring(0,2),n=e.substring(2,4),o="q";5===e.length&&(o=e.substring(4));var a=i.move({from:t,to:n,promotion:o});return null===a?(console.error("Unable to calculate move for uci",e),[]):a})},q=function(e){var t={},n="",i="";return e.split(" ").forEach(function(e){"info"!==e&&(x.includes(e)?(n.length>0&&(t[n]=i),n=e,i=""):i+=e+" ")}),t[n]=i,t},R={analysePosition:function(e,t){T=e,I=t,L?(B=function(){_("ucinewgame"),_("isready")},_("stop")):(_("ucinewgame"),_("isready"))}},J=function(e,t){var n="",i=t.sideToMove()===u.b?t.moveNumber+1:t.moveNumber;return e.forEach(function(e,t){0===t?n+="w"===e.color?i+".":i+"...":"w"===e.color&&(n+=i+"."),n+=e.san+" ","b"===e.color&&i++}),n},K=function(e){return l.a.createElement("div",null,e.lines.map(function(t){return t.score?l.a.createElement(Q,{line:t.line,score:t.score,currentPosition:e.currentPosition}):""}))},Q=function(e){var t=e.score;return e.currentPosition.sideToMove()===u.a&&(t*=-1),t=t>0?"+"+t:"-"+-1*t,l.a.createElement("div",{className:"engine-line"},l.a.createElement("strong",{className:"score"},t),l.a.createElement("span",{className:"line-text"},J(e.line,e.currentPosition)))},V=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];return(n=Object(a.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={engineState:null},n.onEngineInfo=function(e){n.setState({engineState:e})},n.startAnalyse=function(){R.analysePosition(n.props.currentPosition.fen,n.onEngineInfo)},n}return Object(r.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state.engineState;return e?l.a.createElement("div",{className:"tool-engine"},l.a.createElement("div",null,l.a.createElement("div",{className:"title"},e.name," depth ",e.depth,"/",e.selDepth),l.a.createElement("div",null,l.a.createElement(K,{lines:e.lines,currentPosition:this.props.currentPosition})))):l.a.createElement("div",{className:"tool-engine"},l.a.createElement("div",null,l.a.createElement("div",{className:"title"},"Stockfish")))}},{key:"componentDidUpdate",value:function(e,t,n){e.currentPosition.fen!==this.props.currentPosition.fen&&(this.setState({engineState:null}),this.startAnalyse())}},{key:"componentDidMount",value:function(){this.startAnalyse()}}]),t}(c.Component),X={scrollToActiveMove:function(){var e=document.getElementsByClassName("move active");e.length>0?e[0].scrollIntoView():(e=document.getElementsByClassName("subline-move active")).length>0&&e[0].scrollIntoView()}},z={name:"None"},F={name:"Book"},H={name:"Engine"},Y=function(e){function t(){var e,n;Object(i.a)(this,t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];return(n=Object(a.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={selectedTool:z},n}return Object(r.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("footer",{className:"notation-footer"},this.state.selectedTool===F&&l.a.createElement("div",{className:"tool"},l.a.createElement(O,{currentPosition:this.props.currentPosition,makeMove:this.props.makeMove})),this.state.selectedTool===H&&l.a.createElement("div",{className:"tool"},l.a.createElement(V,{currentPosition:this.props.currentPosition,makeMove:this.props.makeMove})),l.a.createElement("div",{className:"tool-buttons"},l.a.createElement("a",{className:"card-footer-item",hrefLang:"#",onClick:function(){return e.selectTool(F)}},"Book"),l.a.createElement("a",{className:"card-footer-item",hrefLang:"#",onClick:function(){return e.selectTool(H)}},"Stockfish")))}},{key:"selectTool",value:function(e){this.state.selectedTool===e?this.setState({selectedTool:z}):this.setState({selectedTool:e})}},{key:"componentDidUpdate",value:function(e,t,n){X.scrollToActiveMove()}}]),t}(c.Component);n.d(t,"a",function(){return Z});var Z=function(e){function t(){return Object(i.a)(this,t),Object(a.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(r.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=new g(this.props.game,this.props.handleClick,this.props.currentPosition,this.props.onContextualAction);return l.a.createElement("div",{className:"card game-details-panel"},l.a.createElement("header",{className:"card-header game-header"},l.a.createElement("p",{className:"card-header-title"},this.props.game.whiteName," - ",this.props.game.blackName)),l.a.createElement("div",{className:"card-content notation-wrapper"},e.render()),l.a.createElement(Y,{currentPosition:this.props.currentPosition,makeMove:this.props.makeMove}))}},{key:"componentDidUpdate",value:function(e,t,n){X.scrollToActiveMove()}}]),t}(c.Component)},141:function(e,t,n){},162:function(e,t,n){},87:function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return o});var i="w",o="b"},93:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var i=n(26),o=n(27),a=n(87),s=function(){function e(t,n,o){Object(i.a)(this,e),this.fen=t,this.lastMove=n,this.previousPosition=o,this.nextPosition=null,this.comment="",this.sublines=[],this.previousPosition?"w"===this.lastMove.color?this.moveNumber=this.previousPosition.moveNumber+1:this.moveNumber=this.previousPosition.moveNumber:this.moveNumber=0}return Object(o.a)(e,[{key:"sideToMove",value:function(){return this.lastMove&&this.lastMove.color!==a.a?a.a:a.b}},{key:"addNextPosition",value:function(e){this.nextPosition?this.nextPosition.fen!==e.fen&&(this.sublines.find(function(t){return t.fen===e.fen})||this.sublines.push(e)):this.nextPosition=e}}]),e}()},94:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var i=n(26),o=n(93),a=function e(){Object(i.a)(this,e),this.positions=[],this.startingPosition=new o.a("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),this.whiteName="white",this.blackName="black"}}}]);
//# sourceMappingURL=2.f9de964a.chunk.js.map