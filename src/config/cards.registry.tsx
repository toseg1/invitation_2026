import React from 'react';
import { CodeTriathlonCard } from '../components/cards/CodeTriathlonCard';
import { CryptoStonksCard } from '../components/cards/CryptoStonksCard';
import { DJAnnouncementCard } from '../components/cards/DJAnnouncementCard';
import { SamoaCard } from '../components/cards/SamoaCard';
import { AboutMeCard } from '../components/cards/AboutMe';
import { EventInfoCard } from '../components/cards/EventInfoCard';
import { RSVPFormCard } from '../components/cards/RSVPFormCard';

/**
 * Card Registry
 *
 * This is where all available cards are defined.
 * Add new cards here to make them available in your invitation.
 */

export interface CardDefinition {
  id: string;
  name: string;
  description: string;
  component: React.FC;
  isTearable: boolean;
  defaultStyling?: {
    rotation?: string;
    zIndex?: number;
  };
}

export const CARD_REGISTRY: Record<string, CardDefinition> = {
  'code-triathlon': {
    id: 'code-triathlon',
    name: 'Code & Triathlon',
    description: 'Tech nerd meets endurance athlete',
    component: CodeTriathlonCard,
    isTearable: true,
    defaultStyling: {
      rotation: '-rotate-1',
    },
  },

  'crypto-stonks': {
    id: 'crypto-stonks',
    name: 'Crypto & Stonks',
    description: 'To the moon! 🚀',
    component: CryptoStonksCard,
    isTearable: true,
    defaultStyling: {
      rotation: 'rotate-1',
    },
  },

  'dj-announcement': {
    id: 'dj-announcement',
    name: 'DJ Lineup',
    description: 'DJ announcements with techno space theme',
    component: DJAnnouncementCard,
    isTearable: true,
    defaultStyling: {
      rotation: '-rotate-1',
    },
  },

  'samoa-adventure': {
    id: 'samoa-adventure',
    name: 'Samoa Adventure',
    description: 'Sinbad-inspired journey from France to Samoa with paradise vibes',
    component: SamoaCard,
    isTearable: true,
    defaultStyling: {
      rotation: 'rotate-2',
    },
  },

  'about-me': {
    id: 'about-me',
    name: 'About Me',
    description: 'Personal photo mood board with memories and adventures',
    component: AboutMeCard,
    isTearable: true,
    defaultStyling: {
      rotation: '-rotate-1',
    },
  },

  'event-info': {
    id: 'event-info',
    name: 'Event Info',
    description: 'Event details and location information',
    component: EventInfoCard,
    isTearable: false,
    defaultStyling: {
      rotation: 'rotate-1',
    },
  },

  'rsvp-form': {
    id: 'rsvp-form',
    name: 'RSVP Form',
    description: 'Confirmation form for the event',
    component: RSVPFormCard,
    isTearable: false,
    defaultStyling: {
      rotation: '-rotate-1',
    },
  },

  // Add more cards here as you create them!
};

/**
 * Get a card definition by ID
 */
export const getCard = (cardId: string): CardDefinition | undefined => {
  return CARD_REGISTRY[cardId];
};

/**
 * Get all available cards
 */
export const getAllCards = (): CardDefinition[] => {
  return Object.values(CARD_REGISTRY);
};
