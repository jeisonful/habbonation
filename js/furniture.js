// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAldNScIrt21pLLf6Q4-y1mN88--bYhYCY",
    authDomain: "habbos-68e47.firebaseapp.com",
    databaseURL: "https://habbos-68e47-default-rtdb.firebaseio.com",
    projectId: "habbos-68e47",
    storageBucket: "habbos-68e47.appspot.com",
    messagingSenderId: "617135519302",
    appId: "1:617135519302:web:ccd6d60f01220fc0923c47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Reference to the "furniture" node in your Firebase database
const boxesRef = ref(database, 'furniture');

// Function to create a box element
function createBox(data, key, isAuthenticated) {
    const boxContainer = document.getElementById('box-container');

    const box = document.createElement('div');
    box.className = 'box';

    const img = document.createElement('img');
    img.className = 'imageItem';
    img.src = data.imageURL;
    img.alt = '';

    box.appendChild(img);

    // Add click event to display item info
    box.addEventListener('click', () => {
        console.log('Box clicked:', data); // Debugging line
        showItemInfo(data, key, isAuthenticated);
    });

    boxContainer.appendChild(box);
}

// Function to show item info in the item-info div
function showItemInfo(data, key, isAuthenticated) {
    const itemInfoContainer = document.getElementById('item-info');
    itemInfoContainer.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'imageItem';
    img.src = data.imageBig;
    img.alt = '';

    const img2 = document.createElement('img');
    img2.className = 'imagePrice';
    img2.src = 'images/small_club_sofa_0.png';

    const br = document.createElement('br');

    const h6 = document.createElement('b');
    h6.className = 'titleItem';
    h6.textContent = data.title;

    const pDesc = document.createElement('p');
    pDesc.className = 'itemDesc';
    pDesc.textContent = data.itemDesc;

    const priceContainer = document.createElement('div');
    priceContainer.className = 'priceContainer';

    const price = document.createElement('p');
    price.className = 'priceItem';
    price.textContent = `${data.price}`;

    priceContainer.appendChild(price);
    price.appendChild(img2);

    if (isAuthenticated) {
        const editButton = document.createElement('button');
        editButton.className = 'editButton';
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editButton.appendChild(editIcon);

        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent info display on edit button click
            const newPrice = prompt('Introduce el nuevo precio:', data.price);
            if (newPrice !== null) {
                const updates = {};
                updates[`/furniture/${key}/price`] = newPrice;
                update(ref(database), updates)
                    .then(() => {
                        Swal.fire({
                            toast: true,
                            icon: "success",
                            position: 'center',
                            title: "¡Precio actualizado con éxito!",
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1500
                        });
                        price.textContent = newPrice;
                    })
                    .catch((error) => {
                        Swal.fire({
                            toast: true,
                            icon: "error",
                            position: 'center',
                            title: 'Error al actualizar el precio: ' + error.message,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1500
                        });
                    });
            }
        });

        priceContainer.appendChild(editButton);
    }

    itemInfoContainer.appendChild(img);
    itemInfoContainer.appendChild(br);
    itemInfoContainer.appendChild(h6);
    itemInfoContainer.appendChild(pDesc);
    itemInfoContainer.appendChild(priceContainer);
}

// Function to display boxes based on search term
function displayBoxes(data, isAuthenticated, searchTerm = '') {
    const boxContainer = document.getElementById('box-container');
    boxContainer.innerHTML = ''; // Clear existing boxes

    const keys = Object.keys(data);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const item = data[key];
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            createBox(item, key, isAuthenticated);
        }
    }
}

// Function to filter and display boxes by category
function filterAndDisplayByCategory(data, isAuthenticated, category) {
    const filteredData = {};

    // Filter data based on category
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            if (item.category === category) {
                filteredData[key] = item;
            }
        }
    }

    displayBoxes(filteredData, isAuthenticated);
}

// Function to add an item to the database
function addItem(title, price, imageURL, category, itemDesc, imageBig) {
    const user = auth.currentUser;
    if (!user) {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Debes iniciar sesión con administrador.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
        });
        return;
    }

    const newItemRef = push(ref(database, 'furniture'));
    set(newItemRef, {
        title: title,
        price: price,
        imageURL: imageURL,
        category: category,
        itemDesc: itemDesc,
        imageBig: imageBig,
        createdBy: user.uid
    }).then(() => {
        Swal.fire({
            toast: true,
            icon: "success",
            position: 'center',
            title: "¡Furni agregado con éxito!",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
        });
        document.getElementById("itemTitle").value = '';
        document.getElementById("itemPrice").value = '';
        document.getElementById("itemImageURL").value = '';
        document.getElementById('imageBig').value = '';
        document.getElementById('itemDesc').value = '';
        document.getElementById("addItemModal").style.display = "none"; // Close modal after saving
    }).catch((error) => {
        Swal.fire({
            toast: true,
            icon: "error",
            position: 'center',
            title: "Hubo un error al agregar el furni",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500
        });
    });
}

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
    const isAuthenticated = !!user;

    const addItemButton = document.getElementById('addItemButton');
    if (isAuthenticated) {
        addItemButton.style.display = 'inline-block';
    } else {
        addItemButton.style.display = 'none';
    }

    onValue(boxesRef, (snapshot) => {
        const data = snapshot.val();
        displayBoxes(data, isAuthenticated);

        // Add search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            displayBoxes(data, isAuthenticated, searchTerm);
        });
    });

    // Event listeners for category buttons
    document.getElementById('cat-all').addEventListener('click', () => {
        onValue(boxesRef, (snapshot) => {
            const data = snapshot.val();
            displayBoxes(data, isAuthenticated);
        });
    });

    document.getElementById('cat-raros').addEventListener('click', () => {
        onValue(boxesRef, (snapshot) => {
            const data = snapshot.val();
            filterAndDisplayByCategory(data, isAuthenticated, 'rare');
        });
    });
    document.getElementById('cat-super').addEventListener('click', () => {
        onValue(boxesRef, (snapshot) => {
            const data = snapshot.val();
            filterAndDisplayByCategory(data, isAuthenticated, 'super');
        });
    });
    document.getElementById('cat-funky').addEventListener('click', () => {
        onValue(boxesRef, (snapshot) => {
            const data = snapshot.val();
            filterAndDisplayByCategory(data, isAuthenticated, 'funky');
        });
    });

    document.getElementById('cat-hc').addEventListener('click', () => {
        onValue(boxesRef, (snapshot) => {
            const data = snapshot.val();
            filterAndDisplayByCategory(data, isAuthenticated, 'hc');
        });
    });

    const modal = document.getElementById("addItemModal");
    const span = document.getElementsByClassName("close")[0];

    addItemButton.addEventListener('click', () => {
        modal.style.display = "block";
        document.getElementById("itemTitle").value = '';
        document.getElementById("itemPrice").value = '';
        document.getElementById("itemImageURL").value = '';
        document.getElementById('imageBig').value = '';
        document.getElementById('itemDesc').value = '';

    });

    span.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById('submitItemButton').addEventListener('click', () => {
        const title = document.getElementById('itemTitle').value;
        const price = document.getElementById('itemPrice').value;
        const imageURL = document.getElementById('itemImageURL').value;
        const itemDesc = document.getElementById('itemDesc').value;
        const imageBig = document.getElementById('imageBig').value;
        const category = document.getElementById('itemCategory').value;

        if (title && price && imageURL && category && itemDesc && imageBig) {
            addItem(title, price, imageURL, category, itemDesc, imageBig);
        } else {
            Swal.fire({
                toast: true,
                icon: "error",
                position: 'center',
                title: "Todos los campos son obligatorios",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
            });
        }
    });
});
