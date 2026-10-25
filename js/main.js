import { getProducts, addProduct, deleteProduct, updateProduct, patchProduct } from "./api.js";
import { renderProducts, renderDashboard } from "./ui.js";
import { filterProducts, formatCurrency, validateProduct, } from "./utils.js";

let editingProductId = null;

const productList = document.querySelector("#product-list");
const editProductForm = document.querySelector(".edit-product-form");
async function loadProducts() {

    const tableRow = document.createElement("tr");

    const tableData = document.createElement("td");
    tableData.colSpan = 7;
    tableData.className = "loading";
    tableData.textContent = "Loading products...";

    tableRow.append(tableData);
    productList.append(tableRow);

    try {
        allProducts = await getProducts();
        renderDashboard(allProducts);
        applyFilters();

    } catch (error) {
        productList.textContent = "";
        const tableRow = document.createElement("tr");

        const tableData = document.createElement("td");
        tableData.colSpan = 7;
        tableData.className = "error";
        tableData.textContent = `${error.message}`;

        tableRow.append(tableData);
        productList.append(tableRow);

        console.error(error);
    }  
}

loadProducts();

const productForm = document.querySelector("#product-form");

// When a user submits the product form
productForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    const product = {
        name: document.querySelector("#name").value,
        category: document.querySelector("#category").value,
        quantity: Number(document.querySelector("#quantity").value),
        price: Number(document.querySelector("#price").value),
        supplier: document.querySelector("#supplier").value,
        minimumStock: Number(document.querySelector("#minimumStock").value),
        description: document.querySelector("#description").value
    };

    try {
        await addProduct(product);

        alert("Product added successfully!");

        productForm.reset();

        await loadProducts();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

// when a user clicks a delete button
productList.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const productId = event.target.dataset.id;

    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteProduct(productId);

        alert("Product deleted successfully!");

        await loadProducts();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

 // When user clicks an Edit button
productList.addEventListener("click", async (event) => {
    const editButton = event.target.closest(".edit-btn");

    if (!editButton) return;

    const productId = editButton.dataset.id;

    try {
        const products = await getProducts();

        const product = products.find(
            item => String(item.id) === String(productId)
        );

        if (!product) {
            throw new Error("Product not found");
        }

        editingProductId = product.id;

        editProductForm.querySelector('[name="name"]').value = product.name ?? "";

        editProductForm.querySelector('[name="quantity"]').value = product.quantity ?? 0;

        editProductForm.querySelector('[name="supplier"]').value = product.supplier ?? "";

        editProductForm.querySelector('[name="category"]').value = product.category ?? "";

        editProductForm.querySelector('[name="price"]').value = product.price ?? 0;

        editProductForm.querySelector('[name="minimumStock"]').value = product.minimumStock ?? 0;

        editProductForm.querySelector('[name="description"]').value = product.description ?? "";

        document.querySelector(".edit-product").scrollIntoView({
            behavior: "smooth"
        });
        
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

// When the user submits the edit product form
editProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (editingProductId === null) {
        alert("Please select a product to edit first.");
        return;
    }

    const updatedProduct = {
        name: editProductForm.querySelector('[name = "name"]').value.trim(),
        quantity: Number(
            editProductForm.querySelector('[name = "quantity"]').value
        ),
        supplier: editProductForm.querySelector('[name = "supplier"]').value.trim(),
        category: editProductForm.querySelector('[name = "category"]').value,
        price: Number(
            editProductForm.querySelector('[name = "price"]').value
        ),
        minimumStock: Number(editProductForm.querySelector('[name = "minimumStock"]').value
        ), 
        description: editProductForm.querySelector('[name = "description"]').value.trim(),  
    };

    try {
        await updateProduct(editingProductId, updatedProduct);

        alert("Product updated successfully!");

        editingProductId = null;
        editProductForm.reset();

        const products = await getProducts();
        renderProducts(products);

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#search-category");
const statusFilter = document.querySelector("#status");

let allProducts = [];

function applyFilters() {
    const searchTerm = searchInput.value;
    const category = categoryFilter.value;
    const status = statusFilter.value;

    const filteredProducts = filterProducts(
        allProducts,
        searchTerm,
        category,
        status
    );

    renderProducts(filteredProducts);
}

// listen for changes in each filter
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
