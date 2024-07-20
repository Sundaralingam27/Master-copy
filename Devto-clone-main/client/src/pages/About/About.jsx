import './About.css'
import tw, { styled } from 'twin.macro';

export default function About() {
    return (
       <div className='about-container'>
         <h1>
            About Dev
        </h1>
        <img className="about-image" src='../../../assets/images/about.jpg' alt=''/>
        <p>DEV Community is a dynamic space where developers from all backgrounds come together to share insights, stay informed, and advance their careers. Our platform fosters collaboration and learning, offering valuable resources and a supportive network to help coders grow professionally. We are dedicated to creating a thriving environment where developers can connect, innovate, and succeed.</p>
       </div>
    )
}
