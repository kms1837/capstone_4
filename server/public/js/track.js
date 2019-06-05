$(document).ready(() => {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $.map($('#myTable tr'), item => {
    let path = location.pathname.split('/');
    let trackID = path[path.length - 1];
    let lookupBtn = $(item).find('.lookup');
    let studentID = $(item).attr('data-id');

    lookupBtn.click(() => {
      $.get(`/ability/current_track_Info/${trackID}/${studentID}`, data => {
        trackLookup("", data);
      });
    });
  });
});