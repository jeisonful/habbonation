<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- custom css file link -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="css/skins.css">
    <link rel="stylesheet" href="css/discord.css">
    <link rel="icon" type="image/jpg" href="images/favicon.ico"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

   
</head>
<body class="hold-transition sidebar-mini">


<div class="origins_topsection">
            <div class="origins_topsection_wrapper">
                <div class="navigation">
                    <span class="nav_buttons">
                        <a class="index-btn" href="/"><img src="images/icon_225.png" alt="Inicio Icon"><span> Inicio</span></a>
                        <a class="news-btn" href="?section=news"><img src="images/icon_42.png" alt="Noticias Icon"><span> Noticias</span></a>
                        <a class="values-btn" href="?section=values"><img src="images/icon_70.png" alt="Precios Icon"><span> Furni</span></a>
                        <a class="login-btn" href="?section=admin"><img src="images/icon_64.png" alt="Admin Icon"><span> Inicia sesión</span></a>
                    </span>
                </div>
            </div>
        </div>

    <header>
            <img class="header_logo" src="images/web_view_bg_es.gif" alt="Habbos Logo">
            <img class="logo-web" src="images/habbonation.gif" alt="Logo"><br>
            <img class="logo_down" src="images/habbohoteloriginsfansite.gif" alt="Logo2">
        
            
        </header>
        

        
    

    <!-- Site wrapper -->
    <div class="container">
    
    <?php
// index.php

// Determinar qué sección cargar
$section = isset($_GET['section']) ? $_GET['section'] : 'inicio'; // Por defecto carga inicio.php si no hay sección especificada
$articleId = isset($_GET['article']) ? $_GET['article'] : null;

// Contenido dinámico según la sección
echo '<div class="content-wrapper">';

if ($articleId) {
    include "vistas/modulos/article.php";
} else {
    switch ($section) {

        case 'admin':
            include "vistas/modulos/login.php";
            break;
        case 'inicio':
            include "vistas/modulos/inicio.php";
            break;
        case 'news':
            include "vistas/modulos/news.php";
            break;
        case 'values':
            include "vistas/modulos/values.php";
            break;
            case 'create-news':
                include "vistas/modulos/create-news.php";
                break;
        default:
            include "vistas/modulos/inicio.php"; // Por defecto carga inicio.php si la sección no es reconocida
            break;
    }
}

echo '</div>'; // Cerrar el div content-wrapper

?>      
    </div>
    <footer>
        <div class="copyright">
        <span class="copy">&copy; 2024, HabboNation | Supported by: <b class="linktomytwitter"><a href="https://x.com/JavierHabboES">Javier</a></b> <img src="images/spain.png" alt="spain"></span>
        <br>
            <span class="disclaimer">
            Habbnation.net no está afiliado, respaldado, patrocinado ni específicamente aprobado por Sulake Oy o sus afiliados.
            <br>Habbnation.net puede usar las marcas registradas y otros derechos de propiedad intelectual de Habbo, lo cual está permitido bajo la Política de Fansite Habbo.
            </span>
        </div>
    </footer>

    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
