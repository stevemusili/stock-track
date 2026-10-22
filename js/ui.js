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
        editBtn.setAttribute("data-id", product.id);
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