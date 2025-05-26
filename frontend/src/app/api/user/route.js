export async function GET() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);  // Pastikan URL backend sesuai
      const users = await res.json();

      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Gagal mengambil data user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
}
