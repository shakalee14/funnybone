$(document).ready(function() {
  $('.tabs .tab-links a').on('click', function(event){
    var currentAttrValue = $(this).attr('href')

    $('.tabs ' + currentAttrValue).show().siblings().hide()
    $(this).parent('li').addClass('active').siblings().removeClass('active')
    event.preventDefault()
  })

  $('.details').on('click', function(event) {
    event.preventDefault()
    var currentItem = $(this).attr('data-id')

    $('body').toggleClass('prevent')
    $(".inventory-details-modal[data-id=" + currentItem +"]").addClass('active')
  })

  $('.close').on('click', function(event) {
    event.preventDefault()
    $('.inventory-details-modal').removeClass('active')
  })
  
})
