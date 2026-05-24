<?php 
require_once __DIR__ . '/functions.php'; 

// Dynamic URL and Canonical Configuration
$site_url = "https://matchmaker-frankfurt.de";
$base_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
$canonical_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Strip base directory for local subfolders so canonical matches production domain root
if (!empty($base_dir) && strpos($canonical_path, $base_dir) === 0) {
    $canonical_path = substr($canonical_path, strlen($base_dir));
}

// 1. Remove .php extension if present (Clean URLs)
$canonical_path = preg_replace('/\.php$/', '', $canonical_path);

// 2. Identify if it's a file (has extension like .css, .js, .png) or Root
$is_file_or_root = ($canonical_path === '/' || preg_match('/\.[a-z0-9]{2,4}$/i', $canonical_path));

// 3. Enforce Trailing Slash for non-files (Directories)
if (!$is_file_or_root) {
    $canonical_path = rtrim($canonical_path, '/') . '/';
} else {
    if ($canonical_path !== '/') {
        $canonical_path = rtrim($canonical_path, '/');
    }
}
$canonical_url = $site_url . $canonical_path;

// Structured Data (JSON-LD Schema) for Local SEO Frankfurt
$schemaOrgPayload = [
    "@context" => "https://schema.org",
    "@type" => ["LocalBusiness", "ProfessionalService"],
    "@id" => $site_url . "/#business",
    "name" => "MatchMaker Frankfurt",
    "image" => $site_url . "/assets/images/portrait-after.png",
    "url" => $site_url,
    "telephone" => "+49 1515 1941586",
    "email" => "info@olenberg-media.de",
    "priceRange" => "$$",
    "description" => "Professioneller Dating-Fotograf in Frankfurt. Authentische Fotos für Tinder, Bumble, Hinge & Co., die für mehr Matches und echten Erfolg sorgen.",
    "address" => [
        "@type" => "PostalAddress",
        "streetAddress" => "Sossenheimer Riedstraße 18",
        "addressLocality" => "Frankfurt am Main",
        "postalCode" => "65936",
        "addressRegion" => "HE",
        "addressCountry" => "DE"
    ],
    "geo" => [
        "@type" => "GeoCoordinates",
        "latitude" => "50.1203713",
        "longitude" => "8.5700265"
    ],
    "areaServed" => [
        ["@type" => "City", "name" => "Frankfurt am Main"],
        ["@type" => "City", "name" => "Wiesbaden"],
        ["@type" => "City", "name" => "Mainz"],
        ["@type" => "City", "name" => "Darmstadt"],
        ["@type" => "City", "name" => "Offenbach am Main"],
        ["@type" => "City", "name" => "Bad Homburg vor der Höhe"],
        ["@type" => "City", "name" => "Kronberg im Taunus"],
        ["@type" => "City", "name" => "Königstein im Taunus"]
    ],
    "openingHoursSpecification" => [
        "@type" => "OpeningHoursSpecification",
        "dayOfWeek" => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens" => "09:00",
        "closes" => "20:00"
    ],
    "paymentAccepted" => "Überweisung, Bargeld",
    "currenciesAccepted" => "EUR"
];

$schemaWebsitePayload = [
    "@context" => "https://schema.org",
    "@type" => "WebSite",
    "name" => "MatchMaker Frankfurt",
    "url" => $site_url . "/"
];

$schemaWebPagePayload = [
    "@context" => "https://schema.org",
    "@type" => "WebPage",
    "@id" => $canonical_url . "#webpage",
    "url" => $canonical_url,
    "name" => isset($page_title) ? $page_title : "Tinder & Dating Fotoshooting",
    "description" => isset($meta_description) ? $meta_description : "Professionelle Fotos für dein Dating-Profil. Buche jetzt dein Shooting."
];

// Auto breadcrumb list
$breadcrumb_items = [];
$breadcrumb_items[] = [
    "@type" => "ListItem",
    "position" => 1,
    "name" => "Home",
    "item" => $site_url . "/"
];

$path_parts = array_filter(explode('/', trim($canonical_path, '/')));
$current_path = '';
$position = 2;

$breadcrumb_labels = [
    '22-gruende' => '22 Gründe',
    'warum-es-funktioniert' => 'Die Wissenschaft',
    'dein-fotograf' => 'Dein Fotograf',
    'ratgeber' => 'Ratgeber',
    'kontakt' => 'Kontakt',
    'impressum' => 'Impressum',
    'datenschutz' => 'Datenschutz',
];

foreach ($path_parts as $part) {
    $current_path .= '/' . $part;
    $label = isset($breadcrumb_labels[$part]) ? $breadcrumb_labels[$part] : ucwords(str_replace(['-', '_'], ' ', $part));
    $breadcrumb_items[] = [
        "@type" => "ListItem",
        "position" => $position,
        "name" => $label,
        "item" => $site_url . $current_path . '/'
    ];
    $position++;
}

$schemaBreadcrumbPayload = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => $breadcrumb_items
];
?>
<!DOCTYPE html>
<html lang="de" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php page_title(); ?></title>
    <?php meta_description(); ?>
    <meta name="author" content="Mark Olenberg">
    <link rel="author" type="text/plain" href="/humans.txt">

    <!-- Robot Control (Dynamic: index for public pages, noindex for legal pages) -->
    <?php if (isset($noindex) && $noindex): ?>
        <meta name="robots" content="noindex, follow">
    <?php else: ?>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <?php endif; ?>

    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo htmlspecialchars($canonical_url); ?>">

    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="MatchMaker Frankfurt">
    <meta property="og:url" content="<?php echo htmlspecialchars($canonical_url); ?>">
    <meta property="og:title" content="<?php page_title(); ?>">
    <?php if (isset($meta_description)): ?>
        <meta property="og:description" content="<?php echo htmlspecialchars($meta_description); ?>">
    <?php endif; ?>
    <meta property="og:image" content="<?php echo $site_url; ?>/assets/images/portrait-after.png">
    <meta property="og:locale" content="de_DE">

    <!-- Twitter Card -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:image" content="<?php echo $site_url; ?>/assets/images/portrait-after.png">

    <!-- Google Analytics (Loaded dynamically upon cookie consent) -->
    <script>
      function loadGoogleAnalytics() {
        if (window.googleAnalyticsLoaded) return;
        window.googleAnalyticsLoaded = true;
        
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
        document.head.appendChild(gaScript);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
      }
    </script>

    <!-- JSON-LD Schema payloads -->
    <script type="application/ld+json">
    <?php echo json_encode($schemaOrgPayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
    </script>
    <script type="application/ld+json">
    <?php echo json_encode($schemaWebsitePayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
    </script>
    <script type="application/ld+json">
    <?php echo json_encode($schemaWebPagePayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
    </script>
    <script type="application/ld+json">
    <?php echo json_encode($schemaBreadcrumbPayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
    </script>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    animation: {
                        'text-flow': 'text-flow 3s linear infinite',
                        'blob': 'blob 10s infinite',
                    },
                    keyframes: {
                        blob: {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' },
                        },
                        'text-flow': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                            '100%': { backgroundPosition: '0% 50%' },
                        }
                    }
                }
            }
        }
    </script>

    <link rel="stylesheet" href="<?php echo asset_url('assets/css/style.css'); ?>">
</head>

<body class="min-h-screen bg-[#050505] selection:bg-red-500 selection:text-white">

    <!-- Texture -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
    </div>

    <!-- MENÜ -->
    <input type="checkbox" id="menu-toggle" class="peer hidden" />
    <label for="menu-toggle" id="menu-toggle-label" role="button" tabindex="0" aria-controls="menu-overlay"
        aria-expanded="false" aria-label="Menü öffnen"
        class="fixed top-6 right-6 z-50 cursor-pointer group select-none hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-full">
        <div
            class="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300 animate-pulse">
        </div>
        <div
            class="relative w-14 h-14 bg-[#1c1c1c] rounded-full border border-white/10 flex flex-col justify-center items-center gap-[6px] shadow-2xl">
            <span class="block w-6 h-[2px] bg-white rounded-full"></span>
            <span class="block w-6 h-[2px] bg-white rounded-full"></span>
            <span class="block w-6 h-[2px] bg-white rounded-full"></span>
        </div>
    </label>
    <div class="fixed top-6 left-6 z-50 mix-blend-difference pointer-events-none">
        <a href="<?php echo $base_dir; ?>/"
            class="pointer-events-auto text-2xl font-bold tracking-tighter text-white uppercase animate-text-flow bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Match<span
                class="text-white">maker</span></a>
    </div>
    <nav id="menu-overlay"
        aria-label="Hauptnavigation"
        class="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center invisible opacity-0 peer-checked:visible peer-checked:opacity-100 transition-all duration-500 ease-in-out">
        <div class="relative z-50 text-center flex flex-col gap-6 font-bold uppercase tracking-wider">
            <a href="<?php echo $base_dir; ?>/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Home</a>
            <a href="<?php echo $base_dir; ?>/22-gruende/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">22 Gründe</a>
            <a href="<?php echo $base_dir; ?>/warum-es-funktioniert/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Die Wissenschaft</a>
            <a href="<?php echo $base_dir; ?>/dein-fotograf/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Dein Fotograf</a>
            <a href="<?php echo $base_dir; ?>/ratgeber/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Ratgeber</a>
            <a href="<?php echo $base_dir; ?>/kontakt/" class="text-3xl md:text-5xl text-white hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-sm">Kontakt</a>
        </div>
    </nav>

    <!-- Main Content Wrapper (Optional, removed padding to fit design) -->
    <main>
