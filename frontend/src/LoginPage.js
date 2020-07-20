import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <div className="jumbotron-header jumbotron-fluid row">
                <div className="container col-6">
                    <h1 className="title display-4">GAMERS</h1>
                </div>

                <div className="col-6">
                    <form>
                        <div className="form-row align-items-center">
                            <div className="col-auto">
                                <label for="inlineFormInput">Email</label>
                                <input type="text" className="form-control mb-2" id="inlineFormInput"/>
                            </div>

                            <div className="col-auto">
                                <label for="inlineFormInputGroup">Password</label>
                                <input type="text" className="form-control mb-2" id="inlineFormInputGroup"/>
                            </div>

                            <div className="col-auto">
                                <button type="submit" className="btn btn-login mb-2">Login</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
