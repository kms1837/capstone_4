var barChart = null;

function trackLookup(title, data) {
  let trackPanel = $("#track1")[0];
  let panelContent = $(trackPanel).find('.card-body'); 
  let tableBody = $(panelContent).find('.table-score tbody');

  let barChartObj = $('#barChart')[0].getContext('2d');
  let trackScoreCard = $('.trackScoreCard');
  let trackScore = data.trackScore.length*3;

  trackScoreCard.find('#trackScoreTitle').text(`${title} 트랙 이수 까지`);
  trackScoreCard.find('#trackScore').text(`${trackScore} / 18`);

  tableBody.empty();

  let options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
            suggestedMin: 0,
            max: 4.5,
            beginAtZero: true
        }
      }]
    },
    title: {
        display: true,
        text: '트랙점수 비교'
    }
  };

  if (data.trackScore.length > 0) {
    $.map(data.trackScore, item => {
      tableBody.append(`
      <tr>
        <td>${item.name}</td>
        <td class="text-center"><label class="badge badge-info">${item.grade}</label></td>        
      </tr>`);
    });

  } else {
    tableBody.append(`
      <tr>
        <td colspan="2">
          <div class="text-center">
            <i class="mdi mdi-comment-question-outline"></i>
            아직 이수한 과목이 없습니다.
          </div>
        </td>      
      </tr>`);
  }

  if (barChart!=null) {
    barChart.destroy();
  }

  barChart = new Chart(barChartObj, {
    type: 'bar',
    data: {
      labels: ['내 점수', '전체 점수'],
      datasets: [
      {
        label: '트랙 평균',
        data: [data.trackAvg, data.totalAvg],
        backgroundColor: "rgba(0, 99, 255, 0.5)",
        fill: 1
      }],
    },
    options : options
  });
}