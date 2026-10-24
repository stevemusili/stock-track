import { 
    getStockStatus, 
    formatCurrency, 
    calculateInventoryValue, 
    filterProducts, 
    validateProduct 
} from "../js/utils";

// Test Stock Status
describe("getStockStatus", () => {

    // Test when a product is In Stock
    it("returns In Stock when quantity is above minimum stock", () => {
        const product = { 
            quantity: 20, 
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("In Stock");
    });

    // Test when a product has Low Stock
    it("returns Low Stock when quantity is at or below minimum stock", () => {
        const product = {
            quantity: 5,
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("Low Stock");
    });

    // Test when a product is Out of Stock
    it("returns Out of Stock when quantity is zero", () => {
        const product = {
            quantity: 0,
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("Out of Stock");
    });
});

// Test inventory calculations
describe("calculatesInventoryValue", () => {

    // Test calculations for total inventory value
    it("calculates total inventory value", () => {
        const products = [
            {
                name: "Laptop",
                quantity: 20,
                price: 60000
            },
            {
                name: "Office Chair",
                quantity: 5,
                price: 10000
            }
        ];

        expect(calculateInventoryValue(products)).toBe(1250000);
    });

    it("returns zero for an empty product list", () => {
        expect(calculateInventoryValue([])).toBe(0);
    });
});

// Test filtering
const products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        quantity: 20,
        minimumStock: 5
    },
    {
        id:2,
        name: "Office Chair",
        category: "Furniture",
        quantity: 3,
        minimumStock: 5
    },
    {
        id: 3,
        name: "Printing Paper",
        category: "Stationery",
        quantity: 0,
        minimumStock: 5
    }
];

// Test the search
describe("filterProducts - search", () => {

    it("filters products by name", () => {
        const result = filterProducts(
            products,
            "laptop",
            "All",
            "All"
        );
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Laptop");
    });
});

// Test the category filter
describe("filterProducts - category", () => {

    it("filters products by category", () => {
        const result = filterProducts(
            products,
            "",
            "Stationery",
            "All"
        );

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Printing Paper");
    });
});

// Test the status filter
describe("filterProducts - status", () => {

    // Test to filter in stock products
    it("filters in stock products", () => {
        const result = filterProducts(
            products,
            "",
            "All",
            "In Stock"
        );

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Laptop");
    });

    // Test to filter low stock products
    it("filters low stock products", () => {
        const result = filterProducts(
            products,
            "",
            "All",
            "Low Stock"
        );

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Office Chair");
    });

    // Test to filter out of stock products
    it("filters outof stock products", () => {
        const result = filterProducts(
            products,
            "",
            "All",
            "Out of Stock"
        );

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Printing Paper");
    });
});
