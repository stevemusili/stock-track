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
