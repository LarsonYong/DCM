import express from 'express';

//import controller file
// import * as todoController from '../controllers/todo.server.controller';
import * as userController from '../controllers/user.server.controller';
import * as authController from '../controllers/auth.controller';
import * as nodeController from '../controllers/node.server.controller'
import * as statusController from '../controllers/status.server.controller'
import * as resultController from '../controllers/result.server.controller'
import verifyToken from '../controllers/token.controller'

// get an instance of express router
const router = express.Router();

router.route('/login/')
    .post(authController.login);

// router.route('/auth/')
//     .post(authController.auth);

router.route('/user/')
    .get(userController.getUsers)
    .post(userController.addUser)
    .put(userController.updateUser);

router.route('/user/id/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

router.route('/status/')
    .get(statusController.getData);

router.route('/status/refresh')
    .get(statusController.syncUnits);

router.route('/result/id/:id')
    .get(resultController.getData);

router.route('/analyze')
    .post(resultController.analyzeUnit);


// router.route('/todo/')
//      .get(todoController.getTodos)
//      .post(todoController.addTodo)
//      .put(todoController.updateTodo);
//
// router.route('/todo/id/:id')
//       .get(todoController.getTodo)
//       .delete(todoController.deleteTodo);

router.route('/token')
      .get(verifyToken);

router.route('/node/')
    .get(nodeController.getNodes)
    .post(nodeController.addNode)


// router.route('/node/id/:id')
//       .get(nodeController.getNode)
//       .post(nodeController.updateNode)
//       .delete(nodeController.deleteNode);

export default router;
