import { AgentRuntimeError } from '@lobechat/model-runtime';
import { ChatErrorType } from '@lobechat/types';

interface CheckAuthParams {
  betterAuthAuthorized?: boolean;
}
/**
 * Check if authentication is valid.
 * Only accepts a verified server-side session (Better Auth).
 * The legacy `apiKey` truthy check has been removed because the XOR-obfuscated
 * header is forgeable (hardcoded key) and 2.x reads provider credentials from
 * the database, not from the client header.
 *
 * @param {CheckAuthParams} params - Authentication parameters.
 * @param {boolean} [params.betterAuthAuthorized] - Whether the Better Auth session exists.
 * @throws {AgentRuntimeError} If no valid authentication method is found.
 */
export const checkAuthMethod = (params: CheckAuthParams) => {
  const { betterAuthAuthorized } = params;

  // if better auth session exists
  if (betterAuthAuthorized) return;

  throw AgentRuntimeError.createError(ChatErrorType.Unauthorized);
};
