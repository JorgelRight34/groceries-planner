export const days: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]


export const groceries = [

  {
    id: 1,
    name: "Bananas",
    category: {
      id: 0,
      name: "Fruits"
    },
    description: "Fresh organic bananas, rich in potassium.",
    url: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/8/2800071-1.jpg",
    imageUrl: "",
    cost: 1.99,
    days: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: {
      name: "Vegetables",
      id: 1
    },
    description: "Skinless, boneless chicken breast, great for protein.",
    url: "",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/0/2028274-1.jpg",
    cost: 5.49,
    days: ["Tuesday", "Thursday", "Saturday"]
  },
  {
    id: 3,
    name: "Almond Milk",
    category: {
      id: 0,
      name: "Fruits"
    },
    description: "Unsweetened almond milk, dairy-free alternative.",
    url: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/0/2087612-1.jpg",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/0/2087612-1.jpg",
    cost: 3.29,
    days: ["Monday", "Sunday"]
  },
  {
    id: 4,
    name: "Spinach",
    category: {
      name: "Vegetables",
      id: 1
    },
    description: "Fresh organic spinach, rich in iron and vitamins.",
    url: "https://example.com/spinach",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/8/2800811-1.jpg",
    cost: 2.49,
    days: ["Wednesday", "Friday"]
  },
  {
    id: 5,
    name: "Whole Wheat Bread",
    category: {
      id: 0,
      name: "Fruits"
    },
    description: "High-fiber whole wheat bread, great for healthy sandwiches.",
    url: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/1/2138861-1.jpg",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/1/2138861-1.jpg",
    cost: 2.99,
    days: ["Monday", "Thursday", "Saturday"]
  },
  {
    id: 6,
    name: "Greek Yogurt",
    category: {
      name: "Vegetables",
      id: 1
    },
    description: "Plain Greek yogurt, high in protein and probiotics.",
    url: "https://example.com/greek-yogurt",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/2/2220803-1__1698759929.jpg",
    cost: 4.79,
    days: ["Sunday"]
  },
  {
    id: 7,
    name: "Eggs",
    category: {
      id: 0,
      name: "Fruits"
    },
    description: "Free-range organic eggs, a great protein source.",
    url: "https://example.com/eggs",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/2/2201569-1.jpg",
    cost: 3.99,
    days: ["Tuesday", "Thursday", "Sunday"]
  },
  {
    id: 8,
    name: "Salmon Fillet",
    category: {
      name: "Vegetables",
      id: 1
    },
    description: "Fresh Atlantic salmon fillet, rich in Omega-3.",
    url: "https://example.com/salmon",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/0/2071281-1.jpg",
    cost: 12.99,
    days: ["Friday", "Saturday"]
  },
  {
    id: 9,
    name: "Brown Rice",
    category: {
      id: 0,
      name: "Fruits"
    },
    description: "Whole grain brown rice, a healthy carb source.",
    url: "https://example.com/brown-rice",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/0/2004555-1.jpg",
    cost: 3.49,
    days: ["Wednesday", "Sunday"]
  },
  {
    id: 10,
    name: "Avocados",
    category: {
      name: "Vegetables",
      id: 1
    },
    description: "Fresh Hass avocados, perfect for salads and guacamole.",
    url: "https://example.com/avocados",
    imageUrl: "https://supermercadosnacional.com/media/catalog/product/cache/afcac67a0d77755283578b677f040f2b/2/8/2800814-1.jpg",
    cost: 1.99,
    days: ["Monday", "Thursday", "Saturday"]
  }
]


export const categories = [
  {
    name: "Fruits",
    id: 0
  },
  {
    name: "Cheese",
    id: 2,
  },
  {
    name: "Dairy",
    id: 3,
  }
  ,
  {
    name: "Vegetables",
    id: 1
  }
];  