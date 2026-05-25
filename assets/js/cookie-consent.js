(function () {
  function loadGoogleAnalytics() {
    if (window.googleAnalyticsLoaded) return;
    window.googleAnalyticsLoaded = true;

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
  }

  function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const preferencesPanel = document.getElementById('cookie-preferences');
    const revokeBtn = document.getElementById('cookie-revoke-btn');
    const btnAccept = document.getElementById('cookie-btn-accept');
    const btnReject = document.getElementById('cookie-btn-reject');
    const btnSettings = document.getElementById('cookie-btn-settings');
    const optAnalytics = document.getElementById('cookie-opt-analytics');
    const optMarketing = document.getElementById('cookie-opt-marketing');
    const storageKey = 'matchmaker_cookie_consent';

    if (!banner || !preferencesPanel || !revokeBtn || !btnAccept || !btnReject || !btnSettings) return;

    const showBanner = () => {
      banner.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
      banner.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    };
    const hideBanner = () => {
      banner.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
      banner.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    };
    const showRevokeBtn = () => {
      revokeBtn.classList.remove('-translate-x-12', 'opacity-0', 'pointer-events-none');
      revokeBtn.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
    };
    const hideRevokeBtn = () => {
      revokeBtn.classList.add('-translate-x-12', 'opacity-0', 'pointer-events-none');
      revokeBtn.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
    };
    const applyConsents = (consents) => {
      if (consents.analytics) loadGoogleAnalytics();
    };
    const saveConsent = (consents) => {
      localStorage.setItem(storageKey, JSON.stringify(consents));
      applyConsents(consents);
    };
    const refreshIcons = () => {
      if (window.lucide) window.lucide.createIcons();
    };
    const openPreferences = (event) => {
      if (event) event.preventDefault();
      const consents = JSON.parse(localStorage.getItem(storageKey) || '{"analytics":false,"marketing":false}');
      if (optAnalytics) optAnalytics.checked = consents.analytics;
      if (optMarketing) optMarketing.checked = consents.marketing;
      preferencesPanel.classList.remove('hidden');
      btnSettings.innerText = 'Speichern';
      hideRevokeBtn();
      showBanner();
    };

    const savedConsent = localStorage.getItem(storageKey);
    if (!savedConsent) setTimeout(showBanner, 1500);
    else {
      applyConsents(JSON.parse(savedConsent));
      showRevokeBtn();
    }

    btnAccept.addEventListener('click', () => {
      saveConsent(preferencesPanel.classList.contains('hidden')
        ? { analytics: true, marketing: true }
        : { analytics: !!optAnalytics?.checked, marketing: !!optMarketing?.checked });
      hideBanner();
      showRevokeBtn();
      refreshIcons();
    });
    btnReject.addEventListener('click', () => {
      saveConsent({ analytics: false, marketing: false });
      hideBanner();
      showRevokeBtn();
      refreshIcons();
    });
    btnSettings.addEventListener('click', () => {
      if (preferencesPanel.classList.contains('hidden')) {
        preferencesPanel.classList.remove('hidden');
        btnSettings.innerText = 'Speichern';
        return;
      }
      saveConsent({ analytics: !!optAnalytics?.checked, marketing: !!optMarketing?.checked });
      hideBanner();
      showRevokeBtn();
      refreshIcons();
    });
    revokeBtn.addEventListener('click', openPreferences);

    document.getElementById('cookie-settings-link')?.addEventListener('click', openPreferences);
    document.getElementById('cookie-settings-inline-link')?.addEventListener('click', openPreferences);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCookieConsent);
  else initCookieConsent();
})();
