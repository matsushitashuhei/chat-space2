$(function() {
  function buildHTML(message) {
    if (message.image) {
      var image = `<img src="${message.image}">`;
    } else {
      var image = '';
    }
    var html = `
      <div class="message" data-message-id="${message.id}">
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
  };

  setInterval(update, 5000);

  function update() {
    var message_id = $('.message').last().data('message-id');
    var url = location.pathname.match(/\/groups\/\d+\/messages/);
    $.ajax({
      url: url,
      type: 'GET',
      data: {id: message_id},
      dataType: 'json',
      // processData: false,
      contentType: false
    })
    .done(function(data) {
      if (data.length == 0) return false;
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.chat-main__body').append(html);
      });
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'swing');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  };
})
