export async function getProducts() {
  const url = "http://localhost:3000/products";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    console.log("Sucess:", products);
    return products;
    
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}
