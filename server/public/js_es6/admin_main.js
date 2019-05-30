$( document ).ready(() => {
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $.map($('#myTable tr'), item => {
    let recordBtn = $(item).find('.record');
    let lookupBtn = $(item).find('.lookup');
    let studentID = $(item).attr('data-id');

    recordBtn.click(() => {
      Swal.fire({
        title: '의견 등록',
        confirmButtonText: '등록',
        cancelButtonText: '취소',
        showCancelButton: true,
        input: 'text'
      })
      .then( result => {
        if (result.value) {
          $.ajax({
            type: "PUT",
            url: `/user/professor_opinion/${studentID}`,
            data: {opinion: result.value},
            success: function() {
              Swal.fire({type: 'success', title:'의견을 등록하였습니다.'});
            }
          });
        }
      });
    });

    lookupBtn.click(() => {
      $.get(`/user/professor_opinion/${studentID}`, data => {
        let professor = data.professor ? data.professor : '아직 의견을 등록하지 않았습니다.';
        Swal.fire({
          title: '등록된 의견',
          text: professor
        });
      });
    });
  });

});