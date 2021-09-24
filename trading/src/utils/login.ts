export default function login(): boolean {
  const token: string | null = localStorage.getItem('token');
  if (!token) return false;
  try {
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}
