const requestDataSetting = function (fileForm) {
    let fileInput = $(fileForm).find(".file-upload-input");
    console.log(fileInput, fileInput[0]);
    let fileObject = fileInput[0].files[0];
    let formData = new FormData();

    formData.append("file", fileObject);

    return formData;
}

const postBtnEventBind = function (object, fileForm) {
    $(object).click( () => {
        let formData = requestDataSetting(fileForm);

        $.ajax({
           url: `/file`,
           processData: false,
           contentType: false,
           data: formData,
           type: 'POST',
           success: response => {
               console.log("Done");
           }
        });
    });
}

$(document).ready( () => {
    let form = $('.file-upload-test');
    let btn = $('.file-upload-test').find('.btn');
    postBtnEventBind(btn, form);
});