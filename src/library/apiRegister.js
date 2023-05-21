
export const apiRoutes = {
    //users
    authenticate: '/auth',
    register: '/signup',
    refresh: '/users/renew-token',
    reset: '/users/reset-password',

    //Operations
    textbot:'/textbot',
    bulk_messaging:'/bulk-messaging',
    citizen_contact:'/citizen-contact',
    queries:'/diaspora-queries',

    //admin
    admin_details:'/admin',
    update_permissions:'/admin/admin/update-permissions',
    update_twilio:'/admin/update-twilio-credentials',
}
