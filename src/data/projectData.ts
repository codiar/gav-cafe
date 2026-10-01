import heroInteriorImg from '@/src/assets/images/hero_gav_interior_1790837541879.jpg';
import productGavLatteImg from '@/src/assets/images/product_gav_latte_1790837552389.jpg';
import productV60Img from '@/src/assets/images/product_v60_pourover_1790837564050.jpg';
import productPistachioShakeImg from '@/src/assets/images/product_pistachio_shake_1790837575534.jpg';
import productBlueMojitoImg from '@/src/assets/images/product_blue_mojito_1790837586144.jpg';
import { Product } from '../types';

export const BUSINESS_INFO = {
  name: "گاف كافيه",
  nameEn: "GAV CAFE",
  fullName: "گاف كافيه - GAV CAFE",
  brandSubtitle: "GAV Coffee house",
  category: "كافيه ومختص قهوة",
  slogan: "خذ المذاق الأصلي مع كل رشفة",
  phone: "07873779988",
  whatsapp: "07873779988",
  whatsappFormatted: "+9647873779988",
  email: "gavcaffee@gmail.com",
  city: "بابل",
  country: "العراق",
  address: "الحلة، شارع 40، محافظة بابل، العراق",
  nearestLandmark: "بابل مول – شارع 40",
  googleMapsUrl: "https://maps.app.goo.gl/QFAzVWxLec2e7Zy88",
  openingHoursText: "10:00 AM - 12:00 AM",
  openingHoursArabic: "من الساعة 10:00 ص إلى 12:00 منتصف الليل",
  orderingMethod: "إصدار فاتورة للطلب وعرضها إلى الكاشير وحفظها كصورة عند الحاجة",
  instagramUrl: "https://www.instagram.com/gavcaffee?stkn=enB1aDZvemkzcmJk",
  instagramHandle: "@gavcaffee",
  tiktokUrl: "https://www.tiktok.com/@gav.caffee",
  tiktokHandle: "@gav.caffee",
  currency: "IQD",
  currencyArabic: "د.ع",
  heroImage: heroInteriorImg,
  codiar: {
    name: "شركة كوديار تك",
    nameEn: "CODIAR TECH",
    instagramUrl: "https://www.instagram.com/codiar_tech",
    creditText: "تم تطوير الموقع من قبل شركة كوديار تك"
  }
};

export interface CategoryDef {
  id: string;
  name: string;
  nameEn: string;
  iconName: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'all', name: 'الكل', nameEn: 'All', iconName: 'Grid' },
  { id: 'coffee', name: 'مشروبات القهوة', nameEn: 'Coffee Drinks', iconName: 'Coffee' },
  { id: 'special_gav', name: 'خاص جاف', nameEn: 'SPECIAL GAV', iconName: 'Flame' },
  { id: 'summer', name: 'مشروبات الصيف', nameEn: 'Summer Drinks', iconName: 'SunMedium' },
  { id: 'juices', name: 'العصائر', nameEn: 'Juices', iconName: 'Citrus' },
  { id: 'energy', name: 'الطاقة', nameEn: 'Energy Drinks', iconName: 'Zap' },
  { id: 'hot_drinks', name: 'المشروبات الساخنة', nameEn: 'Hot Drinks', iconName: 'CupSoda' },
  { id: 'add_ons', name: 'الإضافات', nameEn: 'Add-ons', iconName: 'PlusCircle' },
];

export const SYRUP_OPTIONS = [
  { id: 'none', name: 'بدون سيرب', price: 0 },
  { id: 'vanilla', name: 'فانيليا', price: 1000 },
  { id: 'caramel', name: 'كراميل', price: 1000 },
  { id: 'hazelnut', name: 'بندق', price: 1000 },
];

export const MILK_OPTIONS = [
  { id: 'regular', name: 'حليب عادي', price: 0 },
  { id: 'oat', name: 'حليب شوفان', price: 1500 },
  { id: 'almond', name: 'حليب لوز', price: 1500 },
  { id: 'coconut', name: 'حليب جوز هند', price: 1500 },
];

export const PRODUCTS: Product[] = [
  // --- مشروبات القهوة ---
  {
    id: 'c-espresso',
    name: 'اسبرسو',
    nameEn: 'Espresso',
    category: 'coffee',
    price: 3000,
    description: 'قهوة مركزة وقوية محضرة بأفضل حبوب البن الطازجة مع كريمة ذهبية كثيفة.',
    temperature: 'hot',
    availableAddOns: { syrups: true, milkChoice: false }
  },
  {
    id: 'c-classic-latte',
    name: 'كلاسك لاتيه',
    nameEn: 'Classic Latte',
    category: 'coffee',
    price: 4000,
    description: 'جرعة إسبرسو غنية ممزوجة بحليب مبخر ناعم وطبقة خفيفة من رغوة الحليب.',
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },
  {
    id: 'c-cortado',
    name: 'كورتادو',
    nameEn: 'Cortado',
    category: 'coffee',
    price: 4000,
    description: 'توازن متساوٍ ومثالي بين الإسبرسو المركز والحليب المبخر بنسبة 1:1.',
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: true }
  },
  {
    id: 'c-skarch',
    name: 'سكارش',
    nameEn: 'Skarch',
    category: 'coffee',
    price: 5000,
    description: 'مزيج فاخر خاص يحمل نوتات سكرية مكرملة دافئة مع قوام إسبرسو غني.',
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },
  {
    id: 'c-gav-latte',
    name: 'لاتيه GAV',
    nameEn: 'GAV Latte',
    category: 'coffee',
    price: 5000,
    description: 'حليب كريمي فاخر مع لمسة GAV الحصرية وطبقات قهوة مركزة ناعمة المذاق.',
    image: productGavLatteImg,
    isPopular: true,
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },
  {
    id: 'c-alaska-americano',
    name: 'الاسكا امريكانو',
    nameEn: 'Alaska Americano',
    category: 'coffee',
    price: 4500,
    description: 'إسبرسو نقي مثلج يُسكب فوق ماء مثلج لنقاء وانتعاش لا مثيل له.',
    temperature: 'iced',
    availableAddOns: { syrups: true, milkChoice: false }
  },
  {
    id: 'c-spanish-latte',
    name: 'سبانش لاتيه',
    nameEn: 'Spanish Latte',
    category: 'coffee',
    price: 4500,
    description: 'حليب محلى منعش مدمج مع جرعة إسبرسو متوازنة لنكهة مخملية ساحرة.',
    isPopular: true,
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },
  {
    id: 'c-pistachio-latte',
    name: 'بستاشيو لاتيه',
    nameEn: 'Pistachio Latte',
    category: 'coffee',
    price: 5000,
    description: 'صوص الفستق الحلبي الطبيعي الممزوج بحليب مخملي وجرعة إسبرسو نقية.',
    isPopular: true,
    temperature: 'both',
    availableAddOns: { syrups: false, milkChoice: true }
  },
  {
    id: 'c-tiramisu-latte',
    name: 'ترامسيوم لاتيه',
    nameEn: 'Tiramisu Latte',
    category: 'coffee',
    price: 4500,
    description: 'طعم حلى التيراميسو الإيطالي الشهير برائحة القهوة والكاكاو والبسكويت.',
    temperature: 'both',
    availableAddOns: { syrups: false, milkChoice: true }
  },
  {
    id: 'c-turkish-coffee',
    name: 'تركش كوفي',
    nameEn: 'Turkish Coffee',
    category: 'coffee',
    price: 2500,
    description: 'قهوة تركية أصلية مطحونة بعناية ومطهوة على الرمل بوش كريمي غني.',
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'c-french-coffee',
    name: 'قهوة فرنسية',
    nameEn: 'French Coffee',
    category: 'coffee',
    price: 3500,
    description: 'قهوة ناعمة ممزوجة بنكهة البندق والمبيض الفاخر لقوام مخملي دافئ.',
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'c-mocha',
    name: 'موكا (White/Dark)',
    nameEn: 'Mocha (White/Dark)',
    category: 'coffee',
    price: 5000,
    description: 'شوكولاتة سويسرية فاخرة (داكنة أو بيضاء) مع إسبرسو وحليب مبخر.',
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },

  // --- SPECIAL GAV ---
  {
    id: 'sg-v60',
    name: 'V60 كيمكس',
    nameEn: 'Special V60 / Chemex',
    category: 'special_gav',
    price: 0,
    priceType: 'ask_cashier',
    description: 'تقطير يدوي كلاسيكي بحبوب بن مختصة فردية المصدر تبرز الإيحاءات العطرية الفريدة. (إسأل الكاشير عن المحاصيل المتوفرة اليوم)',
    image: productV60Img,
    isSpecial: true,
    temperature: 'both',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'sg-chemex',
    name: 'كيمكس',
    nameEn: 'Chemex Drip',
    category: 'special_gav',
    price: 0,
    priceType: 'ask_cashier',
    description: 'تحضير فلتر سميك لنقاء استثنائي وطعم قهوة صافٍ وفاكهي.',
    isSpecial: true,
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'sg-aeropress',
    name: 'اير برس',
    nameEn: 'AeroPress',
    category: 'special_gav',
    price: 0,
    priceType: 'ask_cashier',
    description: 'استخلاص هوائي سريع ينتج قواماً ممتلئاً وتركيزاً سلساً.',
    isSpecial: true,
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'sg-espresso-special',
    name: 'اسبرسو Special',
    nameEn: 'Special Espresso Shot',
    category: 'special_gav',
    price: 0,
    priceType: 'ask_cashier',
    description: 'شوت إسبرسو بمحصول مختص فاخر يتم اختياره يومياً من محامص رائدة.',
    isSpecial: true,
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'sg-hibiscus',
    name: 'كركدية',
    nameEn: 'Special Hibiscus Tea',
    category: 'special_gav',
    price: 4000,
    description: 'كركديه بلدي محضر ببطء مع نكهات انتعاش طبيعية تروي العطش.',
    isSpecial: true,
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },

  // --- مشروبات الصيف ---
  {
    id: 's-kitkat-shake',
    name: 'ميلك شيك كيت كات',
    nameEn: 'KitKat Milkshake',
    category: 'summer',
    price: 5000,
    description: 'ميلك شيك ثقيل وكريمي ممزوج بأصابع شوكولاتة كيت كات المقرمشة ورشة كاكاو.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-pistachio-shake',
    name: 'ميلك شيك بستاشيو',
    nameEn: 'Pistachio Milkshake',
    category: 'summer',
    price: 5000,
    description: 'ميلك شيك غني بالفستق الحلبي الفاخر مع طبقة كريمة وفستق مجروش طازج.',
    image: productPistachioShakeImg,
    isPopular: true,
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-oreo-shake',
    name: 'ميلك شيك اوريو',
    nameEn: 'Oreo Milkshake',
    category: 'summer',
    price: 5000,
    description: 'بسكويت الأوريو الشهير مع آيس كريم الفانيليا والحليب البارد مع صوص شوكولاتة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-strawberry-shake',
    name: 'ميلك شيك فراولة',
    nameEn: 'Strawberry Milkshake',
    category: 'summer',
    price: 5000,
    description: 'فراولة طبيعية مخفوقة مع آيس كريم كريمي لنكهة صيفية ناعمة ومنعشة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-blueberry-shake',
    name: 'ميلك شيك بلوبيري',
    nameEn: 'Blueberry Milkshake',
    category: 'summer',
    price: 5000,
    description: 'توت أزرق طازج مخفوق مع الحليب وقاعدة آيس كريم غنية.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-nutella-shake',
    name: 'ميلك شيك نوتيلا',
    nameEn: 'Nutella Milkshake',
    category: 'summer',
    price: 5000,
    description: 'شوكولاتة نوتيلا الأصلية الغنية بالبندق مع حليب وآيس كريم كلاسيكي.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-mango-smoothie',
    name: 'سموذي منجا',
    nameEn: 'Mango Smoothie',
    category: 'summer',
    price: 5000,
    description: 'مانجو استوائية طبيعية مثلجة ومخفوقة بقوام سلس ولذيذ.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-strawberry-smoothie',
    name: 'سموذي فراولة',
    nameEn: 'Strawberry Smoothie',
    category: 'summer',
    price: 5000,
    description: 'ثمار فراولة طبيعية مثلجة ومخلوطة مع الثلج ونكهة منعشة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-gav-smoothie',
    name: 'سموذي GAV',
    nameEn: 'GAV Signature Smoothie',
    category: 'summer',
    price: 5000,
    description: 'مزيج الفواكه الاستوائية السري الخاص بكافيه جاف لانتعاش فوري في الصيف.',
    isSpecial: true,
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-blueberry-smoothie',
    name: 'سموذي توت ازرق',
    nameEn: 'Blueberry Smoothie',
    category: 'summer',
    price: 5000,
    description: 'سموذي التوت الأزرق المركز الغني بمضادات الأكسدة واللون الجذاب.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-pomegranate-smoothie',
    name: 'سموذي رمان',
    nameEn: 'Pomegranate Smoothie',
    category: 'summer',
    price: 5000,
    description: 'حبات الرمان الطبيعية المثلجة مع طعم حامض حلو متوازن ومبهج.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-frozen-hibiscus',
    name: 'فروزن كركدية',
    nameEn: 'Frozen Hibiscus',
    category: 'summer',
    price: 5000,
    description: 'كركديه مثلج جرانيتا بارد جداً ونكهة توت وكركديه حامضة حلوة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-peach-icetea',
    name: 'ايس تي خوخ',
    nameEn: 'Peach Iced Tea',
    category: 'summer',
    price: 3500,
    description: 'شاي أسود مثلج متبل بخلاصة الخوخ الطبيعي وشرائح الليمون.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-passion-icetea',
    name: 'ايس تي باشن فروت',
    nameEn: 'Passion Fruit Iced Tea',
    category: 'summer',
    price: 3500,
    description: 'شاي مثلج مع خلاصة باشن فروت الاستوائية الحامضة المنعشة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 's-strawberry-icetea',
    name: 'ايس تي فراولة',
    nameEn: 'Strawberry Iced Tea',
    category: 'summer',
    price: 3500,
    description: 'شاي بارد مثلج مع نكهة الفراولة والنعناع المنعش.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },

  // --- العصائر ---
  {
    id: 'j-orange',
    name: 'عصير برتقال',
    nameEn: 'Fresh Orange Juice',
    category: 'juices',
    price: 4000,
    description: 'برتقال طبيعي 100% معصور طازجاً عند الطلب بدون سكر مضاف.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'j-sun-lemonade',
    name: 'سن ليموناضا',
    nameEn: 'Sun Lemonade',
    category: 'juices',
    price: 3000,
    description: 'ليموناضة نقية منعشة ومشرقة بلمسة حامضة وحلوة تروي الظمأ.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'j-red-lemonade',
    name: 'ريد ليموناضا',
    nameEn: 'Red Lemonade',
    category: 'juices',
    price: 3500,
    description: 'ليموناضة كلاسيكية ممزوجة بالتوت الأحمر الطازج والثلج المجروش.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'j-blue-mojito',
    name: 'بلو موهيتو',
    nameEn: 'Blue Mojito',
    category: 'juices',
    price: 4000,
    description: 'موهيتو أزرق فوار مع نعناع طازج، شرائح ليمون وصودا منعشة.',
    image: productBlueMojitoImg,
    isPopular: true,
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'j-red-mojito',
    name: 'ريد موهيتو',
    nameEn: 'Red Mojito',
    category: 'juices',
    price: 4500,
    description: 'موهيتو أحمر غني بنكهات الفراولة والتوت مع النعناع والليمون الفوار.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },

  // --- الطاقة ---
  {
    id: 'e-mexican',
    name: 'مكسيكي',
    nameEn: 'Mexican Energy Blend',
    category: 'energy',
    price: 4000,
    description: 'مشروب طاقة منعش بنكهات استوائية مميزة ولمسة حمضيات مكسيكية.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'e-redbull-gav',
    name: 'ريدبول Gav',
    nameEn: 'Red Bull GAV Edition',
    category: 'energy',
    price: 4500,
    description: 'علبة ريدبول مضاف إليها نكهات فواكه خاصة ومميزة حصرية بكافيه جاف.',
    isSpecial: true,
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'e-caffeine-dose',
    name: 'كافيني دوز',
    nameEn: 'Caffeine Dose',
    category: 'energy',
    price: 4500,
    description: 'جرعة نشاط وطاقة مكثفة تمنحك التركيز والانتعاش طوال اليوم.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },

  // --- المشروبات الساخنة ---
  {
    id: 'h-matcha-gav',
    name: 'ماتشا GAV',
    nameEn: 'GAV Ceremonial Matcha',
    category: 'hot_drinks',
    price: 5500,
    description: 'ماتشا يابانية احتفالية ناصعة الخضار مخفوقة بحليب مبخر ناعم لقوام حريري.',
    isPopular: true,
    temperature: 'both',
    availableAddOns: { syrups: true, milkChoice: true }
  },
  {
    id: 'h-iraqi-tea',
    name: 'شاي عراقي',
    nameEn: 'Traditional Iraqi Tea',
    category: 'hot_drinks',
    price: 1500,
    description: 'شاي عراقي مخدر على أصوله ومعطر بالهيل الفاخر.',
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'h-karak-tea',
    name: 'شاي كرك',
    nameEn: 'Karak Tea',
    category: 'hot_drinks',
    price: 3500,
    description: 'شاي أسود مطبوخ ببطء مع حليب مكثف ومتبل بالهيل والزعفران والقرنفل.',
    temperature: 'hot',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'h-hot-chocolate',
    name: 'شوكلا ساخنة',
    nameEn: 'Hot Chocolate',
    category: 'hot_drinks',
    price: 4000,
    description: 'شوكولاتة أوروبية ساخنة وكثيفة ممزوجة بحليب كامل الدسم وقوام مخملي.',
    temperature: 'hot',
    availableAddOns: { syrups: true, milkChoice: true }
  },

  // --- الإضافات كعناصر مستقلة في المنيو ---
  {
    id: 'ao-extra-syrup',
    name: 'شراب إضافي (Extra Syrup)',
    nameEn: 'Extra Syrup',
    category: 'add_ons',
    price: 1000,
    description: 'إضافة سيرب بنكهات فاخرة (فانيليا، كراميل، بندق) إلى أي مشروب.',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'ao-water',
    name: 'مياه شرب نقية (Water)',
    nameEn: 'Pure Bottled Water',
    category: 'add_ons',
    price: 1000,
    description: 'قنينة ماء نقية وصحية باردة.',
    temperature: 'iced',
    availableAddOns: { syrups: false, milkChoice: false }
  },
  {
    id: 'ao-change-milk',
    name: 'تغيير نوع الحليب (Change The Milk)',
    nameEn: 'Change The Milk',
    category: 'add_ons',
    price: 1500,
    description: 'استبدال الحليب العادي بحليب نباتي فاخر (شوفان، لوز، أو جوز هند).',
    availableAddOns: { syrups: false, milkChoice: false }
  }
];
