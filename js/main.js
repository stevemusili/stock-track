import { getProducts, addProduct } from "./api.js";
import { renderProducts } from "./ui.js";

async function loadProducts() {
    const productList = document.querySelector("#product-list");

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

        const products = await getProducts();
        renderProducts(products);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});