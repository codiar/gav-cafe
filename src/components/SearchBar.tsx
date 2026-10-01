import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
  isOpen?: boolean;
  onClose?: () => void;
  popularKeywords?: string[];
  onSelectKeyword?: (keyword: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  isOpen = false,
  onClose,
  popularKeywords = ['لاتيه', 'بستاشيو', 'سبانش', 'V60', 'موهيتو', 'ماتشا', 'كركدية', 'شاي كرك'],
  onSelectKeyword,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  // If used as modal/drawer
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 animate-in fade-in duration-200">
        <div className="bg-[#FAF7F2] rounded-2xl w-full max-w-xl p-5 shadow-2xl border border-[#E4D7C5] mt-12 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4D7C5] pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#4E3629]">
              <Search className="w-4 h-4 text-[#8A5D3B]" />
              <span>البحث في منيو كافيه جاف</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EFE7DE] text-[#6E5544] cursor-pointer"
                aria-label="إغلاق البحث"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن قهوة، موهيتو، سموذي، شاي، حلى..."
              className="w-full h-12 pr-11 pl-10 rounded-xl bg-white border border-[#DBCAB5] text-[#2C241D] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B] text-sm font-medium shadow-inner"
            />
            <Search className="absolute right-3.5 top-3.5 w-5 h-5 text-[#8A5D3B]" />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute left-3 top-3.5 text-[#8A5D3B] hover:text-[#2C241D] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Keywords */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-[#8C7663] block">
              كلمات بحث شائعة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => {
                    if (onSelectKeyword) onSelectKeyword(kw);
                    else onSearchChange(kw);
                  }}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#EFE7DE] text-[#5C4535] hover:bg-[#4E3629] hover:text-white transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {resultCount !== undefined && searchQuery && (
            <div className="text-xs text-[#6B5545] font-medium pt-2 border-t border-[#E4D7C5]">
              تم العثور على{' '}
              <span className="font-bold text-[#4E3629] font-mono">{resultCount}</span> صنف
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#4E3629] text-white text-xs font-bold hover:bg-[#3E2A1E] transition-colors cursor-pointer"
            >
              عرض النتائج
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Inline Search Bar
  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ابحث بالاسم أو المكونات..."
        className="w-full h-11 pr-10 pl-9 rounded-full bg-white border border-[#E0D3C1] text-xs sm:text-sm font-medium text-[#2C241D] placeholder-[#A4907E] focus:outline-none focus:ring-2 focus:ring-[#8A5D3B] shadow-sm transition-all"
      />
      <Search className="absolute right-3.5 top-3 w-4 h-4 text-[#8A5D3B]" />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute left-3 top-3 text-[#8A5D3B] hover:text-[#2C241D] cursor-pointer"
          aria-label="مسح البحث"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
