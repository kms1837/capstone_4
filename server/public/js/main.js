$(document).ready(() => {
  let subMenuBtns = $('.sub-menu').find('button');
  $.map(subMenuBtns, btn => {
    $(btn).click(() => {
      let title = $(btn).text();
      let trackPanel = $("#track1")[0];
      let panelContent = $(trackPanel).find('.card-body');
      let panelTitle = $(trackPanel).find('.card-title');
      panelTitle.text(title);

      if (trackPanel.style.display == 'none') {
        trackPanel.style.display = 'block';
      }

      let barChartObj = $('#barChart')[0].getContext('2d');
      let trackID = $(btn).attr('data-id');

      let tableBody = $(panelContent).find('.table-score tbody');
      tableBody.empty();

      $.get(`/ability/current_track_Info/${trackID}`, data => {
        $.map(data.trackScore, item => {
          tableBody.append(`
          <tr>
            <td>${item.name}</td>
            <td>${item.grade}</td>        
          </tr>`);
        });

        var barChart = new Chart(barChartObj, {
          type: 'bar',
          data: {
            labels: ['내 점수', '전체 점수'],
            datasets: [{
              label: '트랙 평균',
              data: [data.trackAvg, data.totalAvg],
              backgroundColor: 'rgba(255, 99, 132, 1)',
              borderColor: 'rgba(255, 99, 0, 1)',
              fill: 1
            }]
          }
        });
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