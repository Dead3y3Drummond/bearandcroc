(() => {
  const GA_ID='G-VEL8E4HB7E';
  const ecosystemDomains=['bearandcroc.com','heattreatsupply.com','heattreat.tech','hotzoneshop.com'];
  const firstTouchKey='bc_first_touch_v1';
  const latestTouchKey='bc_latest_touch_v1';

  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('set','linker',{domains:ecosystemDomains});
  window.gtag('config',GA_ID);
  const gaScript=document.createElement('script');
  gaScript.async=true;
  gaScript.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);
  document.head.appendChild(gaScript);

  const safeUrl=value=>{
    try{return value?new URL(value,location.href).toString():''}catch{return ''}
  };
  const usefulReferrer=value=>{
    try{
      if(!value)return '';
      const u=new URL(value);
      return u.hostname===location.hostname?'':u.toString();
    }catch{return ''}
  };
  const touch=()=>{
    const q=new URLSearchParams(location.search);
    const ref=usefulReferrer(document.referrer);
    const source=q.get('utm_source')||q.get('source')||(ref?new URL(ref).hostname:'direct');
    const medium=q.get('utm_medium')||(ref?'referral':'none');
    return {
      source,
      medium,
      campaign:q.get('utm_campaign')||'',
      content:q.get('utm_content')||'',
      term:q.get('utm_term')||'',
      referrer:ref,
      landingPage:safeUrl(location.href),
      capturedAt:new Date().toISOString()
    };
  };
  const readStored=key=>{
    try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}
  };
  const writeStored=(key,value)=>{
    try{localStorage.setItem(key,JSON.stringify(value))}catch{}
  };
  const currentTouch=touch();
  if(!readStored(firstTouchKey))writeStored(firstTouchKey,currentTouch);
  if(currentTouch.source!=='direct'||currentTouch.campaign||currentTouch.referrer)writeStored(latestTouchKey,currentTouch);
  if(!readStored(latestTouchKey))writeStored(latestTouchKey,currentTouch);

  const attribution=()=>{
    const first=readStored(firstTouchKey)||currentTouch;
    const latest=readStored(latestTouchKey)||currentTouch;
    return {
      firstSource:first.source||'',
      firstMedium:first.medium||'',
      firstCampaign:first.campaign||'',
      firstReferrer:first.referrer||'',
      firstLandingPage:first.landingPage||'',
      latestSource:latest.source||'',
      latestMedium:latest.medium||'',
      latestCampaign:latest.campaign||'',
      latestReferrer:latest.referrer||'',
      submissionPage:safeUrl(location.href)
    };
  };
  const leadId=()=>crypto.randomUUID?crypto.randomUUID():'bc-'+Date.now()+'-'+Math.random().toString(36).slice(2,10);
  const track=(name,params={})=>{
    try{window.gtag('event',name,params)}catch{}
  };
  const trackOnce=(el,event,name,params={})=>{
    if(!el)return;
    let fired=false;
    el.addEventListener(event,()=>{
      if(fired)return;
      fired=true;
      track(name,params);
    },{passive:true});
  };

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

  trackOnce(form,'change','health_check_start',{form_name:'equipment_health_check'});
  form.addEventListener('submit',e=>{
    e.preventDefault(); if(!form.reportValidity())return;
    const d=collect(), p=prof(d.score); risk.textContent=p[0];headline.textContent=p[1];copy.textContent=p[2];
    notes.innerHTML='<p class="mini">WHAT STANDS OUT</p><ul>'+standouts(d).map(x=>'<li>'+x+'</li>').join('')+'</ul>';
    result.hidden=false; result.dataset.assessment=JSON.stringify(d); result.scrollIntoView({behavior:'smooth',block:'start'});
    track('health_check_complete',{form_name:'equipment_health_check',continuity_profile:p[0]});
  });

  document.getElementById('email-assessment').addEventListener('click',async()=>{
    if(!result.dataset.assessment)return;
    const button=document.getElementById('email-assessment');
    const status=document.getElementById('send-status');
    const d=JSON.parse(result.dataset.assessment), p=prof(d.score);
    const id=leadId();
    const payload={
      kind:'assessment',
      leadId:id,
      attribution:attribution(),
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
      track('generate_lead',{lead_type:'equipment_health_check',lead_id:id});
    }catch(err){
      button.disabled=false;
      button.textContent='Send My Assessment';
      status.textContent='Could not send right now. Please try again in a moment.';
    }
  });

  const contactForm=document.getElementById('contact-form');
  trackOnce(contactForm,'focusin','contact_form_start',{form_name:'website_contact'});
  contactForm.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!contactForm.reportValidity())return;
    const button=document.getElementById('contact-submit');
    const status=document.getElementById('contact-status');
    const fd=new FormData(contactForm);
    const id=leadId();
    const payload={
      kind:'contact',
      leadId:id,
      attribution:attribution(),
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
      track('generate_lead',{lead_type:'website_contact',lead_id:id});
    }catch(err){
      button.disabled=false;
      button.textContent='Send to Bear & Croc';
      status.textContent='Could not send right now. Please try again in a moment.';
    }
  });
})();
