#!/usr/bin/env node
'use strict';
const fs=require('node:fs'); const path=require('node:path'); const d=require('./svg-design'); const root=path.resolve(__dirname,'..','assets','svg');
const heroBase=fs.readFileSync(path.resolve(__dirname,'..','assets','images','mer23lin-hero-base.png')).toString('base64');
const files={
  'hero.svg':d.hero(heroBase), 'identity.svg':d.identity(), 'skills.svg':d.skills(), 'network.svg':d.network(), 'footer.svg':d.footer(),
  'headers/00-operator.svg':d.header('00','OPERATOR PROFILE','IDENTITY / MISSION / SYSTEM CONTEXT'),
  'headers/01-focus.svg':d.header('01','CURRENT OPERATIONAL FOCUS','ACTIVE ENGINEERING PRIORITIES'),
  'headers/02-domains.svg':d.header('02','CORE ENGINEERING DOMAINS','KNOWLEDGE / LEARNING / INFRASTRUCTURE'),
  'headers/03-architecture.svg':d.header('03','INTELLIGENCE ARCHITECTURE','REFERENCE SYSTEM PIPELINE'),
  'headers/04-capabilities.svg':d.header('04','CAPABILITY MATRIX','BALANCED ENGINEERING SIGNALS'),
  'headers/05-directives.svg':d.header('05','ENGINEERING DIRECTIVES','PRINCIPLES FOR PRODUCTION INTELLIGENCE'),
  'headers/06-research.svg':d.header('06','FEATURED RESEARCH NODES','SELECTED PUBLIC REPOSITORIES'),
  'headers/07-applied.svg':d.header('07','APPLIED INTELLIGENCE SYSTEMS','ENTERPRISE AND KNOWLEDGE PLATFORMS'),
  'headers/08-telemetry.svg':d.header('08','LIVE SYSTEM TELEMETRY','PUBLIC SIGNALS / AUTOMATED REFRESH'),
  'headers/09-trajectory.svg':d.header('09','SYSTEM TRAJECTORY','CURRENT RESEARCH DIRECTION'),
  'headers/10-uplink.svg':d.header('10','ESTABLISH UPLINK','NETWORK CHANNELS / EXTERNAL CONTACT'),
  'projects/agent-rag.svg':d.project({id:'NODE R-01',name:'LOCAL RAG CLASSROOM',type:'KNOWLEDGE RETRIEVAL',description:'Dependency-free local retrieval augmented generation.',tech:'PYTHON · RAG · LOCAL AI',accent:'#00F7FF'}),
  'projects/agent-vision.svg':d.project({id:'NODE L-02',name:'PERSIAN GPT-2 QA',type:'LANGUAGE INTELLIGENCE',description:'Persian transformer question-answering experiment.',tech:'PYTHON · TRANSFORMERS · PERSIAN NLP',status:'EXPERIMENTAL',accent:'#FF2BD6'}),
  'projects/agent-code.svg':d.project({id:'NODE A-03',name:'VGAR-PPO',type:'ADAPTIVE POLICY ENGINE',description:'Validation-gated rollout reuse for reinforcement learning.',tech:'PYTORCH · RL · GYMNASIUM',accent:'#8B5CF6'}),
  'projects/agent-security.svg':d.project({id:'NODE O-04',name:'PC-EHOA FEATURE SELECTION',type:'OPTIMIZATION SENTINEL',description:'Reproducible feature selection and ablation research.',tech:'PYTHON · OPTIMIZATION · RESEARCH',status:'MONITORING',accent:'#FF304F'})
};
for(const [file,source] of Object.entries(files)){const target=path.join(root,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source+'\n');}
console.log(`Generated ${Object.keys(files).length} static SVG assets.`);
