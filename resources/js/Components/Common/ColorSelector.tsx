import React from 'react';
import ColorSwatch from './ColorSwatch';

interface ColorSelectorProps {
    colors: string[];
    selectedColor: number;
    onColorChange?: (index: number) => void;
    onColorSelect?: (index: number) => void;
    colorNames?: string[];
    title?: string;
    className?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
    colors,
    selectedColor,
    onColorChange,
    onColorSelect,
    colorNames = [],
    title = "اختر اللون",
    className = ""
}) => {
    return (
        <div className={`space-y-3 ${className}`}>
            <div className="text-sm text-gray-600">{title}</div>
            <div className="flex items-center gap-3">
                <div className="flex gap-2">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => (onColorSelect || onColorChange)?.(index)}
                            title={`اختيار اللون ${colorNames[index] || index + 1}`}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === index
                                ? 'border-blue-600 scale-110'
                                : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <ColorSwatch color={color} size="sm" className="w-full h-full rounded-full" />
                        </button>
                    ))}
                </div>
                {colorNames[selectedColor] && (
                    <span className="text-sm font-medium text-gray-900">
                        {colorNames[selectedColor]}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ColorSelector; 