import React from "react";
import './Carousel.scss';
import { data, slideWidth } from "./Constant";
import { CarouselItems } from "./CarouselItems";


let defaultData = JSON.parse(JSON.stringify(data.cars));

let length = defaultData.length
defaultData.push(...defaultData)


const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const keys = Array.from(Array(defaultData.length).keys())

const Carousel = () => {
    const [items, setItems] = React.useState(keys)
    const [isTicking, setIsTicking] = React.useState(false)
    const itemLength = items.length

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map((_, i) => prev[(i + jump) % itemLength])
            })
        }
    }

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => {
                return prev.map(
                    (_, i) => prev[(i - jump + itemLength) % itemLength]
                )
            })
        }
    }

    const handleCategory = cat => {
        let itm = JSON.parse(JSON.stringify(data[cat]));
        defaultData = itm
        length = defaultData.length
        defaultData.push(...defaultData)
        setItems(Array.from(Array(itm.length).keys()));
    }
    const handleReset = () => {   
        let itm = JSON.parse(JSON.stringify(data.cars));
        document.getElementById('fruit').checked = false;
        document.getElementById('veg').checked = false;
        defaultData = itm
        length = defaultData.length
        defaultData.push(...defaultData)
        setItems(Array.from(Array(itm.length).keys()));
    }

    React.useEffect(() => {
        if (isTicking) wait(600).then(() => setIsTicking(false))
    }, [isTicking])

    return (
        <>
        <div >
            <div>
                Filter by category:
            </div>
            <input type='radio' name='cat' id='fruit' onClick={()=> handleCategory('fruit')} /> Fruit
            <input type='radio' name='cat' id='veg' onClick={()=> handleCategory('veg')} /> Vegetable
            <br />
            <div>
                <button onClick={()=> handleReset()}>Reset To Cars</button>
            </div>
                
        </div>
        <div className='item-body'>
            <div className='item-body-data'>
                <button
                    className='item-btn item-btn-back'
                    onClick={() => prevClick()}>
                    <i className='arrow arrow-left' />
                </button>
                <div className='item-container'>
                    <ul className='item-list'>
                        {items.map((pos, i) => (
                            <CarouselItems
                                key={i}
                                idx={i}
                                pos={pos}
                                defaultData={defaultData}
                                slideWidth={slideWidth}
                                length={length}
                            />
                        ))}
                    </ul>
                </div>
                <button
                    className='item-btn item-btn-next'
                    onClick={() => nextClick()}>
                    <i className='arrow arrow-right' />
                </button>
            </div>            
        </div>
        </>        
    )
}
 
export default Carousel;