export const getImageData = async (
  token: string | undefined,
  next: string | null
) => {
  const res = await fetch(
    `/api/images/get_file_page${
      next ? `?next_token=${encodeURIComponent(next)}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Unable to Find Image Data");
  }

  // return ImagePageSchema.parse(await res.json());
  const json = await res.json();
  return {
    images: json.images ?? json.files ?? [],
    next_token: json.next_token ?? json.next ?? null,
  };
};

export const deleteImage = async (
  token: string | undefined,
  filename: string
) => {
  const res = await fetch(`/api/images/delete_file`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filename }),
  });

  if (!res.ok) {
    throw new Error("Unable to Delete File");
  }
  const json = await res.json();

  return json.files;
};

export const uploadFile = async (token: string | undefined, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Unable to Upload File");
  }
  const json = await res.json();

  return json.files;
};
