$(function() {
  var socket = io.connect('http://54.92.114.30/');
  var $word1 = $('#word1 > .word');
  var $word2 = $('#word2 > .word');
  var $reference1 = $('#word1 > .reference');
  var $reference2 = $('#word2 > .reference');
  var $btnWord = $('#input-word-button');
  var $btnComment = $('#input-comment-button');
  var $btnStock = $('#stock-button');
  var $btnView = $('#view-button');
  var $btnDrop = $('#drop-button');
  var $inputWord = $('#user-word');
  var $inputComment = $('#user-comment');
  var $stocks = $('#stocks');
  var $comments = $('#user-comments');
  
  $btnWord.on('click', function() {
    socket.emit('post word', {
      word: $inputWord.val(),
    });
    $inputWord.val('')
  });

  $btnComment.on('click', function() {
    socket.emit('post comment', {
      comment: $inputComment.val(),
      text1: $word1.text(),
      text2: $word2.text(),
    });
    $inputComment.val('')
  });

  $btnStock.on('click', function() {
    var cache = localStorage.getItem('words') || '';
    var newWords = '<li>' + $word1.text() + ' x '  + $word2.text() + '</li>';
    localStorage.setItem('words', newWords + cache);
  });

  $btnView.on('click', function() {
    var cache = localStorage.getItem('words') || '';
    $stocks.empty();
    $stocks.append(cache);
  });

  $btnDrop.on('click', function() {
    $stocks.empty();
    localStorage.removeItem('words');
  });

  socket.on('login', function(data) {
    updateWordView(data.word1, data.word2, 'login', data.comments);
  });

  socket.on('broadcast base info', function(data) {
    updateWordView(data.word1, data.word2, 'broadcast', data.comments);
  });

  socket.on('broadcast comments', function(data) {
    updateCommentView(data.comments);
  });

  function updateWordView(word1, word2, type, comments) {
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
      $comments.empty();
      if (comments && comments.length > 0) {
        _.each(comments.reverse(), function(item) {
          $comments.append('<li>' + item + '</li>');
        });
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

  function updateCommentView(comments) {
    $comments.empty();
    if (comments && comments.length > 0) {
      _.each(comments.reverse(), function(item) {
        $comments.append('<li>' + item + '</li>');
      });
    }
  }
});
