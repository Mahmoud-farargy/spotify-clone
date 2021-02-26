import React,{Fragment, useContext} from "react";
import logo from "../../Assets/spotify2019-830x350.jpg";
import "./Login.css";
import {loginURL} from "../../Config/spotify";
import {AppContext} from "../../Context";

const Login =(props)=>{ //Login page
    const context = useContext(AppContext);
    const {test} = context;
    return(
        <Fragment>
            <div className="login__page ">
                    {/* logo img */}
                <img src={logo} alt="logo" />
                    {/* login button */}
                <a href={loginURL} className="primary_btn">login with spotify</a>
            </div>
            
        </Fragment>
    )
}
export default Login;