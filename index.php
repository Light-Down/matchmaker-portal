<?php
$page_title = "Matchmaker Frankfurt - Focus Rebound";
$meta_description = "Hör auf unsichtbar zu sein auf Tinder. Professionelle Fotos für dein Dating-Profil.";
include 'includes/header.php';
?>

<!-- HERO SECTION -->
<header class="relative min-h-[100dvh] flex items-center pt-28 pb-20 px-6 overflow-hidden">
    <!-- Fallback Blobs (for noscript / WebGL fallback) -->
    <div id="hero-fallback-blobs" class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-[80px] animate-blob mix-blend-screen"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-blob" style="animation-delay: 2s;"></div>
    </div>
    <!-- WebGL Hero Canvas -->
    <canvas id="hero-canvas" class="absolute inset-0 w-full h-full -z-10 opacity-0 transition-opacity duration-1000 pointer-events-none"></canvas>

    <!-- Smooth gradient overlay to fade into the next black section -->
    <div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10"></div>

    <div class="container mx-auto max-w-7xl w-full relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-10 lg:gap-16 items-stretch">
        <!-- Header Text -->
        <div class="hero-copy-panel rounded-3xl p-7 md:p-10 lg:p-12">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-red-400 mb-6">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>Electric Dating Studio Frankfurt
            </div>

            <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
                Hör auf, auf <br />
                <span class="relative inline-block">
                    <span class="platform-rotator" aria-label="Tinder, Bumble, Hinge und Dating-Apps">
                        <span>Tinder</span>
                        <span>Bumble</span>
                        <span>Hinge</span>
                        <span>Dating-Apps</span>
                    </span>
                </span> <br />
                <span class="relative inline-block">
                    <span class="relative z-10 text-white/40">unsichtbar</span>
                    <div
                        class="absolute top-1/2 left-0 w-full h-1 bg-red-500 -rotate-3 trigger-elem scroll-expand delay-300">
                    </div>
                </span> zu sein.
            </h1>

            <div class="hero-mobile-video lg:hidden mb-8" aria-label="Video: So läuft dein Foto-Walk ab">
                <div class="hero-video-frame hero-video-frame-mobile">
                    <img class="hero-video" src="<?php echo asset_url('assets/images/portrait-after.png'); ?>" alt="Portrait-Beispiel aus einem Matchmaker Frankfurt Foto-Walk">
                    <div class="hero-video-overlay pointer-events-none">
                        <div class="hero-play-button">
                            <i data-lucide="play" class="w-6 h-6 fill-current"></i>
                        </div>
                        <div>
                            <p class="text-white font-bold text-xs uppercase tracking-wide">So läuft dein Foto-Walk ab</p>
                            <p class="text-white/60 text-xs">Video folgt, echtes Shooting statt Studio-Show</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hero-content">
                <p class="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
                    Die meisten Männer verlieren nicht wegen ihrer Persönlichkeit, sondern wegen ihrer Fotos.
                    Das ist kein Problem des Charakters. Es ist ein handwerkliches Problem. Und das lässt sich lösen.
                </p>

                <ul class="space-y-2 mb-8 text-gray-300">
                    <li class="flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-red-500"></i>
                        <span>Fotos, die Vertrauen aufbauen</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-red-500"></i>
                        <span>Ein Profil, das in Sekunden funktioniert</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-red-500"></i>
                        <span>Entspannter Foto-Walk durch Frankfurt</span>
                    </li>
                </ul>

                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="<?php echo $base_dir; ?>/kontakt/"
                        class="cta-primary px-8 py-4 text-center">
                        Foto-Walk anfragen
                    </a>
                    <a href="#pricing"
                        class="cta-secondary px-8 py-4 text-center">
                        Pakete ansehen
                    </a>
                </div>
            </div>
        </div>

        <!-- Hero Video Slot -->
        <aside class="hero-video-shell hidden lg:block trigger-elem scroll-fade-up delay-200" aria-label="Video: So läuft dein Foto-Walk ab">
            <div class="hero-video-frame">
                <img class="hero-video" src="<?php echo asset_url('assets/images/portrait-after.png'); ?>" alt="Portrait-Beispiel aus einem Matchmaker Frankfurt Foto-Walk">
                <div class="hero-video-overlay pointer-events-none">
                    <div class="hero-play-button">
                        <i data-lucide="play" class="w-7 h-7 fill-current"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-sm uppercase tracking-wide">So läuft dein Foto-Walk ab</p>
                        <p class="text-white/60 text-xs">Video folgt, echtes Shooting statt Studio-Show</p>
                    </div>
                </div>
            </div>
        </aside>
        </div>
    </div>
</header>


<!-- SECTION: FACTS (Kinetic Variant) -->
<section id="facts" class="relative bg-black py-32 overflow-hidden border-b border-white/10">

    <!-- Animated Background Text Line -->
    <div class="absolute top-20 left-0 w-full opacity-10 pointer-events-none rotate-[-2deg]">
        <div class="marquee-container">
            <div class="marquee-content text-[10rem] font-black leading-none text-white uppercase">
                Nur sieht das niemand. Nur sieht das niemand. Nur sieht das niemand.
            </div>
        </div>
    </div>

    <div class="container mx-auto px-6 relative z-10">

        <!-- Sticky Headline Concept -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div class="md:col-span-6">
                <h2
                    class="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 md:mb-0 trigger-elem scroll-fade-up">
                    DU BIST <br>
                    <span class="text-gradient">EIN FANG.</span>
                </h2>
            </div>

            <div class="md:col-span-6 flex flex-col justify-end pb-2">
                <p
                    class="text-xl md:text-2xl font-light text-gray-300 leading-relaxed trigger-elem scroll-fade-up delay-200">
                    <strong class="text-white block mb-2">Die harte Wahrheit über Dating-Apps</strong>
                    Du hast Humor, stehst mitten im Leben und hast viel zu geben. Aber auf Tinder, Bumble und Co.
                    entscheiden <span class="text-white border-b border-[#FD297B]">Sekundenbruchteile</span>.
                </p>
                <div class="h-1 w-24 bg-gradient-primary mt-8 trigger-elem scroll-expand delay-300"></div>
            </div>
        </div>

        <!-- Big Number List -->
        <div class="mt-32 space-y-20 max-w-5xl mx-auto">

            <!-- Item 1 -->
            <div class="group ghost-focus cursor-default">
                <div
                    class="flex items-baseline border-b border-white/20 pb-6 transition-colors duration-1000 group-[.in-view]:border-[#FD297B]">
                    <span
                        class="text-xs font-mono text-gray-500 mr-6 md:mr-12 group-[.in-view]:text-[#FD297B] shrink-0 transition-colors duration-1000">01</span>
                    <h3
                        class="text-4xl md:text-6xl font-bold text-gray-400 group-[.in-view]:text-white transition-colors duration-1000">
                        Männer <span class="group-[.in-view]:text-gradient">Überzahl</span>
                    </h3>
                </div>
                <!-- Adjusted Grid: Closer to start -->
                <div
                    class="grid grid-cols-1 md:grid-cols-12 mt-6 opacity-50 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    <div class="md:col-span-5 lg:col-span-6"></div> <!-- Spacer to match headline width -->
                    <div class="md:col-span-7 lg:col-span-6 text-lg text-gray-300">
                        <p class="mb-2"><strong class="text-white">67% Männer</strong> auf Dating-Apps. Der Wettbewerb
                            ist brutal.</p>
                        <p class="text-gray-400">Frauen filtern nach Sicherheit & Vertrauen. Unfreundlicher Blick =
                            Risiko.</p>
                    </div>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="group ghost-focus cursor-default">
                <div
                    class="flex items-baseline border-b border-white/20 pb-6 transition-colors duration-1000 group-[.in-view]:border-[#FF655B]">
                    <span
                        class="text-xs font-mono text-gray-500 mr-6 md:mr-12 group-[.in-view]:text-[#FF655B] shrink-0 transition-colors duration-1000">02</span>
                    <h3
                        class="text-4xl md:text-6xl font-bold text-gray-400 group-[.in-view]:text-white transition-colors duration-1000">
                        Inneres <span class="group-[.in-view]:text-gradient">Gefühl</span>
                    </h3>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-12 mt-6 opacity-50 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    <div class="md:col-span-5 lg:col-span-6"></div>
                    <div class="md:col-span-7 lg:col-span-6 text-lg text-gray-300">
                        <p class="italic mb-2">"Bin ich nicht gut genug?"</p>
                        <p class="text-gray-400">Ich fühle mich unsichtbar und frustriert. Es ist peinlich, Fotos zu
                            machen.</p>
                    </div>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="group ghost-focus cursor-default">
                <div
                    class="flex items-baseline border-b border-white/20 pb-6 transition-colors duration-1000 group-[.in-view]:border-[#FD297B]">
                    <span
                        class="text-xs font-mono text-gray-500 mr-6 md:mr-12 group-[.in-view]:text-[#FD297B] shrink-0 transition-colors duration-1000">03</span>
                    <h3
                        class="text-4xl md:text-6xl font-bold text-gray-400 group-[.in-view]:text-white transition-colors duration-1000">
                        Es ist <span class="group-[.in-view]:text-gradient">Unfair</span>
                    </h3>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-12 mt-6 opacity-50 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    <div class="md:col-span-5 lg:col-span-6"></div>
                    <div class="md:col-span-7 lg:col-span-6 text-lg text-gray-300">
                        <p>Ein schlechtes Foto entscheidet über die Liebe deines Lebens? Du
                            solltest nicht ignoriert werden, nur weil du keine Selfies machen kannst.</p>
                    </div>
                </div>
            </div>

        </div>

        <!-- CTA Typography Box (Fact Check) -->
        <div
            class="mt-32 bg-gradient-to-br from-[#FD297B] to-[#FF655B] text-white p-12 md:p-24 rounded-[3rem] text-center trigger-elem scroll-pop hover:scale-[1.01]">
            <div class="w-full flex justify-center mb-8">
                <div class="inline-block border border-white/30 rounded-full px-4 py-1">
                    <span class="font-mono text-xs uppercase tracking-widest text-white">FAKTENCHECK</span>
                </div>
            </div>

            <div class="mb-6 relative inline-block">
                <h2 class="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none">
                    <span class="counter" data-target="89">0</span>%
                </h2>
                <!-- White/Translucent Bar for contrast -->
                <div class="absolute -bottom-4 left-0 w-full h-3 bg-black/20 rounded-full overflow-hidden">
                    <div class="progress-fill h-full bg-white w-0 transition-all duration-[4000ms] ease-out rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        data-width="100%"></div>
                </div>
            </div>

            <p class="text-xl md:text-2xl font-bold mb-8 max-w-2xl mx-auto text-white mt-8">
                deines Erfolgs hängen von deinen Fotos ab.
            </p>
            <div class="text-white/90 text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                Eine Studie von Hinge zeigt: Das Profilbild ist der wichtigste Faktor. Weit vor Bio, Beruf oder Hobbys.
                <br><br>
                <strong class="text-white">Frauen entscheiden in 0,1 Sekunden.</strong><br>
                Ohne starke Bilder wirst du weggewischt, noch bevor sie deine Bio liest.
            </div>
        </div>
    </div>
</section>


<!-- SECTION: WINGMAN (Atmosphere Variant) -->
<section id="wingman" class="relative py-32 overflow-hidden bg-[#050505]">

    <!-- Glowing Orbs (Slower Pulse) -->
    <div class="glow-blob bg-[#FD297B] w-[500px] h-[500px] top-1/4 left-[-100px] mix-blend-screen"></div>
    <div class="glow-blob bg-[#FF655B] w-[400px] h-[400px] bottom-1/4 right-[-50px] mix-blend-screen"
        style="animation-delay: 2s;"></div>

    <div class="container mx-auto px-6 relative z-10">

        <!-- Central Layout: Header -->
        <div class="max-w-3xl mx-auto text-center mb-24 trigger-elem scroll-fade-up">
            <!-- Vertical Line -->
            <div class="w-px h-24 bg-gradient-to-b from-transparent via-red-500 to-transparent mx-auto mb-8"></div>

            <!-- Icon above headline -->
            <div class="flex justify-center mb-6">
                <i data-lucide="camera" class="w-8 h-8 text-white/80"></i>
            </div>

            <h2 class="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                Dein <span class="text-gradient">Wingman</span> <br>
                mit der Kamera
            </h2>

            <h3 class="text-xl md:text-2xl font-light text-white mb-6">
                Kein Studio. Kein Stress. Nur du.
            </h3>

            <p class="text-gray-400 text-lg leading-relaxed font-light">
                Ich weiß, wie <span class="text-white font-medium">nervig</span> Tinder sein kann. Das endlose Swipen
                <span class="text-white font-medium">ohne Ergebnis</span> frustriert.
                Genau deshalb machen wir es anders: <span class="text-white font-bold">Kein Studio</span>, keine
                Scheinwerfer, kein "Sag mal Cheese".
                Wir treffen uns in Frankfurt, quatschen, laufen durch die Stadt und machen nebenbei <span
                    class="text-gradient font-bold">entspannte Bilder</span>.
                <span class="text-white font-medium block mt-2">Du musst kein Model sein.</span>
            </p>

            <!-- CTA -->
            <div class="text-center mt-12 trigger-elem scroll-pop">
                <a href="<?php echo $base_dir; ?>/kontakt/"
                    class="cta-secondary relative inline-flex px-10 py-4 text-sm uppercase overflow-hidden">
                    <span
                        class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                    <span class="relative z-10">Foto-Walk anfragen</span>
                </a>
            </div>

        </div>

        <!-- Feature Grid - Enhanced -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-32 gap-x-12 text-center mb-32 relative">

            <!-- Connection Line (Desktop only, subtle) -->
            <div
                class="hidden md:block absolute top-[3rem] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
            </div>

            <!-- Feature 1 -->
            <div class="group ghost-focus relative">
                <div
                    class="relative mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#0a0a0a] border border-white/10 group-[.in-view]:border-red-500/50 transition-colors duration-1000 z-10">
                    <div
                        class="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    </div>
                    <i data-lucide="target"
                        class="w-10 h-10 text-gray-400 group-[.in-view]:text-red-500 transition-colors duration-1000"></i>
                </div>
                <h4
                    class="text-2xl font-bold text-white mb-4 group-[.in-view]:text-red-500 transition-colors duration-1000">
                    Algorithmus
                    Hack</h4>
                <p class="text-gray-400 leading-relaxed font-light">
                    Ein echtes Lächeln weckt mehr Vertrauen. Outdoor-Fotos performen <span class="text-white">20%
                        besser</span>. Wir wissen, was funktioniert.
                </p>
            </div>

            <!-- Feature 2 -->
            <div class="group ghost-focus relative transition-delay-200">
                <div
                    class="relative mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#0a0a0a] border border-white/10 group-[.in-view]:border-pink-500/50 transition-colors duration-1000 z-10">
                    <div
                        class="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    </div>
                    <i data-lucide="sparkles"
                        class="w-10 h-10 text-gray-400 group-[.in-view]:text-pink-500 transition-colors duration-1000"></i>
                </div>
                <h4
                    class="text-2xl font-bold text-white mb-4 group-[.in-view]:text-pink-500 transition-colors duration-1000">
                    Authentisch
                </h4>
                <p class="text-gray-400 leading-relaxed font-light">
                    Keine Filter, keine Fakes. Du siehst aus wie du, nur an deinem <span class="text-white">besten
                        Tag</span>.
                </p>
            </div>

            <!-- Feature 3 -->
            <div class="group ghost-focus relative transition-delay-400">
                <div
                    class="relative mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#0a0a0a] border border-white/10 group-[.in-view]:border-orange-500/50 transition-colors duration-1000 z-10">
                    <div
                        class="absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-[.in-view]:opacity-100 transition-opacity duration-1000">
                    </div>
                    <i data-lucide="trending-up"
                        class="w-10 h-10 text-gray-400 group-[.in-view]:text-orange-500 transition-colors duration-1000"></i>
                </div>
                <h4
                    class="text-2xl font-bold text-white mb-4 group-[.in-view]:text-orange-500 transition-colors duration-1000">
                    Mehr Matches</h4>
                <p class="text-gray-400 leading-relaxed font-light">
                    Dating Fotograf Frankfurt: Wir machen mehr als Fotos. Wir geben dir den <span
                        class="text-white">unfairen Vorteil</span>.
                </p>
            </div>

            <!-- Feature 3 (End) -->



        </div>
</section>

<!-- SECTION: PLAN (Number Focus) -->
<section id="plan" class="relative py-32 bg-black overflow-hidden border-b border-white/10">
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto">
            <h2
                class="text-4xl md:text-6xl font-black tracking-tighter mb-32 text-center trigger-elem scroll-fade-up uppercase">
                In 3 Schritten zu <br><span class="text-gradient">mehr Erfolg</span>
            </h2>

            <div class="space-y-48">
                <!-- Step 1 -->
                <div class="relative grid grid-cols-1 md:grid-cols-12 items-center gap-12 group">
                    <div
                        class="absolute -top-20 -left-6 md:-top-24 md:-left-10 text-[10rem] md:text-[20rem] font-black text-white/[0.05] leading-none select-none pointer-events-none trigger-elem scroll-fade-up group-hover:text-red-500/10 transition-colors duration-1000">
                        01</div>
                    <div class="md:col-span-7 trigger-elem scroll-fade-up relative z-10">
                        <div
                            class="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
                            Der Start</div>
                        <h3
                            class="text-4xl md:text-5xl font-bold mb-6 text-white group-hover:translate-x-2 transition-transform duration-500">
                            Paket buchen</h3>
                        <p class="text-gray-400 text-xl leading-relaxed">
                            Wähle das Fotoshooting-Paket, das am besten zu dir passt, und sichere dir deinen Slot bequem
                            online.
                        </p>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="relative grid grid-cols-1 md:grid-cols-12 items-center gap-12 group">
                    <div class="md:col-span-12">
                        <div
                            class="absolute -top-20 -right-6 md:-top-24 md:-right-10 text-[10rem] md:text-[20rem] font-black text-white/[0.05] leading-none select-none pointer-events-none trigger-elem scroll-fade-up group-hover:text-pink-500/10 transition-colors duration-1000 text-right w-full">
                            02</div>
                        <div class="md:w-7/12 ml-auto trigger-elem scroll-fade-up text-right relative z-10">
                            <div
                                class="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-widest mb-4">
                                Das Erlebnis</div>
                            <h3
                                class="text-4xl md:text-5xl font-bold mb-6 text-white group-hover:-translate-x-2 transition-transform duration-500">
                                Foto-Walk</h3>
                            <p class="text-gray-400 text-xl leading-relaxed">
                                Wir treffen uns in Frankfurt für einen entspannten Spaziergang. Keine steifen Posen,
                                wir fangen deine Persönlichkeit authentisch ein.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="relative grid grid-cols-1 md:grid-cols-12 items-center gap-12 group">
                    <div
                        class="absolute -top-20 -left-6 md:-top-24 md:-left-10 text-[10rem] md:text-[20rem] font-black text-white/[0.05] leading-none select-none pointer-events-none trigger-elem scroll-fade-up group-hover:text-orange-500/10 transition-colors duration-1000">
                        03</div>
                    <div class="md:col-span-7 trigger-elem scroll-fade-up relative z-10">
                        <div
                            class="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">
                            Das Resultat</div>
                        <h3
                            class="text-4xl md:text-5xl font-bold mb-6 text-white group-hover:translate-x-2 transition-transform duration-500">
                            Matches genießen</h3>
                        <p class="text-gray-400 text-xl leading-relaxed">
                            Du erhältst deine optimierten Fotos innerhalb von 48 Stunden. Bereit, um auf Tinder, Bumble
                            & Co. endlich sichtbar zu werden.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Final CTA in Plan -->
            <div class="mt-48 text-center trigger-elem scroll-pop">
                <a href="<?php echo $base_dir; ?>/kontakt/"
                    class="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all duration-300">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full"></div>
                    <span class="relative flex items-center gap-3">
                        FOTO-WALK ANFRAGEN
                        <i data-lucide="arrow-right" class="w-6 h-6 group-hover:translate-x-2 transition-transform"></i>
                    </span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- SECTION: SUCCESS (The GSAP Transformation) -->
<section id="success" class="relative bg-black overflow-hidden border-t border-white/5">
    <!-- Section Header (Sticky) -->
    <div class="pt-32 pb-16 container mx-auto px-6 relative z-30 pointer-events-none">
        <div class="text-center">
            <h2 class="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase text-white">
                Die <span class="text-gradient">Metamorphose</span>
            </h2>
            <p class="text-gray-400 text-xl max-w-2xl mx-auto font-light">
                Vom statistischen "Nein" zur emotionalen <span class="text-white font-medium">Spielführer-Stimme</span>.
                Schau zu, wie sich deine Wirkung verändert.
            </p>
        </div>
    </div>

    <!-- GSAP Reveal Container -->
    <div class="reveal-section relative">
        <div
            class="reveal-container min-h-[100dvh] w-full flex items-center justify-center p-6 md:p-12 overflow-hidden bg-black">

            <div
                class="relative w-full max-w-6xl aspect-[4/5] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.15)]">

                <!-- WebGL Reveal Canvas -->
                <canvas id="reveal-canvas" class="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 z-0 pointer-events-none"></canvas>

                <!-- Fallback Container (used if WebGL fails / is disabled) -->
                <div id="reveal-fallback-container" class="absolute inset-0 z-0">
                    <!-- AFTER IMAGE (The Target) -->
                    <div class="absolute inset-0">
                        <img src="assets/images/portrait-after.png" alt="Nachher: Match-Magnet"
                            class="w-full h-full object-cover">
                    </div>

                    <!-- BEFORE IMAGE (The Overlay that wipes) -->
                    <div id="reveal-before-box" class="absolute inset-0 z-10 overflow-hidden bg-[#050505]">
                        <img src="assets/images/portrait-before.png" alt="Vorher: Unsichtbar"
                            class="w-full h-full object-cover grayscale opacity-70">
                        
                        <!-- Divider Line -->
                        <div
                            class="absolute top-0 right-0 w-[2px] h-full bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        </div>
                    </div>
                </div>

                <!-- After Badge -->
                <div id="badge-after" class="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20">
                    <div
                        class="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-sm md:text-xl uppercase tracking-tighter shadow-2xl">
                        Match-Magnet Status
                    </div>
                </div>

                <!-- Before Badge -->
                <div id="badge-before" class="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20">
                    <div
                        class="px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-gray-300 font-mono text-xs md:text-lg uppercase tracking-widest">
                        Basis: Unsichtbar
                    </div>
                </div>

                <!-- Hover/Scroll Instruction -->
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center reveal-hint">
                    <div
                        class="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mb-4 animate-bounce bg-black/20 backdrop-blur-sm mx-auto">
                        <i data-lucide="chevrons-down" class="text-white w-8 h-8"></i>
                    </div>
                    <span class="text-white/50 font-mono text-xs uppercase tracking-[0.3em] block">Scroll to
                        Reveal</span>
                </div>

            </div>
        </div>
    </div>

    <!-- Final Phrase after Reveal -->
    <div class="pb-32 container mx-auto px-6 text-center relative z-20 -mt-20">
        <h3 class="text-3xl md:text-5xl font-bold mb-12 text-white">Bist du bereit für diesen Schritt?</h3>
        <a href="<?php echo $base_dir; ?>/kontakt/"
            class="group relative inline-flex items-center justify-center px-16 py-8 font-black text-xl text-white transition-all duration-300">
            <div
                class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity">
            </div>
            <div
                class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            </div>
            <span class="relative flex items-center gap-4">
                FOTO-WALK ANFRAGEN
                <i data-lucide="sparkles" class="w-8 h-8 animate-pulse"></i>
            </span>
        </a>
    </div>
</section>

<!-- SECTION: PRICING (Direct CTA) -->
<section id="pricing" class="relative py-32 bg-black overflow-hidden border-t border-white/5">

    <!-- Halo Glow Element (Scrolltelling) -->
    <div id="pricing-halo" class="halo-glow bg-red-600/20"></div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-24 trigger-elem scroll-fade-up">
            <h2 class="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Wähle deinen <span class="text-gradient">Vorteil</span>
            </h2>
            <p class="text-gray-400 text-xl max-w-2xl mx-auto font-light">
                Keine versteckten Kosten. Nur klare Pakete für <span class="text-white font-medium">maximale
                    Sichtbarkeit</span>.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">

            <!-- Tier 1: Essential -->
            <div class="pricing-card focus-card rounded-[2.5rem] p-10 flex flex-col trigger-elem scroll-fade-up group"
                data-tier="essential">
                <div class="tier-icon-container">
                    <i data-lucide="camera" class="w-8 h-8 text-gray-400"></i>
                </div>
                <div class="mb-8">
                    <span class="pricing-badge badge-essential">Minimaler Aufwand</span>
                    <h3 class="text-2xl font-bold text-white mb-2">Essential Match</h3>
                    <p class="text-gray-500 text-sm italic">Der schnelle Einstieg</p>
                </div>
                <div class="mb-8 font-mono">
                    <span class="text-5xl font-black text-white">199€</span>
                </div>
                <ul class="space-y-4 mb-12 flex-grow">
                    <li class="flex items-center gap-3 text-gray-300">
                        <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                        <span>45 Min. Foto-Walk</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-300">
                        <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                        <span>5 Premium-Fotos</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-300 transition-colors group-hover:text-white">
                        <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                        <span>1 Outfit</span>
                    </li>
                </ul>
                <a href="<?php echo $base_dir; ?>/kontakt/"
                    class="w-full py-4 rounded-full border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-all hover:tracking-widest">
                    Foto-Walk anfragen
                </a>
            </div>

            <!-- Tier 2: Match-Magnet (Bestseller) -->
            <div class="pricing-card relative group trigger-elem scroll-fade-up delay-200" data-tier="magnet">
                <div
                    class="absolute -inset-[2px] bg-gradient-to-r from-red-600 to-pink-600 rounded-[2.5rem] blur-sm opacity-50">
                </div>
                <div
                    class="relative h-full bg-[#0a0a0a] rounded-[2.5rem] p-10 flex flex-col border border-white/10 shadow-[0_0_80px_rgba(220,38,38,0.1)]">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span class="pricing-badge badge-magnet">Bestseller</span>
                    </div>

                    <div class="tier-icon-container bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30">
                        <i data-lucide="zap" class="w-8 h-8 text-red-500"></i>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-white mb-2">Match-Magnet</h3>
                        <p class="text-gray-400 text-sm italic">Maximale Transformation</p>
                    </div>
                    <div class="mb-8 font-mono">
                        <span class="text-5xl font-black text-white">349€</span>
                    </div>
                    <ul class="space-y-4 mb-12 flex-grow">
                        <li class="flex items-center gap-3 text-gray-300">
                            <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                            <span>90 Min. Foto-Walk</span>
                        </li>
                        <li class="flex items-center gap-3 text-gray-300">
                            <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                            <span>15 Premium-Fotos</span>
                        </li>
                        <li class="flex items-center gap-3 text-gray-300">
                            <i data-lucide="check" class="w-5 h-5 text-red-500"></i>
                            <span>3 Outfits</span>
                        </li>
                        <li class="flex items-center gap-3 text-white font-bold">
                            <i data-lucide="sparkles" class="w-5 h-5 text-red-500 animate-pulse"></i>
                            <span>Bio-Analyse + Check</span>
                        </li>
                    </ul>
                    <a href="<?php echo $base_dir; ?>/kontakt/"
                        class="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-center shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-all hover:tracking-widest">
                        Foto-Walk anfragen
                    </a>
                </div>
            </div>

            <!-- Tier 3: The Wingman -->
            <div class="pricing-card focus-card rounded-[2.5rem] p-10 flex flex-col trigger-elem scroll-fade-up delay-400 group"
                data-tier="wingman">
                <div class="tier-icon-container bg-sky-500/10 border-sky-500/20 group-hover:bg-sky-500/20">
                    <i data-lucide="gem" class="w-8 h-8 text-sky-400"></i>
                </div>
                <div class="mb-8">
                    <span class="pricing-badge badge-wingman">Elite Experience</span>
                    <h3 class="text-2xl font-bold text-white mb-2">The Wingman</h3>
                    <p class="text-gray-500 text-sm italic">Das Vollständige Upgrade</p>
                </div>
                <div class="mb-8 font-mono">
                    <span class="text-5xl font-black text-white text-gradient-blue">599€</span>
                </div>
                <ul class="space-y-4 mb-12 flex-grow">
                    <li class="flex items-center gap-3 text-gray-300">
                        <i data-lucide="check" class="w-5 h-5 text-sky-500"></i>
                        <span>3 Std. Full-Experience</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-300">
                        <i data-lucide="check" class="w-5 h-5 text-sky-500"></i>
                        <span>Alle Fotos bearbeitet</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                        <i data-lucide="check" class="w-5 h-5 text-sky-500"></i>
                        <span>Unbegrenzt Outfits</span>
                    </li>
                    <li class="flex items-center gap-3 text-white font-bold">
                        <i data-lucide="crown" class="w-5 h-5 text-sky-500 animate-pulse"></i>
                        <span>Premium App-Strategie</span>
                    </li>
                </ul>
                <a href="<?php echo $base_dir; ?>/kontakt/"
                    class="w-full py-4 rounded-full border border-white/10 text-white font-bold text-center hover:bg-sky-500/10 hover:border-sky-500/30 transition-all hover:tracking-widest">
                    Foto-Walk anfragen
                </a>
            </div>

        </div>
    </div>
</section>

<style>
    .text-gradient-blue {
        background: linear-gradient(to right, #0ea5e9, #2dd4bf);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>

<script>
    // PRICING HALO GLOW LOGIC
    document.addEventListener('DOMContentLoaded', () => {
        const halo = document.getElementById('pricing-halo');
        const cards = document.querySelectorAll('.pricing-card');
        const pricingSection = document.getElementById('pricing');

        const tierColors = {
            essential: 'rgba(255, 255, 255, 0.15)',
            magnet: 'rgba(239, 68, 68, 0.25)',
            wingman: 'rgba(14, 165, 233, 0.25)'
        };

        const updateHalo = () => {
            let activeCard = null;
            const viewportCenter = window.innerHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;

                // If the card is in the center-ish of the viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    if (!activeCard || Math.abs(cardCenter - viewportCenter) < Math.abs(activeCard.center - viewportCenter)) {
                        activeCard = { el: card, center: cardCenter, rect };
                    }
                }
            });

            if (activeCard && activeCard.el.classList.contains('in-view')) {
                const tier = activeCard.el.dataset.tier;
                const sectionRect = pricingSection.getBoundingClientRect();

                // Position relative to section
                const x = activeCard.rect.left + activeCard.rect.width / 2 - sectionRect.left;
                const y = activeCard.rect.top + activeCard.rect.height / 2 - sectionRect.top;

                halo.style.left = `${x}px`;
                halo.style.top = `${y}px`;
                halo.style.backgroundColor = tierColors[tier];
                halo.style.opacity = '1';
                halo.style.boxShadow = `0 0 100px 50px ${tierColors[tier]}`;
            } else {
                halo.style.opacity = '0';
            }
        };

        window.addEventListener('scroll', updateHalo);
        window.addEventListener('resize', updateHalo);
        // Initial call
        setTimeout(updateHalo, 500);
    });
</script>

<!-- SECTION: TINDER SWIPER (Mistakes vs Solutions) -->
<section id="swiper-section" class="relative py-32 bg-[#050505] overflow-hidden border-t border-white/5">
    <div class="glow-blob bg-red-600/10 w-[400px] h-[400px] top-1/3 left-[-200px] mix-blend-screen"></div>
    <div class="glow-blob bg-pink-600/10 w-[400px] h-[400px] bottom-1/3 right-[-200px] mix-blend-screen"></div>
    <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center mb-16 trigger-elem scroll-fade-up">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Profil-Check</span>
            <h2 class="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white">
                Swipe Left oder <span class="text-gradient">Right?</span>
            </h2>
            <p class="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                Klicke oder wische die Karten, um die häufigsten Profil-Fehler von Männern und die MatchMaker-Lösung zu sehen.
            </p>
        </div>

        <!-- Swiper Container -->
        <div class="swiper-wrapper mb-12 trigger-elem scroll-fade-up">
            
            <!-- Final Card (Behind everything) -->
            <div class="swiper-card swiper-final-card text-center justify-center items-center bg-[#0a0a0c] border-red-500/20">
                <i data-lucide="sparkles" class="w-16 h-16 text-red-500 mb-6 animate-pulse"></i>
                <h3 class="text-3xl font-black text-white mb-4">DEIN UPGRADE WARTET</h3>
                <p class="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
                    Schluss mit den Fehlern der Konkurrenz. Lass uns Bilder machen, die dich als deinen besten Fang zeigen.
                </p>
                <a href="<?php echo $base_dir; ?>/kontakt/" class="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform">
                    Foto-Walk anfragen
                </a>
            </div>

            <!-- Card 3 -->
            <div class="swiper-card">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-mono text-gray-500">Dating-Fehler #3</span>
                        <span class="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase">Verstecken</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-6">Das Sonnenbrillen- & Autospiegelbild</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-center">
                    <div class="bg-red-950/20 border border-red-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-sm">
                            <i data-lucide="x-circle" class="w-5 h-5"></i>
                            <span>SWIPE LEFT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Sonnenbrillen verbergen deine Augen, das wichtigste Merkmal für Vertrauensbildung. Autospiegelbilder wirken unpersönlich, faul und oft veraltet.
                        </p>
                    </div>
                    <div class="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-emerald-500 font-bold text-sm">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                            <span>SWIPE RIGHT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Der offene, lachende Blickkontakt direkt in die Linse. Wirkt selbstbewusst, sympathisch und extrem einladend für eine erste Nachricht.
                        </p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 font-mono mt-4">Tippe auf die Buttons unten zum Wischen</div>
            </div>

            <!-- Card 2 -->
            <div class="swiper-card">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-mono text-gray-500">Dating-Fehler #2</span>
                        <span class="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold uppercase">Das Suchspiel</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-6">Das Kumpel-Gruppenfoto</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-center">
                    <div class="bg-red-950/20 border border-red-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-sm">
                            <i data-lucide="x-circle" class="w-5 h-5"></i>
                            <span>SWIPE LEFT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Frauen wollen nicht detektivisch raten, wer du bist. Wenn sie auf deinem ersten Bild drei andere Männer sieht, wischt sie genervt nach links.
                        </p>
                    </div>
                    <div class="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-emerald-500 font-bold text-sm">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                            <span>SWIPE RIGHT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Ein klares Einzelportrait mit professioneller Tiefenunschärfe (Bokeh-Effekt). Du stehst im Fokus, während der Hintergrund ästhetisch verschwimmt.
                        </p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 font-mono mt-4">Tippe auf die Buttons unten zum Wischen</div>
            </div>

            <!-- Card 1 -->
            <div class="swiper-card">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-mono text-gray-500">Dating-Fehler #1</span>
                        <span class="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase">Klassiker</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-6">Das Fitnessstudio-Spiegelselfie</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-center">
                    <div class="bg-red-950/20 border border-red-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-sm">
                            <i data-lucide="x-circle" class="w-5 h-5"></i>
                            <span>SWIPE LEFT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Wirkt oft angeberisch, einsam oder schlichtweg phantasielos. Die Badezimmerfliesen im Hintergrund ruinieren jeden Vibe. Der Algorithmus straft Selfies ab.
                        </p>
                    </div>
                    <div class="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5">
                        <div class="flex items-center gap-2 mb-2 text-emerald-500 font-bold text-sm">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                            <span>SWIPE RIGHT</span>
                        </div>
                        <p class="text-sm text-gray-400 leading-relaxed">
                            Ein lässiges, ungestelltes Bild in Bewegung vor urbaner Kulisse oder im Szene-Café. Zeigt Lifestyle, Fitness und soziale Kompetenz, völlig mühelos.
                        </p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 font-mono mt-4">Tippe auf die Buttons unten zum Wischen</div>
            </div>

        </div>

        <!-- Swiper Controls -->
        <div class="flex justify-center gap-6 trigger-elem scroll-fade-up">
            <button id="swiper-dislike" class="swiper-btn swiper-btn-dislike" aria-label="Dislike / Swipe Left">
                <i data-lucide="x" class="w-8 h-8"></i>
            </button>
            <button id="swiper-like" class="swiper-btn swiper-btn-like" aria-label="Like / Swipe Right">
                <i data-lucide="heart" class="w-8 h-8"></i>
            </button>
        </div>
    </div>
</section>

<!-- SECTION: BRAND MANIFESTO (SB7 Identity & Values) -->
<section id="manifesto" class="relative py-32 bg-black overflow-hidden border-t border-white/5">
    <!-- WebGL Manifesto Canvas -->
    <canvas id="manifesto-canvas" class="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000 pointer-events-none z-0"></canvas>
    <!-- Fallback gradient -->
    <div id="manifesto-fallback" class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_60%)] pointer-events-none z-0"></div>
    <div class="container mx-auto px-6 relative z-10 max-w-5xl">
        <div class="text-center mb-16">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Unser Manifesto</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">Woran wir glauben</h2>
        </div>
        
        <div class="space-y-12 md:space-y-16 text-center">
            <div class="manifesto-line text-2xl md:text-4xl font-extrabold text-white leading-relaxed">
                Wir glauben nicht an gestellte Studio-Fotos, die dich wie einen <span class="text-gradient">Versicherungsvertreter</span> aussehen lassen.
            </div>
            <div class="w-12 h-px bg-white/10 mx-auto"></div>
            <div class="manifesto-line text-2xl md:text-4xl font-extrabold text-white leading-relaxed">
                Wir glauben, dass kein Mann unfotogen ist. Es gibt nur <span class="text-gradient">schlechtes Licht</span> und steife Posen.
            </div>
            <div class="w-12 h-px bg-white/10 mx-auto"></div>
            <div class="manifesto-line text-2xl md:text-4xl font-extrabold text-white leading-relaxed">
                Wir glauben, dass dein Dating-Erfolg kein Zufall sein sollte, sondern ein <span class="text-gradient">System</span>, das du kontrollieren kannst.
            </div>
            <div class="w-12 h-px bg-white/10 mx-auto"></div>
            <div class="manifesto-line text-2xl md:text-4xl font-extrabold text-white leading-relaxed">
                Wir glauben daran, dass deine Bilder deine echte Persönlichkeit zeigen müssen, nur eben an deinem <span class="text-gradient">besten Tag</span>.
            </div>
        </div>
    </div>
</section>

<!-- FAQ SECTION -->
<section id="faq" class="py-32 px-6 bg-[#050505] border-t border-white/5">
    <div class="container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-24 trigger-elem scroll-fade-up">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Häufige Fragen</span>
            <h2 class="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">Alles, was du wissen musst</h2>
            <p class="text-gray-400 text-lg max-w-xl mx-auto mt-4">
                Keine Zweifel mehr. Hier sind ehrliche Antworten auf deine drängendsten Fragen, verpackt als schneller Chat.
            </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
            
            <!-- Question 1 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">1</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Kameraangst</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Ich bin total unfotogen. Funktioniert das trotzdem?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Ja, absolut! 95% unserer Kunden hassen es, fotografiert zu werden. Bei uns gibt es kein künstliches Lächeln. Wir spazieren entspannt durch Frankfurt und machen natürliche Schüsse aus der Bewegung.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 2 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">2</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Natürlichkeit</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Sehen die Fotos nicht gestellt oder künstlich aus?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Genau das vermeiden wir. Frauen riechen Fake-Studiofotos sofort. Wir fotografieren draußen mit natürlichem Licht in echten Szene-Locations. Es sieht aus, als hätte dich ein Kumpel fotografiert.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 3 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">3</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Wetterrisiko</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Was passiert, wenn es am Tag des Shootings regnet?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Wolken sind super für weiches Licht. Bei starkem Regen verschieben wir das Ganze einfach vollkommen kostenfrei auf einen Ausweichtermin. Wir stellen sicher, dass du im besten Licht dastehst!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 4 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">4</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Outfit-Wahl</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Was soll ich zum Fotoshooting anziehen?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Je nach Paket 1 bis 3 Outfits. Am besten verschiedene Looks (Smart-Casual, Freizeit, Sportlich), die dich gut repräsentieren. Vorab kriegst du von uns einen detaillierten Styling-Guide per WhatsApp.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 5 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">5</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Privatsphäre</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Werden meine Bilder im Internet veröffentlicht?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Absolut diskret. Viele unserer Kunden sind Akademiker oder Unternehmer und schätzen Privatsphäre. Wir veröffentlichen nichts, es sei denn, du gibst uns dein schriftliches Okay dafür.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 6 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">6</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Lieferzeit</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Wie schnell erhalte ich meine fertigen Fotos?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            In Rekordzeit! Deine persönliche Auswahlgalerie ist binnen 24-48h online. Sobald du deine Favoriten gewählt hast, finalisieren wir die Premium-Retusche in wenigen Werktagen.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 7 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">7</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Kompatibilität</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Für welche Apps kann ich die Bilder nutzen?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Unsere Bilder sind perfekt auf die Bildformate und Algorithmen von Tinder, Bumble, Hinge & OkCupid abgestimmt. Aber auch perfekt für WhatsApp, Instagram oder ein lässiges LinkedIn-Profilbild!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 8 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div class="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs font-mono">8</div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Bio & Profil</div>
                </div>
                <div class="space-y-4 flex-grow flex flex-col justify-end">
                    <div class="flex justify-start">
                        <div class="bubble-in px-5 py-3 text-sm rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm w-fit max-w-[85%]">
                            "Helft ihr mir auch beim Schreiben meiner Bio?"
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bubble-out px-5 py-3 text-sm rounded-tl-xl rounded-bl-xl rounded-br-sm rounded-tr-xl w-fit max-w-[85%] shadow-lg leading-relaxed">
                            Klar! In den Paketen "Match-Magnet" & "Wingman" machen wir einen Voll-Check deines Profils. Wir optimieren deine Bio, damit sie perfekt mit deinen neuen Fotos harmonieert und dir mehr Anfragen bringt.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- SECTION: FINAL CALL TO ACTION (SB7 Resolution & Success) -->
<section id="final-cta" class="relative py-32 bg-black overflow-hidden border-t border-white/5">
    <!-- WebGL CTA Canvas -->
    <canvas id="cta-canvas" class="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000 pointer-events-none z-0"></canvas>
    <!-- Fallback background blob -->
    <div id="final-cta-fallback" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-red-400 mb-8 trigger-elem scroll-fade-up">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
            Sichere dir deinen Slot für diese Woche
        </div>
        
        <h2 class="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-tight text-white trigger-elem scroll-fade-up">
            Mach Schluss mit <br>
            <span class="text-gradient">leeren Chats.</span>
        </h2>
        
        <p class="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 trigger-elem scroll-fade-up delay-100">
            Jeder Tag, an dem du schlechte Selfies nutzt, ist ein Tag, an dem die passende Frau dich übersieht. Investiere einmal in Fotos, die jahrelang für dich arbeiten.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4 trigger-elem scroll-pop delay-200">
            <a href="<?php echo $base_dir; ?>/kontakt/" class="px-10 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-full shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105 transition-transform text-lg uppercase tracking-wider">
                Foto-Walk anfragen
            </a>
            <a href="<?php echo $base_dir; ?>/22-gruende/" class="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg">
                22 Gründe lesen
            </a>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
