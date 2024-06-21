/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import RoundInput from "../elements/RoundInput";
import BlueModal from "./BlueModal";
import LgButton from "./LgButton";
import Select from "../elements/Select";
import axios from "axios";

const SoalModal = ({showSoal, setShowSoal}) => {
    const [newData, setNewData] = useState({
        exam_code: 0,
        finalExamId: 0,
        subject: '',
        level: 0,
        class: '',
        start_exam: '',
        end_exam: '',
        total_multiple_choices: 0,
        mc_weight: 0,
        mc_display_question: 0,
        total_opt: 0,
        total_essay: 0,
        essay_weight: 0,
        essay_display_question: 0,
        passing_score: 0,
    })


    const handleSaveData = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/exam', newData)
            alert(response.data.msg)
        } catch (error) {
            console.log(error)
            alert(error.response.data.msg)
        }
    }

    return (
        <>
        <BlueModal title={'Bank Soal'} showModal={showSoal}>
        <form action="" className="px-6 flex flex-col gap-2 py-4">
                        <div className="flex gap-2 w-full">
                            <RoundInput 
                            title={'Kode Bank Soal'} 
                            width={'w-1/2'}
                            onChange={(e) => setNewData({...newData, exam_code: Number(e.target.value), finalExamId: Number(e.target.value)})}
                            />
                            <RoundInput 
                            title={'Mata Pelajaran'} 
                            width={'w-1/2'}
                            onChange={(e) => setNewData({...newData, subject: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-2 w-full">
                            <RoundInput 
                            title={'Level'} 
                            width={'w-1/2'}
                            onChange={(e) => setNewData({...newData, level: Number(e.target.value)})}
                            />
                            <Select width={'w-1/2'} name={'Kelas'} onChange={(e) => setNewData({...newData, class: e.target.value})}>
                                <option hidden value=""></option>
                                <option value="S-1">S-1</option>
                                <option value="S-2">S-2</option>
                                <option value="S-3">S-3</option>
                            </Select>
                        </div>
                        <div className="flex gap-2 w-full">
                            <RoundInput 
                            title={'Tanggal Mata Ujian'} 
                            width={'w-1/2'}
                            type={'date'}
                            onChange={(e) => setNewData({...newData, start_exam: e.target.value})}
                            />
                            <RoundInput 
                            title={'Tanggal Akhir Ujian'} 
                            type={'date'} 
                            width={'w-1/2'}
                            onChange={(e) => setNewData({...newData, end_exam: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-1">
                            <RoundInput 
                            title={'Jumlah PG'}
                            onChange={(e) => setNewData({...newData, total_multiple_choices: e.target.value})}
                            />
                            <RoundInput 
                            title={'Bobot Soal'}
                            onChange={(e) => setNewData({...newData, mc_weight: e.target.value})}
                            />
                            <RoundInput 
                            title={'Soal Tampil'}
                            onChange={(e) => setNewData({...newData, mc_display_question: e.target.value})}
                            />
                            <Select name={'Jumlah Opsi'} onChange={(e) => setNewData({...newData, total_opt: e.target.value})}>
                                <option hidden value=""></option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Select>
                        </div>
                        <div className="flex gap-1">
                            <RoundInput 
                            title={'Jumlah Essai'}
                            onChange={(e) => setNewData({...newData, total_essay: e.target.value})}
                            />
                            <RoundInput 
                            title={'Bobot Soal'}
                            onChange={(e) => setNewData({...newData, essay_weight: e.target.value})}
                            />
                            <RoundInput 
                            title={'Soal Tampil'}
                            onChange={(e) => setNewData({...newData, essay_display_question: e.target.value})}
                            />
                            <RoundInput 
                            title={'KKM'}
                            onChange={(e) => setNewData({...newData, passing_score: e.target.value})}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <LgButton 
                            value={'Simpan'} 
                            onClick={handleSaveData}
                            />
                        </div>
                    </form>
        </BlueModal>
        </>
    )
}

export default SoalModal;