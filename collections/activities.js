Activities = new Mongo.Collection( 'activities' );

Activities.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Activities.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ActivitySchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Activity Name"
  },
  "value": {
    type: String,
    label: "Activity Value"
  },
  "projectId": {
    type: String,
    label: "Project Id"
  },
  "collaboratorId": {
    type: String,
    label: "Collaborator Id",
    optional: true
  },
  "status": {
    type: String,
    label: "Activity Status",
    optional: true
  }
});

Activities.attachSchema( ActivitySchema );
