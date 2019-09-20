$(document).ready(function() {
  if (window.sessionStorage.getItem('user') === null) {
    window.location = './index.html';
  }

  /* ************Assign User name******** */
  let user = window.sessionStorage.getItem('user');
  $('#welcome').text(user);

  $('#user').attr('value', user);

  /* ************Log Out functionality************ */

  $('#logout').on('click', () => {
    window.sessionStorage.removeItem('user');
    window.location = './index.html';
  });

  /* *************************************** */

  $('form').on('submit', async function(e) {
    e.preventDefault();

    /*****FUNCTION TO GENERATE PIN BASED ON SPECIFIED DENOMINATION */

    function generatePin() {
      let denomination = $('#drop').val();
      switch (denomination) {
        case '100':
          return Math.floor(Math.random() * 10000000000000) + 3100000000000000;
          break;
        case '200':
          return Math.floor(Math.random() * 10000000000000) + 3200000000000000;
          break;
        case '400':
          return Math.floor(Math.random() * 10000000000000) + 3400000000000000;
          break;
        case '500':
          return Math.floor(Math.random() * 10000000000000) + 3500000000000000;
          break;
        case '750':
          return Math.floor(Math.random() * 10000000000000) + 3700000000000000;
          break;
        case '1000':
          return Math.floor(Math.random() * 10000000000000) + 3000000000000000;
          break;
      }
    }

    /******FUNCTION CHECKS FOR PIN IN DATABASE AND ADDS IF ABSENT */

    function generateCard() {
      let num = generatePin();
      let key = $('#drop').val();
      try {
        $.ajax({
          url: `http://localhost:3000/${key}?num=${num}`,
          method: 'GET',
          async: false,
          success: res => {
            if (res.length === 0) {
              try {
                let staff = $('#user').val();
                let validity = 'Valid';
                $.ajax({
                  url: `http://localhost:3000/${key}`,
                  method: 'POST',
                  data: { num, validity, staff },
                  async: false,
                  success: res => {
                    console.log('success');
                  }
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    //*********GENERATE SPECIFIED QUANTITY */
    let quantity = $('#quantity').val();
    for (let i = 0; i < Number(quantity); i++) {
      generateCard();
    }
    $('#gen-notice').show();
    setTimeout(() => {
      $('#gen-notice').hide();
    }, 3000);
  });
});
