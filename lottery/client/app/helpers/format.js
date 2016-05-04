
Template.registerHelper('formatDate',function(val){
    return moment(val).format("DD/MM/YYYY");
});

