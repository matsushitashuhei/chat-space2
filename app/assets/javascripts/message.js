$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    if (message.image) {
      var image = `<img src="${message.image}">`;
    } else {
      var image = '';
    }
    var html = `
      <div class="message">
        <div class="message__user-name">
          ${message.user_name}
        </div>
        <div class="message__posted-time">
          ${message.created_at}
        </div>
        <div class="message__content">
          <div class="content__text">
            ${message.content}
          </div>
          <div class="content__image">
            ${image}
          </div>
        </div>
      </div>
    `
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('#new_message')[0].reset();
      $('.send-btn').prop('disabled', false);
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'swing');
    })
    .fail(function() {
      alert('メッセージが送信されませんでした');
    })
  })
})
