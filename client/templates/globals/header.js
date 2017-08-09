Template.header.helpers({
  brandLink() {
    let dashboard = FlowRouter.path( 'dashboard' ),
        index = FlowRouter.path( 'index' );
    return !Meteor.loggingIn() && !Meteor.userId() ? index : dashboard;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert( 'Logout realizado com sucesso!', 'success' );
      }
    });
  }
});
