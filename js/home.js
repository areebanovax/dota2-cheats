        (function () {
            var CHECKOUT_URL = 'https://zadeyo.com/go/AREEBA?to=%2Fproducts%2Fdota-2-novaxware';

            document.querySelectorAll('.checkout-link').forEach(function (link) {
                link.setAttribute('href', CHECKOUT_URL);
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.location.href = CHECKOUT_URL;
                });
            });

            var i18n = window.SITE_I18N || { translations: { en: {} } };
            var translations = i18n.translations;
            var languages = [
                { id: 'en', country: 'gb', name: 'English', code: 'EN' },
                { id: 'tr', country: 'tr', name: 'Turkce', code: 'TR' },
                { id: 'ar', country: 'sa', name: 'Arabic', code: 'AR' },
                { id: 'de', country: 'de', name: 'Deutsch', code: 'DE' },
                { id: 'fr', country: 'fr', name: 'Francais', code: 'FR' },
                { id: 'es', country: 'es', name: 'Espanol', code: 'ES' },
                { id: 'pt', country: 'pt', name: 'Portugues', code: 'PT' },
                { id: 'ru', country: 'ru', name: 'Russian', code: 'RU' },
                { id: 'ja', country: 'jp', name: 'Japanese', code: 'JA' },
                { id: 'ko', country: 'kr', name: 'Korean', code: 'KO' },
                { id: 'zh', country: 'cn', name: 'Chinese', code: 'ZH' },
                { id: 'hi', country: 'in', name: 'Hindi', code: 'HI' },
                { id: 'ur', country: 'pk', name: 'Urdu', code: 'UR' },
                { id: 'id', country: 'id', name: 'Bahasa', code: 'ID' },
                { id: 'pl', country: 'pl', name: 'Polski', code: 'PL' },
                { id: 'nl', country: 'nl', name: 'Nederlands', code: 'NL' },
                { id: 'it', country: 'it', name: 'Italiano', code: 'IT' }
            ];

            var currentLang = localStorage.getItem('site-lang') || 'en';
            var urlLang = new URLSearchParams(window.location.search).get('lang');
            if (urlLang && translations[urlLang]) {
                currentLang = urlLang;
            }
            var planOptions = document.querySelectorAll('.plan-card');
            var buyNowText = document.getElementById('buy-now-text');
            var summaryDuration = document.getElementById('summary-duration');
            var langSwitcher = document.getElementById('lang-switcher');
            var langToggle = document.getElementById('lang-toggle');
            var langDropdown = document.getElementById('lang-dropdown');
            var langCurrentFlag = document.getElementById('lang-current-flag');
            var langCurrentCode = document.getElementById('lang-current-code');

            var checkSvg = '<svg class="lang-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

            function flagImg(country, name) {
                var alt = (name ? String(name) : 'Language') + ' flag';
                return '<img src="https://flagcdn.com/w40/' + country + '.png" alt="' + alt.replace(/"/g, '') + '" class="lang-flag-img" width="22" height="16" loading="lazy">';
            }

            function getLangMeta(lang) {
                for (var i = 0; i < languages.length; i++) {
                    if (languages[i].id === lang) return languages[i];
                }
                return languages[0] || { country: 'gb', code: 'EN' };
            }

            function buildLangDropdown() {
                var header = document.createElement('li');
                header.className = 'lang-dropdown-header';
                header.setAttribute('data-i18n', 'lang.header');
                header.textContent = t('lang.header');
                langDropdown.appendChild(header);

                languages.forEach(function (lang) {
                    var li = document.createElement('li');
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'lang-option';
                    btn.setAttribute('data-lang', lang.id);
                    btn.setAttribute('role', 'option');
                    btn.innerHTML =
                        '<span class="lang-option-flag">' + flagImg(lang.country, lang.name) + '</span>' +
                        '<span class="lang-option-name">' + lang.name + '</span>' +
                        '<span class="lang-option-code">' + lang.code + '</span>' +
                        checkSvg;
                    btn.addEventListener('click', function (e) {
                        e.stopPropagation();
                        setLanguage(lang.id);
                        langSwitcher.classList.remove('open');
                        langToggle.setAttribute('aria-expanded', 'false');
                    });
                    li.appendChild(btn);
                    langDropdown.appendChild(li);
                });
            }

            function t(key) {
                return (translations[currentLang] && translations[currentLang][key]) ||
                    (translations.en && translations.en[key]) ||
                    key;
            }

            function updatePricingSummary() {
                var selected = document.querySelector('.plan-card.selected');
                if (!selected || !buyNowText || !summaryDuration) return;
                var price = selected.getAttribute('data-price');
                var plan = selected.getAttribute('data-plan');
                var planKey = plan === 'lifetime' ? 'pricing.lifetime' : 'pricing.monthly';
                buyNowText.textContent = t('pricing.buyNow') + ' - $' + price;
                summaryDuration.textContent = t(planKey);
            }

            function updateSeoMeta(lang) {
                var title = (translations[lang] && translations[lang]['seo.title']) ||
                    (translations.en && translations.en['seo.title']);
                var desc = (translations[lang] && translations[lang]['seo.description']) ||
                    (translations.en && translations.en['seo.description']);
                if (title) document.title = title;
                var metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc && desc) metaDesc.setAttribute('content', desc);
                var ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle && title) ogTitle.setAttribute('content', title);
                var ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc && desc) ogDesc.setAttribute('content', desc);
                var twTitle = document.querySelector('meta[name="twitter:title"]');
                if (twTitle && title) twTitle.setAttribute('content', title);
                var twDesc = document.querySelector('meta[name="twitter:description"]');
                if (twDesc && desc) twDesc.setAttribute('content', desc);

                var baseUrl = 'https://dota2cheats.net/';
                var pageUrl = lang === 'en' ? baseUrl : baseUrl + '?lang=' + encodeURIComponent(lang);
                var ogUrl = document.getElementById('og-url');
                if (ogUrl) ogUrl.setAttribute('content', pageUrl);
                var twUrl = document.querySelector('meta[name="twitter:url"]');
                if (twUrl) twUrl.setAttribute('content', pageUrl);

                var canonical = document.getElementById('canonical-link');
                if (canonical) canonical.setAttribute('href', baseUrl);

                var localeMap = {
                    en: 'en_US', tr: 'tr_TR', ar: 'ar_SA', de: 'de_DE', fr: 'fr_FR',
                    es: 'es_ES', pt: 'pt_BR', ru: 'ru_RU', ja: 'ja_JP', ko: 'ko_KR',
                    zh: 'zh_CN', hi: 'hi_IN', ur: 'ur_PK', id: 'id_ID', pl: 'pl_PL',
                    nl: 'nl_NL', it: 'it_IT'
                };
                var ogLocale = document.querySelector('meta[property="og:locale"]');
                if (ogLocale && localeMap[lang]) ogLocale.setAttribute('content', localeMap[lang]);

                var htmlLang = lang === 'zh' ? 'zh-Hans' : lang;
                document.documentElement.lang = htmlLang;
            }

            function closeMobileNav() {
                document.body.classList.remove('nav-open');
                var navToggle = document.getElementById('nav-toggle');
                var navBackdrop = document.getElementById('nav-backdrop');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.setAttribute('aria-label', 'Open menu');
                }
                if (navBackdrop) navBackdrop.setAttribute('aria-hidden', 'true');
            }

            function openMobileNav() {
                document.body.classList.add('nav-open');
                var navToggle = document.getElementById('nav-toggle');
                var navBackdrop = document.getElementById('nav-backdrop');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'true');
                    navToggle.setAttribute('aria-label', 'Close menu');
                }
                if (navBackdrop) navBackdrop.setAttribute('aria-hidden', 'false');
            }

            (function initMobileNav() {
                var navToggle = document.getElementById('nav-toggle');
                var navBackdrop = document.getElementById('nav-backdrop');
                if (!navToggle) return;

                navToggle.addEventListener('click', function () {
                    if (document.body.classList.contains('nav-open')) {
                        closeMobileNav();
                    } else {
                        openMobileNav();
                    }
                });

                if (navBackdrop) {
                    navBackdrop.addEventListener('click', closeMobileNav);
                }

                document.querySelectorAll('#main-nav a').forEach(function (link) {
                    link.addEventListener('click', function () {
                        closeMobileNav();
                    });
                });

                window.addEventListener('resize', function () {
                    if (window.innerWidth > 900) closeMobileNav();
                });
            })();

            function setLanguage(lang) {
                if (!translations[lang]) lang = 'en';
                currentLang = lang;
                localStorage.setItem('site-lang', lang);
                document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';

                var url = new URL(window.location.href);
                if (lang === 'en') {
                    url.searchParams.delete('lang');
                } else {
                    url.searchParams.set('lang', lang);
                }
                history.replaceState(null, '', url.pathname + url.search + url.hash);

                document.querySelectorAll('[data-i18n]').forEach(function (el) {
                    var key = el.getAttribute('data-i18n');
                    var text = (translations[lang] && translations[lang][key]) ||
                        (translations.en && translations.en[key]);
                    if (text) el.textContent = text;
                });

                var meta = getLangMeta(lang);
                var currentFlagImg = langCurrentFlag.querySelector('img');
                if (currentFlagImg) {
                    currentFlagImg.src = 'https://flagcdn.com/w40/' + meta.country + '.png';
                } else {
                    langCurrentFlag.innerHTML = flagImg(meta.country, meta.name);
                }
                langCurrentCode.textContent = meta.code;

                langDropdown.querySelectorAll('.lang-option').forEach(function (btn) {
                    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
                });

                updateSeoMeta(lang);
                updatePricingSummary();
            }

            buildLangDropdown();

            langToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = langSwitcher.classList.toggle('open');
                langToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            langSwitcher.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            document.addEventListener('click', function () {
                langSwitcher.classList.remove('open');
                langToggle.setAttribute('aria-expanded', 'false');
            });

            planOptions.forEach(function (option) {
                option.addEventListener('click', function () {
                    planOptions.forEach(function (opt) {
                        opt.classList.remove('selected');
                        opt.setAttribute('aria-pressed', 'false');
                    });
                    option.classList.add('selected');
                    option.setAttribute('aria-pressed', 'true');
                    updatePricingSummary();
                });
            });

            setLanguage(currentLang);

            document.querySelectorAll('.faq-question').forEach(function (btn, index) {
                var item = btn.closest('.faq-item');
                var answer = item.querySelector('.faq-answer');
                var qId = 'faq-q-' + (index + 1);
                var aId = 'faq-a-' + (index + 1);
                btn.id = qId;
                if (answer) {
                    answer.id = aId;
                    btn.setAttribute('aria-controls', aId);
                }
                btn.addEventListener('click', function () {
                    var isOpen = item.classList.contains('open');
                    document.querySelectorAll('.faq-item').forEach(function (faq) {
                        faq.classList.remove('open');
                        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    });
                    if (!isOpen) {
                        item.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                });
            });

            document.querySelectorAll('.blog-read-more').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var card = btn.closest('.blog-card');
                    var isOpen = card.classList.toggle('open');
                    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    btn.querySelector('span').textContent = isOpen ? 'Show less' : 'Read more';
                });
            });

            /* Screenshot carousel */
            (function initScreenshotCarousel() {
                var gallery = document.getElementById('demo-gallery');
                var currentLayer = document.getElementById('screenshot-layer-current');
                var enterLayer = document.getElementById('screenshot-layer-enter');
                var flash = document.getElementById('screenshot-flash');
                var wipe = document.getElementById('screenshot-wipe');
                var caption = document.getElementById('screenshot-caption');
                var counter = document.getElementById('screenshot-counter');
                var dotsWrap = document.getElementById('screenshot-dots');
                var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
                var currentIndex = 0;
                var animating = false;
                var TRANSITION_MS = 560;

                function buildDots() {
                    dotsWrap.innerHTML = '';
                    items.forEach(function (item, idx) {
                        var dot = document.createElement('button');
                        dot.type = 'button';
                        dot.className = 'screenshot-dot' + (idx === 0 ? ' active' : '');
                        dot.setAttribute('aria-label', 'Show ' + item.getAttribute('data-name'));
                        dot.addEventListener('click', function () {
                            goTo(idx, idx > currentIndex ? 1 : -1);
                        });
                        dotsWrap.appendChild(dot);
                    });
                }

                function updateDots() {
                    var dots = dotsWrap.querySelectorAll('.screenshot-dot');
                    dots.forEach(function (dot, i) {
                        dot.classList.toggle('active', i === currentIndex);
                    });
                }

                function applyMeta(idx) {
                    var item = items[idx];
                    if (!item) return;
                    caption.textContent = item.getAttribute('data-name');
                    counter.textContent = (idx + 1) + ' / ' + items.length;
                    updateDots();
                }

                function triggerSwitchEffects() {
                    flash.classList.remove('active');
                    wipe.classList.remove('active');
                    void flash.offsetWidth;
                    flash.classList.add('active');
                    wipe.classList.add('active');
                }

                function clearLayerClasses(layer) {
                    layer.classList.remove('exit-next', 'exit-prev', 'enter-next', 'enter-prev');
                }

                function goTo(idx, direction) {
                    if (animating || idx === currentIndex) return;
                    if (idx < 0) idx = items.length - 1;
                    if (idx >= items.length) idx = 0;

                    var item = items[idx];
                    var dir = direction > 0 ? 'next' : 'prev';

                    animating = true;

                    enterLayer.src = item.getAttribute('data-src');
                    enterLayer.alt = item.getAttribute('data-name');
                    enterLayer.setAttribute('aria-hidden', 'false');
                    enterLayer.style.opacity = '1';

                    clearLayerClasses(currentLayer);
                    clearLayerClasses(enterLayer);
                    currentLayer.classList.add('exit-' + dir);
                    enterLayer.classList.add('enter-' + dir);
                    triggerSwitchEffects();

                    setTimeout(function () {
                        currentIndex = idx;
                        currentLayer.src = item.getAttribute('data-src');
                        currentLayer.alt = item.getAttribute('data-name');
                        clearLayerClasses(currentLayer);
                        clearLayerClasses(enterLayer);
                        enterLayer.style.opacity = '0';
                        enterLayer.setAttribute('aria-hidden', 'true');
                        flash.classList.remove('active');
                        wipe.classList.remove('active');
                        applyMeta(currentIndex);
                        animating = false;
                    }, TRANSITION_MS);
                }

                document.getElementById('screenshot-prev').addEventListener('click', function () {
                    goTo(currentIndex - 1, -1);
                });

                document.getElementById('screenshot-next').addEventListener('click', function () {
                    goTo(currentIndex + 1, 1);
                });

                document.addEventListener('keydown', function (e) {
                    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
                    if (e.key === 'ArrowLeft') goTo(currentIndex - 1, -1);
                    if (e.key === 'ArrowRight') goTo(currentIndex + 1, 1);
                });

                buildDots();
                applyMeta(0);
            })();
        })();