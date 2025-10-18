import React, { useEffect, useState } from "react";
import {
  Apple,
  Milk,
  Wheat,
  Fish,
  Coffee,
  Leaf,
  ShoppingBasket,
  Sparkles,
  Cookie,
  Snowflake,
} from "lucide-react";
import axios from "axios";

const FeaturedCategories = () => {
  const stylePresets = [
    {
      color: "from-blue-400 via-cyan-400 to-teal-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      color: "from-blue-400 via-cyan-400 to-teal-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      color: "from-amber-400 via-yellow-400 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      iconColor: "text-amber-600",
    },
    {
      color: "from-cyan-400 via-blue-400 to-indigo-400",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      iconColor: "text-cyan-600",
    },
    {
      color: "from-purple-400 via-pink-400 to-rose-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      color: "from-green-400 via-emerald-400 to-teal-400",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-600",
    },
  ];
  const iconMap = {
    Apple,
    Milk,
    Wheat,
    Fish,
    Coffee,
    Leaf,
    cookie: Cookie,
    snowflake: Snowflake,
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7188/api/Category/featured-categories"
        );
        setCategories(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section id="products" className="py-20 relative overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%2523000%22%20fill-opacity%3D%220.02%22%3E%3Cpolygon%20points%3D%2250%200%2060%2040%20100%2050%2060%2060%2050%20100%2040%2060%200%2050%2040%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">
              Premium Categories
            </span>
          </div>

          <h2 className="text-5xl font-black text-gray-800 mb-6">
            Shop by
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of premium products, each category
            carefully crafted to bring you the finest quality and freshest
            ingredients for your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.iconName] || ShoppingBasket;
            const stylePreset = stylePresets[index % stylePresets.length];
            return (
              <div
                key={category.categoryID}
                className={`group relative ${stylePreset.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:scale-105`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stylePreset.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`relative p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
                    >
                      <IconComponent
                        className={`h-8 w-8 ${stylePreset.iconColor}`}
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-bold ${stylePreset.iconColor} bg-white px-3 py-1 rounded-full shadow-sm`}
                      >
                        {category.productCount}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button className="group/btn relative overflow-hidden bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2">
                      <span className="relative z-10">Shop Now</span>
                      <ShoppingBasket className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${stylePreset.color} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`}
                      ></div>
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-colors duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden">
            <span className="relative z-10 flex items-center space-x-2">
              <span>Explore All Categories</span>
              <ShoppingBasket className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
