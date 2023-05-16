const client_id = 'fb778b78-2a27-4ec2-8ea0-4afdc000d0a8'

export const apiRoutes = {
    metrics: '/payment-links/payment-link/metrics/summary/150',
    //users
    authenticate: '/users/login/',
    //register: '/users/',
    refresh: '/users/renew-token',
    reset: '/users/reset-password',
    logout: '/users/logout',
    profile: '/users/update-profile',
    //clients
    clients: '/accounts/client',
    client: '/accounts/client',

    //get API key
    get_api_key:'/users/generate-api-key',

    //transactions
    transactions: '/transactions/',

    //virtual Accounts
    virtualAccounts: '/virtual_accounts/',

    //prefixes
    prefixes: '/accounts/prefix',

    //tariffs
    tariffs: '/accounts/bank-tariff',

    //teams management
    groups:client_id+'/groups',
    members:'',
    invite_user:'/invitation'
}