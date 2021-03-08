import React, {useState, useEffect, useRef} from 'react'

export default function FlashCard({element}) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('init');
    const frontSide = useRef();
    const backSide = useRef();

    const setMaxHeight = () => {
        const frontHeight = frontSide.current.getBoundingClientRect().height;
        const backHeight = backSide.current.getBoundingClientRect().height;

        const height = Math.max(frontHeight, backHeight, 100);

        setHeight(height);
    }

    useEffect(() => {
        setMaxHeight();
    }, [element.question,element.answer,element.options]);
    useEffect(() => {
        window.addEventListener(('resize'), setMaxHeight);
        return () => window.removeEventListener('resize',setMaxHeight);
    },[]);

    return (
        <div
            className={`card ${flip ? "fliped" : ""}`}
            style={{height: height}}
            onClick={() => {setFlip(!flip)}}
        >
                <div className="frontSide" ref={frontSide}>
                    <h1>{element.question}</h1>
                    <div className="flashCardOptions">
                        {element.options.map(option => {
                            return <p className="flashCardOption" key={option}>{option}</p>
                        })}
                    </div>
                </div>
                <div className="backSide" ref={backSide}>
                    {element.answer}
                </div>
        </div>
    )
}
