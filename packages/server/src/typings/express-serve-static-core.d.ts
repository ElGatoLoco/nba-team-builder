import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface RequestHandler<
    P = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ParsedQs,
    LocalsObj extends Record<string, unknown> = Record<string, unknown>,
  > {
    (
      req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
      res: Response<ResBody, LocalsObj>,
      next: NextFunction,
    ): void | Promise<void>;
  }
}
