import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createRouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import router from '@/orpc/router';

const getORPCClient = createIsomorphicFn()
	.server(() =>
		createRouterClient(router, {
			context: () => ({
				headers: getRequestHeaders(),
			}),
		}),
	)
	.client(() => {
		const link = new RPCLink({
			url: `${window.location.origin}/api/rpc`,
		});
		return createORPCClient(link);
	});
export const client = getORPCClient();
export const orpc = createTanstackQueryUtils(client);
