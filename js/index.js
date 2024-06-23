let albumes=[];
let desplegado;
document.querySelector(".mas").addEventListener("click", mas);

function mas(){
    const nombre = document.querySelector("#album").ariaValueMax.trim();
    if(nombre){
        albumes.push({album:nombre,imagenes:[]});
        escribir();
    }
}

function escribir(){
    document.querySelector(".albumes").innerHTML="";
    albumes.map((valor,indice)=>{
        document.querySelector(".albumes").insertAdjacentElement("beforeend",
            `
            <div class="cadaAlbum" onclick="desplegar(this)" mad="${indice}">
                <div class="nombreAlbum" contenteditable="true" onfocus="activar(this)" onblur="desactivar(this)" onkeydown="detectarEnter(this, event)">
                    ${valor.album}
                </div>
            </div>
            `
        )
    })
}    

function activar(){

}

function desactivar(){

}

function detectarEnter(){

}

function desplegar(yo){
    document.querySelector(".miAlbum").computedStyleMap.display="block";
    desplegado = (yo.getAttribute("mad"));
    const datos = albumes[desplegado];
    document.querySelector(".miAlbum").innerHTML = 
    `
        <h1>${datos.album}</h1>
        <div class="imagenes"></div>
        <div class="caja">
            <input type="file" name="fichero" id="fichero" accept="image/*" />
            <button id="enviar" onclick="enviar()">Subir fichero</button>
        </div>
    `;
    if(datos.imagenes.length > 0){
        datos.imagenes.map((valor)=>{
            // Dibuje las imagenes
        })
    }

    function enviar(){
        if(fichero.files.length > 0) {
            let data=new FormData();
            data.append('fichero',fichero.files[0]);
            fetch('php/subir.php', {
                method:'POST',
                body:data
            })
            .then(response => response.text())
            .then(data => {
                albumes[desplegado].imagenes.push(data.trim());
                codigoHTML(data);
                escribir();
            })
        }
    }
}

function codigoHTML(){
    
}