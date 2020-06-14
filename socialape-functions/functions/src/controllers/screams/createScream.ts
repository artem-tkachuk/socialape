import {Request, Response} from "express";
import db from "../../database/firestore";
import {Scream} from "../../interfaces/scream";

// @ts-ignore
export const createScream = (req: Request, res: Response) => {

    if (req.body.body.trim() === ``) {
        return res.status(400).json({
            body: `Body must not be empty`
        });
    }

    const newScream: Scream = {
        body: req.body.body,
        // @ts-ignore
        userHandle: req.user.handle,
        commentCount: 0,
        likeCount: 0,
        createdAt: new Date().toISOString(),
        // @ts-ignore
        userImage: req.user.imageUrl
    };

    db.collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({
                ...newScream,
                screamId: doc.id
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Something went wrong!`
            });
            console.error(err);
        })
};