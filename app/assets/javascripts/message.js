$(function() {
  function buildHTML(message) {
    var html = `
      <div class="message">
        <div class="message__user-name">
          <%= ${message.user_name} %>
        </div>
        <div class="message__posted-time">
          <%= ${message.created_at} %>
        </div>
        <div class="message__content">
          <%= ${message.content} if ${message.content} %>
          <%= image_tag ${message.image} if ${message.image} %>
        </div>
      </div>`
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
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.message-content').val('');
      $('.picture').val('');
      $('.chat-main__body').animate({ scrollTop: $('.chat-main__body').height() }, 'swing');
    })
  })
})
