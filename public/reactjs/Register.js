class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            repeatPassword: '',
            accountLabel: 'Account',
            passwordLabel: 'Password',
            repeatPasswordLabel: 'Repeat password',
            error: ''
        };
        this.resetState = this.state;
        this.changeState = this.changeState.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }

    render() {
        return /*#__PURE__*/React.createElement("div", {
            className: "loginBox",
            style: {
                backgroundColor: "#5B5B5B"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "d-flex justify-content-center ",
            style: {
                paddingBottom: "20px",
                paddingTop: "20px"
            }
        }, /*#__PURE__*/React.createElement("h3", {
            className: "text-white"
        }, "Create your account")), /*#__PURE__*/React.createElement("div", {
            className: "form-group"
        }, /*#__PURE__*/React.createElement("label", {
            className: ` ${this.state.error === "accountError" ? "error" : "font"}`
        }, this.state.accountLabel), /*#__PURE__*/React.createElement("input", {
            name: "account",
            type: "email",
            className: "form-control border border-dark text-white",
            style: {
                backgroundColor: "#4F4F4F"
            },
            value: this.state.account,
            onChange: this.changeState
        })), /*#__PURE__*/React.createElement("div", {
            className: "form-group"
        }, /*#__PURE__*/React.createElement("label", {
            className: ` ${this.state.error === "passwordError" ? "error" : "font"}`
        }, this.state.passwordLabel), /*#__PURE__*/React.createElement("input", {
            name: "password",
            type: "password",
            className: "form-control border border-dark text-white",
            style: {
                backgroundColor: "#4F4F4F"
            },
            value: this.state.password,
            onChange: this.changeState
        })), /*#__PURE__*/React.createElement("div", {
            className: "form-group"
        }, /*#__PURE__*/React.createElement("label", {
            className: ` ${this.state.error === "repeatPasswordError" ? "error" : "font"}`
        }, this.state.repeatPasswordLabel), /*#__PURE__*/React.createElement("input", {
            name: "repeatPassword",
            type: "password",
            className: "form-control border border-dark text-white",
            style: {
                backgroundColor: "#4F4F4F"
            },
            value: this.state.repeatPassword,
            onChange: this.changeState
        })), /*#__PURE__*/React.createElement("div", {
            style: {
                paddingTop: "20px"
            }
        }, /*#__PURE__*/React.createElement("div", {
            className: "d-flex justify-content-center"
        }, /*#__PURE__*/React.createElement("button", {
            className: "btn btn-primary text-white",
            style: {
                width: "100%"
            },
            onClick: this.registerSubmit
        }, "Register"))), /*#__PURE__*/React.createElement("h6", null, /*#__PURE__*/React.createElement("small", {
            className: "font"
        }, "Have account?", /*#__PURE__*/React.createElement("a", {
            style: {
                color: "#7D7DFF"
            },
            href: "./login"
        }, "Login"))));
    }

    changeState(event) {
        let changeName = event.target.name;
        this.setState({
            [changeName]: event.target.value
        });
    }

    registerSubmit() {
        this.setState({
            ["passwordLabel"]: this.resetState.passwordLabel,
            ["accountLabel"]: this.resetState.accountLabel,
            ["repeatPasswordLabel"]: this.resetState.repeatPasswordLabel
        });

        if (this.state.account === '') {
            this.setState({
                ["error"]: "accountError",
                ["accountLabel"]: "Account-empty"
            });
            return;
        } else if (this.state.password === '') {
            this.setState({
                ["error"]: "passwordError",
                ["passwordLabel"]: "Password-empty"
            });
            return;
        } else if (this.state.repeatPassword === '') {
            this.setState({
                ["error"]: "repeatPasswordError",
                ["repeatPasswordLabel"]: "Repeat password-empty"
            });
            return;
        } else if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                ["error"]: "repeatPasswordError"
            });
            this.setState({
                ["repeatPasswordLabel"]: "Repeat password-password must the same"
            });
            return;
        }

        var xhr_register = new XMLHttpRequest();
        xhr_register.open("POST", "file/register/" + this.state.account + "/" + this.state.password);

        xhr_register.onload = function () {
            var onLoadMessage = JSON.parse(xhr_register.responseText);
            console.log(onLoadMessage);

            if (onLoadMessage.messageName === "register") {
                if (onLoadMessage.data === "success") {
                    location.href = './login';
                } else if (onLoadMessage.data === "account exist") {
                    this.setState({
                        ["error"]: "accountError"
                    });
                    this.setState({
                        ["accountLabel"]: "Account-account exist"
                    });
                }
            }
        }.bind(this);

        xhr_register.send();
    }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('loginBox'));