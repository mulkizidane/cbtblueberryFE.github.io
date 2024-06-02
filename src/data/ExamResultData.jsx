const ExamResultData = [
    {
        "no": 1,
        "test_code": 10120101,
        "room_code": 101,
        "pengawas": "PENGAWAS 1",
        "test_date": "2024-05-22 02:00",
        "siswa": {
            "nis": 2401001,
            "name": "Test siswa 1",
            "kelas": 12,
            "matpel": "Matematika",
            "exam_name": "Simulasi ujian berbasis CBT",
            "is_lulus" : "tidak lulus",
            "grade": "12",
            "soal_pg": [
                        {
                            "text": "Persamaan parabola yang berpuncak pada titik (3, -2) dan fokusnya (5, -2) adalah ....",
                            "is_success": true
                        },
                        {
                            "text": "Diketahui fungsi f(x)=2x+3. Tentukan nilai f(5) dan gambarkan grafik fungsi tersebut.",
                            "is_success": true
                        },
                        {
                            "text": "Diketahui fungsi f(x)=6x+7. Tentukan nilai f(2) dan gambarkan grafik fungsi tersebut.",
                            "is_success": false
                        },
                        {
                            "text": "Berapakah nilai dari sin⁡30?",
                            "is_success": true
                        },
                        {
                            "text": "Berapakah nilai dari sin⁡30?",
                            "is_success": true
                        },
                        {
                            "text": "Diberikan segitiga ABC dengan AB=6, BC=20, dan CA=15. Tentukan nilai tan A dan⁡ cos A",
                            "is_success": false
                        },
                        {
                            "text": "Diberikan segitiga ABC dengan AB=6, BC=20, dan CA=15. Tentukan nilai tan A dan⁡ cos A",
                            "is_success": false
                        },
            ]
        }
    },
]

export default ExamResultData;