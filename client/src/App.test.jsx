import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './auth/auth-context.jsx';
import App from './App.jsx';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { message: 'ok' }, error: null }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form when signed out and shows health message', async () => {
    render(<App />, { wrapper: createWrapper() });

    expect(await screen.findByText('Login')).toBeInTheDocument();
    expect(await screen.findByText('Health: ok')).toBeInTheDocument();
  });

  it('signs in and signs out user via form interactions', async () => {
    render(<App />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'founder@devkofi.com' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('founder@devkofi.com')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.queryByText('founder@devkofi.com')).not.toBeInTheDocument();
    });
  });
});
