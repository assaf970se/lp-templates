async function trackClickEvent() {
    const url = location.href;
    const referrer = document.referrer;
    const route = `https://app.wixanswers.com/api/bi/page-view?pageUrl=${encodeURIComponent(url)}&referralUrl=${encodeURIComponent(referrer)}`;
    const res = await fetch(route);
    const resText = await res.text();
    console.log(resText);
}

await trackClickEvent();

<script>
var img = document.createElement('img');
var url = location.href;
var referrer = document.referrer;
img.src='https://app.wixanswers.com/api/bi/page-view?pageUrl='+encodeURIComponent(url)+'&referralUrl='+encodeURIComponent(referrer);
</script>


function trackClickEvent() {
    var url = location.href;
    var referrer = document.referrer;
    var route = 'https://app.wixanswers.com/api/bi/page-view?pageUrl='+encodeURIComponent(url)+'&referralUrl='+encodeURIComponent(referrer);
    fetch(route).then(function(res) {return res.text()}).then(function(resText) {return console.log(resText)}).catch(function(err) {return console.log('err: ', err)})
}
  
trackClickEvent();


(function () {
    const lastRef = document.referrer;
    if (
        !lastRef ||
        lastRef.includes('wixanswers.com') ||
        lastRef.includes('wix.com') ||
        lastRef.includes('marketo.com') ||
        lastRef.includes('nld')
    ) {
        return;
    } else {
        const refCookieStr = `wamk_most_recent_ref=${encodeURIComponent(lastRef)};domain=wixanswers.com;samesite=none;max-age=2592000;secure`;
        document.cookie = refCookieStr;
    }
})();

//modified and combined with the Editor script 

{/* <script> */}
var img = document.createElement('img');
var url = location.href;
var referrer = document.referrer;
var lastRefSrc = '';
if (referrer || !referrer.includes('wixanswers.com') || !referrer.includes('wix.com') || !referrer.includes('marketo.com') || !referrer.includes('nld')) {
    lastRefSrc = '&last_ref='+encodeURIComponent(referrer);
}
img.src='https://app.wixanswers.com/api/bi/page-view?pageUrl='+encodeURIComponent(url)+'&referralUrl='+encodeURIComponent(referrer)+lastRefSrc;
// </script>