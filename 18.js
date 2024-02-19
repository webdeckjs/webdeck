(self.webpackChunkwebdeck=self.webpackChunkwebdeck||[]).push([["18"],{348:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r,o=n("7030");function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u=e=>o.createElement("svg",i({xmlns:"http://www.w3.org/2000/svg",className:"disconnect_svg__icon",viewBox:"0 0 1024 1024"},e),r||(r=o.createElement("path",{d:"M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1M446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3z"})))},9937:function(e,t,n){"use strict";n.r(t),n.d(t,{Controller:function(){return i},Settings:function(){return u},Wrapper:function(){return o}});var r=n("1893"),o=(0,r.default)("div")(function(e){return e.$hasDeck,{textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",width:"100vw"}}),i=(0,r.default)("div")({display:function(e){return e.$isOpen?"block":"none"},marginLeft:50,padding:"50px",paddingTop:"30px",border:"2px inset black",background:"rgb(21 21 21)",borderRadius:"20px",color:"white",maxHeight:"80vh",overflow:"auto",boxShadow:"-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)"}),u=(0,r.default)("div")({color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2px 0px"})},7059:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n("5893"),o=n("8764"),i=n("9937"),u=n("9540"),l=n("4089"),c=n("3468"),a=n("1418"),s=n("5854"),f=n("6720"),d=n("5701"),p=n("4540"),y=n("4184"),g=n.n(y);window.Buffer=o.Buffer;var b=function(){var e=(0,f.useAppContext)().deck;return(0,r.jsx)("div",{className:g()({wrapper:!0,hasDeck:!!e.current}),children:(0,r.jsx)(i.Wrapper,{children:e.current?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.Deck,{}),(0,r.jsxs)(i.Controller,{$isOpen:void 0!==e.selectedKey&&e.editMode,children:[(0,r.jsx)(a.Header,{}),(0,r.jsx)(c.Profiles,{}),void 0!==e.selectedKey&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i.Settings,{children:[(0,r.jsx)(l.SubSubTitle,{children:"currently selected key"}),(0,r.jsx)("span",{children:e.selectedKey})]}),(0,r.jsxs)(i.Settings,{children:[(0,r.jsx)(l.SubSubTitle,{children:"plugin"}),(0,r.jsx)(d.Plugins,{})]}),(0,r.jsx)(i.Settings,{children:(0,r.jsx)(p.Plugin,{})})]}),(0,r.jsx)("small",{style:{opacity:.5},children:"All changes are saved automaticly."}),window.location.search.includes("debug")&&(0,r.jsx)(s.Debugger,{})]})]}):(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"WEB DECK"}),(0,r.jsx)("p",{children:"Connect you usb device or create a virtual device."}),(0,r.jsx)("br",{})]}),(0,r.jsx)("button",{onClick:e.tryGetStreamDeck,children:"Connect"}),(0,r.jsx)("small",{children:"-or-"}),(0,r.jsx)("button",{onClick:e.tryCreateVirtualDeck,children:"Create Virtual Device"})]})})})}},8612:function(e,t,n){"use strict";n.r(t),n.d(t,{Container:function(){return p}});var r=n("5893"),o=n("7030"),i=n.n(o),u=n("745"),l=n("7059"),c=n("407"),a=n("6720"),s=n("3896"),f=n("2632"),d=n("3522"),p=function(){var e=(0,f.useProfiles)(),t=(0,s.usePlugins)(),n=(0,d.useDeck)(e,t);return(0,r.jsxs)(a.AppContext.Provider,{value:{deck:n,profiles:e,plugins:t},children:[(0,r.jsx)("div",{children:!t.initalised&&(0,r.jsx)(r.Fragment,{children:"initialising plugins..."})}),(0,r.jsx)(l.default,{})]})};u.createRoot(document.getElementById("root")).render((0,r.jsx)(i().StrictMode,{children:(0,r.jsx)(p,{})})),(0,c.default)()},5854:function(e,t,n){"use strict";n.r(t),n.d(t,{Debugger:function(){return c}});var r=n("5893"),o=n("7030"),i=n("4089"),u=n("6720");function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var c=function(){var e,t,n=(0,u.useAppContext)(),c=n.profiles,a=n.plugins;var s=(e=(0,o.useState)(!1),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],u=!0,l=!1;try{for(o=o.call(e);!(u=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{!u&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),f=s[0],d=s[1];return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{style:{justifyContent:"space-between",display:"flex",alignItems:"center",padding:"0 0 8px 0"},children:[(0,r.jsx)(i.SubSubTitle,{children:"debugging"}),(0,r.jsx)("button",{className:"s",onClick:function(){return d(!f)},children:f?" close":"open"})]}),(0,r.jsxs)("div",{style:{display:f?"block":"none"},children:[(0,r.jsx)("pre",{style:{width:350,textAlign:"left",background:"black"},children:JSON.stringify(c.profiles,null,4)}),(0,r.jsx)("pre",{style:{width:350,textAlign:"left",background:"black"},children:JSON.stringify(a.plugins,null,4)})]})]})}},4700:function(e,t,n){"use strict";n.r(t),n.d(t,{HeaderWrapper:function(){return r}});var r=(0,n("1893").styled)("div")({display:"flex",justifyContent:"space-between",alignItems:"center",minWidth:350,paddingBottom:"8px",marginBottom:"10px",borderBottom:"1px solid #474747"})},1418:function(e,t,n){"use strict";n.r(t),n.d(t,{Header:function(){return l}});var r=n("5893"),o=n("4700"),i=n("501"),u=n("6720"),l=function(){var e=(0,u.useAppContext)().deck;return(0,r.jsxs)(o.HeaderWrapper,{children:[(0,r.jsx)(i.SubTitle,{children:"Settings"}),(0,r.jsx)("button",{title:"close",className:"s",onClick:function(){return e.setSelectedKey(void 0)},children:"\xd7"})]})}},4540:function(e,t,n){"use strict";n.r(t),n.d(t,{Plugin:function(){return l}});var r=n("5893"),o=n("7030"),i=n("6720");function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var l=function(){var e,t,n,l,c=(0,i.useAppContext)(),a=c.plugins,s=c.profiles,f=c.deck;var d=(e=(0,o.useState)(null),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],u=!0,l=!1;try{for(o=o.call(e);!(u=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{!u&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=d[0],y=d[1],g=f.selectedKey,b=s.profile.keys[g],v=a.getModule(null===(n=a.pluginsById[null==b?void 0:b.plugin])||void 0===n?void 0:n.name);return console.log("module",v,null===(l=a.pluginsById[null==b?void 0:b.plugin])||void 0===l?void 0:l.name,a.getModules()),(0,o.useEffect)(function(){v?y((0,o.lazy)(function(){return Promise.resolve(v)})):y(null)},[v]),(0,r.jsx)("div",{style:{width:"100%",height:"400px",outline:"none",margin:"8px 0",border:"2px solid black",position:"relative",textAlign:"left",borderRadius:10,overflow:"hidden"},children:(0,r.jsx)(o.Suspense,{fallback:"Loading System",children:p&&(null==b?void 0:b.config)?(0,r.jsx)(p,{config:b.config,setConfig:function(e){s.setConfig(g,e)}}):(0,r.jsx)("div",{})})})}},5701:function(e,t,n){"use strict";n.r(t),n.d(t,{Plugins:function(){return i}});var r=n("5893"),o=n("6720"),i=function(){var e,t=(0,o.useAppContext)(),n=t.profiles,i=t.deck,u=t.plugins,l=null===(e=n.profile.keys[i.selectedKey])||void 0===e?void 0:e.plugin;return console.log({selectedPlugin:l}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("select",{name:"plugins",id:"plugins",title:"select plugin",value:l||"",onChange:function(e){return n.setPlugin(e.target.value,i.selectedKey)},children:[(0,r.jsx)("option",{value:"",children:"select..."}),u.plugins.map(function(e){return(0,r.jsxs)("option",{value:e.name,children:[e.name," ",e.creator&&"@".concat(e.creator)]},e.name)})]}),(0,r.jsx)("button",{title:"remove plugin",className:"s",onClick:function(){return u.promptRemovePlugin(l,function(){n.removePlugin(l)})},disabled:!l,children:"-"}),(0,r.jsx)("button",{title:"add plugin",className:"s",onClick:u.promptAddPlugin,children:"+"})]})}},9753:function(e,t,n){"use strict";n.r(t),n.d(t,{ProfilesWrapper:function(){return r}});var r=(0,n("1893").default)("div")({color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"8px",marginBottom:"5px",borderBottom:"1px solid #474747"})},3468:function(e,t,n){"use strict";n.r(t),n.d(t,{Profiles:function(){return l}});var r=n("5893"),o=n("501"),i=n("9753"),u=n("6720"),l=function(){var e=(0,u.useAppContext)().profiles;return(0,r.jsxs)(i.ProfilesWrapper,{children:[(0,r.jsx)(o.SubTitle,{children:"Profiles"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("select",{name:"profile",id:"profile",title:"select profile",value:e.profileName,onChange:function(t){return e.setProfileName(t.target.value)},children:Object.keys(e.profiles).map(function(e){return(0,r.jsx)("option",{value:e,children:e},e)})}),(0,r.jsx)("button",{disabled:"default"===e.profileName,title:"remove profile",className:"s",onClick:e.promptRemoveProfile,children:"-"}),(0,r.jsx)("button",{title:"new profile",className:"s",onClick:e.promptAddProfile,children:"+"}),(0,r.jsx)("button",{title:"export profile",className:"s",onClick:e.promptExportProfile,children:"↗"})]})]})}},56:function(e,t,n){"use strict";n.r(t),n.d(t,{DeckButton:function(){return c},DeckButtonContent:function(){return s},DeckLayout:function(){return l},DeckTitle:function(){return u},DeckWrapper:function(){return i},DisconnectButton:function(){return a}});var r=n("1893"),o=n("348"),i=(0,r.default)("div")({padding:"50px",paddingTop:"30px",border:"2px inset black",background:"rgb(21 21 21)",borderRadius:"20px",boxShadow:"-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)",position:"relative"}),u=(0,r.default)("h1")({display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,paddingBottom:20,paddingTop:0,margin:0,color:"white",textTransform:"uppercase"}),l=(0,r.default)("div")(function(e){var t=e.$columns;return{display:"grid",gap:"20px",gridTemplateColumns:"repeat(".concat(t,", min-content)")}}),c=(0,r.default)("button")({display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #888888",width:"77px",height:"77px",borderRadius:10,background:"red",position:"relative",padding:"0",backgroundColor:"rgb(37 37 37)",outline:"4px solid black",boxShadow:"-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)",transition:".13s ease-in-out",cursor:"pointer","&:active:not(.editMode), &.active":{boxShadow:"none",border:"0px solid",backgroundColor:"rgb(35 35 35)","& > div":{boxShadow:"none",border:"0px solid","& > *":{transition:".13s ease-in-out",transform:"translate3d(0px, 0px, 0px)"}}},"&.active":{},"&.selected":{outline:"2px dotted #ffffff9c",outlineOffset:"5px"}}),a=(0,r.default)(o.default)({marginLeft:16,marginTop:3,height:18,width:18,fill:"white",opacity:.5,cursor:"pointer",transition:"all 300ms","&:hover":{opacity:1,fill:"red"}}),s=(0,r.default)("div")({position:"relative",width:"100%",height:"100%",boxShadow:"rgb(221, 221, 221) 0px 0px 0px inset, rgb(47 47 47) -2px -2px 0px",borderRadius:10,transition:".13s ease-in-out",zIndex:1,"& > *":{height:"70%",display:"flex",alignItems:"center",justifyContent:"center",transition:".13s ease-in-out",transform:"translate3d(0px, -4px, 0px)"}})},9540:function(e,t,n){"use strict";n.r(t),n.d(t,{Deck:function(){return a}});var r=n("5893"),o=n("4184"),i=n.n(o),u=n("56"),l=n("6720"),c=n("4755"),a=function(){var e,t,n,o=(0,l.useAppContext)().deck;return(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,r.jsxs)(u.DeckWrapper,{children:[(0,r.jsxs)(u.DeckTitle,{children:[null===(e=o.current)||void 0===e?void 0:e.PRODUCT_NAME," ",(0,r.jsx)("span",{title:"Disconect device",children:(0,r.jsx)(u.DisconnectButton,{onClick:function(){return o.disconect()}})})]}),(0,r.jsx)(u.DeckLayout,{$columns:(null===(t=o.current)||void 0===t?void 0:t.KEY_COLUMNS)||0,children:Array.from({length:(null===(n=o.current)||void 0===n?void 0:n.NUM_KEYS)||0}).map(function(e,t){return(0,r.jsx)(u.DeckButton,{onMouseDown:function(){return o.onMouseDown(t)},onMouseUp:function(){return o.onMouseUp(t)},onClick:function(){o.editMode&&o.setSelectedKey(t)},className:i()({active:o.pressedMap[t],selected:o.editMode&&o.selectedKey===t,editMode:o.editMode}),children:(0,r.jsx)(u.DeckButtonContent,{children:(0,r.jsx)("p",{children:t})})},t)})})]}),(0,r.jsx)(c.DeckFooterText,{})]})}},4755:function(e,t,n){"use strict";n.r(t),n.d(t,{DeckFooterText:function(){return i}});var r=n("5893"),o=n("6720"),i=function(){var e=(0,o.useAppContext)().deck;return e.isVirtual?(0,r.jsxs)("small",{style:{color:"white",paddingTop:20,opacity:.2,fontSize:12},children:["You are currently in ",e.editMode?"Edit Mode":"Preview Mode",". Switch to"," ",(0,r.jsx)("a",{href:"#",onClick:function(t){t.preventDefault(),e.setEditMode(!e.editMode)},children:e.editMode?"Preview Mode":"Edit Mode"})," ","to ",e.editMode?"test":"edit"," it."]}):null}},4089:function(e,t,n){"use strict";n.r(t),n.d(t,{SubSubTitle:function(){return r}});var r=(0,n("1893").default)("h3")({display:"inline-block",alignItems:"center",justifyContent:"center",fontSize:14,padding:0,margin:0,color:"white"})},501:function(e,t,n){"use strict";n.r(t),n.d(t,{SubTitle:function(){return r}});var r=(0,n("1893").default)("h2")({display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,padding:0,margin:0,color:"white",textTransform:"uppercase"})},6720:function(e,t,n){"use strict";n.r(t),n.d(t,{AppContext:function(){return o},useAppContext:function(){return i}});var r=n("7030"),o=(0,r.createContext)({}),i=function(){return(0,r.useContext)(o)}},3522:function(e,t,n){"use strict";n.r(t),n.d(t,{useDeck:function(){return y}});var r=n("7030"),o=n("9047"),i=n("4778");function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t,n,r,o,i,u){try{var l=e[i](u),c=l.value}catch(e){n(e);return}l.done?t(c):Promise.resolve(c).then(r,o)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function u(e){l(i,r,o,u,c,"next",e)}function c(e){l(i,r,o,u,c,"throw",e)}u(void 0)})}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}return e}function f(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],u=!0,l=!1;try{for(o=o.call(e);!(u=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{!u&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}var y=function(e,t){var n=d((0,r.useState)(!0),2),u=n[0],l=n[1],y=d((0,r.useState)(0),2),g=y[0],b=y[1],v=d((0,r.useState)(),2),h=v[0],m=v[1],x=d((0,r.useState)(),2),j=x[0],w=x[1],S=d((0,r.useState)({}),2),O=S[0],k=S[1];(0,r.useEffect)(function(){var e;(e=c(function(){var e,t;return p(this,function(n){switch(n.label){case 0:return[4,(0,o.getStreamDecks)()];case 1:return(e=d.apply(void 0,[n.sent(),1])[0])?w(e):(t=d((0,i.getVirtualDeck)(),1)[0])&&m(t),[2]}})}),function(){return e.apply(this,arguments)})()},[]);var P=(0,r.useCallback)(c(function(){var e;return p(this,function(t){switch(t.label){case 0:return[4,(0,o.requestStreamDecks)()];case 1:return(e=d.apply(void 0,[t.sent(),1])[0])?w(e):console.error("Couldn’t get a Stream Deck"),[2]}})}),[]),C=(0,r.useCallback)(function(){var e=d((0,i.requestVirtualDecks)(),1)[0];e?m(e):console.error("Couldn’t get a Virtual Deck"),console.log(e)},[]),D=(0,r.useCallback)(c(function(){var e,t;return p(this,function(t){switch(t.label){case 0:if(!j)return[3,7];return[4,navigator.hid.getDevices()];case 1:e=d.apply(void 0,[t.sent(),1])[0],t.label=2;case 2:return t.trys.push([2,5,,6]),[4,e.forget()];case 3:return t.sent(),[4,e.close()];case 4:case 5:return t.sent(),[3,6];case 6:return w(null),[3,8];case 7:h&&(h.close(),m(null)),t.label=8;case 8:return[2]}})}),[j,h]);(0,r.useEffect)(function(){var n=function(e){k(function(t){return f(s({},t),a({},e,!0))})},r=function(n){k(function(e){return f(s({},e),a({},n,!1))});var r=e.profile.keys[n];if(null==r?void 0:r.plugin){var o=t.getModule(r.plugin);try{null==o||o.onPress(f(s({},r),{keyIndex:n}))}catch(e){console.warn("Webdeck: Failed to execute ".concat(r.plugin,". Have you added and exported onPress() functions in you plugin?"),e)}}};return j&&(j.on("down",n),j.on("up",r)),function(){null==j||j.off("down",n),null==j||j.off("up",r)}},[j,e.profile.keys]);var A=j||h;return{current:A,initalised:!!A,onMouseDown:function(e){j?j.fillKeyColor(e,255,0,0):console.log("pressed key",e)},onMouseUp:function(n){if(u)j?j.fillKeyColor(n,0,0,0):console.log("pressed key",n);else{var r=e.profile.keys[n];if(null==r?void 0:r.plugin){var o=t.getModule(r.plugin);try{null==o||o.onPress(f(s({},r),{keyIndex:n}))}catch(e){console.warn("Webdeck: Failed to execute ".concat(r.plugin,". Have you added and exported onPress() functions in you plugin?"),e)}}}},selectedKey:g,setSelectedKey:b,disconect:D,tryCreateVirtualDeck:C,isVirtual:!!h,tryGetStreamDeck:P,pressedMap:O,editMode:u,setEditMode:l}}},3896:function(e,t,n){"use strict";n.r(t),n.d(t,{usePlugins:function(){return w}});var r=n("4638"),o=n("7030"),i=n("2869");function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}e=n.hmd(e);function l(e,t,n,r,o,i,u){try{var l=e[i](u),c=l.value}catch(e){n(e);return}l.done?t(c):Promise.resolve(c).then(r,o)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function u(e){l(i,r,o,u,c,"next",e)}function c(e){l(i,r,o,u,c,"throw",e)}u(void 0)})}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}return e}function f(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],u=!0,l=!1;try{for(o=o.call(e);!(u=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{!u&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||y(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||y(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}}function g(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}var b="./Plugin",v=new Set,h="plugins",m=new Map,x=function(){var e=localStorage.getItem(h);return e?p(JSON.parse(e)):[]},j=function(e){localStorage.setItem(h,JSON.stringify(e))},w=function(){var t,n,u,l=d((0,o.useState)(!1),2),y=l[0],h=l[1],w=d((0,o.useState)(x()),2),S=w[0],O=w[1],k=function(e){O(function(t){var n=p(t).concat([e]);return j(n),n})};var P=(t=c(function(){var e,t,n,r,o,u,l,c,a,s,f,p,y,b,v;return g(this,function(g){switch(g.label){case 0:if(!(e=prompt("Add url to plugin. List of plugins: https://github.com/search?q=topic:webdeck-plugin")))return[3,7];g.label=1;case 1:if(g.trys.push([1,6,,7]),!e.includes("github.com"))return[3,4];return o=e.replace("https://github.com/","https://api.github.com/repos/"),[4,fetch(o)];case 2:return[4,g.sent().json()];case 3:if((u=g.sent())&&u.has_pages)n=u.homepage,r=(l=d(u.full_name.split("/"),2))[0],console.log({homepage:n,name:t=l[1]}),k({name:t,creator:r,versions:["1.0.0"],url:n});else throw Error("");return[3,5];case 4:if(e.includes("remoteEntry.js")){if(a=(c=d(e.split("?"),2))[0],s=c[1],p=(f=i.default.parse(s)).name,y=f.creator,b=f.v,p)k({name:p,creator:y,versions:[b],url:a.replace("remoteEntry.js","")});else throw Error("")}else throw console.log("input",e),Error("");g.label=5;case 5:return[3,7];case 6:return v=g.sent(),alert("Cound not add plugin, invalid url or repo provided."),console.error(v),[3,7];case 7:return[2]}})}),function(){return t.apply(this,arguments)});var C=(n=c(function(e,t){return g(this,function(n){return[2,new Promise(function(n){if(!e&&n({loaded:!1,url:e,name:t}),v.has(e)){n({loaded:!0,url:e,name:t});return}var r=document.createElement("script");r.src=e,r.type="text/javascript",r.async=!0,r.onload=function(){v.add(e),n({loaded:!0,url:e,name:t})},r.onerror=function(r){return n({loaded:!1,url:e,name:t,e:r})},document.head.appendChild(r)})]})}),function(e,t){return n.apply(this,arguments)});var D=(u=c(function(e){var t,n;return g(this,function(o){switch(o.label){case 0:if(n="".concat(b,"-").concat(e),!m.has(n))return[3,1];return t=m.get(n),[3,3];case 1:return[4,(0,r.loadRemote)("".concat(e.replaceAll("-","_"),"/").concat(b.slice(2)))];case 2:t=o.sent(),m.set(n,t),o.label=3;case 3:return[2,t]}})}),function(e){return u.apply(this,arguments)}),A=function(){return m};(0,o.useEffect)(function(){h(!1);var t={name:"webdeck",remotes:S.map(function(e){return{name:e.name.replaceAll("-","_"),entry:"".concat(e.url,"remoteEntry.js")}})};(0,r.init)(t);var n=[];t.remotes.forEach(function(e){n.push(C(e.entry,e.name))}),Promise.all(n).then(function(n){var r=n.reduce(function(e,t){return!t.loaded&&console.error('Webdeck: Could not load script "'.concat(t.name,'" at ').concat(t.url),t.e),f(s({},e),a({},t.name,t))},{}),o=[];t.remotes.map(function(t){if(!(null==r?void 0:r[t.name]))return console.error('Webdeck: Cant initalise module "'.concat(name,'" as script was not loaded succesfully!')),e;o.push(D(t.name))}),Promise.all(o).then(function(e){console.log("!!! Modules Loaded",e),console.log("MODULE_CATCHE",A()),h(!0)})})},[S]);var E=S.reduce(function(e,t){return f(s({},e),a({},t.name,t))},{});return{initalised:y,plugins:S,pluginsById:E,loadScript:C,setPlugins:O,addPlugin:k,promptAddPlugin:P,promptRemovePlugin:function(e,t){confirm("Are you sure you want to remove this plugin and everywhere where it was used? This action is not reversable.")&&(O(function(t){var n=t.filter(function(t){return t.name!==e});return j(n),n}),t())},loadModule:D,getModule:function(e){var t="".concat(b,"-").concat(null==e?void 0:e.replaceAll("-","_"));return m.get(t)},getModules:A}}},2632:function(e,t,n){"use strict";n.r(t),n.d(t,{useProfiles:function(){return g}});var r=n("7030");function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){i(e,t,n[t])})}return e}function l(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],u=!0,l=!1;try{for(o=o.call(e);!(u=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{!u&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){var t=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==s(r))return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===s(t)?t:String(t)}function s(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}var f="profiles",d=function(){var e=localStorage.getItem(f);return e?u({},JSON.parse(e)):{default:{keys:{}}}},p=function(e){localStorage.setItem(f,JSON.stringify(e))},y=function(){return"default"},g=function(){var e=c((0,r.useState)(d()),2),t=e[0],n=e[1],o=c((0,r.useState)(y),2),s=o[0],f=o[1],g=t[s],b=function(e){n(function(t){var n=l(u({},t),i({},s,u({},t[s],e)));return p(n),n})},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{keys:{}};n(function(n){var r=l(u({},n),i({},e,t));return p(r),r})};return{profiles:t,profile:g,profileName:s,setProfileName:f,setPlugin:function(e,t){b({keys:l(u({},g.keys),i({},t,{plugin:e,config:{}}))})},removePlugin:function(e){b({keys:u({},Object.keys(g.keys).reduce(function(t,n){var r=g.keys[n],o=e===r.plugin;return l(u({},t),i({},n,{plugin:o?"":r.plugin,config:o?{}:r.config}))},{}))})},updateProfile:b,addProfile:v,promptAddProfile:function(){var e=prompt("What the name of the profile? Using names that already exists, will overwirte you old profile! You can use a pipe (`|`) after the name, to provide the config.");if(e){var t,n=c(e.split("|"),2),r=n[0],o=n[1];try{var i=JSON.parse(o);i&&(t=i)}catch(e){console.log("invalid config provided")}console.log({name:r,config:o}),v(r,t),f(r)}},promptRemoveProfile:function(){confirm("Are you sure you want to delete this profile? These changes are inreversable.")&&n(function(e){e[s];var t=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++){if(n=i[r],!(t.indexOf(n)>=0))Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}}return o}(e,[s].map(a));return f("default"),u({},t)})},promptExportProfile:function(){prompt("Profile:","".concat(s,"|").concat(JSON.stringify(g)))},setConfig:function(e,t){b(l(u({},g),{keys:l(u({},g.keys),i({},e,l(u({},g.keys[e]),{config:t})))}))}}}},407:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r}});var r=function(e){var t,r;if(e&&(t=e,null!=(r=Function)&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?!!r[Symbol.hasInstance](t):t instanceof r))n.el("407@309:329").then(n.bind(n,"2131")).then(function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,u=t.getTTFB;n(e),r(e),o(e),i(e),u(e)})}},4778:function(e,t,n){"use strict";n.r(t),n.d(t,{getVirtualDeck:function(){return u},requestVirtualDecks:function(){return l}});var r="virtualdeck",o=function(){localStorage.removeItem(r)},i={default:{PRODUCT_NAME:"VirtualDeck 2x3",NUM_KEYS:6,KEY_COLUMNS:3,KEY_ROWS:2,close:o}},u=function(){var e,t,n=localStorage.getItem(r);if(n){;return[(e=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,o,i;r=e,o=t,i=n[t],o in r?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i})}return e}({},JSON.parse(n)),t=(t={close:o},t),Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e)]}return[]},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default",t=i[e];return localStorage.setItem(r,JSON.stringify(t)),[i[e]]}}}]);
//# sourceMappingURL=18.js.map