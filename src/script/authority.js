import store from '../store/index';

/* 权限-检验角色 */
function authRole(roles = []) {
    const rolCodes = store.getters.rolCodes;
    const rolesChecked = store.state.rolesChecked;

    for (const item of roles) {
        // 已校验的队列中
        if (rolesChecked.includes(item)) {
            return true;
        }
    }
    for (const item of roles) {
        if (rolCodes.includes(item)) {
            store.commit("addRolesChecked", item);
            return true;
        }
    }
    return false;
}

/* 权限-校验-资源 */
function authResource(resources = []) {
    const resCodes = store.getters.resCodes;
    const resourcessChecked = store.state.resourcessChecked;

    for (const item of resources) {
        // 已校验的队列中
        if (resourcessChecked.includes(item)) {
            return true;
        }
    }

    for (const item of resources) {
        if (resCodes.includes(item)) {
            store.commit("addResourcesChecked", item);
            return true;
        }
    }
    return false;
}


export default {
    // auth or 授权角色/资源 or
    author(roles = [], resources = []) {
        return authRole(roles) || authResource(resources);
    },
    // auth and 授权角色/资源 and
    authand(roles = [], resources = []) {
        return authRole(roles) && authResource(resources);
    },
    authres: authResource,
    authrol: authRole
}