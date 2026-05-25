<?php
$page_title = "Dein Dating-Fotograf in Frankfurt | Mark Olenberg";
$meta_description = "Lerne mich kennen – deinen Dating-Fotografen in Frankfurt. Mit Empathie und System helfe ich dir zu authentischen Fotos, die dir echte Matches bringen.";
include 'includes/header.php';

// Smart profile image path handling
$profile_img = 'assets/images/mark-olenberg.jpg';
if (!file_exists(__DIR__ . '/' . $profile_img)) {
    // Fallback to the existing portrait image if mark-olenberg.jpg doesn't exist yet
    $profile_img = 'assets/images/portrait-after.webp';
}
?>

<!-- Hero Section -->
<section class="relative pt-40 pb-20 overflow-hidden bg-black">
    <div class="glow-blob bg-red-600/10 w-[500px] h-[500px] top-[-100px] left-[-100px] mix-blend-screen"></div>
    <div class="glow-blob bg-pink-600/10 w-[500px] h-[500px] bottom-[-100px] right-[-200px] mix-blend-screen"></div>
    
    <div class="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-red-400 mb-8 trigger-elem scroll-fade-up">
            <i data-lucide="camera" class="w-4 h-4"></i>
            Fotograf und Wingman
        </span>
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white leading-tight trigger-elem scroll-fade-up">
            Ich bin kein <br><span class="text-gradient">Dating-Coach</span>
        </h1>
        <p class="text-white text-xl md:text-3xl max-w-3xl mx-auto leading-normal mb-8 font-black uppercase tracking-tight trigger-elem scroll-fade-up delay-100">
            Ich bin der Typ, der dir endlich zeigt, wie gut du wirklich rüberkommst
        </p>
        <p class="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed trigger-elem scroll-fade-up delay-200 font-medium">
            Mark Olenberg. Fotograf. Frankfurt. Und jemand, der selbst lange keine Ahnung hatte.
        </p>
    </div>
</section>

<!-- Sektion 1: Origin Story (Split-Screen) -->
<section class="py-24 bg-[#050505] relative z-10 border-t border-white/5">
    <div class="container mx-auto px-6 max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="trigger-elem scroll-fade-up">
                <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Origin Story</span>
                <h2 class="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white mb-8 leading-tight">
                    Es hat mit einer Kamera angefangen <br><span class="text-gradient">die nicht mir gehörte</span>
                </h2>
                <div class="space-y-6 text-gray-400 text-base leading-relaxed">
                    <p>
                        Meine Mutter kaufte sich eine kamera und hatte keine Ahnung, wie sie funktioniert. Also drückte sie mir das Ding in die Hand.
                    </p>
                    <p>
                        Seitdem mache ich die Fotos. Auf Reisen, bei Feiern, bei Veranstaltungen. Irgendwann fing ich an zu verstehen, was die Kamera wirklich kann. Und was ein gutes Bild von einem schlechten unterscheidet.
                    </p>
                    <p>
                        Parallel dazu: Tinder. Mit 19. Zusammen mit meinem besten Freund. "Lass uns ein Profil machen." "Was braucht man dafür?" "Gute Fotos."
                    </p>
                    <p>
                        Ich hatte eine kamera. Ich hatte null Ahnung vom Fotografieren. Aber ich hatte Interesse. Und das war genug, um anzufangen.
                    </p>
                </div>
            </div>
            
            <div class="relative trigger-elem scroll-pop delay-200">
                <div class="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
                <div class="relative bg-gradient-to-b from-[#141416] to-[#0c0c0e] border border-white/10 rounded-3xl overflow-hidden p-2 shadow-2xl aspect-[3/4] max-w-md mx-auto group">
                    <!-- 
                      Entwickler-Hinweis für den Bildupload:
                      Lade einfach dein Profilbild unter assets/images/mark-olenberg.jpg hoch.
                      Der Code prüft automatisch, ob dieses Bild existiert, und zeigt es an.
                      Falls nicht, wird das standardmäßige Fallback-Bild verwendet.
                    -->
                    <img src="<?php echo asset_url($profile_img); ?>" 
                         alt="Mark Olenberg - Dating Fotograf Frankfurt" 
                         class="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                    <div class="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-xs font-mono"><?php echo htmlspecialchars($profile_img); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sektion 2: Entwicklung / Credentials -->
<section class="py-24 bg-black relative z-10 border-t border-white/5 overflow-hidden">
    <div class="glow-blob bg-pink-600/5 w-[500px] h-[500px] top-[10%] right-[-200px] mix-blend-screen"></div>
    <div class="container mx-auto px-6 max-w-5xl relative z-10">
        <div class="trigger-elem scroll-fade-up text-center mb-16">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Credentials</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                Von schüchtern <br><span class="text-gradient">zu systematisch</span>
            </h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center trigger-elem scroll-fade-up">
            <div class="space-y-6 text-gray-400 text-base leading-relaxed">
                <p>
                    Ich war kein Typ, der von Natur aus wusste, wie Dating funktioniert. Ich habe Fehler gemacht. Viele. Ich war auf Dates ohne Plan. Ich hatte Phasen ohne Dates, weil ich nicht wusste, wie ich überhaupt welche bekomme.
                </p>
                <p class="font-bold text-white text-lg">
                    Also habe ich angefangen zu lernen.
                </p>
                <p>
                    Eine menge Bücher. Kurse. Coachings. Corey Wayne. Christopher Canwell. John Gray. Ich habe verstanden, wie Anziehung funktioniert. Wie Männer und Frauen unterschiedlich kommunizieren. Welche Fehler sich immer wiederholen und welche Dinge sich immer wieder bewähren.
                </p>
                <p>
                    Gleichzeitig wurden meine Fotos besser. Kumpels fragten mich, ob ich auch für sie welche machen kann. Irgendwann wurde aus Trial and Error ein System.
                </p>
            </div>
            
            <div class="relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-3xl blur-xl opacity-30"></div>
                <div class="relative bg-gradient-to-b from-[#141416]/80 to-[#0c0c0e]/80 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden group">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
                    
                    <h3 class="text-xs font-mono text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4 flex items-center gap-2">
                        <i data-lucide="line-chart" class="w-4 h-4 text-red-500"></i>
                        Das System in Zahlen
                    </h3>
                    
                    <div class="space-y-6">
                        <!-- Stat 1 -->
                        <div>
                            <div class="flex justify-between items-baseline mb-2">
                                <span class="text-xs text-gray-400 font-mono uppercase">Fachliteratur & Analysen</span>
                                <span class="text-2xl font-mono font-black text-gradient"><span class="counter" data-target="100">0</span>+</span>
                            </div>
                            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="progress-fill h-full bg-gradient-to-r from-red-600 to-pink-600" data-width="95%"></div>
                            </div>
                        </div>

                        <!-- Stat 2 -->
                        <div>
                            <div class="flex justify-between items-baseline mb-2">
                                <span class="text-xs text-gray-400 font-mono uppercase">Coaching & Psychologie</span>
                                <span class="text-2xl font-mono font-black text-gradient"><span class="counter" data-target="250">0</span>+ Std.</span>
                            </div>
                            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="progress-fill h-full bg-gradient-to-r from-red-600 to-pink-600" data-width="85%"></div>
                            </div>
                        </div>

                        <!-- Stat 3 -->
                        <div>
                            <div class="flex justify-between items-baseline mb-2">
                                <span class="text-xs text-gray-400 font-mono uppercase">Praxis-Tests & Optimierungen</span>
                                <span class="text-2xl font-mono font-black text-gradient"><span class="counter" data-target="500">0</span>+</span>
                            </div>
                            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="progress-fill h-full bg-gradient-to-r from-red-600 to-pink-600" data-width="100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sektion 3: Warum ich das mache -->
<section class="py-24 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
    <div class="glow-blob bg-red-600/5 w-[500px] h-[500px] bottom-[-200px] left-[-200px] mix-blend-screen"></div>
    <div class="container mx-auto px-6 max-w-5xl relative z-10">
        <div class="text-center mb-16 trigger-elem scroll-fade-up">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Meine Mission</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">Warum ich das mache</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Point 1 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up">
                <div>
                    <div class="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                        <i data-lucide="camera" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-4">Verständnis</h3>
                    <p class="text-sm text-gray-400 leading-relaxed">
                        Weil ich beides kann: fotografieren und verstehen, warum manche Fotos Matches bringen und andere nicht.
                    </p>
                </div>
            </div>

            <!-- Point 2 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up delay-100">
                <div>
                    <div class="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 mb-6">
                        <i data-lucide="sparkles" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-4">Wirkung</h3>
                    <p class="text-sm text-gray-400 leading-relaxed">
                        Weil ich gesehen habe, wie Freunde plötzlich mehr Reaktionen bekamen, nicht weil sie sich verändert hatten, sondern weil ihr Profil endlich zeigte, wer sie wirklich sind.
                    </p>
                </div>
            </div>

            <!-- Point 3 -->
            <div class="focus-card rounded-3xl p-8 flex flex-col justify-between trigger-elem scroll-fade-up delay-200">
                <div>
                    <div class="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                        <i data-lucide="target" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-4">Sichtbarkeit</h3>
                    <p class="text-sm text-gray-400 leading-relaxed">
                        Und weil ich glaube, dass die meisten Männer auf Dating-Apps nicht scheitern, weil ihnen Persönlichkeit fehlt. Sondern weil niemand ihnen gezeigt hat, wie sie sich richtig darstellen.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sektion 4: Was dich erwartet -->
<section class="py-24 bg-black relative z-10 border-t border-white/5 overflow-hidden">
    <div class="glow-blob bg-pink-600/5 w-[500px] h-[500px] top-[-100px] right-[-200px] mix-blend-screen"></div>
    <div class="container mx-auto px-6 max-w-4xl relative z-10">
        <div class="text-center mb-16 trigger-elem scroll-fade-up">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Das Erlebnis</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-6">Was dich bei mir erwartet</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 trigger-elem scroll-fade-up">
            <!-- Left Column -->
            <div class="space-y-8 relative pl-14">
                <div class="absolute left-0 top-0 text-6xl font-mono font-black text-gradient opacity-10 select-none pointer-events-none">01</div>
                <div>
                    <span class="text-xs font-mono text-red-400 uppercase tracking-widest block mb-3">Der Vibe</span>
                    <h3 class="text-xl font-bold text-white mb-3">Offen und echt</h3>
                    <p class="text-gray-300 text-sm leading-relaxed mb-4">
                        Ich bin laut. Offen. Extrovertiert. Ich mache das mit Spaß und du wirst das merken.
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed font-light">
                        Beim Shooting spaziere ich durch Frankfurt, wir reden über Gott und die Welt und nebenbei entstehen Fotos. Wir können über Gott, über die Welt reden, über Dating, über alles, was dich interessiert. Ich bin offen für viele Themen, sodass du dich wohlfühlst.
                    </p>
                </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-8 relative pl-14">
                <div class="absolute left-0 top-0 text-6xl font-mono font-black text-gradient opacity-10 select-none pointer-events-none">02</div>
                <div>
                    <span class="text-xs font-mono text-pink-400 uppercase tracking-widest block mb-3">Das Gefühl</span>
                    <h3 class="text-xl font-bold text-white mb-3">Mehr Selbstvertrauen</h3>
                    <p class="text-gray-300 text-sm leading-relaxed mb-4">
                        Du gehst nicht nur mit Fotos raus. Du gehst raus mit dem Gefühl: Okay, ich bin eigentlich ein ziemlich cooler Typ. Die Apps haben das nur nie gezeigt.
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed font-light">
                        Kein Coaching. Nur ein gutes Gespräch, gute Fotos und vielleicht der ein oder andere Gedanke, den du mit nach Hause nimmst.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-24 bg-[#050505] relative z-10 border-t border-white/5 text-center">
    <div class="container mx-auto px-6 max-w-3xl trigger-elem scroll-fade-up">
        <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
            Bereit für ein <br><span class="text-gradient">Match-Upgrade?</span>
        </h2>
        <p class="text-gray-400 text-base max-w-lg mx-auto mb-12 font-medium">
            Lass uns Frankfurt zu deinem persönlichen Studio machen. Sichere dir einen der limitierten Slots.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="<?php echo $base_dir; ?>/#pricing" class="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-300 uppercase tracking-wider text-sm">
                <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full"></div>
                <span class="relative flex items-center gap-2">
                    Jetzt Paket wählen
                    <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </span>
            </a>
            <a href="<?php echo $base_dir; ?>/kontakt/" class="inline-block px-10 py-5 border border-white/10 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-sm uppercase tracking-wider">
                Noch Fragen? Schreib mir direkt
            </a>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
