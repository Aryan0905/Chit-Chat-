import express from 'express';
import { getUserForSidebar } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.middleware.js';

const Router = express.Router();

Router.get('/',protectRoute, getUserForSidebar);

export default Router;
