import axios from "axios";

export const handleAddData = async(e, url, patchUrl, data, setDataId, isEdit, setErrMsg, setSuccessMsg) => {
    e.preventDefault()
    try {
        if(isEdit){
            const response = await axios.patch(patchUrl, data)
            setDataId("")
            setSuccessMsg(response.data.msg)
            
            return
        }
        const response = await axios.post(url, data)
        setSuccessMsg(response.data.msg)

    } catch (error) {
        setErrMsg(error.response.data.msg)
    }
}

export const handleUpdateData = async(id, setIsEdit, setDataId) => {
    setIsEdit(true)
    setDataId(id)
}

export const handleImportFile = async(file, url, setShowModal, setErrMsg) => {
    const formData = new FormData();
    formData.append("file", file)
    try {
        await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setShowModal(false)
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error)
        setErrMsg(error.response.data.msg)
    }
}

export const handleDeleteData = async(url, setErrMsg) => {
    try {
        await axios.delete(url)
    } catch (error) {
        console.log(error)
        setErrMsg(error.response.data.msg)
    }
}