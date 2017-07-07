export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputEmail: '',
            inputPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.inputEmail.length * this.state.inputPassword.length === 0) {
            return false;
        }

        if (this.state.inputEmail === 'a@b.c' && this.state.inputPassword === 'aaa') {
            console.log();
        } else {
            setTimeout(this.clearInputs, 3000);
        }

        test(this.state);

        return true;
    }

    clearInputs() {
        console.log('rensar');

        this.setState({
            inputEmail: '',
            inputPassword: ''
        });
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading">Sign in</h2>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">E-mail address</label>
                    <input type="email" name="inputEmail" className="form-control" placeholder="E-mail address"
                           value={this.state.inputEmail} onChange={this.handleChange} required autofocus />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" name="inputPassword" className="form-control" placeholder="Password"
                           value={this.state.inputPassword} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">Sign in</button>
                </div>
            </form>
        );
    }
}
