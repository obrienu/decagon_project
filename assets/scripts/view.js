$(document).ready(function() {
  let link = window.location.href;
  let id = Number(link.substring(link.indexOf('?') + 1, link.lastIndexOf('?')));
  let key = Number(link.substring(link.lastIndexOf('?') + 1, link.length));
  async function assignShow(id) {
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
  assignShow(id);

  $('#update').on('submit', e => {
    e.preventDefault();
    function update(key, id, body) {
      try {
        result = $.ajax({
          url: `http://localhost:3000/${key}/${id}`,
          type: 'PUT',
          data: body,
          async: false,
          success: respomse => {
            console.log('success');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    let num = $('#num').val(),
      // denom = $('#drop').val(),
      staff = $('#staff').val(),
      validity = $('#validity').val();
    // id = Number($('#id-num').val());

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
          success: respomse => {
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
});
