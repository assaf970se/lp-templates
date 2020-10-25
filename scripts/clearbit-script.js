var pollForDefinition = function (scope, varname, callback) {
    if (typeof scope[varname] !== "undefined") { return callback(); }
    var interval = setInterval(function () { if (typeof scope[varname] !== "undefined") { clearInterval(interval); callback(); } }, 250);
};
var script = document.createElement("script");
script.src = "https://marketo.clearbit.com/assets/v1/marketo/forms.js";
script.async = true; script.setAttribute("data-clearbit-publishable-key", "pk_9f54bf5f496d9736df865b7660b7b1ac");
script.onerror = function (e) {
    console.log("Clearbit Form JS unable to load");
    pollForDefinition(window, "MktoForms2", function () { MktoForms2.whenReady(function (form) { form.setValues({ clearbitFormStatus: "Clearbit Form JS unable to load" }); }); });
};
document.body.append(script);