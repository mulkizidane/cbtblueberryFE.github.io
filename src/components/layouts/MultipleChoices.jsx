/* eslint-disable react/prop-types */
import { useState } from "react";
import ExamChoice from "../elements/ExamChoice"

const MultipleChoices = ({option, soal}) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    return (
        <div className="px-10 pt-6 pb-10">
            <h1>{soal.pertanyaan}</h1>
            <div className="flex flex-col gap-2 mt-4">
                {
                    option.map((dt, index) => (
                        <ExamChoice
                        key={index}
                        choice={`${dt.opsi}. ${dt.value}`}
                        isSelected={selectedOptionIndex === index}
                        onClick={() => setSelectedOptionIndex(index)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MultipleChoices;