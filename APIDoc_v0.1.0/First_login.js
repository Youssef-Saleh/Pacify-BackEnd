/**
 * @api {get} /selectgenresandartists/ Get the user all preferences
 * @apiVersion 0.1.0
 * @apiName Get Choosing preferences
 * @apiGroup First login
 * 
 * 
 * @apiParam {object[]} artist            The artists info(ID-Name-Photo)
 * @apiParam {object[]} library           The libararies info(ID-Name-Photo)
 * 
 * 
 * 
 * 
 */

/**
 * @api {post} /select/ Save the choosen preferences
 * @apiVersion 0.1.0
 * @apiName Save Choosing preferences
 * @apiGroup First login
 * 
 * 
 * @apiParam {number[]} artists         The info about selected artists(ID)
 * @apiPAram {number[]} library         The info about selected libraries(ID) 
 * 
 * 
 * @apiSuccess {object[]} libraries     The generated libraries based on user's taste
 * @apiError (400) {string} badgetway            Playlists are not generated
 * 
 * 
 */