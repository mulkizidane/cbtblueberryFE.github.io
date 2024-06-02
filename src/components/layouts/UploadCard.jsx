/* eslint-disable react/prop-types */
import InputFile from "../elements/InputFile"
import LgButton from "../fragments/LgButton"
import TextArea from "../fragments/TextArea"

const UploadCard = ({length}) => {
    return (
        <div className="py-4 px-4 bg-primary w-[70%] shadow-soft rounded-xl">
                    <div className="flex flex-wrap gap-1 w-full">
                        {
                            Array.from({length: length}).map((_, index) => (
                                <div key={index} className="bg-btn text-xs text-white px-2 py-0.5">
                                    {index + 1}
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-4">
                        <TextArea rows={'6'}/>
                    </div>
                    <div className="my-4">
                        <InputFile label={'Gambar'}/>
                    </div>
                    <div className="flex justify-end">
                        <LgButton value={'Simpan'}/>
                    </div>
                </div>
    )
}

export default UploadCard;