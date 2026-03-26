"use client";
import * as React from "react";
import { ShoppingCart, X, Minus, Plus, Package, Bike } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion, AnimatePresence } from "motion/react";
import type { ClassicPizza } from "./ClassicMenu";
import type { CustomPizza } from "./PizzaCreator";

export interface CartItem {
  id: string;
  type: "classic" | "custom";
  pizza: ClassicPizza | CustomPizza;
  size: 30 | 40;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deliveryMethod, setDeliveryMethod] = React.useState<"delivery" | "pickup">("delivery");
  const [customerInfo, setCustomerInfo] = React.useState({
    name: "",
    phone: "",
    address: "",
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === "delivery" ? 10 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // In a real app, this would submit the order
    alert(`Zamówienie złożone!\nSuma: ${total} zł\nDostawa: ${deliveryMethod === "delivery" ? "Dostawa" : "Odbiór osobisty"}`);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed top-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl px-6"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Koszyk
          {totalItems > 0 && (
            <Badge className="ml-2 bg-white text-primary rounded-full px-2">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.75rem' }}>
            Twój koszyk
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Cart items */}
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍕</div>
              <p className="text-muted-foreground">Twój koszyk jest pusty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Delivery method */}
              <div>
                <Label className="mb-3 block">Sposób odbioru</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      deliveryMethod === "delivery"
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Bike className="w-6 h-6 mb-2 mx-auto" />
                    <div className="text-sm">Dostawa</div>
                    <div className="text-xs text-muted-foreground">+10 zł</div>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      deliveryMethod === "pickup"
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Package className="w-6 h-6 mb-2 mx-auto" />
                    <div className="text-sm">Odbiór</div>
                    <div className="text-xs text-muted-foreground">Gratis</div>
                  </button>
                </div>
              </div>

              {/* Customer info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input
                    id="name"
                    placeholder="Jan Kowalski"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    placeholder="+48 123 456 789"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>
                {deliveryMethod === "delivery" && (
                  <div>
                    <Label htmlFor="address">Adres dostawy</Label>
                    <Input
                      id="address"
                      placeholder="ul. Przykładowa 123, Warszawa"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Price summary */}
              <div className="space-y-2 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Produkty</span>
                  <span>{subtotal} zł</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Dostawa</span>
                    <span>{deliveryFee} zł</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span style={{ fontFamily: 'var(--font-family-sans)' }}>Suma</span>
                  <span
                    className="text-primary"
                    style={{ 
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: '1.75rem',
                      fontWeight: 600
                    }}
                  >
                    {total} zł
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6"
              >
                Zamów i zapłać
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const getPizzaName = () => {
    if (item.type === "classic") {
      return (item.pizza as ClassicPizza).name;
    } else {
      return "Własna Pizza";
    }
  };

  const getPizzaDescription = () => {
    if (item.type === "classic") {
      return (item.pizza as ClassicPizza).description;
    } else {
      const customPizza = item.pizza as CustomPizza;
      return customPizza.ingredients.map(i => i.name).join(", ");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-muted rounded-xl p-4 relative"
    >
      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 p-1.5 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Pizza info */}
      <div className="pr-8 mb-4">
        <h4 className="mb-1" style={{ fontFamily: 'var(--font-family-serif)' }}>
          {getPizzaName()}
        </h4>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {getPizzaDescription()}
        </p>
        <Badge variant="outline">{item.size}cm</Badge>
      </div>

      {/* Quantity and price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-background rounded-lg p-1">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 hover:bg-muted rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-primary" style={{ fontFamily: 'var(--font-family-serif)' }}>
          {item.price * item.quantity} zł
        </div>
      </div>
    </motion.div>
  );
}
