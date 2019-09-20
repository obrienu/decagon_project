$(document).ready(function() {
  async function show(key, val) {
    let result;

    try {
      if (val === 'all') {
        result = await $.ajax({
          url: `http://localhost:3000/${key}`,
          type: 'GET'
          //  data: data
        });
        return result;
      } else {
        result = await $.ajax({
          url: `http://localhost:3000/${key}?validity=${val}`,
          type: 'GET'
          //  data: data
        });
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  $('#show-page').on('submit', async e => {
    e.preventDefault();
    let key = $('#drop').val();
    let validity = $('#validity').val();
    let data = await show(key, validity);
    $('.list').remove();
    $('#denominaton').text(`#${key}`);
    for (let i = 0; i < data.length; i++) {
      $('#display').prepend(
        `<div class="col-sm-6 col-md-4 col-lg-3" id="section"> <li class="list"><a class="view-card" id="${
          data[i]['id']
        }" class="link" href="./view.html?${data[i]['id']}?${key}"> ${
          data[i]['num']
        }</a> </li> <li class="list">Validity: ${
          data[i]['validity']
        }</li> </div> `
      );
    }
  });
});
