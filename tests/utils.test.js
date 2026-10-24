import { describe } from "yargs";
import { 
    getStockStatus, 
    formatCurrency, 
    calculateInventoryValue, 
    filterProducts, 
    validateProduct 
} from "../js/utils";
import { it } from "node:test";

describe("getStockStatus", () => {

    it("returns In Stock when quantity is above minimum stock", () => {
        const product = { 
            quantity: 20, 
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("In Stock");
    });

    it("returns Low Stock when quantity is at or below minimum stock", () => {
        const product = {
            quantity: 5,
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("Low Stock");
    });

    it("returns Out of Stock when quantity is zero", () => {
        const product = {
            quantity: 0,
            minimumStock: 5
        };

        expect(getStockStatus(product)).toBe("Out of Stock");
    });
});