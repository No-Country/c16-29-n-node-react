
export const getAccessToken = () => {
  const local = localStorage.getItem("persist:auth");
  const parsed = JSON.parse(local);
  return parsed.accessToken;
}