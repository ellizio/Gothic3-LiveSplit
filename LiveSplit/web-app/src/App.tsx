import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass} from "swiper/types";

import Welcome from "./slides/welcome/welcome";
import Panel from "./slides/panel/panel";

import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';

function App() {
    const [panelVisible, setPanelVisible] = useState(false);

    return (
            <Swiper
                direction={'vertical'}
                pagination={{
                    clickable: false
                }}
                scrollbar={{
                    draggable: false
                }}
                noSwiping={false}
                noSwipingClass='swiper-slide'
                modules={[Pagination]}
                className="mySwiper"
                onSlideChange={(s: SwiperClass) => setPanelVisible(s.activeIndex !== 0)}
            >
                <SwiperSlide>
                    <Welcome/>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>

                {
                    <div className="bottom-panel"
                         slot="container-end"
                         style={{
                            visibility: panelVisible ? "visible" : "hidden",
                            opacity: panelVisible ? 1 : 0,
                            transition: "visibility 0.3s linear, opacity 0.3s linear"
                    }}>
                        <Panel/>
                    </div>
                }
            </Swiper>
    );
}

export default App;
