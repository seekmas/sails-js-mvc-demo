/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var MainController = {
        index: function(req,res)
        {

            var all_user = [];
            Users.find().exec(function(err,user){
                res.view({
                    user: user
                });
            });
        },

        signup: function(req,res)
        {
            var username = req.param("username");
            var password = req.param("password");
            console.log(username+" "+password);
            Users.findByUsername(username).exec(function(err,usr){
                if(err)
                {
                    res.send(500,{error: 'DB error'+err});

                }else if(usr.length != 0)
                {
                    console.log(usr);
                    res.send(400,{error: "Username was already signed up"})

                }else
                {
                    var hasher = require("password-hash");
                    password = hasher.generate(password);
                    Users.create({username: username ,password: password}).exec(
                        function(err,user)
                        {
                            if(err)
                            {
                                res.send(500,{error: "DB Error"});
                            }
                            else
                            {
                                req.session.user = user;
                                res.send(user);
                            }
                        }
                    );
                }
            });
        },

        login: function(req,res)
        {   
            var username = req.param('username');
            var password = req.param('password');
            //console.log(username + ":" + password);
            Users.findOneByUsername(username).exec(function(err,user){

                if(err) {
                    res.send(500,{ error: "DB Error"});
                }else {
                    if(user) {
                        var hasher = require("password-hash");

                        if(hasher.verify(password, user.password)) {
                            req.session.user = user;
                            res.send(user);
                        }else {
                            res.send(400 , { error: "Wrong Password"});
                        }

                    }else {
                        res.send(404 , { error: "User not found"});
                    }
                }

            });
        },

        chat: function(req,res)
        {
            res.view();
        },

        backbone: function(req,res) {
            res.view()
        }
};

module.exports = MainController;
