import { useState } from 'react';
import { RoleSelector } from './components/RoleSelector';
import { HospitalInterface } from './components/HospitalInterface';
import { ParentInterface } from './components/ParentInterface';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<'hospital' | 'parent' | null>(null);

  const handleRoleSelect = (role: 'hospital' | 'parent') => {
    setSelectedRole(role);
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
  };

  if (!selectedRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  if (selectedRole === 'hospital') {
    return <HospitalInterface onBackToSelection={handleBackToSelection} />;
  }

  return <ParentInterface onBackToSelection={handleBackToSelection} />;
}