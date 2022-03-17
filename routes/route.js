const express = require('express');
const router = express.Router();
const userSignUpLogin = require('../controllers/userSignUpLogin')
const toDoListManage = require('../controllers/toDoListManage')
const boardManage = require('../controllers/boardManage')
const authentication = require('../authentication/authenticate');
const authorisation = require('../authorisation/authorise')

router.post('/signUpUser', userSignUpLogin.signUpUser);//w
router.post('/loginUser', userSignUpLogin.loginUser);//w
router.put('/updateUser', authentication.authenticate, authorisation.authorisation, userSignUpLogin.updateUser);//w
// router.post('/verifyUser', userSignUpLogin.verifyUser);
router.post('/createBoard', authentication.authenticate, boardManage.createBoard);
router.delete('/deleteBoard', authentication.authenticate,  authorisation.authorisation, boardManage.deleteBoard);
router.post('/createTask', authentication.authenticate, toDoListManage.createTask);
// router.get('/getTasks', authentication.authenticate, authorisation.authorisation, toDoListManage.getTasks);
router.put('/updateTask', authentication.authenticate, authorisation.authorisation, toDoListManage.updateTask);
router.delete('/deleteTask', authentication.authenticate, authorisation.authorisation, toDoListManage.deleteTask);

module.exports = router;
