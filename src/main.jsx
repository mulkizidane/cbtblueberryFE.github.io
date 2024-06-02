import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import SiswaLoginPage from './pages/siswaLogin.jsx'
import DashboardSiswaPage from './pages/dashboardSiswa.jsx'
import ExamPage from './pages/exam.jsx'
import JadwalUjianPage from './pages/jadwalUjian.jsx'
import ExamResult from './pages/examResult.jsx'
import ExamResultDetail from './pages/examResultDetail.jsx'
import AnnouncementPage from './pages/announcement.jsx'
import DataMasterPage from './pages/dataMaster.jsx'
import ManageUser from './pages/manageUser.jsx'
import ParticipantStatusPage from './pages/participantStatus.jsx'
import BankSoalPage from './pages/bankSoal.jsx'
import AdminSoalPage from './pages/adminSoal.jsx'
import UploadSoal from './pages/uploadSoal.jsx'
import ExtraFilePage from './pages/extraFile.jsx'
import MenuUjian from './pages/MenuUjian.jsx'
import HasilNilaiPage from './pages/hasilNilai.jsx'
import CetakDataPage from './pages/cetakData.jsx'
import PengaturanPage from './pages/pengaturan.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SiswaLoginPage/>}/>
      <Route path='/login' exact element={<LoginPage/>}/>
      <Route path='/:userId/dashboard' element={<DashboardSiswaPage/>}/>
      <Route path='/:userId/dashboard/ujian' element={<ExamPage/>}/>
      <Route path='/:userId/jadwal-ujian' element={<JadwalUjianPage/>}/>
      <Route path='/:userId/hasil-ujian' element={<ExamResult/>}/>
      <Route path='/:userId/hasil-ujian/:examId' element={<ExamResultDetail/>}/>
      <Route path='/:userId/pengumuman' element={<AnnouncementPage/>}/>
      <Route path='/:userId/data-master/:masterId' element={<DataMasterPage/>}/>
      <Route path='/:userId/manage-user/:manageId' element={<ManageUser/>}/>
      <Route path='/:userId/status-siswa' element={<ParticipantStatusPage/>}/>
      <Route path='/:userId/bank-soal/daftar-soal' element={<BankSoalPage/>}/>
      <Route path='/:userId/bank-soal/daftar-soal/:soalId' element={<AdminSoalPage/>}/>
      <Route path='/:userId/bank-soal/daftar-soal/:soalId/:uploadId' element={<UploadSoal/>}/>
      <Route path='/:userId/bank-soal/file-pendukung' element={<ExtraFilePage/>}/>
      <Route path='/:userId/menu-ujian' element={<MenuUjian/>}/>
      <Route path='/:userId/hasil-nilai' element={<HasilNilaiPage/>}/>
      <Route path='/:userId/cetak-data/:cetakId' element={<CetakDataPage/>}/>
      <Route path='/:userId/pengaturan' element={<PengaturanPage/>}/>
      <Route path='/:userId/bank-soal' element={<BankSoalPage/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
