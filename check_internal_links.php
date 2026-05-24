<?php
$content = file_get_contents('index.php');
preg_match_all('/href="#([^"]+)"/', $content, $matches);
$links = array_unique($matches[1]);

echo "Checking internal links:\n";
foreach ($links as $link) {
    if (strpos($content, 'id="' . $link . '"') === false) {
        echo "[MISSING] #$link target not found in index.php\n";
    } else {
        echo "[OK] #$link found\n";
    }
}
