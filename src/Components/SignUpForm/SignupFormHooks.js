import React, { useState } from "react";
import logo from "../../images/logo.svg";
import rightArrow from "../../images/right-arraow.svg";
import './Signup.scss';

const SignUpFormHooks = () => {
    const [inputFields, setInputFields] = useState({});
    const [errors, setErrors] = useState({});
    const [checkbox, setCheckbox] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleChange = (event) => {
        setInputFields(inputFields => {
            inputFields[event.target.name] = event.target.value;
            return {...inputFields};
        });
        setDisabled(event.target.value === '');
    }
    const handleCheckBox = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCheckbox(value);
    }
    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if(!inputFields["name"]) {
            formIsValid = false;
            errors["name"] = "Please enter your name";
        }
        if (typeof inputFields["email"] !== "undefined") {
            var pattern = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
            if (!pattern.test(inputFields["email"])) {
              formIsValid = false;
              errors["email"] = "Please enter valid email-ID.";
            }
        }
        if (!inputFields["password"]) {
            formIsValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (typeof inputFields["password"] !== "undefined") {
            if (!inputFields["password"].match(/^.{6,}$/)) {
              formIsValid = false;
              errors["password"] = "Password must be at least 6 characters long.";
            }
        }
        if (checkbox === false) {
            formIsValid = false;
            errors["checkbox"] = "Please check Terms and Privacy";
        }
        setErrors(errors);
        return formIsValid;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setInputFields(inputFields => {
                inputFields["name"] = "";
                inputFields["email"] = "";
                inputFields["password"] = "";
                return {...inputFields};
            });
            setCheckbox(false);
            setDisabled(true);
            alert("form submitted");
        }
    }
    
    return(
        <div className="signup-container">
            <div className="left-container">
                <div className="header-text">
                    <h1>Let's Get Started...!</h1>
                    <p>Discover the best places in the world at your fingertips!</p>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field-container">
                            <input type="text" id="name" name="name" required aria-required="true" placeholder=" " className={errors && errors.name ? 'form-input error' : 'form-input name'} value={inputFields.name || ''} onChange={handleChange} noValidate aria-labelledby="Enter your name"/>
                            <label htmlFor="name">Name</label>
                            <div className="error-msg">Please enter your name</div>
                        </div>
                        <div className="field-container">
                            <input type="email" id="email" name="email" required aria-required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder=" " className={errors && errors.email ? 'form-input error' : 'form-input email'} value={inputFields.email || ''} onChange={handleChange} noValidate aria-labelledby="Enter your Email ID"/>
                            <label htmlFor="email">Email</label>
                            <div className="error-msg">Please enter valid email-ID.</div>
                        </div>
                        <div className="field-container">
                            <input type="password" id="password" name="password" required aria-required="true" minLength="6" placeholder=" " className={errors && errors.password ? 'form-input error' : 'form-input password'} value={inputFields.password || ''} onChange={handleChange} noValidate aria-labelledby="Enter Password"/>
                            <label htmlFor="password">Password</label>
                            <div className="error-msg">Password must be at least 6 characters long.</div>
                        </div>
                        <div className="terms-checkbox">
                            <label htmlFor="subscribe" className="checkbox-label">
                                <div className="terms-label-text">I agree to the<span>Terms</span>and<span>Privacy Policy</span></div>
                                <input type="checkbox" name="checkbox" id="subscribe" className={errors && errors.checkbox ? 'form-input checkbox error' : 'form-input checkbox'} value={checkbox} checked={checkbox} onChange={handleCheckBox} noValidate/>
                                <span className="check-mark"></span>
                                <div className="error-msg">Please check Terms & Policy</div>
                            </label>
                        </div>
                        <div className="submit-container">
                            <button type="submit" disabled={disabled} tabIndex="0">SIGN UP</button>
                            <img src={rightArrow} alt="arrow"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right-container">
                <img src={logo} className="logo" alt="logo" width="72" height="60"/>
            </div>
        </div>
    )

}

export default SignUpFormHooks;