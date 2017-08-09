Meteor.methods({
  insertActivity: function( activity ) {
    check( activity, Activities.simpleSchema() );

    var newActivity = {
      "projectId": activity.projectId,
      "name": activity.name,
      "value": activity.value,
      "status": "Aberta"
    };

    try {
      var activityId = Activities.insert( newActivity );
      return activityId;
    } catch( exception ) {
      return exception;
    }
  },
  updateActivity: function( updates ) {
    check( updates, Object );

    try {
      Activities.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeActivity: function( activityId ) {
    check( activityId, String );

    try {
      Activities.update( { "_id": activityId }, {
        $set: { isActive : false }
      } );
    } catch( exception ) {
      return exception;
    }
  }
});
