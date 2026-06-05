import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Form6 CORE Hydration & Recovery",
    subtitle: "Electrolytes + Amino Acids",
    range: "CORE",
    category: "Recovery",
    format: "Sachet",
    intensity: "High",
    price: 39.00,
    bgColor: "#E2ECE6", // light sage green
    image: "/product-green.png",
    description: "Designed for high-intensity athletic hydration and rapid muscle recovery. Formulated with raw key electrolytes and essential amino acids (EAAs) to restore muscle glycogen, prevent cramping, and accelerate cellular tissue repair post-exercise.",
    ingredients: "L-Glutamine (2000mg), L-Leucine (1500mg), Potassium Phosphate (350mg), Sodium Chloride (250mg), Magnesium Glycinate (150mg)",
    servingSize: "1 Sachet (8g) in 500ml water",
    servings: "20 Individual Sachets",
    facts: [
      { name: "Calories", amount: "15" },
      { name: "Total Carbohydrates", amount: "3g", dv: "1%" },
      { name: "Sodium (as Sodium Chloride)", amount: "250mg", dv: "11%" },
      { name: "Potassium (as Potassium Phosphate)", amount: "350mg", dv: "7%" },
      { name: "Magnesium (as Magnesium Glycinate)", amount: "150mg", dv: "36%" },
      { name: "CORE Amino Infusion (L-Glutamine, L-Leucine, L-Valine)", amount: "3500mg", dv: "*" }
    ],
    certifications: ["Third-Party Tested", "EU GMP Certified", "Vegan Friendly", "No Artificial Sweeteners"],
    stock: 85,
    flavors: ["Lemon Lime", "Wild Berry", "Orange Citrus"],
    sizes: ["20 Sachets", "40 Sachets"]
  },
  {
    id: 2,
    name: "Form6 CORE Performance Energy",
    subtitle: "Clean Energy + Focus Nootropic",
    range: "CORE",
    category: "Energy",
    format: "Sachet",
    intensity: "High",
    price: 35.00,
    bgColor: "#EAE5DB", // warm wheat cream
    image: "/product-yellow.png",
    description: "Supercharge your workout or high-demand cognitive workday. Features clean organic green tea caffeine paired with L-Theanine for smooth, jitter-free energy and heightened cognitive focus with no crash.",
    ingredients: "Organic Green Tea Extract (yielding 200mg Caffeine), L-Theanine (150mg), Panax Ginseng (100mg), Vitamin B12 (as Methylcobalamin) (50mcg), Coenzyme Q10 (50mg)",
    servingSize: "1 Sachet (6g) in 300ml water",
    servings: "15 Individual Sachets",
    facts: [
      { name: "Calories", amount: "5" },
      { name: "Vitamin B12", amount: "50mcg", dv: "2083%" },
      { name: "Organic Green Tea Caffeine", amount: "200mg", dv: "*" },
      { name: "L-Theanine (Standardized)", amount: "150mg", dv: "*" },
      { name: "Panax Ginseng Root Extract", amount: "100mg", dv: "*" },
      { name: "Coenzyme Q10", amount: "50mg", dv: "*" }
    ],
    certifications: ["Third-Party Tested", "GMP Certified", "Sugar-Free", "Non-GMO"],
    stock: 120,
    flavors: ["Pineapple Mango", "Blue Raspberry"],
    sizes: ["15 Sachets", "30 Sachets"]
  },
  {
    id: 3,
    name: "Form6 CORE Muscle Recovery Pro",
    subtitle: "Clinical Isolate Protein + Glutamine",
    range: "CORE",
    category: "Recovery",
    format: "Powder",
    intensity: "High",
    price: 49.00,
    bgColor: "#EBE5DF", // soft stone gray-pink
    image: "/product-pink.png",
    description: "Ultra-pure micro-filtered isolate protein for maximum muscle protein synthesis. Restores nitrogen balance post-exercise, supports lean muscle tissue growth, and accelerates repair with a direct clinical amino infusion.",
    ingredients: "Whey Protein Isolate (25g), L-Glutamine (3g), Branched Chain Amino Acids (BCAAs) (5.5g), Digestive Enzyme Blend (Amylase, Protease, Lactase) (100mg)",
    servingSize: "1 Scoop (32g) in 250ml cold water",
    servings: "30 Servings",
    facts: [
      { name: "Calories", amount: "115" },
      { name: "Total Fat", amount: "0.5g", dv: "<1%" },
      { name: "Total Carbohydrates", amount: "1g", dv: "<1%" },
      { name: "Protein (Whey Isolate)", amount: "25g", dv: "50%" },
      { name: "Calcium", amount: "125mg", dv: "10%" },
      { name: "Added L-Glutamine", amount: "3000mg", dv: "*" }
    ],
    certifications: ["Informed Sport Certified", "Third-Party Tested", "Gluten-Free", "Low Lactose"],
    stock: 50,
    flavors: ["Madagascar Vanilla", "Dutch Cocoa", "Neutral Unflavored"],
    sizes: ["30 Servings", "60 Servings"]
  },
  {
    id: 4,
    name: "Form6 PRIME Sleep Restore",
    subtitle: "Magnesium + Melatonin Complex",
    range: "PRIME",
    category: "Sleep",
    format: "Capsule",
    intensity: "Regular",
    price: 28.00,
    bgColor: "#E1E4DF", // muted slate-blue
    image: "/product-blue.png",
    description: "Fall asleep faster, sleep through the night, and achieve deeper REM rest. Combines highly bioavailable magnesium glycinate with calming clinical botanicals and a precise dose of melatonin to regulate your circadian rhythm.",
    ingredients: "Magnesium Glycinate (300mg), Valerian Root Extract (150mg), L-Theanine (100mg), Melatonin (3mg), Chamomile Flower Extract (50mg)",
    servingSize: "2 Veggie Capsules before bed",
    servings: "60 Capsules",
    facts: [
      { name: "Magnesium (as Magnesium Glycinate)", amount: "300mg", dv: "71%" },
      { name: "Valerian Root Extract (Standardized)", amount: "150mg", dv: "*" },
      { name: "L-Theanine (Pure Grade)", amount: "100mg", dv: "*" },
      { name: "Melatonin", amount: "3mg", dv: "*" },
      { name: "Chamomile Flower Extract", amount: "50mg", dv: "*" }
    ],
    certifications: ["Non-GMO", "Gluten-Free", "100% Vegan Capsules", "Third-Party Tested"],
    stock: 140,
    flavors: ["Unflavored (Capsules)"],
    sizes: ["60 Capsules (30-day)", "120 Capsules (60-day)"]
  },
  {
    id: 5,
    name: "Form6 PRIME Daily Immunity Glow",
    subtitle: "Vitamin C + Zinc + Bio-Collagen",
    range: "PRIME",
    category: "Immunity",
    format: "Powder",
    intensity: "Regular",
    price: 32.00,
    bgColor: "#F0E7DF", // warm soft peach
    image: "/product-pink.png",
    description: "Dual-action cellular defense and skin structure optimizer. Nourishes immune cells with highly absorbed buffered Vitamin C and Zinc Picolinate while grass-fed collagen peptides promote glowing skin elasticity.",
    ingredients: "Hydrolyzed Grass-Fed Collagen Peptides (5000mg), Vitamin C (as Calcium Ascorbate) (1000mg), Zinc Picolinate (15mg), Elderberry Fruit Extract (250mg), Hyaluronic Acid (100mg)",
    servingSize: "1 Scoop (7g) in water or juice",
    servings: "30 Servings",
    facts: [
      { name: "Calories", amount: "22" },
      { name: "Protein (from Collagen)", amount: "5g", dv: "10%" },
      { name: "Vitamin C (as Calcium Ascorbate)", amount: "1000mg", dv: "1111%" },
      { name: "Zinc (as Zinc Picolinate)", amount: "15mg", dv: "136%" },
      { name: "Hydrolyzed Collagen Peptides", amount: "5000mg", dv: "*" },
      { name: "Elderberry Fruit Extract", amount: "250mg", dv: "*" }
    ],
    certifications: ["Third-Party Lab Tested", "EU VAT Compliant", "Grass-Fed Verified", "Non-GMO"],
    stock: 65,
    flavors: ["Peach Mango", "Strawberry Kiwi", "Neutral Blend"],
    sizes: ["30 Servings"]
  },
  {
    id: 6,
    name: "Form6 PRIME Gut Health Digest",
    subtitle: "Probiotics + Prebiotics + Bloat Relief",
    range: "PRIME",
    category: "Digestion",
    format: "Capsule",
    intensity: "Regular",
    price: 34.00,
    bgColor: "#E2ECE2", // light clean mint green
    image: "/product-green.png",
    description: "Relieve bloating, reduce stomach inflammation, and optimize gastrointestinal microbiome balance. Contains clinically studied strains of active probiotics paired with prebiotic fibers and ginger extract.",
    ingredients: "Lactobacillus Acidophilus (10 Billion CFU), Bifidobacterium Lactis (10 Billion CFU), Organic Inulin Prebiotic Fiber (500mg), Ginger Root Extract (100mg), Peppermint Leaf Powder (100mg)",
    servingSize: "1 Capsule daily with breakfast",
    servings: "30 Capsules",
    facts: [
      { name: "Organic Prebiotic Inulin", amount: "500mg", dv: "*" },
      { name: "Active Probiotic Blend (20 Billion CFU)", amount: "150mg", dv: "*" },
      { name: "Ginger Root Extract (10% Gingerols)", amount: "100mg", dv: "*" },
      { name: "Peppermint Leaf Powder", amount: "100mg", dv: "*" }
    ],
    certifications: ["Dairy-Free & Gluten-Free", "Third-Party Tested", "Shelf-Stable Strains", "100% Vegan"],
    stock: 90,
    flavors: ["Unflavored (Capsules)"],
    sizes: ["30 Capsules (30-day)"]
  },
  {
    id: 7,
    name: "Form6 PRIME Focus & Calm",
    subtitle: "KSM-66 Ashwagandha + Adaptogens",
    range: "PRIME",
    category: "Focus",
    format: "Capsule",
    intensity: "Regular",
    price: 30.00,
    bgColor: "#EDE6DD", // soft ivory linen
    image: "/product-yellow.png",
    description: "Regulate stress hormones, soothe the central nervous system, and maintain clear, calm mental energy. Powered by KSM-66 Ashwagandha, a clinically researched adaptogen, coupled with Rhodiola and Holy Basil.",
    ingredients: "KSM-66 Organic Ashwagandha Extract (600mg), L-Theanine (200mg), Rhodiola Rosea Root Extract (150mg), Holy Basil Leaf Extract (100mg)",
    servingSize: "2 Capsules in the morning",
    servings: "60 Capsules",
    facts: [
      { name: "KSM-66 Organic Ashwagandha Extract", amount: "600mg", dv: "*" },
      { name: "L-Theanine (Alpha-Grade)", amount: "200mg", dv: "*" },
      { name: "Rhodiola Rosea Root Extract", amount: "150mg", dv: "*" },
      { name: "Holy Basil Leaf Extract", amount: "100mg", dv: "*" }
    ],
    certifications: ["USDA Organic", "Non-GMO Project Verified", "100% Vegan", "Third-Party Tested"],
    stock: 75,
    flavors: ["Unflavored (Capsules)"],
    sizes: ["60 Capsules"]
  }
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('form6_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('form6_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('form6_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "F6-10245",
        date: "2026-05-18",
        customerName: "Dr. Alexander Thorne",
        email: "alex.thorne@clinic.org",
        items: [
          {
            id: 4,
            name: "Form6 PRIME Sleep Restore",
            price: 28.00,
            quantity: 2,
            flavor: "Unflavored (Capsules)",
            size: "60 Capsules (30-day)"
          }
        ],
        subtotal: 56.00,
        shipping: 0.00,
        tax: 11.20,
        total: 67.20,
        couponCode: "",
        discount: 0,
        address: {
          street: "14 Rue de la Paix",
          city: "Paris",
          zip: "75002",
          country: "France",
          phone: "+33 1 42 68 53 00"
        },
        status: "Delivered",
        trackingNo: "TRK-FR9875412"
      }
    ];
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('form6_user');
    return saved ? JSON.parse(saved) : {
      loggedIn: true,
      name: "Dr. Alexander Thorne",
      email: "alex.thorne@clinic.org",
      role: "Administrator", // Switchable: Administrator, Customer
      address: {
        street: "14 Rue de la Paix",
        city: "Paris",
        zip: "75002",
        country: "France",
        phone: "+33 1 42 68 53 00"
      }
    };
  });

  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const coupons = {
    "WELCOME10": 0.10, // 10% off
    "CORE20": 0.20,    // 20% off for athletes
    "PRIME15": 0.15    // 15% off for wellness products
  };

  useEffect(() => {
    localStorage.setItem('form6_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('form6_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('form6_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('form6_user', JSON.stringify(user));
  }, [user]);

  // Cart Operations
  const addCartItem = (product, quantity = 1, flavor = "", size = "") => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.flavor === flavor && 
        item.size === size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, flavor, size }];
      }
    });
  };

  const removeCartItem = (productId, flavor = "", size = "") => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.flavor === flavor && item.size === size)
    ));
  };

  const updateCartItemQty = (productId, qty, flavor = "", size = "") => {
    if (qty <= 0) {
      removeCartItem(productId, flavor, size);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === productId && item.flavor === flavor && item.size === size)
        ? { ...item, quantity: qty }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Coupon Logic
  const applyCoupon = (code) => {
    const normalizedCode = code.toUpperCase().trim();
    if (coupons[normalizedCode] !== undefined) {
      setActiveCoupon({
        code: normalizedCode,
        discount: coupons[normalizedCode]
      });
      setCouponError("");
      return true;
    } else {
      setCouponError("Invalid promo code.");
      return false;
    }
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponError("");
  };

  // Wishlist Logic
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Admin and Inventory Logic
  const updateProductStock = (productId, newStock) => {
    setProducts(prev => prev.map(prod => 
      prod.id === productId ? { ...prod, stock: Math.max(0, newStock) } : prod
    ));
  };

  const adjustInventory = (productId, amount) => {
    setProducts(prev => prev.map(prod => 
      prod.id === productId ? { ...prod, stock: Math.max(0, prod.stock + amount) } : prod
    ));
  };

  // User Actions
  const updateUserRole = (role) => {
    setUser(prev => ({ ...prev, role }));
  };

  const updateUserDetails = (details) => {
    setUser(prev => ({ ...prev, ...details }));
  };

  const logOut = () => {
    setUser({ loggedIn: false, role: "Guest" });
    clearCart();
  };

  const logIn = (email, password) => {
    setUser({
      loggedIn: true,
      name: "Dr. Alexander Thorne",
      email: email,
      role: "Customer",
      address: {
        street: "14 Rue de la Paix",
        city: "Paris",
        zip: "75002",
        country: "France",
        phone: "+33 1 42 68 53 00"
      }
    });
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `F6-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: orderData.name,
      email: orderData.email,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        flavor: item.flavor,
        size: item.size
      })),
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
      couponCode: activeCoupon ? activeCoupon.code : "",
      discount: orderData.discount || 0,
      address: orderData.address,
      status: "Processing",
      trackingNo: `TRK-EU${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    // Deduct stock
    cart.forEach(item => {
      adjustInventory(item.product.id, -item.quantity);
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Admin Order Editing
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      user,
      activeCoupon,
      couponError,
      addCartItem,
      removeCartItem,
      updateCartItemQty,
      clearCart,
      applyCoupon,
      removeCoupon,
      toggleWishlist,
      updateProductStock,
      adjustInventory,
      updateUserRole,
      updateUserDetails,
      logIn,
      logOut,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};
