import './ChatOnline.css';

export default function ChatOnline(){
    return(
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img className='chatOnlineImg' src="../../../assets/images/john.webp" alt=""/>
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>John Doe</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img className='chatOnlineImg' src="../../../assets/images/john.webp" alt=""/>
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>John Doe</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img className='chatOnlineImg' src="../../../assets/images/john.webp" alt=""/>
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>John Doe</span>
            </div>
        </div>
    )
}