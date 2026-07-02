const portadas = {
    "Ale The Producer": "IMAGENES/ALE_IMAGEN1.jpg",
    "Test": "IMAGENES/TEST_IMAGEN1.jpg"
};

function obtenerPortada(productor){

    return portadas[productor] || "IMAGENES/default.jpg";

};

// Obtiene una portada fija para cada beat
function obtenerPortada(productor, titulo){

    if(!portadas[productor]){
        return "IMAGENES/default.jpg";
    }

    const lista = portadas[productor];

    let suma = 0;

    for(let i = 0; i < titulo.length; i++){
        suma += titulo.charCodeAt(i);
    }

    return lista[suma % lista.length];

}

async function cargarBeats(){

    const contenedor = document.getElementById("beats-container");

    contenedor.innerHTML = "<p>Cargando beats...</p>";

    try{

        const res = await fetch("beats.json");

        if(!res.ok){
            throw new Error("No se pudo cargar beats.json");
        }

        const beats = await res.json();

        contenedor.innerHTML = "";

        if(beats.length === 0){

            contenedor.innerHTML = `
                <div class="no-beats">
                    <h2>No hay beats disponibles.</h2>
                    <p>Agrega archivos a la carpeta BEATS y genera nuevamente el catálogo.</p>
                </div>
            `;

            return;

        }

        beats.forEach(b=>{

            const precio="$25.000 ARS";

            const mensaje=encodeURIComponent(
                `Hola, quiero comprar el beat:\n\n${b.titulo}\n\nProductor: ${b.productor}`
            );

            contenedor.innerHTML += `
            <div class="beat-card premium-beat">

                <div class="cover">

                    <img
                        class="cover-img"
                        src="${obtenerPortada(b.productor)}"
                        alt="${b.productor}">

                </div>

                <div class="beat-info">

                    <h3>${b.titulo}</h3>

                    <span class="producer">${b.productor}</span>

                    <div class="old-price">
                        $35.000
                    </div>

                    <div class="new-price">
                        ${precio}
                    </div>

                    <audio controls controlsList="nodownload">
                        <source src="${b.archivo}">
                    </audio>

                    <a
                        class="buy-btn"
                        target="_blank"
                        href="https://wa.me/5491173678033?text=${mensaje}">

                        🟢 Comprar por WhatsApp

                    </a>

                </div>

            </div>
            `;

        });

        // Preview máximo 30 segundos
        document.querySelectorAll("audio").forEach(audio=>{

            audio.addEventListener("timeupdate",()=>{

                if(audio.currentTime >= 30){

                    audio.pause();

                    audio.currentTime = 0;

                }

            });

            // Solo un beat reproduciéndose
            audio.addEventListener("play",()=>{

                document.querySelectorAll("audio").forEach(a=>{

                    if(a !== audio){

                        a.pause();

                    }

                });

            });

        });

    }

    catch(error){

        console.error(error);

        contenedor.innerHTML = `
            <div class="no-beats">
                <h2>Error</h2>
                <p>No se pudo cargar el catálogo.</p>
            </div>
        `;

    }

}

cargarBeats();