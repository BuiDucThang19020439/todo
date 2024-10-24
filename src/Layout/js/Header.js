import '../css/Header.css';
import Button from 'react-bootstrap/Button'

export default function Header ({showLoginForm, showSignUpForm}) {
    return (
        <div className="header">
            <div className='button-list'>
                <Button onClick={showLoginForm}>Đăng Nhập</Button>
                <Button onClick={showSignUpForm}>Đăng Ký</Button>
            </div>
        </div>
    );
}
