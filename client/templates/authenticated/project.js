Template.project.onCreated( function() {
  this.subscribe( 'projects', function() {
    console.log( "Projects data ready.");
  });

  this.subscribe( 'activities', function() {
    console.log( "Activities data ready.");
  });
});
