
document.addEventListener("DOMContentLoaded",()=>{
const fecha=document.getElementById("fecha");
if(fecha){fecha.min=new Date().toISOString().split("T")[0];}
const btn=document.getElementById("reservarBtn");
if(btn){
btn.addEventListener("click",()=>{
const nombre=document.getElementById("nombre").value;
const telefono=document.getElementById("telefono").value;
const servicio=document.getElementById("servicio").value;
const fecha=document.getElementById("fecha").value;
const hora=document.getElementById("hora").value;
if(!nombre||!telefono||!fecha||!hora){alert("Completa todos los campos");return;}
const msg=`🎵 NUEVA RESERVA SONIDO CARO

Cliente: ${nombre}
Teléfono: ${telefono}

Servicio: ${servicio}
Fecha: ${fecha}
Hora: ${hora}`;
window.open(`https://wa.me/5491173678033?text=${encodeURIComponent(msg)}`,"_blank");
});
}
});
