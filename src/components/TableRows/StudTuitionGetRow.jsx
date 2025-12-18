import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const StudTuitionGetRow = ({ tuitionData, refetch, onEdit }) => {
  const axiosSecure = useAxiosSecure();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/tuitions/${id}`
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

  const handleEdit = (tuition) => {
    if (onEdit) {
      onEdit(tuition);
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
          {tuitionData.map((tuition, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{tuition.subject}</td>
                <td>{tuition.location}</td>
                <td> {tuition.budget}</td>
                <td>
                  <span
                    className={`badge ${
                      tuition.status === "approved"
                        ? "badge-success"
                        : tuition.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm mr-2"
                    onClick={() => handleEdit(tuition)}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(tuition._id)}
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

export default StudTuitionGetRow;
