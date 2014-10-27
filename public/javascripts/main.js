$(function() {
  var socket = io.connect('http://54.92.114.30/');
  var $word1 = $('#word1 > .word');
  var $word2 = $('#word2 > .word');
  var $reference1 = $('#word1 > .reference');
  var $reference2 = $('#word2 > .reference');
  
  socket.on('login', function(data) {
    updateWordView(data.word1, data.word2, 'login');
  });

  socket.on('broadcast base info', function(data) {
    updateWordView(data.word1, data.word2, 'broadcast');
  });

  function updateWordView(word1, word2, type) {
    if (type !== 'login') {
      $word1.fadeOut();
      $word2.fadeOut();
      $reference1.fadeOut();
      $reference2.fadeOut();
    }
    $word1.text(word1.text);
    $word2.text(word2.text);
    $word1.fadeIn();
    $word2.fadeIn();
    $reference1.text(word1.reference);
    $reference2.text(word2.reference);
    $reference1.fadeIn();
    $reference2.fadeIn();
  }
});
