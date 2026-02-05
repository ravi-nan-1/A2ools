
export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'zh';

export const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'zh', name: '中文' },
];

const enTranslations = {
  translation: {
    "search_placeholder": "Search tools...",
    "filter_all": "All",
    "filter_finance": "Finance",
    "filter_business": "Business",
    "filter_image": "Image",
    "filter_seo": "SEO",
    "filter_developer": "Developer",
    "filter_health": "Health",
    "Free Image/File Compressor": "Free Image/File Compressor",
    "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.",
    "use_tool": "Use Tool"
  },
};

const esTranslations = {
    translation: {
      "search_placeholder": "Buscar herramientas...",
      "filter_all": "Todos",
      "filter_finance": "Finanzas",
      "filter_business": "Negocios",
      "filter_image": "Imagen",
      "filter_seo": "SEO",
      "filter_developer": "Desarrollador",
      "filter_health": "Salud",
      "Free Image/File Compressor": "Compresor Gratuito de Imágenes/Archivos",
      "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "Comprime imágenes y archivos en línea gratis. Reduce el tamaño de archivos JPG, PNG, PDF y documentos hasta en un 90% sin perder calidad.",
      "use_tool": "Usar Herramienta"
    },
  };

const frTranslations = {
  translation: {
    "search_placeholder": "Rechercher des outils...",
    "filter_all": "Tous",
    "filter_finance": "Finance",
    "filter_business": "Affaires",
    "filter_image": "Image",
    "filter_seo": "SEO",
    "filter_developer": "Développeur",
    "filter_health": "Santé",
    "Free Image/File Compressor": "Compresseur d'Image/Fichier Gratuit",
    "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "Compressez gratuitement des images et des fichiers en ligne. Réduisez la taille des fichiers JPG, PNG, PDF et documents jusqu'à 90% sans perte de qualité.",
    "use_tool": "Utiliser l'outil"
  },
};

const deTranslations = {
  translation: {
    "search_placeholder": "Werkzeuge suchen...",
    "filter_all": "Alle",
    "filter_finance": "Finanzen",
    "filter_business": "Geschäft",
    "filter_image": "Bild",
    "filter_seo": "SEO",
    "filter_developer": "Entwickler",
    "filter_health": "Gesundheit",
    "Free Image/File Compressor": "Kostenloser Bild-/Dateikompressor",
    "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "Komprimieren Sie Bilder und Dateien kostenlos online. Reduzieren Sie die Dateigröße von JPG, PNG, PDF und Dokumenten um bis zu 90%, ohne an Qualität zu verlieren.",
    "use_tool": "Werkzeug verwenden"
  },
};

const hiTranslations = {
  translation: {
    "search_placeholder": "उपकरण खोजें...",
    "filter_all": "सभी",
    "filter_finance": "वित्त",
    "filter_business": "व्यापार",
    "filter_image": "छवि",
    "filter_seo": "एसईओ",
    "filter_developer": "डेवलपर",
    "filter_health": "स्वास्थ्य",
    "Free Image/File Compressor": "मुफ्त छवि/फ़ाइल कंप्रेसर",
    "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "छवियों और फ़ाइलों को मुफ्त में ऑनलाइन कंप्रेस करें। गुणवत्ता खोए बिना जेपीजी, पीएनजी, पीडीएफ और दस्तावेज़ फ़ाइल के आकार को 90% तक कम करें।",
    "use_tool": "उपकरण का उपयोग करें"
  },
};

const zhTranslations = {
  translation: {
    "search_placeholder": "搜索工具...",
    "filter_all": "全部",
    "filter_finance": "金融",
    "filter_business": "商业",
    "filter_image": "图片",
    "filter_seo": "搜索引擎优化",
    "filter_developer": "开发者",
    "filter_health": "健康",
    "Free Image/File Compressor": "免费图片/文件压缩器",
    "Compress images and files online for free. Reduce JPG, PNG, PDF, and document file sizes by up to 90% without losing quality.": "在线免费压缩图像和文件。在不损失质量的情况下，将JPG，PNG，PDF和文档文件大小减少多达90％。",
    "use_tool": "使用工具"
  },
};

export const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  hi: hiTranslations,
  zh: zhTranslations,
};
