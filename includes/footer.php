</main>
<footer class="bg-[#050505] text-gray-400 pt-20 pb-12 border-t border-white/5 relative overflow-hidden">
    <!-- Subtle gradient blur background behind the footer -->
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-6 max-w-6xl relative z-10">
        <!-- 4-Column Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-sm">
            
            <!-- Column 1: Brand & Vibe -->
            <div class="space-y-4">
                <div class="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-lg">
                    Match<span class="text-red-500">maker</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed max-w-xs">
                    Premium Dating-Fotografie für Männer in Frankfurt am Main. Wir machen authentische, ungestellte Fotos, die deine Ausstrahlung hervorheben und deine Matches auf Tinder, Bumble & Hinge maximieren.
                </p>
                <div class="flex gap-4 pt-2">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram öffnen" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]">
                        <i data-lucide="camera" class="w-4 h-4"></i>
                    </a>
                    <a href="mailto:info@olenberg-media.de" aria-label="E-Mail schreiben" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>

            <!-- Column 2: Navigation -->
            <div>
                <p class="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-red-500 pl-3">Navigation</p>
                <ul class="space-y-3 text-xs">
                    <li><a href="<?php echo $base_dir; ?>/" class="hover:text-white transition-colors">Home</a></li>
                    <li><a href="<?php echo $base_dir; ?>/22-gruende/" class="hover:text-white transition-colors">22 Gründe</a></li>
                    <li><a href="<?php echo $base_dir; ?>/warum-es-funktioniert/" class="hover:text-white transition-colors">Die Wissenschaft</a></li>
                    <li><a href="<?php echo $base_dir; ?>/dein-fotograf/" class="hover:text-white transition-colors">Dein Fotograf</a></li>
                    <li><a href="<?php echo $base_dir; ?>/kontakt/" class="hover:text-white transition-colors">Kontakt</a></li>
                </ul>
            </div>

            <!-- Column 3: Legal & Cookies -->
            <div>
                <p class="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-red-500 pl-3">Rechtliches</p>
                <ul class="space-y-3 text-xs">
                    <li><a href="<?php echo $base_dir; ?>/impressum/" class="hover:text-white transition-colors">Impressum</a></li>
                    <li><a href="<?php echo $base_dir; ?>/datenschutz/" class="hover:text-white transition-colors">Datenschutz</a></li>
                    <li>
                        <button id="cookie-settings-link" class="hover:text-white transition-colors text-left focus:outline-none cursor-pointer">
                            Cookie-Einstellungen
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Column 4: Local SEO (Frankfurt Region) -->
            <div>
                <p class="text-white font-bold uppercase tracking-wider text-xs mb-6 border-l-2 border-red-500 pl-3">Einsatzgebiete</p>
                <ul class="space-y-2 text-[11px] text-gray-400">
                    <li>Frankfurt am Main</li>
                    <li>Frankfurt-Westend & Nordend</li>
                    <li>Frankfurt-Bornheim & Ostend</li>
                    <li>Frankfurt-Sachsenhausen</li>
                    <li>Rhein-Main-Gebiet (Wiesbaden, Mainz, Offenbach)</li>
                </ul>
            </div>

        </div>

        <!-- Copyright Bottom -->
        <div class="text-center text-[10px] text-gray-400 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>&copy; <?php echo date('Y'); ?> Matchmaker Frankfurt. Alle Rechte vorbehalten.</p>
            <p class="text-gray-400 font-mono">Design & Entwicklung by <a href="https://olenberg-media.de" target="_blank" rel="noopener noreferrer" class="hover:underline text-red-500">Olenberg Media</a></p>
        </div>
    </div>
</footer>
<script src="<?php echo asset_url('assets/js/icons.js'); ?>" defer></script>
<script
    id="matchmaker-main"
    src="<?php echo asset_url('assets/js/main.js'); ?>"
    data-three="<?php echo asset_url('assets/vendor/three-r128.min.js'); ?>"
    data-gsap="<?php echo asset_url('assets/vendor/gsap-3.12.5.min.js'); ?>"
    data-scroll-trigger="<?php echo asset_url('assets/vendor/ScrollTrigger-3.12.5.min.js'); ?>"
    data-portrait-before="<?php echo asset_url('assets/images/portrait-before.webp'); ?>"
    data-portrait-after="<?php echo asset_url('assets/images/portrait-after.webp'); ?>"
    defer></script>
<!-- Cookie Consent Banner -->
<div id="cookie-banner" class="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 shadow-2xl z-50 transform translate-y-12 opacity-0 pointer-events-none transition-all duration-500 ease-out backdrop-blur-xl">
    <div class="flex gap-4 items-start mb-4">
        <div class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
            <i data-lucide="cookie" class="w-5 h-5 animate-pulse"></i>
        </div>
        <div>
            <p class="text-white font-bold text-sm uppercase tracking-wider">Cookie-Einstellungen</p>
            <p class="text-xs text-gray-400 mt-1 leading-relaxed">
                Wir nutzen Cookies, um unsere Website zu optimieren und das Nutzererlebnis zu verbessern. Einige sind essenziell, andere helfen uns bei Statistiken und Marketing. Mehr Infos findest du in unserer <a href="<?php echo $base_dir; ?>/datenschutz/" class="underline text-red-400 hover:text-red-300">Datenschutzerklärung</a>.
            </p>
        </div>
    </div>

    <!-- Preferences panel (hidden by default) -->
    <div id="cookie-preferences" class="hidden space-y-3 mb-4 pt-3 border-t border-white/5">
        <div class="flex items-center justify-between">
            <div>
                <span class="text-xs font-bold text-white uppercase tracking-wider block">Notwendig</span>
                <span class="text-[10px] text-gray-500">Für den technischen Betrieb der Website zwingend erforderlich.</span>
            </div>
            <input type="checkbox" checked disabled class="accent-red-500 h-4 w-4 bg-[#141416] border border-white/10 rounded">
        </div>
        <div class="flex items-center justify-between">
            <div>
                <span class="text-xs font-bold text-white uppercase tracking-wider block">Analyse & Statistiken</span>
                <span class="text-[10px] text-gray-500">Hilft uns zu verstehen, wie Besucher die Seite nutzen (Google Analytics).</span>
            </div>
            <input type="checkbox" id="cookie-opt-analytics" class="accent-red-500 h-4 w-4 bg-[#141416] border border-white/10 rounded cursor-pointer">
        </div>
        <div class="flex items-center justify-between">
            <div>
                <span class="text-xs font-bold text-white uppercase tracking-wider block">Marketing & Social Media</span>
                <span class="text-[10px] text-gray-500">Für personalisierte Werbung und Social Media Features.</span>
            </div>
            <input type="checkbox" id="cookie-opt-marketing" class="accent-red-500 h-4 w-4 bg-[#141416] border border-white/10 rounded cursor-pointer">
        </div>
    </div>

    <!-- Buttons - Aligned right for easy thumb access -->
    <div class="flex flex-col sm:flex-row gap-3 justify-between items-center mt-6">
        <button id="cookie-btn-settings" class="w-full sm:w-auto text-xs font-mono uppercase text-gray-500 hover:text-white transition-colors py-2 text-center sm:text-left order-3 sm:order-1">
            Einstellungen
        </button>
        <div class="flex gap-3 w-full sm:w-auto justify-end order-1 sm:order-2">
            <button id="cookie-btn-reject" class="flex-1 sm:flex-initial text-xs font-bold uppercase text-white border border-white/10 hover:bg-white/5 transition-all py-3 px-6 rounded-full text-center">
                Ablehnen
            </button>
            <button id="cookie-btn-accept" class="flex-1 sm:flex-initial text-xs font-bold uppercase text-white bg-gradient-to-r from-red-600 to-pink-600 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:scale-105 transition-all py-3 px-6 rounded-full text-center">
                Akzeptieren
            </button>
        </div>
    </div>
</div>

<!-- Tiny Floating Revoke Consent Button (GDPR compliant option to change settings) -->
<button id="cookie-revoke-btn" class="fixed bottom-6 left-6 z-50 bg-[#0c0c0e]/80 border border-white/10 text-gray-500 hover:text-white hover:border-red-500/50 p-3 rounded-full shadow-2xl transition-all backdrop-blur-md opacity-0 pointer-events-none transform -translate-x-12 cursor-pointer" title="Cookie-Einstellungen">
    <i data-lucide="cookie" class="w-5 h-5"></i>
</button>

<script src="<?php echo asset_url('assets/js/cookie-consent.js'); ?>" defer></script>
</body>

</html>
