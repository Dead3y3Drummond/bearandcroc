(() => {
  const form=document.getElementById('health-form'), result=document.getElementById('result');
  const risk=document.getElementById('risk'), headline=document.getElementById('headline'), copy=document.getElementById('copy'), notes=document.getElementById('notes');
  const one=n=>form.querySelector(`[name="${n}"]:checked`);
  const many=n=>[...form.querySelectorAll(`[name="${n}"]:checked`)];
  const prof=s=>s<=7?['LOW CONTINUITY RISK','Your operation appears structurally healthy.','Your equipment history, maintenance response and internal knowledge appear relatively stable. The opportunity is to preserve what is working before key people, systems or vendors change.']:
    s<=15?['MODERATE CONTINUITY RISK','Your operation shows moderate continuity risk.','Your equipment itself may be serviceable, but maintenance history, vendor coordination or institutional knowledge appear vulnerable. These are the gaps that turn ordinary maintenance into repeated troubleshooting and avoidable delay.']:
    s<=23?['HIGH CONTINUITY RISK','Your maintenance system is carrying significant continuity risk.','Several parts of the operation appear dependent on tribal knowledge, reactive maintenance or fragmented coordination. The immediate goal should be to identify critical assets, preserve their history and establish clear priorities and ownership.']:
    ['CRITICAL CONTINUITY RISK','Your operation is vulnerable to repeated failures, lost knowledge and reactive decision-making.','This profile suggests the plant may be relying heavily on specific people, improvised history and firefighting. A structured equipment record and active maintenance operating rhythm could materially reduce risk.'];

  async function sendPayload(payload){
    const response=await fetch('submit-assessment.php',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok || !data.ok) throw new Error(data.error||'Unable to send.');
    return data;
  }

  function collect(){
    const names=['furnaces','condition','age','history','downtime','nextmove','vendors','knowledge']; let score=0, d={};
    names.forEach(n=>{const e=one(n);d[n]=e?e.value:'';if(e)score+=Number(e.dataset.score||0)});
    d.trouble=many('trouble').map(e=>e.value); score+=Math.min(d.trouble.length,5); d.score=score; return d;
  }
  function standouts(d){
    const a=[];
    if(['Poorly',"It lives in people's heads"].includes(d.history))a.push('Maintenance history is vulnerable.');
    if(['Depends who is there','We scramble'].includes(d.nextmove))a.push('Response depends too much on who is present.');
    if(['A lot','We would be in trouble'].includes(d.knowledge))a.push('Critical equipment knowledge is concentrated in people rather than systems.');
    if(['Weekly','Constantly'].includes(d.downtime))a.push('Production interruption is frequent enough to justify active prioritization.');
    if(d.vendors==='Too many to keep straight')a.push('Vendor and project coordination is becoming a maintenance problem.');
    if(d.trouble.includes('Obsolescence'))a.push('Obsolescence should be treated as a planning issue, not only a repair issue.');
    return (a.length?a:['The main opportunity may be preserving good maintenance habits and equipment history before they become fragile.']).slice(0,4);
  }
  form.addEventListener('submit',e=>{
    e.preventDefault(); if(!form.reportValidity())return;
    const d=collect(), p=prof(d.score); risk.textContent=p[0];headline.textContent=p[1];copy.textContent=p[2];
    notes.innerHTML='<p class="mini">WHAT STANDS OUT</p><ul>'+standouts(d).map(x=>'<li>'+x+'</li>').join('')+'</ul>';
    result.hidden=false; result.dataset.assessment=JSON.stringify(d); result.scrollIntoView({behavior:'smooth',block:'start'});
  });

  document.getElementById('email-assessment').addEventListener('click',async()=>{
    if(!result.dataset.assessment)return;
    const button=document.getElementById('email-assessment');
    const status=document.getElementById('send-status');
    const d=JSON.parse(result.dataset.assessment), p=prof(d.score);
    const payload={
      kind:'assessment',
      assessment:d,
      profile:p[0],
      name:document.getElementById('lead-name').value.trim(),
      company:document.getElementById('lead-company').value.trim(),
      email:document.getElementById('lead-email').value.trim(),
      phone:document.getElementById('lead-phone').value.trim()
    };
    if(!payload.name || !payload.email){
      status.textContent='Please add your name and email.';
      return;
    }
    button.disabled=true;
    button.textContent='Sending…';
    status.textContent='';
    try{
      await sendPayload(payload);
      button.textContent='Assessment Sent';
      status.textContent='Thank you. Bear & Croc has received your assessment.';
    }catch(err){
      button.disabled=false;
      button.textContent='Send My Assessment';
      status.textContent='Could not send right now. Please try again in a moment.';
    }
  });

  const contactForm=document.getElementById('contact-form');
  contactForm.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!contactForm.reportValidity())return;
    const button=document.getElementById('contact-submit');
    const status=document.getElementById('contact-status');
    const fd=new FormData(contactForm);
    const payload={
      kind:'contact',
      website:String(fd.get('website')||''),
      name:String(fd.get('name')||'').trim(),
      email:String(fd.get('email')||'').trim(),
      company:String(fd.get('company')||'').trim(),
      phone:String(fd.get('phone')||'').trim(),
      message:String(fd.get('message')||'').trim()
    };
    button.disabled=true;
    button.textContent='Sending…';
    status.textContent='';
    try{
      await sendPayload(payload);
      button.textContent='Message Sent';
      status.textContent='Got it. Bear & Croc has your message.';
      contactForm.querySelectorAll('input:not([name="website"]), textarea').forEach(el=>el.disabled=true);
    }catch(err){
      button.disabled=false;
      button.textContent='Send to Bear & Croc';
      status.textContent='Could not send right now. Please try again in a moment.';
    }
  });
})();
