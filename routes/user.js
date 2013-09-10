
/*
 * GET users listing.
 */

exports.list = function(req, res){

    console.log(req);
    global.db.User.build({username: 'osmar'})
    .save()
    .success(function(){console.log("insert")})
    .error(function(err){console.log(err)})

    global.db.User.findAll().success(function(user){console.log(user);
						    res.send(user)
})
    .error(function(err){console.log(err); res.send("erro")})
	  //  res.send("respond with a resource");
};
