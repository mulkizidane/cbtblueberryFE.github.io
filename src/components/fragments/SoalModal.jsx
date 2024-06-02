import RoundInput from "../elements/RoundInput";
import BlueModal from "./BlueModal";
import LgButton from "./LgButton";

const SoalModal = ({showSoal, setShowSoal}) => {
    return (
        <>
        <BlueModal title={'Bank Soal'} showModal={showSoal}>
        <form action="" className="px-6 flex flex-col gap-2 py-4">
                        <div className="flex gap-2 w-full">
                            <RoundInput title={'Kode Bank Soal'} width={'w-1/2'}/>
                            <RoundInput title={'Mata Pelajaran'} width={'w-1/2'}/>
                        </div>
                        <div className="flex gap-2 w-full">
                            <RoundInput title={'Level'} width={'w-1/2'}/>
                            <RoundInput title={'Kelas'} width={'w-1/2'}/>
                        </div>
                        <div className="flex gap-2 w-full">
                            <RoundInput title={'Tanggal Mata Ujian'} width={'w-1/2'}/>
                            <RoundInput title={'Tanggal Akhir Ujian'} width={'w-1/2'}/>
                        </div>
                        <div className="flex gap-1">
                            <RoundInput title={'Jumlah PG'}/>
                            <RoundInput title={'Bobot Soal'}/>
                            <RoundInput title={'Soal Tampil'}/>
                            <RoundInput title={'Jumlah Opsi'}/>
                        </div>
                        <div className="flex gap-1">
                            <RoundInput title={'Jumlah Essai'}/>
                            <RoundInput title={'Bobot Soal'}/>
                            <RoundInput title={'Soal Tampil'}/>
                            <RoundInput title={'KKM'}/>
                        </div>
                        <div className="flex justify-end mt-4">
                            <LgButton value={'Simpan'} onClick={() => setShowSoal(false)}/>
                        </div>
                    </form>
        </BlueModal>
        </>
    )
}

export default SoalModal;