let albumes=[];
let desplegado;
document.querySelector(".mas").addEventListener("click", mas);
document.querySelector(".ampliacion").addEventListener("click", cerrar);
cargarTodos();

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
                <img src="img/papelera.png" onclick="eliminarAlbum(this, event)">
                <div class="numeroImagenes">${valor.imagenes.length} fotos</div>
            </div>
            `
        )
    })
    insertar();
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
            codigoHTML(valor);
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

function codigoHTML(dato){
    document.querySelector(".imagenes").insertAdjacentElement("beforeend",
        `
        <div class="imagen">
            onmouseover = "mostrar(this)"
            onmouseout = "mostrar(this)"
            onclick = "ampliar('${dato}')" alt="" />
            <img src="${dato}" alt="" />
            <img class="papelera" src="img/papelera.png" onclick="eliminarImagen(this,'${dato}', event)" />
        </div>
        `
    )
}

function mostrar(yo){
    if(yo.querySelector(".papelera").style.display === "block"){
        yo.querySelector(".papelera").style.display = "none";
    } else {
        yo.querySelector(".papelera").style.display = "block";
    }    
}

function ampliar(miImagen){
    document.querySelector(".ampliacion").style.display="block";
    document.querySelector(".imagenGrande").innerHTML=`<img src="${miImagen}"/>`;
}

function cerrar(){
    this.style.display="none";
}

function eliminarImagen(yo, miImagen, e){
    e.stopPropagation();
    yo.parentNode.remove();
    const indice = encontrar(yo);
    albumes[desplegado],imagenes.splice(indice, 1);
    fetch('php/borrarFichero.php', {
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body: `ficheroABorrar=${encodeURIComponent(miImagen)}`,
    })
    .then(response => response.text())
    .then(data => console.log(data));
    escribir();
}

function encontrar(yo) {
    const hijos = yo.parentNode.children;
    for(let k = 0; k< hijos.length; k++) {
        if(yo.parentNode === hijos[k]) {
            return k;
        }
    }
}

function insertar() {
    fetch('php/insertar.php',{
        method: 'POST',
        headers: {
            'Content-Type':'application/jason'
        },
        body: JSON.stringify({
            aGuardar:albumes
        })
    })
}

function cargarTodos() {
    document.querySelector(".albumes").innerHTML="";
    fetch("php/cargarTodos.php")
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        albumes=JSON.parse(data)
        escribir();
    })
}