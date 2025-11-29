import { useContext } from "react";

import { AuthenticatorContext } from "../../contexts/Authenticator";

import Private from "../private";
import Public from "../public";


const Root = () => {
    const { isAuthenticated, loading} = useContext(AuthenticatorContext);

    if (loading) {
    return <div>Loading...</div>;
    }

    return (
        <>
            {isAuthenticated ? <Private /> : <Public />}
        </>
    )
}

export default Root;