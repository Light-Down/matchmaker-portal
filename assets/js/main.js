document.addEventListener('DOMContentLoaded', () => {
    const assetScript = document.getElementById('matchmaker-main');
    const runtimeAssets = {
        three: assetScript?.dataset.three,
        gsap: assetScript?.dataset.gsap,
        scrollTrigger: assetScript?.dataset.scrollTrigger,
        portraitBefore: assetScript?.dataset.portraitBefore || 'assets/images/portrait-before.webp',
        portraitAfter: assetScript?.dataset.portraitAfter || 'assets/images/portrait-after.webp'
    };

    if (window.lucide) {
        lucide.createIcons();
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuToggleLabel = document.getElementById('menu-toggle-label');
    const menuOverlay = document.getElementById('menu-overlay');

    if (menuToggle && menuToggleLabel && menuOverlay) {
        const setMenuState = (open) => {
            menuToggle.checked = open;
            menuToggleLabel.setAttribute('aria-expanded', open ? 'true' : 'false');
            menuToggleLabel.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
        };

        menuToggle.addEventListener('change', () => setMenuState(menuToggle.checked));
        menuToggleLabel.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMenuState(!menuToggle.checked);
            }
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });
        menuOverlay.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.checked) {
                setMenuState(false);
                menuToggleLabel.focus();
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;

            if (entry.isIntersecting) {
                el.classList.add('in-view');

                const bars = el.querySelectorAll('.progress-fill');
                bars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));

                const counters = el.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                });

            } else {
                el.classList.remove('in-view');

                const bars = el.querySelectorAll('.progress-fill');
                bars.forEach(bar => bar.style.width = '0%');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.trigger-elem, .focus-card, .ghost-focus, .manifesto-line').forEach(el => observer.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 4000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * ease);
            el.innerText = current;

            if (progress < 1) requestAnimationFrame(update);
            else el.innerText = target;
        }
        requestAnimationFrame(update);
    }

    // --- WEBGL HERO SHADER ---
    function initHeroShader() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTargetMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uScrollSpeed: { value: 0 },
            uResolution: { value: new THREE.Vector2(1, 1) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uScrollSpeed;
                uniform vec2 uResolution;
                varying vec2 vUv;

                // Hash & noise functions for high-quality organic movement
                float hash(vec2 p) {
                    p = fract(p * vec2(123.34, 456.21));
                    p += dot(p, p + 45.32);
                    return fract(p.x * p.y);
                }

                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    float a = hash(i);
                    float b = hash(i + vec2(1.0, 0.0));
                    float c = hash(i + vec2(0.0, 1.0));
                    float d = hash(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }

                float fbm(vec2 p) {
                    float v = 0.0;
                    float a = 0.5;
                    vec2 shift = vec2(100.0);
                    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
                    for (int i = 0; i < 4; ++i) {
                        v += a * noise(p);
                        p = rot * p * 2.0 + shift;
                        a *= 0.5;
                    }
                    return v;
                }

                void main() {
                    vec2 uv = vUv;
                    vec2 st = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) + 0.5;

                    // Mouse movement tracking
                    float mouseDist = distance(uv, uMouse);
                    float mouseGlow = smoothstep(0.45, 0.0, mouseDist);
                    vec2 mouseOffset = (uv - uMouse) * mouseGlow * 0.15;

                    // Domain Warping using multiple FBM octaves
                    vec2 q = vec2(
                        fbm(st * 1.5 + vec2(0.0, 0.0) + uTime * 0.04 - mouseOffset),
                        fbm(st * 1.5 + vec2(5.2, 1.3) + uTime * 0.03 - mouseOffset)
                    );

                    vec2 r = vec2(
                        fbm(st * 1.8 + 4.0 * q + vec2(1.7, 9.2) + uTime * 0.015),
                        fbm(st * 1.8 + 4.0 * q + vec2(8.3, 2.8) + uTime * 0.02)
                    );

                    float f = fbm(st * 1.2 + 4.0 * r + uScrollSpeed * 0.1);

                    // Premium brand color palette
                    vec3 colorBg = vec3(0.0196, 0.0196, 0.0196); // #050505 (exact body color match)
                    vec3 colorViolet = vec3(0.12, 0.02, 0.22); // Deep premium dark violet
                    vec3 colorRed = vec3(0.99, 0.16, 0.48); // Tinder Red #FD297B
                    vec3 colorOrange = vec3(1.0, 0.40, 0.36); // Tinder Orange-Pink #FF655B

                    // Blend colors dynamically based on warped noise coordinates
                    vec3 color = mix(colorBg, colorViolet, clamp(f * 2.2, 0.0, 1.0));
                    color = mix(color, colorRed, clamp(length(q), 0.0, 1.0) * f * 1.4);
                    color = mix(color, colorOrange, clamp(r.x * r.y * 1.5, 0.0, 1.0) * f);

                    // Interactive glows & highlights
                    color += vec3(1.0, 0.5, 0.6) * mouseGlow * 0.18;
                    color += colorRed * uScrollSpeed * 0.12;

                    // Fade to body background color smoothly at the bottom edge
                    float bottomFade = smoothstep(0.0, 0.35, uv.y);
                    vec3 finalColor = mix(colorBg, color, bottomFade);

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Desktop mouse tracking
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - (e.clientY / window.innerHeight);
            uniforms.uTargetMouse.value.set(x, y);
        });

        // Mobile touch tracking
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const x = e.touches[0].clientX / window.innerWidth;
                const y = 1.0 - (e.touches[0].clientY / window.innerHeight);
                uniforms.uTargetMouse.value.set(x, y);
            }
        });

        // Scroll tracking for dynamics
        let lastScrollY = window.scrollY;
        let scrollSpeed = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollSpeed = Math.abs(currentScrollY - lastScrollY) * 0.05;
            lastScrollY = currentScrollY;
        });

        // Use ResizeObserver instead of clientWidth/clientHeight queries to prevent forced synchronous reflow (layout thrashing)
        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries || entries.length === 0) return;
            const entry = entries[0];
            const w = entry.contentRect.width || 100;
            const h = entry.contentRect.height || 100;
            renderer.setSize(w, h);
            uniforms.uResolution.value.set(w, h);
        });
        resizeObserver.observe(container);

        // Transition opacity
        canvas.style.opacity = '1';
        const fallback = document.getElementById('hero-fallback-blobs');
        if (fallback) fallback.style.opacity = '0.15'; // dim fallback blobs

        let isHeroVisible = true;
        const heroVisibilityObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries.some((entry) => entry.isIntersecting);
        }, { threshold: 0.01 });
        heroVisibilityObserver.observe(canvas);

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            if (!isHeroVisible) return;
            uniforms.uMouse.value.lerp(uniforms.uTargetMouse.value, 0.05);
            uniforms.uScrollSpeed.value += (scrollSpeed - uniforms.uScrollSpeed.value) * 0.05;
            scrollSpeed *= 0.95;
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        }
        animate();
    }

    function loadScriptOnce(src) {
        if (!src) return Promise.reject(new Error('Missing script URL'));
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function initGsapMotion() {
        if (!window.gsap) return;

        gsap.from(".hero-title", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power4.out",
            delay: 0.2
        });

        gsap.from(".hero-content", {
            duration: 1.2,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            delay: 0.6
        });

        if (!window.ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        const revealTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".reveal-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.35
            }
        });

        const revealObj = { progress: 0.0 };
        revealTL.to(revealObj, {
            progress: 1.0,
            ease: "none",
            onUpdate: () => {
                const badgeBefore = document.getElementById('badge-before');
                const badgeAfter = document.getElementById('badge-after');
                if (badgeBefore) {
                    badgeBefore.style.opacity = Math.max(0, 1 - revealObj.progress * 2.2);
                    badgeBefore.style.transform = `translateX(${-revealObj.progress * 40}px)`;
                }
                if (badgeAfter) {
                    badgeAfter.style.opacity = Math.min(1, Math.max(0, (revealObj.progress - 0.55) * 2.2));
                    badgeAfter.style.transform = `translateX(${(1 - revealObj.progress) * 40}px)`;
                }
            }
        }, 0);

        revealTL.to("#reveal-before-box", {
            clipPath: "inset(0 100% 0 0)",
            ease: "none"
        }, 0);

        revealTL.to(".reveal-hint", {
            opacity: 0,
            scale: 0.5,
            duration: 0.1
        }, 0);
    }

    function startVisualEngines() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        loadScriptOnce(runtimeAssets.three)
            .then(() => {
                if (!window.THREE) return;
                // Defer to setTimeout to allow any dynamic script append layout invalidation tasks to settle, preventing forced reflow
                setTimeout(() => {
                    initHeroShader();
                }, 50);
            })
            .catch(() => {});

        loadScriptOnce(runtimeAssets.gsap)
            .then(() => loadScriptOnce(runtimeAssets.scrollTrigger))
            .then(() => {
                // Defer to setTimeout to prevent layout thrashing from ScrollTrigger measuring trigger elements immediately
                setTimeout(() => {
                    initGsapMotion();
                }, 50);
            })
            .catch(() => {});
    }

    const scheduleVisualEngines = () => {
        let started = false;
        const start = () => {
            if (started) return;
            started = true;
            if ('requestIdleCallback' in window) {
                requestIdleCallback(startVisualEngines, { timeout: 1200 });
            } else {
                startVisualEngines();
            }
        };

        ['pointerdown', 'pointermove', 'scroll', 'keydown', 'touchstart'].forEach((eventName) => {
            window.addEventListener(eventName, start, { once: true, passive: true });
        });
        setTimeout(start, 3500);
    };

    if (document.readyState === 'complete') {
        scheduleVisualEngines();
    } else {
        window.addEventListener('load', scheduleVisualEngines, { once: true });
    }

    // PROFILE QUIZ SWIPER
    const swiperContainer = document.querySelector('.swiper-wrapper');
    if (swiperContainer) {
        const dislikeBtn = document.getElementById('swiper-dislike');
        const likeBtn = document.getElementById('swiper-like');
        const originalCards = Array.from(swiperContainer.children).map((card) => card.cloneNode(true));
        let quizScore = 0;
        let answeredQuestions = 0;

        const getQuestionTotal = () => swiperContainer.querySelectorAll('.quiz-card').length || 5;
        let quizTotal = getQuestionTotal();

        function setButtonState(isComplete) {
            swiperContainer.classList.toggle('quiz-complete', isComplete);
            if (dislikeBtn) dislikeBtn.disabled = isComplete;
            if (likeBtn) likeBtn.disabled = isComplete;
        }

        function bindRestartButton() {
            const restartBtn = document.getElementById('quiz-restart');
            if (!restartBtn || restartBtn.dataset.bound) return;
            restartBtn.dataset.bound = 'true';
            restartBtn.addEventListener('click', resetQuiz);
        }

        function updateQuizResult() {
            const scoreValue = document.getElementById('quiz-score-value');
            const resultTitle = document.getElementById('quiz-result-title');
            const resultCopy = document.getElementById('quiz-result-copy');

            const outcomes = [
                {
                    min: 5,
                    title: 'Starker Blick. Du erkennst Wirkung.',
                    copy: 'Du siehst schon sehr gut, welche Bilder wirklich tragen. Jetzt geht es vor allem darum, diese Wirkung konsequent in eine starke Profil-Serie zu übersetzen.'
                },
                {
                    min: 3,
                    title: 'Gutes Auge, aber ein paar Bilder kosten Wirkung.',
                    copy: 'Du erkennst viele Signale richtig. Wahrscheinlich liegt dein größter Hebel nicht bei einzelnen Fotos, sondern bei Reihenfolge, Kontext und dem Gefühl der ganzen Serie.'
                },
                {
                    min: 0,
                    title: 'Da liegt noch viel Match-Potenzial.',
                    copy: 'Du bewertest Bilder vermutlich noch zu sehr nach Oberfläche. Gute Dating-Fotos müssen sofort Klarheit, Energie und echten Kontext liefern.'
                }
            ];

            const outcome = outcomes.find((item) => quizScore >= item.min);
            if (scoreValue) scoreValue.textContent = `${quizScore}/${quizTotal} Punkte`;
            if (resultTitle && outcome) resultTitle.textContent = outcome.title;
            if (resultCopy && outcome) resultCopy.textContent = outcome.copy;
        }

        function resetQuiz() {
            swiperContainer.replaceChildren(...originalCards.map((card) => card.cloneNode(true)));
            quizScore = 0;
            answeredQuestions = 0;
            quizTotal = getQuestionTotal();
            setButtonState(false);
            bindRestartButton();
            initDragEvents();

            if (window.lucide) {
                lucide.createIcons();
            }
        }

        function swipe(direction, forceSwipe = false) {
            const activeCard = swiperContainer.querySelector('.swiper-card:nth-last-child(1)');
            if (!activeCard || activeCard.classList.contains('swiper-final-card')) return;

            const correctDirection = activeCard.dataset.correct;
            if (correctDirection) {
                answeredQuestions += 1;
                if (direction === correctDirection) {
                    quizScore += 1;
                }
            }

            if (forceSwipe) {
                activeCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease';
                if (direction === 'left') {
                    activeCard.style.transform = 'translate3d(-150%, -20px, 0) rotate(-20deg)';
                    activeCard.style.opacity = '0';
                } else {
                    activeCard.style.transform = 'translate3d(150%, -20px, 0) rotate(20deg)';
                    activeCard.style.opacity = '0';
                }
            }

            setTimeout(() => {
                activeCard.remove();
                const remainingQuestions = swiperContainer.querySelectorAll('.quiz-card');
                if (remainingQuestions.length === 0 || answeredQuestions >= quizTotal) {
                    updateQuizResult();
                    setButtonState(true);
                }
                initDragEvents();
            }, 450);
        }

        function initDragEvents() {
            const activeCard = swiperContainer.querySelector('.swiper-card:nth-last-child(1)');
            if (!activeCard || activeCard.classList.contains('swiper-final-card')) return;
            if (activeCard.dataset.dragInitialized) return;
            activeCard.dataset.dragInitialized = true;

            let isDragging = false;
            let startX = 0, startY = 0;
            let currentX = 0, currentY = 0;

            const onPointerDown = (e) => {
                if (e.target.closest('button, a, input')) return;
                
                isDragging = true;
                startX = e.clientX || (e.touches && e.touches[0].clientX) || e.pageX;
                startY = e.clientY || (e.touches && e.touches[0].clientY) || e.pageY;
                
                activeCard.style.transition = 'none';
                activeCard.style.cursor = 'grabbing';
                
                document.addEventListener('pointermove', onPointerMove);
                document.addEventListener('pointerup', onPointerUp);
            };

            const onPointerMove = (e) => {
                if (!isDragging) return;
                currentX = e.clientX || (e.touches && e.touches[0].clientX) || e.pageX;
                currentY = e.clientY || (e.touches && e.touches[0].clientY) || e.pageY;
                
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                const rotate = deltaX * 0.07;

                activeCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotate}deg)`;
            };

            const onPointerUp = () => {
                if (!isDragging) return;
                isDragging = false;
                
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onPointerUp);

                activeCard.style.cursor = '';
                const deltaX = currentX - startX;

                if (Math.abs(deltaX) > 130) {
                    const direction = deltaX > 0 ? 'right' : 'left';
                    activeCard.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
                    if (direction === 'left') {
                        activeCard.style.transform = 'translate3d(-150%, -20px, 0) rotate(-20deg)';
                        activeCard.style.opacity = '0';
                    } else {
                        activeCard.style.transform = 'translate3d(150%, -20px, 0) rotate(20deg)';
                        activeCard.style.opacity = '0';
                    }
                    swipe(direction, false);
                } else {
                    activeCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    activeCard.style.transform = '';
                }
            };

            activeCard.addEventListener('pointerdown', onPointerDown);
        }

        if (dislikeBtn) dislikeBtn.addEventListener('click', () => swipe('left', true));
        if (likeBtn) likeBtn.addEventListener('click', () => swipe('right', true));

        bindRestartButton();
        initDragEvents();
    }
});
