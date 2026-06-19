
async function cargarBeats(){
 const res=await fetch('beats.json');
 const beats=await res.json();
 const c=document.getElementById('beats-container');
 if(!c)return;
 c.innerHTML='';
 beats.forEach(b=>{
  const d=document.createElement('div');
  d.className='beat-card';
  d.innerHTML=`<div class="beat-info"><h3>${b.titulo}</h3><p>👤 ${b.productor}</p><audio controls><source src="${b.archivo}"></audio></div>`;
  c.appendChild(d);
 });
}
cargarBeats().catch(console.error);
