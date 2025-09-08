export const getResearcherConfig = async (token: string | undefined) => {
  const res = await fetch(`/api/researcher/configurations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unable to Find Configuration");
  }
  const json = await res.json();

  return json;
};

export const getResearcherResults = async (token: string | undefined) => {
  const res = await fetch(`/api/researcher/results`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unable to Find Configuration");
  }
  const json = await res.json();

  return json;
};

export const getStudyResults = async (
  token: string | undefined,
  resultsID: string
) => {
  const res = await fetch(`/api/researcher/export/${resultsID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Unable to Find Results");
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob); 
};

export const getAllStudyResults = async (
  token: string | undefined
) => {
  const res = await fetch(`/api/researcher/export_all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Unable to Find Results");
  }
  
  const blob = await res.blob();
  return URL.createObjectURL(blob); 
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

export const deleteConfig = async (token: string | undefined, study_code:string) => {
  const res = await fetch(`/api/researcher/delete`, {
    method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({ study_code })
    });

  if (!res.ok) {
    throw new Error("Unable to Delete File");
  }
};
