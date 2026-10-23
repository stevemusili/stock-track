export function filterProducts(
    products,
    searchTerm ="",
    category = "All",
    status = "All"
) {
    return products.filter(product => {
        // search by product name
        const matchesSearch = (product.name ?? "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

        // filter by category
        const matchesCategory = category === "All" || product.category === category;

        // determine the product's stock status

        let productStatus;

        if (Number(product.quantity) === 0) {
            productStatus = "Out of Stock";
        } else if (
            Number(product.quantity) <= Number(product.minimumStock)
        ) {
            productStatus = "Low Stock";
        } else {
            productStatus = "In Stock";
        } 

        const matchesStatus = status === "All" || productStatus === status;

        return matchesSearch && matchesCategory && matchesStatus;
    });
}

export function getStockStatus(product) {
    const quantity = Number(product.quantity);
    const minimumStock = Number(product.minimumStock);

    if (quantity <= 0) {
        return "Out of Stock";
    }

    if (quantity <= minimumStock) {
        return "Low Stock";
    }

    return "In Stock";
}

export function calculateInventoryValue(products) {
    return products.reduce((total, product) => {
        return total + Number(product.quantity) * Number(product.price);
    }, 0);
}

export function validateProduct(product) {
    const errors = [];

    if (!product.name || !product.name.trim()) {
        errors.push("Product name is required.");
    }

    const categories = ["Electronics", "Furniture", "Stationery", "Cleaning"];

    if (!categories.includes(product.category)) {
        errors.push("Please select a valid category.");
    }

    if (product.quantity === "" || 
        !Number.isFinite(Number(product.quantity)) || 
        Number(product.quantity) < 0
    ) {
        errors.push("Quantity must be a valid non-negative number.")
    }

    if (
        product.price === "" ||
        !Number.isFinite(Number(product.price)) || 
        Number(product.price) < 0
    ) {
        errors.push("Price must be a valid non-negative number.");
    }

    if (!product.supplier || !product.supplier.trim()) {
        errors.push("Supplier is required.");
    }

    if (
        product.minimumStock === "" ||
        !Number.isFinite(Number(product.minimumStock)) ||
        Number(product.minimumStock) < 0
    ) {
        errors.push("Minimum stock must be a valid non-negative number.");
    }

    return errors;
}