/**
  * @api {get} /notifications Notifications retrieval
  * @apiVersion 0.1.0
  * @apiName Get notifications
  * @apiGroup Notifications 
  * @apiDescription Retrieves the notifications of a specific user
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next            callback function
  *
  * 
  * @apiSuccess (200){string} Message         Notifications retrieved
  * @apiError (400) {string} ErrorMessage        Invalid token or no notifications
  * 
  * 
  * 
  */