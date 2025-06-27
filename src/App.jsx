import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Settings } from "lucide-react";
import AdminPanel from "./components/AdminPanel";
import ProductListing from "./components/ProductListing";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import TermsAndConditions from "./components/terms";
import ProductPage from "./components/ProductPage";
import Navbar from "./components/navbar";
import HeroSection from "./components/heroSection";
import ServicesSection from "./components/ServicesSection";
import ProductsSection from "./components/ProductsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/footer";
import CartPage from "./components/cartPage";
import useViewStore from "./store/useViewStore";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
const { currentView, setCurrentView } = useViewStore();  // Add to your existing state in App.js
  const [cartItems, setCartItems] = useState([]);

  // Add these functions to manage the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Add to your conditional rendering in App.js
  if (currentView === "cart") {
    return (
      <CartPage
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        onBack={() => setCurrentView("products")}
      />
    );
  }

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // User data handling
  let userData = {};
  try {
    const user = localStorage.getItem("User");
    userData = user ? JSON.parse(user) : {};
  } catch (e) {
    console.error("Error parsing user data:", e);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    localStorage.removeItem("username");
    setCurrentView("Login");
  };

  // Conditional rendering for different views
  if (currentView === "admin")
    return <AdminPanel onBack={() => setCurrentView("home")} />;
  if (currentView === "products")
    return (
      <ProductListing
        onBack={() => setCurrentView("home")}
        openProduct={() => setCurrentView("ProductPage")}
      />
    );
  if (currentView === "Login")
    return (
      <LoginPage
        onBack={() => setCurrentView("home")}
        onSwitchToRegister={() => setCurrentView("register")}
      />
    );
  if (currentView === "register")
    return (
      <RegisterPage
        onBack={() => setCurrentView("home")}
        onSwitchToLogin={() => setCurrentView("Login")}
        onTerms={() => setCurrentView("terms")}
      />
    );
  if (currentView === "terms") return <TermsAndConditions />;
  if (currentView === "ProductPage")
    return <ProductPage onBack={() => setCurrentView("products")} />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        currentView={currentView}
        setCurrentView={setCurrentView}
        userData={userData}
        handleLogout={handleLogout}
      />

      <main>
        <HeroSection setCurrentView={setCurrentView} />
        <ServicesSection />
        <ProductsSection setCurrentView={setCurrentView} />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
