Template.project.helpers({
  project: function () {
    var id = FlowRouter.getParam("_id");
    return Projects.findOne({ "_id" : id });
  },
  ownerProject: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId == Meteor.userId()) {
      return project;
    }else{
      return null;
    }
  },
  myBalance: function () {
    var user = Meteor.users.findOne({"_id" : Meteor.userId()});

    var balance = Meteor.call("getBalance", user.profile.walletAddress, true);

    return balance;
  },
  projectActivities: function () {
    var projectId = FlowRouter.getParam("_id");

    return Activities.find({ "projectId": projectId});
  }
});

Template.projectActivity.helpers({
  ownerProject: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId == Meteor.userId()) {
      return project;
    }else{
      return false;
    }
  },
  otherUser: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId != Meteor.userId()) {
      return true;
    }else{
      return false;
    }
  }
});

Template.projectActivity.events({
  'click .btnActivityOpened'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var activityId = $(event.target).closest('tr').data('id');

    var activity = Activities.findOne({ "_id" : activityId });

    activity.status = "Pendente";

    Meteor.call( "updateActivity", activity, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Status da Atividade: Pendente Aprovação", "success" );
      }
    });
  },
  'click .btnActivityFinished'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var activityId = $(event.target).closest('tr').data('id');

    var activity = Activities.findOne({ "_id" : activityId });

    activity.status = "Concluída";

    Meteor.call( "updateActivity", activity, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {

        var user = Meteor.users.findOne({ "_id" : Meteor.userId() });

        var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

        Meteor.call( "postTransaction", project.walletAddress, user.profile.walletAddress, parseFloat(activity.value), function( error, response ) {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            Bert.alert( "Atividade aprovada!! O bônus já foi enviado para o colaborador.", "success" );
          }
        });
      }
    });
  },
});

Template.project.events({
  'click #removeProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");

    Meteor.call( "removeProject", projectId, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Projeto removido com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #sendEtherProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");
    var project = Projects.findOne({ '_id' : projectId });

    var user = Meteor.users.findOne({ '_id' : Meteor.userId() });

    var value = parseFloat($('#valueTransaction').val());

    Meteor.call( "postTransaction", user.profile.walletAddress, project.walletAddress, value, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Contribuição realizada com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #sendEtherWallet'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");
    var project = Projects.findOne({ '_id' : projectId });

    var user = Meteor.users.findOne({ '_id' : Meteor.userId() });

    var value = parseFloat($('#valueTransaction').val());

    Meteor.call( "postTransaction", user.profile.walletAddress, project.walletAddress, value, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Contribuição realizada com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #btnNewActivity'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");

    var newActivity = {
      "projectId": projectId,
      "name": $('#inputNameActivity').val(),
      "value": $('#inputValueActivity').val()
    };

    Meteor.call( "insertActivity", newActivity, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {

        Bert.alert( "Atividade inserida com sucesso!", "success" );
      }
    });
  }
});

Template.registerHelper('projectBalance', ( walletAddress ) => {
  if ( walletAddress ) {
    console.log(walletAddress);
    var promise = Meteor.callPromise("getBalance", walletAddress, false);
  }
});

Template.registerHelper('statusVerify', ( activityId ) => {
  var activity = Activities.findOne({ "_id" : activityId });
  var project;
  var HTML = "";

  if (activity){
      project = Projects.findOne({ "_id" : activity.projectId});
  }

  if (project){
    if (project.ownerId == Meteor.userId() && activity.status == "Aberta") {

      HTML = "<a class='btn btn-sm btn-success' disabled>"+
                  "<i class='fa fa-suitcase fa-lg'></i> Atividade Aberta"+
                  "</a>";
    }

    if (project.ownerId == Meteor.userId() && activity.status == "Pendente") {

      HTML = "<a class='btn btn-sm btn-success btnActivityFinished'>"+
                  "<i class='fa fa-check fa-lg'></i> Aprovar Atividade"+
                  "</a>";
    }

    if (activity.status == "Concluída") {

      HTML = "<a class='btn btn-sm btn-default' disabled>"+
                  "<i class='fa fa-flag-checkered fa-lg'></i> Atividade concluída"+
                  "</a>";
    }

    if (project.ownerId != Meteor.userId() && activity.status == "Aberta") {

      HTML = "<a id='" + activityId + "' class='btn btn-sm btn-success btnActivityOpened'>"+
                  "<i class='fa fa-suitcase fa-lg'></i> Realizar Atividade"+
                  "</a>";
    }

    if (project.ownerId != Meteor.userId() && activity.status == "Pendente") {

      HTML = "<a class='btn btn-sm btn-warning' disabled>"+
                  "<i class='fa fa-clock-o fa-lg'></i> Pendente Aprovação"+
                  "</a>";
    }
  }

  return HTML;

});
