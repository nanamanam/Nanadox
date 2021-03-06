Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('stocks'); }
});

Router.route('qrcode/:_id/:Start/:End', {
  name:'qrcodelist',
  data: function() { 
    var start=this.params.Start;
    var end=this.params.End;
    var name=this.params._id;
    return {
      Start:start,
      End:end,
      ID:name
    }
    //return Stocks.findOne(this.params._id);
  }

});

Router.route('/stock', {
  name: 'stocklist',
});

Router.route('/stock/submit', {name: 'stockSubmit'});



Router.route('/:postsLimit?', {
  name: 'postsList',
});

Router.route('/stock/edit/:_id', {
  name: 'stockEdit',
  data: function() { return Stocks.findOne(this.params._id); }
});
Router.route('/stock/page/:_id', {
  name: 'stockPage',
  waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
  data: function() { return Stocks.findOne(this.params._id); }
});


Router.route('/posts/:_id', {
	name: 'postPage',
	waitOn: function() {
    		return Meteor.subscribe('comments', this.params._id);
  	},
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
 	if(Meteor.loggingIn()){
   		this.render(this.loadingTemplate);
	}else{
		this.render('accessDenied');
	}

  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
