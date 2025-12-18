import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TuitionEdit = ({ isOpen, onClose, tuitionData, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (tuitionData) {
      reset({
        studentName: tuitionData.studentName || "",
        studentEmail: tuitionData.studentEmail || "",
        subject: tuitionData.subject || "",
        class: tuitionData.class || "",
        location: tuitionData.location || "",
        budget: tuitionData.budget || "",
      });
    }
  }, [tuitionData, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/tuitions/${tuitionData._id}`,
        data
      );

      toast.success("Tuition updated successfully!");
      onClose();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating tuition:", error);
      toast.error("Failed to update tuition. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold  bg-clip-text text-transparent">
            Edit Tuition Request
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Student Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h4 className="text-lg font-bold">Student Information</h4>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      👤 Student Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("studentName")}
                    className="input input-bordered input-sm bg-base-100"
                    readOnly
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      📧 Student Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("studentEmail")}
                    className="input input-bordered input-sm bg-base-100"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tuition Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-secondary rounded-full"></div>
              <h4 className="text-lg font-bold">Tuition Details</h4>
            </div>

            <div className="bg-gradient-to-br from-secondary/5 to-accent/5 p-4 rounded-xl border border-secondary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">📚 Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Physics"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className="input input-bordered input-sm bg-base-100 focus:input-secondary"
                  />
                  {errors.subject && (
                    <span className="text-error text-xs mt-1">
                      ⚠️ {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      🎓 Class/Grade
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Grade 10, Class 12"
                    {...register("class", {
                      required: "Class/Grade is required",
                    })}
                    className="input input-bordered input-sm bg-base-100 focus:input-secondary"
                  />
                  {errors.class && (
                    <span className="text-error text-xs mt-1">
                      ⚠️ {errors.class.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      📍 Location
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dhaka, Chittagong"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="input input-bordered input-sm bg-base-100 focus:input-secondary"
                  />
                  {errors.location && (
                    <span className="text-error text-xs mt-1">
                      ⚠️ {errors.location.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      💰 Budget (per month)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 font-semibold text-sm">
                      ৳
                    </span>
                    <input
                      type="number"
                      placeholder="5000"
                      {...register("budget", {
                        required: "Budget is required",
                        min: {
                          value: 0,
                          message: "Budget must be a positive number",
                        },
                      })}
                      className="input input-bordered input-sm bg-base-100 focus:input-secondary pl-8 w-full"
                    />
                  </div>
                  {errors.budget && (
                    <span className="text-error text-xs mt-1">
                      ⚠️ {errors.budget.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm gap-2 shadow-lg"
            >
              <span>💾</span>
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default TuitionEdit;
