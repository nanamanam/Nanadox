Template.stockPage.helpers({
  comments: function() {
    return Stocks.find({postId: this._id});
  },
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.stockPage.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      body: $(e.target).find('[name=body]').val(),
    }

    Stocks.update({_id:this._id}, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('/stock/page', {_id: currentPostId});
      }
    });
}
});