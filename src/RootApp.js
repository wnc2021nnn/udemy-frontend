import { useSelector } from "react-redux";
import { AdminApp } from "./AdminApp";
import ClientApp from "./ClientApp";
import { Roles } from "./constants/role-constant";
import Status from "./constants/status-constants";
import { getToken } from "./utils/auth/verify";


export function RootApp(props) {
    const userInform = useSelector(state => {
        return state.user.userInform;
    });
    const isLogin = userInform.status.status === Status.SUCCESS_STATUS && getToken()

    if (!isLogin) return <ClientApp/>;

    if(userInform.user.role === Roles.ADMIN) return <AdminApp/>

    return <ClientApp/>;
}