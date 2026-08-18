import StatusBadge from "./StatusBadge";

function InventoryTable({

    inventory,

    onDelete,

    onEdit

}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">

                Textile Inventory

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="p-3 text-left">

                            Waste

                        </th>

                        <th className="p-3 text-left">

                            Fabric

                        </th>

                        <th className="p-3 text-left">

                            Weight

                        </th>

                        <th className="p-3 text-left">

                            Source

                        </th>

                        <th className="p-3 text-left">

                            Status

                        </th>

                        <th className="p-3 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        inventory.map((item)=>(

                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-3">

                                    {item.waste_name}

                                </td>

                                <td className="p-3">

                                    {item.fabric_type}

                                </td>

                                <td className="p-3">

                                    {item.weight} kg

                                </td>

                                <td className="p-3">

                                    {item.source}

                                </td>

                                <td className="p-3">

                                    <StatusBadge

                                        status={item.status}

                                    />

                                </td>

                                <td className="p-3 text-center">

                                    <button

                                        onClick={() => onEdit(item)}

                                        className="bg-blue-600 text-white px-3 py-1 rounded mr-2"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        onClick={() => onDelete(item.id)}

                                        className="bg-red-600 text-white px-3 py-1 rounded"

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default InventoryTable;