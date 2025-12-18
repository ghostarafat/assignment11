import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";

import Container from "../../components/Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "../../components/TuitionCard";
import Spinner from "../../components/Shared/Spinner";
import GradientHeading from "../../components/Shared/GradientHeading";
import Error from "../Error";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    location: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  // Fetch all tuitions
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-tuitions`
      );

      return res.data;
    },
  });
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      class: "",
      subject: "",
      location: "",
    });
    setSearchTerm("");
    setSortBy("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.class || filters.subject || filters.location || searchTerm;
  // Ensure data is an array - handle different possible data structures
  let tuitions = [];
  if (Array.isArray(data)) {
    tuitions = data;
  } else if (data && Array.isArray(data.tuitions)) {
    tuitions = data.tuitions;
  } else if (data && Array.isArray(data.data)) {
    tuitions = data.data;
  } else if (data && typeof data === "object") {
    // If data is an object, try to find an array property
    const arrayProps = Object.values(data).filter((val) => Array.isArray(val));
    if (arrayProps.length > 0) {
      tuitions = arrayProps[0];
    }
  }

  // Filter tuitions by search term and filters
  const filteredTuitions = tuitions.filter((tuition) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        tuition.subject?.toLowerCase().includes(searchLower) ||
        tuition.location?.toLowerCase().includes(searchLower) ||
        tuition.class?.toString().toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Class filter
    if (filters.class && tuition.class?.toString() !== filters.class) {
      return false;
    }

    // Subject filter
    if (
      filters.subject &&
      tuition.subject?.toLowerCase() !== filters.subject.toLowerCase()
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      tuition.location?.toLowerCase() !== filters.location.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  // Sort tuitions by budget or date
  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortBy === "budget-high") {
      return (b.budget || 0) - (a.budget || 0);
    } else if (sortBy === "budget-low") {
      return (a.budget || 0) - (b.budget || 0);
    } else if (sortBy === "date-new") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "date-old") {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedTuitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTuitions = sortedTuitions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <Container className={"px-2.5"}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <GradientHeading className="text-center mb-4" text="All Tuitions" />
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Find the tuition that suits your skills! Explore every listing with
            detailed info so you can choose the best opportunity for your
            teaching journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div
          className="rounded-xl shadow-lg p-4 sm:p-6 mb-8 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          {/* Top Row - Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--color-text-muted)" }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search by subject, location, or class..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input input-bordered w-full pl-10 transition-all focus:border-primary"
                style={{
                  backgroundColor: "var(--color-bg-soft)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-dark)",
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn btn-outline ${
                  showFilters ? "btn-primary" : ""
                } flex items-center gap-2`}
                style={{
                  borderColor: "var(--color-primary)",
                  color: showFilters ? "white" : "var(--color-primary)",
                  backgroundColor: showFilters
                    ? "var(--color-primary)"
                    : "transparent",
                }}
              >
                <FiFilter size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="badge badge-sm bg-red-500 text-white border-none">
                    {
                      [
                        filters.class,
                        filters.subject,
                        filters.location,
                        searchTerm,
                      ].filter(Boolean).length
                    }
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered min-w-[180px]"
                style={{
                  backgroundColor: "var(--color-bg-soft)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-dark)",
                }}
              >
                <option value="">Sort by</option>
                <option value="budget-high">Budget: High to Low</option>
                <option value="budget-low">Budget: Low to High</option>
                <option value="date-new">Date: Newest First</option>
                <option value="date-old">Date: Oldest First</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div
              className="border-t pt-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="label">
                    <span
                      className="label-text font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      Class/Grade
                    </span>
                  </label>
                  <select
                    name="class"
                    value={filters.class}
                    onChange={handleFilterChange}
                    className="select select-bordered w-full"
                    style={{
                      backgroundColor: "var(--color-bg-soft)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    <option value="">All Classes</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span
                      className="label-text font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      Subject
                    </span>
                  </label>
                  <select
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    className="select select-bordered w-full"
                    style={{
                      backgroundColor: "var(--color-bg-soft)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="ICT">ICT</option>
                    <option value="Economics">Economics</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Business Studies">Business Studies</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span
                      className="label-text font-medium"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      Location
                    </span>
                  </label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="select select-bordered w-full"
                    style={{
                      backgroundColor: "var(--color-bg-soft)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    <option value="">All Locations</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="btn btn-outline btn-error w-full flex items-center gap-2"
                    >
                      <FiX size={16} />
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Results Count */}
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Showing {currentTuitions.length} of {sortedTuitions.length}{" "}
              tuitions
              {searchTerm && (
                <span className="ml-2">
                  for "
                  <span style={{ color: "var(--color-primary)" }}>
                    {searchTerm}
                  </span>
                  "
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Active filters:
              </span>
              {searchTerm && (
                <span className="badge badge-primary gap-2">
                  Search: {searchTerm}
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              {filters.class && (
                <span className="badge badge-secondary gap-2">
                  Class: {filters.class}
                  <button
                    onClick={() => {
                      setFilters({ ...filters, class: "" });
                      setCurrentPage(1);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              {filters.subject && (
                <span className="badge badge-accent gap-2">
                  Subject: {filters.subject}
                  <button
                    onClick={() => {
                      setFilters({ ...filters, subject: "" });
                      setCurrentPage(1);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="badge badge-info gap-2">
                  Location: {filters.location}
                  <button
                    onClick={() => {
                      setFilters({ ...filters, location: "" });
                      setCurrentPage(1);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tuitions Grid */}
        {currentTuitions.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentTuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="rounded-xl shadow-lg p-4 sm:p-6 mt-8"
                style={{
                  backgroundColor: "var(--color-card-bg)",
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Page Info */}
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Page {currentPage} of {totalPages} ({sortedTuitions.length}{" "}
                    total tuitions)
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center gap-1 sm:gap-2">
                    <button
                      className="btn btn-outline btn-sm hover:scale-105 transition-transform"
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                      style={{
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <FiChevronLeft size={16} />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex gap-1">
                      {getPageNumbers().map((page, index) => (
                        <div key={index}>
                          {page === "..." ? (
                            <span
                              className="px-2 sm:px-3 py-2 flex items-center"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              <FiMoreHorizontal size={16} />
                            </span>
                          ) : (
                            <button
                              onClick={() => goToPage(page)}
                              className={`btn btn-sm hover:scale-105 transition-all ${
                                currentPage === page
                                  ? "btn-primary shadow-lg"
                                  : "btn-outline hover:btn-primary"
                              }`}
                              style={
                                currentPage === page
                                  ? {
                                      backgroundColor: "var(--color-primary)",
                                      borderColor: "var(--color-primary)",
                                      color: "white",
                                    }
                                  : {
                                      borderColor: "var(--color-primary)",
                                      color: "var(--color-primary)",
                                    }
                              }
                            >
                              {page}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      className="btn btn-outline btn-sm hover:scale-105 transition-transform"
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                      style={{
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className="text-center py-16 sm:py-20 rounded-xl shadow-lg border"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="max-w-md mx-auto px-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              >
                <FiSearch
                  size={32}
                  style={{ color: "var(--color-text-muted)" }}
                />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ color: "var(--color-text-dark)" }}
              >
                No tuitions found
              </h3>
              <p
                className="text-base sm:text-lg mb-6 leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {hasActiveFilters
                  ? "No tuitions match your current filters. Try adjusting your search criteria or clear some filters."
                  : "No tuitions are currently available. Check back later for new opportunities."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className=" btn bg-orange-500 border-0 btn-lg gap-2
                   hover:bg-white text-primary hover:scale-105 transition-transform border-none"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllTuitions;
