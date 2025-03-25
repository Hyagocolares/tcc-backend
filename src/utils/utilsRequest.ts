// src/utils/utilsRequest.ts
import { Request, Response } from 'express'
import environment from '../config/environment'

export type ErrorRequest = {
    status: 'error',
    message: string,
    error?: string
  }

export function exceptionRouter (req: Request, res: Response, error?: Error) {
    (<any>req).errorException = error.stack || error.message
  
    const errorMessage: ErrorRequest = {
      status: 'error',
      message: `an error ocurred in ${req.method} ${req.baseUrl || req.originalUrl}`,
      error: environment.server.mode !== 'production' && error?.message ? error.message : undefined
    }
  
    console.error(error)
  
    res.status(500).json(errorMessage)
  }