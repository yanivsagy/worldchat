import { Link ,  BrowserRouter as Router} from 'react-router-dom';
import { isAuth } from '../../actions/auth';
import "./profileMenu.css";

const ProfileMenu = () => {
    return (
        <div className="profile-menu-container">
            <ul className="profile-menu-list border border-light rounded">
                <Link className="profile-menu-link" to={ `/profile/edit/about` }>
                    <li className="menu-bullet">Edit About You</li>
                </Link>
                <hr/>
                <Link className="profile-menu-link" to={ `/profile/edit/location` }>
                    <li className="menu-bullet">Edit Location</li>
                </Link>
                <hr/>
                <Link className="profile-menu-link" to={ `/profile/edit/photo` }>
                    <li className="menu-bullet">Edit Profile Photo</li>
                </Link>
            </ul>
        </div>
    );
};

export default ProfileMenu;