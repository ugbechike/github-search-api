import { Router } from 'express';
import { Router as IRouter } from 'express-serve-static-core';
import {actionSearchGithubValidator, githubSearchAction} from "./github-search-action";
import {githubCacheDataAction} from "./github-cache-data-action";
import {catchAsyncErrors} from "../../utils/routers";


const router: IRouter = Router();

router.post('/search', actionSearchGithubValidator, catchAsyncErrors(githubCacheDataAction), catchAsyncErrors(githubSearchAction));

export { router as githubSearchRoute };



