import { getProducts, addProduct, deleteProduct } from "./api.js";
import { renderProducts } from "./ui.js";

const productList = document.querySelector("#product-list");

async function loadProducts() {

    const tableRow = document.createElement("tr");

    const tableData = document.createElement("td");
    tableData.colSpan = 6;
    tableData.className = "loading";
    tableData.textContent = "Loading products...";

    tableRow.append(tableData);
    productList.append(tableRow);

    try {
        const products = await getProducts();

        renderProducts(products);

    } catch (error) {
        productList.textContent = "";
        const tableRow = document.createElement("tr");

        const tableData = document.createElement("td");
        tableData.colSpan = 6;
        tableData.className = "error";
        tableData.textContent = `${error.message}`;

        tableRow.append(tableData);
        productList.append(tableRow);

        console.error(error);
    }  
}

loadProducts();

const productForm = document.querySelector("#product-form");

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

productList.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const productId = event.target.dataset.id;

    const confirmed = confirm(
        "Areyou sure you want to delete this product?"
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