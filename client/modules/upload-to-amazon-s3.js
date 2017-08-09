let template;
let projectId;

let _getFileFromInput = ( event ) => $('#inputFile')[0].files[0];

let _setPlaceholderText = ( string = "Clique aqui ou Arraste um Arquivo para Upload" ) => {
  template.find( ".alert span" ).innerText = string;
};

let _addUrlToDatabase = ( url ) => {
  Meteor.apply( "storeUrlInDatabase", url, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, "warning" );
      _setPlaceholderText();
    } else {
      console.log("Arquivo adicionado com sucesso na AWS S3");
    }
  });
};

let _uploadFileToAmazon = ( file, projectId ) => {
  const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      Bert.alert( error.message, "warning" );
    } else {
      _addUrlToDatabase( url );

      Projects.update({
        '_id' : projectId
      }, {$set:{
        'image' : url
      }});
    }
  });
};


let upload = ( options ) => {
  template = options.template;
  projectId = options.projectId;

  let file = _getFileFromInput( options.event );

  _setPlaceholderText( `Enviando ${file.name}...` );
  _uploadFileToAmazon( file, projectId );
};

Modules.client.uploadToAmazonS3 = upload;
