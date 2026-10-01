import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Share2,
  BookOpen,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { CATALOG_PAGES } from '../data/sindbadData';
import { SindbadLogo } from './SindbadLogo';
import { FadeIn } from './FadeIn';
import { LazyImage } from './ImageWithFallback';

interface CatalogSectionProps {
  lang: Language;
  onOpenConsultation: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  lang,
  onOpenConsultation
}) => {
  const isAr = lang === 'ar';
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const page = CATALOG_PAGES[currentPage];

  const handleNext = () => {
    if (currentPage < CATALOG_PAGES.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="catalog" className="py-16 lg:py-24 bg-[#F2F7F8] relative border-b border-[#E3EDEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <FadeIn direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#009AA6] uppercase mb-2 block">
            {isAr ? 'كتالوج أوبين والسندباد 2026' : 'OPPEIN & Sindbad 2026 Lookbook'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07333B] tracking-tight">
            {isAr ? 'تصفح الكتالوج التفاعلي' : 'Browse the Digital Catalog'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4E7079]">
            {isAr
              ? 'استكشف تشكيلاتنا الكاملة من المطابخ وخزائن الملابس والإكسسوارات الأوروبية من خلال الكتالوج الرقمي.'
              : 'Browse our full range of products, finishes, and interior architecture through the interactive catalog.'}
          </p>
        </FadeIn>

        {/* Digital Reader Box */}
        <FadeIn direction="up" delay={150} className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#CCE0E3] shadow-lg overflow-hidden">
          
          {/* Reader Top Bar */}
          <div className="px-6 py-3.5 bg-[#FAFDFD] border-b border-[#E2ECEE] flex items-center justify-between text-xs text-[#52747D]">
            <div className="flex items-center gap-2 font-bold text-[#07333B]">
              <BookOpen className="w-4 h-4 text-[#009AA6]" />
              <span>{isAr ? 'كتالوج السندباد السنوي 2026' : 'Sindbad Annual Catalog 2026'}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold">
                {isAr ? `صفحة ${currentPage + 1} من ${CATALOG_PAGES.length}` : `Page ${currentPage + 1} of ${CATALOG_PAGES.length}`}
              </span>
              <button
                onClick={handleDownload}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F8F9] hover:bg-[#E2F2F4] text-[#009AA6] font-bold rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess ? (isAr ? 'جاري التحميل...' : 'Downloading...') : (isAr ? 'تحميل PDF' : 'Download PDF')}</span>
              </button>
            </div>
          </div>

          {/* Reader Main Display Surface */}
          <div className="relative min-h-[460px] sm:min-h-0 sm:aspect-[16/9] w-full bg-[#0A3641] flex items-center justify-center p-3 sm:p-8 select-none">
            
            {/* Page 1: Replicating exact cover from screenshot */}
            {currentPage === 0 && (
              <div
                className={`w-full max-w-2xl min-h-[400px] sm:min-h-0 sm:aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative flex flex-col justify-between p-6 sm:p-10 border border-white/10 transition-transform duration-300 ${
                  isZoomed ? 'scale-105 sm:scale-110' : 'scale-100'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #072F37 0%, #0B4653 50%, #0F5E6F 100%)'
                }}
              >
                {/* 3D Isometric Architectural Cubes Pattern (replicating the cover in screenshot) */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 600 400" fill="none">
                    <polygon points="400,100 480,60 560,100 480,140" fill="#00D1E0" />
                    <polygon points="400,100 480,140 480,240 400,200" fill="#009AA6" />
                    <polygon points="480,140 560,100 560,200 480,240" fill="#00727B" />

                    <polygon points="480,220 540,190 600,220 540,250" fill="#00D1E0" opacity="0.7" />
                    <polygon points="480,220 540,250 540,320 480,290" fill="#009AA6" opacity="0.7" />
                    <polygon points="540,250 600,220 600,290 540,320" fill="#00727B" opacity="0.7" />

                    <polygon points="320,180 390,145 460,180 390,215" fill="#00D1E0" opacity="0.5" />
                    <polygon points="320,180 390,215 390,290 320,255" fill="#009AA6" opacity="0.5" />
                    <polygon points="390,215 460,180 460,255 390,290" fill="#00727B" opacity="0.5" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <SindbadLogo variant="white" size="md" />
                </div>

                <div className="relative z-10 my-auto text-white py-4 sm:py-0">
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#00D1E0] uppercase block mb-1">
                    OPPEIN EXCLUSIVE COLLECTION 2026
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                    BUILD YOUR DREAM HOME
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B7DDE3] max-w-md font-light leading-relaxed">
                    {isAr
                      ? 'تصاميم عصرية وجودة عالمية لمنزلك — سلطنة عمان'
                      : 'Contemporary designs and world-class cabinetry for your prestigious home.'}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-white/80 text-[11px] pt-4 border-t border-white/10">
                  <span>SINDBADOM.COM</span>
                  <span>OPPEIN OMAN 2026</span>
                </div>
              </div>
            )}

            {/* Page 2: Modern Kitchens spread */}
            {currentPage === 1 && (
              <div className="w-full max-w-2xl min-h-[400px] sm:min-h-0 sm:aspect-[16/10] bg-white rounded-xl shadow-2xl p-4 sm:p-7 flex flex-col justify-between text-[#07333B]">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#EAF2F4] pb-2 mb-3">
                      <span className="text-[11px] sm:text-xs font-bold text-[#009AA6] uppercase">
                        {page.category} · Section 01
                      </span>
                      <span className="text-xs font-mono text-[#71929B]">P. 02</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <div className="sm:col-span-7">
                        <h3 className="text-base sm:text-xl font-bold mb-1.5 leading-snug">{page.titleAr}</h3>
                        <p className="text-xs text-[#52747D] leading-relaxed mb-3">{page.highlightAr}</p>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 bg-[#F0F8F9] rounded-lg border border-[#D5E6E9]">
                            <span className="font-bold text-[#07333B] block">خامات الكوارتز النقي</span>
                            <span className="text-[#5B7D86] text-[11px] sm:text-xs">مقاومة تامة للبقع والحرارة ومناسبة لإعداد الأطعمة بأمان.</span>
                          </div>
                          <div className="p-2.5 bg-[#F0F8F9] rounded-lg border border-[#D5E6E9]">
                            <span className="font-bold text-[#07333B] block">مفصلات بلوم تيب-أون النمساوية</span>
                            <span className="text-[#5B7D86] text-[11px] sm:text-xs">فتح ناعم بلمسة خفيفة بدون الحاجة لمقابض خارجية.</span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-5 h-full mt-2 sm:mt-0">
                        <div className="rounded-lg overflow-hidden border border-[#D5E5E8] shadow-xs aspect-[16/10] sm:aspect-[4/3] w-full">
                          <LazyImage
                            src="/images/hero-kitchen.jpg"
                            alt="Modern Kitchen Lookbook"
                            aspectRatioClass="w-full h-full"
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-3 border-t border-[#EEF4F5] flex justify-between text-[11px] text-[#63858E]">
                    <span>السندباد للمطابخ الحديثة</span>
                    <span>المعبيلة · العذيبة · عبري · صلالة</span>
                  </div>
                </div>
              </div>
            )}

            {/* Page 3: Luxury Wardrobes spread */}
            {currentPage === 2 && (
              <div className="w-full max-w-2xl min-h-[400px] sm:min-h-0 sm:aspect-[16/10] bg-white rounded-xl shadow-2xl p-4 sm:p-7 flex flex-col justify-between text-[#07333B]">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#EAF2F4] pb-2 mb-3">
                      <span className="text-[11px] sm:text-xs font-bold text-[#009AA6] uppercase">
                        {page.category} · Section 02
                      </span>
                      <span className="text-xs font-mono text-[#71929B]">P. 03</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <div className="sm:col-span-7">
                        <h3 className="text-base sm:text-xl font-bold mb-1.5 leading-snug">{page.titleAr}</h3>
                        <p className="text-xs text-[#52747D] leading-relaxed mb-3">{page.highlightAr}</p>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 bg-[#F0F8F9] rounded-lg border border-[#D5E6E9]">
                            <span className="font-bold text-[#07333B] block">زجاج مصلد رمادي فندقي</span>
                            <span className="text-[#5B7D86] text-[11px] sm:text-xs">حماية تامة من الغبار مع رؤية بانورامية أنيقة للملابس.</span>
                          </div>
                          <div className="p-2.5 bg-[#F0F8F9] rounded-lg border border-[#D5E6E9]">
                            <span className="font-bold text-[#07333B] block">تنظيم الأزياء العمانية</span>
                            <span className="text-[#5B7D86] text-[11px] sm:text-xs">مساحات تعليق مخصصة للدشداشة والعباءات والخناجر.</span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-5 h-full mt-2 sm:mt-0">
                        <div className="rounded-lg overflow-hidden border border-[#D5E5E8] shadow-xs aspect-[16/10] sm:aspect-[4/3] w-full">
                          <LazyImage
                            src="/images/wardrobe-roma.jpg"
                            alt="Wardrobe Lookbook"
                            aspectRatioClass="w-full h-full"
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-3 border-t border-[#EEF4F5] flex justify-between text-[11px] text-[#63858E]">
                    <span>حلول غرف النوم الفندقية</span>
                    <span>ضمان 10 سنوات معتمد</span>
                  </div>
                </div>
              </div>
            )}

            {/* Page 4: Technical Specifications */}
            {currentPage === 3 && (
              <div className="w-full max-w-2xl min-h-[400px] sm:min-h-0 sm:aspect-[16/10] bg-white rounded-xl shadow-2xl p-4 sm:p-7 flex flex-col justify-between text-[#07333B]">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#EAF2F4] pb-2 mb-3">
                      <span className="text-[11px] sm:text-xs font-bold text-[#009AA6] uppercase">
                        {page.category} · Section 03
                      </span>
                      <span className="text-xs font-mono text-[#71929B]">P. 04</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <div className="sm:col-span-7">
                        <h3 className="text-base sm:text-xl font-bold mb-1.5 leading-snug">{page.titleAr}</h3>
                        <p className="text-xs text-[#52747D] leading-relaxed mb-3">{page.highlightAr}</p>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 p-2 bg-[#F9FCFD] rounded border border-[#E5F0F2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#009AA6] shrink-0" />
                            <span className="text-[11px] sm:text-xs">شهادة الجودة الأوروبية ISO 9001 وشهادة E0</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-[#F9FCFD] rounded border border-[#E5F0F2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#009AA6] shrink-0" />
                            <span className="text-[11px] sm:text-xs">معالجة هيدرو-شيلد المضادة للرطوبة 100% لمناخ عمان</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-[#F9FCFD] rounded border border-[#E5F0F2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#009AA6] shrink-0" />
                            <span className="text-[11px] sm:text-xs">تحمل المفصلات لأكثر من 200,000 دورة فتح وإغلاق</span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-5 h-full mt-2 sm:mt-0">
                        <div className="rounded-lg overflow-hidden border border-[#D5E5E8] shadow-xs aspect-[16/10] sm:aspect-[4/3] w-full">
                          <LazyImage
                            src="/images/villa-living.jpg"
                            alt="Quality Certification"
                            aspectRatioClass="w-full h-full"
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2.5 mt-3 border-t border-[#EEF4F5] flex justify-between text-[11px] text-[#63858E]">
                    <span>اعتماد المصانع العالمية</span>
                    <span>الوكيل الحصري OPPEIN عمان</span>
                  </div>
                </div>
              </div>
            )}

            {/* Flipping Buttons on the Sides */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#07333B] flex items-center justify-center shadow-md disabled:opacity-20 cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === CATALOG_PAGES.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#07333B] flex items-center justify-center shadow-md disabled:opacity-20 cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Reader Interactive Controls Ribbon (Exact matching controls from screenshot) */}
          <div className="px-6 py-3.5 bg-white border-t border-[#E8F1F3] flex flex-wrap items-center justify-between gap-4">
            
            {/* Page Jumping Dots */}
            <div className="flex items-center gap-1.5">
              {CATALOG_PAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-7 h-7 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    currentPage === idx
                      ? 'bg-[#009AA6] text-white'
                      : 'bg-[#F0F5F6] text-[#52747D] hover:bg-[#E2ECEE]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Zoom / Fullscreen Controls */}
            <div className="flex items-center gap-2 text-[#52747D]">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 hover:bg-[#F0F5F6] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                title="Toggle Zoom"
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span className="hidden sm:inline">{isZoomed ? 'تصغير' : 'تكبير'}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 text-xs font-bold text-white bg-[#009AA6] hover:bg-[#00818B] rounded-lg shadow-xs transition-colors"
              >
                {isAr ? 'اطلب استشارة حول تصاميم الكتالوج' : 'Inquire About Catalog Designs'}
              </button>
            </div>

          </div>

        </FadeIn>

      </div>
    </section>
  );
};
