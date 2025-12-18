import { FaExchangeAlt } from "react-icons/fa";
import {
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiMail,
  FiBook,
  FiCreditCard,
  FiTrendingUp,
} from "react-icons/fi";
import Chart from "../Chart/Chart";

const ReportTable = ({ allPaymentData = [] }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate statistics
  const totalRevenue = allPaymentData.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );
  const totalTransactions = allPaymentData.length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div
          className="rounded-xl shadow-lg p-6 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Total Revenue
              </p>
              <p
                className="text-2xl font-bold mt-1"
                style={{ color: "var(--color-primary)" }}
              >
                {totalRevenue}
              </p>
            </div>
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "var(--color-primary-hover)" }}
            >
              <FiTrendingUp size={24} />
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div
          className="rounded-xl shadow-lg p-6 border"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Total Transactions
              </p>
              <p
                className="text-2xl font-bold mt-1"
                style={{ color: "var(--color-secondary)" }}
              >
                {totalTransactions}
              </p>
            </div>
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "var(--color-secondary-hover)" }}
            >
              {" "}
              <FaExchangeAlt />
            </div>
          </div>
        </div>
      </div>
      <Chart allPaymentData={allPaymentData}></Chart>
      {/* Table */}
      <div
        className="rounded-xl  shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: "var(--color-card-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead style={{ backgroundColor: "var(--color-primary-hover)" }}>
              <tr>
                <th style={{ color: "var(--color-text-dark)" }}>#</th>
                <th style={{ color: "var(--color-text-dark)" }}>Transaction</th>
                <th style={{ color: "var(--color-text-dark)" }}>Student</th>
                <th style={{ color: "var(--color-text-dark)" }}>Tutor</th>
                <th style={{ color: "var(--color-text-dark)" }}>Subject</th>
                <th style={{ color: "var(--color-text-dark)" }}>Amount</th>
                <th style={{ color: "var(--color-text-dark)" }}>Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {allPaymentData.map((payment, index) => (
                <tr
                  key={payment._id || index}
                  className="hover:bg-primary/5 transition-colors"
                >
                  {/* Index */}
                  <th style={{ color: "var(--color-text-dark)" }}>
                    {index + 1}
                  </th>

                  {/* Transaction Info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--color-primary-hover)",
                        }}
                      >
                        <FiCreditCard size={16} />
                      </div>
                      <div>
                        <div
                          className="font-bold text-sm"
                          style={{ color: "var(--color-text-dark)" }}
                        >
                          {payment.transactionId || "N/A"}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          ID: {payment._id?.slice(-8) || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Student */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiUser
                        size={14}
                        style={{ color: "var(--color-secondary)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {payment.studentEmail || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Tutor */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiMail
                        size={14}
                        style={{ color: "var(--color-success)" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {payment.tutorEmail || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Subject */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiBook
                        size={14}
                        style={{ color: "var(--color-warning)" }}
                      />
                      <span
                        className=""
                        style={{ borderColor: "var(--color-warning)" }}
                      >
                        {payment.subject || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiDollarSign
                        size={14}
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span
                        className="font-bold text-lg"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {payment.amount}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FiCalendar
                        size={14}
                        style={{ color: "var(--color-text-muted)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-dark)" }}
                      >
                        {formatDate(payment.paidAt)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
