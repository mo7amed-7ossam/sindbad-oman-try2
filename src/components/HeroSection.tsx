import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { LazyImage } from './ImageWithFallback';

interface HeroSectionProps {
  lang: Language;
  onOpenConsultation: () => void;
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenConsultation,
  onExploreCatalog
}) => {
  const isAr = lang === 'ar';
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 'kitchen',
      titleAr: 'مطبخ فيرونا كالاكاتا الإيطالي',
      titleEn: 'Verona Calacatta Italian Kitchen',
      tagAr: 'المجموعة الإيطالية الحديثة 2026',
      tagEn: 'Modern Italian 2026 Series',
      specAr: 'رخام كوارتز · مفصلات Blum · مقاوم للرطوبة 100%',
      specEn: 'Calacatta Quartz · Blum Hinges · Moisture Proof',
      image: '/images/hero-kitchen.jpg'
    },
    {
      id: 'wardrobe',
      titleAr: 'غرفة ملابس روما البانورامية (Walk-in)',
      titleEn: 'Roma Panoramic Walk-in Wardrobe',
      tagAr: 'أنظمة الخزائن المعمارية الفاخرة',
      tagEn: 'Boutique Hotel Wardrobe Series',
      specAr: 'زجاج مصلد مدخن · إضاءة طولية · تنظيم ذكي',
      specEn: 'Smoked Glass · Linear LED · Smart Organizers',
      image: '/images/wardrobe-roma.jpg'
    },
    {
      id: 'living',
      titleAr: 'وحدات الصالات والمجالس العصرية',
      titleEn: 'Integrated Living & Media Suite',
      tagAr: 'هندسة الجدران والديكورات المتكاملة',
      tagEn: 'Bespoke Wall & Media Architecture',
      specAr: 'بديل الرخام الطبيعي · خشب مخطط · خزائن عائمة',
      specEn: 'Imported Marble Slab · Fluted Wood · Floating Units',
      image: '/images/villa-living.jpg'
    }
  ];

  // Auto advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F2F8F9] via-[#FAFDFD] to-[#FFFFFF] pt-3 sm:pt-6 pb-8 sm:pb-14 lg:pt-8 lg:pb-16 border-b border-[#E6EFF1]"
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#009AA6]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[#E6F3F5] to-transparent rounded-full blur-2xl" />
        {/* Subtle architectural grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(7, 51, 59, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(7, 51, 59, 0.03) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced 6 & 6 Grid Layout for Perfect Visual Symmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* TEXT & HERO VALUE CONTENT COLUMN (6 cols on desktop)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            
            {/* Omani Market & OPPEIN Exclusive Authority Tag */}
            <div className="inline-flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-[#00818B] mb-2.5 sm:mb-3 bg-white/85 backdrop-blur-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#D0E4E7] shadow-2xs animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out fill-mode-backwards">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0 animate-pulse" />
              <span>{isAr ? 'الوكيل الحصري لشركة OPPEIN العالمية في عمان' : 'Exclusive Agent for OPPEIN in Oman'}</span>
              <span className="text-[#A5C3C8] hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-[#07333B] font-bold hidden sm:inline">{isAr ? 'خبرة 20 عاماً' : '20 Years'}</span>
            </div>

            {/* Core Headline with Tasteful Animated Entrance */}
            <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-black leading-[1.3] sm:leading-[1.2] text-[#07333B] tracking-tight text-balance mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 ease-out fill-mode-backwards">
              {isAr ? (
                <>
                  حلول <span className="text-[#009AA6] inline-block">المطابخ والخزائن</span> والأثاث العصري
                </>
              ) : (
                <>
                  Bespoke <span className="text-[#009AA6] inline-block">Kitchens & Wardrobe</span> Architecture
                </>
              )}
            </h1>

            {/* Subtitle from the original brand */}
            <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-[#33565F] leading-relaxed max-w-xl mb-3.5 sm:mb-5 font-normal animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 ease-out fill-mode-backwards">
              {isAr
                ? 'تصاميم عصرية وجودة عالمية لمنزلك في سلطنة عمان. نبتكر مساحات معيشية راقية تجمع بين اللمسة الإيطالية وخامات أوروبية معتمدة ومقاومة لبيئة الخليج.'
                : 'Contemporary European designs and world-class craftsmanship. Transforming prestigious Omani residences with tailored ergonomics and 10-year warranted materials.'}
            </p>

            {/* Architectural Trust Points (Zero-Pill discipline: unboxed check items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-lg mb-4 sm:mb-6 text-xs sm:text-sm text-[#1E4852] animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 ease-out fill-mode-backwards">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009AA6] shrink-0" />
                <span className="font-medium">
                  {isAr ? 'ألواح معالجة مقاومة للرطوبة 100%' : '100% Moisture Proof Gulf-Grade'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009AA6] shrink-0" />
                <span className="font-medium">
                  {isAr ? 'مفصلات بلوم (Blum) النمساوية الأصلية' : 'Original Austrian Blum Hardware'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009AA6] shrink-0" />
                <span className="font-medium">
                  {isAr ? 'مخططات ثلاثية الأبعاد 3D مجاناً' : 'Free Photorealistic 3D Renders'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#009AA6] shrink-0" />
                <span className="font-medium">
                  {isAr ? 'ضمان كتابي معتمد لمدة 10 سنوات' : '10-Year Documented Warranty'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto mb-5 sm:mb-7 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 ease-out fill-mode-backwards">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-[#009AA6] hover:bg-[#00818B] active:scale-[0.98] rounded-xl shadow-[0_4px_16px_rgba(0,154,166,0.3)] transition-all duration-150 cursor-pointer min-h-[46px]"
              >
                <span>{isAr ? 'احجز استشارتك المجانية 3D' : 'Book Free 3D Consultation'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4 shrink-0" /> : <ArrowRight className="w-4 h-4 shrink-0" />}
              </button>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#07333B] bg-white hover:bg-[#F3F8F9] active:scale-[0.98] border border-[#B8D8DC] hover:border-[#009AA6] rounded-xl transition-all duration-150 shadow-2xs cursor-pointer min-h-[46px]"
              >
                <Layers className="w-4 h-4 text-[#009AA6] shrink-0" />
                <span>{isAr ? 'تصفح الكتالوج 2026' : 'Explore 2026 Catalog'}</span>
              </button>
            </div>

            {/* Trust Markers Bar (Zero-Pill discipline: unboxed text with subtle dividers) */}
            <div className="pt-3.5 sm:pt-4 border-t border-[#DFEAEB] w-full grid grid-cols-3 gap-2 sm:gap-4 text-[#1C4650]">
              <div className="flex flex-col text-center sm:text-start">
                <span className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07333B] tabular-nums tracking-tight">20+</span>
                <span className="text-[11px] sm:text-xs text-[#52747D] mt-0.5 font-medium leading-snug">
                  {isAr ? 'عاماً بالسوق العماني' : 'Years in Oman'}
                </span>
              </div>
              <div className="flex flex-col border-x border-[#DFEAEB] px-1.5 sm:px-4 text-center sm:text-start">
                <span className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#07333B] tabular-nums tracking-tight">10</span>
                <span className="text-[11px] sm:text-xs text-[#52747D] mt-0.5 font-medium leading-snug">
                  {isAr ? 'سنوات ضمان كتابي' : 'Years Warranty'}
                </span>
              </div>
              <div className="flex flex-col text-center sm:text-start">
                <span className="text-xl sm:text-2xl lg:text-[1.65rem] font-black text-[#009AA6] tabular-nums tracking-tight">2,400+</span>
                <span className="text-[11px] sm:text-xs text-[#52747D] mt-0.5 font-medium leading-snug">
                  {isAr ? 'مشروع منجز في عمان' : 'Delivered Projects'}
                </span>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* ARCHITECTURAL SHOWCASE VISUAL CARRIER (6 cols on desktop) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative mt-1 sm:mt-3 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#D5E5E8] shadow-[0_12px_36px_rgba(7,51,59,0.08)] group">
              
              {/* Image Frame with Balanced Aspect Ratio and Seamless Soft White Merge */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#EBF4F5] via-[#F8FBFC] to-[#E5F1F3]">
                {/* Active Photo with Intersection Observer Lazy Load & Smooth Transition */}
                <LazyImage
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={isAr ? currentSlide.titleAr : currentSlide.titleEn}
                  priority={activeSlide === 0}
                  aspectRatioClass="w-full h-full"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackComponent={
                    <div className="w-full h-full bg-[#0A3641] flex items-center justify-center p-6 text-white text-center">
                      <span className="font-bold text-sm">OPPEIN & Sindbad Architecture</span>
                    </div>
                  }
                />

                {/* Subtle Brand Teal Scrim for Top Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07333B]/40 via-transparent to-transparent pointer-events-none" />

                {/* SOFT WHITE-TO-TRANSPARENT OVERLAY AT THE BOTTOM TO SEAMLESSLY MERGE WITH CONTENT BELOW */}
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

                {/* Top Badge: Collection & Switcher Indicators */}
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between gap-2 pointer-events-auto z-20">
                  <div className="bg-[#07333B]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:py-1.5 rounded-lg border border-white/20 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FFA726]" />
                    <span>{isAr ? currentSlide.tagAr : currentSlide.tagEn}</span>
                  </div>

                  {/* Navigation Arrows for Hero Carousel */}
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-0.5 sm:p-1 rounded-lg border border-[#CCE0E3] shadow-2xs">
                    <button
                      onClick={() =>
                        setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                      }
                      className="p-1 text-[#07333B] hover:text-[#009AA6] transition-colors cursor-pointer"
                      aria-label="Previous showcase"
                    >
                      {isAr ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold px-1 text-[#07333B]">
                      {activeSlide + 1}/{heroSlides.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveSlide((prev) => (prev + 1) % heroSlides.length)
                      }
                      className="p-1 text-[#07333B] hover:text-[#009AA6] transition-colors cursor-pointer"
                      aria-label="Next showcase"
                    >
                      {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* SVG Fallback */}
                <div className="hero-svg-fallback hidden absolute inset-0">
                  <svg
                    className="w-full h-full object-cover"
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="800" height="600" fill="#E8F1F3" />
                    <rect x="50" y="50" width="700" height="500" rx="6" fill="#0A3641" />
                    <text x="400" y="300" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold">
                      OPPEIN & Sindbad Architecture
                    </text>
                  </svg>
                </div>

                {/* Floating Information Glass Card at Bottom (Positioned comfortably over the soft white gradient) */}
                <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-[#D5E6E9] shadow-md z-20">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#07333B] truncate">
                        {isAr ? currentSlide.titleAr : currentSlide.titleEn}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#52747D] truncate mt-0.5">
                        {isAr ? currentSlide.specAr : currentSlide.specEn}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#009AA6] bg-[#EBF4F5] px-2 py-0.5 sm:py-1 rounded-md">
                      <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      <span>10Y</span>
                    </div>
                  </div>

                  {/* Slide Selector Indicators (Dots) */}
                  <div className="flex items-center justify-center gap-1.5 mt-2 pt-1.5 border-t border-[#EDF4F5]">
                    {heroSlides.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeSlide === idx ? 'w-5 sm:w-6 bg-[#009AA6]' : 'w-1.5 sm:w-2 bg-[#D1E4E7] hover:bg-[#88AFB6]'
                        }`}
                        aria-label={`Show ${s.id}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom strip of the showcase card */}
              <div className="p-2.5 sm:p-3.5 bg-[#FAFDFD] border-t border-[#E8EFF1] flex flex-wrap items-center justify-between gap-2 text-xs text-[#52747D]">
                <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#009AA6] shrink-0" />
                  {isAr ? 'معاينة ثلاثية الأبعاد 3D مجانية' : 'Free 3D Photorealistic Render'}
                </span>
                <span className="text-[#07333B] font-semibold text-[11px] sm:text-xs">
                  {isAr ? 'صالات عرض متكاملة في عمان' : 'Showrooms Across Oman'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
