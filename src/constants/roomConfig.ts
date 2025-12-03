// Centralized room configuration for Mystery.exe
// This file contains all room data, mappings, and metadata

export interface Room {
  code: string;
  level: number;
  department: string;
  roomNumber: string;
  name: string;
  description: string;
  clearance: string;
  theme?: string;
  clueImage: string;
  status: string;
  isFinal?: boolean;
}

export interface RoomMapping {
  from: string;
  to: string;
  description: string;
  hint: string;
}

// All rooms in the facility
export const ALL_ROOMS: Room[] = [
  // Level 1 Rooms
  {
    code: '1EC210',
    level: 1,
    department: 'EC',
    roomNumber: '210',
    name: 'Quantum Computing Lab',
    description: 'Advanced quantum processing facility',
    clearance: 'TOP SECRET',
    theme: 'Quantum Mechanics',
    clueImage: '/clues/1EC210.jpg',
    status: 'SCANNING FOR QUANTUM SIGNATURES...'
  },
  {
    code: '1EC211',
    level: 1,
    department: 'EC',
    roomNumber: '211',
    name: 'Neural Network Hub',
    description: 'Deep learning and AI research center',
    clearance: 'CLASSIFIED',
    theme: 'Artificial Intelligence',
    clueImage: '/clues/1EC211.jpg',
    status: 'NEURAL NETWORKS ACTIVE...'
  },
  {
    code: '1EC205',
    level: 1,
    department: 'EC',
    roomNumber: '205',
    name: 'Cybersecurity Operations',
    description: 'Digital defense and encryption research',
    clearance: 'RESTRICTED',
    theme: 'Cybersecurity',
    clueImage: '/clues/1EC205.jpg',
    status: 'ENCRYPTION PROTOCOLS ENGAGED...'
  },
  {
    code: '1EC204',
    level: 1,
    department: 'EC',
    roomNumber: '204',
    name: 'Data Analytics Center',
    description: 'Big data processing and analytics',
    clearance: 'CONFIDENTIAL',
    theme: 'Data Science',
    clueImage: '/clues/1EC204.jpg',
    status: 'DATA STREAMS ANALYZING...'
  },

  // Level 2 Rooms
  {
    code: '2EC212',
    level: 2,
    department: 'EC',
    roomNumber: '212',
    name: 'Quantum Entanglement Lab',
    description: 'Advanced quantum entanglement research',
    clearance: 'ULTRA SECRET',
    theme: 'Quantum Entanglement',
    clueImage: '/clues/2EC212.jpg',
    status: 'ENTANGLEMENT FIELD DETECTED...'
  },
  {
    code: '2EC213',
    level: 2,
    department: 'EC',
    roomNumber: '213',
    name: 'AI Consciousness Research',
    description: 'Artificial consciousness and AGI development',
    clearance: 'COSMIC SECRET',
    theme: 'Artificial Consciousness',
    clueImage: '/clues/2EC213.jpg',
    status: 'CONSCIOUSNESS MATRIX LOADING...'
  },
  {
    code: '2EC203',
    level: 2,
    department: 'EC',
    roomNumber: '203',
    name: 'Temporal Computing Lab',
    description: 'Time-based computing and prediction algorithms',
    clearance: 'TIME SECRET',
    theme: 'Temporal Computing',
    clueImage: '/clues/2EC203.jpg',
    status: 'TEMPORAL ANOMALY DETECTED...'
  },
  {
    code: '2EC202',
    level: 2,
    department: 'EC',
    roomNumber: '202',
    name: 'Holographic Data Storage',
    description: 'Next-generation holographic storage systems',
    clearance: 'DIMENSIONAL SECRET',
    theme: 'Holographic Storage',
    clueImage: '/clues/2EC202.jpg',
    status: 'HOLOGRAPHIC PROJECTION ACTIVE...'
  },

  // Level 3 Final Rooms
  {
    code: '3FINAL01',
    level: 3,
    department: 'FINAL',
    roomNumber: '01',
    name: 'The Quantum Nexus',
    description: 'The convergence point of all quantum possibilities',
    clearance: 'OMEGA SECRET',
    theme: 'Ultimate Convergence',
    clueImage: '/clues/3FINAL01.jpg',
    status: 'QUANTUM CONVERGENCE DETECTED...',
    isFinal: true
  },
  {
    code: '3FINAL02',
    level: 3,
    department: 'FINAL',
    roomNumber: '02',
    name: 'The Singularity Chamber',
    description: 'Where artificial consciousness achieves enlightenment',
    clearance: 'DELTA SECRET',
    theme: 'Technological Singularity',
    clueImage: '/clues/3FINAL02.jpg',
    status: 'SINGULARITY APPROACHING...',
    isFinal: true
  },
  {
    code: '3FINAL03',
    level: 3,
    department: 'FINAL',
    roomNumber: '03',
    name: 'The Time Vault',
    description: 'Repository of temporal anomalies and chronal secrets',
    clearance: 'CHRONO SECRET',
    theme: 'Temporal Mastery',
    clueImage: '/clues/3FINAL03.jpg',
    status: 'TEMPORAL ANOMALIES CONTAINED...',
    isFinal: true
  },
  {
    code: '3FINAL04',
    level: 3,
    department: 'FINAL',
    roomNumber: '04',
    name: 'The Memory Palace',
    description: 'Infinite storage of collective human knowledge',
    clearance: 'ARCHIVE SECRET',
    theme: 'Infinite Knowledge',
    clueImage: '/clues/3FINAL04.jpg',
    status: 'INFINITE KNOWLEDGE ACCESSED...',
    isFinal: true
  }
];

// Room progression mappings
export const ROOM_MAPPINGS: Record<string, RoomMapping> = {
  // Level 1 → Level 2 mappings
  '1EC210': {
    from: '1EC210',
    to: '2EC212',
    description: 'Quantum Computing Lab leads to Quantum Entanglement Lab',
    hint: 'Follow the entangled particles...'
  },
  '1EC211': {
    from: '1EC211',
    to: '2EC213',
    description: 'Neural Network Hub leads to AI Consciousness Research',
    hint: 'The network becomes aware...'
  },
  '1EC205': {
    from: '1EC205',
    to: '2EC203',
    description: 'Cybersecurity Operations leads to Temporal Computing Lab',
    hint: 'Time is the ultimate firewall...'
  },
  '1EC204': {
    from: '1EC204',
    to: '2EC202',
    description: 'Data Analytics Center leads to Holographic Data Storage',
    hint: 'Data exists in multiple dimensions...'
  },

  // Level 2 → Level 3 mappings
  '2EC212': {
    from: '2EC212',
    to: '3FINAL01',
    description: 'Quantum Entanglement Lab leads to The Quantum Nexus',
    hint: 'All paths converge in the quantum realm...'
  },
  '2EC213': {
    from: '2EC213',
    to: '3FINAL02',
    description: 'AI Consciousness Research leads to The Singularity Chamber',
    hint: 'Consciousness transcends silicon...'
  },
  '2EC203': {
    from: '2EC203',
    to: '3FINAL03',
    description: 'Temporal Computing Lab leads to The Time Vault',
    hint: 'Past, present, and future align...'
  },
  '2EC202': {
    from: '2EC202',
    to: '3FINAL04',
    description: 'Holographic Data Storage leads to The Memory Palace',
    hint: 'All knowledge resides within...'
  }
};

// Helper functions
export const getRoomByCode = (code: string): Room | undefined => {
  return ALL_ROOMS.find(room => room.code === code);
};

export const getRoomsByLevel = (level: number): Room[] => {
  return ALL_ROOMS.filter(room => room.level === level);
};

export const getNextRoom = (currentCode: string): string | null => {
  const mapping = ROOM_MAPPINGS[currentCode];
  return mapping ? mapping.to : null;
};

export const getRoomMapping = (currentCode: string): RoomMapping | null => {
  return ROOM_MAPPINGS[currentCode] || null;
};

export const isValidRoomCode = (code: string): boolean => {
  return ALL_ROOMS.some(room => room.code === code);
};

export const isFinalRoom = (code: string): boolean => {
  const room = getRoomByCode(code);
  return room ? room.isFinal === true : false;
};

export const getRoomLevel = (code: string): number => {
  const room = getRoomByCode(code);
  return room ? room.level : 0;
};

// Validation data for the home page
export const VALID_ROOM_CODES = {
  level1: ['EC210', 'EC211', 'EC205', 'EC204'],
  level2: ['EC212', 'EC213', 'EC203', 'EC202'],
  level3: ['FINAL01', 'FINAL02', 'FINAL03', 'FINAL04']
};

// Room themes for additional categorization
export const ROOM_THEMES = {
  quantum: ['1EC210', '2EC212', '3FINAL01'],
  ai: ['1EC211', '2EC213', '3FINAL02'],
  security: ['1EC205', '2EC203', '3FINAL03'],
  data: ['1EC204', '2EC202', '3FINAL04']
};
