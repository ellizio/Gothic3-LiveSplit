import React, {useEffect, useState} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass} from "swiper/types";

import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

import Welcome from "./slides/welcome/welcome";
import Generator from "./slides/generator/generator";
import Panel from "./slides/panel/panel";

import 'swiper/css';
import './App.css';
import "primereact/resources/themes/lara-light-amber/theme.css";
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";

import {ScriptGenerator} from "./helpers/script-generator";
import {SplitsGenerator} from "./helpers/splits-generator";
import {DataRetriever} from "./helpers/data-retriever";
import {Downloader} from "./helpers/downloader";

import {Quest, SharedContextValues, Split} from "./types";
import {HELPER_FILENAME, QUEST, SCRIPT_FILENAME, SPLITS_FILENAME} from "./consts";

export const SharedContext = React.createContext<SharedContextValues>(null!);

function App() {
    // Global
    const [quests, setQuests] = useState<Quest[]>([]);
    const [scriptTemplate, setScriptTemplate] = useState<string>('');
    const [splitsTemplate, setSplitsTemplate] = useState<string>('');
    useEffect(() => {
        DataRetriever.retrieveQuests()
            .then(quests => setQuests(quests))
        DataRetriever.retrieveScriptTemplate()
            .then(template => setScriptTemplate(template))
        DataRetriever.retrieveSplitsTemplate()
            .then(template => setSplitsTemplate(template))
    }, []);

    // Swiper
    const [panelVisible, setPanelVisible] = useState(false);

    const onSlideChanged = (index: number) => setPanelVisible(index !== 0)

    const onGenerateClicked = () => {
        // TODO: validate splits

        setModalVisible(true)
    }

    // Modal
    const [modalVisible, setModalVisible] = useState(false);

    // Generator
    const [splits, setSplits] = useState<Split[]>([]);
    const [generateEnabled, setGenerateEnabled] = useState<boolean>(false);

    const onSplitsChanged = (splits: Split[]) => {
        setSplits(splits)

        const valid = !splits.some(s => s.conditions.some(c => c.type === '' || (c.type === QUEST && !c.value)))
        console.log(valid)
        console.log(splits)
        setGenerateEnabled(valid)
    }

    // Downloading
    const [splitsValid, setSplitsValid] = useState(false);

    const onDownloadScriptClicked = () => {
        const scriptText = new ScriptGenerator(scriptTemplate, quests).generate(splits)
        Downloader.downloadScript(scriptText)
    }

    const onDownloadHelperClicked = () => Downloader.downloadHelper()

    const onDownloadSplitsClicked = () => {
        const splitsText = new SplitsGenerator(splitsTemplate).generate(splits)
        Downloader.downloadSplits(splitsText)
    }

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
                className="mySwiper"
                onSlideChange={(s: SwiperClass) => onSlideChanged(s.activeIndex)}
            >
                <SwiperSlide>
                    <Welcome />
                </SwiperSlide>
                <SwiperSlide>
                    <Generator onSplitsChanged={onSplitsChanged} />
                </SwiperSlide>
                {
                    <div className="bottom-panel"
                         slot="container-end"
                         style={{
                            visibility: panelVisible ? "visible" : "hidden",
                            opacity: panelVisible ? 1 : 0,
                            transition: "visibility 0.3s linear, opacity 0.3s linear"
                    }}>
                        <Panel generateEnabled={generateEnabled}
                               onGenerateClick={onGenerateClicked} />
                    </div>
                }
            </Swiper>
            <Dialog visible={modalVisible}
                    position='bottom'
                    draggable={false}
                    onHide={() => setModalVisible(false)} >
                <div className='flex gap-8'>
                    <Button
                        icon="pi pi-download"
                        onClick={onDownloadScriptClicked}
                    >
                        <div className='ml-3'>
                            <p className='p-button-label p-c m-0'>Download script</p>
                            <p className='text-xs m-0'>{SCRIPT_FILENAME}</p>
                        </div>
                    </Button>
                    <Button
                        icon="pi pi-download"
                        onClick={onDownloadHelperClicked}
                    >
                        <div className='ml-3'>
                            <p className='p-button-label p-c m-0'>Download helper</p>
                            <p className='text-xs m-0'>{HELPER_FILENAME}</p>
                        </div>
                    </Button>
                    <Button
                        icon="pi pi-download"
                        disabled={!splitsValid}
                        onClick={onDownloadSplitsClicked}
                    >
                        <div className='ml-3'>
                            <p className='p-button-label p-c m-0'>Download splits</p>
                            <p className='text-xs m-0'>{SPLITS_FILENAME}</p>
                        </div>
                    </Button>
                </div>
            </Dialog>
        </SharedContext.Provider>
    );
}

export default App;
