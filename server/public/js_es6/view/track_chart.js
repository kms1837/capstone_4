$(document).ready(() => {
  let panels = $('.card');

  $.map(panels, item => {
    let trackID = $(item).attr('data-id');

    $.get(`/ability/current_track_Info/${trackID}`, data => {
      let barChartObj = $(item).find('.barChart')[0].getContext('2d');
      setBarChart(barChartObj, data);
    });

  });

});