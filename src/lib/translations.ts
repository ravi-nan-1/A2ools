
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
    main: {
      title: 'AI Cheat Sheet Generator – Free PDF, URL & Text Summarizer',
      subtitle: 'Turn any long content into a clean, colorful cheat sheet in seconds. Supports PDF, web URL, text, books, class notes, and coding docs.',
    },
    creator: {
      title: 'Create Your Cheat Sheet',
      description: 'Enter content from text, a website, or a PDF to get started.',
      tabs: {
        text: 'Text',
        url: 'URL',
        pdf: 'PDF',
      },
      text: {
        placeholder: 'Paste your long content here...',
      },
      pdf: {
        upload: 'Upload PDF',
        change: 'Change PDF',
        selected: 'Selected: {{fileName}}',
      },
      button: {
        generate: 'Generate Cheat Sheet',
      },
      language: {
        label: 'Cheat Sheet Language',
        placeholder: 'Select a language',
      },
      loading: {
        default: 'Generating...',
        readingPdf: 'Reading PDF...',
        scraping: 'Scraping URL...',
        summarizingPdf: 'Summarizing {{count}} pages...',
      }
    },
    viewer: {
      title: 'Generated Cheat Sheet',
      button: {
        share: 'Share',
        download: 'Download',
      },
      error: {
        title: 'Generation Failed',
      },
      placeholder: {
        title: 'Your cheat sheet will appear here',
        description: 'Just paste your content, click generate, and let our AI work its magic!',
      },
    },
    features: {
      title: 'AI-Powered Cheat Sheet Templates for Every Subject',
      cards: {
        developer: {
          title: 'Create Developer & Coding Cheat Sheets Automatically',
          content: 'From React to Python, our AI extracts code snippets, functions, and key concepts to create the perfect developer quick reference.',
        },
        canDo: {
          title: 'What This Tool Can Do',
          items: [
            'Convert PDF → Cheat Sheet',
            'Summarize any Web URL',
            'Auto-detect subject type (Math, Coding, Medical, Business, Law)',
            'Apply colorful templates',
            'Extract formulas, key points, examples',
            'Developer mode for React & code notes',
            'Export to PDF',
            '100% free',
          ],
        },
        whoUses: {
          title: 'Who Uses This Tool?',
          items: [
            'Students preparing for exams',
            'Developers learning React, Python, JS',
            'Engineers creating formula sheets',
            'Researchers summarizing long articles',
            'Bloggers rewriting content',
            'Readers summarizing books',
          ],
        },
        whyRank: {
          title: 'Why Our Cheat Sheets Rank #1',
          items: [
            'Accurate & deeply summarized',
            'Visual, colorful templates',
            'Easy to print or save',
            'Handles long PDFs (100+ pages)',
            'Works on all devices',
            'Free forever',
          ],
        },
      },
    },
    toast: {
      inputText: {
        title: 'Input is empty',
        description: 'Please paste some text to generate a cheat sheet.',
      },
      inputUrl: {
        title: 'URL is empty',
        description: 'Please enter a URL to generate a cheat sheet.',
      },
      inputPdf: {
        title: 'No PDF file selected',
        description: 'Please select a PDF file to generate a cheat sheet.',
      },
      success: {
        title: 'Success!',
        description: 'Generated a cheat sheet for "{{contentType}}" content.',
      },
      generationFailed: {
          title: 'Generation Failed',
      },
      download: {
        title: 'Download Started',
        description: 'Your cheat sheet is being downloaded.',
      },
      share: {
        title: 'Copied to clipboard!',
        description: 'You can now share the cheat sheet text.',
      },
      invalidFile: {
          title: 'Invalid File Type',
          description: 'Please upload a PDF file.',
      }
    },
    errors: {
      noMeaningfulContent: "No meaningful content found to generate a cheat sheet. Please provide relevant text.",
      generationFailed: 'The AI model failed to generate a cheat sheet for this content. Please try again with different input.',
      unexpected: 'An unexpected error occurred.',
      clipboard: 'Failed to copy cheat sheet to clipboard.',
    }
  },
};

const esTranslations = {
    translation: {
      main: {
        title: 'Generador de Hojas de Trucos con IA – Resumidor Gratuito de PDF, URL y Texto',
        subtitle: 'Convierte cualquier contenido largo en una hoja de trucos limpia y colorida en segundos. Admite PDF, URL web, texto, libros, apuntes de clase y documentos de codificación.',
      },
      creator: {
        title: 'Crea tu Hoja de Trucos',
        description: 'Ingresa contenido desde texto, un sitio web o un PDF para comenzar.',
        tabs: {
          text: 'Texto',
          url: 'URL',
          pdf: 'PDF',
        },
        text: {
          placeholder: 'Pega tu contenido largo aquí...',
        },
        pdf: {
          upload: 'Subir PDF',
          change: 'Cambiar PDF',
          selected: 'Seleccionado: {{fileName}}',
        },
        button: {
          generate: 'Generar Hoja de Trucos',
        },
        language: {
          label: 'Idioma de la Hoja de Trucos',
          placeholder: 'Selecciona un idioma',
        },
        loading: {
            default: 'Generando...',
            readingPdf: 'Leyendo PDF...',
            scraping: 'Extrayendo URL...',
            summarizingPdf: 'Resumiendo {{count}} páginas...',
        }
      },
      viewer: {
        title: 'Hoja de Trucos Generada',
        button: {
          share: 'Compartir',
          download: 'Descargar',
        },
        error: {
          title: 'Falló la Generación',
        },
        placeholder: {
          title: 'Tu hoja de trucos aparecerá aquí',
          description: '¡Simplemente pega tu contenido, haz clic en generar y deja que nuestra IA haga su magia!',
        },
      },
      features: {
        title: 'Plantillas de Hojas de Trucos con IA para Cada Materia',
        cards: {
          developer: {
            title: 'Crea Hojas de Trucos para Desarrolladores y Codificación Automáticamente',
            content: 'Desde React hasta Python, nuestra IA extrae fragmentos de código, funciones y conceptos clave para crear la referencia rápida perfecta para desarrolladores.',
          },
          canDo: {
            title: 'Qué Puede Hacer Esta Herramienta',
            items: [
              'Convertir PDF → Hoja de Trucos',
              'Resumir cualquier URL Web',
              'Detectar automáticamente el tipo de materia (Matemáticas, Codificación, Medicina, Negocios, Derecho)',
              'Aplicar plantillas coloridas',
              'Extraer fórmulas, puntos clave, ejemplos',
              'Modo desarrollador para notas de React y código',
              'Exportar a PDF',
              '100% gratis',
            ],
          },
          whoUses: {
            title: '¿Quién Usa Esta Herramienta?',
            items: [
              'Estudiantes preparándose para exámenes',
              'Desarrolladores aprendiendo React, Python, JS',
              'Ingenieros creando hojas de fórmulas',
              'Investigadores resumiendo artículos largos',
              'Bloggers reescribiendo contenido',
              'Lectores resumiendo libros',
            ],
          },
          whyRank: {
            title: 'Por Qué Nuestras Hojas de Trucos Son #1',
            items: [
              'Resúmenes precisos y profundos',
              'Plantillas visuales y coloridas',
              'Fácil de imprimir o guardar',
              'Maneja PDFs largos (más de 100 páginas)',
              'Funciona en todos los dispositivos',
              'Gratis para siempre',
            ],
          },
        },
      },
      toast: {
        inputText: {
          title: 'La entrada está vacía',
          description: 'Por favor, pega algo de texto para generar una hoja de trucos.',
        },
        inputUrl: {
          title: 'La URL está vacía',
          description: 'Por favor, ingresa una URL para generar una hoja de trucos.',
        },
        inputPdf: {
          title: 'No se seleccionó ningún archivo PDF',
          description: 'Por favor, selecciona un archivo PDF para generar una hoja de trucos.',
        },
        success: {
          title: '¡Éxito!',
          description: 'Se generó una hoja de trucos para contenido de "{{contentType}}".',
        },
        generationFailed: {
            title: 'Falló la Generación',
        },
        download: {
          title: 'Descarga Iniciada',
          description: 'Tu hoja de trucos se está descargando.',
        },
        share: {
          title: '¡Copiado al portapapeles!',
          description: 'Ahora puedes compartir el texto de la hoja de trucos.',
        },
        invalidFile: {
            title: 'Tipo de Archivo Inválido',
            description: 'Por favor, sube un archivo PDF.',
        }
      },
      errors: {
        noMeaningfulContent: "No se encontró contenido significativo para generar una hoja de trucos. Por favor, proporciona texto relevante.",
        generationFailed: 'El modelo de IA no pudo generar una hoja de trucros para este contenido. Por favor, inténtalo de nuevo con una entrada diferente.',
        unexpected: 'Ocurrió un error inesperado.',
        clipboard: 'No se pudo copiar la hoja de trucos al portapapeles.',
      }
    },
  };

const frTranslations = {
  translation: {
    main: {
      title: 'Générateur de fiches de révision IA – Résumé gratuit de PDF, URL et texte',
      subtitle: 'Transformez n\'importe quel contenu long en une fiche de révision claire et colorée en quelques secondes. Prend en charge les PDF, les URL Web, les textes, les livres, les notes de cours et les documents de codage.',
    },
    creator: {
      title: 'Créez votre fiche de révision',
      description: 'Entrez du contenu à partir d\'un texte, d\'un site Web ou d\'un PDF pour commencer.',
      tabs: {
        text: 'Texte',
        url: 'URL',
        pdf: 'PDF',
      },
      text: {
        placeholder: 'Collez votre long contenu ici...',
      },
      pdf: {
        upload: 'Télécharger un PDF',
        change: 'Changer de PDF',
        selected: 'Sélectionné: {{fileName}}',
      },
      button: {
        generate: 'Générer une fiche de révision',
      },
      language: {
        label: 'Langue de la fiche de révision',
        placeholder: 'Sélectionnez une langue',
      },
      loading: {
        default: 'Génération en cours...',
        readingPdf: 'Lecture du PDF...',
        scraping: 'Extraction de l\'URL...',
        summarizingPdf: 'Résumé de {{count}} pages...',
      }
    },
    viewer: {
      title: 'Fiche de révision générée',
      button: {
        share: 'Partager',
        download: 'Télécharger',
      },
      error: {
        title: 'Échec de la génération',
      },
      placeholder: {
        title: 'Votre fiche de révision apparaîtra ici',
        description: 'Collez simplement votre contenu, cliquez sur générer et laissez notre IA opérer sa magie !',
      },
    },
    features: {
      title: 'Modèles de fiches de révision basés sur l\'IA pour chaque sujet',
      cards: {
        developer: {
          title: 'Créez automatiquement des fiches de révision pour développeurs et codage',
          content: 'De React à Python, notre IA extrait des extraits de code, des fonctions et des concepts clés pour créer la référence rapide parfaite pour les développeurs.',
        },
        canDo: {
          title: 'Ce que cet outil peut faire',
          items: [
            'Convertir PDF → Fiche de révision',
            'Résumer n\'importe quelle URL Web',
            'Détection automatique du type de sujet (mathématiques, codage, médical, affaires, droit)',
            'Appliquer des modèles colorés',
            'Extraire des formules, des points clés, des exemples',
            'Mode développeur pour les notes React et de code',
            'Exporter en PDF',
            '100% gratuit',
          ],
        },
        whoUses: {
          title: 'Qui utilise cet outil ?',
          items: [
            'Étudiants se préparant aux examens',
            'Développeurs apprenant React, Python, JS',
            'Ingénieurs créant des fiches de formules',
            'Chercheurs résumant de longs articles',
            'Blogueurs réécrivant du contenu',
            'Lecteurs résumant des livres',
          ],
        },
        whyRank: {
          title: 'Pourquoi nos fiches de révision sont n°1',
          items: [
            'Résumé précis et approfondi',
            'Modèles visuels et colorés',
            'Facile à imprimer ou à enregistrer',
            'Gère les longs PDF (100+ pages)',
            'Fonctionne sur tous les appareils',
            'Gratuit pour toujours',
          ],
        },
      },
    },
    toast: {
      inputText: {
        title: 'L\'entrée est vide',
        description: 'Veuillez coller du texte pour générer une fiche de révision.',
      },
      inputUrl: {
        title: 'L\'URL est vide',
        description: 'Veuillez entrer une URL pour générer une fiche de révision.',
      },
      inputPdf: {
        title: 'Aucun fichier PDF sélectionné',
        description: 'Veuillez sélectionner un fichier PDF pour générer une fiche de révision.',
      },
      success: {
        title: 'Succès !',
        description: 'Fiche de révision générée pour le contenu de type "{{contentType}}".',
      },
      generationFailed: {
          title: 'Échec de la génération',
      },
      download: {
        title: 'Téléchargement commencé',
        description: 'Votre fiche de révision est en cours de téléchargement.',
      },
      share: {
        title: 'Copié dans le presse-papiers !',
        description: 'Vous pouvez maintenant partager le texte de la fiche de révision.',
      },
      invalidFile: {
          title: 'Type de fichier invalide',
          description: 'Veuillez télécharger un fichier PDF.',
      }
    },
    errors: {
      noMeaningfulContent: "Aucun contenu significatif trouvé pour générer une fiche de révision. Veuillez fournir un texte pertinent.",
      generationFailed: 'Le modèle d\'IA n\'a pas pu générer de fiche de révision pour ce contenu. Veuillez réessayer avec une entrée différente.',
      unexpected: 'Une erreur inattendue s\'est produite.',
      clipboard: 'Échec de la copie de la fiche de révision dans le presse-papiers.',
    }
  },
};

const deTranslations = {
  translation: {
    main: {
      title: 'KI Spickzettel-Generator – Kostenloser PDF-, URL- und Text-Zusammenfasser',
      subtitle: 'Verwandeln Sie jeden langen Inhalt in Sekundenschnelle in einen sauberen, farbenfrohen Spickzettel. Unterstützt PDF, Web-URL, Text, Bücher, Unterrichtsnotizen und Programmierdokumente.',
    },
    creator: {
      title: 'Erstellen Sie Ihren Spickzettel',
      description: 'Geben Sie Inhalt aus Text, einer Website oder einem PDF ein, um zu beginnen.',
      tabs: {
        text: 'Text',
        url: 'URL',
        pdf: 'PDF',
      },
      text: {
        placeholder: 'Fügen Sie Ihren langen Inhalt hier ein...',
      },
      pdf: {
        upload: 'PDF hochladen',
        change: 'PDF ändern',
        selected: 'Ausgewählt: {{fileName}}',
      },
      button: {
        generate: 'Spickzettel generieren',
      },
      language: {
        label: 'Spickzettel-Sprache',
        placeholder: 'Wählen Sie eine Sprache',
      },
      loading: {
        default: 'Generiere...',
        readingPdf: 'Lese PDF...',
        scraping: 'Scrape URL...',
        summarizingPdf: 'Fasse {{count}} Seiten zusammen...',
      }
    },
    viewer: {
      title: 'Generierter Spickzettel',
      button: {
        share: 'Teilen',
        download: 'Herunterladen',
      },
      error: {
        title: 'Generierung fehlgeschlagen',
      },
      placeholder: {
        title: 'Ihr Spickzettel wird hier angezeigt',
        description: 'Fügen Sie einfach Ihren Inhalt ein, klicken Sie auf "Generieren" und lassen Sie unsere KI ihre Magie wirken!',
      },
    },
    features: {
      title: 'KI-gestützte Spickzettel-Vorlagen für jedes Fach',
      cards: {
        developer: {
          title: 'Entwickler- & Programmier-Spickzettel automatisch erstellen',
          content: 'Von React bis Python extrahiert unsere KI Code-Schnipsel, Funktionen und Schlüsselkonzepte, um die perfekte Schnellreferenz für Entwickler zu erstellen.',
        },
        canDo: {
          title: 'Was dieses Tool kann',
          items: [
            'PDF → Spickzettel umwandeln',
            'Jede Web-URL zusammenfassen',
            'Automatische Themenerkennung (Mathe, Programmieren, Medizin, Wirtschaft, Recht)',
            'Farbenfrohe Vorlagen anwenden',
            'Formeln, Kernpunkte, Beispiele extrahieren',
            'Entwicklermodus für React & Code-Notizen',
            'Als PDF exportieren',
            '100% kostenlos',
          ],
        },
        whoUses: {
          title: 'Wer nutzt dieses Tool?',
          items: [
            'Studenten, die sich auf Prüfungen vorbereiten',
            'Entwickler, die React, Python, JS lernen',
            'Ingenieure, die Formelsammlungen erstellen',
            'Forscher, die lange Artikel zusammenfassen',
            'Blogger, die Inhalte umschreiben',
            'Leser, die Bücher zusammenfassen',
          ],
        },
        whyRank: {
          title: 'Warum unsere Spickzettel die Nr. 1 sind',
          items: [
            'Präzise & tief zusammengefasst',
            'Visuelle, farbenfrohe Vorlagen',
            'Einfach zu drucken oder zu speichern',
            'Verarbeitet lange PDFs (100+ Seiten)',
            'Funktioniert auf allen Geräten',
            'Für immer kostenlos',
          ],
        },
      },
    },
    toast: {
      inputText: {
        title: 'Eingabe ist leer',
        description: 'Bitte fügen Sie Text ein, um einen Spickzettel zu generieren.',
      },
      inputUrl: {
        title: 'URL ist leer',
        description: 'Bitte geben Sie eine URL ein, um einen Spickzettel zu generieren.',
      },
      inputPdf: {
        title: 'Keine PDF-Datei ausgewählt',
        description: 'Bitte wählen Sie eine PDF-Datei aus, um einen Spickzettel zu generieren.',
      },
      success: {
        title: 'Erfolg!',
        description: 'Spickzettel für "{{contentType}}"-Inhalt generiert.',
      },
      generationFailed: {
          title: 'Generierung fehlgeschlagen',
      },
      download: {
        title: 'Download gestartet',
        description: 'Ihr Spickzettel wird heruntergeladen.',
      },
      share: {
        title: 'In die Zwischenablage kopiert!',
        description: 'Sie können den Spickzettel-Text jetzt teilen.',
      },
      invalidFile: {
          title: 'Ungültiger Dateityp',
          description: 'Bitte laden Sie eine PDF-Datei hoch.',
      }
    },
    errors: {
      noMeaningfulContent: "Es wurde kein aussagekräftiger Inhalt gefunden, um einen Spickzettel zu generieren. Bitte geben Sie relevanten Text an.",
      generationFailed: 'Das KI-Modell konnte für diesen Inhalt keinen Spickzettel generieren. Bitte versuchen Sie es mit einer anderen Eingabe erneut.',
      unexpected: 'Ein unerwarteter Fehler ist aufgetreten.',
      clipboard: 'Fehler beim Kopieren des Spickzettels in die Zwischenablage.',
    }
  },
};

const hiTranslations = {
  translation: {
    main: {
      title: 'एआई चीट शीट जेनरेटर – मुफ्त पीडीएफ, यूआरएल और टेक्स्ट सारांशक',
      subtitle: 'किसी भी लंबे कंटेंट को सेकंडों में एक साफ, रंगीन चीट शीट में बदलें। पीडीएफ, वेब यूआरएल, टेक्स्ट, किताबें, क्लास नोट्स और कोडिंग डॉक्स का समर्थन करता है।',
    },
    creator: {
      title: 'अपनी चीट शीट बनाएं',
      description: 'शुरू करने के लिए टेक्स्ट, वेबसाइट या पीडीएफ से कंटेंट दर्ज करें।',
      tabs: {
        text: 'टेक्स्ट',
        url: 'यूआरएल',
        pdf: 'पीडीएफ',
      },
      text: {
        placeholder: 'अपना लंबा कंटेंट यहां पेस्ट करें...',
      },
      pdf: {
        upload: 'पीडीएफ अपलोड करें',
        change: 'पीडीएफ बदलें',
        selected: 'चयनित: {{fileName}}',
      },
      button: {
        generate: 'चीट शीट जेनरेट करें',
      },
      language: {
        label: 'चीट शीट भाषा',
        placeholder: 'एक भाषा चुनें',
      },
      loading: {
        default: 'उत्पन्न हो रहा है...',
        readingPdf: 'पीडीएफ पढ़ रहा है...',
        scraping: 'यूआरएल स्क्रैप कर रहा है...',
        summarizingPdf: '{{count}} पृष्ठों का सारांश बना रहा है...',
      }
    },
    viewer: {
      title: 'जेनरेट की गई चीટ शीट',
      button: {
        share: 'शेयर करें',
        download: 'डाउनलोड करें',
      },
      error: {
        title: 'जेनरेशन विफल',
      },
      placeholder: {
        title: 'आपकी चीट शीट यहां दिखाई देगी',
        description: 'बस अपना कंटेंट पेस्ट करें, जेनरेट पर क्लिक करें, और हमारी एआई को अपना जादू चलाने दें!',
      },
    },
    features: {
      title: 'हर विषय के लिए एआई-पावर्ड चीट शीट टेम्पलेट्स',
      cards: {
        developer: {
          title: 'डेवलपर और कोडिंग चीट शीट्स स्वचालित रूप से बनाएं',
          content: 'रिएक्ट से लेकर पायथन तक, हमारी एआई कोड स्निपेट्स, फ़ंक्शंस और प्रमुख अवधारणाओं को निकालकर सही डेवलपर क्विक रेफरेंस बनाती है।',
        },
        canDo: {
          title: 'यह टूल क्या कर सकता है',
          items: [
            'पीडीएफ → चीट शीट में बदलें',
            'किसी भी वेब यूआरएल का सारांश बनाएं',
            'विषय के प्रकार का स्वतः पता लगाएं (गणित, कोडिंग, चिकित्सा, व्यवसाय, कानून)',
            'रंगीन टेम्पलेट्स लागू करें',
            'सूत्र, मुख्य बिंदु, उदाहरण निकालें',
            'रिएक्ट और कोड नोट्स के लिए डेवलपर मोड',
            'पीडीएफ में निर्यात करें',
            '100% मुफ्त',
          ],
        },
        whoUses: {
          title: 'इस टूल का उपयोग कौन करता है?',
          items: [
            'परीक्षा की तैयारी कर रहे छात्र',
            'रिएक्ट, पायथन, जेएस सीख रहे डेवलपर्स',
            'फॉर्मूला शीट बना रहे इंजीनियर्स',
            'लंबे लेखों का सारांश बना रहे शोधकर्ता',
            'कंटेंट को फिर से लिख रहे ब्लॉगर्स',
            'किताबों का सारांश बना रहे पाठक',
          ],
        },
        whyRank: {
          title: 'हमारी चीટ शीट्स #1 क्यों हैं',
          items: [
            'सटीक और गहरा सारांश',
            'दृश्य, रंगीन टेम्पलेट्स',
            'प्रिंट करने या सहेजने में आसान',
            'लंबी पीडीएफ (100+ पृष्ठ) संभालता है',
            'सभी उपकरणों पर काम करता है',
            'हमेशा के लिए मुफ्त',
          ],
        },
      },
    },
    toast: {
      inputText: {
        title: 'इनपुट खाली है',
        description: 'चीट शीट बनाने के लिए कृपया कुछ टेक्स्ट पेस्ट करें।',
      },
      inputUrl: {
        title: 'यूआरएल खाली है',
        description: 'चीट शीट बनाने के लिए कृपया एक यूआरएल दर्ज करें।',
      },
      inputPdf: {
        title: 'कोई पीडीएफ फाइल नहीं चुनी गई',
        description: 'चीट शीट बनाने के लिए कृपया एक पीडीएफ फाइल चुनें।',
      },
      success: {
        title: 'सफलता!',
        description: '"{{contentType}}" कंटेंट के लिए एक चीट शीट जेनरेट की गई।',
      },
      generationFailed: {
          title: 'जेनरेशन विफल',
      },
      download: {
        title: 'डाउनलोड शुरू हुआ',
        description: 'आपकी चीट शीट डाउनलोड हो रही है।',
      },
      share: {
        title: 'क्लिपबोर्ड पर कॉपी किया गया!',
        description: 'अब आप चीट शीट टेक्स्ट साझा कर सकते हैं।',
      },
      invalidFile: {
          title: 'अमान्य फ़ाइल प्रकार',
          description: 'कृपया एक पीडीएफ फाइल अपलोड करें।',
      }
    },
    errors: {
      noMeaningfulContent: "चीट शीट बनाने के लिए कोई सार्थक सामग्री नहीं मिली। कृपया प्रासंगिक पाठ प्रदान करें।",
      generationFailed: 'एआई मॉडल इस सामग्री के लिए एक चीट शीट बनाने में विफल रहा। कृपया भिन्न इनपुट के साथ पुनः प्रयास करें।',
      unexpected: 'एक अप्रत्याशित त्रुटि हुई।',
      clipboard: 'चीट शीट को क्लिपबोर्ड पर कॉपी करने में विफल।',
    }
  },
};

const zhTranslations = {
  translation: {
    main: {
      title: 'AI 备忘单生成器 – 免费 PDF、URL 和文本摘要器',
      subtitle: '在几秒钟内将任何长内容变成干净、多彩的备忘单。支持 PDF、网页 URL、文本、书籍、课堂笔记和编码文档。',
    },
    creator: {
      title: '创建您的备忘单',
      description: '从文本、网站或 PDF 输入内容以开始。',
      tabs: {
        text: '文本',
        url: '网址',
        pdf: 'PDF',
      },
      text: {
        placeholder: '在此处粘贴您的长内容...',
      },
      pdf: {
        upload: '上传 PDF',
        change: '更改 PDF',
        selected: '已选择: {{fileName}}',
      },
      button: {
        generate: '生成备忘单',
      },
      language: {
        label: '备忘单语言',
        placeholder: '选择一种语言',
      },
      loading: {
        default: '正在生成...',
        readingPdf: '正在阅读PDF...',
        scraping: '正在抓取URL...',
        summarizingPdf: '正在总结 {{count}} 页...',
      }
    },
    viewer: {
      title: '生成的备忘单',
      button: {
        share: '分享',
        download: '下载',
      },
      error: {
        title: '生成失败',
      },
      placeholder: {
        title: '您的备忘单将出现在这里',
        description: '只需粘贴您的内容，点击生成，然后让我们的 AI 发挥其魔力！',
      },
    },
    features: {
      title: '适用于各科目的 AI 驱动的备忘单模板',
      cards: {
        developer: {
          title: '自动创建开发人员和编码备忘单',
          content: '从 React 到 Python，我们的 AI 提取代码片段、函数和关键概念，为开发人员创建完美的快速参考。',
        },
        canDo: {
          title: '此工具的功能',
          items: [
            '转换 PDF → 备忘单',
            '总结任何网页 URL',
            '自动检测主题类型（数学、编码、医学、商业、法律）',
            '应用彩色模板',
            '提取公式、要点、示例',
            'React 和代码笔记的开发者模式',
            '导出为 PDF',
            '100% 免费',
          ],
        },
        whoUses: {
          title: '谁在使用此工具？',
          items: [
            '准备考试的学生',
            '学习 React、Python、JS 的开发人员',
            '创建公式表的工程师',
            '总结长篇文章的研究人员',
            '改写内容的博主',
            '总结书籍的读者',
          ],
        },
        whyRank: {
          title: '为什么我们的备忘单排名第一',
          items: [
            '准确而深入的总结',
            '视觉化、多彩的模板',
            '易于打印或保存',
            '处理长 PDF（100+ 页）',
            '适用于所有设备',
            '永久免费',
          ],
        },
      },
    },
    toast: {
      inputText: {
        title: '输入为空',
        description: '请粘贴一些文本以生成备忘单。',
      },
      inputUrl: {
        title: 'URL 为空',
        description: '请输入 URL 以生成备忘单。',
      },
      inputPdf: {
        title: '未选择 PDF 文件',
        description: '请选择一个 PDF 文件以生成备忘单。',
      },
      success: {
        title: '成功！',
        description: '已为“{{contentType}}”内容生成备忘单。',
      },
      generationFailed: {
          title: '生成失败',
      },
      download: {
        title: '下载已开始',
        description: '您的备忘单正在下载中。',
      },
      share: {
        title: '已复制到剪贴板！',
        description: '您现在可以分享备忘单文本了。',
      },
      invalidFile: {
          title: '无效的文件类型',
          description: '请上传 PDF 文件。',
      }
    },
    errors: {
      noMeaningfulContent: "未找到有意义的内容来生成备忘单。请提供相关文本。",
      generationFailed: 'AI 模型未能为此内容生成备忘单。请尝试使用不同的输入重试。',
      unexpected: '发生意外错误。',
      clipboard: '无法将备忘单复制到剪贴板。',
    }
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
