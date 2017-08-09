Template.newProject.events({
  'submit #newProject'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    var newProject = {
      "ownerId": Meteor.userId(),
      "name": $('#name').val(),
      "description": $('#description').val(),
      "image": "img/loading.gif", //TODO: Salvar imagem do upload feito pelo usuário // Carregando LoremPixel quando salva projeto
      "isActive": true,
      "walletAddress": ""
    };



    Meteor.call( "insertProject", newProject, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {

        Modules.client.uploadToAmazonS3( { event: event, template: template, projectId : response } );

        console.log("resposne: " + response);

        Meteor.call("postProject", response, $('#name').val(), $('#description').val(), Meteor.userId());

        Bert.alert( "Projeto criado com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  }
});
