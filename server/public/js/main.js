var raderChart = null;
var statsData = null;

$(document).ready(() => {
  let subMenuBtns = $('.sub-menu').find('button');
  $('[data-toggle="tooltip"]').tooltip();

  $("#graphTooltip").tooltip({
    title: `<div class="text-left">학교에 다니시며 받으신 점수로 산출한 결과입니다. 각 분야에 만점 점수는 4.5점이고 사용자는 어느 분야에 뛰어난지 직관적으로 확인이 가능합니다.</div><br>
    CODING <br>
    <div class="text-left">C언어 인증시험, 프로그래밍 -P, JAVA와 같은 실습이 있는 과목의 평균 학점 입니다. 때문에 이 분야에 점수가 높다면 기업의 코딩테스트점수에서 우수한 점수를 받을 확률이 높습니다.</div><br>
    SPEC<br>
    <div class="text-left">TOPCIT, 장학금여부등 교내에서 알 수 있는 스펙의 점수이며 이 외에 교외에서 상을타고 자격증을 취득하는등 좋은 대외활동이 있다면 언제든 관리자에게 요청해 SPEC을 추가할 수 있습니다.</div><br>
    TEAMPLE<br>
    <div class="text-left">교과목 중 팀플이 있었던 수업들의 평균 학점입니다. 만약 TEAMPLE 점수가 좋다면 기업에서 뛰어난 협업을 보여줄 가능성이 높습니다.</div><br>
    MATH<br>
    <div class="text-left">보통 수학을 잘하는 사람들이 CODING을 잘 한다고 합니다. 왜냐면 수학을 하며 논리성을 배우기 때문인데요. 그렇기에 MATH점수가 높다면 논리력이 뛰어날 확률이 높습니다.</div><br>
    GRADE<br>
    <div class="text-left">총 학점입니다. 이는 학교를 다니며 받은 모든 과목의 총 학점으로 이 점수가 높다면 해당 학생은 어떤 과목이든 가리지 않고 모든 과목을 성실히 이행하였다는 증거가 될것입니다.</div>`,
    html: true,
    placement: "top"
  });

  $.map(subMenuBtns, btn => {
    $(btn).click(() => {
      let title = $(btn).text();
      let trackPanel = $("#track1")[0];
      let panelTitle = $(trackPanel).find('.card-title');
      let trackID = $(btn).attr('data-id');

      panelTitle.text(title);

      if (trackPanel.style.display == 'none') {
        trackPanel.style.display = 'block';
      }

      $.get(`/ability/current_track_Info/${trackID}`, data => {
        trackLookup(title, data);
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
        Swal.fire({ type: 'success', title: '스펙추가 요청성공' }).then(() => {
          location.reload();
        });
      }
    });
  });
});