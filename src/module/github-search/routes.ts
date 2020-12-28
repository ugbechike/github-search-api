import { Router } from 'express';
import { Router as IRouter } from 'express-serve-static-core';
import {actionSearchGithubValidator, githubSearchAction} from "./github-search-action";


const router: IRouter = Router();

router.post('/search', actionSearchGithubValidator, githubSearchAction);

export { router as githubSearchRoute };



