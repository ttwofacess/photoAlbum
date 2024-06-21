let albumes=[];
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