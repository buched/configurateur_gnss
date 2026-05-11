/* esm.sh - esp-web-tools@10.2.1 */
var s=async t=>{import("./dist/install-dialog.mjs");let o;try{o=await navigator.serial.requestPort()}catch(e){if(e.name==="NotFoundError"){import("./dist/no-port-picked/index.mjs").then(i=>i.openNoPortPickedDialog(()=>s(t)));return}alert(`Error: ${e.message}`);return}if(!o)return;try{await o.open({baudRate:115200,bufferSize:8192})}catch(e){alert(e.message);return}let r=document.createElement("ewt-install-dialog");r.port=o,r.manifestPath=t.manifest||t.getAttribute("manifest"),r.overrides=t.overrides,r.addEventListener("closed",()=>{o.close()},{once:!0}),document.body.appendChild(r)};var n=class t extends HTMLElement{connectedCallback(){if(this.renderRoot)return;if(this.renderRoot=this.attachShadow({mode:"open"}),!t.isSupported||!t.isAllowed){this.toggleAttribute("install-unsupported",!0),this.renderRoot.innerHTML=t.isAllowed?"<slot name='unsupported'>Your browser does not support installing things on ESP devices. Use Google Chrome or Microsoft Edge.</slot>":"<slot name='not-allowed'>You can only install ESP devices on HTTPS websites or on the localhost.</slot>";return}this.toggleAttribute("install-supported",!0);let o=document.createElement("slot");o.addEventListener("click",async e=>{e.preventDefault(),s(this)}),o.name="activate";let r=document.createElement("button");if(r.innerText="Connect",o.append(r),"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(t.style),this.renderRoot.adoptedStyleSheets=[e]}else{let e=document.createElement("style");e.innerText=t.style,this.renderRoot.append(e)}this.renderRoot.append(o)}};n.isSupported="serial"in navigator;n.isAllowed=window.isSecureContext;n.style=`
  button {
    position: relative;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 24px;
    color: var(--esp-tools-button-text-color, #fff);
    background-color: var(--esp-tools-button-color, #03a9f4);
    border: none;
    border-radius: var(--esp-tools-button-border-radius, 9999px);
  }
  button::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.2;
    border-radius: var(--esp-tools-button-border-radius, 9999px);
  }
  button:hover::before {
    background-color: rgba(255,255,255,.8);
  }
  button:focus {
    outline: none;
  }
  button:focus::before {
    background-color: white;
  }
  button:active::before {
    background-color: grey;
  }
  :host([active]) button {
    color: rgba(0, 0, 0, 0.38);
    background-color: rgba(0, 0, 0, 0.12);
    box-shadow: none;
    cursor: unset;
    pointer-events: none;
  }
  .hidden {
    display: none;
  }`;customElements.define("esp-web-install-button",n);export{n as InstallButton};
//# sourceMappingURL=esp-web-tools.mjs.map