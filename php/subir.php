?php 
    $carpeta = "../ficheros";
    $nombreOriginal = basename($_FILES["archivo"]["name"]);
    $uploadOk = 1;
    $formatoImagen = strtolower(pathinfo($nombreOriginal, PATHINFO_EXTENSION));
    $nombreUnico = md5(uniqid());
    $nombreFinal = $carpeta . $nombreUnico . "." . $formatoImagen;
    $imagenAMostrar = "ficheros/" . $nombreUnico . "." . $formatoImagen;

    $check = getimagesize($_FILES["fichero"]["tmp_name"]);
    if($check === false) {
        echo "El archivo no es una imagen. Sorry, solamente se pueden subir imagenes.";
        $uploadOk = 0;
    }
?