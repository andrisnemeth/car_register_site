import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import * as userService from '../services/userService';

export async function getAllUsers(req, res, next){
  try{
    const data = await userService.getAllUsers();
    res.send(data);
  } catch (error){
    next(new HttpError(status.INTERNAL_SERVER_ERROR));
  }
}