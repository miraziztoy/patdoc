import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler { handleError(error){console.log('ERROR:', error)} }

export class NotFoundError{ constructor(public originalError?:any){} };

export class AppError extends NotFoundError{};

export class BadInput extends NotFoundError{};