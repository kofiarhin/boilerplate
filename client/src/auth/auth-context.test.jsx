import { renderHook, act } from '@testing-library/react';
import AuthProvider, { useAuth } from './auth-context.jsx';

describe('AuthProvider', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  it('signs in with provided email', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.signIn({ email: 'test@devkofi.com' });
    });

    expect(result.current.isSignedIn).toBe(true);
    expect(result.current.user).toEqual({
      id: 'local-user',
      email: 'test@devkofi.com',
    });
  });

  it('signs out the current user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.signIn({ email: 'test@devkofi.com' });
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.isSignedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
