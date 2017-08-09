Meteor.methods({
  insertProject: function( project ) {
    check( project, Projects.simpleSchema() );

    var newProject = {
      "ownerId": project.ownerId,
      "name": project.name,
      "description": project.description,
      "image": project.image,
      "isActive": project.isActive,
      "walletAddress": project.walletAddress
    };

    try {
      var projectId = Projects.insert( project );
      return projectId;
    } catch( exception ) {
      return exception;
    }
  },
  updateProject: function( updates ) {
    check( updates, Object );

    try {
      Projects.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeProject: function( projectId ) {
    check( projectId, String );

    try {
      Projects.update( { "_id": projectId }, {
        $set: { isActive : false }
      } );
    } catch( exception ) {
      return exception;
    }
  }
});
