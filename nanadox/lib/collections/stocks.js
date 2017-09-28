Stocks = new Mongo.Collection('stocks');
Stocks.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  remove: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }

});

Meteor.methods({
  stockInsert: function(stockAttributes) {
    check(this.userId, String);
    check(stockAttributes, {
      LotID: String,
      Name: String,
      Package: String,
      Remain: String,
    });

    var errors = validatePost(stockAttributes);
    if (errors.LotID || errors.Name || errors.Package || errors.Remain)
      throw new Meteor.Error('invalid-post', "You must set a Name Lot Amount");

    var postWithSameLink = Stocks.findOne({LotID: stockAttributes.LotID});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var datenow=new Date()
    var stock = _.extend(stockAttributes, {
      userId: user._id, 
      author: user.username,
      Status: "still", 
      submitted: datenow.getFullYear()+"-"+datenow.getMonth()+"-"+datenow.getDate()
    });

    var stockId = Stocks.insert(stock);

    return {
	postComplete: true,
      _id: stockId
    };
  }
});

validatestock = function (stock) {
  var errors = {};
  if (!stock.LotID)
    errors.LotID = "Please fill LotID";
  if (!stock.Name)
    errors.Name =  "Please fill Name";
  if (!stock.Package)
    errors.Amount =  "Please fill Size";
  if (!stock.Remain)
    errors.Remain =  "Please fill Size";
  return errors;
}