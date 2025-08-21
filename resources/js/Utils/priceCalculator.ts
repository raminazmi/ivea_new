/**
 * Utility functions for calculating dynamic prices based on dimensions
 * Similar to Sedar Global's approach
 */

export interface Product {
    id: number;
    price: number; // Changed from base_price to price
    base_price?: number; // Keep as optional for backward compatibility
    price_per_sqm?: number;
    pricing_method?: 'fixed' | 'per_sqm' | 'tiered';
    min_price?: number;
    max_price?: number;
    default_width?: number;
    default_height?: number;
}

export interface Dimensions {
    width: number; // in cm
    height: number; // in cm
}

/**
 * Calculate dynamic price based on dimensions
 * Default is 1 square meter (100x100cm), additional area adds to the discounted price
 */
export const calculateDynamicPrice = (product: Product, dimensions: Dimensions): number => {
    const { width, height } = dimensions;
    const { price, base_price, price_per_sqm, pricing_method, min_price, max_price } = product;

    // Use price if available, otherwise use base_price for backward compatibility
    const basePrice = Number(price || base_price || 0);

    // If no dimensions provided or dimensions are too small, return base price
    if (!width || !height || width < 100 || height < 100) {
        return basePrice;
    }

    // If basePrice is invalid, fallback to a reasonable default
    if (!basePrice || basePrice <= 0 || isNaN(basePrice)) {
        const fallbackPrice = 500; // Set a reasonable default
        return fallbackPrice;
    }

    // Calculate area in square meters
    const areaInSquareMeters = (width * height) / 10000;
    
    // Default area is 1 square meter (100x100cm)
    const defaultArea = 1.0; // 1 square meter
    
    // Calculate additional area beyond the default
    const additionalArea = Math.max(0, areaInSquareMeters - defaultArea);
    
    // Price per square meter (use product's price_per_sqm or calculate from base price)
    const pricePerSqm = Number(price_per_sqm) || basePrice;
    
    // Calculate additional cost for extra area
    const additionalCost = additionalArea * pricePerSqm;
    
    // Final price = base price (which is already discounted) + additional cost
    let calculatedPrice = basePrice + additionalCost;

    console.log('[DEBUG] Area:', areaInSquareMeters, 'Default Area:', defaultArea, 'Additional Area:', additionalArea, 'Price per sqm:', pricePerSqm, 'Additional Cost:', additionalCost);

    // Apply min/max constraints
    if (min_price && calculatedPrice < min_price) {
        calculatedPrice = Number(min_price);
    }

    if (max_price && calculatedPrice > max_price) {
        calculatedPrice = Number(max_price);
    }

    // Ensure the result is a valid number
    if (isNaN(calculatedPrice) || calculatedPrice <= 0) {
        console.log('[DEBUG] Invalid result, returning base price:', basePrice);
        return basePrice;
    }

    const finalPrice = Math.round(calculatedPrice * 100) / 100;
    console.log('[DEBUG] Final price with additional area:', finalPrice);
    return finalPrice;
};

/**
 * Format price in Saudi Riyal
 */
export const formatPrice = (price: number): string => {
    return `${price.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س`;
};

/**
 * Format price range (من X ر.س)
 */
export const formatPriceFrom = (price: number): string => {
    return `من ${formatPrice(price)}`;
};

/**
 * Calculate area in square meters from cm dimensions
 */
export const calculateArea = (dimensions: Dimensions): number => {
    return (dimensions.width * dimensions.height) / 10000;
};

/**
 * Get default dimensions for a product
 */
export const getDefaultDimensions = (product: Product): Dimensions => {
    return {
        width: (product as any).default_width || 100,  // Use product's default or fallback
        height: (product as any).default_height || 100 // Use product's default or fallback
    };
};

/**
 * Check if dimensions are valid
 */
export const isValidDimensions = (dimensions: Dimensions): boolean => {
    return dimensions.width > 0 && dimensions.height > 0 &&
        dimensions.width <= 1000 && dimensions.height <= 1000;
};
