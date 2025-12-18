import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBook,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRedo,
  FaPaperPlane,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import StudTuitionGetRow from "../../../components/TableRows/StudTuitionGetRow";
import TuitionEdit from "../../../components/Modal/TuitionEdit";
import Spinner from "../../../components/Shared/Spinner";
import GradientHeading from "../../../components/Shared/GradientHeading";
import Error from "../../Error";

const PostTuition = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      studentName: user?.displayName || "",
      studentEmail: user?.email || "",
      studentPhoto: user?.photoURL || "",
    },
  });

  // Update default values when user data loads
  useEffect(() => {
    if (user) {
      reset({
        studentName: user.displayName || "",
        studentEmail: user.email || "",
        studentPhoto: user.photoURL || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/tuitions`, data);
      toast.success("Tuition posted successfully!");
      reset({
        studentName: user.displayName || "",
        studentEmail: user.email || "",
        studentPhoto: user.photoURL || "",
        subject: "",
        class: "",
        location: "",
        budget: "",
        schedule: "",
      });
      refetch();
    } catch (error) {
      console.error("Error posting tuition:", error);
      toast.error("Failed to post tuition. Please try again.");
    }
  };

  const {
    data: tuitionData,
    isLoading: tuitionDataLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tuitionsPending", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`${import.meta.env.VITE_API_URL}/tuitions?status=pending`)
        .then((res) => res.data),
  });

  // Handle edit button click
  const handleEdit = (tuition) => {
    setSelectedTuition(tuition);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTuition(null);
  };

  // Handle update tuition
  const handleUpdate = () => {
    refetch();
  };

  // Handle delete tuition
  const handleDelete = async (id) => {
    if (window.confirm("Are  you want to delete this tuition?")) {
      try {
        await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/tuitions/${id}`
        );
        toast.success("Tuition deleted successfully!");
        refetch();
      } catch (error) {
        console.error("Error deleting tuition:", error);
        toast.error("Failed to delete tuition. Please try again.");
      }
    }
  };

  if (loading || tuitionDataLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <>
      <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2">
            <GradientHeading text={" Post a Tuition Request"}></GradientHeading>
            <p
              className="text-xs sm:text-sm lg:text-base mt-2 px-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              Fill in the details to find your perfect tutor
            </p>
          </div>

          {/* Form Card */}
          <div className="card bg-base-100 shadow-xl lg:shadow-2xl mx-2 sm:mx-0">
            <div className="card-body p-4 sm:p-6 lg:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 sm:space-y-8"
              >
                {/* Student Information Section */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-1 h-6 sm:h-8 bg-primary rounded-full"></div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content">
                      Student Information
                    </h3>
                  </div>

                  <div className="bg-linear-to-br from-primary/5 to-secondary/5 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-primary/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaUser className="text-xs sm:text-sm" /> Student
                            Name
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("studentName", {
                            required: "Student name is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-primary transition-all w-full text-sm sm:text-base"
                          readOnly
                        />
                        {errors.studentName && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.studentName.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaEnvelope className="text-xs sm:text-sm" />{" "}
                            Student Email
                          </span>
                        </label>
                        <input
                          type="email"
                          {...register("studentEmail", {
                            required: "Email is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-primary transition-all w-full text-sm sm:text-base"
                          readOnly
                        />
                        {errors.studentEmail && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.studentEmail.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tuition Details Section */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-1 h-6 sm:h-8 bg-secondary rounded-full"></div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content">
                      Tuition Details
                    </h3>
                  </div>

                  <div className="bg-linear-to-br from-secondary/5 to-accent/5 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-secondary/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaBook className="text-xs sm:text-sm" /> Subject
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Mathematics, Physics, English"
                          {...register("subject", {
                            required: "Subject is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all w-full text-sm sm:text-base"
                        />
                        {errors.subject && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.subject.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaGraduationCap className="text-xs sm:text-sm" />{" "}
                            Class/Grade
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Grade 10, Class 12, University"
                          {...register("class", {
                            required: "Class/Grade is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all w-full text-sm sm:text-base"
                        />
                        {errors.class && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.class.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaMapMarkerAlt className="text-xs sm:text-sm" />{" "}
                            Location
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Dhaka, Chittagong"
                          {...register("location", {
                            required: "Location is required",
                          })}
                          className="input input-bordered bg-base-100 focus:input-secondary transition-all w-full text-sm sm:text-base"
                        />
                        {errors.location && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.location.message}
                          </span>
                        )}
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                            <FaMoneyBillWave className="text-xs sm:text-sm" />{" "}
                            Budget (month)
                          </span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-base-content/50 font-semibold text-sm sm:text-base">
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
                            className="input input-bordered bg-base-100 focus:input-secondary transition-all pl-6 sm:pl-8 w-full text-sm sm:text-base"
                          />
                        </div>
                        {errors.budget && (
                          <span className="text-error text-xs sm:text-sm mt-1 flex items-center gap-1">
                            {errors.budget.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn  bg-orange-500 border-0  hover:bg-white text-primary hover:scale-105 transition-transform border-none btn-sm sm:btn-md lg:btn-lg gap-1 sm:gap-2  w-full sm:w-auto order-2 sm:order-1"
                  >
                    <FaRedo className="text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base">Reset</span>
                  </button>
                  <button
                    type="submit"
                    className="btn text-white font-bold btn-sm sm:btn-md lg:btn-lg gap-1 sm:gap-2 hover:scale-105 transition-transform shadow-lg border-none w-full sm:w-auto order-1 sm:order-2"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    }}
                  >
                    <FaPaperPlane className="text-xs sm:text-sm" />
                    <span className="text-sm sm:text-base">Post Tuition</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {tuitionData.length > 0 && (
        <div className="mt-6 sm:mt-8 lg:mt-10 px-2 sm:px-4 lg:px-6">
          <StudTuitionGetRow
            tuitionData={tuitionData}
            refetch={refetch}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Edit Modal */}
      <TuitionEdit
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        tuitionData={selectedTuition}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default PostTuition;
