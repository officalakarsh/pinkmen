/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Currency, JewelleryItem, CartItem } from './types';
import { JEWELLERY_CATALOGUE } from './data/jewelleryData';
import { PrototypeNavBanner } from './components/PrototypeNavBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { HomeScreen } from './screens/HomeScreen';
import { CollectionsScreen } from './screens/CollectionsScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { StudioScreen } from './screens/StudioScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: JEWELLERY_CATALOGUE[0], // Maharani Royal Kundan Set pre-allocated for easy testing
      quantity: 1,
      selectedSize: '14.5" (Standard Royal)',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'maharani-royal-kundan-set',
    'maharaja-royal-jadau-kalgi',
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll to top upon screen navigation
  const handleNavigate = (screen: ScreenId, _itemId?: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: JewelleryItem, selectedSize?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const maharaniProduct = JEWELLERY_CATALOGUE.find((p) => p.id === 'maharani-royal-kundan-set') || JEWELLERY_CATALOGUE[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#231B1B] flex flex-col font-sans selection:bg-[#58111A] selection:text-[#FAF8F5]">
      {/* 1. Prototype Navigation Spec Switcher (Always reachable for testers) */}
      <PrototypeNavBanner
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />

      {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 3. Screen Body */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            catalogue={JEWELLERY_CATALOGUE}
            currency={currency}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {currentScreen === 'collections' && (
          <CollectionsScreen
            catalogue={JEWELLERY_CATALOGUE}
            currency={currency}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {currentScreen === 'product-details' && (
          <ProductDetailsScreen
            product={maharaniProduct}
            currency={currency}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(maharaniProduct.id)}
          />
        )}

        {currentScreen === 'studio' && (
          <StudioScreen
            currency={currency}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 4. Royal Rajputana Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Floating WhatsApp Royal Stylist Concierge */}
      <WhatsAppConcierge onNavigate={handleNavigate} />

      {/* 6. Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        onNavigate={handleNavigate}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        catalogue={JEWELLERY_CATALOGUE}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        currency={currency}
        onNavigate={handleNavigate}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        catalogue={JEWELLERY_CATALOGUE}
        currency={currency}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
