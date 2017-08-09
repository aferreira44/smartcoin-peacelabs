const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/painel', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});

authenticatedRoutes.route( '/criar-projeto', {
  name: 'newProject',
  action() {
    BlazeLayout.render( 'default', { yield: 'newProject' } );
  }
});

authenticatedRoutes.route( '/projeto/:_id', {
  name: 'project',
  action: function(params) {
    BlazeLayout.render( 'default', {
      yield: 'project',
      _id: params._id
    });
  }
});

authenticatedRoutes.route( '/contribuir', {
  name: 'searchProjects',
  action() {
    BlazeLayout.render( 'default', { yield: 'searchProjects' } );
  }
});

authenticatedRoutes.route( '/minha-conta', {
  name: 'myAccount',
  action() {
    BlazeLayout.render( 'default', { yield: 'myAccount' } );
  }
});
