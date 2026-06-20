async function cargarBeats(){
 const res=await fetch('beats.json');
 const beats=await res.json();
 const c=document.getElementById('beats-container');
 if(!c)return;
 c.innerHTML='';
 const locale=navigator.language||'es-AR';
 beats.forEach(b=>{
  let precio='$25.000 ARS';
  if(locale.includes('en')) precio='$25 USD';
  if(locale.toLowerCase().includes('co')) precio='$100.000 COP';
  const msg=encodeURIComponent(`Hola, quiero comprar este beat:%0A🎵 ${b.titulo}%0A👤 ${b.productor}%0A💰 ${precio}`);
  const d=document.createElement('div');
  d.className='beat-card premium-card';
  d.innerHTML=`<div class="beat-info">
  <h3>${b.titulo}</h3>
  <p>👤 ${b.productor}</p>
  <div class="price">${precio}</div>
  <audio controls controlsList="nodownload">
  <source src="${b.archivo}">
  </audio>
  <a class="buy-btn" target="_blank" href="https://wa.me/5491173678033?text=${msg}">COMPRAR POR WHATSAPP</a>
  </div>`;
  c.appendChild(d);
 });
}
cargarBeats().catch(console.error);