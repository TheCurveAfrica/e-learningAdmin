# Using `useSend` in Authentication Hooks

This guide shows how your authentication hooks were refactored to use the `useSend` hook for consistency and better maintainability.

## 🔄 **Before vs After Comparison**

### **Before (Original Implementation)**

```typescript
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      onboardingApiService.login(credentials),
    onSuccess: (response) => {
      toast.success(response.message || "Login successful!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.currentAdmin });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });
};
```

### **After (Using `useSend`)**

```typescript
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useSend<LoginRequest, LoginResponse>({
    url: "/auth/login",
    method: "post",
    hasAuth: false, // No auth required for login
    successMessage: "Login successful!",
    onSuccess: (response) => {
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("adminUser", JSON.stringify(response.user));
      }
      // Invalidate current admin query to refetch user data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.currentAdmin });
    },
    errorMessage: "Login failed. Please try again.",
  });
};
```

## ✅ **Benefits of Using `useSend`**

### **1. Reduced Code Duplication**

- No need to manually import and use `useMutation`
- No need to manually handle `toast` notifications
- Consistent error handling across all auth operations

### **2. Better Type Safety**

- Generic types for request and response data
- Automatic type inference for success/error callbacks
- Consistent API response handling

### **3. Standardized Configuration**

- Consistent endpoint URL structure
- Standardized error and success messaging
- Unified authentication flag handling

### **4. Enhanced Features**

- Automatic query cache invalidation
- Configurable toast notifications
- Response data parsing with schemas
- Flexible success/error callbacks

## 🎯 **How to Use the Refactored Hooks**

### **1. Login Hook**

```typescript
import { useLogin } from "@/hooks/use-auth";

const LoginComponent = () => {
  const loginMutation = useLogin();

  const handleLogin = async (credentials: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Success handling is automatic
      navigate("/dashboard");
    } catch (error) {
      // Error handling is automatic via toast
      console.error("Login failed:", error);
    }
  };

  return (
    <button
      onClick={() =>
        handleLogin({ email: "user@example.com", password: "password" })
      }
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? "Signing in..." : "Sign in"}
    </button>
  );
};
```

### **2. Forgot Password Hook**

```typescript
import { useForgotPassword } from "@/hooks/use-auth";

const ForgotPasswordComponent = () => {
  const forgotPasswordMutation = useForgotPassword();

  const handleForgotPassword = async (email: string) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email });
      // Automatic success toast: "Password reset email sent successfully!"
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // Automatic error toast: "Failed to send password reset email."
    }
  };

  return (
    <button
      onClick={() => handleForgotPassword("user@example.com")}
      disabled={forgotPasswordMutation.isPending}
    >
      {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Email"}
    </button>
  );
};
```

### **3. Email Verification Hook**

```typescript
import { useVerifyEmail } from "@/hooks/use-auth";

const VerifyEmailComponent = () => {
  const verifyEmailMutation = useVerifyEmail();

  const handleVerifyEmail = async (email: string, code: string) => {
    try {
      await verifyEmailMutation.mutateAsync({ email, code });
      // Automatic success toast: "Email verified successfully!"
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      // Automatic error toast: "Invalid verification code. Please try again."
    }
  };

  return (
    <button
      onClick={() => handleVerifyEmail("user@example.com", "123456")}
      disabled={verifyEmailMutation.isPending}
    >
      {verifyEmailMutation.isPending ? "Verifying..." : "Verify Code"}
    </button>
  );
};
```

### **4. Reset Password Hook**

```typescript
import { useResetPassword } from "@/hooks/use-auth";

const ResetPasswordComponent = () => {
  const resetPasswordMutation = useResetPassword();

  const handleResetPassword = async (email: string, password: string) => {
    try {
      await resetPasswordMutation.mutateAsync({ email, password });
      // Automatic success toast: "Password reset successfully!"
      navigate("/login");
    } catch (error) {
      // Automatic error toast: "Failed to reset password. Please try again."
    }
  };

  return (
    <button
      onClick={() => handleResetPassword("user@example.com", "newPassword123!")}
      disabled={resetPasswordMutation.isPending}
    >
      {resetPasswordMutation.isPending ? "Updating..." : "Update Password"}
    </button>
  );
};
```

### **5. Resend Code Hook**

```typescript
import { useResendCode } from "@/hooks/use-auth";

const ResendCodeComponent = () => {
  const resendCodeMutation = useResendCode();

  const handleResendCode = async (email: string) => {
    try {
      await resendCodeMutation.mutateAsync({ email });
      // Automatic success toast: "Verification code sent successfully!"
    } catch (error) {
      // Automatic error toast: "Failed to resend verification code."
    }
  };

  return (
    <button
      onClick={() => handleResendCode("user@example.com")}
      disabled={resendCodeMutation.isPending}
    >
      {resendCodeMutation.isPending ? "Sending..." : "Resend Code"}
    </button>
  );
};
```

### **6. Logout Hook (NEW)**

```typescript
import { useLogout } from "@/hooks/use-auth";

const LogoutComponent = () => {
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync({});
      // Automatic success toast: "Logged out successfully!"
      // Local storage is automatically cleared
      navigate("/login");
    } catch (error) {
      // Local storage is still cleared even if API fails
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
};
```

### **7. Token Refresh Hook (NEW)**

```typescript
import { useRefreshToken } from "@/hooks/use-auth";

const useTokenRefreshEffect = () => {
  const refreshTokenMutation = useRefreshToken();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refreshTokenMutation.mutateAsync({});
        // Token is automatically stored in localStorage
      } catch (error) {
        // Redirect to login if refresh fails
        window.location.href = "/login";
      }
    };

    // Set up automatic token refresh
    const interval = setInterval(refreshToken, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
  }, [refreshTokenMutation]);
};
```

## 🔧 **Advanced Usage with Custom Callbacks**

### **Custom Success/Error Handling**

```typescript
const loginMutation = useLogin();

// You can still add custom logic while keeping automatic toast notifications
const handleLogin = async (credentials: LoginFormData) => {
  try {
    const response = await loginMutation.mutateAsync(credentials);

    // Custom logic after successful login
    analytics.track("user_logged_in", {
      userId: response.user.id,
      email: response.user.email,
    });

    // Navigate based on user role
    if (response.user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    // Custom error handling
    if (error.message.includes("account_suspended")) {
      setShowSuspendedAccountModal(true);
    }
  }
};
```

## 🎯 **Key Improvements**

1. **Consistency**: All auth hooks now follow the same pattern
2. **Type Safety**: Better TypeScript support with generic types
3. **Less Boilerplate**: Reduced code duplication across hooks
4. **Better UX**: Automatic toast notifications for user feedback
5. **Flexibility**: Easy to customize while maintaining defaults
6. **Maintainability**: Centralized API request logic through `useSend`

## 🚀 **Migration Summary**

- ✅ **All auth hooks refactored** to use `useSend`
- ✅ **Added new logout and refresh token hooks**
- ✅ **Maintained existing functionality** with improved features
- ✅ **Better error handling** and user feedback
- ✅ **No breaking changes** to component usage
- ✅ **Enhanced type safety** throughout

Your authentication system is now more robust, consistent, and maintainable while providing the same great user experience!
