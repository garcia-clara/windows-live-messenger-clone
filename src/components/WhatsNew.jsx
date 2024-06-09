import React, { useState, useEffect } from 'react';
import divider from "/assets/general/divider.png";

const WhatsNew = () => {
    const [content, setContent] = useState(0);
    const [fadeClass, setFadeClass] = useState('fade-in');
    const messages = [
        "Find the github repository of this MSN clone <a href='https://github.com/your_repository' class='link'>here</a>!",
        "Message 2",
        "Message 3",
        "Message 4",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeClass('fade-out');
            setTimeout(() => {
                setContent((prevContent) => (prevContent + 1) % messages.length);
                setFadeClass('fade-in');
            }, 500);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='px-4 pb-11'>
            <div className="w-full"><img src={divider} alt="" /></div>
            <p className="text-[16px] pt-2 text-[#1D2F7F]">What's new</p>
            <p className={fadeClass} dangerouslySetInnerHTML={{ __html: messages[content] }} />
        </div>
    );
}

export default WhatsNew;
