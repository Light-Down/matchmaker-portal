<?php
$page_title = "Die Wissenschaft hinter Online-Dating-Fotos";
$meta_description = "Warum dein Foto in 0,1 Sekunden über deinen Erfolg entscheidet. Wissenschaftliche Zahlen, Algorithmen-Analysen und Fakten zum Dating-Markt in Frankfurt.";
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="relative pt-40 pb-20 overflow-hidden bg-black">
    <div class="glow-blob bg-red-600/10 w-[500px] h-[500px] top-[-100px] right-[-100px] mix-blend-screen"></div>
    <div class="glow-blob bg-pink-600/10 w-[500px] h-[500px] bottom-[-100px] left-[-200px] mix-blend-screen"></div>
    
    <div class="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-red-400 mb-8 trigger-elem scroll-fade-up">
            <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
            Zahlen, Fakten & Algorithmen
        </span>
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-white leading-none trigger-elem scroll-fade-up">
            Die Wissenschaft <br>des <span class="text-gradient">Wischens</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed trigger-elem scroll-fade-up delay-100">
            Dating-Apps sind kein Glücksspiel, sondern mathematische Systeme. Wer die Psychologie hinter dem Swipe und die Algorithmen versteht, gewinnt.
        </p>
    </div>
</section>

<!-- Stats Grid -->
<section class="py-24 bg-[#050505] relative z-10 border-t border-white/5">
    <div class="container mx-auto px-6 max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Stat 1 -->
            <div class="bg-gradient-to-b from-[#141416] to-[#0a0a0c] border border-white/5 rounded-3xl p-8 text-center trigger-elem scroll-fade-up">
                <div class="text-5xl font-black text-red-500 mb-4 font-mono">14%</div>
                <h3 class="text-lg font-bold text-white mb-2">Single-Frauen in Frankfurt</h3>
                <p class="text-xs text-gray-500 leading-relaxed">
                    Über 14% der 776.843 Einwohner Frankfurts sind alleinstehende Frauen. Die höchste Single-Dichte in ganz Deutschland. Das Potential ist riesig.
                </p>
            </div>

            <!-- Stat 2 -->
            <div class="bg-gradient-to-b from-[#141416] to-[#0a0a0c] border border-white/5 rounded-3xl p-8 text-center trigger-elem scroll-fade-up delay-100">
                <div class="text-5xl font-black text-pink-500 mb-4 font-mono">4.5%</div>
                <h3 class="text-lg font-bold text-white mb-2">Selektionsrate der Frauen</h3>
                <p class="text-xs text-gray-500 leading-relaxed">
                    Während Männer (Schrotflinten-Methode) 46-62% aller Profile liken, sind Frauen (Scharfschützen) hochwählerisch und liken im Schnitt nur 4.5% bis 14%.
                </p>
            </div>

            <!-- Stat 3 -->
            <div class="bg-gradient-to-b from-[#141416] to-[#0a0a0c] border border-white/5 rounded-3xl p-8 text-center trigger-elem scroll-fade-up delay-200">
                <div class="text-5xl font-black text-red-500 mb-4 font-mono">0.1s</div>
                <h3 class="text-lg font-bold text-white mb-2">Entscheidungsfenster</h3>
                <p class="text-xs text-gray-500 leading-relaxed">
                    Eine Studie zeigt: Das Gehirn entscheidet in 100 Millisekunden unbewusst über Attraktivität und Status eines Profils. Das Foto entscheidet alles.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Performance Comparison: Visual Progress Bars -->
<section class="py-24 bg-black relative z-10 border-t border-white/5">
    <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16 trigger-elem scroll-fade-up">
            <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Direkter Vergleich</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">Selfies vs. MatchMaker-Fotos</h2>
            <p class="text-gray-400 text-sm mt-4 max-w-md mx-auto">
                Der Einfluss professioneller Optimierung auf deine wichtigsten Dating-Kennzahlen.
            </p>
        </div>

        <div class="space-y-12 bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-12 trigger-elem scroll-fade-up">
            <!-- Metric 1 -->
            <div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-sm font-bold text-white uppercase tracking-wider">Durchschnittliche Match-Rate</span>
                    <span class="text-xs font-mono text-red-400">Bis zu 8x mehr</span>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-gray-500 font-mono">Mit Selfies</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gray-600 h-full rounded-full" data-width="1.5%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-gray-500 font-mono">1.5%</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-white font-bold font-mono">MatchMaker</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gradient-to-r from-red-600 to-pink-600 h-full rounded-full" data-width="12%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-red-500 font-bold font-mono">12%</span>
                    </div>
                </div>
            </div>

            <!-- Metric 2 -->
            <div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-sm font-bold text-white uppercase tracking-wider">Antwortrate auf deine erste Nachricht</span>
                    <span class="text-xs font-mono text-red-400">Erheblich engagiertere Chats</span>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-gray-500 font-mono">Mit Selfies</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gray-600 h-full rounded-full" data-width="12%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-gray-500 font-mono">12%</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-white font-bold font-mono">MatchMaker</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gradient-to-r from-red-600 to-pink-600 h-full rounded-full" data-width="68%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-red-500 font-bold font-mono">68%</span>
                    </div>
                </div>
            </div>

            <!-- Metric 3 -->
            <div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-sm font-bold text-white uppercase tracking-wider">Erfolgreiche Verabredungen (pro Monat)</span>
                    <span class="text-xs font-mono text-red-400">Kontinuierlicher Date-Fluss</span>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-gray-500 font-mono">Mit Selfies</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gray-600 h-full rounded-full" data-width="10%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-gray-500 font-mono">0.5</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-xs text-white font-bold font-mono">MatchMaker</span>
                        <div class="flex-grow bg-white/5 rounded-full h-3 overflow-hidden">
                            <div class="progress-fill bg-gradient-to-r from-red-600 to-pink-600 h-full rounded-full" data-width="80%"></div>
                        </div>
                        <span class="w-12 text-right text-xs text-red-500 font-bold font-mono">4.5</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Psychology & Trust Section -->
<section class="py-24 bg-black relative z-10 border-t border-white/5">
    <div class="container mx-auto px-6 max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="trigger-elem scroll-fade-up">
                <span class="text-xs font-mono text-pink-500 uppercase tracking-widest block mb-4">Dating-Psychologie</span>
                <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-6">
                    Körpersprache <br>& Status-Signale
                </h2>
                <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
                    <p>
                        Wissenschaftliche Untersuchungen zeigen, dass Frauen unbewusst auf drei Kernfaktoren bei Profilbildern achten: <strong class="text-white">Sicherheit, Status und Sozialkompetenz</strong>. Ein Badezimmerspiegel-Selfie oder ein grimmiges Auto-Selfie signalisiert soziale Isolation und mangelnden Aufwand.
                    </p>
                    <p>
                        Ein professioneller Foto-Walk nutzt natürliche Hintergründe (z.B. Cafés, belebte Frankfurter Straßen) und echte Tageslichtstimmungen. Dies zeigt dich in einem dynamischen, aktiven Umfeld und signalisiert sozialen Wert ("Sozialer Beweis").
                    </p>
                    <p>
                        Durch gezielte, entspannte Körperhaltung und einen freundlichen Blickkontakt auf Augenhöhe vermittelst du Nahbarkeit und emotionale Stabilität – Eigenschaften, nach denen Frauen bei der Selektion gezielt filtern.
                    </p>
                </div>
            </div>
            <div class="relative trigger-elem scroll-pop">
                <div class="absolute inset-0 bg-gradient-to-tr from-red-600 to-pink-600 rounded-3xl blur-2xl opacity-15"></div>
                <div class="relative bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 space-y-6">
                    <h4 class="text-white font-bold text-sm uppercase">Psychologische Filter bei Frauen:</h4>
                    <ul class="space-y-4 text-xs text-gray-400">
                        <li class="flex items-start gap-3">
                            <i data-lucide="check" class="w-5 h-5 text-red-500 flex-shrink-0"></i>
                            <div>
                                <strong class="text-white block">Sicherheit statt Risiko:</strong>
                                Unscharfe, dunkle Bilder wirken verdächtig und unzuverlässig (Anti-Catfish Schutzmechanismus).
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <i data-lucide="check" class="w-5 h-5 text-red-500 flex-shrink-0"></i>
                            <div>
                                <strong class="text-white block">Lebensfreude statt Monotonie:</strong>
                                Lächeln und offene Arme wirken einladend, während verschränkte Arme oder fehlender Blickkontakt Abweisung signalisieren.
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <i data-lucide="check" class="w-5 h-5 text-red-500 flex-shrink-0"></i>
                            <div>
                                <strong class="text-white block">Investition & Wertschätzung:</strong>
                                Gute Fotos zeigen, dass dir dein Auftritt wichtig ist. Wer sich Mühe für seine Bilder gibt, zeigt auch im Dating Bemühung.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ELO-Score Explanation -->
<section class="py-24 bg-[#050505] relative z-10 border-t border-white/5">
    <div class="container mx-auto px-6 max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 md:order-1 trigger-elem scroll-pop">
                <div class="absolute inset-0 bg-gradient-to-tr from-pink-600 to-red-600 rounded-3xl blur-2xl opacity-15"></div>
                <div class="relative bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 space-y-6">
                    <div class="flex gap-4 items-start">
                        <div class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                            <i data-lucide="shield-alert" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-sm uppercase mb-1">Der Abwärtsstrudel</h4>
                            <p class="text-xs text-gray-500 leading-relaxed">
                                Schlechte Selfies führen zu Links-Swipes. Der Algorithmus stuft deinen ELO-Score herab. Deine Sichtbarkeit bricht ein, dein Profil wird für attraktive Frauen unsichtbar.
                            </p>
                        </div>
                    </div>
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="flex gap-4 items-start">
                        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-sm uppercase mb-1">Die Aufwärtsspirale</h4>
                            <p class="text-xs text-gray-500 leading-relaxed">
                                Herausragende MatchMaker-Fotos erhöhen deine Rechts-Swipes. Die App stuft dich als hochrelevant ein. Du wirst bevorzugt ausgespielt – auch bei den beliebtesten Profilen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-1 md:order-2 trigger-elem scroll-fade-up">
                <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Tinder, Bumble & Co.</span>
                <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-6">
                    Der ELO-Score <br>und deine Sichtbarkeit
                </h2>
                <div class="space-y-6 text-gray-400 text-sm leading-relaxed">
                    <p>
                        Dating-Apps arbeiten wie Suchmaschinen. Sie wollen den Nutzern die relevantesten Profile zuerst zeigen. Die Relevanz wird durch deinen individuellen Score bestimmt.
                    </p>
                    <p>
                        Wenn dein Profil stetig weggewischt wird, straft dich das System ab. Du hast dann kein Kontaktproblem, sondern ein <strong>Sichtbarkeitsproblem</strong>. Niemand sieht dich mehr.
                    </p>
                    <p>
                        Mit hochwertigen Bildern tricksen wir diesen Kreislauf aus. Du signalisierst dem Algorithmus sofortige Qualität. Mehr Frauen swipen nach rechts, dein Score steigt, und die App spielt dich wie ein Premium-Mitglied aus.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-24 bg-black relative z-10 border-t border-white/5 text-center">
    <div class="container mx-auto px-6 max-w-3xl">
        <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
            Hör auf, unsichtbar <br>zu sein
        </h2>
        <p class="text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-12">
            Die Zahlen sprechen für sich. Lass den Algorithmus für dich arbeiten, statt dich von ihm ausbremsen zu lassen.
        </p>
        <a href="<?php echo $base_dir; ?>/kontakt/" class="inline-block px-10 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-full shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform uppercase tracking-wider text-sm">
            Jetzt Profil updaten
        </a>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
