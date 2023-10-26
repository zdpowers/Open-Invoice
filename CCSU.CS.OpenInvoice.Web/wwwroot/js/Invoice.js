$(document).ready(function () {

    $("#invoice-btn-add").click(function () {
        $('#line-item').clone().appendTo('#invoice-form-body');
    });

    $('#invoice-form-body').on('click', '.btn-invoice-remove', function (e) {
        if (e.target.parentNode.parentNode.parentNode.childElementCount > 1) {
            return e.target.parentNode.parentNode.remove();
        }
    });


});