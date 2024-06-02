import { useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Time from "../components/elements/Time";
import DateComponent from "../components/elements/Date";
import UploadCard from "../components/layouts/UploadCard";
import ChoicesCard from "../components/fragments/ChoicesCard";
import { useState } from "react";

const UploadSoal = () => {
    const {uploadId} = useParams()
    const [isChosen, setIsChosen] = useState('')
    const choices = [
        {"name": "A"},
        {"name": "B"},
        {"name": "C"},
        {"name": "D"},
    ]

    function handleSetChoice(ch){
        setIsChosen(ch)
    }

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="flex justify-end gap-2 w-full py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-2">
                    <UploadCard length={uploadId == 'upload-pg' ? 40 : 10}/>
                    <div className={`${uploadId == 'upload-pg' ? 'flex' : 'hidden'} flex-col w-[40%] gap-2`}>
                        {
                            choices.map((ch, i) => (
                                <ChoicesCard 
                                key={i}
                                choice={ch.name}
                                onClick={() => handleSetChoice(ch.name)}
                                isChosen={isChosen}
                                />

                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default UploadSoal;