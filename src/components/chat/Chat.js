import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { isAuth } from "../../actions/auth";
import { getProfile } from "../../actions/user";
import { User, Send } from 'react-feather';
import queryString from "query-string";
import io from 'socket.io-client';
import './chat.css';

let socket;

const Chat = ({ setLoggedIn, location }) => {
    let history = useHistory();

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [friendInfo, setFriendInfo] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:8000';

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!isAuth()) {
            setLoggedIn(false);
            history.push('/signin');
        } else {
            setLoggedIn(true);
        }

        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT, { transports : ['websocket'] });

        setName(name);
        setRoom(room);
        getFriendInfo(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getFriendInfo = (room) => {
        const usernames = room.split(' ');
        const friendUsername = usernames[0] === isAuth().username ? usernames[1] : usernames[0];

        getProfile(friendUsername)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setFriendInfo({
                        name: data.name,
                        lat: data.location.latitude,
                        lng: data.location.longitude
                    });
                }
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSend = (type) => (e) => {
        if (type === 'keypress' && e.key === 'Enter') {
            sendMessage(e);
        } else if (type === 'click') {
            sendMessage(e);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h2 className="chat-user">{ friendInfo.name } <User className={ users.filter(user => user.name === friendInfo.name).length ? "online-icon" : "offline-icon" }/></h2>
                <div className="chat-btn" onClick={ () => history.push(`/worldview/profile/list/lat=${ friendInfo.lat }&lng=${ friendInfo.lng }`) }>Leave Room</div>
            </header>
            <main className="chat-main">
                {/* <div className="chat-sidebar">
                    <h3><MessageCircle className="message-circle"/> Room Name</h3>
                    <h2 className="room-name">JavaScridsfddfdspt</h2>
                    <h3><User /> Users</h3>
                    <ul className="users">
                        <li>BradWanamaker</li>
                        <li>John</li>
                        <li>Mary</li>
                        <li>Paul</li>
                        <li>Mike</li>
                    </ul>
                </div> */}
                <div className="chat-messages">
                    { messages.map((message, i) => {
                        return (
                            <div key={ i } className={ message.user == isAuth().name ? "my-message" : "friend-message" }>
                                <p className="meta">{ message.user } | <span>{ message.time }</span></p>
                                <p className="text">{ message.text }</p>
                            </div>
                        )
                    }) }
                    <div ref={ messagesEndRef }></div>
                </div>
            </main>
            <div className="chat-form-container">
                <form className="chat-form">
                    <input
                        className="msg"
                        type="text"
                        placeholder="Enter Message"
                        value={ message }
                        onChange={ handleChange }
                        onKeyPress={ handleSend('keypress') }
                        required
                        autoComplete="off"
                    />
                    <button className="chat-btn chat-send-btn" onClick={ handleSend('click') }><Send className="message-send"/> Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;