Meteor.methods({
  getBalance: function(walletAddress, user) {

    check(walletAddress, String);
    check(user, Boolean);

    this.unblock();

    Meteor.http.get("http://172.16.1.4:3000/smartcoin/v1/balance", {
      params: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        walletAddress: walletAddress
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {
          if (Meteor.isClient) {

            $('#' + response.data.data.walletAddress).html(response.data.data.balance + " = " + response.data.data.btc + " = " + response.data.data.usd);

            if (user){
              $('#myBalance').html(response.data.data.balance + " = " + response.data.data.btc + " = " + response.data.data.usd);
              $('#myWalletAddress').html(response.data.data.walletAddress);
            }
          }
        }
      }
    });
  },
  getProject: function(userId) {

    check(userId, String);

    this.unblock();

    Meteor.http.get("http://172.16.1.4:3000/smartcoin/v1/project", {
      params: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        userId: userId
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {

          if (Meteor.isClient) {
            $('#projectBalanceSum').html(response.data.data.balance + " = " + response.data.data.btc + " = " + response.data.data.usd);
          }

        }
      }
    });
  },
  postCollaborator: function(cpf, name) {

    check(cpf, String);
    check(name, String);
    this.unblock();

    Meteor.http.post("http://172.16.1.4:3000/smartcoin/v1/collaborator", {
      data: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        cpf: cpf,
        name: name
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {
          var user = Meteor.users.findOne({
            'profile.cpf': cpf
          });

          Meteor.users.update({
            '_id': user._id
          }, {
            $set: {
              "profile.walletAddress": response.data.data.walletAddress
            }
          });
        }
      }
    });
  },
  postProject: function(projectId, name, description, userId) {

    check(projectId, String);
    check(name, String);
    check(description, String);
    check(userId, String);
    this.unblock();

    Meteor.http.post("http://172.16.1.4:3000/smartcoin/v1/project", {
      data: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        projectId: projectId,
        name: name,
        description: description,
        userId: userId
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {

          Projects.update({
            '_id': projectId
          }, {
            $set: {
              "walletAddress": response.data.data.walletAddress
            }
          });

        }
      }
    });
  },
  postTransaction: function(walletAddressFrom, walletAddressTo, value) {

    check(walletAddressFrom, String);
    check(walletAddressTo, String);
    check(value, Number);

    this.unblock();

    if (Meteor.isServer){
      Meteor.http.post("http://172.16.1.4:3000/smartcoin/v1/transaction", {
        data: {
          token: "29430fce7797f2c90dc9dcdf4dbd67b0",
          walletAddressFrom: walletAddressFrom,
          walletAddressTo: walletAddressTo,
          value: value
        }
      }, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          if (response.data.statusCode == 200) {
            console.log("Transação realizada com sucesso");
          }
        }
      });
    }
  }
});
