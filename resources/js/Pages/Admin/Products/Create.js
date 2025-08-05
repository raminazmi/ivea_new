import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ColorSwatch from '@/Components/Common/ColorSwatch';
const CreateProduct = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        brand: '',
        collection: '',
        description: '',
        price: '',
        discount: '',
        image: '',
        images: [],
        rating: '',
        tab: 'all',
        category_id: '',
        colors: [],
        status: 'active',
        stock: '',
        sku: '',
        featured: false,
        specifications: {
            features: [],
            material: '',
            dimensions: '',
            installation: ''
        },
        weight: '',
        dimensions: {
            width: '',
            height: '',
            depth: ''
        }
    });
    const [newImage, setNewImage] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };
    const addImage = () => {
        if (newImage.trim()) {
            setData('images', [...data.images, newImage.trim()]);
            setNewImage('');
        }
    };
    const removeImage = (index) => {
        setData('images', data.images.filter((_, i) => i !== index));
    };
    const addColor = () => {
        if (newColor.trim()) {
            setData('colors', [...data.colors, newColor.trim()]);
            setNewColor('');
        }
    };
    const removeColor = (index) => {
        setData('colors', data.colors.filter((_, i) => i !== index));
    };
    const addFeature = () => {
        if (newFeature.trim()) {
            setData('specifications', {
                ...data.specifications,
                features: [...data.specifications.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };
    const removeFeature = (index) => {
        setData('specifications', {
            ...data.specifications,
            features: data.specifications.features.filter((_, i) => i !== index)
        });
    };
    return (_jsxs(AdminLayout, { children: [_jsx(Head, { title: "\u0625\u0646\u0634\u0627\u0621 \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F" }), _jsx("div", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: _jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: _jsxs("div", { className: "p-6 text-gray-900", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "\u0625\u0646\u0634\u0627\u0621 \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "name", value: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C" }), _jsx(TextInput, { id: "name", type: "text", className: "mt-1 block w-full", value: data.name, onChange: (e) => setData('name', e.target.value), required: true }), _jsx(InputError, { message: errors.name, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "brand", value: "\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629" }), _jsx(TextInput, { id: "brand", type: "text", className: "mt-1 block w-full", value: data.brand, onChange: (e) => setData('brand', e.target.value) }), _jsx(InputError, { message: errors.brand, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "collection", value: "\u0627\u0644\u062A\u0634\u0643\u064A\u0644\u0629" }), _jsx(TextInput, { id: "collection", type: "text", className: "mt-1 block w-full", value: data.collection, onChange: (e) => setData('collection', e.target.value) }), _jsx(InputError, { message: errors.collection, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "sku", value: "\u0631\u0645\u0632 \u0627\u0644\u0645\u0646\u062A\u062C (SKU)" }), _jsx(TextInput, { id: "sku", type: "text", className: "mt-1 block w-full", value: data.sku, onChange: (e) => setData('sku', e.target.value) }), _jsx(InputError, { message: errors.sku, className: "mt-2" })] })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "description", value: "\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C" }), _jsx("textarea", { title: "\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C", id: "description", className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm", rows: 4, value: data.description, onChange: (e) => setData('description', e.target.value) }), _jsx(InputError, { message: errors.description, className: "mt-2" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "price", value: "\u0627\u0644\u0633\u0639\u0631" }), _jsx(TextInput, { id: "price", type: "number", step: "0.01", className: "mt-1 block w-full", value: data.price, onChange: (e) => setData('price', e.target.value), required: true }), _jsx(InputError, { message: errors.price, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "discount", value: "\u0646\u0633\u0628\u0629 \u0627\u0644\u062E\u0635\u0645 (%)" }), _jsx(TextInput, { id: "discount", type: "number", min: "0", max: "100", className: "mt-1 block w-full", value: data.discount, onChange: (e) => setData('discount', e.target.value) }), _jsx(InputError, { message: errors.discount, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "stock", value: "\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629" }), _jsx(TextInput, { id: "stock", type: "number", min: "0", className: "mt-1 block w-full", value: data.stock, onChange: (e) => setData('stock', e.target.value), required: true }), _jsx(InputError, { message: errors.stock, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "rating", value: "\u0627\u0644\u062A\u0642\u064A\u064A\u0645" }), _jsx(TextInput, { id: "rating", type: "number", min: "0", max: "5", step: "0.1", className: "mt-1 block w-full", value: data.rating, onChange: (e) => setData('rating', e.target.value) }), _jsx(InputError, { message: errors.rating, className: "mt-2" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "category_id", value: "\u0627\u0644\u0641\u0626\u0629" }), _jsxs("select", { id: "category_id", className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm", value: data.category_id, onChange: (e) => setData('category_id', e.target.value), required: true, title: "\u0627\u062E\u062A\u0631 \u0641\u0626\u0629 \u0627\u0644\u0645\u0646\u062A\u062C", children: [_jsx("option", { value: "", children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629" }), categories.map((category) => (_jsx("option", { value: category.id, children: category.name }, category.id)))] }), _jsx(InputError, { message: errors.category_id, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "tab", value: "\u0627\u0644\u062A\u0628\u0648\u064A\u0628" }), _jsxs("select", { id: "tab", className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm", value: data.tab, onChange: (e) => setData('tab', e.target.value), title: "\u0627\u062E\u062A\u0631 \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0645\u0646\u062A\u062C", children: [_jsx("option", { value: "all", children: "\u0627\u0644\u0643\u0644" }), _jsx("option", { value: "featured", children: "\u0645\u0645\u064A\u0632" }), _jsx("option", { value: "new", children: "\u062C\u062F\u064A\u062F" }), _jsx("option", { value: "bestsellers", children: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B" }), _jsx("option", { value: "offers", children: "\u0627\u0644\u0639\u0631\u0648\u0636" })] }), _jsx(InputError, { message: errors.tab, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "status", value: "\u0627\u0644\u062D\u0627\u0644\u0629" }), _jsxs("select", { id: "status", className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm", value: data.status, onChange: (e) => setData('status', e.target.value), title: "\u0627\u062E\u062A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0646\u062A\u062C", children: [_jsx("option", { value: "active", children: "\u0646\u0634\u0637" }), _jsx("option", { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" })] }), _jsx(InputError, { message: errors.status, className: "mt-2" })] })] }), _jsxs("div", { children: [_jsx(InputLabel, { value: "\u0635\u0648\u0631 \u0627\u0644\u0645\u0646\u062A\u062C" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(TextInput, { type: "text", placeholder: "\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629", className: "flex-1", value: newImage, onChange: (e) => setNewImage(e.target.value), title: "\u0623\u062F\u062E\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629" }), _jsx(SecondaryButton, { type: "button", onClick: addImage, children: "\u0625\u0636\u0627\u0641\u0629" })] }), data.images.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: data.images.map((image, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: image, alt: `صورة ${index + 1}`, className: "w-full h-20 object-cover rounded" }), _jsx("button", { type: "button", onClick: () => removeImage(index), className: "absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", title: `حذف الصورة ${index + 1}`, children: "\u00D7" })] }, index))) }))] }), _jsx(InputError, { message: errors.images, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { value: "\u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(TextInput, { type: "text", placeholder: "\u0643\u0648\u062F \u0627\u0644\u0644\u0648\u0646 (\u0645\u062B\u0627\u0644: #FF0000)", className: "flex-1", value: newColor, onChange: (e) => setNewColor(e.target.value), title: "\u0623\u062F\u062E\u0644 \u0643\u0648\u062F \u0627\u0644\u0644\u0648\u0646" }), _jsx(SecondaryButton, { type: "button", onClick: addColor, children: "\u0625\u0636\u0627\u0641\u0629" })] }), data.colors.length > 0 && (_jsx("div", { className: "flex gap-2 flex-wrap", children: data.colors.map((color, index) => (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ColorSwatch, { color: color, size: "md" }), _jsx("button", { type: "button", onClick: () => removeColor(index), className: "text-red-500 text-sm", title: `حذف اللون ${index + 1}`, children: "\u00D7" })] }, index))) }))] }), _jsx(InputError, { message: errors.colors, className: "mt-2" })] }), _jsxs("div", { children: [_jsx(InputLabel, { value: "\u0627\u0644\u0645\u0645\u064A\u0632\u0627\u062A" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(TextInput, { type: "text", placeholder: "\u0623\u0636\u0641 \u0645\u064A\u0632\u0629 \u062C\u062F\u064A\u062F\u0629", className: "flex-1", value: newFeature, onChange: (e) => setNewFeature(e.target.value), title: "\u0623\u062F\u062E\u0644 \u0645\u064A\u0632\u0629 \u062C\u062F\u064A\u062F\u0629" }), _jsx(SecondaryButton, { type: "button", onClick: addFeature, children: "\u0625\u0636\u0627\u0641\u0629" })] }), data.specifications.features.length > 0 && (_jsx("ul", { className: "list-disc list-inside space-y-1", children: data.specifications.features.map((feature, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("span", { children: feature }), _jsx("button", { type: "button", onClick: () => removeFeature(index), className: "text-red-500 text-sm", title: `حذف الميزة ${index + 1}`, children: "\u00D7" })] }, index))) }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "material", value: "\u0627\u0644\u0645\u0627\u062F\u0629" }), _jsx(TextInput, { id: "material", type: "text", className: "mt-1 block w-full", value: data.specifications.material, onChange: (e) => setData('specifications', {
                                                                ...data.specifications,
                                                                material: e.target.value
                                                            }) })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "dimensions", value: "\u0627\u0644\u0623\u0628\u0639\u0627\u062F" }), _jsx(TextInput, { id: "dimensions", type: "text", className: "mt-1 block w-full", value: data.specifications.dimensions, onChange: (e) => setData('specifications', {
                                                                ...data.specifications,
                                                                dimensions: e.target.value
                                                            }) })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "installation", value: "\u0627\u0644\u062A\u0631\u0643\u064A\u0628" }), _jsx(TextInput, { id: "installation", type: "text", className: "mt-1 block w-full", value: data.specifications.installation, onChange: (e) => setData('specifications', {
                                                                ...data.specifications,
                                                                installation: e.target.value
                                                            }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "weight", value: "\u0627\u0644\u0648\u0632\u0646 (\u0643\u062C\u0645)" }), _jsx(TextInput, { id: "weight", type: "number", step: "0.1", className: "mt-1 block w-full", value: data.weight, onChange: (e) => setData('weight', e.target.value) })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "width", value: "\u0627\u0644\u0639\u0631\u0636" }), _jsx(TextInput, { id: "width", type: "text", className: "mt-1 block w-full", value: data.dimensions.width, onChange: (e) => setData('dimensions', {
                                                                ...data.dimensions,
                                                                width: e.target.value
                                                            }) })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "height", value: "\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639" }), _jsx(TextInput, { id: "height", type: "text", className: "mt-1 block w-full", value: data.dimensions.height, onChange: (e) => setData('dimensions', {
                                                                ...data.dimensions,
                                                                height: e.target.value
                                                            }) })] }), _jsxs("div", { children: [_jsx(InputLabel, { htmlFor: "depth", value: "\u0627\u0644\u0639\u0645\u0642" }), _jsx(TextInput, { id: "depth", type: "text", className: "mt-1 block w-full", value: data.dimensions.depth, onChange: (e) => setData('dimensions', {
                                                                ...data.dimensions,
                                                                depth: e.target.value
                                                            }) })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "featured", type: "checkbox", className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500", checked: data.featured, onChange: (e) => setData('featured', e.target.checked), title: "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0646\u062A\u062C \u0643\u0645\u0645\u064A\u0632" }), _jsx(InputLabel, { htmlFor: "featured", value: "\u0645\u0646\u062A\u062C \u0645\u0645\u064A\u0632", className: "ml-2" })] }), _jsxs("div", { className: "flex items-center justify-end mt-6 gap-4", children: [_jsx(SecondaryButton, { type: "button", onClick: () => window.history.back(), children: "\u0625\u0644\u063A\u0627\u0621" }), _jsx(PrimaryButton, { disabled: processing, children: processing ? 'جاري الإنشاء...' : 'إنشاء المنتج' })] })] })] }) }) }) })] }));
};
export default CreateProduct;
