import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../constants/constants";

const fetchProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
};

const saveProfile = async ({ token, data }) => {
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to save profile");
  }
  return response.json();
};

export const useProfile = () => {
  const { getToken } = useAuth();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = await getToken();
      return fetchProfile(token);
    },
    enabled: !!getToken, // only run if user is signed in
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = await getToken();
      return saveProfile({ token, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    saveProfile: mutation.mutate,
    isSaving: mutation.isPending,
    saveError: mutation.error,
  };
};
