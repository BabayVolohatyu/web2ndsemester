const productList = document.getElementById('product-list');
const emptyMessage = document.getElementById('empty-message');
const addBtn = document.getElementById('add-product-btn');
const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const form = document.getElementById('product-form');
const totalPriceEl = document.getElementById('total-price');

let products = [];

function renderProducts(products, productList, emptyMessage) {
    const updatedProductList = generateProductListHTML(products);
    productList.innerHTML = updatedProductList.html;

    if (products.length === 0) {
        productList.classList.add('empty');
        emptyMessage.style.display = 'block';
    } else {
        productList.classList.remove('empty');
        emptyMessage.style.display = 'none';
    }

    return updatedProductList;
}

function generateProductListHTML(products) {
    let html = '';
    products.forEach(product => {
        html += `
            <div class="card">
                <p>ID: ${product.id}</p>
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
                <img src="${product.image}" alt="${product.name}">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    });
    return { html };
}

function updateTotalPrice(products) {
    const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
    return `Total: $${total.toFixed(2)}`;
}

function deleteProduct(id, products) {
    return products.filter(p => p.id !== id);
}

function openAddModal(form, modal) {
    form.reset();
    form['product-id'].value = '';
    modal.classList.remove('hidden');
}

function openEditModal(product, form, modal) {
    form['product-id'].value = product.id;
    form['product-name'].value = product.name;
    form['product-price'].value = product.price;
    form['product-category'].value = product.category;
    modal.classList.remove('hidden');
}

function handleSubmit(e, form, products, modal) {
    e.preventDefault();
    const id = form['product-id'].value || Date.now().toString();
    const name = form['product-name'].value;
    const price = form['product-price'].value;
    const category = form['product-category'].value;
    const fileInput = form['product-image'];

    readImageFromFile(fileInput, (imageData) => {
        const updatedProducts = updateProductList(id, name, price, category, imageData, products);
        renderProducts(updatedProducts, productList, emptyMessage);
        const toastMessage = updatedProducts.some(p => p.id === id) ? `Product updated: ${id} - ${name}` : 'Product added successfully.';
        updateToast(toastMessage);
        modal.classList.add('hidden');
    });
}

function updateProductList(id, name, price, category, imageData, products) {
    const existingIndex = products.findIndex(p => p.id === id);
    const updatedProduct = { id, name, price, category, image: imageData };

    if (existingIndex >= 0) {
        products[existingIndex] = updatedProduct;
    } else {
        products.push(updatedProduct);
    }

    return [...products];
}

function updateToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function readImageFromFile(input, callback) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

addBtn.onclick = () => openAddModal(form, modal);

document.getElementById('cancel-btn').onclick = () => modal.classList.add('hidden');

form.onsubmit = (e) => handleSubmit(e, form, products, modal);


productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const productId = event.target.closest('.card').querySelector('p').textContent.replace('ID: ', '');
        products = deleteProduct(productId, products);
        renderProducts(products, productList, emptyMessage);
        updateToast('Product deleted successfully.');
    } else if (event.target.classList.contains('edit-btn')) {
        const productId = event.target.closest('.card').querySelector('p').textContent.replace('ID: ', '');
        const productToEdit = products.find(p => p.id === productId);
        openEditModal(productToEdit, form, modal);
    }
});


renderProducts(products, productList, emptyMessage);


totalPriceEl.textContent = updateTotalPrice(products);
