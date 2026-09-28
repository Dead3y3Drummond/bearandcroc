(() => {
  const GA_ID='G-VEL8E4HB7E';
  const ecosystemDomains=['bearandcroc.com','heattreatsupply.com','heattreat.tech','hotzoneshop.com'];
  const consentKey='heat_treat_analytics_consent_v1';
  const firstTouchKey='bc_first_touch_v1';
  const latestTouchKey='bc_latest_touch_v1';
  const embedded=new URLSearchParams(location.search).get('embed')==='1';

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
  const readConsent=()=>{
    try{return localStorage.getItem(consentKey)||''}catch{return ''}
  };
  const writeConsent=value=>{
    try{localStorage.setItem(consentKey,value)}catch{}
  };
  const currentTouch=touch();

  function rememberAttribution(){
    if(readConsent()!=='granted')return;
    if(!readStored(firstTouchKey))writeStored(firstTouchKey,currentTouch);
    if(currentTouch.source!=='direct'||currentTouch.campaign||currentTouch.referrer)writeStored(latestTouchKey,currentTouch);
    if(!readStored(latestTouchKey))writeStored(latestTouchKey,currentTouch);
  }

  function loadAnalytics(){
    if(embedded||readConsent()!=='granted'||window.__heatTreatGaLoaded)return;
    window.__heatTreatGaLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('consent','update',{analytics_storage:'granted'});
    window.gtag('set','linker',{domains:ecosystemDomains});
    window.gtag('config',GA_ID);
    const gaScript=document.createElement('script');
    gaScript.async=true;
    gaScript.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);
    document.head.appendChild(gaScript);
  }

  function showConsentPrompt(){
    if(readConsent())return;
    const bar=document.createElement('div');
    bar.id='consent';
    bar.setAttribute('role','dialog');
    bar.setAttribute('aria-label','Analytics preferences');
    bar.style.cssText='position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;max-width:760px;margin:0 auto;padding:12px 14px;background:rgba(24,24,24,.97);color:#f4f1ea;border:1px solid rgba(255,255,255,.14);border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.28);font:13px/1.4 Arial,Helvetica,sans-serif;';
    const copy=document.createElement('span');
    copy.textContent='We use analytics to understand which pages and content are useful. Forms work either way.';
    const actions=document.createElement('span');
    actions.style.cssText='display:flex;gap:8px;flex:0 0 auto;';
    const decline=document.createElement('button');
    decline.type='button';
    decline.textContent='No thanks';
    decline.style.cssText='padding:7px 10px;border:1px solid #777;border-radius:6px;background:transparent;color:#fff;cursor:pointer;';
    const allow=document.createElement('button');
    allow.type='button';
    allow.textContent='Allow analytics';
    allow.style.cssText='padding:7px 10px;border:1px solid #d56a2e;border-radius:6px;background:#d56a2e;color:#fff;cursor:pointer;font-weight:700;';
    actions.append(decline,allow);
    bar.append(copy,actions);
    document.body.appendChild(bar);
    decline.addEventListener('click',()=>{writeConsent('denied');bar.remove()});
    allow.addEventListener('click',()=>{writeConsent('granted');rememberAttribution();loadAnalytics();bar.remove()});
  }

  if(readConsent()==='granted'){
    rememberAttribution();
    loadAnalytics();
  }else if(!readConsent()&&!embedded){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showConsentPrompt,{once:true});
    else showConsentPrompt();
  }

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
    if(embedded){
      if(name==='generate_lead')parent.postMessage({type:'bc-help-lead',leadId:params.lead_id},location.origin);
      return;
    }
    if(readConsent()!=='granted'||!window.gtag)return;
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

  window.bcHelpAnalytics={attribution,leadId,track};
})();
