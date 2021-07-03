import classes from "./SignButton.module.css";

export default function SignButton(){


    return <div className={classes.wrapper}>
        <a href="/login">Log in</a> / 
        <a href="/register">Sign up</a>
    </div>
}