Meteor.methods({
    getRoleByUserId: function(id){
        var doc= Meteor.users.findOne(id);
        var data="";
        if(doc.roles.Cpanel!=null){
            doc.roles.Cpanel.forEach(function(obj){
                if(obj=="admin"){
                    data="admin"
                }
            })
        }
        return data;
    }
})