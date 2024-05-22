var z=Object.defineProperty;var x=(w,l,e)=>l in w?z(w,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):w[l]=e;var o=(w,l,e)=>(x(w,typeof l!="symbol"?l+"":l,e),e);import{C as M}from"./web-ifc-api-BiYij3qq.js";import{J as U,U as m,I as C,H as k,A as F}from"./index-B3b_h8A8.js";const S=class S extends U{constructor(e){super(e);o(this,"onDisposed",new m);o(this,"onBeforeUpdate",new m);o(this,"onAfterUpdate",new m);o(this,"onSetup",new m);o(this,"isSetup",!1);o(this,"enabled",!0);o(this,"events",{});o(this,"multiple","ctrlKey");o(this,"zoomFactor",1.5);o(this,"zoomToSelection",!1);o(this,"backupColor",null);o(this,"selection",{});o(this,"config",{selectName:"select",hoverName:"hover",selectionColor:new M("#BCF124"),hoverColor:new M("#6528D7"),autoHighlightOnClick:!0,world:null});o(this,"colors",new Map);o(this,"_mouseState",{down:!1,moved:!1});o(this,"clearHover",()=>{this.selection[this.config.hoverName]={}});o(this,"onMouseDown",()=>{this.enabled&&(this._mouseState.down=!0)});o(this,"onMouseUp",async e=>{const t=this.config.world;if(!t)throw new Error("No world found!");if(!t.renderer)throw new Error("This world doesn't have a renderer!");if(this.enabled&&e.target===t.renderer.three.domElement){if(this._mouseState.down=!1,this._mouseState.moved||e.button!==0){this._mouseState.moved=!1;return}if(this._mouseState.moved=!1,this.config.autoHighlightOnClick){const s=this.multiple==="none"?!0:!e[this.multiple];await this.highlight(this.config.selectName,s,this.zoomToSelection)}}});o(this,"onMouseMove",async()=>{if(!this.enabled)return;if(this._mouseState.moved){this.clear(this.config.hoverName);return}this._mouseState.moved=this._mouseState.down;const e=this.selection[this.config.selectName];await this.highlight(this.config.hoverName,!0,!1,e)});this.components.add(S.uuid,this)}async dispose(){this.setupEvents(!1),this.onBeforeUpdate.reset(),this.onAfterUpdate.reset(),this.selection={};for(const e in this.events)this.events[e].onClear.reset(),this.events[e].onHighlight.reset();this.onSetup.reset(),this.events={},this.onDisposed.trigger(S.uuid),this.onDisposed.reset()}add(e,t){if(this.selection[e]||this.colors.has(e))throw new Error("A selection with that name already exists!");this.colors.set(e,t),this.selection[e]={},this.events[e]={onHighlight:new m,onClear:new m}}async highlight(e,t=!0,s=this.zoomToSelection,a={}){if(!this.enabled)return null;if(!this.config.world)throw new Error("No world found in config!");const h=this.config.world;if(!this.selection[e])throw new Error(`Selection ${e} does not exist.`);const n=this.components.get(C).meshes,c=this.components.get(k).get(h).castRay(n);if(!c||!c.face)return this.clear(e),null;const u=c.object,I=u.geometry,E=c.instanceId;if(!I||E===void 0)return null;const v=u.fragment.getItemID(E);if(v===null)throw new Error("Item ID not found!");const b=u.fragment.group;if(!b)throw new Error("Fragment must belong to a FragmentsGroup!");const g=b.getFragmentMap([v]),f={};for(const d in g){const H=g[d],D=a[d];for(const y of H)(!D||!D.has(y))&&(f[d]||(f[d]=new Set),f[d].add(y))}return await this.highlightByID(e,f,t,s),{id:v,fragments:g}}async highlightByID(e,t,s=!0,a=this.zoomToSelection){if(!this.enabled)return;s&&this.clear(e);const h=this.components.get(C),i=this.colors.get(e);if(!i)throw new Error("Color for selection not found!");for(const n in t){const r=h.list.get(n);if(!r)continue;this.selection[e][n]||(this.selection[e][n]=new Set);const p=t[n];for(const c of p)this.selection[e][n].add(c),r.setColor(i,[c])}this.events[e].onHighlight.trigger(this.selection[e]),a&&await this.zoomSelection(e)}clear(e){const t=e?[e]:Object.keys(this.selection);for(const s of t){const a=this.components.get(C),h=this.selection[s];for(const i in this.selection[s]){const n=a.list.get(i);if(!n)continue;const r=h[i];r&&(this.backupColor?n.setColor(this.backupColor):n.resetColor(r))}this.events[s].onClear.trigger(null),this.selection[s]={}}}setup(e){this.config={...this.config,...e},this.add(this.config.selectName,this.config.selectionColor),this.add(this.config.hoverName,this.config.hoverColor),this.setupEvents(!0),this.enabled=!0,this.isSetup=!0,this.onSetup.trigger(this)}async zoomSelection(e){if(!this.config.world)throw new Error("No world found in config!");const t=this.config.world;if(!t.camera.hasCameraControls())return;const s=this.components.get(F),a=this.components.get(C);s.reset();const h=this.selection[e];if(!Object.keys(h).length)return;for(const g in h){const f=a.list.get(g);if(!f)continue;const d=h[g];s.addMesh(f.mesh,d)}const i=s.getSphere(),n=1/0,r=-1/0,{x:p,y:c,z:u}=i.center,I=i.radius===n||p===n||c===n||u===n,E=i.radius===r||p===r||c===r||u===r,v=i.radius===0;if(I||E||v)return;i.radius*=this.zoomFactor,await t.camera.controls.fitToSphere(i,!0)}setupEvents(e){if(!this.config.world)throw new Error("No world found while setting up events!");if(!this.config.world.renderer)throw new Error("The given world doesn't have a renderer!");const t=this.config.world.renderer.three.domElement,s=this.events[this.config.selectName].onHighlight;s.remove(this.clearHover),t.removeEventListener("mousedown",this.onMouseDown),t.removeEventListener("mouseup",this.onMouseUp),t.removeEventListener("mousemove",this.onMouseMove),e&&(s.add(this.clearHover),t.addEventListener("mousedown",this.onMouseDown),t.addEventListener("mouseup",this.onMouseUp),t.addEventListener("mousemove",this.onMouseMove))}};o(S,"uuid","cb8a76f2-654a-4b50-80c6-66fd83cafd77");let N=S;export{N as H};