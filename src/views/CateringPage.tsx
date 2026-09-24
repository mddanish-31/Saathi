"use client";

import React, { useState } from 'react';
import { CateringHero } from '../components/catering/CateringHero';
import { CateringCategories } from '../components/catering/CateringCategories';
import { CateringFoodServices } from '../components/catering/CateringFoodServices';
import { FoodDessertMenu } from '../components/catering/FoodDessertMenu';
import { CateringPackages } from '../components/catering/CateringPackages';
import { CustomMenu, CustomMenuState } from '../components/catering/CustomMenu';
import { CatererListing } from '../components/catering/CatererListing';
import { CatererProfilePreview } from '../components/catering/CatererProfilePreview';
import { CateringGallery } from '../components/catering/CateringGallery';
import { CateringWhyChoose } from '../components/catering/CateringWhyChoose';
import { CateringReviews } from '../components/catering/CateringReviews';
import { CateringCTA } from '../components/catering/CateringCTA';
import {
  CateringCategory,
  CateringFoodService,
  CateringPackage,
  FoodItem,
  DessertItem,
} from '../data/cateringData';
import { Professional } from '../types';

interface CateringPageProps {
  onNavigate: (path: string) => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onNavigate }) => {
  // Selection States
  const [selectedCategory, setSelectedCategory] = useState<CateringCategory | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<CateringPackage | null>(null);
  const [selectedFoodIds, setSelectedFoodIds] = useState<string[]>([]);
  const [selectedDessertIds, setSelectedDessertIds] = useState<string[]>([]);
  const [previewCaterer, setPreviewCaterer] = useState<Professional | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 1. Category Selection
  const handleSelectCategory = (cat: CateringCategory) => {
    setSelectedCategory(cat);
    // Scroll down to Custom Menu or Packages
    scrollToSection('custom-menu-configurator');
  };

  // 2. Food Service Selection
  const handleSelectService = (_service: CateringFoodService) => {
    scrollToSection('caterer-directory-listing');
  };

  // 3. Food Item Toggle
  const handleToggleFoodItem = (item: FoodItem) => {
    setSelectedFoodIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  // 4. Dessert Item Toggle
  const handleToggleDessertItem = (item: DessertItem) => {
    setSelectedDessertIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  // 5. Package Selection
  const handleSelectPackage = (pkg: CateringPackage) => {
    setSelectedPackage(pkg);
  };

  const handleCustomizePackage = (pkg: CateringPackage) => {
    setSelectedPackage(pkg);
    scrollToSection('custom-menu-configurator');
  };

  // 6. Custom Menu Quote Handler
  const handleSubmitCustomQuote = (_summary: CustomMenuState & { estimatedPerPlate: number; estimatedTotal: number }) => {
    // Scroll to caterers to pick a caterer to send enquiry
    scrollToSection('caterer-directory-listing');
  };

  // 7. Caterer Actions
  const handleViewCaterer = (caterer: Professional) => {
    setPreviewCaterer(caterer);
  };

  const handleEnquireCaterer = (caterer: Professional) => {
    onNavigate(`/professionals/${caterer.id}/enquire`);
  };

  return (
    <div className="saathi-catering-page">
      {/* 1. HERO */}
      <CateringHero
        onNavigate={onNavigate}
        onExploreClick={() => scrollToSection('catering-event-categories')}
        onGetQuoteClick={() => scrollToSection('custom-menu-configurator')}
      />

      {/* 2. EVENT CATEGORIES */}
      <CateringCategories
        selectedCategorySlug={selectedCategory?.slug}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. CATERING & FOOD SERVICES */}
      <CateringFoodServices
        onSelectService={handleSelectService}
      />

      {/* 4. FOOD & DESSERT MENU EXPLORER */}
      <FoodDessertMenu
        selectedFoodIds={selectedFoodIds}
        selectedDessertIds={selectedDessertIds}
        onToggleFoodItem={handleToggleFoodItem}
        onToggleDessertItem={handleToggleDessertItem}
        onViewCustomMenu={() => scrollToSection('custom-menu-configurator')}
      />

      {/* 5. CATERING PACKAGES */}
      <CateringPackages
        selectedPackageId={selectedPackage?.id}
        onSelectPackage={handleSelectPackage}
        onCustomizePackage={handleCustomizePackage}
      />

      {/* 6. CUSTOM MENU CONFIGURATOR */}
      <CustomMenu
        initialEventType={selectedCategory ? selectedCategory.name : undefined}
        initialPackageTier={selectedPackage?.tier}
        onSubmitQuote={handleSubmitCustomQuote}
      />

      {/* 7. CATERER LISTING */}
      <CatererListing
        onViewCaterer={handleViewCaterer}
        onEnquire={handleEnquireCaterer}
      />

      {/* 8. CATERER PROFILE PREVIEW (MODAL) */}
      <CatererProfilePreview
        caterer={previewCaterer}
        onClose={() => setPreviewCaterer(null)}
        onEnquire={handleEnquireCaterer}
      />

      {/* 9. CATERING GALLERY */}
      <CateringGallery />

      {/* 10. WHY CHOOSE SAATHI CATERING */}
      <CateringWhyChoose />

      {/* 11. REVIEWS */}
      <CateringReviews />

      {/* 12. FINAL CTA */}
      <CateringCTA
        onGetQuoteClick={() => scrollToSection('custom-menu-configurator')}
        onExploreCaterersClick={() => scrollToSection('caterer-directory-listing')}
      />
    </div>
  );
};

export default CateringPage;
