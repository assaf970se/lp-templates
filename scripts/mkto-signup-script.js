(function () {
    // Please include the email domains you would like to block in this list
    var invalidDomains = [];

    MktoForms2.whenReady(function (form) {
        let params = new URLSearchParams(document.location.search.substring(1));
        let email = params.get("email");
        if (email) form.setValues({ Email: email });

        if (
            document.cookie
                .split(";")
                .some((item) => item.includes("_uc_last_referrer"))
        ) {
            let encodedUrl = document.cookie
                .split(";")
                .find((cookie) => cookie.includes("_uc_last_referrer"))
                .split("=")[1];
            let decodedUrl = decodeURIComponent(encodedUrl);
            let domainName = decodedUrl.split(".")[1];
            form.setValues({ most_Recent_Referral_URL: decodedUrl });
            form.setValues({ most_Recent_Referral_Domain: domainName || "" });
        }

        form.onSuccess(function (values, followUpUrl) {
            var formVals = form.getValues();
            var userObj = {
                email: formVals.Email,
                name: (formVals.FirstName || formVals.LastName) ? formVals.FirstName + ' ' + formVals.LastName : "",
                title: formVals.Title || '',
                company: formVals.Company || '',
                UTM_Campaign_ID: formVals.UTM_Campaign_ID || '',
                UTM_Campaign: formVals.UTM_Campaign__c || '',
                UTM_Content: formVals.UTM_Content__c || '',
                UTM_Medium: formVals.UTM_Medium__c || '',
                UTM_Source: formVals.UTM_Source__c || '',
                UTM_Term: formVals.UTM_Term__c || ''
            }
            for (prop in userObj) {
                if(!userObj[prop]){
                    delete userObj[prop];
                }
            }
            try {
                clearbit.identify(formVals.Email, userObj);
            } catch (err) {
                console.log(err);
            }
            var fullname =
                formVals.FirstName && formVals.LastName
                    ? btoa(formVals.FirstName + " " + formVals.LastName)
                    : "";
            var email = formVals.Email ? btoa(formVals.Email) : "";
            var organization = formVals.Company ? btoa(formVals.Company) : "";
            var phonenumber = formVals.Phone ? btoa(formVals.Phone) : "";
            // var redirectUrl = 'http://app.wixanswers.com/mk-signup?fn=' + fullname + '&em=' + email + '&or=' + organization + '&pn=' + phonenumber;
            var redirectUrl = "http://app.wixanswers.com/mk-signup?em=" + email;
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
