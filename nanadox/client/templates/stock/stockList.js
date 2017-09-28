Template.stocklist.helpers({
  stocks: function() {
    return Stocks.find();
  }

});

Template.registerHelper( 'equals', ( a1, a2 ) => {
  return a1 === a2;
});

Template.stocklist.events({
    'click .qrcodeModal': function() {
         Session.set('qrdata', this);
         Session.set('showModal', true);
     }
});