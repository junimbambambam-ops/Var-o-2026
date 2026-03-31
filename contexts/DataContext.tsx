
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Sponsor, CommunityEvent, SupportResource } from '../types';
import { MOCK_COMMUNITY_EVENTS, SUPPORT_RESOURCES } from '../constants';

interface DataContextType {
  sponsors: Sponsor[];
  addSponsor: (sponsor: Sponsor) => void;
  removeSponsor: (id: string) => void;
  
  communityEvents: CommunityEvent[];
  addEvent: (event: CommunityEvent) => void;

  supportResources: SupportResource[];
  addSupportResource: (resource: SupportResource) => void;
  removeSupportResource: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sponsors State
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  // Community Events State
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>(MOCK_COMMUNITY_EVENTS);
  // Support Resources State
  const [supportResources, setSupportResources] = useState<SupportResource[]>(SUPPORT_RESOURCES);

  // Load from local storage on mount
  useEffect(() => {
    const storedSponsors = localStorage.getItem('varao10_sponsors');
    if (storedSponsors) setSponsors(JSON.parse(storedSponsors));

    const storedResources = localStorage.getItem('varao10_resources');
    if (storedResources) setSupportResources(JSON.parse(storedResources));
  }, []);

  // Sponsors Logic
  const addSponsor = (sponsor: Sponsor) => {
    const updated = [...sponsors, sponsor];
    setSponsors(updated);
    localStorage.setItem('varao10_sponsors', JSON.stringify(updated));
  };

  const removeSponsor = (id: string) => {
    const updated = sponsors.filter(s => s.id !== id);
    setSponsors(updated);
    localStorage.setItem('varao10_sponsors', JSON.stringify(updated));
  };

  // Events Logic
  const addEvent = (event: CommunityEvent) => {
    const updated = [...communityEvents, event];
    setCommunityEvents(updated);
  };

  // Support Resources Logic
  const addSupportResource = (resource: SupportResource) => {
    const updated = [...supportResources, resource];
    setSupportResources(updated);
    localStorage.setItem('varao10_resources', JSON.stringify(updated));
  }

  const removeSupportResource = (id: string) => {
    const updated = supportResources.filter(r => r.id !== id);
    setSupportResources(updated);
    localStorage.setItem('varao10_resources', JSON.stringify(updated));
  }

  return (
    <DataContext.Provider value={{ 
      sponsors, addSponsor, removeSponsor, 
      communityEvents, addEvent,
      supportResources, addSupportResource, removeSupportResource
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
