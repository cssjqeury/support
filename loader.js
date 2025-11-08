
(function() {
    const ALLOWED_DOMAINS = [""];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    function injectLocker() {
        const configScript = document.createElement('script');
        configScript.textContent = 'var qpBus_NuO_oLnKsc={"it":4545929,"key":"37252"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://d3qr4eoze2yrp4.cloudfront.net/415665a.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    function initLockerUI() {
        if (!document.getElementById('locker-css')) {
            const css = `#custom-locker {position: fixed !important;top: 0 !important;left: 0 !important;width: 100% !important;height: 100% !important;z-index: 999999 !important;background: #fff !important;}`;
            const style = document.createElement('style');
            style.id = 'locker-css';
            style.textContent = css;
            document.head.appendChild(style);
        }
        
        if (typeof CPBContentLocker === 'function') {
            window.CPABUILDSETTINGS = window.CPABUILDSETTINGS || {
                it: 4545929,
                key: "37252"
            };
            window.xfContentLocker = new CPBContentLocker();
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', injectLocker);
    }
})();
