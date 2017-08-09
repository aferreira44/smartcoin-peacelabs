Template.searchProjects.onCreated( function() {
  this.subscribe( 'projects', function() {
    console.log( "Projects data ready.");
  });
});
