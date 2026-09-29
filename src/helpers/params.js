export function formatParams(searchParams = {}) {
  if (!searchParams || typeof searchParams !== "object") return "";

  let query = "";

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query += `${key}=${value}&`;
    }
  });

  return query.slice(0, query.length - 1);
}