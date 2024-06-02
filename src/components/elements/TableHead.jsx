const TableHead = ({children}) => {
    return (
<thead>
                        <tr className="bg-btn text-white divide-x-2">
                            {children}
                        </tr>
                    </thead>
    )
}

export default TableHead;