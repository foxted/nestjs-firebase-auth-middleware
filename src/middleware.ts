import {Injectable, NestMiddleware, HttpStatus} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {Request, Response} from 'express';
import firebase from './initialize';
import Exception from './exceptions/Exception';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
    async use(req: Request, _: Response, next: Function) {
        try {
            const {authorization} = req.headers;

            if (!authorization) {
                throw new Exception(
                    'Missing authorization header',
                    'auth/missing-authorization',
                );
            }

            const token = authorization.slice(7);

            req.user = await firebase.auth().verifyIdToken(token);
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}
