import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { apiSendEmailtoBackend } from '../../api/customerAPIs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'warning', 'info'
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const sendEmailtoBackend = async () => {
    try {
      if (!email.trim()) {
        setSnackbar({
          open: true,
          message: 'Please enter a valid email',
          severity: 'error',
        });
        return;
      }
      const res = await apiSendEmailtoBackend({ email });
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'success',
      });
      setEmail('');
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Subscription failed. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-amber-600 to-amber-200 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto bg-amber-700/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-400/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-500 rounded-full shadow-lg">
                  <EmailIcon className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
                  Join Our Newsletter
                </h3>
              </div>
              <p className="text-amber-100 text-lg">
                Be the first to know about new collections, exclusive offers, and get expert jewelry care tips delivered straight to your inbox.
              </p>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-6 py-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-800 placeholder-gray-500 shadow-lg transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <EmailIcon />
                  </div>
                </div>
                <button
                  onClick={sendEmailtoBackend}
                  className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 px-8 py-4 rounded-lg flex items-center justify-center shadow-lg hover:shadow-amber-800/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <SendIcon className="mr-2" />
                  <span className="font-medium">Subscribe</span>
                </button>
              </div>
              <p className="text-amber-100/80 text-sm mt-3 text-center sm:text-left">
                We respect your privacy. Unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

export default Newsletter;