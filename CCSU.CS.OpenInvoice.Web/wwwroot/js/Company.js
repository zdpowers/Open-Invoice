let companyFormInstance;
let companyLogo; 

function companyForm_onInitialized(e) {
    companyFormInstance = e.component;
}

function companyForm_onContentReady(e) {

    var logo = companyFormInstance.getEditor("Logo").option("value")
    if (!logo) {

        $('#company-logo')
            .attr('src', "/images/nologo.jpg")

    }
    else {
        $('#company-logo')
            .attr('src', logo)
    }
}

function fileUploader_onValueChanged(e) {
    var files = e.value;
    if (files && files.length) {
        var reader = new FileReader();
        reader.onload = function (arg) {
            $('#company-logo').attr('src', arg.target.result);
            companyFormInstance.getEditor("Logo").option("value", arg.target.result)
            //companyLogo = arg.target.result


        };
        reader.readAsDataURL(files[0]);
    }
}

function companyForm_onSubmit(e) {

    e.event.preventDefault();

    let data = companyFormInstance.option("formData");
    let headers = {};
    let antiForgeryToken = $("input[name=__RequestVerificationToken]").val();  
    let validationResult = companyFormInstance.validate();
    if (validationResult.isValid) {
        headers['RequestVerificationToken'] = antiForgeryToken;
        //data.Logo = companyLogo;
        $.ajax({
            url: "api/Companies/save",
            headers: headers,
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                $("#company-toast").dxToast("instance").option({
                    type: "success",
                    message: "Company record has been updated successfully!",
                    visible: true
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                $("#company-toast").dxToast("instance").option({
                    type: "error",
                    message: errorThrown,
                    visible: true
                });
                alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
            }
        });

    }
   



}
