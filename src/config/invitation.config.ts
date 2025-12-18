/**
 * Invitation Configuration
 *
 * This file defines the structure of your invitation.
 * Simply change the order, add, or remove card IDs to customize your invitation!
 *
 * How it works:
 * - Array is ordered from BOTTOM to TOP
 * - First item (index 0) = Bottom layer (revealed last)
 * - Last item = Top layer (torn first)
 *
 * Example:
 * ['event-details', 'crypto-stonks', 'code-triathlon']
 *  ^                ^                 ^
 *  Bottom           Middle            Top (tears first)
 */

export interface InvitationConfig {
  layers: string[];  // Card IDs from cards.registry.tsx
  globalSettings: {
    backgroundColor: string;
    showGrid: boolean;
    gridColor: string;
    showParticles: boolean;
    particleTexts: string[];
    showInstructions: boolean;
    instructionText: string;
  };
}

export const invitationConfig: InvitationConfig = {
  /**
   * LAYER CONFIGURATION
   * Change this array to reorder your cards!
   */
  layers: [
    'event-details',    // Bottom layer (revealed at the end)
    'dj-announcement',
    'about-me',         // Personal photo mood board
    'samoa-adventure',  // Théo's epic journey to Samoa
  ],

  /**
   * GLOBAL SETTINGS
   * Customize the overall look and feel
   */
  globalSettings: {
    backgroundColor: '#050505',
    showGrid: true,
    gridColor: '#00ff00',
    showParticles: true,
    particleTexts: ['0xDEADBEEF', 'SEGFAULT', 'HODL'],
    showInstructions: false,
    instructionText: 'TEAR THE SYSTEM',
  },
};

/**
 * QUICK START EXAMPLES:
 *
 * 1. Swap the order of layers:
 *    layers: ['event-details', 'code-triathlon', 'crypto-stonks']
 *
 * 2. Add more layers (create the card first in cards.registry.tsx):
 *    layers: ['event-details', 'wedding', 'crypto-stonks', 'code-triathlon', 'birthday']
 *
 * 3. Use only 2 layers:
 *    layers: ['event-details', 'code-triathlon']
 *
 * 4. Single layer (no tearing):
 *    layers: ['event-details']
 */
