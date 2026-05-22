export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
};


export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; //set the error type to API Error
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorhandler = (err, req, res, next) => {
  console.error(err.stack); //log the erro stack

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  //handle mongoose validation ->
  else if (err.name === "validationError") {
    return res.status(400).json({
      status: "error",
      message: "validation Error",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occured",
    });
  }
};


/* 
import { APIError, asyncHandler } from './errorMiddleware.js'; // Note the .js extension is often required in ESM
import { supabase } from '../supabaseClient.js';

export const getTexnites = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('texnites')
    .select('*');
  
  if (error) {
    // This now correctly passes the error to globalErrorhandler via asyncHandler
    throw new APIError(error.message, 500);
  }

  res.status(200).json({
    status: "success",
    data: data
  });
});

*/
