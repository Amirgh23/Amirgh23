#!/usr/bin/env node
'use strict';
const fs=require('node:fs'); const path=require('node:path'); const d=require('./svg-design'); const root=path.resolve(__dirname,'..','assets','svg');
const files={
  'hero.svg':d.hero(), 'identity.svg':d.identity(), 'skills.svg':d.skills(), 'network.svg':d.network(), 'footer.svg':d.footer(),
  'projects/agent-rag.svg':d.project({id:'NODE R-01',name:'LOCAL RAG CLASSROOM',type:'KNOWLEDGE RETRIEVAL',description:'Dependency-free local retrieval augmented generation.',tech:'PYTHON · RAG · LOCAL AI',accent:'#00F7FF'}),
  'projects/agent-vision.svg':d.project({id:'NODE L-02',name:'PERSIAN GPT-2 QA',type:'LANGUAGE INTELLIGENCE',description:'Persian transformer question-answering experiment.',tech:'PYTHON · TRANSFORMERS · PERSIAN NLP',status:'EXPERIMENTAL',accent:'#FF2BD6'}),
  'projects/agent-code.svg':d.project({id:'NODE A-03',name:'VGAR-PPO',type:'ADAPTIVE POLICY ENGINE',description:'Validation-gated rollout reuse for reinforcement learning.',tech:'PYTORCH · RL · GYMNASIUM',accent:'#8B5CF6'}),
  'projects/agent-security.svg':d.project({id:'NODE O-04',name:'PC-EHOA FEATURE SELECTION',type:'OPTIMIZATION SENTINEL',description:'Reproducible feature selection and ablation research.',tech:'PYTHON · OPTIMIZATION · RESEARCH',status:'MONITORING',accent:'#FF304F'})
};
for(const [file,source] of Object.entries(files)){const target=path.join(root,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,source+'\n');}
console.log(`Generated ${Object.keys(files).length} static SVG assets.`);
