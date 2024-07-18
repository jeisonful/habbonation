

<head>
    <title>HabboNation: Precios</title>
    <script type="module" src="js/furniture.js"></script> 
    <link rel="stylesheet" href="css/catalog.css">
    
</head>

        

        

        <!-- Modal form para agregar item -->
<div id="addItemModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Agregar Furni</h2>
        <input type="text" id="itemTitle" name="itemTitle" placeholder="Nombre del furni">
        <br>
        <input type="text" id="itemDesc" name="itemDesc" placeholder="Descripción del furni">
        <br>
        <input type="text" id="itemPrice" name="itemPrice"placeholder="Precio del mercado">
        <br>
        <input type="text" id="itemImageURL" name="itemImageURL"placeholder="Imagen pequeña del furni">
        <br>
        <input type="text" id="imageBig" name="imageBig" placeholder="Imagen normal del furni">
        <br>
        <select id="itemCategory" name="itemCategory" placeholder="Categoría Raros/HC">
            <option value="rare">Raros</option>
            <option value="super">Super Raros</option>
            <option value="funky">Funky Friday</option>
            <option value="hc">HC</option>
        </select>
        
        <button id="submitItemButton">Agregar</button>
    </div>
</div>

<div style="display:flex;justify-content:center">
<div class="catalog-container">

<div class="box-catalog">
    <div class="box-catalog-container">
            <div class="logo_cat">
                <img src="https://static.habtium.com/logo_furni_origins.gif" style="max-width:100%;">
            </div>
            <div style="display:flex;justify-content:center">
                <div class="text-volter">
                <span id="warning">
            
            <svg aria-hidden="true" id="icon-alert" class="e-font-icon-svg e-fas-exclamation-triangle" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
            
    
            Aviso: La información aquí recopilada proviene de miembros de la comunidad 
                y se ofrece como una referencia útil. No constituye precios oficiales. Le recomendamos usar 
                su propio criterio al realizar intercambios, ya que los precios pueden fluctuar diariamente 
                según las transacciones observadas públicamente.</span> </div>
            </div>

            <div class="items">

            <div class="box-container" id="box-container">
            <!-- Las cajas se agregarán aquí dinámicamente -->
        </div>

        <div class="item-info" id="item-info">
            <!-- Las info se cargará aquí dinámicamente -->
        </div>

            </div>


    
        </div>

    </div>
    <div class="box-list">
    <div class="options-items">
        <button id="cat-all">Catálogo</button>
            <button id="cat-raros">Raros</button>
            <button id="cat-super">Super Raros</button>
            <button id="cat-funky">Funky Friday</button>
            <button id="cat-hc">Habbo Club</button>
            
        <input type="text" id="searchInput" placeholder="Buscar furni...">
        <button id="addItemButton" style="display:none;">Añadir</button>
        </div>
</div>
    

</div>




</div>



    
        

