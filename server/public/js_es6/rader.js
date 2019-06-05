var raderChart = null;

function rader(studentID) {
  $.get(`/user/rader/${studentID}`, statsData => {
    var ctx = document.getElementById('raderChart').getContext('2d');

    var options = {
      scale: {
        pointLabels: {
          fontSize: 20,
          fontStyle: '300',
          fontColor: 'rgba(0, 0, 0, 1)',
          fontFamily: "맑은 고딕, sans-serif"
        },
        ticks: { 
          beginAtZero: true,
          maxTicksLimit: 2,
          min: 0,
          max: 4.5
        }
      }
    };
    
    var labels = [];
    var datas = [];

    $.map(statsData, stat => {
      labels.push(stat.name);
      datas.push(stat.score);
    });
    
    raderChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
            {
              label: '점수',
              backgroundColor: 'rgba(0, 99, 255, 0.5)',
              borderColor: 'rgba(0, 99, 255, 1)',
              data: datas
            }],
        },
        options : options
    });
  });
}