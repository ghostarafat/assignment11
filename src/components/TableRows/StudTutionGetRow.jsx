import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const StudtutionGetRow = ({ tutionData, refetch, onEdit }) => {
  const axiosSecure = useAxiosSecure();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/tutions/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Deleted!",

        icon: "success",
      });
    },
    onError: () => {
      toast.error("Failed to delete. Please try again.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (tution) => {
    if (onEdit) {
      onEdit(tution);
    }
  };

  return (
    <div className="overflow-x-auto container mx-auto max-w-7xl rounded-box bg-gray-100 text-black border border-base-content/5 ">
      <table className="table">
        {/* head */}
        <thead className="bg-primary">
          <tr>
            <th></th>
            <th className="text-black">Subject</th>
            <th> location</th>
            <th>budget</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutionData.map((tution, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{tution.subject}</td>
                <td>{tution.location}</td>
                <td> {tution.budget}</td>
                <td>
                  <span
                    className={`badge ${
                      tution.status === "approved"
                        ? "badge-success"
                        : tution.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tution.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm mr-2"
                    onClick={() => handleEdit(tution)}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(tution._id)}
                  >
                    {" "}
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudtutionGetRow;
