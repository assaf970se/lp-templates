(function () {
    const ref = document.referrer;
    if (!ref || ref.includes('wixanswers.com') || ref.includes('wix.com')) {
        return;
    } else {
        try {
            localStorage.setItem('wamk_most_recent_ref', ref);
        } catch (err) {
            console.log(err);
        }
    }
})();
