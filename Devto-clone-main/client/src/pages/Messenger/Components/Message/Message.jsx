import './Message.css';

export default function Message({own}){
    return(
        <div className={own?'message':'message own'}>
            <div className='messageTop'>
                <img className="messageImg" src='../../../assets/images/john.webp' alt=''/>
                <p className='messageText'> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className='messageBottom'>
                1 hour ago
            </div>
        </div>
    )
}