<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Noticia</title>
    <link rel="stylesheet" href="css/create-news.css"> <!-- Asegúrate de tener tu archivo CSS -->
    <!-- Scripts -->
    <script type="module" src="js/create-news.js"></script>
</head>
<body>
    <div id="create-news-container">
        <h2>Crear Noticia</h2>
        <form id="create-news-form">
            <input type="text" id="title" name="title" placeholder="Título de la noticia aquí." required>

            <br><br>
            
            <input type="text" id="textIntro" name="textIntro" minlength="50" placeholder="Texto de la portada aquí." required></textarea>
            <br><br>
            <input type="text" id="imgIcon" name="imgIcon"placeholder="Link imagen de la portada aquí." required>
            <br><br>
            
            <input type="date" id="date" name="date" required>
            <br>
            <textarea id="body" name="body" placeholder="Cuerpo de la noticia aquí."required></textarea>
           
            <br><br>
            <button type="button" id="submit">Guardar</button>
        </form>
    </div>
</body>
</html>
