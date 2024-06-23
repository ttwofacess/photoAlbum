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

    if($_FILES["fichero"]["size"]>10000000) {
        echo "Sorry, tu archivo es demasiado grande. El maximo permitido es de 9.5MB.";
        $uploadOk = 0;
    }

    if($uploadOk === 1) {
        if(move_uploaded_file($_FILES["fichero"]["tmp_name"], $nombreFinal)) {
            echo $imagenAMostrar;
        } else {
            echo "Sorry, hubo un error al subir tu archivo.";
        }
    }
?

