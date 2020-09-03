class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            password: '',
            accountLabel: 'Account',
            passwordLabel: 'Password',
            error: ''
        }
        this.resetState = this.state
        this.changeState = this.changeState.bind(this)
        this.loginSubmit = this.loginSubmit.bind(this)
    }
    render() {
        return (
            <div className="loginBox" style={{ backgroundColor: "#5B5B5B" }}>

                <div className="d-flex justify-content-center " style={{ paddingBottom: "20px", paddingTop: "20px" }} >
                    <h3 className="text-white">Welcome Back!</h3>
                </div>
                <div className="form-group">
                    <label className={`${this.state.error === "accountError" ? "error" :"font"}`} >{this.state.accountLabel}</label>
                    <input name="account" type="email" className="form-control border border-dark text-white " style={{ backgroundColor: "#4F4F4F" }} value={this.state.account} onChange={this.changeState}></input>
                </div>
                <div className="form-group">
                    <label className={`${this.state.error === "passwordError" ? "error" :"font"}`}>{this.state.passwordLabel}</label>
                    <input name="password" type="password" className="form-control border border-dark text-white" style={{ backgroundColor: "#4F4F4F" }} value={this.state.password} onChange={this.changeState}></input>
                 </div>

                <div style={{ paddingTop: "20px" }}>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary text-white" style={{ width: "100%" }} onClick={this.loginSubmit} >Login</button>
                    </div>
                </div>
                <div>
                    <h6><small className="font">Don't have account? <a style={{ color:"#7D7DFF" }} href="./register">Register</a></small></h6>
                </div>
            </div>
        );
    }
    changeState(event) {
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }
    loginSubmit() {
        this.setState({ ["passwordLabel"]: this.resetState.passwordLabel, ["accountLabel"]: this.resetState.accountLabel })
        if (this.state.account === '') {
            this.setState({ ["error"]: "accountError", ["accountLabel"]: "Account-empty" })
            return
        } else if (this.state.password === '') {
            this.setState({ ["error"]: "passwordError", ["passwordLabel"]: "Password-empty" })
            return
        } 
        var xhr_login = new XMLHttpRequest()
        xhr_login.open("GET", "file/login/" + this.state.account + "/" + this.state.password);
        xhr_login.onload = function () {
            var onLoadMessage = JSON.parse(xhr_login.responseText)

            if (onLoadMessage.messageName === "login") {

                if (onLoadMessage.data === "success") {

                    location.href ='./mainPage';

                } else if (onLoadMessage.data === "account not found") {
                    
                    this.setState({ ["error"]: "accountError" })

                    this.setState({ ["accountLabel"]: "Account-not found account" })

                } else if (onLoadMessage.data === "password incorrect") {

                    this.setState({ ["error"]: "passwordError" })

                    this.setState({ ["passwordLabel"]: "Password-password incorrect" })

                }
            }
        }.bind(this)
        xhr_login.send();
    }


}

ReactDOM.render(<App />, document.getElementById('loginBox'));
