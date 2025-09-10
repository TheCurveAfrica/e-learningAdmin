import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-components";
import { createApiClient } from "@/lib/api-client";
import { urlValidationSchema } from "@/schemas/settings-schemas";

const URL_ENDPOINT = "/api/community/url";
const CommunitySettings: React.FC = () => {
  const [savedUrl, setSavedUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<{ url: string }>({
    defaultValues: { url: "" },
  });

  const inputUrl = watch("url");

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await createApiClient().get(URL_ENDPOINT);
        if (res?.data?.url) {
          setSavedUrl(res.data.url);
          setValue("url", res.data.url);
        }
      } catch (err) {
        console.error("Failed to fetch URL", err);
      }
    };
    fetchUrl();
  }, [setValue]);

  useEffect(() => {
    setIsEditing(inputUrl !== savedUrl);
  }, [inputUrl, savedUrl]);

  const handleCancel = () => {
    setValue("url", savedUrl);
    setIsEditing(false);
    reset({ url: savedUrl });
  };

  const onSubmit = async (data: { url: string }) => {
    setLoading(true);
    try {
      const res = await createApiClient().post(URL_ENDPOINT, { url: data.url });
      if (res?.data?.url) {
        setSavedUrl(res.data.url);
        setValue("url", res.data.url);
        setIsEditing(false);
        reset({ url: res.data.url });
      }
    } catch (err) {
      console.error("Failed to update URL", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Community link"
          placeholder="Enter community link"
          error={errors.url}
          {...register("url", urlValidationSchema.url)}
        />

        <div className="flex justify-end flex-col-reverse md:flex-row w-full gap-2">
          {savedUrl && (
            <Button
              variant="cancel"
              size="md"
              className="lg:w-32 w-full"
              type="button"
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
            type="submit"
            disabled={loading || !inputUrl}
          >
            {isEditing ? " Update" : "Save Link"}
            {loading && " ..."}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommunitySettings;
