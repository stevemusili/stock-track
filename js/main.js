import { getProducts  } from "./api";

async function loadProducts() {
    const productList = document.querySelector("#product-list");

    productList.innerHTML = `
        <tr>
            <td class="loading">
                Loading products...
            </td>
        </tr>
    `;

    try {
        const products = await getProducts();

        console.log(products);

    } catch (error) {
        productList.innerHTML = `
        <tr>
            <td class="error">
                ${error.message}
            </td>
        </tr>
        `;
        
        console.error(error);
    }  
}

loadProducts();