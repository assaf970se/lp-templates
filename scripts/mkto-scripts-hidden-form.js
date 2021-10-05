const hidForm = document.getElementById('mainForm');

function handleFormSubmit() {
    console.log('before: ', MktoForms2.allForms()[0].getValues());

    const firstName = document.querySelector('.first-name').value;
    const lastName = document.querySelector('.last-name').value;
    const jobTitle = document.querySelector('.job-title').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const company = document.querySelector('.company').value;

    const pageForm = MktoForms2.allForms()[0];

    pageForm.setValues({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Title: jobTitle,
        Company: company,
    });

    let fullPageUrl = document.location.href;
    try {
        pageForm.setValues({ Conversion_Page_URL__c: fullPageUrl || '' });
    } catch (e) {
        console.log(e);
    }

    if (
        document.cookie
            .split(';')
            .some((item) => item.includes('wamk_most_recent_ref'))
    ) {
        let encodedUrl = document.cookie
            .split(';')
            .find((cookie) => cookie.includes('wamk_most_recent_ref'))
            .split('=')[1];
        let decodedUrl = decodeURIComponent(encodedUrl);
        let domainName = decodedUrl.split('.')[1];
        pageForm.setValues({ most_Recent_Referral_URL: decodedUrl || '' });
        pageForm.setValues({ most_Recent_Referral_Domain: domainName || '' });
    } else if (
        document.cookie
            .split(';')
            .some((item) => item.includes('_uc_last_referrer'))
    ) {
        let encodedUrl = document.cookie
            .split(';')
            .find((cookie) => cookie.includes('_uc_last_referrer'))
            .split('=')[1];
        let decodedUrl = decodeURIComponent(encodedUrl);
        let domainName = decodedUrl.split('.')[1];
        pageForm.setValues({ most_Recent_Referral_URL: decodedUrl || '' });
        pageForm.setValues({ most_Recent_Referral_Domain: domainName || '' });
    }

    console.log('after: ', MktoForms2.allForms()[0].getValues());
    form.submit();
}

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit();
});
