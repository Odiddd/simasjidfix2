// src/app/api/role/route.js
export async function GET() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/role`);
      const roles = await res.json();
  
      return new Response(JSON.stringify(roles), {
        headers: { 'Content-Type': 'application/json' },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Gagal mengambil data role' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  