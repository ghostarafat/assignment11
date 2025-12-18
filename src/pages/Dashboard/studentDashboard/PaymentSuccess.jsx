import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
  FaCheckCircle, 
  FaHome, 
  FaReceipt, 
  FaCalendarAlt, 
  FaCreditCard,
  FaDownload,
  FaShare
} from "react-icons/fa";
import GradientButton from "../../../components/Shared/GradientButton";
import Container from "../../../components/Shared/Container";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/payment-success`, {
        sessionId,
      }).then(response => {
        // Assuming the API returns payment details
        setPaymentDetails(response.data);
      }).catch(error => {
        console.error("Payment verification error:", error);
      });
    }
  }, [sessionId, axiosSecure]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });


  return (
    <Container className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className=" mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your payment. Your transaction has been processed successfully 
            and you will receive a confirmation email shortly.
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-bold">Payment Receipt</h2>
                <p className="opacity-90">Transaction completed successfully</p>
              </div>
              <FaReceipt className="text-3xl opacity-80" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Transaction Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaCreditCard className="mr-2 text-blue-500" />
                    Transaction Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {sessionId?.substring(0, 16)}...
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" />
                        Completed
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{currentDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaCalendarAlt className="mr-2 text-purple-500" />
                    Payment Summary
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">Tuition Fee</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">1 Month</span>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="my-5 flex justify-center items-center" >
          <GradientButton
            to="/dashboard"
            
          >
           
            Back to Dashboard
          </GradientButton>
          
          
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Confirmation Email</h4>
              <p className="text-gray-600 text-sm">
                You'll receive a detailed confirmation email within 5 minutes
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Tutor Contact</h4>
              <p className="text-gray-600 text-sm">
                Your assigned tutor will contact you within 24 hours
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Start Learning</h4>
              <p className="text-gray-600 text-sm">
                Begin your personalized learning journey immediately
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
          <p className="text-gray-600 mb-4">
            If you have any questions about your payment or booking, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@eduplus.com" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              support@eduplus.com
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="tel:+1234567890" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              +1 (234) 567-8900
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
