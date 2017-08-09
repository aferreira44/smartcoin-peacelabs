let _fileExistsInDatabase = ( url ) => {
  return Files.findOne( { "url": url, "userId": Meteor.userId() }, { fields: { "_id": 1 } } );
};

let _isNotAmazonUrl = ( url ) => {
  return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
};

let _validateUrl = ( url ) => {
  if ( _fileExistsInDatabase( url ) ) {
    return { valid: false, error: "Desculpe, este arquivo já existe!" };
  }

  if ( _isNotAmazonUrl( url ) ) {
    return { valid: false, error: "Desculpe, este não é um arquivo válido" };
  }

  return { valid: true };
};

let validate = ( url ) => {
  let test = _validateUrl( url );

  if ( !test.valid ) {
    throw new Meteor.Error( "file-error", test.error );
  }
};

Modules.both.checkUrlValidity = validate;
