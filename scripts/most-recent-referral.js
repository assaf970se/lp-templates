(function () {
    const lastRef = document.referrer;
    if (
        !lastRef ||
        lastRef.includes('wixanswers.com') ||
        lastRef.includes('wix.com') ||
        lastRef.includes('marketo.com')
    ) {
        return;
    } else {
        const refCookieStr = `wamk_most_recent_ref=${lastRef}; domain=wixanswers.com; max-age=2592000; secure`;
        document.cookie = refCookieStr;
    }
})();

(function () {
    var lastRef = document.referrer;
    if (
        !lastRef ||
        lastRef.includes('wixanswers.com') ||
        lastRef.includes('wix.com') ||
        lastRef.includes('marketo.com')
    ) {
        return;
    } else {
        var refCookieStr = 'wamk_most_recent_ref='+lastRef+'; domain=wixanswers.com; max-age=2592000; secure';
        document.cookie = refCookieStr;
    }
})();
