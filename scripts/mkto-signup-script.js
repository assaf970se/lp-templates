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
    
    // Please include the email domains you would like to block in this list
    var invalidDomains = [];

    MktoForms2.whenReady(function (form) {
        let fullPageUrl = document.location.href;
        try {
            form.setValues({ Conversion_Page_URL__c: fullPageUrl || '' });
        } catch(e) {
            console.log(e);
        }
        let params = new URLSearchParams(document.location.search.substring(1));
        let email = params.get("email");
        if (email) form.setValues({ Email: email });

        if (document.cookie.split(';').some((item) => item.includes('wamk_most_recent_ref'))) {
            let encodedUrl = document.cookie
                .split(';')
                .find((cookie) => cookie.includes('wamk_most_recent_ref'))
                .split('=')[1];
            let decodedUrl = decodeURIComponent(encodedUrl);
            let domainName = decodedUrl.split('.')[1];
            form.setValues({ most_Recent_Referral_URL: decodedUrl || '' });
            form.setValues({ most_Recent_Referral_Domain: domainName || '' });
        } else if (document.cookie.split(';').some((item) => item.includes('_uc_last_referrer'))) {
            let encodedUrl = document.cookie
                .split(';')
                .find((cookie) => cookie.includes('_uc_last_referrer'))
                .split('=')[1];
            let decodedUrl = decodeURIComponent(encodedUrl);
            let domainName = decodedUrl.split('.')[1];
            form.setValues({ most_Recent_Referral_URL: decodedUrl || '' });
            form.setValues({ most_Recent_Referral_Domain: domainName || '' });
        }

        form.onSuccess(function (values, followUpUrl) {            
            var redirectUrl = "http://app.wixanswers.com/mk-signup";
            location.href = redirectUrl;

            return false;
        });

        form.onValidate(function () {
            var email = form.vals().Email;
            var phoneNumber = form.vals().Phone;
    
            if (email) {
                if (!isEmailGood(email)) {
                    form.submitable(false);
                    var emailElem = form.getFormElem().find("#Email");
                    form.showErrorMessage("Must be Business email.", emailElem);
                    return;
                }
            }
            if (phoneNumber) {
                if (!isPhoneNumGood(phoneNumber)) {
                    form.submitable(false);
                    var phoneElem = form.getFormElem().find("#Phone");
                    form.showErrorMessage(
                        "must be valid phone number",
                        phoneElem
                    );
                    return;
                }
            }
            form.submitable(true);

        });
    });

    function isEmailGood(email) {
        var lowerCaseEmail = email.toLowerCase();
        var res = invalidDomains.find(function (str) {
            return lowerCaseEmail.includes(str);
        });
        return !res;
    }

    function isPhoneNumGood(number) {
        if (number.length < 7) {
            return false;
        } else {
            return true;
        }
    }
})();
