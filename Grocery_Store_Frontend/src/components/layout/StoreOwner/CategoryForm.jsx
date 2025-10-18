import React, { useState, useEffect } from "react";
import { Save, Search, Package, Layers } from "lucide-react";
import Modal from "./Modal"; // import your reusable modal

// Expandable icon list (you can add more later)
const iconOptions = [
  { name: "Package", icon: Package, category: "General" },
  { name: "Layers", icon: Layers, category: "General" },
];

const CategoryForm = ({ isOpen, onClose, category = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    iconName: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [iconSearch, setIconSearch] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        iconName: category.iconName || "",
        isActive: category.isActive ?? true,
      });
    } else {
      setFormData({ name: "", description: "", iconName: "", isActive: true });
    }
    setErrors({});
    setShowIconSelector(false);
    setIconSearch("");
  }, [category, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
    if (!formData.iconName) newErrors.iconName = "Please select an icon";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
    onClose();
  };

  const getSelectedIcon = () => {
    const selected = iconOptions.find((i) => i.name === formData.iconName);
    return selected ? selected.icon : Package;
  };

  const SelectedIcon = getSelectedIcon();

  const filteredIcons = iconOptions.filter(
    (icon) =>
      icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
      icon.category.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Add New Category"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-purple-500 ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-purple-500 border-gray-300"
            placeholder="Enter category description"
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category Icon *
          </label>
          <button
            type="button"
            onClick={() => setShowIconSelector(!showIconSelector)}
            className="w-full px-4 py-3 border rounded-2xl flex justify-between items-center"
          >
            <div className="flex items-center space-x-2">
              <SelectedIcon className="w-5 h-5 text-purple-600" />
              <span>{formData.iconName || "Select an icon"}</span>
            </div>
          </button>

          {showIconSelector && (
            <div className="mt-2 border rounded-2xl bg-white shadow-lg p-4 max-h-60 overflow-y-auto">
              <div className="mb-3 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border rounded-xl"
                  placeholder="Search icons..."
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {filteredIcons.map((opt) => {
                  const IconComp = opt.icon;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => handleInputChange("iconName", opt.name)}
                      className={`p-3 rounded-xl border flex flex-col items-center ${
                        formData.iconName === opt.name
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <IconComp className="w-5 h-5 text-purple-600" />
                      <span className="text-xs">{opt.name}</span>
                    </button>
                  );
                })}
              </div>
              {errors.iconName && (
                <p className="text-red-500 text-sm mt-2">{errors.iconName}</p>
              )}
            </div>
          )}
        </div>

        {/* Active Toggle */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive", e.target.checked)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Active Category</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-2xl text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{category ? "Update" : "Create"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryForm;
