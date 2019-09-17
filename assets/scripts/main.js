$(document).ready(() => {
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
    console.log(e.currentTarget.id);
    tabContentItem.addClass('show');
    $(this).addClass('selected');
  }

  tabs.on('click', selectItem);
});
