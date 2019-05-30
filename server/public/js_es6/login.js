$( document ).ready(() => {
  $('#apple').click(() => {
    Swal.fire({type: 'warning', title:'준비중입니다.'});
  });

  $('#account-reset').click(() => {
    Swal.fire({type: 'warning', title:'준비중입니다.'});
  });

  $('#submit').click(event => {
    event.preventDefault();
    let studentIDObj = $('#studentID');
    // 암호화 필요
    let passwordObj = $('#password');
    $.post(
      "/user/login",
      {studentID: studentIDObj.val(), password: passwordObj.val()}
    )
    .done(() => {
      window.location.href = "/";
    })
    .fail( () => {
      $('#error').text("아이디나 패스워드를 다시 확인해주세요.");
      passwordObj.val("");
    });
  });
});