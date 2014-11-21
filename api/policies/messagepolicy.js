/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  if(req.session.user) {

    	var action = req.param("action");

    	if(action == "create") {
        
        req.body.userId = req.session.user.id;

    		req.body.username = req.session.user.username;
        
        console.log(req.body.message);
      }

    	next();
  } else {
      res.send("You must be login" , 403);
  }
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  // if (req.session.authenticated) {
  //   return next();
  // }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
