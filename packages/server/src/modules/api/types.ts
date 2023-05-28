import { AppCtx } from '../../utils/createAppContext';

export type ApiRequest<Input, Response> = (args: { ctx: { appCtx: AppCtx }; input: Input }) => Promise<Response>;
