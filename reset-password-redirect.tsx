import { useEffect } from 'react';

interface ResetPasswordRedirectProps {
  onDetected: () => void;
}

/**
 * This component detects password reset redirects from Supabase
 * and triggers navigation to the reset password page.
 * 
 * It checks for:
 * - ?page=reset-password (our custom parameter)
 * - #access_token=... (Supabase auth tokens in hash)
 * - ?type=recovery (Supabase recovery type)
 */
export default function ResetPasswordRedirect({ onDetected }: ResetPasswordRedirectProps) {
  useEffect(() => {
    console.log('🔍 RESET PASSWORD REDIRECT - Checking URL...');
    console.log('   Full URL:', window.location.href);
    console.log('   Search:', window.location.search);
    console.log('   Hash:', window.location.hash);
    
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    
    // Check for our custom page parameter
    if (urlParams.get('page') === 'reset-password') {
      console.log('✅ DETECTED: ?page=reset-password');
      console.log('🎯 Triggering navigation to reset password page...');
      onDetected();
      return;
    }
    
    // Check for Supabase auth tokens in hash
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      console.log('✅ DETECTED: Supabase recovery tokens in hash');
      console.log('🎯 Triggering navigation to reset password page...');
      onDetected();
      return;
    }
    
    // Check for Supabase recovery type in query params
    if (urlParams.get('type') === 'recovery') {
      console.log('✅ DETECTED: ?type=recovery');
      console.log('🎯 Triggering navigation to reset password page...');
      onDetected();
      return;
    }
    
    console.log('📄 No reset password redirect detected');
  }, [onDetected]);
  
  return null;
}
