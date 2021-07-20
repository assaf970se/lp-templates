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

    setTimeout(() => {
        MktoForms2.loadForm('//app-nld101.marketo.com', '314-AVR-999', 2114);
        MktoForms2.whenReady(function (form) {
            form.vals();
            form.onSuccess(function (values, followUpUrl) {
                return false;
            });
            form.submit();
        });
    }, 2000);
})();
