
$(document).ready(() => {
  let panels = $('.card');

  $.map(panels, item => {
    let trackID = $(item).attr('data-id');

    $.get(`/ability/current_track_Info/${trackID}`, data => {
      let panelContent = $(item).find('.card-body');
      setTable(panelContent, "", data);
      //tableObj, title, data
    });
  });
});