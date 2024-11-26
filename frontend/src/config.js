const host = 'host.docker.internal:5000';

const CFG_BACKEND = {
    getEmployees: {
        method: 'GET',
        url: `http://${host}/api/v1/employees`
    },
    searchEmployees: {
        method: 'GET',
        url: `http://${host}/api/v1/search?dep=`
    },
    getEmployee: {
        method: 'GET',
        url: `http://${host}/api/v1/employees/`
    },
    addEmployee: {
        method: 'POST',
        url: `http://${host}/api/v1/employees`
    },
    updateEmployee: {
        method: 'PUT',
        url: `http://${host}/api/v1/employees/`
    },
    deleteEmployee: {
        method: 'DELETE',
        url: `http://${host}/api/v1/employees?eid=`
    },
    signup: {
        method: 'POST',
        url: `http://${host}/api/v1/user/signup`
    },
    login: {
        method: 'POST',
        url: `http://${host}/api/v1/user/login`
    }
};

const CFG_FRONTEND = {
    getEmployees: '/list-employees',
    getEmployee: '/view-employee',
    addEmployee: '/add-employee',
    updateEmployee: '/update-employee',
    deleteEmployee: '/delete-employee',
    signup: '/signup',
    login: '/'
};

export { CFG_BACKEND, CFG_FRONTEND };