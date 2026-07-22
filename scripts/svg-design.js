'use strict';

const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&apos;','"':'&quot;'})[c]);
const colors = ['#00F7FF','#FF2BD6','#8B5CF6','#FF7AE5','#39FF14'];

function frame(id, eyebrow, code, content, height=500) {
  const shell=`M24 0H1148L1200 52V${height-30}L1170 ${height}H52L0 ${height-52}V24Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${esc(eyebrow)}</title><desc id="${id}-desc">Retro-neon arcade interface for AMIRGH23.</desc>
  <defs>
    <linearGradient id="${id}-wash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#16082B"/><stop offset=".48" stop-color="#050510"/><stop offset="1" stop-color="#07192A"/></linearGradient>
    <linearGradient id="${id}-neon" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#FF2BD6"/><stop offset=".5" stop-color="#8B5CF6"/><stop offset="1" stop-color="#00F7FF"/></linearGradient>
    <radialGradient id="${id}-light"><stop stop-color="#FF2BD6" stop-opacity=".2"/><stop offset=".48" stop-color="#8B5CF6" stop-opacity=".09"/><stop offset="1" stop-color="#00F7FF" stop-opacity="0"/></radialGradient>
    <pattern id="${id}-grid" width="54" height="28" patternUnits="userSpaceOnUse"><path d="M54 0H0V28" fill="none" stroke="#00F7FF" stroke-opacity=".08"/></pattern>
    <clipPath id="${id}-clip"><path d="${shell}"/></clipPath>
    <filter id="${id}-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <style>.sans{font-family:Inter,'Segoe UI',Arial,sans-serif}.mono{font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace}.ice{fill:#FFF7FF}.blue{fill:#00F7FF}.soft{fill:#B8B5D1}.faint{fill:#77738F}.mint{fill:#FF2BD6}.label{font-size:11px;letter-spacing:2.6px}.micro{font-size:10px}.pulse{animation:${id}Pulse 3.2s ease-in-out infinite}@keyframes ${id}Pulse{50%{opacity:.3}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>
  </defs>
  <path d="${shell}" fill="url(#${id}-wash)"/><g clip-path="url(#${id}-clip)"><rect y="${Math.max(72,height-150)}" width="1200" height="${Math.min(150,height-72)}" fill="url(#${id}-grid)"/><circle cx="1060" cy="115" r="230" fill="url(#${id}-light)"/></g><path d="${shell}" fill="none" stroke="url(#${id}-neon)" stroke-opacity=".68" stroke-width="1.5"/>
  <path d="M24 1H218M1 ${height-52}L52 ${height-1}H236M1148 1l51 51v82" fill="none" stroke="#FF2BD6" stroke-width="2"/><path d="M38 67H1162" stroke="url(#${id}-neon)" stroke-opacity=".28"/><circle cx="38" cy="35" r="3" fill="#FF2BD6" filter="url(#${id}-soft)"/><text x="53" y="39" class="mono soft label">${esc(eyebrow)}</text><text x="1162" y="39" text-anchor="end" class="mono faint micro">${esc(code)}</text>
  ${content}</svg>`;
}

function hero(pngBase64){
  if(!pngBase64) throw new Error('hero() requires the MER23LIN base image as base64');
  const shell='M48 0H1576L1672 96V847L1576 943H96L0 847V72Z';
  const inner='M54 8H1572L1664 100V843L1572 935H100L8 843V76Z';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="943" viewBox="0 0 1672 943" role="img" aria-labelledby="hero-title hero-desc">
  <title id="hero-title">MER23LIN — AI Agent Engineer and Full-Stack Developer</title>
  <desc id="hero-desc">Animated retro-neon MER23LIN hero with a cyberpunk cut frame, electrical neural core and flowing circuit signals.</desc>
  <defs>
    <clipPath id="hero-shell"><path d="${shell}"/></clipPath>
    <clipPath id="hero-core-clip"><circle cx="1336" cy="458" r="202"/></clipPath>
    <linearGradient id="hero-frame" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#00F7FF"/><stop offset=".46" stop-color="#8B5CF6"/><stop offset="1" stop-color="#FF2BD6"/></linearGradient>
    <radialGradient id="hero-core-flash"><stop stop-color="#FFF"/><stop offset=".16" stop-color="#FF7AE5" stop-opacity=".96"/><stop offset=".48" stop-color="#FF2BD6" stop-opacity=".28"/><stop offset="1" stop-color="#FF2BD6" stop-opacity="0"/></radialGradient>
    <filter id="hero-cyan-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="hero-hot-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <style>
      .bolt{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:18 10;animation:heroBolt 1.15s linear infinite,heroFlicker 2.4s steps(1,end) infinite}
      .bolt.alt{animation-duration:.82s,1.9s;animation-delay:-.35s,-.8s}
      .circuit{fill:none;stroke-linecap:square;stroke-dasharray:30 150;animation:heroCircuit 3.6s linear infinite}
      .circuit.fast{animation-duration:2.35s;animation-delay:-1.1s}
      .core-pulse{transform-box:fill-box;transform-origin:center;animation:heroPulse 2.1s ease-out infinite}
      .core-pulse.delay{animation-delay:-1.05s}
      .orbit{transform-box:fill-box;transform-origin:center;animation:heroOrbit 14s linear infinite}
      .frame-signal{stroke-dasharray:85 1320;animation:heroFrame 5.2s linear infinite}
      @keyframes heroBolt{to{stroke-dashoffset:-56}}
      @keyframes heroCircuit{to{stroke-dashoffset:-180}}
      @keyframes heroFlicker{0%,18%,22%,56%,60%,100%{opacity:.95}20%,58%{opacity:.22}}
      @keyframes heroPulse{0%{transform:scale(.62);opacity:.9}72%,100%{transform:scale(1.75);opacity:0}}
      @keyframes heroOrbit{to{transform:rotate(360deg)}}
      @keyframes heroFrame{to{stroke-dashoffset:-1405}}
      @media(prefers-reduced-motion:reduce){.bolt,.circuit,.core-pulse,.orbit,.frame-signal{animation:none!important}}
    </style>
  </defs>
  <path d="${shell}" fill="#02030A"/>
  <g clip-path="url(#hero-shell)">
    <image href="data:image/png;base64,${pngBase64}" width="1672" height="943" preserveAspectRatio="xMidYMid slice"/>
    <g clip-path="url(#hero-core-clip)" filter="url(#hero-hot-glow)">
      <path class="bolt" d="M1336 458L1321 431L1333 403L1319 377L1328 349L1316 318" stroke="#00F7FF" stroke-width="3.2"/>
      <path class="bolt alt" d="M1336 458L1364 430L1388 415L1401 385L1434 359" stroke="#FF2BD6" stroke-width="3"/>
      <path class="bolt" d="M1336 458L1372 462L1401 447L1432 459L1471 444L1514 451" stroke="#00F7FF" stroke-width="3.2"/>
      <path class="bolt alt" d="M1336 458L1363 486L1397 493L1414 521L1454 543L1480 579" stroke="#FF2BD6" stroke-width="3"/>
      <path class="bolt" d="M1336 458L1324 493L1339 523L1324 553L1338 590L1330 635" stroke="#00F7FF" stroke-width="3.2"/>
      <path class="bolt alt" d="M1336 458L1302 483L1287 513L1250 526L1235 559L1195 582" stroke="#FF2BD6" stroke-width="3"/>
      <path class="bolt" d="M1336 458L1300 452L1271 468L1237 451L1203 466L1161 451" stroke="#00F7FF" stroke-width="3.2"/>
      <path class="bolt alt" d="M1336 458L1308 425L1279 416L1260 381L1227 365L1202 329" stroke="#FF2BD6" stroke-width="3"/>
    </g>
    <g fill="none" stroke-width="3" filter="url(#hero-cyan-glow)" opacity=".9">
      <path class="circuit" d="M1462 358H1512L1545 325H1672" stroke="#00F7FF"/>
      <path class="circuit fast" d="M1484 401H1550L1578 373H1672" stroke="#FF2BD6"/>
      <path class="circuit" d="M1494 458H1560L1589 429H1672" stroke="#00F7FF"/>
      <path class="circuit fast" d="M1485 515H1545L1584 554H1672" stroke="#FF2BD6"/>
      <path class="circuit" d="M1452 575H1518L1559 616H1672" stroke="#00F7FF"/>
      <path class="circuit fast" d="M1418 625H1483L1528 670H1672" stroke="#FF2BD6"/>
      <path class="circuit" d="M1383 299V245L1418 210V0" stroke="#00F7FF"/>
      <path class="circuit fast" d="M1440 318V270L1474 236V0" stroke="#FF2BD6"/>
    </g>
    <circle cx="1336" cy="458" r="61" fill="none" stroke="#FF7AE5" stroke-width="3" class="core-pulse" filter="url(#hero-hot-glow)"/>
    <circle cx="1336" cy="458" r="61" fill="none" stroke="#00F7FF" stroke-width="2" class="core-pulse delay" filter="url(#hero-cyan-glow)"/>
    <circle cx="1336" cy="458" r="34" fill="url(#hero-core-flash)" class="core-pulse"/>
    <circle cx="1336" cy="458" r="190" fill="none" stroke="#00F7FF" stroke-width="2" stroke-dasharray="12 24 55 18" opacity=".68" class="orbit"/>
  </g>
  <path d="${shell}" fill="none" stroke="url(#hero-frame)" stroke-width="5"/>
  <path d="${inner}" fill="none" stroke="#D9FAFF" stroke-opacity=".18" stroke-width="1.5"/>
  <path d="M48 3H330M3 72V246M3 847L96 940H318M1576 3L1669 96V286M1669 847L1576 940H1422" fill="none" stroke="#FF2BD6" stroke-width="5"/>
  <path d="M48 3H244M1669 212V502M1669 847L1576 940H1485" class="frame-signal" fill="none" stroke="#00F7FF" stroke-width="5" filter="url(#hero-cyan-glow)"/>
  </svg>`;
}

function identity(){return frame('identity','AUTHORIZED OPERATOR','IDENTITY / 87558156',`
  <g transform="translate(54 94)"><rect width="315" height="300" rx="22" fill="#0B0718" stroke="#00F7FF" stroke-opacity=".58"/><path d="M0 28V0h28M287 0h28v28M0 272v28h28M287 300h28v-28" fill="none" stroke="#FF2BD6" stroke-width="2"/><circle cx="157" cy="112" r="50" fill="#140A26" stroke="#8B5CF6"/><path d="M75 253c12-77 152-77 164 0" fill="#140A26" stroke="#8B5CF6"/><path d="M34 42h32M34 42v32M281 42h-32M281 42v32M34 258h32M34 258v-32M281 258h-32M281 258v-32" fill="none" stroke="#00F7FF" stroke-opacity=".8"/><text x="157" y="280" text-anchor="middle" class="mono mint micro">BIOMETRIC LINK VERIFIED</text></g>
  <g transform="translate(425 102)" class="sans"><text class="mono blue label">OPERATOR 01</text><text y="57" class="ice" font-size="36" font-weight="600">Amirreza Ghaffarian</text><text y="91" class="soft" font-size="17">Autonomous Intelligence Architect</text><text y="135" class="faint" font-size="14">Building systems that retrieve, learn, perceive and act.</text>
  <g transform="translate(0 174)" class="mono"><g><text class="faint micro">CODENAME</text><text y="25" class="ice" font-size="14">AMIRGH23</text></g><g transform="translate(270 0)"><text class="faint micro">STATUS</text><text y="25" class="mint" font-size="14">● OPERATIONAL</text></g><g transform="translate(0 68)"><text class="faint micro">SPECIALIZATION</text><text y="25" class="ice" font-size="14">LLM / RAG / AGENTS / RL</text></g><g transform="translate(270 68)"><text class="faint micro">LOCATION</text><text y="25" class="ice" font-size="14">MASHHAD / IRAN</text></g></g></g>`,440)}

function skills(){const a=[['FRONTEND ENGINEERING',90,'React, TypeScript, Next.js and Angular'],['FULL-STACK SYSTEMS',86,'APIs, MongoDB and PostgreSQL'],['AGENT SYSTEMS',84,'Tools, memory and orchestration'],['LLM ENGINEERING',84,'Transformers and local inference'],['RAG ARCHITECTURE',81,'Retrieval and grounded answers'],['WORDPRESS DELIVERY',88,'International sites, SEO and commerce'],['COMPUTER VISION',76,'OpenCV, YOLO, OCR and perception'],['INTERACTIVE 3D',72,'Three.js, Blender and visual systems'],['MODEL TRAINING',74,'PyTorch, TensorFlow and validation'],['AUTOMATION',80,'Reliable delivery workflows']];const cards=a.map(([n,l,d],i)=>{const x=42+(i%2)*558,y=86+Math.floor(i/2)*103;return `<g transform="translate(${x} ${y})" class="mono"><rect width="516" height="84" rx="12" fill="#0B0718" stroke="${colors[i%3]}" stroke-opacity=".3"/><path d="M0 18V0h18" fill="none" stroke="${colors[(i+1)%3]}"/><text x="18" y="27" class="ice" font-size="14">${n}</text><text x="496" y="27" text-anchor="end" class="blue" font-size="12">${l}</text><text x="18" y="50" class="faint micro">${d}</text><rect x="18" y="66" width="478" height="3" rx="2" fill="#241633"/><rect x="18" y="66" width="${l*4.78}" height="3" rx="2" fill="${colors[i%colors.length]}"/></g>`}).join('');return frame('skills','CAPABILITY INDEX','10 ACTIVE MODULES',cards,620)}

function network(){const names=['VISION','RAG','CODE','SECURITY','MEMORY','MCP','OCR','QDRANT','AGENTS','TOOLS'],p=[[185,135],[398,95],[802,95],[1015,135],[1070,280],[1015,425],[802,465],[398,465],[185,425],[130,280]];const lines=p.map(([x,y])=>`<path d="M600 280L${x} ${y}"/>`).join('');const nodes=names.map((n,i)=>`<g transform="translate(${p[i][0]} ${p[i][1]})" class="mono"><circle r="44" fill="#0B0718" stroke="${colors[i%3]}" stroke-opacity=".58"/><circle r="39" fill="none" stroke="${colors[(i+1)%3]}" stroke-opacity=".16"/><text y="-2" text-anchor="middle" class="ice" font-size="12">${n}</text><text y="17" text-anchor="middle" class="mint" font-size="8">ONLINE</text></g>`).join('');return frame('network','SYSTEM TOPOLOGY','10 CONNECTED NODES',`<g fill="none" stroke="#00F7FF" stroke-opacity=".26">${lines}</g><g transform="translate(600 280)"><circle r="91" fill="#080615" stroke="#FF2BD6" stroke-opacity=".74"/><circle r="65" fill="none" stroke="#00F7FF" stroke-opacity=".62"/><circle r="55" fill="#8B5CF6" fill-opacity=".08"/><text y="-4" text-anchor="middle" class="mono ice" font-size="15">AMIRGH23</text><text y="19" text-anchor="middle" class="mono mint micro">CORE ONLINE</text></g>${nodes}`,560)}

function project({id,name,type,description,tech,status='OPEN'}){return frame(`project-${id.replace(/\W/g,'').toLowerCase()}`,type,id,`<g transform="translate(54 94)" class="sans"><text class="mono mint label">${esc(status)}</text><text y="53" class="ice" font-size="32" font-weight="600">${esc(name)}</text><text y="91" class="soft" font-size="15">${esc(description)}</text><g transform="translate(0 126)" class="mono"><rect width="700" height="42" rx="8" fill="#0B0718" stroke="#00F7FF" stroke-opacity=".42"/><path d="M0 0h145" stroke="#FF2BD6" stroke-width="2"/><text x="16" y="26" class="blue micro">${esc(tech)}</text></g><text y="212" class="mono ice" font-size="12">ACCESS REPOSITORY →</text></g><g transform="translate(1015 181)"><circle r="76" fill="#080615" stroke="#FF2BD6" stroke-opacity=".62"/><circle r="53" fill="none" stroke="#00F7FF" stroke-opacity=".48"/><text y="5" text-anchor="middle" class="mono ice" font-size="15">${esc(id)}</text></g>`,310)}

function footer(){return frame('footer','MER23LIN','CHANNEL REMAINS OPEN',`<g text-anchor="middle" class="sans"><text x="600" y="118" class="ice" font-size="30" font-weight="560">Continue beyond the profile.</text><text x="600" y="157" class="soft" font-size="15">Explore the interactive system, complete repository network and live intelligence core.</text><g transform="translate(466 191)" class="mono"><rect width="268" height="48" rx="9" fill="#8B5CF6" fill-opacity=".12" stroke="#00F7FF" stroke-opacity=".62"/><path d="M0 0h92" stroke="#FF2BD6" stroke-width="2"/><text x="134" y="30" text-anchor="middle" class="blue" font-size="12">ENTER MER23LIN →</text></g><text x="600" y="270" class="faint micro">AMIRGH23 / SYSTEM ONLINE</text></g>`,300)}

function header(number,title,detail){const id=`header-${number}`,shell='M18 0H1168L1200 32V92L1180 112H34L0 78V18Z',badge='M38 24H78L90 36V76L78 88H38L26 76V36Z';return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="112" viewBox="0 0 1200 112" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(number)} ${esc(title)}</title><desc id="${id}-desc">Retro neon section header with cyberpunk cut corners. ${esc(detail)}</desc><defs><clipPath id="${id}-clip"><path d="${shell}"/></clipPath><linearGradient id="${id}-bg" x1="0" x2="1"><stop stop-color="#16082B"/><stop offset=".5" stop-color="#070512"/><stop offset="1" stop-color="#07192A"/></linearGradient><linearGradient id="${id}-line"><stop stop-color="#FF2BD6"/><stop offset=".48" stop-color="#8B5CF6"/><stop offset="1" stop-color="#00F7FF"/></linearGradient><pattern id="${id}-grid" width="32" height="16" patternUnits="userSpaceOnUse"><path d="M32 0H0V16" fill="none" stroke="#00F7FF" stroke-opacity=".08"/></pattern><filter id="${id}-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><style>.sans{font-family:Inter,'Segoe UI',Arial,sans-serif}.mono{font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace}</style></defs><path d="${shell}" fill="url(#${id}-bg)"/><g clip-path="url(#${id}-clip)"><rect x="760" width="440" height="112" fill="url(#${id}-grid)"/></g><path d="${shell}" fill="none" stroke="url(#${id}-line)" stroke-opacity=".72" stroke-width="1.5"/><path d="M18 1h184M1 78l33 33h138M1168 1l31 31v30" fill="none" stroke="#FF2BD6" stroke-width="2"/><path d="${badge}" fill="#8B5CF6" fill-opacity=".16" stroke="#00F7FF" stroke-opacity=".72"/><path d="M38 24h18M90 58v18M78 88H60M26 54V36" fill="none" stroke="#FF2BD6" stroke-width="2"/><text x="58" y="64" text-anchor="middle" class="mono" fill="#00F7FF" font-size="16" filter="url(#${id}-glow)">${esc(number)}</text><text x="119" y="54" class="sans" fill="#FFF7FF" font-size="24" font-weight="600" letter-spacing=".7">${esc(title)}</text><text x="120" y="78" class="mono" fill="#A49FBD" font-size="10" letter-spacing="1.5">${esc(detail)}</text><path d="M720 56H1165" stroke="url(#${id}-line)" stroke-width="1.5"/><circle cx="1165" cy="56" r="4" fill="#FF2BD6" filter="url(#${id}-glow)"/><path d="M1155 46h20v20h-20Z" fill="none" stroke="#00F7FF" stroke-opacity=".42"/></svg>`}


function activity(profile,data){const rows=[['LATEST REPOSITORY',data.latest.name],['PUBLIC REPOSITORIES',data.user.public_repos],['NETWORK',`${data.user.followers} followers · ${data.stars} stars`],['PRIMARY LANGUAGES',data.languages.join(' / ')||'Unclassified'],['LAST PUSH',new Date(data.latest.pushed_at).toISOString().slice(0,16).replace('T',' ')+' UTC']];const body=rows.map(([k,v],i)=>`<g transform="translate(50 ${91+i*66})" class="mono"><rect width="1100" height="50" rx="9" fill="#0B0718" fill-opacity="${i%2?'.8':'1'}" stroke="${colors[i%3]}" stroke-opacity=".18"/><rect width="3" height="50" rx="2" fill="${colors[i%3]}"/><text x="18" y="30" class="faint micro">${esc(k)}</text><text x="1078" y="30" text-anchor="end" class="ice" font-size="13">${esc(v)}</text></g>`).join('');return frame('activity','LIVE SIGNAL','PUBLIC GITHUB DATA',body,455)}

function neural(profile,data){const a=[['CORE SYNC','94%'],['PUBLIC NODES',data.user.public_repos],['VECTOR MEMORY',`${data.user.public_repos} repositories`],['SECURITY',profile.securityStatus],['MODEL ROUTER','Operational']];const body=a.map(([n,v],i)=>{const x=42+(i%3)*372,y=92+Math.floor(i/3)*156;return `<g transform="translate(${x} ${y})" class="mono"><rect width="334" height="126" rx="14" fill="#0B0718" stroke="${colors[i%3]}" stroke-opacity=".34"/><path d="M0 22V0h22" fill="none" stroke="${colors[(i+1)%3]}" stroke-width="2"/><text x="18" y="30" class="faint micro">${esc(n)}</text><text x="18" y="69" class="ice" font-size="17">${esc(v)}</text><circle cx="300" cy="28" r="4" fill="#FF2BD6"/><rect x="18" y="93" width="298" height="3" fill="#241633"/><rect x="18" y="93" width="${205+i*13}" height="3" fill="${colors[i%colors.length]}"/></g>`}).join('');return frame('core','SYSTEM TELEMETRY','LIVE CONFIGURATION',body,425)}

module.exports={hero,identity,skills,network,project,footer,header,activity,neural};
