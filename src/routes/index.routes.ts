import DIContainer, { IDIContainer } from "rsdi";
import { DirectMessageController } from "../controllers/direct-message.controller";
import * as core from 'express-serve-static-core';
import { SuccessResponse } from "../utils/response";
import { TweetController } from "../controllers/tweet.controller";

export default function configureRouter(app: core.Express, diContainer: DIContainer<{[key: string]: any;}>) {
    const direcMessageController = diContainer.get<DirectMessageController>(DirectMessageController.name);
    const tweetController = diContainer.get<TweetController>(TweetController.name);

    app.get('/', (_, res) => {
        res.json(SuccessResponse.setSuccessRespose("Welcome to Twitter Automenfess API", 200, []));
    })

    app.get('/direct-message', direcMessageController.listDirectMessage.bind(direcMessageController));
    app.get('/direct-message/:id', direcMessageController.getDetailDirectMessage.bind(direcMessageController));
    app.post('/direct-message', direcMessageController.sendDirectMessage.bind(direcMessageController));

    app.post('/tweet', tweetController.postTweet.bind(tweetController));
}
