document.addEventListener('DOMContentLoaded', () => {
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
        let width = container.clientWidth;
        let height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTargetMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uScrollSpeed: { value: 0 },
            uResolution: { value: new THREE.Vector2(width, height) }
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

        // Resize handler
        window.addEventListener('resize', () => {
            width = container.clientWidth;
            height = container.clientHeight;
            renderer.setSize(width, height);
            uniforms.uResolution.value.set(width, height);
        });

        // Transition opacity
        canvas.style.opacity = '1';
        const fallback = document.getElementById('hero-fallback-blobs');
        if (fallback) fallback.style.opacity = '0.15'; // dim fallback blobs

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            uniforms.uMouse.value.lerp(uniforms.uTargetMouse.value, 0.05);
            uniforms.uScrollSpeed.value += (scrollSpeed - uniforms.uScrollSpeed.value) * 0.05;
            scrollSpeed *= 0.95;
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        }
        animate();
    }

    // --- WEBGL METAMORPHOSE REVEAL SHADER ---
    let useWebGLReveal = false;
    let revealMaterial = null;

    function initRevealShader() {
        const canvas = document.getElementById('reveal-canvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const loader = new THREE.TextureLoader();
        let loadedCount = 0;

        function checkLoaded() {
            loadedCount++;
            if (loadedCount === 2) {
                setupScene();
            }
        }

        const beforeTexture = loader.load('assets/images/portrait-before.png', checkLoaded, undefined, () => {
            console.warn("WebGL reveal before texture load failed.");
        });
        const afterTexture = loader.load('assets/images/portrait-after.png', checkLoaded, undefined, () => {
            console.warn("WebGL reveal after texture load failed.");
        });

        function setupScene() {
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height);

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const geometry = new THREE.PlaneGeometry(2, 2);

            revealMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTextureBefore: { value: beforeTexture },
                    uTextureAfter: { value: afterTexture },
                    uProgress: { value: 0.0 },
                    uTime: { value: 0.0 },
                    uResolution: { value: new THREE.Vector2(width, height) }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D uTextureBefore;
                    uniform sampler2D uTextureAfter;
                    uniform float uProgress;
                    uniform float uTime;
                    uniform vec2 uResolution;
                    varying vec2 vUv;

                    void main() {
                        vec2 uv = vUv;
                        
                        float progressFactor = sin(uProgress * 3.14159265);
                        float wave = sin(uv.y * 12.0 + uTime * 2.0) * 0.035 * progressFactor;
                        float wave2 = cos(uv.y * 30.0 - uTime * 1.5) * 0.015 * progressFactor;
                        
                        float edge = uProgress + wave + wave2;
                        
                        vec4 imgAfter = texture2D(uTextureAfter, uv);
                        vec4 imgBefore = texture2D(uTextureBefore, uv);
                        
                        // Apply grayscale and lower opacity matching the original fallback style
                        float gray = dot(imgBefore.rgb, vec3(0.299, 0.587, 0.114));
                        imgBefore.rgb = vec3(gray) * 0.8;
                        
                        float mixVal = smoothstep(edge - 0.012, edge + 0.012, uv.x);
                        vec4 color = mix(imgAfter, imgBefore, mixVal);
                        
                        // Liquid glow edge
                        float borderGlow = smoothstep(0.015, 0.0, abs(uv.x - edge)) * progressFactor;
                        vec3 glowColor = vec3(0.99, 0.16, 0.48) * borderGlow * 1.8;
                        color.rgb += glowColor;
                        
                        gl_FragColor = color;
                    }
                `
            });

            const mesh = new THREE.Mesh(geometry, revealMaterial);
            scene.add(mesh);

            window.addEventListener('resize', () => {
                const w = container.clientWidth;
                const h = container.clientHeight;
                renderer.setSize(w, h);
                revealMaterial.uniforms.uResolution.value.set(w, h);
            });

            useWebGLReveal = true;

            const fallback = document.getElementById('reveal-fallback-container');
            if (fallback) fallback.style.opacity = '0';
            canvas.style.opacity = '1';

            const clock = new THREE.Clock();
            function render() {
                requestAnimationFrame(render);
                revealMaterial.uniforms.uTime.value = clock.getElapsedTime();
                renderer.render(scene, camera);
            }
            render();
        }
    }

    // --- WEBGL MANIFESTO SHADER ---
    function initManifestoShader() {
        const canvas = document.getElementById('manifesto-canvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        let width = container.clientWidth;
        let height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(width, height) }
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
                uniform vec2 uResolution;
                varying vec2 vUv;

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
                    for (int i = 0; i < 3; ++i) {
                        v += a * noise(p);
                        p = p * 2.0 + vec2(10.0);
                        a *= 0.5;
                    }
                    return v;
                }

                void main() {
                    vec2 uv = vUv;
                    vec2 st = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

                    // Breathing scale
                    float breathe = sin(uTime * 0.3) * 0.03 + 0.97;
                    st *= breathe;

                    // Flowing noise
                    vec2 flow = vec2(uTime * 0.015, uTime * 0.01);
                    float n = fbm(st * 2.0 + flow);

                    // Radial center glow
                    float dist = length(st);
                    float radial = smoothstep(0.8, 0.0, dist);

                    // Palette (Subtle/Dark Violet and Crimson tones for readability)
                    vec3 colorBg = vec3(0.0, 0.0, 0.0); // True black
                    vec3 colorViolet = vec3(0.06, 0.01, 0.12); // Extra subtle dark violet
                    vec3 colorCrimson = vec3(0.35, 0.03, 0.10); // Subtle dark red/crimson

                    vec3 color = mix(colorBg, colorViolet, radial * 0.6);
                    color = mix(color, colorCrimson, n * radial * 0.4);

                    // Edge fadeout (fade to black at top and bottom boundaries of the section)
                    float edgeFade = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
                    vec3 finalColor = mix(colorBg, color, edgeFade);

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Resize handler
        window.addEventListener('resize', () => {
            width = container.clientWidth;
            height = container.clientHeight;
            renderer.setSize(width, height);
            uniforms.uResolution.value.set(width, height);
        });

        // Hide fallback & show canvas
        canvas.style.opacity = '1';
        const fallback = document.getElementById('manifesto-fallback');
        if (fallback) fallback.style.opacity = '0';

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        }
        animate();
    }

    // --- WEBGL FINAL CTA SHADER ---
    function initCtaShader() {
        const canvas = document.getElementById('cta-canvas');
        if (!canvas) return;

        const container = canvas.parentElement;
        let width = container.clientWidth;
        let height = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTargetMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(width, height) }
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
                uniform vec2 uResolution;
                varying vec2 vUv;

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
                    for (int i = 0; i < 3; ++i) {
                        v += a * noise(p);
                        p = p * 2.0 + vec2(10.0);
                        a *= 0.5;
                    }
                    return v;
                }

                void main() {
                    vec2 uv = vUv;
                    vec2 st = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

                    // Mouse influence
                    float mouseDist = distance(uv, uMouse);
                    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist);

                    // Breathing scale
                    float breathe = sin(uTime * 0.4) * 0.04 + 0.96;
                    st *= breathe;

                    // Flowing noise
                    vec2 flow = vec2(uTime * 0.02, uTime * 0.015);
                    float n = fbm(st * 2.5 + flow);

                    // Radial center glow
                    float dist = length(st);
                    float radial = smoothstep(0.7, 0.0, dist);

                    // Colors (Tinder tones but dark and warm)
                    vec3 colorBg = vec3(0.0, 0.0, 0.0); // True black
                    vec3 colorCrimson = vec3(0.45, 0.05, 0.12); // Warm crimson glow
                    vec3 colorViolet = vec3(0.12, 0.01, 0.20); // Subdued violet

                    vec3 color = mix(colorBg, colorViolet, radial * 0.7);
                    color = mix(color, colorCrimson, n * radial * 0.6);

                    // Interactive mouse ripple glow
                    color += vec3(0.99, 0.16, 0.48) * mouseInfluence * 0.12;

                    // Edge fadeout (blend seamlessly into black at top and bottom boundaries of the section)
                    float edgeFade = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
                    vec3 finalColor = mix(colorBg, color, edgeFade);

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Track pointer movements inside final-cta section
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1.0 - ((e.clientY - rect.top) / rect.height);
                uniforms.uTargetMouse.value.set(x, y);
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                    const x = (touch.clientX - rect.left) / rect.width;
                    const y = 1.0 - ((touch.clientY - rect.top) / rect.height);
                    uniforms.uTargetMouse.value.set(x, y);
                }
            }
        });

        // Resize handler
        window.addEventListener('resize', () => {
            width = container.clientWidth;
            height = container.clientHeight;
            renderer.setSize(width, height);
            uniforms.uResolution.value.set(width, height);
        });

        // Hide fallback & show canvas
        canvas.style.opacity = '1';
        const fallback = document.getElementById('final-cta-fallback');
        if (fallback) fallback.style.opacity = '0';

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            uniforms.uMouse.value.lerp(uniforms.uTargetMouse.value, 0.05);
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        }
        animate();
    }

    if (window.THREE) {
        initHeroShader();
        initRevealShader();
        initManifestoShader();
        initCtaShader();
    }

    // GSAP HERO ANIMATION
    if (window.gsap) {
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
    }

    // GSAP TRANSFORMATION REVEAL
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const revealTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".reveal-section",
                start: "top top",
                end: "+=150%",
                scrub: 0.5,
                pin: true,
                anticipatePin: 1
            }
        });

        // Animate shader uniform progress & badges in sync
        const revealObj = { progress: 0.0 };
        revealTL.to(revealObj, {
            progress: 1.0,
            ease: "none",
            onUpdate: () => {
                if (useWebGLReveal && revealMaterial) {
                    revealMaterial.uniforms.uProgress.value = revealObj.progress;
                }
                
                // Animate HTML badges based on timeline progress
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

        // Maintain fallback CSS wipe animation in parallel
        revealTL.to("#reveal-before-box", {
            clipPath: "inset(0 100% 0 0)",
            ease: "none"
        }, 0);

        // Fade out hint immediately as we start scrolling
        revealTL.to(".reveal-hint", {
            opacity: 0,
            scale: 0.5,
            duration: 0.1
        }, 0);
    }

    // TINDER SWIPER LOGIC WITH 3D ELASTIC DRAG
    const swiperContainer = document.querySelector('.swiper-wrapper');
    if (swiperContainer) {
        const dislikeBtn = document.getElementById('swiper-dislike');
        const likeBtn = document.getElementById('swiper-like');

        function swipe(direction, forceSwipe = false) {
            const activeCard = swiperContainer.querySelector('.swiper-card:nth-last-child(1)');
            if (!activeCard || activeCard.classList.contains('swiper-final-card')) return;

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
                const remainingCards = swiperContainer.querySelectorAll('.swiper-card');
                if (remainingCards.length === 1 && remainingCards[0].classList.contains('swiper-final-card')) {
                    if (dislikeBtn) dislikeBtn.style.opacity = '0.3';
                    if (likeBtn) likeBtn.style.opacity = '0.3';
                }
                initDragEvents(); // initialize drag events for next card in stack
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

                const rotate = deltaX * 0.08;
                const rotateY = -deltaX * 0.04;
                const rotateX = deltaY * 0.04;
                const skew = deltaX * 0.03;

                activeCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotate}deg) rotateY(${rotateY}deg) rotateX(${rotateX}deg) skewX(${skew}deg)`;
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

        // Initial setup for the first card in stack
        initDragEvents();
    }
});
