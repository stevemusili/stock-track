import { getStockStatus, formatCurrency, calculateInventoryValue } from "./utils";
export function renderProducts(products) {
    const productList = document.querySelector("#product-list");

    productList.textContent = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = product.category;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity;

        const priceCell = document.createElement("td");
        priceCell.textContent = `KES ${product.price.toLocaleString()}`;

        const statusCell = document.createElement("td");
        statusCell.textContent = product.quantity === 0? "Out of Stock" : product.quantity <= product.minimumStock? "Low Stock" : "In Stock";
        
        const actionsCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.dataset.id = product.id;
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.setAttribute("data-id", product.id);
        deleteBtn.textContent = "Delete";

        actionsCell.append(editBtn, deleteBtn);

        row.append(idCell, nameCell, categoryCell, quantityCell, priceCell, statusCell, actionsCell);

        productList.append(row);
    });
}

export function renderDashboard(products) {
    const totalProducts = document.querySelector("#total-products");
    const totalStock = document.querySelector("#total-stock");
    const lowStock = document.querySelector("#low-stock");
    const outOfStock = document.querySelector("#out-of-stock");
    const inventoryValue = document.querySelector("#inventory-value");

    const totalQuantity = products.reduce((total, product) => {
        return total + Number(product.quantity);
    }, 0);

    const lowStockCount = products.filter(product => 
        getStockStatus(product) === "Low Stock"
    ).length;

    const outOfStockCount = products.filter(product => 
        getStockStatus(product) === "Out of Stock"
    ).length;

    totalProducts.textContent = products.length;
    totalStock.textContent = totalQuantity;
    lowStock.textContent = lowStockCount;
    outOfStock.textContent = outOfStockCount;

    inventoryValue.textContent = formatCurrency(
        calculateInventoryValue(products)
    );

    renderRecentProducts(products);
}

export function renderRecentProducts(products) {
    const recentList = document.querySelector("#recent-products-list");

    if (!recentList) return;

    recentList.replaceChildren();

    // display up to five products from the end of the API list
    const recentProducts = [...products].slice(-5).reverse();

    recentProducts.forEach(product => {
        const row = document.createElement("tr");

        const values = [product.name, product.category, product.quantity, formatCurrency(product.price), getStockStatus(product)];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        recentList.append(row);
    });
}