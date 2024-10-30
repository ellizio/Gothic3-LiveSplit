import React from "react";

import { Button } from 'primereact/button';

import { useSwiper } from "swiper/react";

import {MANUAL_URL} from "../../consts";

import "./style.css"

function Welcome() {
    const swiper = useSwiper();

    const onManualButtonClicked = () => {
        const newWindow = window.open(MANUAL_URL, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <p className="text-8xl font-bold mb-5">
                Gothic 3 LiveSplit generator
            </p>
            <p className="text-l text-gray-600 mb-8">
                ver. 1.0.0
            </p>
            <div className='flex justify-content-center gap-8'>
                <Button className="wide-button"
                        icon="pi pi-info-circle"
                        label="Manual"
                        onClick={onManualButtonClicked} />
                <Button className="wide-button"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        label="Start"
                        onClick={() => swiper.slideNext()} />
            </div>
        </div>
    );
}

export default Welcome;