Template.stockEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      Status: $(e.target).find('[name=status]').val(),
      
    }

    Stocks.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('/stock');
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();
      var currentPostId = this._id;
      new Confirmation({
        message: "Are you sure ?",
        title: "Confirmation",
        cancelText: "Cancel",
        okText: "Ok",
        success: true, // whether the button should be green or red
        focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
      }, function (ok) {
        // ok is true if the user clicked on "ok", false otherwise
        if(ok){
        
        Stocks.remove(currentPostId);
        Router.go('/stock');
        }
      });
    
  }
});
