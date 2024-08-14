"use client";
import axios from "axios";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const { apiKey } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey) {
        setError("API key is missing");
        setLoading(false);
        return;
      }

      try {
        const endpoint = "/api/profile";
        const response = await axios.get(`${apiUrl}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ProfileHeader />
      <ProfileContent data={data} />
    </div>
  );
};

export default Profile;
