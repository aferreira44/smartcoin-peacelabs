Template.searchProjects.helpers({
  projects: function () {
    return Projects.find({ "isActive" : true });
  }
});

Template.registerHelper('listProjects', ( walletAddress ) => {
  var projects = Projects.find({ "isActive" : true });

  var count = 0;
  var out = "";

  projects.forEach(function(row) {
      if (count === 0) {
        out = out + "<div class='row'>";
      }

      out = out + "<div class='col-md-4'>";
      out = out + "<div class='col-md-10' style='border: 1px solid #F8F8F8'>";
      out = out + "<img src='" + row.image + "' class='img-responsive' />";
      out = out + "<h3>" + row.name + "</h3>";
      out = out + "<p>" + row.description + "</p>";
      out = out + "<a id='button' class='btn btn-info' href='/projeto/" + row._id + "'>Ver detalhes</a>";
      out = out + "</div>";
      out = out + "</div>";

      if (count == 2){
        out = out + "</div>";
        out = out + "<div class='row'>";
        count = 0;
      }

      count++;
  });

  return out;

});
