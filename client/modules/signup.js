let signup = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler() { _handleSignup( template ); }
  };
};

let _handleSignup = ( template ) => {
  let user = {
    email: template.find( '[name="emailAddress"]' ).value,
    password: template.find( '[name="password"]' ).value,
    profile: {
      name: template.find( '[name="name"]' ).value,
      cpf: template.find( '[name="cpf"]' ).value,
    }
  };

  var cpf = template.find( '[name="cpf"]' ).value;
  var name = template.find( '[name="name"]' ).value;

  Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Meteor.call("postCollaborator", cpf, name);

      Bert.alert( 'Parabéns! Sua conta foi criada com sucesso!', 'success' );
      BlazeLayout.render( 'default', { yield: 'dashboard' } );
    }
  });
};

Modules.client.signup = signup;
