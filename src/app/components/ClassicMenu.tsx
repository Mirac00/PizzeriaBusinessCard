"use client";
import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface ClassicPizza {
  id: string;
  name: string;
  description: string;
  image: string;
  price30: number;
  price40: number;
  popular?: boolean;
}

interface ClassicMenuProps {
  onAddToCart: (pizza: ClassicPizza, size: 30 | 40, quantity: number) => void;
}

const classicPizzas: ClassicPizza[] = [
  {
    id: "margherita",
    name: "Margherita",
    description: "Sos pomidorowy, mozzarella, świeża bazylia, oliwa z oliwek",
    image: "https://images.unsplash.com/photo-1682989087146-70a0834c42c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBtYXJnaGVyaXRhJTIwcGl6emF8ZW58MXx8fHwxNzcyMDI3NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 28,
    price40: 42,
    popular: true,
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Sos pomidorowy, mozzarella, pepperoni, oregano",
    image: "https://images.unsplash.com/photo-1597715469889-dd75fe4a1765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcxOTkyODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 32,
    price40: 48,
    popular: true,
  },
  {
    id: "prosciutto",
    name: "Prosciutto e Rucola",
    description: "Sos pomidorowy, mozzarella, prosciutto crudo, rukola, parmezan",
    image: "https://images.unsplash.com/photo-1706982690618-6febc55ef49a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcHJvc2NpdXR0byUyMHBpenphfGVufDF8fHx8MTc3MjAyNzQ1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 36,
    price40: 54,
  },
  {
    id: "vegetariana",
    name: "Vegetariana",
    description: "Sos pomidorowy, mozzarella, papryka, cukinia, bakłażan, pieczarki",
    image: "https://images.unsplash.com/photo-1624633431700-b0912297c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emElMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MjAyMzg1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 30,
    price40: 45,
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmezan, ricotta",
    image: "https://images.unsplash.com/photo-1754799565151-e24cd6ea61e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBwaXp6YSUyMG1lbHRlZHxlbnwxfHx8fDE3NzIwMjc0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 34,
    price40: 51,
    popular: true,
  },
  {
    id: "hawaiian",
    name: "Hawaiana",
    description: "Sos pomidorowy, mozzarella, szynka, ananas",
    image: "https://images.unsplash.com/photo-1671572579989-fa11cbd86eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXdhaWlhbiUyMHBpenphJTIwcGluZWFwcGxlfGVufDF8fHx8MTc3MjAwNzEyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    price30: 32,
    price40: 48,
  },
];

export function ClassicMenu({ onAddToCart }: ClassicMenuProps) {
  const [selectedSizes, setSelectedSizes] = React.useState<Record<string, 30 | 40>>(
    Object.fromEntries(classicPizzas.map(p => [p.id, 30]))
  );
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    Object.fromEntries(classicPizzas.map(p => [p.id, 1]))
  );

  const handleAddToCart = (pizza: ClassicPizza) => {
    const size = selectedSizes[pizza.id];
    const quantity = quantities[pizza.id];
    onAddToCart(pizza, size, quantity);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{ 
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 600
            }}
          >
            Nasze Klasyczne Pizze
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-family-sans)',
              fontSize: '1.125rem'
            }}
          >
            Tradycyjne receptury prosto z Włoch, przygotowane z najwyższą starannością
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classicPizzas.map((pizza, index) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              index={index}
              selectedSize={selectedSizes[pizza.id]}
              quantity={quantities[pizza.id]}
              onSizeChange={(size) => setSelectedSizes(prev => ({ ...prev, [pizza.id]: size }))}
              onQuantityChange={(qty) => setQuantities(prev => ({ ...prev, [pizza.id]: qty }))}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PizzaCardProps {
  pizza: ClassicPizza;
  index: number;
  selectedSize: 30 | 40;
  quantity: number;
  onSizeChange: (size: 30 | 40) => void;
  onQuantityChange: (qty: number) => void;
  onAddToCart: (pizza: ClassicPizza) => void;
}

function PizzaCard({ 
  pizza, 
  index, 
  selectedSize, 
  quantity, 
  onSizeChange, 
  onQuantityChange, 
  onAddToCart 
}: PizzaCardProps) {
  const price = selectedSize === 30 ? pizza.price30 : pizza.price40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        {pizza.popular && (
          <Badge className="absolute top-4 right-4 z-10 bg-primary text-white">
            Popularny
          </Badge>
        )}
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="mb-2"
          style={{ 
            fontFamily: 'var(--font-family-serif)',
            fontSize: '1.5rem',
            fontWeight: 600
          }}
        >
          {pizza.name}
        </h3>
        <p
          className="text-muted-foreground mb-6 min-h-[3rem]"
          style={{ fontFamily: 'var(--font-family-sans)', fontSize: '0.9375rem' }}
        >
          {pizza.description}
        </p>

        {/* Size selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onSizeChange(30)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              selectedSize === 30
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            }`}
          >
            30cm
          </button>
          <button
            onClick={() => onSizeChange(40)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              selectedSize === 40
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            }`}
          >
            40cm
          </button>
        </div>

        {/* Quantity and price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-background rounded-md transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center" style={{ fontFamily: 'var(--font-family-sans)' }}>
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-2 hover:bg-background rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div
            className="text-primary"
            style={{ 
              fontFamily: 'var(--font-family-serif)',
              fontSize: '1.75rem',
              fontWeight: 600
            }}
          >
            {price} zł
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={() => onAddToCart(pizza)}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6"
        >
          Dodaj do koszyka
        </Button>
      </div>
    </motion.div>
  );
}

// Add React import
import * as React from "react";
