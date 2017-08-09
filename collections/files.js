Files = new Mongo.Collection( 'files' );

Files.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Files.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});
