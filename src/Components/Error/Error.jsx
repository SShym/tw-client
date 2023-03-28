import './Error.scss';

const Error = () => {
    return(
        <div className='error-wrap'>
            <div class="top">
                <h1 className="error-404">404</h1>
                <h3 className="page-not-found">page not found</h3>
            </div>
            <div class="container">
                <div class="ghost-copy">
                    <div class="one"></div>
                    <div class="two"></div>
                    <div class="three"></div>
                    <div class="four"></div>
                </div>
                <div class="ghost">
                    <div class="face">
                    <div class="eye"></div>
                    <div class="eye-right"></div>
                    <div class="mouth"></div>
                    </div>
                </div>
                <div class="shadow"></div>
            </div>
        </div>
    )
}

export default Error;