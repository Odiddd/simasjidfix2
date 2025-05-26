// 'use client';

// import { useEffect, useState } from 'react';

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch('/api/user')  // Pastikan URL API sudah benar
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Data yang diterima:', data);  // Log data yang diterima
//         if (Array.isArray(data)) {
//           setUsers(data);
//         } else {
//           console.error('Data bukan array:', data);  // Tambahkan pengecekan jika data bukan array
//         }
//       })
//       .catch((error) => console.error('Error fetching data:', error));  // Tangani error jika ada
//   }, []);

//   return (
//     <div>
//       <h1>Daftar User</h1>
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <li key={user.user_id}>
//               {user.name} - {user.email}
//             </li>
//           ))
//         ) : (
//           <p>No users found.</p>  // Pesan jika tidak ada data
//         )}
//       </ul>
//     </div>
//   );
// }
