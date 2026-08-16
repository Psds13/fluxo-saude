'use client';

import React, { createContext, useContext, useState } from 'react';
import { Tenant } from '../types/tenant';
import { MOCK_TENANTS } from '../services/mockData';

interface TenantContextType {
  tenantAtual: Tenant;
  tenantsDisponiveis: Tenant[];
  selecionarTenant: (id: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenantAtual, setTenantAtual] = useState<Tenant>(MOCK_TENANTS[0]);

  const selecionarTenant = (id: string) => {
    const encontrado = MOCK_TENANTS.find((t) => t.id === id);
    if (encontrado) {
      setTenantAtual(encontrado);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        tenantAtual,
        tenantsDisponiveis: MOCK_TENANTS,
        selecionarTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve ser utilizado dentro do TenantProvider');
  }
  return context;
}
