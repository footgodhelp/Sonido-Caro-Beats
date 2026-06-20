
async function cargarBeats(){
 const res=await fetch('beats.json');
 const beats=await res.json();
 const c=document.getElementById('beats-container');
 c.innerHTML='';
 beats.forEach(b=>{
 let precio='$25.000 ARS';
 const msg=encodeURIComponent(`Hola, quiero comprar el beat: ${b.titulo} - ${b.productor}`);
 c.innerHTML += `
 <div class="beat-card premium-beat">
   <div class="cover">${b.productor==='Test'?'TEST':'ATP'}</div>
   <div class="beat-info">
    <h3>${b.titulo}</h3>
    <span>${b.productor}</span>
    <div class="old-price">$35.000</div>
    <div class="new-price">${precio}</div>
    <audio controls controlsList="nodownload">
      <source src="${b.archivo}">
    </audio>
    <a class="buy-btn" target="_blank" href="https://wa.me/5491173678033?text=${msg}">🟢 Comprar por WhatsApp</a>
   </div>
 </div>`;
 });
 document.querySelectorAll('audio').forEach(a=>{
   a.addEventListener('timeupdate',()=>{if(a.currentTime>30){a.pause();a.currentTime=0;}});
 });
}
cargarBeats();
