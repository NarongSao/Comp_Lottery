Template.registerHelper('getBranch', function (id) {
    var result = "All";
    if (id != "") {
        var branchName = Cpanel.Collection.Branch.findOne(id).enName;
        result = branchName;
    }
    return result;
})