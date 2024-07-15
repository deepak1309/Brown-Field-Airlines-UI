import '../App.css';
import { useState } from 'react';
import emailData from '../../src/asserts/json/user.json'
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {


    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const checkEmail = () => {
        const encoded = encodeURIComponent(email);
        if (emailData.emails.includes(email)) {
            navigate(`/resetPassword/${encoded}`);
              } 
        else {
            setMessage(`Email ${email} does not exist. Please register to reset password`);
        }
    };

    return (
        <div className="container ">
            <div className='row mt-5 fp-section'>
                <div className='col-12'>
                    <p className='section-title'>Forgot Password</p>
                    <form className="col-12 mb-4" >
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your registered email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <p className='error-message'>{message}</p>
                        <button type="button" class="app-btn reset-btn" onClick={checkEmail}>Reset Password</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;
