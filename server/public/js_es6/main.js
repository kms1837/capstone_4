$( document ).ready(() => {
    let subMenuBtns = $('.sub-menu').find('button');
    $.map(subMenuBtns, btn => {
        $(btn).click( () => {
            var title = $(btn).text();
            var trackPanel = $("#track1")[0];

            let panelTitle = $(trackPanel).find('.card-title');
            panelTitle.text(title);    
        

            if (trackPanel.style.display=='none') {
                trackPanel.style.display = 'block';
            }
            
            let barChartObj = $('#barChart')[0].getContext('2d');
            
            var barChart = new Chart(barChartObj, {
                type: 'bar',
                data: {
                    labels: ['코딩 개발', '수학', '팀플', '총학점', '스펙'],
                    datasets: [
                    {
                        label: '점수',
                        data: [8, 6, 4, 6, 4],
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 0, 1)',
                        fill: 1
                    }],
                }
            });

            window.location.href = "#detail";
        });
    });

    $('#submit-spec').click(() => {
        let addSpecModel = $('#addSpec');
        let fileInput = $(addSpecModel).find(".file-upload-default");
        let fileObject = fileInput[0].files[0];
        let formData = new FormData();

        formData.append("file", fileObject);
        formData.append("name", $(addSpecModel).find("#name").val());
        formData.append("type", $(addSpecModel).find("#type").val());
        formData.append("explain", $(addSpecModel).find("#explain").val());

        $.ajax({
            url: `/ability/stu_spec`,
            processData: false,
            contentType: false,
            data: formData,
            type: 'POST',
            success: response => {
                addSpecModel.modal('hide');
            }
        });
    });
});