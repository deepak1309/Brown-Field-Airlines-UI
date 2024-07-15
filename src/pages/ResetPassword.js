import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function ResetPassword() {
        const params = useParams();
        const email = params.email
        console.log(email);
        const navigate = useNavigate();

        const checkEmail = () => {
            navigate('/login');
                  
            
        };

    return (
        <div className="container ">
            <div className='row  fp-section'>
                <div className='col-12'>
                    <p className='section-title'>Reset Password</p>
                    <form className="col-12 mb-4" >
                        <p className='reset-warn text-center'>You're currently changing password for <strong> {decodeURIComponent(email)}</strong></p>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter New Password" />
                        <input type="email" class="form-control mt-4" id="exampleFormControlInput1" placeholder="Confirm Your New Password" />
                        <button type="button" class="app-btn reset-btn" onClick={checkEmail} >Change Password</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default ResetPassword;
