$(document).ready(function() {
  $('.tabs .tab-links a').on('click', function(event){
    var currentAttrValue = $(this).attr('href');

    $('.tabs ' + currentAttrValue).show().siblings().hide();
    $(this).parent('li').addClass('active').siblings().removeClass('active');
    event.preventDefault();
  });

  $('.details').on('click', function(event) {
    $('body').toggleClass('prevent');
    $('.inventory-details-modal').toggleClass('active');
  })
});
