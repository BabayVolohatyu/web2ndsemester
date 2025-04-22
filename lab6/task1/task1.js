const productList = document.getElementById('product-list');
const emptyMessage = document.getElementById('empty-message');
const addBtn = document.getElementById('add-product-btn');
const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const form = document.getElementById('product-form');
const totalPriceEl = document.getElementById('total-price');

let products = [];

function renderProducts() {
    productList.innerHTML = '';
    if (products.length === 0) {
        productList.classList.add('empty');
        emptyMessage.style.display = 'block';
    } else {
        productList.classList.remove('empty');
        emptyMessage.style.display = 'none';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <p>ID: ${product.id}</p>
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
                <img src="${product.image}" alt="${product.name}">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            card.querySelector('.delete-btn').onclick = () => deleteProduct(product.id);
            card.querySelector('.edit-btn').onclick = () => openEditModal(product);
            productList.appendChild(card);
        });
    }

    updateTotalPrice();
}

function updateTotalPrice() {
    const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
    totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
    showToast('Product deleted successfully.');
}

function openAddModal() {
    form.reset();
    form['product-id'].value = '';
    modal.classList.remove('hidden');
}

function openEditModal(product) {
    form['product-id'].value = product.id;
    form['product-name'].value = product.name;
    form['product-price'].value = product.price;
    form['product-category'].value = product.category;
    modal.classList.remove('hidden');
}

form.onsubmit = (e) => {
    e.preventDefault();
    const id = form['product-id'].value || Date.now().toString();
    const name = form['product-name'].value;
    const price = form['product-price'].value;
    const category = form['product-category'].value;
    const fileInput = form['product-image'];

    readImageFromFile(fileInput, (imageData) => {
        const existingIndex = products.findIndex(p => p.id === id);
        const product = { id, name, price, category, image: imageData };
        if (existingIndex >= 0) {
            products[existingIndex] = product;
            showToast(`Product updated: ${id} - ${name}`);
        } else {
            products.push(product);
            showToast('Product added successfully.');
        }
        renderProducts();
        modal.classList.add('hidden');
    });
};

document.getElementById('cancel-btn').onclick = () => {
    modal.classList.add('hidden');
};

addBtn.onclick = openAddModal;

function readImageFromFile(input, callback) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

renderProducts();
