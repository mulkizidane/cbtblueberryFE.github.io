import Layout from "../components/layouts/Layout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import AdminDashboardLayout from "../components/layouts/AdminDashboardLayout";

const DashboardSiswaPage = () => {
    const { userId }  = useParams();

    return(
        <>
        <Layout>
            {
                userId == 'siswa' || userId == 'guru' ?
                <DashboardLayout user={userId}/>
                :
                userId == 'admin' ?
                <AdminDashboardLayout/>
                : 
                <h1>NULL</h1>
            }
        </Layout>
        </>
    )
}

export default DashboardSiswaPage;