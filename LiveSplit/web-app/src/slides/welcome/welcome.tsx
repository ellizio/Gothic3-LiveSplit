import React from "react";

import { Button } from 'primereact/button';

import { useSwiper } from "swiper/react";

import "primereact/resources/themes/lara-light-amber/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./style.css"

function Welcome() {
    const swiper = useSwiper();

    return (
        <div>
            <p className="text-8xl font-bold mb-5">
                Gothic 3 LiveSplit generator
            </p>
            <p className="text-l text-gray-600 mb-8">
                ver. 1.0.0
            </p>
            <Button className="wide-button" onClick={() => swiper.slideNext()} label="START" />
        </div>
    );
}

export default Welcome;