import React, { useState, useEffect } from 'react';

interface DimensionFilterProps {
    onDimensionChange: (dimensions: { width: number; height: number }) => void;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

const DimensionFilter: React.FC<DimensionFilterProps> = ({
    onDimensionChange,
    defaultWidth = 1,
    defaultHeight = 1,
    minWidth = 0.5,
    maxWidth = 20,
    minHeight = 0.5,
    maxHeight = 20
}) => {
    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        setIsExpanded(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        onDimensionChange({ width, height });
    }, [width, height]);

    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth);
        onDimensionChange({ width: newWidth, height });
    };

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight);
        onDimensionChange({ width, height: newHeight });
    };

    const resetDimensions = () => {
        setWidth(defaultWidth);
        setHeight(defaultHeight);
        onDimensionChange({ width: defaultWidth, height: defaultHeight });
    };

    return (
        <>
            <style>{`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                    outline: none;
                }

                input[type="range"]::-webkit-slider-track {
                    background: transparent;
                    height: 4px;
                    border-radius: 2px;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #FFD974;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                input[type="range"]::-webkit-slider-thumb:hover {
                    background: #FFD974;
                    transform: scale(1.1);
                }

                input[type="range"]::-moz-range-track {
                    background: transparent;
                    height: 4px;
                    border-radius: 2px;
                    border: none;
                }

                input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #FFD974;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                input[type="range"]::-moz-range-thumb:hover {
                    background: #FFD974;
                    transform: scale(1.1);
                }
            `}</style>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <h3 className="text-lg font-semibold text-gray-800">
                        الأبعاد والسعر
                    </h3>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-4 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                العرض: {width} م
                            </label>

                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="relative top-4 w-full h-4  border-b-4 border-primary-yellow mb-4">
                                        {Array.from({ length: Math.floor((maxWidth - minWidth) / 0.5) }, (_, i) => {
                                            const value = minWidth + (i * 1);
                                            if (value <= maxWidth) {
                                                const position = ((value - minWidth) / (maxWidth - minWidth)) * 100;
                                                return (
                                                    <div key={value} className="absolute bottom-0" style={{ right: `${position}%` }}>
                                                        <div className={`bg-gray-600 transform -translate-x-1/2 w-[2px] h-4`}></div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <input
                                        type="range"
                                        min={minWidth}
                                        max={maxWidth}
                                        step="0.1"
                                        value={width}
                                        onChange={(e) => handleWidthChange(Number(e.target.value))}
                                        className="w-full h-10 bg-primary-yellow rounded-lg appearance-none cursor-pointer relative -mt-8 z-10"
                                        aria-label="عرض المنتج"
                                        title="عرض المنتج"
                                    />

                                    <div
                                        className="absolute bg-primary-yellow -top-2 transform -translate-x-1/2 z-20 pointer-events-none"
                                        style={{ right: `${((width - minWidth) / (maxWidth - minWidth)) * 100}%` }}
                                    >
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min={minWidth}
                                    max={maxWidth}
                                    value={width}
                                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    aria-label="عرض المنتج بالمتر"
                                    title="عرض المنتج بالمتر"
                                    placeholder="أدخل العرض"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                الارتفاع: {height} م
                            </label>

                            <div className="space-y-2">
                                <div className="relative">
                                    <div className="relative top-4 w-full h-4 border-b-4 border-primary-yellow mb-4">
                                        {Array.from({ length: Math.floor((maxHeight - minHeight) / 0.5) }, (_, i) => {
                                            const value = minHeight + (i * 1);
                                            if (value <= maxHeight) {
                                                const position = ((value - minHeight) / (maxHeight - minHeight)) * 100;
                                                return (
                                                    <div key={value} className="absolute bottom-0" style={{ right: `${position}%` }}>
                                                        <div className={`bg-gray-600 transform -translate-x-1/2 w-[2px] h-4`}></div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <input
                                        type="range"
                                        min={minHeight}
                                        max={maxHeight}
                                        step="0.1"
                                        value={height}
                                        onChange={(e) => handleHeightChange(Number(e.target.value))}
                                        className="w-full h-10 bg-primary-yellow rounded-lg cursor-pointer relative -mt-8 z-10"
                                        aria-label="ارتفاع المنتج"
                                        title="ارتفاع المنتج"
                                    />

                                    <div
                                        className="absolute bg-primary-yellow -top-2 transform -translate-x-1/2 z-20 pointer-events-none"
                                        style={{ right: `${((height - minHeight) / (maxHeight - minHeight)) * 100}%` }}
                                    >
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min={minHeight}
                                    max={maxHeight}
                                    value={height}
                                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    aria-label="ارتفاع المنتج بالمتر"
                                    title="ارتفاع المنتج بالمتر"
                                    placeholder="أدخل الارتفاع"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-2">المساحة المحسوبة</div>
                                <div className="text-2xl font-bold text-blue-700 mb-1">
                                    {(width * height).toFixed(2)} م²
                                </div>
                                <div className="text-xs text-gray-500">
                                    {width} م × {height} م
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-blue-200">
                                <div className="flex justify-between items-center text-xs text-blue-600">
                                    <span>الحد الأدنى: 0.25 م² (0.5×0.5 م)</span>
                                    <span>الحد الأقصى: {(maxWidth * maxHeight).toFixed(2)} م²</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DimensionFilter;