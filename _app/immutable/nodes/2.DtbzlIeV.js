import{s as De,n as ie,r as be}from"../chunks/scheduler.CtbWrGNo.js";import{S as Ve,i as He,e as S,s as F,c as Y,a as W,d as X,f as R,y as Q,o as P,p as U,g as oe,h as N,z as G,A as se,t as te,b as ne,j as me,B as we,C as q}from"../chunks/index.DjZXoZ0F.js";function Z(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function Le(){function t(o){function l(s,g,u){this.x=s,this.y=g,this.z=u}l.prototype.dot2=function(s,g){return this.x*s+this.y*g},l.prototype.dot3=function(s,g,u){return this.x*s+this.y*g+this.z*u},this.grad3=[new l(1,1,0),new l(-1,1,0),new l(1,-1,0),new l(-1,-1,0),new l(1,0,1),new l(-1,0,1),new l(1,0,-1),new l(-1,0,-1),new l(0,1,1),new l(0,-1,1),new l(0,1,-1),new l(0,-1,-1)],this.p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],this.perm=new Array(512),this.gradP=new Array(512),this.seed(o||0)}t.prototype.seed=function(o){o>0&&o<1&&(o*=65536),o=Math.floor(o),o<256&&(o|=o<<8);for(var l=this.p,s=0;s<256;s++){var g;s&1?g=l[s]^o&255:g=l[s]^o>>8&255;var u=this.perm,m=this.gradP;u[s]=u[s+256]=g,m[s]=m[s+256]=this.grad3[g%12]}};var e=.5*(Math.sqrt(3)-1),n=(3-Math.sqrt(3))/6,f=1/3,c=1/6;t.prototype.simplex2=function(o,l){var s,g,u,m=(o+l)*e,w=Math.floor(o+m),k=Math.floor(l+m),H=(w+k)*n,p=o-w+H,I=l-k+H,D,L;p>I?(D=1,L=0):(D=0,L=1);var _=p-D+n,a=I-L+n,T=p-1+2*n,r=I-1+2*n;w&=255,k&=255;var V=this.perm,i=this.gradP,b=i[w+V[k]],h=i[w+D+V[k+L]],d=i[w+1+V[k+1]],C=.5-p*p-I*I;C<0?s=0:(C*=C,s=C*C*b.dot2(p,I));var j=.5-_*_-a*a;j<0?g=0:(j*=j,g=j*j*h.dot2(_,a));var E=.5-T*T-r*r;return E<0?u=0:(E*=E,u=E*E*d.dot2(T,r)),70*(s+g+u)},t.prototype.simplex3=function(o,l,s){var g,u,m,w,k=(o+l+s)*f,H=Math.floor(o+k),p=Math.floor(l+k),I=Math.floor(s+k),D=(H+p+I)*c,L=o-H+D,_=l-p+D,a=s-I+D,T,r,V,i,b,h;L>=_?_>=a?(T=1,r=0,V=0,i=1,b=1,h=0):L>=a?(T=1,r=0,V=0,i=1,b=0,h=1):(T=0,r=0,V=1,i=1,b=0,h=1):_<a?(T=0,r=0,V=1,i=0,b=1,h=1):L<a?(T=0,r=1,V=0,i=0,b=1,h=1):(T=0,r=1,V=0,i=1,b=1,h=0);var d=L-T+c,C=_-r+c,j=a-V+c,E=L-i+2*c,A=_-b+2*c,B=a-h+2*c,J=L-1+3*c,K=_-1+3*c,z=a-1+3*c;H&=255,p&=255,I&=255;var O=this.perm,le=this.gradP,ke=le[H+O[p+O[I]]],Te=le[H+T+O[p+r+O[I+V]]],Ie=le[H+i+O[p+b+O[I+h]]],Ce=le[H+1+O[p+1+O[I+1]]],$=.5-L*L-_*_-a*a;$<0?g=0:($*=$,g=$*$*ke.dot3(L,_,a));var y=.5-d*d-C*C-j*j;y<0?u=0:(y*=y,u=y*y*Te.dot3(d,C,j));var x=.5-E*E-A*A-B*B;x<0?m=0:(x*=x,m=x*x*Ie.dot3(E,A,B));var ee=.5-J*J-K*K-z*z;return ee<0?w=0:(ee*=ee,w=ee*ee*Ce.dot3(J,K,z)),32*(g+u+m+w)};function v(o){return o*o*o*(o*(o*6-15)+10)}function M(o,l,s){return(1-s)*o+s*l}return t.prototype.perlin2=function(o,l){var s=Math.floor(o),g=Math.floor(l);o=o-s,l=l-g,s=s&255,g=g&255;var u=this.perm,m=this.gradP,w=m[s+u[g]].dot2(o,l),k=m[s+u[g+1]].dot2(o,l-1),H=m[s+1+u[g]].dot2(o-1,l),p=m[s+1+u[g+1]].dot2(o-1,l-1),I=v(o);return M(M(w,H,I),M(k,p,I),v(l))},t.prototype.perlin3=function(o,l,s){var g=Math.floor(o),u=Math.floor(l),m=Math.floor(s);o=o-g,l=l-u,s=s-m,g=g&255,u=u&255,m=m&255;var w=this.perm,k=this.gradP,H=k[g+w[u+w[m]]].dot3(o,l,s),p=k[g+w[u+w[m+1]]].dot3(o,l,s-1),I=k[g+w[u+1+w[m]]].dot3(o,l-1,s),D=k[g+w[u+1+w[m+1]]].dot3(o,l-1,s-1),L=k[g+1+w[u+w[m]]].dot3(o-1,l,s),_=k[g+1+w[u+w[m+1]]].dot3(o-1,l,s-1),a=k[g+1+w[u+1+w[m]]].dot3(o-1,l-1,s),T=k[g+1+w[u+1+w[m+1]]].dot3(o-1,l-1,s-1),r=v(o),V=v(l),i=v(s);return M(M(M(H,L,r),M(p,_,r),i),M(M(I,a,r),M(D,T,r),i),V)},t}function de(t,e,n){const f=t.slice();f[22]=e[n],f[27]=n;const c=f[22].reds+f[22].blues;f[23]=c;const v=Math.max(f[22].reds,f[22].blues);f[24]=v;const M=f[24]*100/f[23];return f[25]=M,f}function fe(t,e,n){const f=t.slice();return f[22]=e[n],f[27]=n,f}function he(t,e,n){const f=t.slice();return f[29]=e[n],f[31]=n,f}function ce(t,e,n){const f=t.slice();return f[32]=e[n].sides,f[22]=e[n].region,f[33]=e[n].frac,f[35]=n,f}function ue(t){let e,n,f='<div class="absolute w-full h-[4px] bg-white top-0"></div>',c,v,M='<div class="absolute w-full h-[4px] bg-white top-0"></div>',o,l,s='<div class="absolute w-full h-[4px] bg-white top-0"></div>',g,u,m='<div class="absolute w-full h-[4px] bg-white top-0"></div>',w,k,H='<div class="absolute w-full h-[4px] bg-white top-0"></div>',p,I,D='<div class="absolute w-full h-[4px] bg-white top-0"></div>',L,_,a=t[22]+"",T,r,V;function i(...h){return t[10](t[35],t[31],...h)}function b(...h){return t[11](t[35],t[31],...h)}return{c(){e=S("div"),n=S("div"),n.innerHTML=f,c=F(),v=S("div"),v.innerHTML=M,o=F(),l=S("div"),l.innerHTML=s,g=F(),u=S("div"),u.innerHTML=m,w=F(),k=S("div"),k.innerHTML=H,p=F(),I=S("div"),I.innerHTML=D,L=F(),_=S("div"),T=te(a),this.h()},l(h){e=Y(h,"DIV",{class:!0});var d=W(e);n=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(n)!=="svelte-j7i5jb"&&(n.innerHTML=f),c=R(d),v=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(v)!=="svelte-95uy2y"&&(v.innerHTML=M),o=R(d),l=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(l)!=="svelte-14cbjp1"&&(l.innerHTML=s),g=R(d),u=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(u)!=="svelte-17vlctb"&&(u.innerHTML=m),w=R(d),k=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(k)!=="svelte-wx8ic3"&&(k.innerHTML=H),p=R(d),I=Y(d,"DIV",{class:!0,"data-svelte-h":!0}),Q(I)!=="svelte-1n6cqu2"&&(I.innerHTML=D),L=R(d),_=Y(d,"DIV",{class:!0,style:!0});var C=W(_);T=ne(C,a),C.forEach(X),d.forEach(X),this.h()},h(){P(n,"class","absolute w-full h-full inset-0"),q(n,"hidden",!(t[32]&1)),P(v,"class","absolute w-full h-full inset-0 rotate-[60deg]"),q(v,"hidden",!(t[32]&2)),P(l,"class","absolute w-full h-full inset-0 rotate-[120deg]"),q(l,"hidden",!(t[32]&4)),P(u,"class","absolute w-full h-full inset-0 rotate-[180deg]"),q(u,"hidden",!(t[32]&8)),P(k,"class","absolute w-full h-full inset-0 rotate-[240deg]"),q(k,"hidden",!(t[32]&16)),P(I,"class","absolute w-full h-full inset-0 rotate-[300deg]"),q(I,"hidden",!(t[32]&32)),P(_,"class","hex-inner bg-red-300 w-full h-full cursor-pointer flex items-center justify-center text-4xl text-white svelte-1laiqmy"),U(_,"background-color","rgb("+Math.floor(t[33]*255)+", 0, "+Math.floor((1-t[33])*255)+")"),P(e,"class","hex p-1 relative svelte-1laiqmy")},m(h,d){oe(h,e,d),N(e,n),N(e,c),N(e,v),N(e,o),N(e,l),N(e,g),N(e,u),N(e,w),N(e,k),N(e,p),N(e,I),N(e,L),N(e,_),N(_,T),r||(V=[G(_,"mousedown",i),G(_,"mouseenter",b),G(_,"contextmenu",we(je))],r=!0)},p(h,d){t=h,d[0]&1&&q(n,"hidden",!(t[32]&1)),d[0]&1&&q(v,"hidden",!(t[32]&2)),d[0]&1&&q(l,"hidden",!(t[32]&4)),d[0]&1&&q(u,"hidden",!(t[32]&8)),d[0]&1&&q(k,"hidden",!(t[32]&16)),d[0]&1&&q(I,"hidden",!(t[32]&32)),d[0]&1&&a!==(a=t[22]+"")&&me(T,a),d[0]&1&&U(_,"background-color","rgb("+Math.floor(t[33]*255)+", 0, "+Math.floor((1-t[33])*255)+")")},d(h){h&&X(e),r=!1,be(V)}}}function ve(t){let e,n,f=Z(t[29]),c=[];for(let v=0;v<f.length;v+=1)c[v]=ue(ce(t,f,v));return{c(){e=S("div");for(let v=0;v<c.length;v+=1)c[v].c();n=F(),this.h()},l(v){e=Y(v,"DIV",{class:!0});var M=W(e);for(let o=0;o<c.length;o+=1)c[o].l(M);n=R(M),M.forEach(X),this.h()},h(){P(e,"class","flex")},m(v,M){oe(v,e,M);for(let o=0;o<c.length;o+=1)c[o]&&c[o].m(e,null);N(e,n)},p(v,M){if(M[0]&385){f=Z(v[29]);let o;for(o=0;o<f.length;o+=1){const l=ce(v,f,o);c[o]?c[o].p(l,M):(c[o]=ue(l),c[o].c(),c[o].m(e,n))}for(;o<c.length;o+=1)c[o].d(1);c.length=f.length}},d(v){v&&X(e),se(c,v)}}}function ge(t){let e,n,f,c,v;function M(){return t[16](t[27])}return{c(){e=S("button"),n=te(t[27]),this.h()},l(o){e=Y(o,"BUTTON",{class:!0});var l=W(e);n=ne(l,t[27]),l.forEach(X),this.h()},h(){P(e,"class",f=(t[2]===t[27]?"bg-gray-400":"bg-gray-300")+" shadow-xl rounded-lg w-10 h-10")},m(o,l){oe(o,e,l),N(e,n),c||(v=G(e,"click",M),c=!0)},p(o,l){t=o,l[0]&4&&f!==(f=(t[2]===t[27]?"bg-gray-400":"bg-gray-300")+" shadow-xl rounded-lg w-10 h-10")&&P(e,"class",f)},d(o){o&&X(e),c=!1,v()}}}function pe(t){let e,n,f,c=isNaN(t[25])?"N/A":t[25].toFixed(2)+"%",v,M,o;return{c(){e=S("div"),n=te(t[27]),f=te(" - "),v=te(c),M=F(),this.h()},l(l){e=Y(l,"DIV",{class:!0});var s=W(e);n=ne(s,t[27]),f=ne(s," - "),v=ne(s,c),M=R(s),s.forEach(X),this.h()},h(){P(e,"class",o=(t[22].blues>t[22].reds?"text-blue-700":"text-red-700")+" p-2")},m(l,s){oe(l,e,s),N(e,n),N(e,f),N(e,v),N(e,M)},p(l,s){s[0]&2&&c!==(c=isNaN(l[25])?"N/A":l[25].toFixed(2)+"%")&&me(v,c),s[0]&2&&o!==(o=(l[22].blues>l[22].reds?"text-blue-700":"text-red-700")+" p-2")&&P(e,"class",o)},d(l){l&&X(e)}}}function Ne(t){let e,n,f=`${t[4]}px`,c=`${t[5]}px`,v,M,o,l,s,g="+",u,m,w,k,H=Z(t[0]),p=[];for(let a=0;a<H.length;a+=1)p[a]=ve(he(t,H,a));let I=Z(t[1]),D=[];for(let a=0;a<I.length;a+=1)D[a]=ge(fe(t,I,a));let L=Z(t[1]),_=[];for(let a=0;a<L.length;a+=1)_[a]=pe(de(t,L,a));return{c(){e=S("div"),n=S("div");for(let a=0;a<p.length;a+=1)p[a].c();v=F(),M=S("div"),o=S("div");for(let a=0;a<D.length;a+=1)D[a].c();l=F(),s=S("button"),s.textContent=g,u=F(),m=S("div");for(let a=0;a<_.length;a+=1)_[a].c();this.h()},l(a){e=Y(a,"DIV",{class:!0});var T=W(e);n=Y(T,"DIV",{class:!0});var r=W(n);for(let h=0;h<p.length;h+=1)p[h].l(r);r.forEach(X),v=R(T),M=Y(T,"DIV",{class:!0});var V=W(M);o=Y(V,"DIV",{class:!0});var i=W(o);for(let h=0;h<D.length;h+=1)D[h].l(i);l=R(i),s=Y(i,"BUTTON",{class:!0,"data-svelte-h":!0}),Q(s)!=="svelte-ds3t3b"&&(s.textContent=g),i.forEach(X),V.forEach(X),u=R(T),m=Y(T,"DIV",{class:!0});var b=W(m);for(let h=0;h<_.length;h+=1)_[h].l(b);b.forEach(X),T.forEach(X),this.h()},h(){P(n,"class","absolute plane svelte-1laiqmy"),U(n,"scale",t[3]),U(n,"top",f),U(n,"left",c),P(s,"class","bg-gray-300 shadow-xl rounded-lg w-10 h-10"),P(o,"class","flex gap-5 h-full pointer-events-auto w-max"),P(M,"class","absolute bottom-5 left-5 pointer-events-none right-5 overflow-auto"),P(m,"class","flex flex-col absolute top-5 h-48 md:h-auto overflow-auto md:top-auto md:bottom-5 right-5 shadow-xl rounded-lg bg-gray-300 text-2xl font-bold"),P(e,"class","h-screen w-screen overflow-hidden relative")},m(a,T){oe(a,e,T),N(e,n);for(let r=0;r<p.length;r+=1)p[r]&&p[r].m(n,null);N(e,v),N(e,M),N(M,o);for(let r=0;r<D.length;r+=1)D[r]&&D[r].m(o,null);N(o,l),N(o,s),N(e,u),N(e,m);for(let r=0;r<_.length;r+=1)_[r]&&_[r].m(m,null);w||(k=[G(n,"wheel",t[12]),G(n,"mousemove",t[13]),G(n,"drag",we(Ee)),G(n,"touchmove",t[14]),G(n,"pointerdown",t[15]),G(s,"click",t[17])],w=!0)},p(a,T){if(T[0]&385){H=Z(a[0]);let r;for(r=0;r<H.length;r+=1){const V=he(a,H,r);p[r]?p[r].p(V,T):(p[r]=ve(V),p[r].c(),p[r].m(n,null))}for(;r<p.length;r+=1)p[r].d(1);p.length=H.length}if(T[0]&8&&U(n,"scale",a[3]),T[0]&16&&f!==(f=`${a[4]}px`)&&U(n,"top",f),T[0]&32&&c!==(c=`${a[5]}px`)&&U(n,"left",c),T[0]&6){I=Z(a[1]);let r;for(r=0;r<I.length;r+=1){const V=fe(a,I,r);D[r]?D[r].p(V,T):(D[r]=ge(V),D[r].c(),D[r].m(o,l))}for(;r<D.length;r+=1)D[r].d(1);D.length=I.length}if(T[0]&2){L=Z(a[1]);let r;for(r=0;r<L.length;r+=1){const V=de(a,L,r);_[r]?_[r].p(V,T):(_[r]=pe(V),_[r].c(),_[r].m(m,null))}for(;r<_.length;r+=1)_[r].d(1);_.length=L.length}},i:ie,o:ie,d(a){a&&X(e),se(p,a),se(D,a),se(_,a),w=!1,be(k)}}}const _e=4;function*Me(t,e){t%2===0?(e!==0&&(yield{y:e-1,x:t}),e!==0&&t!==49&&(yield{y:e-1,x:t+1}),t!==49&&(yield{y:e,x:t+1}),e!==49&&(yield{y:e+1,x:t}),t!==0&&(yield{y:e,x:t-1}),t!==0&&e!==0&&(yield{y:e-1,x:t-1})):(e!==0&&(yield{y:e-1,x:t}),t!==49&&(yield{y:e,x:t+1}),e!==49&&t!==49&&(yield{y:e+1,x:t+1}),e!==49&&(yield{y:e+1,x:t}),e!==49&&t!==0&&(yield{y:e+1,x:t-1}),t!==0&&(yield{y:e,x:t-1}))}function*re(t,e,n){yield{x:e,y:n};const f=t[n][e],c=new WeakSet([f]),v=f.region;function*M(o,l){for(const{x:s,y:g}of Me(o,l)){const u=t[g][s];!c.has(u)&&u.region===v&&(yield{x:s,y:g},c.add(u),yield*M(s,g))}}yield*M(e,n)}function ae(t,e,n){e%2===0?(t[n][e].sides=t[n][e].sides&-2|1*+(n===0||t[n-1][e].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-3|2*+(n===0||e===49||t[n-1][e+1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-5|4*+(e==49||t[n][e+1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-9|8*+(n===49||t[n+1][e].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-17|16*+(e===0||t[n][e-1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-33|32*+(n===0||e===0||t[n-1][e-1].region!==t[n][e].region)):(t[n][e].sides=t[n][e].sides&-2|1*+(n===0||t[n-1][e].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-3|2*+(e===49||t[n][e+1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-5|4*+(n===49||e===49||t[n+1][e+1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-9|8*+(n===49||t[n+1][e].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-17|16*+(e===0||n===49||t[n+1][e-1].region!==t[n][e].region),t[n][e].sides=t[n][e].sides&-33|32*+(e===0||t[n][e-1].region!==t[n][e].region))}const je=()=>{},Ee=()=>{};function Pe(t,e,n){const f=Le(),c=new f(Math.random()),v=new f(Math.random());function M(){let i=[],b=[];for(let d=0;d<_e;d++)b.push({blues:0,reds:0});for(let d=0;d<50;d++){let C=[];for(let j=0;j<50;j++){const E=(1+c.perlin2(j/10,d/10))/2,A=(1+v.perlin2(j/10,d/10))/2,B=Math.floor(A*_e);C.push({sides:0,region:B,frac:E})}i.push(C)}for(let d=0;d<50;d++)for(let C=0;C<50;C++)ae(i,C,d);const h=b.map(()=>null);for(let d=0;d<50;d++)for(let C=0;C<50;C++){const j=i[d][C],E=h[j.region];if(E!=null){if(E.has(j))continue;const A=[...re(i,C,d)],B=new WeakSet;for(const{x:J,y:K}of A){const z=i[K][J];z.region=h.length,B.add(z)}h.push(B),b.push({blues:0,reds:0})}else{const A=re(i,C,d),B=new WeakSet;for(const{x:J,y:K}of A)B.add(i[K][J]);h[j.region]=B}}for(let d=0;d<50;d++)for(let C=0;C<50;C++){const j=i[d][C],E=b[j.region];E.reds+=j.frac,E.blues+=1-j.frac}return{tiles:i,regions:b}}let{tiles:o,regions:l}=M();function s(i,b){const h=o[b][i].frac,d=o[b][i].region;n(0,o[b][i].region=u,o);const C=l[d],j=l[u];C.reds-=h,C.blues-=1-h,j.reds+=h,j.blues+=1-h,n(1,l),ae(o,i,b);for(const{x:E,y:A}of Me(i,b))ae(o,E,A)}function g(i,b){const h=[...re(o,i,b)];for(const{x:d,y:C}of h)s(d,C)}let u=0,m=1,w=0,k=0;function H(i,b,h){const d=m*i,C=(d-m)/m;n(4,w-=h*C),n(5,k-=b*C),n(3,m=d)}let p=null;return[o,l,u,m,w,k,p,s,g,H,(i,b,h)=>h.button===0&&s(i,b)||h.button===2&&g(i,b),(i,b,h)=>{h.buttons===1&&s(i,b)},i=>{const b=i.pageX-k,h=i.pageY-w;i.deltaY>0?H(3/4,b,h):H(4/3,b,h)},i=>{i.buttons===4&&p&&(n(5,k+=i.screenX-p.x),n(4,w+=i.screenY-p.y),n(6,p={x:i.screenX,y:i.screenY}))},i=>{if(p){const b=i.touches[0];n(5,k+=b.screenX-p.x),n(4,w+=b.screenY-p.y),n(6,p={x:b.screenX,y:b.screenY})}},i=>{n(6,p={x:i.screenX,y:i.screenY})},i=>n(2,u=i),()=>{l.push({blues:0,reds:0}),n(1,l)}]}class Xe extends Ve{constructor(e){super(),He(this,e,Pe,Ne,De,{},null,[-1,-1])}}export{Xe as component};
