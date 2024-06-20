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
                userId == 'admin' ?
                <AdminDashboardLayout/>
                : 
                <DashboardLayout userId={userId}/>
            }
        </Layout>
        </>
    )
}

export default DashboardSiswaPage;