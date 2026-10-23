const API_URL = "http://localhost:3000/products";
export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    return products;
    
  } catch (error) {
    throw new Error(`Unable to load products: ${error.message}`);
  }
}

export async function addProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  }catch (error) {
    throw new Error(`Unable to add product: ${error.message}`);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }

    return true;

  } catch (error) {
    throw new Error(`Unable to delete product: ${error.message}`);
  }
}

export async function updateProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
      throw new Error(`Unable to update product: ${error.message}`);
  }
}

export async function patchProduct(id, changes) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
      throw new Error(`Unable to update product: ${error.message}`);
  }
}  