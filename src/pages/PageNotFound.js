import '../asserts/css/main.css';
import pagenotfound from '../asserts/images/page-error.webp'

function PageNotFound() {
     
    return (
        <div className="container">
            <div className='row  page-section mt-5 text-center'>
                <img src={pagenotfound} className='error-image' />
            </div>

        </div>
    );
}

export default PageNotFound;
