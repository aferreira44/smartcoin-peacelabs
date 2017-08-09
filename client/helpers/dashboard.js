Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId(), "isActive" : true });
  },
  myBalance: function () {
    var user = Meteor.users.findOne({"_id" : Meteor.userId()});

    var balance = Meteor.call("getBalance", user.profile.walletAddress, true);

    return balance;
  },
  projectBalanceSum: function () {
    var user = Meteor.users.findOne({"_id" : Meteor.userId()});

    var projectBalanceSum = Meteor.call("getProject", user._id);

    return projectBalanceSum;
  }
});

Template.registerHelper('projectBalance', ( walletAddress ) => {
  if ( walletAddress ) {
    console.log("chamous consulta saldo");
    var promise = Meteor.call("getBalance", walletAddress, false);
    console.log("promise: " + promise);
  }
});
