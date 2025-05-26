'use client';

import { useEffect, useState } from 'react';

export default function RolePage() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('/api/role')
      .then((res) => res.json())
      .then((data) => {
        console.log('Data role yang diterima:', data);
        if (Array.isArray(data)) {
          setRoles(data);
        } else {
          console.error('Data bukan array:', data);
        }
      })
      .catch((error) => console.error('Error fetching roles:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Role</h2>
      <ul className="list-disc pl-6">
        {roles.length > 0 ? (
          roles.map((role) => (
            <li key={role.role_id}>
              {role.role_id} - {role.role_name}
            </li>
          ))
        ) : (
          <p>No roles found.</p>
        )}
      </ul>
    </div>
  );
}
