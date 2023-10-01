// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
function fileUploader_onValueChanged(e) {
    var files = e.value;
    if (files && files.length) {
        var reader = new FileReader();
        reader.onload = function (arg) {
            $('#company-logo')
                .attr('src', arg.target.result)
        };
        reader.readAsDataURL(files[0]);
    }
}
function companyForm_onContentReady(e) {
    if (!e.model) {

        $('#company-logo')
            .attr('src', "/images/nologo.jpg")

    }
}

// Write your JavaScript code.
