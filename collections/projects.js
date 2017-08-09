Projects = new Mongo.Collection( 'projects' );

Projects.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Projects.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ProjectSchema = new SimpleSchema({
  "ownerId":{
    type: String,
    label: "Owner of Project is a User.id"
  },
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description"
  },
  "image": {
    type: String,
    label: "Project Image"
  },
  "isActive": {
    type: Boolean,
    label: "Project isActive?"
  },
  "walletAddress": {
    type: String,
    optional: true,
    label: "Project Wallet Address"
  }
});

Projects.attachSchema( ProjectSchema );
