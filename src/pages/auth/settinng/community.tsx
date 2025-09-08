import Button from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-components";
import { createApiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";

const URL_ENDPOINT = "/api/community/url";
const CommunitySettings = () => {
  const [savedUrl, setSavedUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await createApiClient().get(URL_ENDPOINT);
        if (res?.data?.url) {
          setSavedUrl(res.data.url);
          setInputUrl(res.data.url);
        }
      } catch (err) {
        console.error("Failed to fetch URL", err);
      }
    };
    fetchUrl();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    // setIsEditing(e.target.value !== savedUrl);
  };

  const handleCancel = () => {
    setInputUrl(savedUrl);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await createApiClient().post(URL_ENDPOINT, { url: inputUrl });
      if (res?.data?.url) {
        setSavedUrl(res.data.url);
        setInputUrl(res.data.url);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update URL", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormInput
        label="Community link"
        value={inputUrl}
        onChange={handleChange}
        placeholder="Enter community link"
      />

      <div className="flex justify-end flex-col-reverse md:flex-row w-full gap-2">
        {savedUrl && (
          <Button
            variant="cancel"
            size="md"
            className="lg:w-32 w-full"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}

        <Button
          variant="primary"
          size="md"
          className="lg:w-32 w-full"
          onClick={handleUpdate}
          disabled={loading || !inputUrl}
        >
          {isEditing ? " Update" : "Save Link"}
          {loading && " ..."}
        </Button>
      </div>
    </div>
  );
};

export default CommunitySettings;
