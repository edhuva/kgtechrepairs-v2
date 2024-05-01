import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

//use authorization hook
const useAuth = () => {

    //get current token 
    const token = useSelector(selectCurrentToken);

    let isAdmin = false;
    let isManager = false;
    let isEmployee  = false;
    let isCustomer = false;
    let status = 'User';
    const defaultPlaceHolder = 'Not Yet';

    //if token decode 
    if (token) {
        const decoded = jwtDecode(token);
        const { userid, username, roles, authRistrictLevel } = decoded.userInfo;

        isCustomer = roles.includes('Customer');
        isEmployee = roles.includes('Employee');
        isManager = roles.includes('Manager');
        isAdmin = roles.includes('Admin');

        if (isCustomer) status = 'Customer';
        if (isEmployee) status = 'Employee';
        if (isManager) status = 'Manager';
        if (isAdmin) status = 'Admin';

        return { userid, username, roles, authRistrictLevel, status, isCustomer, isEmployee, isManager, isAdmin, defaultPlaceHolder }

    }

    //if not token return
    return { userid: '', username: '', roles: [], authRistrictLevel: '', status, isCustomer, isEmployee, isManager, isAdmin, defaultPlaceHolder }
}

export default useAuth
