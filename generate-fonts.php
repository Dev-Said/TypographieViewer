<?php
/**
 * Script PHP pour générer automatiquement le fichier fonts.json
 * à partir des polices présentes dans /public/fonts/
 */

// Définir le chemin du dossier des polices
$fontsDir = __DIR__ . '/public/fonts/';
$outputFile = __DIR__ . '/public/fonts.json';

// Extensions de polices supportées
$supportedExtensions = ['ttf', 'otf', 'woff', 'woff2', 'eot'];

// Vérifier si le dossier des polices existe
if (!is_dir($fontsDir)) {
    echo "❌ Erreur : Le dossier /public/fonts/ n'existe pas.\n";
    echo "Créez-le d'abord avec : mkdir -p public/fonts\n";
    exit(1);
}

// Fonction récursive pour scanner les polices
function scanFontsRecursive($dir, $baseDir, $supportedExtensions) {
    $fonts = [];
    $items = scandir($dir);
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $fullPath = $dir . '/' . $item;
        $relativePath = str_replace($baseDir, '', $fullPath);
        
        if (is_dir($fullPath)) {
            // Si c'est un dossier, scanner récursivement
            $subFonts = scanFontsRecursive($fullPath, $baseDir, $supportedExtensions);
            $fonts = array_merge($fonts, $subFonts);
        } else {
            // Si c'est un fichier, vérifier l'extension
            $pathInfo = pathinfo($item);
            $extension = strtolower($pathInfo['extension'] ?? '');
            
            if (in_array($extension, $supportedExtensions)) {
                // Créer un nom unique incluant le dossier parent si nécessaire
                $folderName = basename(dirname($fullPath));
                $fontName = ($folderName !== 'fonts') ? $folderName . '-' . $pathInfo['filename'] : $pathInfo['filename'];
                
                $fonts[] = [
                    'name' => $fontName,
                    'file' => '/fonts' . $relativePath,
                    'folder' => ($folderName !== 'fonts') ? $folderName : null
                ];
            }
        }
    }
    
    return $fonts;
}

// Scanner le dossier des polices de manière récursive
$fonts = scanFontsRecursive($fontsDir, $fontsDir, $supportedExtensions);
$fontCount = count($fonts);

// Trier les polices par nom
usort($fonts, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

// Générer le fichier JSON
$jsonContent = json_encode($fonts, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

if (file_put_contents($outputFile, $jsonContent) !== false) {
    echo "✅ Fichier fonts.json généré avec $fontCount polices.\n";
    
    // Afficher la liste des polices trouvées
    if ($fontCount > 0) {
        echo "\n📝 Polices détectées :\n";
        foreach ($fonts as $font) {
            echo "  - " . $font['name'] . " (" . basename($font['file']) . ")\n";
        }
    } else {
        echo "\n⚠️  Aucune police trouvée dans /public/fonts/\n";
        echo "Extensions supportées : " . implode(', ', $supportedExtensions) . "\n";
    }
} else {
    echo "❌ Erreur : Impossible d'écrire le fichier fonts.json\n";
    exit(1);
}

echo "\n🚀 Vous pouvez maintenant lancer l'application React avec : npm start\n";
?>
