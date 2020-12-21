const getItem = (position, idx, defaultData, slideWidth, length) => {
    const item = {
        styles: {
            transform: `translateX(${position * slideWidth}rem)`
        },
        data: defaultData[idx].data
    }

    switch (position) {
        case length - 1:
        case length + 1:
            item.styles = { ...item.styles, filter: 'grayscale(1)' }
            break
        case length:
            break
        default:
            item.styles = { ...item.styles, opacity: 0 }
            break
    }

    return item
}

export const CarouselItems = ({ pos, idx, defaultData, slideWidth, length }) => {
    const item = getItem(pos, idx, defaultData, slideWidth, length)
    const checkMiddleImg = pos === length -1 || pos === length + 1 ? 'make-side-img-small' : '';
    const classNameSlide = `item-img-data ${checkMiddleImg}`;
    return (
        <li className='item' style={item.styles}>
            <div className={classNameSlide}>
                <img src={item.data.image} alt={item.data.title} />
            </div>
            <div className='item-data'>
                <h4>Name: {item.data.name}</h4>
                <p>Price: {item.data.price}</p>
            </div>
        </li>
    )
}