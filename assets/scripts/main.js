$(document).ready(() => {
  //const postRoute = include('./modules/ajas');
  function postRoute(key, data) {
    return $.ajax({
      url: `http://localhost:3000/${key}`,
      method: 'POST',
      data: data,
      'Content-Type': 'application / json',
      success: function(data) {
        $('#notice').html('Registration Successful');
        console.log('success');
      },
      error: function(e) {
        $('#notice').html('Staff ID already registered');
      }
    });
  }

  let tabs = $('.show-tab');
  let tabContent = $('.tab-content');

  function removeSelected() {
    tabs.removeClass('selected');
  }

  function removeShow() {
    tabContent.removeClass('show');
  }

  function selectItem(e) {
    removeSelected();
    removeShow();
    const tabContentItem = $(`#${e.currentTarget.id}-content`);
    tabContentItem.addClass('show');
    $(this).addClass('selected');
  }

  tabs.on('click', selectItem);

  /* *************Handle Sign up*********** */
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url: `http://localhost:3000/staffID`,
      type: 'GET',
      success: function(data) {
        let name = $('#name').val();
        let id = $('#staff-id1').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let key = 'profile';
        let body = { id, name, email, password };
        if (data.includes(id)) {
          postRoute(key, body);
        } else {
          $('#notice').html('Invalid Staff ID');
        }
      },
      error: function(e) {
        $('#notice').html('Staff ID already registered');
      }
    });
  });

  /* *******************Handle Sign In************************* */
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url: `http://localhost:3000/profile`,
      type: 'GET',
      success: function(data) {
        let name = $('#sname').val();
        let id = $('#staff-id2').val();
        let password = $('#spassword').val();
        for (let i = 0; i < data.length; i++) {
          console.log(id, name, password);
          console.log(data[i]['id'], data[i]['name'], data[i]['password']);
          if (
            data[i]['id'] === id &&
            data[i]['name'] === name &&
            data[i]['password'] === password
          ) {
            let userInfo = {
              id: data[i]['id']
            };
            console.log(userInfo);
            window.location = '/userInterface.html?name=' + name;
          }
        }
        $('#notice').html('Invalid Login Credential');
      },
      error: function(e) {
        console.log(e);
      }
    });
  });
});
