export function formatParams(searchParams) {
  let query = "";

  Object.entries(searchParams).map((param) => {
    const [key, value] = param;

    if (value) query += `${key}=${value}&`;
  });

  return query.slice(0, query.length - 1);
}