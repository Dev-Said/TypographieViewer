import React, { useState, useEffect } from 'react';

const FontGallery = () => {
  const [fonts, setFonts] = useState([]);
  const [demoText, setDemoText] = useState('Portez ce vieux whisky au juge blond qui fume');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null); // Pour la vue détaillée
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' ou 'comparison'
  const [selectedFontIndex, setSelectedFontIndex] = useState(0); // Pour la vue comparaison
  const [fontSize, setFontSize] = useState(24); // Taille de police pour la vue comparaison
  const [comparisonText, setComparisonText] = useState('Portez ce vieux whisky au juge blond qui fume'); // Texte pour la vue comparaison

  // Charger les polices depuis fonts.json
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const response = await fetch('/fonts.json');
        if (!response.ok) {
          throw new Error('Impossible de charger fonts.json');
        }
        const fontsData = await response.json();
        setFonts(fontsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  // Gérer la navigation clavier
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Fermer la vue détaillée avec Échap
      if (event.key === 'Escape' && selectedFont) {
        setSelectedFont(null);
        return;
      }

      // Navigation dans la vue comparaison
      if (activeTab === 'comparison' && fonts.length > 0 && !selectedFont) {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedFontIndex(prev => prev > 0 ? prev - 1 : fonts.length - 1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedFontIndex(prev => prev < fonts.length - 1 ? prev + 1 : 0);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedFont, activeTab, fonts.length]);

  // Composant pour la vue détaillée d'une police
  const FontDetailView = ({ font, onClose }) => {
    const fontFamilyName = `font-${font.name}`;
    const sampleTexts = [
      { label: 'Pangramme français', text: 'Portez ce vieux whisky au juge blond qui fume' },
      { label: 'Pangramme anglais', text: 'The quick brown fox jumps over the lazy dog' },
      { label: 'Alphabet majuscules', text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      { label: 'Alphabet minuscules', text: 'abcdefghijklmnopqrstuvwxyz' },
      { label: 'Chiffres et symboles', text: '0123456789 !@#$%^&*()+-=[]{}|;:,.<>?' },
      { label: 'Texte personnalisé', text: demoText }
    ];
    
    const fontSizes = [
      { label: 'Très petit', size: 'text-sm', px: '14px' },
      { label: 'Petit', size: 'text-base', px: '16px' },
      { label: 'Normal', size: 'text-lg', px: '18px' },
      { label: 'Grand', size: 'text-2xl', px: '24px' },
      { label: 'Très grand', size: 'text-4xl', px: '36px' },
      { label: 'Énorme', size: 'text-6xl', px: '60px' }
    ];

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Style dynamique pour la police */}
          <style>
            {`
              @font-face {
                font-family: '${fontFamilyName}';
                src: url('${font.file}') format('${getFontFormat(font.file)}');
                font-display: swap;
              }
              .font-${font.name} {
                font-family: '${fontFamilyName}', sans-serif;
              }
            `}
          </style>

          {/* En-tête */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{font.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">
                  {font.file.split('.').pop().toUpperCase()}
                </span>
                {font.folder && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    📁 {font.folder}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Contenu */}
          <div className="p-6 space-y-8">
            {/* Aperçu principal */}
            <div className="text-center">
              <div className={`font-${font.name} text-5xl leading-relaxed text-gray-800 mb-4`}>
                {demoText}
              </div>
              <p className="text-sm text-gray-500">Aperçu principal</p>
            </div>

            {/* Différentes tailles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tailles de police</h3>
              <div className="space-y-4">
                {fontSizes.map((size, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-500 font-medium min-w-20">{size.label}</span>
                      <span className="text-xs text-gray-400">({size.px})</span>
                    </div>
                    <div className={`font-${font.name} ${size.size} text-gray-800 leading-relaxed`}>
                      {demoText}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Différents textes d'exemple */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Textes d'exemple</h3>
              <div className="space-y-6">
                {sampleTexts.map((sample, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">{sample.label}</h4>
                    <div className={`font-${font.name} text-xl text-gray-800 leading-relaxed`}>
                      {sample.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caractères spéciaux */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Test de caractères</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Accents français</h4>
                  <div className={`font-${font.name} text-xl text-gray-800`}>
                    àáâäèéêëìíîïòóôöùúûüÿç ÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜŸÇ
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Ligatures</h4>
                  <div className={`font-${font.name} text-xl text-gray-800`}>
                    fi fl ff ffi ffl œ Œ æ Æ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Chemin : <code className="bg-gray-200 px-2 py-1 rounded">{font.file}</code>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant pour une carte de police
  const FontCard = ({ font }) => {
    const fontFamilyName = `font-${font.name}`;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        {/* Style dynamique pour la police */}
        <style>
          {`
            @font-face {
              font-family: '${fontFamilyName}';
              src: url('${font.file}') format('${getFontFormat(font.file)}');
              font-display: swap;
            }
            .font-${font.name} {
              font-family: '${fontFamilyName}', sans-serif;
            }
          `}
        </style>
        
        {/* Texte de démonstration avec la police */}
        <div 
          className={`font-${font.name} text-xl mb-4 leading-relaxed`}
          style={{ minHeight: '60px' }}
        >
          {demoText}
        </div>
        
        {/* Nom de la police */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              {font.name}
            </h3>
            <button
              onClick={() => setSelectedFont(font)}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors flex items-center gap-1"
              title="Voir en détail"
            >
              🔍 Détail
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {font.file.split('.').pop().toUpperCase()}
            </p>
            {font.folder && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                📁 {font.folder}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Composant pour la vue de comparaison
  const ComparisonView = () => {
    const currentFont = fonts[selectedFontIndex];
    
    if (!currentFont) return null;
    
    const fontFamilyName = `font-${currentFont.name}`;
    
    return (
      <div className="flex h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Style dynamique pour la police courante */}
        <style>
          {`
            @font-face {
              font-family: '${fontFamilyName}';
              src: url('${currentFont.file}') format('${getFontFormat(currentFont.file)}');
              font-display: swap;
            }
            .font-${currentFont.name} {
              font-family: '${fontFamilyName}', sans-serif;
            }
          `}
        </style>
        
        {/* Liste des polices à gauche */}
        <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
          <div className="p-4 border-b bg-white">
            <h3 className="font-semibold text-gray-800 mb-2">Polices disponibles</h3>
            <p className="text-xs text-gray-500">Utilisez ↑↓ pour naviguer</p>
          </div>
          
          <div className="p-2">
            {fonts.map((font, index) => (
              <div
                key={index}
                onClick={() => setSelectedFontIndex(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                  index === selectedFontIndex
                    ? 'bg-blue-100 border-2 border-blue-300 shadow-sm'
                    : 'bg-white hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="font-medium text-sm text-gray-800 mb-1">
                  {font.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {font.file.split('.').pop().toUpperCase()}
                  </span>
                  {font.folder && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      📁 {font.folder}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Zone de prévisualisation à droite */}
        <div className="flex-1 flex flex-col">
          {/* En-tête avec contrôles */}
          <div className="p-6 border-b bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{currentFont.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">
                    {currentFont.file.split('.').pop().toUpperCase()}
                  </span>
                  {currentFont.folder && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      📁 {currentFont.folder}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Contrôles de taille */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Taille:</span>
                <button
                  onClick={() => setFontSize(prev => Math.max(8, prev - 2))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold"
                >
                  −
                </button>
                <span className="text-sm font-mono min-w-12 text-center">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(prev => Math.min(120, prev + 2))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold"
                >
                  +
                </button>
                <input
                  type="range"
                  min="8"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
            
            {/* Champ de texte personnalisable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte à prévisualiser
              </label>
              <input
                type="text"
                value={comparisonText}
                onChange={(e) => setComparisonText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tapez votre texte ici..."
              />
            </div>
          </div>
          
          {/* Zone de prévisualisation principale */}
          <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm min-h-full flex items-center justify-center">
              <div 
                className={`font-${currentFont.name} text-gray-800 leading-relaxed text-center break-words max-w-full`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {comparisonText || 'Tapez du texte pour le prévisualiser'}
              </div>
            </div>
          </div>
          
          {/* Suggestions de texte */}
          <div className="p-4 border-t bg-white">
            <div className="flex flex-wrap gap-2">
              {[
                'Portez ce vieux whisky au juge blond qui fume',
                'The quick brown fox jumps over the lazy dog',
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                'abcdefghijklmnopqrstuvwxyz',
                '0123456789'
              ].map((text, index) => (
                <button
                  key={index}
                  onClick={() => setComparisonText(text)}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {text.length > 30 ? text.substring(0, 30) + '...' : text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Déterminer le format de police pour @font-face
  const getFontFormat = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const formatMap = {
      'woff2': 'woff2',
      'woff': 'woff',
      'ttf': 'truetype',
      'otf': 'opentype',
      'eot': 'embedded-opentype'
    };
    return formatMap[extension] || 'truetype';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des polices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-sm text-gray-500">
            <p>Assurez-vous que :</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Le fichier fonts.json existe dans /public/</li>
              <li>Le script PHP a été exécuté</li>
              <li>Des polices sont présentes dans /public/fonts/</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vue détaillée (modal) */}
      {selectedFont && (
        <FontDetailView 
          font={selectedFont} 
          onClose={() => setSelectedFont(null)} 
        />
      )}
      
      {/* En-tête */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Typographie Viewer
              </h1>
              <p className="text-gray-600">
                {fonts.length} police{fonts.length > 1 ? 's' : ''} disponible{fonts.length > 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Système d'onglets */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🖼️ Galerie
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'comparison'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🔍 Comparaison
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu selon l'onglet actif */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'gallery' ? (
          <>
            {/* Contrôles pour la vue galerie */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <label htmlFor="demo-text" className="block text-sm font-medium text-gray-700 mb-2">
                Texte de démonstration
              </label>
              <input
                id="demo-text"
                type="text"
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Saisissez votre texte de test..."
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  'Portez ce vieux whisky au juge blond qui fume',
                  'The quick brown fox jumps over the lazy dog',
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                  'abcdefghijklmnopqrstuvwxyz',
                  '0123456789 !@#$%^&*()'
                ].map((text, index) => (
                  <button
                    key={index}
                    onClick={() => setDemoText(text)}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {text.length > 30 ? text.substring(0, 30) + '...' : text}
                  </button>
                ))}
              </div>
            </div>

            {/* Galerie de polices */}
            {fonts.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune police trouvée
                </h2>
                <p className="text-gray-500 mb-4">
                  Ajoutez des polices dans le dossier /public/fonts/ et relancez le script PHP.
                </p>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                  php generate-fonts.php
                </code>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fonts.map((font, index) => (
                  <FontCard key={index} font={font} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Vue de comparaison */}
            {fonts.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune police trouvée
                </h2>
                <p className="text-gray-500 mb-4">
                  Ajoutez des polices dans le dossier /public/fonts/ et relancez le script PHP.
                </p>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                  php generate-fonts.php
                </code>
              </div>
            ) : (
              <ComparisonView />
            )}
          </>
        )}
      </div>

      {/* Pied de page */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Pour ajouter de nouvelles polices, placez-les dans{' '}
            <code className="bg-gray-100 px-1 py-0.5 rounded">/public/fonts/</code>
            {' '}et exécutez{' '}
            <code className="bg-gray-100 px-1 py-0.5 rounded">php generate-fonts.php</code>
          </p>
          {activeTab === 'comparison' && (
            <p className="text-xs text-gray-400">
              💡 Utilisez les flèches ↑↓ pour naviguer dans la liste des polices
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default FontGallery;
