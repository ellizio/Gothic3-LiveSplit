import React, {useEffect, useState} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass} from "swiper/types";

import Welcome from "./slides/welcome/welcome";
import Panel from "./slides/panel/panel";

import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import Generator from "./slides/generator/generator";
import ConditionComponent from "./slides/generator/elems/condition/condition-component";
import {Quest, SharedContextValues} from "./types";
import SplitComponent from "./slides/generator/elems/split/split-component";

export const SharedContext = React.createContext<SharedContextValues>(null!);

function App() {
    // Global
    const [quests, setQuests] = useState<Quest[]>([]);
    useEffect(() => {
        // TODO: read from file
        setQuests([ { id: '1', name: 'sosi' }, { id: '2', name: 'suka' } ])
    }, []);

    const [panelVisible, setPanelVisible] = useState(false);

    return (
        <SharedContext.Provider value={{ quests }}>
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
                <SwiperSlide>
                    <Generator />
                </SwiperSlide>
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
        </SharedContext.Provider>
    );
}

export default App;
