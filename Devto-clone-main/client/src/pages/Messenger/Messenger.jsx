import ChatOnline from "./Components/ChatOnline/ChatOnline"
import Conversation from "./Components/Conversations/Conversations"
import Message from "./Components/Message/Message"
import "./Messenger.css"

export default function Messenger(){
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                </div>
            </div>
            <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                </div>
                <div className="chatBoxBottom">
                    <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                    <button className="chatSubmitButton">Send</button>
                </div>
            </div>
            </div>
            <div className="chatOnline">
            <div className="chatOnlineWrapper"><ChatOnline/></div>
            </div>
        </div>
    )
}