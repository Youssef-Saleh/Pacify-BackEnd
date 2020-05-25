/**
  * @api {get} /activitylog Activity log retrieval
  * @apiVersion 0.1.0
  * @apiName Get activity log
  * @apiGroup Activity log 
  * @apiDescription Retrieves the activity log of a specific user
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next            callback function
  *
  * 
  * @apiSuccess (200){string} Message         Log retrieved
  * @apiError (400) {string} ErrorMessage        Invalid token or no events in the log
  * 
  * 
  * 
  */