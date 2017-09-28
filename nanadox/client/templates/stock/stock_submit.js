Template.stockSubmit.onCreated(function() {
  Session.set('stockSubmitErrors', {});
});
Template.stockSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('stockSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('stockSubmitErrors')[field] ? 'has-error' : '';
  }
});




Template.stockSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    //alert("Submit");
    var stock = {
      LotID: $(e.target).find('[name=LotID]').val(),
      Name: $(e.target).find('[name=Name]').val(),
      Package: $(e.target).find('[name=Package]').val(),
      Remain: $(e.target).find('[name=Remain]').val()
      //author:  $(e.target).find('[name=author]').val()
    };
    var errors = validatestock(stock);
    if (errors.LotID || errors.Name || errors.Package || errors.Remain)
      return Session.set('stockSubmitErrors', errors);
    //alert("Submit2");
    Meteor.call('stockInsert', stock, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
      Router.go('/stock');  
    });
    //alert("Submit3");
  }

});
