import { useForm } from "react-hook-form";
import { FiX, FiUser, FiMail } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const ApplyTuitionModal = ({
  isOpen,
  onClose,
  tuition,
  onSubmit,
  isSubmitting,
}) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user && isOpen) {
      reset({
        tutorName: user.displayName || "",
        tutorEmail: user.email || "",
        tutorImage: user.photoURL || "",
        experience: "",
        qualification: "",
        salary: "",
      });
    }
  }, [user, isOpen, reset]);

  const handleFormSubmit = (data) => {
    const applicationData = {
      ...data,
      tuitionId: tuition._id,
      tuitionSubject: tuition.subject,
      studentName: tuition.studentName,
      studentEmail: tuition.studentEmail,
      appliedAt: new Date().toISOString(),
    };

    onSubmit(applicationData);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">Apply for Tuition</h3>
            <p className="text-sm text-gray-500">
              {tuition.subject} - {tuition.class}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">Your Name</label>
              <input
                {...register("tutorName", { required: true })}
                className="input input-bordered input-sm"
                readOnly
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">Email</label>
              <input
                {...register("tutorEmail", { required: true })}
                className="input input-bordered input-sm"
                readOnly
              />
            </div>
          </div>
          {/*photo */}
          <div className="form-control">
            <label className="label">Photo</label>
            <input
              {...register("tutorImage", { required: true })}
              className="input input-bordered input-sm"
              readOnly
            />
          </div>

          {/* Experience */}
          <div className="form-control">
            <label className="label">Experience (Years)</label>
            <input
              type="number"
              {...register("experience", { required: true, min: 0 })}
              className="input input-bordered input-sm"
            />
            {errors.experience && (
              <span className="text-error text-xs">Experience is required</span>
            )}
          </div>

          {/* Qualification */}
          <div className="form-control">
            <label className="label">Qualification</label>
            <input
              type="text"
              {...register("qualification", { required: true })}
              className="input input-bordered input-sm"
            />
          </div>

          {/* Salary */}
          <div className="form-control">
            <label className="label">Expected Salary</label>
            <input
              type="number"
              {...register("salary", { required: true })}
              className="input input-bordered input-sm"
            />
          </div>

          {/* ACTIONS */}
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ApplyTuitionModal;
