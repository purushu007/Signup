import React, { Component } from "react";
import logo from "../../images/logo.svg";
import rightArrow from "../../images/right-arraow.svg";
import './Signup.scss';

export default class SignUpForm extends Component {
    constructor(){
        super();
        this.state ={
            inputFields: {},
            errors: {},
            checkbox: false,
            disabled: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }
    handleChange(event) {
        let inputFields = this.state.inputFields;
        inputFields[event.target.name] = event.target.value;
        this.setState({inputFields, disabled: event.target.value === ''});
    }
    handleCheckBox(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            let inputFields = {};
            inputFields["name"] = "";
            inputFields["email"] = "";
            inputFields["password"] = "";
            this.setState({inputFields: inputFields, checkbox: false, disabled: true});
            alert("form submitted");
        }
    }
    validateForm() {
        let inputFields = this.state.inputFields;
        let checkbox = this.state.checkbox;
        let errors = {};
        let formIsValid = true;

        if(!inputFields["name"]) {
            formIsValid = false;
            errors["name"] = "Please enter your name";
        }
        if (!inputFields["email"]) {
            formIsValid = false;
            errors["email"] = "Please enter your email-ID.";
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
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render(){
        return(
            <div className="signup-container">
                <div className="left-container">
                    <div className="header-text">
                        <h1>Let's Get Started...!</h1>
                        <p>Discover the best places in the world at your fingertips!</p>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="field-container">
                                <input type="text" id="name" name="name" required aria-required="true" placeholder=" " className={this.state.errors && this.state.errors.name ? 'form-input error' : 'form-input name'} value={this.state.inputFields.name || ''} onChange={this.handleChange} noValidate aria-labelledby="Enter your name"/>
                                <label htmlFor="name">Name</label>
                                <div className="error-msg">Please enter your name</div>
                            </div>
                            <div className="field-container">
                                <input type="email" id="email" name="email" required aria-required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder=" " className={this.state.errors && this.state.errors.email ? 'form-input error' : 'form-input email'} value={this.state.inputFields.email || ''} onChange={this.handleChange} noValidate aria-labelledby="Enter your Email ID"/>
                                <label htmlFor="email">Email</label>
                                <div className="error-msg">Please enter valid email-ID.</div>
                            </div>
                            <div className="field-container">
                                <input type="password" id="password" name="password" required aria-required="true" minLength="6" placeholder=" " className={this.state.errors && this.state.errors.password ? 'form-input error' : 'form-input password'} value={this.state.inputFields.password || ''} onChange={this.handleChange} noValidate aria-labelledby="Enter Password"/>
                                <label htmlFor="password">Password</label>
                                <div className="error-msg">Password must be at least 6 characters long.</div>
                            </div>
                            <div className="terms-checkbox">
                                <label htmlFor="subscribe" className="checkbox-label">
                                    <div className="terms-label-text">I agree to the<span>Terms</span>and<span>Privacy Policy</span></div>
                                    <input type="checkbox" name="checkbox" id="subscribe" className={this.state.errors && this.state.errors.checkbox ? 'form-input checkbox error' : 'form-input checkbox'} value={this.state.checkbox} checked={this.state.checkbox} onChange={this.handleCheckBox} noValidate/>
                                    <span className="check-mark"></span>
                                    <div className="error-msg">Please check Terms & Policy</div>
                                </label>
                            </div>
                            <div className="submit-container">
                                <button type="submit" disabled={this.state.disabled} tabIndex="0">SIGN UP</button>
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
}