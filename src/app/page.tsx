"use client";

import * as React from "react";
import { Toaster, toast } from "sonner";
import { Hero } from "./components/Hero";
import { ClassicMenu } from "./components/ClassicMenu";
import { PizzaCreator } from "./components/PizzaCreator";
import { Cart, CartItem } from "./components/Cart";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import type { ClassicPizza } from "./components/ClassicMenu";
import type { CustomPizza } from "./components/PizzaCreator";

export default function Page() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const handleAddClassicToCart = (pizza: ClassicPizza, size: 30 | 40, quantity: number) => {
    const price = size === 30 ? pizza.price30 : pizza.price40;
    const newItem: CartItem = {
      id: `classic-${pizza.id}-${size}-${Date.now()}`,
      type: "classic",
      pizza,
      size,
      quantity,
      price,
    };
    setCartItems([...cartItems, newItem]);
    toast.success(`${pizza.name} (${size}cm) dodana do koszyka!`, {
      description: `Ilość: ${quantity} • ${price * quantity} zł`,
    });
  };

  const handleAddCustomToCart = (pizza: CustomPizza) => {
    const totalPrice = pizza.basePrice + pizza.ingredients.reduce((sum, ing) => sum + ing.price, 0);
    const newItem: CartItem = {
      id: pizza.id,
      type: "custom",
      pizza,
      size: pizza.size,
      quantity: pizza.quantity,
      price: totalPrice,
    };
    setCartItems([...cartItems, newItem]);
    toast.success(`Własna pizza (${pizza.size}cm) dodana do koszyka!`, {
      description: `Ilość: ${pizza.quantity} • ${totalPrice * pizza.quantity} zł`,
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.info("Produkt usunięty z koszyka");
  };

  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCreator = () => {
    const element = document.getElementById("creator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-sans)' }}>
      <Navigation />
      <Cart 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      <Hero 
        onClassicClick={scrollToMenu}
        onCustomClick={scrollToCreator}
      />
      
      <ClassicMenu onAddToCart={handleAddClassicToCart} />
      
      <PizzaCreator onAddToCart={handleAddCustomToCart} />
      
      <Footer />
      
      <Toaster 
        position="bottom-right"
        richColors
        closeButton
      />
    </div>
  );
}
