$(document).ready(function() {
  if (window.sessionStorage.getItem('user') === null) {
    window.location = './index.html';
  }

  let user = window.sessionStorage.getItem('user');
  $('#welcome').text(user);

  /* ************Log Out functionality************ */

  $('#logout').on('click', () => {
    window.sessionStorage.removeItem('user');
    window.location = './index.html';
  });

  /* *************************************** */

  let link = window.location.href;
  let id = Number(link.substring(link.indexOf('?') + 1, link.lastIndexOf('?')));
  let key = Number(link.substring(link.lastIndexOf('?') + 1, link.length));
  async function assignShow(id, key) {
    try {
      result = await $.ajax({
        url: `http://localhost:3000/${key}?id=${id}`,
        type: 'GET',
        //data: args,
        success: response => {
          console.log(response);
          $('#value-v').text(key);
          $('#pin-v').text(`${response[0]['num']}`);
          $('#staff-v').text(`${response[0]['staff']}`);
          $('#validity-v').text(`${response[0]['validity']}`);
          $('#num').attr('value', `${response[0]['num']}`);
          $('#drop').attr('value', key);
          $('#staff').attr('value', `${response[0]['staff']}`);
          $('#validity').attr('value', `${response[0]['validity']}`);
          $('#id-num').attr('value', `${response[0]['id']}`);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  assignShow(id, key);

  $('#update-card').on('click', e => {
    e.preventDefault();
    function update(key, id, body) {
      try {
        result = $.ajax({
          url: `http://localhost:3000/${key}/${id}`,
          type: 'PUT',
          data: body,
          async: false,
          success: respomse => {
            window.location = `./view.html?${id}?${key}`;
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    let num = $('#num').val(),
      key = $('#drop').val(),
      staff = $('#staff').val(),
      validity = $('#validity').val();
    id = Number($('#id-num').val());

    let body = { num, validity, staff, id };
    update(key, id, body);
  });

  $('#delete').on('click', e => {
    function deleteFun(key, id) {
      try {
        result = $.ajax({
          url: `http://localhost:3000/${key}/${id}`,
          type: 'DELETE',
          async: false,
          success: response => {
            console.log('success');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    let keyVal = $('#drop').val();
    let idVal = $('#id-num').val();
    deleteFun(keyVal, idVal);
  });

  $('#load').on('click', e => {
    e.preventDefault();
    let input = $('#recharge').val();
    let code = input.slice(0, 2);
    let key = '';
    switch (code) {
      case '31':
        key = '100';
        break;
      case '32':
        key = '200';
        break;
      case '34':
        key = '400';
        break;
      case '35':
        key = '500';
        break;
      case '37':
        key = '750';
        break;
      case '30':
        key = '1000';
        break;
      default:
        $('#valid-display').text('Invalid Pin');
        setTimeout(() => {
          $('#valid-display').text('Enter Recharge Pin');
        }, 3000);
        break;
    }
    try {
      $.ajax({
        url: `http://localhost:3000/${key}?num=${input}`,
        method: 'GET',
        async: false,
        success: res => {
          if (res.length === 1 && res[0]['validity'] === 'Valid') {
            let id = res[0]['id'];
            let num = res[0]['num'];
            let validity = 'Used';
            let staff = res[0]['staff'];
            let data = { num, validity, staff, id };
            try {
              result = $.ajax({
                url: `http://localhost:3000/${key}/${id}`,
                type: 'PUT',
                data: data,
                async: false,
                success: respomse => {
                  window.location = `./view.html?${id}?${key}`;
                  $('#valid-display').text(`#${key} recharge successful`);
                  setTimeout(() => {
                    $('#valid-display').text('Enter Recharge Pin');
                  }, 3000);
                }
              });
            } catch (error) {
              console.log(error);
            }
          } else if (res.length === 1 && res[0]['validity'] !== 'Valid') {
            let id = res[0]['id'];
            assignShow(id, key);
            $('#valid-display').text('Pin has already been used ');
            setTimeout(() => {
              $('#valid-display').text('Enter Recharge Pin');
            }, 3000);
          } else {
            $('#valid-display').text('Invalid Pin');
            setTimeout(() => {
              $('#valid-display').text('Enter Recharge Pin');
            }, 3000);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
});
