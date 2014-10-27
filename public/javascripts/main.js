$(function() {
  var socket = io.connect('http://54.92.114.30/');
  var $word1 = $('#word1 > .word');
  var $word2 = $('#word2 > .word');
  var $reference1 = $('#word1 > .reference');
  var $reference2 = $('#word2 > .reference');
  var $btnWord = $('#input-word-button');
  var $btnComment = $('#input-comment-button');
  var $inputWord = $('#user-word');
  var $inputComment = $('#user-comment');
  
  $btnWord.on('click', function() {
    socket.emit('post word', {
      word: $inputWord.val(),
    });
    $inputWord.val('')
  });

  $btnComment.on('click', function() {
    socket.emit('post comment', {
      comment: $inputComment.val(),
    });
    $inputComment.val('')
  });

  socket.on('login', function(data) {
    updateWordView(data.word1, data.word2, 'login');
  });

  socket.on('broadcast base info', function(data) {
    updateWordView(data.word1, data.word2, 'broadcast');
  });

  function updateWordView(word1, word2, type) {
    if (type !== 'login') {
      if ($word1.text() !== word1.text) {
        $word1.fadeOut('fast');
        $reference1.fadeOut('fast');
        $word1.fadeIn();
        $reference1.fadeIn();
        $word1.text(word1.text);
        $reference1.text(word1.reference);
      }
      if ($word2.text() !== word2.text) {
        $word2.fadeOut('fast');
        $reference2.fadeOut('fast');
        $word2.fadeIn();
        $reference2.fadeIn();
        $word2.text(word2.text);
        $reference2.text(word2.reference);
      }
    } else {
      $word1.text(word1.text);
      $reference1.text(word1.reference);
      $word1.fadeIn();
      $reference1.fadeIn();
      $word2.text(word2.text);
      $reference2.text(word2.reference);
      $word2.fadeIn();
      $reference2.fadeIn();
    }
  }
});
