import { getProducts  } from "./api";

async function loadProducts() {
    const productList = document.querySelector("#product-list");

    const tableRow = document.createElement("tr");

    const tableData = document.createElement("td");
    tableData.className = "loading";
    tableData.textContent = "Loading products...";

    tableRow.appendChild(tableData);
    productList.appendChild(tableRow);

    try {
        const products = await getProducts();

        console.log(products);

    } catch (error) {
      const tableRow = document.createElement("tr");

      const tableData = document.createElement("td");
      tableData.className = "error";
      tableData.textContent = "${error.message}";

      tableRow.appendChild(tableData);
      productList.appendChild(tableRow);
      
      console.error(error);
    }  
}

loadProducts();