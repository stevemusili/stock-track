import { getProducts  } from "./api";
import { renderProducts } from "./ui";

async function loadProducts() {
    const productList = document.querySelector("#product-list");

    const tableRow = document.createElement("tr");

    const tableData = document.createElement("td");
    tableData.className = "loading";
    tableData.textContent = "Loading products...";

    tableRow.append(tableData);
    productList.append(tableRow);

    try {
        const products = await getProducts();

        renderProducts(products);

    } catch (error) {
      const tableRow = document.createElement("tr");

      const tableData = document.createElement("td");
      tableData.className = "error";
      tableData.textContent = "${error.message}";

      tableRow.append(tableData);
      productList.append(tableRow);

      console.error(error);
    }  
}

loadProducts();