<?php
// router.php for PHP built-in server (Matchmaker Frankfurt)

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// SECURITY: Prevent access to includes directory
if (preg_match('#^/includes/#', $uri) || preg_match('#/\\.#', $uri)) {
    http_response_code(403);
    echo "403 Forbidden";
    return;
}

// Deliver static files directly if they exist
if ($uri !== '/' && file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri) && substr($uri, -4) !== '.php') {
    return false; // Built-in server handles this
}

// Redirect direct .php requests to clean URLs (optional, matches .htaccess behavior)
if (substr($uri, -4) === '.php' && $uri !== '/router.php') {
    $clean = rtrim(substr($uri, 0, -4), '/');
    if ($clean === '/index') {
        $clean = '/';
    } else {
        $clean .= '/';
    }
    header('Location: ' . $clean, true, 301);
    exit;
}

// Force Trailing Slash for clean directory URLs (prevents duplicate content URLs)
if ($uri !== '/' && !str_contains($uri, '.') && substr($uri, -1) !== '/') {
    $redirect_url = $uri . '/';
    if (!empty($_SERVER['QUERY_STRING'])) {
        $redirect_url .= '?' . $_SERVER['QUERY_STRING'];
    }
    header('Location: ' . $redirect_url, true, 301);
    exit;
}

$clean_uri = rtrim($uri, '/');

// Home page
if ($clean_uri === '' || $clean_uri === '/') {
    require __DIR__ . '/index.php';
    return;
}

// Ratgeber routing (extracts optional slug from /ratgeber/slug/)
if (strpos($clean_uri, '/ratgeber') === 0) {
    $parts = array_values(array_filter(explode('/', $clean_uri)));
    if (count($parts) > 1) {
        $_GET['slug'] = $parts[1];
    }
    require __DIR__ . '/ratgeber.php';
    return;
}

// Map clean directory slugs to actual php files
$routes = [
    '/22-gruende' => '/22-gruende.php',
    '/warum-es-funktioniert' => '/warum-es-funktioniert.php',
    '/dein-fotograf' => '/dein-fotograf.php',
    '/kontakt' => '/kontakt.php',
    '/impressum' => '/impressum.php',
    '/datenschutz' => '/datenschutz.php',
];

if (isset($routes[$clean_uri])) {
    require __DIR__ . $routes[$clean_uri];
    return;
}

// Fallback to 404
http_response_code(404);
echo "404 Not Found: " . htmlspecialchars($uri);
