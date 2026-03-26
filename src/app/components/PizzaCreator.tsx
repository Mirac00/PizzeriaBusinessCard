"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
const pizzaDoughTexture = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop";
const tomatoSauceTexture = "https://images.unsplash.com/photo-1595196155184-11689572eaef?q=80&w=2070&auto=format&fit=crop";
const creamSauceTexture = "https://images.unsplash.com/photo-1543340713-11100f277028?q=80&w=1974&auto=format&fit=crop";
const bbqSauceTexture = "https://images.unsplash.com/photo-1563814643034-7140cb1f92e0?q=80&w=2070&auto=format&fit=crop";
const olivesTexture = "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=1974&auto=format&fit=crop";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  price: number;
  icon: string;
  visualType?: "sauce" | "cheese" | "topping";
  color?: string;
}

export interface CustomPizza {
  id: string;
  name: string;
  size: 30 | 40;
  ingredients: Ingredient[];
  basePrice: number;
  quantity: number;
}

interface PizzaCreatorProps {
  onAddToCart: (pizza: CustomPizza) => void;
}

const ingredients: Ingredient[] = [
  // Sosy
  { id: "tomato-sauce", name: "Sos pomidorowy", category: "Sosy", price: 0, icon: "🍅", visualType: "sauce", color: "#d32f2f" },
  { id: "cream-sauce", name: "Sos śmietanowy", category: "Sosy", price: 2, icon: "🥛", visualType: "sauce", color: "#fef5e7" },
  { id: "bbq-sauce", name: "Sos BBQ", category: "Sosy", price: 2, icon: "🍖", visualType: "sauce", color: "#6d4c41" },
  
  // Sery
  { id: "mozzarella", name: "Mozzarella", category: "Sery", price: 4, icon: "🧀", visualType: "cheese", color: "#fff9c4" },
  { id: "parmesan", name: "Parmezan", category: "Sery", price: 5, icon: "🧀", visualType: "cheese", color: "#ffe082" },
  { id: "gorgonzola", name: "Gorgonzola", category: "Sery", price: 6, icon: "🧀", visualType: "cheese", color: "#e1f5fe" },
  { id: "ricotta", name: "Ricotta", category: "Sery", price: 5, icon: "🧀", visualType: "cheese", color: "#ffffff" },
  
  // Mięsa
  { id: "pepperoni", name: "Pepperoni", category: "Mięsa", price: 6, icon: "🍕", visualType: "topping", color: "#c62828" },
  { id: "ham", name: "Szynka", category: "Mięsa", price: 5, icon: "🥓", visualType: "topping", color: "#f48fb1" },
  { id: "prosciutto", name: "Prosciutto", category: "Mięsa", price: 8, icon: "🥓", visualType: "topping", color: "#e57373" },
  { id: "salami", name: "Salami", category: "Mięsa", price: 6, icon: "🥓", visualType: "topping", color: "#d32f2f" },
  { id: "chicken", name: "Kurczak", category: "Mięsa", price: 6, icon: "🍗", visualType: "topping", color: "#ffccbc" },
  
  // Warzywa
  { id: "mushrooms", name: "Pieczarki", category: "Warzywa", price: 4, icon: "🍄", visualType: "topping", color: "#d7ccc8" },
  { id: "bell-pepper", name: "Papryka", category: "Warzywa", price: 3, icon: "🫑", visualType: "topping", color: "#ef5350" },
  { id: "onion", name: "Cebula", category: "Warzywa", price: 2, icon: "🧅", visualType: "topping", color: "#e8d5c4" },
  { id: "olives", name: "Oliwki", category: "Warzywa", price: 4, icon: "🫒", visualType: "topping", color: "#263238" },
  { id: "tomato", name: "Pomidory", category: "Warzywa", price: 3, icon: "🍅", visualType: "topping", color: "#ef5350" },
  { id: "arugula", name: "Rukola", category: "Warzywa", price: 4, icon: "🥗", visualType: "topping", color: "#66bb6a" },
  { id: "zucchini", name: "Cukinia", category: "Warzywa", price: 4, icon: "🥒", visualType: "topping", color: "#81c784" },
  
  // Dodatki Premium
  { id: "truffle-oil", name: "Oliwa truflowa", category: "Premium", price: 12, icon: "✨", visualType: "topping", color: "#8d6e63" },
  { id: "burrata", name: "Burrata", category: "Premium", price: 10, icon: "🧀", visualType: "cheese", color: "#ffffff" },
  { id: "pineapple", name: "Ananas", category: "Premium", price: 4, icon: "🍍", visualType: "topping", color: "#fff59d" },
  { id: "basil", name: "Świeża bazylia", category: "Premium", price: 3, icon: "🌿", visualType: "topping", color: "#66bb6a" },
];

const categories = ["Sosy", "Sery", "Mięsa", "Warzywa", "Premium"];

export function PizzaCreator({ onAddToCart }: PizzaCreatorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PizzaCreatorContent onAddToCart={onAddToCart} />
    </DndProvider>
  );
}

function PizzaCreatorContent({ onAddToCart }: PizzaCreatorProps) {
  const [selectedIngredients, setSelectedIngredients] = React.useState<Ingredient[]>([]);
  const [size, setSize] = React.useState<30 | 40>(30);
  const [quantity, setQuantity] = React.useState(1);
  const [openAccordion, setOpenAccordion] = React.useState<string>("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertPhase, setAlertPhase] = React.useState<1 | 2>(1);
  const isProcessingRef = React.useRef(false);

  const basePrice = size === 30 ? 20 : 30;
  const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
  const totalPrice = (basePrice + ingredientsPrice) * quantity;

  const handleDrop = (ingredient: Ingredient) => {
    // Prevent multiple rapid calls
    if (isProcessingRef.current) {
      return;
    }
    isProcessingRef.current = true;
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 100);

    // Limit to max 10 ingredients
    if (selectedIngredients.length >= 10) {
      return;
    }
    
    // Check if ingredient already exists
    if (selectedIngredients.find(i => i.id === ingredient.id)) {
      return; // Don't add duplicates
    }
    
    // Check if trying to add a second sauce
    if (ingredient.visualType === "sauce") {
      const existingSauce = selectedIngredients.find(i => i.visualType === "sauce");
      
      if (existingSauce && existingSauce.id !== ingredient.id) {
        // Different sauce, show alert and block
        setShowAlert(true);
        setAlertPhase(1);
        
        // After 5 seconds, switch to phase 2
        setTimeout(() => {
          setAlertPhase(2);
        }, 5000);
        
        return; // Block adding the sauce
      }
    }
    
    // Add the ingredient
    setSelectedIngredients([...selectedIngredients, ingredient]);
    // Close accordion after selection
    setOpenAccordion("");
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredientId));
  };

  const handleAddToCart = () => {
    const customPizza: CustomPizza = {
      id: `custom-${Date.now()}`,
      name: "Własna Pizza",
      size,
      ingredients: selectedIngredients,
      basePrice,
      quantity,
    };
    onAddToCart(customPizza);
    // Reset
    setSelectedIngredients([]);
    setSize(30);
    setQuantity(1);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setTimeout(() => setAlertPhase(1), 300);
  };

  return (
    <section id="creator" className="py-20 px-6 bg-muted/30">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{ 
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 600
            }}
          >
            Stwórz Własną Pizzę
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-family-sans)',
              fontSize: '1.125rem'
            }}
          >
            Przeciągnij składniki na pizzę i skomponuj swoje idealne danie
          </p>
        </motion.div>

        {/* Three column layout: Ingredients | Pizza | Summary */}
        <div className="grid lg:grid-cols-[350px_1fr_380px] gap-6">
          {/* Left side - Ingredients in accordion */}
          <div className="order-2 lg:order-1">
            <IngredientsAccordion 
              ingredients={ingredients}
              categories={categories}
              onDrop={handleDrop}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
            />
          </div>

          {/* Center - Pizza Preview */}
          <div className="order-1 lg:order-2">
            <PizzaPreview 
              selectedIngredients={selectedIngredients}
              size={size}
              onDrop={handleDrop}
            />
          </div>

          {/* Right side - Sticky summary */}
          <div className="order-3 lg:sticky lg:top-6 h-fit">
            <div className="bg-card rounded-2xl p-6 shadow-xl">
              <h3
                className="mb-6"
                style={{ 
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                Podsumowanie
              </h3>

              {/* Size selector */}
              <div className="mb-6">
                <label className="block mb-3 text-sm">Rozmiar</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSize(30)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      size === 30
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    30cm
                  </button>
                  <button
                    onClick={() => setSize(40)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      size === 40
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    40cm
                  </button>
                </div>
              </div>

              {/* Selected ingredients */}
              <div className="mb-6">
                <label className="block mb-3 text-sm">
                  Składniki ({selectedIngredients.length}/10)
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedIngredients.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      Przeciągnij składniki na pizzę
                    </p>
                  ) : (
                    selectedIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center justify-between p-2 bg-muted rounded-lg group"
                      >
                        <span className="text-sm flex items-center gap-2">
                          <span>{ingredient.icon}</span>
                          {ingredient.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {ingredient.price > 0 ? `+${ingredient.price} zł` : 'Gratis'}
                          </span>
                          <button
                            onClick={() => handleRemoveIngredient(ingredient.id)}
                            className="p-1 hover:bg-destructive/10 text-destructive rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>Pizza bazowa ({size}cm)</span>
                  <span>{basePrice} zł</span>
                </div>
                {ingredientsPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Składniki</span>
                    <span>+{ingredientsPrice} zł</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Ilość</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Plus className="w-3 h-3 rotate-45" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total price */}
              <motion.div
                key={totalPrice}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="flex justify-between items-center mb-6"
              >
                <span style={{ fontFamily: 'var(--font-family-sans)' }}>Suma</span>
                <span
                  className="text-primary"
                  style={{ 
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '2rem',
                    fontWeight: 600
                  }}
                >
                  {totalPrice} zł
                </span>
              </motion.div>

              {/* Add to cart button */}
              <Button
                onClick={handleAddToCart}
                disabled={selectedIngredients.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6"
              >
                Zamów
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex items-center justify-center z-50"
            onClick={alertPhase === 2 ? closeAlert : undefined}
          >
            <AnimatePresence mode="wait">
              {alertPhase === 1 ? (
                <motion.div
                  key="phase1"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* System alert - Windows style */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded" />
                    <span className="text-sm font-semibold">System</span>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl">
                          ⚠
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Ostrzeżenie systemowe
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Twoje urządzenie zostanie zamknięte
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={closeAlert}
                        className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-sm transition-colors text-sm font-medium"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phase2"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center border-2 border-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-6xl mb-4">😄</div>
                  <h3
                    className="mb-4 text-primary"
                    style={{ 
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: '1.75rem',
                      fontWeight: 600
                    }}
                  >
                    Hehe żartowaliśmy!
                  </h3>
                  <p
                    className="text-muted-foreground mb-6"
                    style={{ 
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  >
                    Ale nie wybieraj więcej niż 1 sos, to nie po włosku :)
                  </p>
                  <Button
                    onClick={closeAlert}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-3"
                  >
                    Rozumiem! 🍕
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface PizzaPreviewProps {
  selectedIngredients: Ingredient[];
  size: 30 | 40;
  onDrop: (ingredient: Ingredient) => void;
}

function PizzaPreview({ selectedIngredients, size, onDrop }: PizzaPreviewProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (item: Ingredient) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [onDrop]); // Add dependency array

  // Separate ingredients by type
  const sauces = selectedIngredients.filter(i => i.visualType === "sauce");
  const cheeses = selectedIngredients.filter(i => i.visualType === "cheese");
  const toppings = selectedIngredients.filter(i => i.visualType === "topping");

  // Generate random positions for toppings
  const generateToppingPositions = (count: number) => {
    const positions = [];
    const centerX = 50;
    const centerY = 50;
    const maxRadius = 35; // Stay within pizza boundaries
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const radius = Math.random() * maxRadius + 5;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const rotation = Math.random() * 360;
      const scale = 0.8 + Math.random() * 0.4;
      
      positions.push({ x, y, rotation, scale });
    }
    return positions;
  };

  return (
    <div
      ref={(node) => { drop(node); }}
      className={`relative aspect-square max-w-2xl mx-auto bg-gradient-to-br from-accent/20 to-accent/40 rounded-full flex items-center justify-center transition-all ${
        isOver ? 'scale-105 shadow-2xl ring-4 ring-primary/50' : ''
      }`}
    >
      {/* Pizza base */}
      <div className={`relative rounded-full shadow-2xl overflow-hidden ${
        size === 40 ? 'w-[85%] h-[85%]' : 'w-[75%] h-[75%]'
      }`}>
        {/* Pizza dough texture background */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: `url(${pizzaDoughTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Sauce Layers - all sauces stack */}
        {sauces.map((sauce, index) => {
          // Use texture for tomato sauce and cream sauce, color for others
          const useTomatoTexture = sauce.id === "tomato-sauce";
          const useCreamTexture = sauce.id === "cream-sauce";
          const useBBQTexture = sauce.id === "bbq-sauce";
          const useTexture = useTomatoTexture || useCreamTexture || useBBQTexture;
          
          return (
            <motion.div
              key={sauce.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`absolute rounded-full ${useTexture ? 'inset-0' : 'inset-[8%]'}`}
              style={{
                ...(useTomatoTexture 
                  ? {
                      backgroundImage: `url(${tomatoSauceTexture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.95,
                    }
                  : useCreamTexture
                  ? {
                      backgroundImage: `url(${creamSauceTexture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.95,
                    }
                  : useBBQTexture
                  ? {
                      backgroundImage: `url(${bbqSauceTexture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.95,
                    }
                  : {
                      backgroundColor: sauce.color,
                      opacity: 0.75 - (index * 0.1),
                    }
                ),
                boxShadow: `inset 0 2px 8px rgba(0,0,0,0.2)`,
                mixBlendMode: index > 0 ? 'multiply' : 'normal',
              }}
            >
              {/* Add subtle overlay for non-texture sauces */}
              {!useTexture && Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: sauce.color,
                    filter: 'brightness(0.9)',
                    width: `${10 + Math.random() * 20}%`,
                    height: `${10 + Math.random() * 20}%`,
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                    opacity: 0.3,
                    mixBlendMode: 'overlay',
                  }}
                />
              ))}
            </motion.div>
          );
        })}
        
        {/* Cheese Layers - semi-transparent to show sauce underneath */}
        {cheeses.map((cheese, index) => (
          <motion.div
            key={cheese.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: sauces.length * 0.15 + index * 0.15 }}
            className="absolute inset-[8%] rounded-full"
            style={{
              background: `radial-gradient(circle at ${30 + index * 10}% ${40 + index * 5}%, ${cheese.color}, ${cheese.color}cc)`,
              opacity: 0.7 - (index * 0.1),
              boxShadow: `inset 0 2px 4px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.1)`,
              mixBlendMode: 'normal',
            }}
          >
            {/* Melted cheese bubbles and texture */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: cheese.color,
                  width: `${3 + Math.random() * 8}%`,
                  height: `${3 + Math.random() * 8}%`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  opacity: 0.4 + Math.random() * 0.3,
                  filter: 'blur(1px)',
                  boxShadow: 'inset -1px -1px 2px rgba(255,255,255,0.5)',
                }}
              />
            ))}
            
            {/* Cheese strands/strings effect */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`strand-${i}`}
                className="absolute"
                style={{
                  backgroundColor: cheese.color,
                  width: '2px',
                  height: `${15 + Math.random() * 20}%`,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  opacity: 0.2,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  borderRadius: '2px',
                }}
              />
            ))}
          </motion.div>
        ))}

        {/* Toppings Layer */}
        {toppings.map((topping, index) => {
          const positions = generateToppingPositions(8); // 8 pieces per topping
          
          return positions.map((pos, pieceIndex) => (
            <motion.div
              key={`${topping.id}-${index}-${pieceIndex}`}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: pos.scale, 
                opacity: 1, 
                rotate: pos.rotation 
              }}
              transition={{ 
                delay: (sauces.length + cheeses.length) * 0.15 + index * 0.1 + pieceIndex * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              {/* Topping piece */}
              {renderToppingPiece(topping)}
            </motion.div>
          ));
        })}

        {/* Center text if empty */}
        {selectedIngredients.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-8 z-10">
            <div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
              >
                🍕
              </motion.div>
              <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family-sans)' }}>
                Przeciągnij składniki tutaj
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Size badge */}
      <Badge className="absolute bottom-4 right-4 bg-card text-foreground shadow-lg">
        {size}cm
      </Badge>
    </div>
  );
}

// Helper function to render topping pieces
function renderToppingPiece(topping: Ingredient) {
  const color = topping.color || "#666";
  
  // Different shapes for different toppings
  switch (topping.id) {
    case "pepperoni":
    case "salami":
      return (
        <div 
          className="w-8 h-8 rounded-full shadow-md"
          style={{ 
            backgroundColor: color,
            border: `2px solid ${color}dd`,
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "mushrooms":
      return (
        <div 
          className="w-6 h-6 rounded-full shadow-md"
          style={{ 
            backgroundColor: color,
            borderRadius: '50% 50% 30% 30%',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "olives":
      return (
        <div 
          className="w-5 h-5 rounded-full shadow-md"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1769706722493-36e1f9f6dc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG9saXZlcyUyMHNsaWNlZHxlbnwxfHx8fDE3NzIyMDc1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
            filter: 'brightness(1.2) saturate(1.3)',
            boxShadow: '1px 1px 3px rgba(0,0,0,0.4)'
          }}
        />
      );
    
    case "bell-pepper":
    case "tomato":
      return (
        <div 
          className="w-7 h-7 shadow-md"
          style={{ 
            backgroundColor: color,
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "onion":
      return (
        <div 
          className="w-6 h-8 shadow-md"
          style={{ 
            backgroundColor: color,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            opacity: 0.7,
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1), 1px 1px 2px rgba(0,0,0,0.1)'
          }}
        />
      );
    
    case "ham":
    case "prosciutto":
    case "chicken":
      return (
        <div 
          className="w-8 h-6 shadow-md"
          style={{ 
            backgroundColor: color,
            borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "basil":
    case "arugula":
      return (
        <div 
          className="w-6 h-8 shadow-sm"
          style={{ 
            backgroundColor: color,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            opacity: 0.8,
            boxShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "pineapple":
      return (
        <div 
          className="w-7 h-7 shadow-md"
          style={{ 
            backgroundColor: color,
            clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
            boxShadow: 'inset -1px -1px 2px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    case "zucchini":
      return (
        <div 
          className="w-8 h-5 shadow-md"
          style={{ 
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
    
    default:
      return (
        <div 
          className="w-6 h-6 rounded-full shadow-md"
          style={{ 
            backgroundColor: color,
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2), 1px 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      );
  }
}

interface IngredientsAccordionProps {
  ingredients: Ingredient[];
  categories: string[];
  onDrop: (ingredient: Ingredient) => void;
  openAccordion: string;
  setOpenAccordion: (category: string) => void;
}

function IngredientsAccordion({ ingredients, categories, onDrop, openAccordion, setOpenAccordion }: IngredientsAccordionProps) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-xl space-y-3 lg:sticky lg:top-6">
      <h3 
        className="mb-2 px-2"
        style={{ 
          fontFamily: 'var(--font-family-serif)',
          fontSize: '1.25rem',
          fontWeight: 600
        }}
      >
        Składniki
      </h3>
      {categories.map((category) => {
        const categoryIngredients = ingredients.filter(i => i.category === category);
        const isOpen = openAccordion === category;
        
        return (
          <div key={category} className="border border-border rounded-xl overflow-hidden">
            <button
              className="flex items-center justify-between w-full p-4 bg-background hover:bg-muted transition-colors"
              onClick={() => setOpenAccordion(isOpen ? "" : category)}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{categoryIngredients[0]?.icon}</span>
                <span style={{ fontFamily: 'var(--font-family-sans)' }}>
                  {category}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 p-3 bg-muted/30">
                    {categoryIngredients.map((ingredient) => (
                      <IngredientItem 
                        key={ingredient.id} 
                        ingredient={ingredient} 
                        onDrop={onDrop} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

interface IngredientItemProps {
  ingredient: Ingredient;
  onDrop: (ingredient: Ingredient) => void;
}

function IngredientItem({ ingredient, onDrop }: IngredientItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => { drag(node); }}
      onClick={() => onDrop(ingredient)}
      className={`bg-card rounded-xl p-4 cursor-move hover:shadow-lg transition-all text-center ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      <div className="text-3xl mb-2">{ingredient.icon}</div>
      <div className="text-xs mb-1" style={{ fontFamily: 'var(--font-family-sans)' }}>
        {ingredient.name}
      </div>
      <div className="text-xs text-primary" style={{ fontFamily: 'var(--font-family-sans)' }}>
        {ingredient.price > 0 ? `+${ingredient.price} zł` : 'Gratis'}
      </div>
    </div>
  );
}