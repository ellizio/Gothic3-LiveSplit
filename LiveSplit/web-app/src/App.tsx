import React, {useEffect, useState} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass} from "swiper/types";

import Welcome from "./slides/welcome/welcome";
import Generator from "./slides/generator/generator";

import Panel from "./slides/panel/panel";

import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import {Quest, SharedContextValues, Split, Tech} from "./types";
import {Download} from "./slides/download/download";
import {ScriptGenerator} from "./helpers/script-generator";
import {DataRetriever} from "./helpers/data-retriever";

export const SharedContext = React.createContext<SharedContextValues>(null!);

function App() {
    // Global
    const [quests, setQuests] = useState<Quest[]>([]);
    const [techs, setTechs] = useState<Tech[]>([]);
    const [scriptTemplate, setScriptTemplate] = useState<string>('');
    useEffect(() => {
        DataRetriever.retrieveQuests()
            .then(quests => setQuests(quests))
        DataRetriever.retrieveTechs()
            .then(techs => setTechs(techs))
        DataRetriever.retrieveScriptTemplate()
            .then(template => setScriptTemplate(template))
    }, []);

    // Swiper
    const [swiper, setSwiper] = useState<SwiperClass>();
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [panelVisible, setPanelVisible] = useState(false);

    const onSlideChanged = (index: number) => {
        setPanelVisible(index !== 0)
        setCurrentSlide(index)
    }

    const onHelpClicked = () => {

    }

    const onNextClicked = () => {
        switch (currentSlide) {
            case 1: // generator
                const script = new ScriptGenerator(scriptTemplate, quests).generate(splits)
                setScript(script)
                swiper?.slideNext()
                break;
            case 2: // download
                swiper?.slideNext()
                break;
        }
    }

    // Slides data
    const [splits, setSplits] = useState<Split[]>([]);
    const [script, setScript] = useState<string>('')

    return (
        <SharedContext.Provider value={{ quests, techs }}>
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
                onSwiper={(s: SwiperClass) => setSwiper(s)}
                onSlideChange={(s: SwiperClass) => onSlideChanged(s.activeIndex)}
            >
                <SwiperSlide>
                    <Welcome />
                </SwiperSlide>
                <SwiperSlide>
                    <Generator onSplitsChanged={s => setSplits(s)} />
                </SwiperSlide>
                <SwiperSlide>
                    <Download script={script} />
                    {/*<DownloadSlide.Help />*/}
                </SwiperSlide>
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
                        <Panel onHelpClick={onHelpClicked} onNextClick={onNextClicked} />
                    </div>
                }
            </Swiper>
        </SharedContext.Provider>
    );
}

export default App;
