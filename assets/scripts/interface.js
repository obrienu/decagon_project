$(document).ready(function() {
  /* async function postRoute(key, data) {
    try {
      let result = await $.ajax({
        url: `http://localhost:3000/${key}`,
        method: 'POST',
        data: data,
        'Content-Type': 'application / json',
        success: function(data) {
          $('#notice').html('Registration Successful');
        }
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  } */

  async function generateCard() {
    try {
      let num = Math.floor(Math.random() * 1000000000000000) + 3000000000000000;
      let denomination = ['100', '200', '400', '500', '750', '1000'];
      let val;
      for (let i = 0; i < denomination.length; i++) {
        val = await $.ajax({
          url: `http://localhost:3000/${denomination[i]}?value=${num}`,
          type: 'GET'
        });
        if (val.includes(num)) {
          generateCard();
        }
      }
      return num;
    } catch (error) {
      console.error(error);
    }
  }
  //console.log(generateCard());
  let link = window.location.href;
  link.indexOf('=');
  let user = link.substring(link.indexOf('=') + 1, link.length);
  $('#user').attr('value', user);

  $('form').on('submit', async function(e) {
    e.preventDefault();
    let quantity = $('#quantity').val();
    let staff = $('#user').val();
    // let validity = true;
    let key = $('#drop').val();

    for (let i = 0; i < Number(quantity); i++) {
      generateCard().then(num => {
        try {
          $.ajax({
            url: `http://localhost:3000/${key}`,
            method: 'POST',
            data: { num, validity: true, staff },
            'Content-Type': 'application / json'
          });
        } catch (error) {
          console.error(error);
        }
      });
      //body = { num, validity, staff };
      // await postRoute(denom, body);
    }
  });
});
