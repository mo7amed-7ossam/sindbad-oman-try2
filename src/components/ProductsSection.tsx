import React, { useState } from 'react';
import {
  Eye,
  Check,
  X,
  LayoutGrid,
  Utensils,
  DoorClosed,
  AppWindow,
  Armchair,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal
} from 'lucide-react';
import { Language, ProductItem } from '../types';
import { PRODUCTS_DATA } from '../data/sindbadData';
import { FadeIn } from './FadeIn';
import { LazyImage } from './ImageWithFallback';

interface ProductsSectionProps {
  lang: Language;
  onSelectProductForConsultation: (productId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  lang,
  onSelectProductForConsultation
}) => {
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // For mobile accordion mode: which accordions are currently expanded
  // Default to expanding the first category or all
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({
    kitchens: true,
    wardrobes: false,
    windows: false,
    living: false
  });

  const categories = [
    {
      id: 'all',
      labelAr: 'جميع الحلول المعمارية',
      labelEn: 'All Architecture Solutions',
      shortAr: 'جميع الحلول',
      shortEn: 'All Solutions',
      subAr: 'المطابخ، الخزائن، النوافذ، الصالات',
      subEn: 'Kitchens, Closets, Windows, Living',
      icon: LayoutGrid,
      count: PRODUCTS_DATA.length
    },
    {
      id: 'kitchens',
      labelAr: 'المطابخ الإيطالية الفاخرة',
      labelEn: 'Italian Luxury Kitchens',
      shortAr: 'المطابخ الإيطالية',
      shortEn: 'Kitchens',
      subAr: 'تصاميم بدون مقابض ورخام كوارتز',
      subEn: 'Handleless & Calacatta Quartz',
      icon: Utensils,
      count: PRODUCTS_DATA.filter((p) => p.category === 'kitchens').length
    },
    {
      id: 'wardrobes',
      labelAr: 'خزائن وغرف الملابس (Walk-in)',
      labelEn: 'Wardrobes & Walk-in Suites',
      shortAr: 'خزائن وغرف الملابس',
      shortEn: 'Wardrobes & Closets',
      subAr: 'غرف Walk-in ودواليب جدارية مخصصة',
      subEn: 'Walk-in & Built-in Suites',
      icon: DoorClosed,
      count: PRODUCTS_DATA.filter((p) => p.category === 'wardrobes').length
    },
    {
      id: 'windows',
      labelAr: 'نوافذ ألمنيوم ثيرمال عازلة',
      labelEn: 'Thermal-Break Acoustic Windows',
      shortAr: 'نوافذ ألمنيوم ثيرمال',
      shortEn: 'Acoustic Windows',
      subAr: 'عزل حراري وصوتي عالي لبيئة الخليج',
      subEn: 'Thermal-break & Acoustic Glazing',
      icon: AppWindow,
      count: PRODUCTS_DATA.filter((p) => p.category === 'windows').length
    },
    {
      id: 'living',
      labelAr: 'أثاث الصالات والمجالس العصرية',
      labelEn: 'Living & Media Wall Suites',
      shortAr: 'أثاث الصالات والمجالس',
      shortEn: 'Living Suites',
      subAr: 'جدران تلفزيون وخزائن عائمة فاخرة',
      subEn: 'Entertainment Walls & Credenzas',
      icon: Armchair,
      count: PRODUCTS_DATA.filter((p) => p.category === 'living').length
    }
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  const toggleMobileAccordion = (categoryId: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const expandAllMobile = () => {
    setExpandedMobileCategories({
      kitchens: true,
      wardrobes: true,
      windows: true,
      living: true
    });
  };

  const collapseAllMobile = () => {
    setExpandedMobileCategories({
      kitchens: false,
      wardrobes: false,
      windows: false,
      living: false
    });
  };

  // Reusable Product Card Renderer
  const renderProductCard = (product: ProductItem) => (
    <div
      key={product.id}
      className="bg-white rounded-xl border border-[#D5E5E8] overflow-hidden hover:border-[#009AA6]/60 transition-all duration-200 shadow-2xs hover:shadow-lg flex flex-col group"
    >
      {/* Product Visual Frame with Intersection Observer Lazy Load */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#EAF3F4] via-[#F4F9FA] to-[#E3EFF1] overflow-hidden border-b border-[#E3EDEF]">
        {product.image && (
          <LazyImage
            src={product.image}
            alt={isAr ? product.titleAr : product.titleEn}
            aspectRatioClass="w-full h-full"
            className="w-full h-full"
            imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fallbackComponent={
              <div className="product-svg-fallback w-full h-full">
                <svg
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  viewBox="0 0 400 250"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="400" height="250" fill="#E8F1F3" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="250" stroke="#D1E3E6" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#D1E3E6" strokeWidth="0.5" />
                  ))}

                  {product.category === 'kitchens' && (
                    <g>
                      <rect x="40" y="30" width="320" height="110" rx="3" fill="#0A3641" />
                      <line x1="120" y1="30" x2="120" y2="140" stroke="#009AA6" strokeWidth="1" />
                      <line x1="200" y1="30" x2="200" y2="140" stroke="#009AA6" strokeWidth="1" />
                      <line x1="280" y1="30" x2="280" y2="140" stroke="#009AA6" strokeWidth="1" />
                      <polygon points="60,150 340,150 320,225 80,225" fill="#FFFFFF" stroke="#CCE0E3" strokeWidth="1" />
                      <polygon points="80,165 320,165 305,215 95,215" fill="#009AA6" opacity="0.85" />
                      <line x1="40" y1="140" x2="360" y2="140" stroke="#FFA726" strokeWidth="2.5" opacity="0.9" />
                    </g>
                  )}

                  {product.category === 'wardrobes' && (
                    <g>
                      <rect x="50" y="25" width="300" height="200" rx="4" fill="#07333B" />
                      <rect x="65" y="40" width="80" height="170" rx="2" fill="#154954" stroke="#00D1E0" strokeWidth="1" opacity="0.8" />
                      <rect x="160" y="40" width="80" height="170" rx="2" fill="#154954" stroke="#00D1E0" strokeWidth="1" opacity="0.8" />
                      <rect x="255" y="40" width="80" height="170" rx="2" fill="#154954" stroke="#00D1E0" strokeWidth="1" opacity="0.8" />
                      <line x1="70" y1="45" x2="70" y2="205" stroke="#FFA726" strokeWidth="2" opacity="0.8" />
                      <line x1="165" y1="45" x2="165" y2="205" stroke="#FFA726" strokeWidth="2" opacity="0.8" />
                      <line x1="260" y1="45" x2="260" y2="205" stroke="#FFA726" strokeWidth="2" opacity="0.8" />
                    </g>
                  )}

                  {product.category === 'windows' && (
                    <g>
                      <rect x="50" y="30" width="300" height="190" rx="4" fill="#FFFFFF" stroke="#07333B" strokeWidth="4" />
                      <line x1="200" y1="30" x2="200" y2="220" stroke="#07333B" strokeWidth="4" />
                      <rect x="60" y="40" width="130" height="170" fill="#C9EBF0" opacity="0.7" />
                      <rect x="210" y="40" width="130" height="170" fill="#C9EBF0" opacity="0.7" />
                    </g>
                  )}

                  {product.category === 'living' && (
                    <g>
                      <rect x="40" y="30" width="320" height="190" rx="4" fill="#0A3641" />
                      <rect x="110" y="45" width="180" height="120" rx="2" fill="#FFFFFF" />
                      <rect x="135" y="65" width="130" height="80" rx="2" fill="#141E22" stroke="#009AA6" strokeWidth="1" />
                      <rect x="65" y="180" width="270" height="30" rx="2" fill="#8C6544" />
                    </g>
                  )}
                </svg>
              </div>
            }
          />
        )}

        {/* Badge Overlay */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#07333B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
          {isAr ? product.collectionAr : product.collectionEn}
        </div>

        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 text-[#07333B] hover:text-[#009AA6] text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs flex items-center gap-1.5 opacity-95 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isAr ? 'معاينة التفاصيل' : 'View Specs'}</span>
        </button>
      </div>

      {/* Content Box */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#6B8C94] mb-2 font-medium">
            <span>{product.style}</span>
            <span className="text-[#009AA6] font-bold">
              {isAr ? `ضمان ${product.warranty}` : `${product.warranty} Warranty`}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#07333B] mb-2 group-hover:text-[#009AA6] transition-colors">
            {isAr ? product.titleAr : product.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-[#52747D] line-clamp-2 leading-relaxed mb-4">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </p>

          {/* Key Features List */}
          <div className="space-y-1.5 mb-5 text-xs text-[#2A525B]">
            {(isAr ? product.featuresAr : product.featuresEn).slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#009AA6] shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-3.5 border-t border-[#EEF3F5] flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedProduct(product)}
            className="text-xs font-bold text-[#07333B] hover:text-[#009AA6] transition-colors cursor-pointer"
          >
            {isAr ? 'المواصفات' : 'Materials'}
          </button>

          <button
            onClick={() => onSelectProductForConsultation(product.id)}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-[#009AA6] hover:bg-[#00818B] rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            {isAr ? 'طلب تصميم 3D' : 'Request 3D Plan'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-14 sm:py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold tracking-widest text-[#009AA6] uppercase mb-2 block">
            {isAr ? 'عالم أوبين والسندباد 2026' : 'OPPEIN & Sindbad 2026 Portfolio'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#07333B] tracking-tight">
            {isAr ? 'حلول ومنتجات متكاملة لمنزلك' : 'Comprehensive Home Solutions'}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#4E7079]">
            {isAr
              ? 'حلول منزلية شاملة صممت لتلائم ذوقك الرفيع وأسلوب حياتك الفريد في سلطنة عمان.'
              : 'Comprehensive home solutions designed to perfectly suit your home and unique lifestyle in Oman.'}
          </p>
        </FadeIn>

        {/* ======================================================== */}
        {/* 1. DESKTOP/TABLET ARCHITECTURAL CARD-BASED GRID (md & up) */}
        {/* ======================================================== */}
        <FadeIn direction="up" delay={150} className="hidden md:block mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-4 rounded-xl text-start transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F0F8F9] border-[#009AA6] shadow-md ring-2 ring-[#009AA6]/20'
                      : 'bg-[#FAFCFC] border-[#DCE8EA] hover:border-[#B3D6DB] hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#009AA6] text-white shadow-2xs' : 'bg-[#EBF3F5] text-[#00818B]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#009AA6] text-white' : 'bg-[#EBF3F5] text-[#557881]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-bold block mb-1 transition-colors ${
                        isSelected ? 'text-[#07333B]' : 'text-[#18444C]'
                      }`}
                    >
                      {isAr ? cat.shortAr : cat.shortEn}
                    </h3>
                    <p className="text-[11px] text-[#63848D] leading-snug line-clamp-1">
                      {isAr ? cat.subAr : cat.subEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop Results Count and Reset Trigger */}
          <div className="flex items-center justify-between pt-4 mt-2 border-b border-[#EAF1F3] pb-3 text-xs text-[#52747D]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#07333B]">
                {isAr ? (
                  <>
                    عرض <span className="text-[#009AA6] font-bold">{filteredProducts.length}</span> من أصل{' '}
                    <span className="font-bold">{PRODUCTS_DATA.length}</span> حلول معمارية
                  </>
                ) : (
                  <>
                    Showing <span className="text-[#009AA6] font-bold">{filteredProducts.length}</span> of{' '}
                    <span className="font-bold">{PRODUCTS_DATA.length}</span> solutions
                  </>
                )}
              </span>

              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#009AA6] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isAr ? 'عرض الكل' : 'Reset to All'}</span>
                </button>
              )}
            </div>

            <span className="text-[11px] text-[#63858E]">
              {isAr ? 'ضمان 10 سنوات على جميع التشكيلات' : '10-Year Warranty on All Models'}
            </span>
          </div>

          {/* Product Cards Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
            {filteredProducts.map((product) => renderProductCard(product))}
          </div>
        </FadeIn>

        {/* ======================================================== */}
        {/* 2. MOBILE-FIRST ACCORDION ARCHITECTURE (< md)            */}
        {/* Completely Replaces Traditional Horizontal Tabs          */}
        {/* ======================================================== */}
        <FadeIn direction="up" delay={150} className="block md:hidden">
          
          {/* Mobile Accordion Controls (Expand All / Collapse All) */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EAF1F3] text-xs text-[#52747D]">
            <span className="font-semibold text-[#07333B]">
              {isAr ? 'تصفح حسب فئات المنزل:' : 'Browse by Category:'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAllMobile}
                className="text-[11px] font-bold text-[#009AA6] hover:underline cursor-pointer"
              >
                {isAr ? 'فتح الكل' : 'Expand All'}
              </button>
              <span className="text-[#CCDDE0]">·</span>
              <button
                onClick={collapseAllMobile}
                className="text-[11px] font-bold text-[#557881] hover:underline cursor-pointer"
              >
                {isAr ? 'طي الكل' : 'Collapse All'}
              </button>
            </div>
          </div>

          {/* Vertical Stack of Category Accordions */}
          <div className="space-y-3.5">
            {categories
              .filter((cat) => cat.id !== 'all')
              .map((cat) => {
                const Icon = cat.icon;
                const isExpanded = !!expandedMobileCategories[cat.id];
                const categoryProducts = PRODUCTS_DATA.filter((p) => p.category === cat.id);

                return (
                  <div
                    key={cat.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'border-[#009AA6] shadow-sm bg-white'
                        : 'border-[#D4E4E7] bg-[#FAFDFD]'
                    }`}
                  >
                    {/* Accordion Header Button */}
                    <button
                      onClick={() => toggleMobileAccordion(cat.id)}
                      className={`w-full p-3.5 sm:p-4 flex items-center justify-between text-start cursor-pointer transition-colors ${
                        isExpanded ? 'bg-[#F0F8F9]' : 'hover:bg-white'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isExpanded
                              ? 'bg-[#009AA6] text-white shadow-2xs'
                              : 'bg-[#E3EFF1] text-[#07333B]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm sm:text-base text-[#07333B] truncate">
                            {isAr ? cat.labelAr : cat.labelEn}
                          </h3>
                          <p className="text-xs text-[#557881] truncate">
                            {isAr ? cat.subAr : cat.subEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                            isExpanded ? 'bg-[#009AA6] text-white' : 'bg-[#E6EFF1] text-[#07333B]'
                          }`}
                        >
                          {cat.count}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#07333B] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#009AA6]' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Accordion Content Panel: Stacks Products Vertically with Zero Overflow */}
                    {isExpanded && (
                      <div className="p-3 sm:p-4 border-t border-[#DFEBEF] bg-[#FAFDFE] space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {categoryProducts.map((prod) => renderProductCard(prod))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </FadeIn>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07333B]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-[#D9EAEB] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAF1F3]">
              <div>
                <span className="text-xs font-bold text-[#009AA6]">
                  {isAr ? selectedProduct.collectionAr : selectedProduct.collectionEn}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#07333B]">
                  {isAr ? selectedProduct.titleAr : selectedProduct.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-[#63858D] hover:text-[#07333B] hover:bg-[#F0F5F6] rounded-lg transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {selectedProduct.image && (
                <div className="rounded-xl overflow-hidden aspect-[16/9] w-full border border-[#D5E5E8] shadow-2xs">
                  <LazyImage
                    src={selectedProduct.image}
                    alt={isAr ? selectedProduct.titleAr : selectedProduct.titleEn}
                    priority={true}
                    aspectRatioClass="w-full h-full"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#3E636D] leading-relaxed">
                {isAr ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#07333B] uppercase tracking-wider mb-2">
                  {isAr ? 'الخامات والتشطيبات المتاحة:' : 'Available Finishes & Materials:'}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProduct.finishes.map((finish, i) => (
                    <span
                      key={i}
                      className="px-2.5 sm:px-3 py-1 text-xs font-medium bg-[#F0F7F8] text-[#07333B] border border-[#D5E6E9] rounded-md"
                    >
                      {finish}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#07333B] uppercase tracking-wider mb-2">
                  {isAr ? 'الميزات الهندسية:' : 'Engineering Features:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2A525B]">
                  {(isAr ? selectedProduct.featuresAr : selectedProduct.featuresEn).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#FAFDFD] p-2.5 rounded-lg border border-[#E8F1F3]">
                      <Check className="w-3.5 h-3.5 text-[#009AA6] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#F2F8F9] rounded-xl border border-[#CCE2E5] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#64848D] block">{isAr ? 'الضمان المعتمد:' : 'Certified Warranty:'}</span>
                  <span className="font-bold text-[#07333B] text-sm">{selectedProduct.warranty}</span>
                </div>
                <div>
                  <span className="text-[#64848D] block">{isAr ? 'المورد الحصري:' : 'Sole Agent:'}</span>
                  <span className="font-bold text-[#009AA6] text-sm">OPPEIN Oman</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAF1F3] flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-[#4E7079] hover:bg-[#F2F6F7] rounded-lg transition-colors cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const prodId = selectedProduct.id;
                  setSelectedProduct(null);
                  onSelectProductForConsultation(prodId);
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#009AA6] text-white text-xs font-bold rounded-lg hover:bg-[#00818B] transition-colors cursor-pointer"
              >
                {isAr ? 'طلب تصميم هذه الغرفة' : 'Request Design for This Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
