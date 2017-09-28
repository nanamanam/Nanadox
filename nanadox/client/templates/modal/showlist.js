Template.showlist.helpers({
    qrinfo: function() {
    return Session.get("qrdata");
  }

});
 Template.showlist.events({
    'submit .myclass': function (e) {
      e.preventDefault();
    var start=$(e.target).find('[name=start]').val();
    var end=$(e.target).find('[name=end]').val();
    var id=Session.get('qrdata')._id;
   // alert(start);
     Router.go('qrcodelist',{_id:id,Start:start,End:end});
     Session.set('showModal', false);
     $('.modal-backdrop').remove();
  


    }

  });