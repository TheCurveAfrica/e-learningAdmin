import { RegisterOptions } from "react-hook-form";

// URL validation pattern
export const URL_PATTERN = {
  value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.~:?#@!$&'()*+,;=]*)?$/i,
  message: "Invalid URL format",
};

export const urlValidationSchema = {
  url: {
    required: "URL is required",
    pattern: URL_PATTERN,
  } as RegisterOptions<{ url: string }, "url">,
};