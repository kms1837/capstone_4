$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $.map($('#myTable tr'), col => {
    let showDetailBtn = $(col).find('.specDetail');
    let detailPanel = $("#detail")[0]; 

    showDetailBtn.click(() => {
      if (detailPanel.style.display=='none') {
        detailPanel.style.display = 'block';
      }

      let specID = $(col).attr('data-id');
      $.get(`/ability/stu_spec/${specID}`, data => {
        $(detailPanel).find('#name').text(data.name);
        $(detailPanel).find('#type').val(data['spec_typeID']);
        $(detailPanel).find('#file').attr("href", `/uploads/${data.path}`);
        $(detailPanel).find('#explain').text(data['spec_explain']);
        $(detailPanel).find('#requestDate').text(data['request_date']);
      });

      let acceptBtn = $(detailPanel).find('#acceptBtn');
      acceptBtn.off();
      acceptBtn.click(event => {
        event.preventDefault();
        Swal.fire({
          type: 'question',
          title: '해당 스펙을 승인하시겠습니까?',
          confirmButtonText: '승인',
          cancelButtonText: '취소',
          showCancelButton: true
        })
        .then( result => {
          if (result.value) {
            $.ajax({
              type: "PUT",
              url: `/admin/accept_spec/${specID}/agree`,
              data: {},
              success: function() {
                Swal.fire({type: 'success', title:'해당 스펙을 승인 하였습니다.'})
                .then(result => {
                  location.reload();
                });
              }
            });
          }
        });
      });

      let rejectBtn = $(detailPanel).find('#rejectBtn');
      rejectBtn.off();
      rejectBtn.click( event => {
        event.preventDefault();
        Swal.fire({
          type: 'question',
          title: '해당 스펙을 거절하시겠습니까?',
          text: '거절 사유를 입력해 주세요',
          input: 'text',
          confirmButtonText: '거절',
          cancelButtonText: '취소',
          showCancelButton: true
        })
        .then((result) => {
          if (result.value) {
            $.ajax({
              type: "PUT",
              url: `/admin/accept_spec/${specID}/reject`,
              data: {},
              success: function() {
                Swal.fire({type: 'success', title:'해당 스펙을 거절 하였습니다.'})
                .then(result => {
                  location.reload();
                });
              }
            });
          }
        });
      });

    });
  });
});