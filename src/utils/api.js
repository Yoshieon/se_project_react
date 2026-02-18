const baseUrl = "https://localhost:3001";

const headers = { "Content-Type": "application/json" };

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers })
    .then(handleServerResponse)
    .then((data) => {
      if (!Array.isArray(data)) return data;
      if (data.every((item) => item && item.createdAt)) {
        return data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      if (data.every((item) => typeof item._id !== "undefined")) {
        return data.slice().sort((a, b) => Number(b._id) - Number(a._id));
      }
      return data.slice().reverse();
    });
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};
