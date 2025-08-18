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
 */
export const calculateDynamicPrice = (product: Product, dimensions: Dimensions): number => {
    const { width, height } = dimensions;
    const { price, base_price, price_per_sqm, pricing_method, min_price, max_price } = product;

    // Use price if available, otherwise use base_price for backward compatibility
    const basePrice = Number(price || base_price || 0);

    // If no dimensions provided or dimensions are too small, return base price
    if (!width || !height || width < 10 || height < 10) {
        return basePrice;
    }

    // If basePrice is invalid, fallback to a reasonable default
    if (!basePrice || basePrice <= 0 || isNaN(basePrice)) {
        const fallbackPrice = 500; // Set a reasonable default
        return fallbackPrice;
    }

    // Convert cm to square meters
    const areaInSquareMeters = (width * height) / 10000;

    // Calculate additional price based on area above the default area
    const defaultWidth = (product as any).default_width || 100;
    const defaultHeight = (product as any).default_height || 100;
    const defaultArea = (defaultWidth * defaultHeight) / 10000; // Default area in square meters
    const extraArea = Math.max(0, areaInSquareMeters - defaultArea);

    // Price per square meter - use default if not specified
    const pricePerSqm = Number(price_per_sqm) || 25;

    console.log('[DEBUG] Area:', areaInSquareMeters, 'Default Area:', defaultArea, 'Extra Area:', extraArea, 'Price per sqm:', pricePerSqm);

    let calculatedPrice = basePrice;

    // Simple calculation: basePrice + (extraArea * pricePerSqm)
    if (extraArea > 0) {
        const additionalCost = extraArea * pricePerSqm;
        calculatedPrice = basePrice + additionalCost;
        console.log('[DEBUG] Additional cost:', additionalCost, 'Final calculated price:', calculatedPrice);
    } else {
        console.log('[DEBUG] No extra area, using base price:', calculatedPrice);
    }

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
    console.log('[DEBUG] Final price after rounding:', finalPrice);
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
