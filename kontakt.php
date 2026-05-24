<?php
$page_title = "Jetzt Wingman anfragen";
$meta_description = "Nimm Kontakt mit uns auf. Wähle dein Wunsch-Paket und sichere dir ein professionelles Dating-Fotoshooting in Frankfurt für mehr Matches.";
include 'includes/header.php';

$success = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Simple verification (could be sent to email in production)
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $package = $_POST['package'] ?? '';
    $message = $_POST['message'] ?? '';
    
    if (!empty($name) && !empty($email)) {
        $success = true;
    }
}
?>

<!-- Content Section -->
<section class="relative pt-40 pb-24 overflow-hidden bg-black min-h-[85vh] flex items-center">
    <div class="glow-blob bg-red-600/10 w-[500px] h-[500px] top-[-100px] right-[-100px] mix-blend-screen"></div>
    <div class="glow-blob bg-pink-600/10 w-[500px] h-[500px] bottom-[-100px] left-[-200px] mix-blend-screen"></div>

    <div class="container mx-auto px-6 relative z-10 max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <!-- Left description -->
            <div class="col-span-1 md:col-span-5 trigger-elem scroll-fade-up">
                <span class="text-xs font-mono text-red-500 uppercase tracking-widest block mb-4">Start Jetzt</span>
                <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-6">
                    Bereit für den <br><span class="text-gradient">Unterschied?</span>
                </h1>
                <p class="text-gray-400 text-sm leading-relaxed mb-6">
                    Füll das Formular aus. Wir melden uns innerhalb von 24 Stunden bei dir, um den Vibe-Check zu machen und deinen Termin zu loggen.
                </p>
                <div class="space-y-4">
                    <div class="flex items-center gap-3 text-xs text-gray-400">
                        <i data-lucide="check-circle2" class="w-5 h-5 text-red-500"></i>
                        <span>Keine Model-Erfahrung nötig</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-400">
                        <i data-lucide="check-circle2" class="w-5 h-5 text-pink-500"></i>
                        <span>100% diskret & vertraulich</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-400">
                        <i data-lucide="check-circle2" class="w-5 h-5 text-red-500"></i>
                        <span>Lieferung der Bilder in 24-48h</span>
                    </div>
                </div>
            </div>

            <!-- Right form -->
            <div class="col-span-1 md:col-span-7 trigger-elem scroll-pop delay-100">
                <div class="relative bg-gradient-to-b from-[#141416] to-[#0c0c0e] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    
                    <?php if ($success): ?>
                        <div class="text-center py-12">
                            <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                                <i data-lucide="check" class="w-8 h-8"></i>
                            </div>
                            <h3 class="text-2xl font-black text-white uppercase tracking-tight mb-4">Anfrage erhalten!</h3>
                            <p class="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                                Vielen Dank, <?php echo htmlspecialchars($name); ?>. Dein Wingman wird sich in Kürze per WhatsApp oder E-Mail bei dir melden, um alles Weitere zu besprechen.
                            </p>
                        </div>
                    <?php else: ?>
                        <form action="" method="POST" class="space-y-6">
                            <div>
                                <label for="name" class="block text-xs font-mono uppercase text-gray-400 mb-2">Dein Name</label>
                                <input type="text" id="name" name="name" required placeholder="z.B. Markus Schmidt"
                                    class="w-full bg-[#1c1c1e] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none transition-colors">
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label for="email" class="block text-xs font-mono uppercase text-gray-400 mb-2">E-Mail Adresse</label>
                                    <input type="email" id="email" name="email" required placeholder="name@beispiel.de"
                                        class="w-full bg-[#1c1c1e] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none transition-colors">
                                </div>
                                <div>
                                    <label for="phone" class="block text-xs font-mono uppercase text-gray-400 mb-2">Telefonnummer / WhatsApp</label>
                                    <input type="tel" id="phone" name="phone" placeholder="+49 170 1234567"
                                        class="w-full bg-[#1c1c1e] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none transition-colors">
                                </div>
                            </div>

                            <div>
                                <label for="package" class="block text-xs font-mono uppercase text-gray-400 mb-2">Wunsch-Paket</label>
                                <select id="package" name="package"
                                    class="w-full bg-[#1c1c1e] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none transition-colors">
                                    <option value="magnet">Match-Magnet (Bestseller)</option>
                                    <option value="booster">Profil-Booster</option>
                                    <option value="wingman">Ultimate Wingman</option>
                                </select>
                            </div>

                            <div>
                                <label for="message" class="block text-xs font-mono uppercase text-gray-400 mb-2">Nachricht oder Anmerkungen (Optional)</label>
                                <textarea id="message" name="message" rows="3" placeholder="Gibt es etwas, das wir wissen sollten? (z.B. Wunschtermin)"
                                    class="w-full bg-[#1c1c1e] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none transition-colors resize-none"></textarea>
                            </div>

                            <button type="submit" class="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider text-xs">
                                Wingman anfordern
                            </button>
                        </form>
                    <?php endif; ?>
                    
                </div>
            </div>

        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
