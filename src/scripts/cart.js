// src/scripts/cart.js
// A lightweight, reactive Vanilla JS cart state manager

class CartState {
  constructor() {
    this.items = [];
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ourorigin_cart');
      if (stored) {
        try {
          this.items = JSON.parse(stored);
        } catch (e) {
          console.error("Could not parse cart", e);
          this.items = [];
        }
      }
      // Broadcast initial state
      this._broadcast();
    }
  }

  // item shape: { id, name, price, origin, weight, quantity }
  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this._save();
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this._save();
  }

  updateQuantity(id, delta) {
    const existing = this.items.find(i => i.id === id);
    if (existing) {
      existing.quantity += delta;
      if (existing.quantity <= 0) {
        this.removeItem(id);
      } else {
        this._save();
      }
    }
  }

  clear() {
    this.items = [];
    this._save();
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  _save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ourorigin_cart', JSON.stringify(this.items));
      this._broadcast();
    }
  }

  _broadcast() {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('cart-updated', {
        detail: {
          items: this.items,
          totalItems: this.getTotalItems(),
          totalPrice: this.getTotalPrice()
        }
      });
      window.dispatchEvent(event);
    }
  }
}

// Export a singleton instance
export const cartState = new CartState();
