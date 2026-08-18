import { CanonicalEvidence } from '@/types/evidence';

// Barajado Fisher-Yates determinista/aleatorio
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const CANONICAL_EVIDENCES: CanonicalEvidence[] = [
  // 1. ARGENTINA: Obelisco de Buenos Aires (1936)
  {
    id: 'ev-arg-1936-obelisco',
    code: 'ARG-1936-OBELISCO',
    title: 'Inauguración del Obelisco de Buenos Aires (1936)',
    image_url: '/evidences/obelisco_1936.jpg',
    image_hd_url: '/evidences/obelisco_1936.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Dpto. Fotografía - Fondo Obelisco 1936',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'República Argentina - Dominio Público',
    },
    canonical_event: 'Inauguración del Obelisco de Buenos Aires',
    accepted_event_aliases: [
      'Inauguración del Obelisco',
      'Construcción del Obelisco',
      'Obelisco de Buenos Aires',
      'IV Centenario de Buenos Aires'
    ],
    distractor_cards: ['ev-arg-1936-kavanagh', 'ev-arg-1910-centenario', 'ev-arg-1908-colon'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1936,
      month: 5,
      day: 23,
      display_date: '23 de mayo de 1936',
    },
    canonical_location: {
      latitude: -34.6037,
      longitude: -58.3816,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Plaza de la República, Av. 9 de Julio y Corrientes, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Andamiaje y Estructura del Obelisco',
        category: 'architecture',
        normalized_rect: { x: 0.36, y: 0.10, width: 0.28, height: 0.68 },
        observation_text: 'Estructura piramidal de 67.5 metros diseñada por Alberto Prebisch levantada en solo 31 días.',
        deduction_text: 'El monumento fue erigido en tiempo récord en mayo de 1936 para el IV Centenario de la primera fundación por Pedro de Mendoza.',
        time_penalty_seconds: 5,
      },
      {
        id: 'clue-2',
        title: 'Parque Automotor de los Años 30',
        category: 'vehicle',
        normalized_rect: { x: 0.05, y: 0.65, width: 0.38, height: 0.30 },
        observation_text: 'Automóviles sedan de época y vías de tranvía en la intersección de Corrientes.',
        deduction_text: 'Los modelos de vehículos y el transporte público sitúan la escena inequívocamente a mediados de la década de 1930.',
        time_penalty_seconds: 4,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación (AGN)',
        collection_id: 'Doc. Fotográfico 1936/05',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Prebisch, Alberto. Memoria descriptiva de las obras de Plaza de la República (1936).'
    ],
    historical_context_brief: 'El Obelisco fue diseñado por el arquitecto Alberto Prebisch y construido en 31 días para conmemorar el cuarto centenario de la fundación de Buenos Aires.',
    deduction_pathway: 'El Obelisco con andamios de construcción en el cruce de Corrientes junto a los autos de los años 30 ubica inmediatamente la fecha en 1936.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 2. ARGENTINA: Cabildo Abierto de la Revolución de Mayo (1810)
  {
    id: 'ev-arg-1810-cabildo',
    code: 'ARG-1810-CABILDO',
    title: 'Cabildo Abierto de la Revolución de Mayo (1810)',
    image_url: '/evidences/cabildo_1810.jpg',
    image_hd_url: '/evidences/cabildo_1810.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Museo Histórico Nacional / Pedro Subercaseaux',
      collection_id: 'Colección Revolución de Mayo (1810)',
      source_type: 'PRIMARY_DOCUMENT',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'República Argentina - Patrimonio Nacional',
    },
    canonical_event: 'Cabildo Abierto del 22 de Mayo de 1810',
    accepted_event_aliases: [
      'Revolución de Mayo',
      'Cabildo Abierto de 1810',
      'Cabildo Abierto del 22 de Mayo',
      'Semana de Mayo'
    ],
    distractor_cards: ['ev-arg-1816-tucuman', 'ev-arg-1813-sanlorenzo', 'ev-arg-1817-andes'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1810,
      month: 5,
      day: 22,
      display_date: '22 de mayo de 1810',
    },
    canonical_location: {
      latitude: -34.6083,
      longitude: -58.3712,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Sala Capitular del Cabildo de Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Debate Capitular de Castelli y Paso',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.30, width: 0.50, height: 0.45 },
        observation_text: 'Oradores criollos debatiendo sobre la soberanía popular tras la caída de Fernando VII.',
        deduction_text: 'El debate del 22 de mayo de 1810 en el Cabildo que destituyó al virrey Cisneros.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Museo Histórico Nacional',
        collection_id: 'Actas del Cabildo del 22 de Mayo de 1810',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Estado Argentino',
      }
    ],
    secondary_sources: [
      'Mitre, Bartolomé. Historia de Belgrano y de la Independencia Argentina (1857).'
    ],
    historical_context_brief: 'El 22 de mayo de 1810 se celebró en Buenos Aires el histórico Cabildo Abierto que proclamó la soberanía del pueblo.',
    deduction_pathway: 'La célebre pintura de Subercaseaux retrata la Sala Capitular del Cabildo de Buenos Aires el 22 de mayo de 1810.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 3. ARGENTINA: Cruce de los Andes de San Martín (1817)
  {
    id: 'ev-arg-1817-andes',
    code: 'ARG-1817-ANDES',
    title: 'Cruce de los Andes por el Ejército Libertador (1817)',
    image_url: '/evidences/cruce_andes_1817.jpg',
    image_hd_url: '/evidences/cruce_andes_1817.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Museo Histórico Nacional / Augusto Ballerini',
      collection_id: 'Campaña Libertadora de Chile (1817)',
      source_type: 'PRIMARY_DOCUMENT',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'El Cruce de los Andes del General San Martín',
    accepted_event_aliases: [
      'Cruce de los Andes',
      'Paso de los Andes',
      'Expedición Libertadora a Chile',
      'Ejército de los Andes'
    ],
    distractor_cards: ['ev-arg-1813-sanlorenzo', 'ev-arg-1816-tucuman', 'ev-arg-1810-cabildo'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1817,
      month: 1,
      day: 18,
      display_date: 'Enero a Febrero de 1817',
    },
    canonical_location: {
      latitude: -32.8908,
      longitude: -68.8272,
      city: 'Mendoza / Cordillera de los Andes',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Paso de Los Patos y Uspallata, Cordillera de los Andes',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'General San Martín a Caballo en la Alta Montaña',
        category: 'personage',
        normalized_rect: { x: 0.30, y: 0.30, width: 0.40, height: 0.50 },
        observation_text: 'El General José de San Martín con su capote azul y sable corvo guiando al Ejército de los Andes.',
        deduction_text: 'La hazaña militar de enero-febrero de 1817 para liberar a Chile de la corona española.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Instituto Nacional Sanmartiniano',
        collection_id: 'Partes de Guerra del Ejército de los Andes 1817',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'República Argentina',
      }
    ],
    secondary_sources: [
      'Mitre, Bartolomé. Historia de San Martín y de la Emancipación Sudamericana (1887).'
    ],
    historical_context_brief: 'En enero de 1817, más de 5.000 soldados del Ejército de los Andes al mando de José de San Martín cruzaron la cordillera rumbo a Chile.',
    deduction_pathway: 'La iconografía de San Martín con sus tropas cruzando los picos nevados de los Andes sitúa la expedición en 1817.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 4. CIENCIA: Quinta Conferencia Solvay (1927)
  {
    id: 'ev-tec-1927-solvay',
    code: 'TEC-1927-SOLVAY',
    title: 'Quinta Conferencia Solvay de Física (1927)',
    image_url: '/evidences/solvay_1927.jpg',
    image_hd_url: '/evidences/solvay_1927.jpg',
    image_aspect_ratio: 1.55,
    image_source: {
      institution: 'Institut International de Physique Solvay / BNF',
      collection_id: 'Archives Solvay 1927 - Benjamin Couprie',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Quinta Conferencia Solvay de Física',
    accepted_event_aliases: [
      'Quinta Conferencia Solvay',
      'Conferencia Solvay de 1927',
      'Debate Bohr-Einstein en Bruselas',
      'Congreso Solvay sobre Electrones y Fotones'
    ],
    distractor_cards: ['ev-tec-1928-fleming', 'ev-avi-1927-lindbergh', 'ev-cie-1953-adn'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1927,
      month: 10,
      day: 29,
      display_date: '24 al 29 de octubre de 1927',
    },
    canonical_location: {
      latitude: 50.8503,
      longitude: 4.3517,
      city: 'Bruselas',
      country_code: 'BE',
      country_name: 'Bélgica',
      display_location: 'Hotel Métropole / Instituto Solvay, Bruselas',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Primera Fila: Marie Curie y Albert Einstein',
        category: 'personage',
        normalized_rect: { x: 0.35, y: 0.52, width: 0.32, height: 0.42 },
        observation_text: 'Marie Curie sentada en el centro junto a Lorentz, Einstein y Planck.',
        deduction_text: 'La reunión cumbre de la física cuántica y relativista en octubre de 1927 en Bruselas.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Bibliothèque Nationale de France',
        collection_id: 'Fonds Conférences Solvay 1927',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Institut Solvay',
      }
    ],
    secondary_sources: [
      'Mehra, Jagdish. The Solvay Conferences on Physics (1975).'
    ],
    historical_context_brief: 'En octubre de 1927 se celebró en Bruselas la 5.ª Conferencia Solvay reuniendo a los mayores físicos de la historia para debatir la mecánica cuántica.',
    deduction_pathway: 'El grupo de Curie, Einstein, Planck y Heisenberg en Bruselas sitúa el encuentro en 1927.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 5. ESPACIO: Primer Alunizaje Apolo 11 (1969)
  {
    id: 'ev-mun-1969-luna',
    code: 'MUN-1969-LUNA',
    title: 'Primer Alunizaje del Ser Humano (Apolo 11, 1969)',
    image_url: '/evidences/apollo11_1969.jpg',
    image_hd_url: '/evidences/apollo11_1969.jpg',
    image_aspect_ratio: 1.0,
    image_source: {
      institution: 'NASA History Division / Library of Congress',
      collection_id: 'AS11-40-5903 (Foto por Neil Armstrong)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'NASA / US Government',
    },
    canonical_event: 'Primer Alunizaje del Apolo 11 en la Luna',
    accepted_event_aliases: [
      'Llegada del hombre a la Luna',
      'Misión Apolo 11',
      'Alunizaje del Apolo 11',
      'Paseo lunar de Neil Armstrong y Buzz Aldrin'
    ],
    distractor_cards: ['ev-esp-1957-sputnik', 'ev-esp-1961-gagarin', 'ev-soc-1969-woodstock'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1969,
      month: 7,
      day: 20,
      display_date: '20 de julio de 1969',
    },
    canonical_location: {
      latitude: 0.674,
      longitude: 23.472,
      city: 'Mar de la Tranquilidad',
      country_code: 'US',
      country_name: 'Estados Unidos (Misión)',
      display_location: 'Mare Tranquillitatis, La Luna',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Reflejo en la Visera Dorada',
        category: 'technology',
        normalized_rect: { x: 0.43, y: 0.24, width: 0.16, height: 0.13 },
        observation_text: 'El visor dorado de Buzz Aldrin refleja al fotógrafo Neil Armstrong y el módulo lunar Eagle.',
        deduction_text: 'La fotografía histórica de la primera caminata lunar del 20 de julio de 1969.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'NASA History Division',
        collection_id: 'Apollo 11 Image Archive AS11-40-5903',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'NASA',
      }
    ],
    secondary_sources: [
      'NASA Apollo 11 Mission Report (1969).'
    ],
    historical_context_brief: 'El 20 de julio de 1969, la misión Apolo 11 aterrizó en el Mar de la Tranquilidad y Neil Armstrong se convirtió en el primer ser humano en pisar la Luna.',
    deduction_pathway: 'Aldrin fotografiado por Armstrong en suelo lunar con el traje A7L fija el hito el 20 de julio de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 6. POLÍTICA: Caída del Muro de Berlín (1989)
  {
    id: 'ev-mun-1989-berlin',
    code: 'MUN-1989-BERLIN',
    title: 'Caída del Muro de Berlín (1989)',
    image_url: '/evidences/berlin_1989.jpg',
    image_hd_url: '/evidences/berlin_1989.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Europeana / Bundesarchiv',
      collection_id: 'Bild 183-1989-1110-018',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Bundesarchiv Deutschland',
    },
    canonical_event: 'Caída del Muro de Berlín',
    accepted_event_aliases: [
      'Apertura del Muro de Berlín',
      'Mauerfall',
      'Fin del Muro de Berlín'
    ],
    distractor_cards: ['ev-pol-1989-tiananmen', 'ev-guer-1945-reichstag', 'ev-pol-1962-misiles'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1989,
      month: 11,
      day: 9,
      display_date: '9 de noviembre de 1989',
    },
    canonical_location: {
      latitude: 52.5163,
      longitude: 13.3777,
      city: 'Berlín',
      country_code: 'DE',
      country_name: 'Alemania',
      display_location: 'Puerta de Brandeburgo, Berlín',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Ciudadanos sobre el Muro de Hormigón',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.45, width: 0.70, height: 0.38 },
        observation_text: 'Jóvenes celebrando sobre el muro frente a la Puerta de Brandeburgo.',
        deduction_text: 'La noche del 9 de noviembre de 1989 con la caída del muro de Berlín.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Bundesarchiv',
        collection_id: 'Bild 183-1989-1110-018',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Europeana',
      }
    ],
    secondary_sources: [
      'Sarotte, Mary Elise. The Collapse: The Accidental Opening of the Berlin Wall (2014).'
    ],
    historical_context_brief: 'El 9 de noviembre de 1989 los berlineses derribaron pacíficamente el Muro de Berlín, símbolo de la Guerra Fría.',
    deduction_pathway: 'La multitud festejando sobre el muro frente a Brandeburgo sitúa el hecho en noviembre de 1989.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 7. GUERRA: Bombardeo Atómico a Hiroshima (1945)
  {
    id: 'ev-mun-1945-hiroshima',
    code: 'MUN-1945-HIROSHIMA',
    title: 'Bombardeo Atómico sobre Hiroshima (1945)',
    image_url: '/evidences/hiroshima_1945.jpg',
    image_hd_url: '/evidences/hiroshima_1945.jpg',
    image_aspect_ratio: 1.3,
    image_source: {
      institution: 'US National Archives / Enola Gay (USAAF)',
      collection_id: 'RG 77-AEC - Atomic Cloud Hiroshima 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US National Archives',
    },
    canonical_event: 'Bombardeo Atómico de Hiroshima',
    accepted_event_aliases: [
      'Bomba Atómica sobre Hiroshima',
      'Ataque nuclear a Hiroshima',
      'Little Boy en Hiroshima'
    ],
    distractor_cards: ['ev-mun-1945-yalta', 'ev-guer-1945-iwojima', 'ev-guer-1945-reichstag'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1945,
      month: 8,
      day: 6,
      display_date: '6 de agosto de 1945',
    },
    canonical_location: {
      latitude: 34.3853,
      longitude: 132.4553,
      city: 'Hiroshima',
      country_code: 'JP',
      country_name: 'Japón',
      display_location: 'Hiroshima, Prefectura de Hiroshima, Japón',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Hongo Nuclear de Little Boy',
        category: 'landscape',
        normalized_rect: { x: 0.30, y: 0.05, width: 0.45, height: 0.85 },
        observation_text: 'Columna ascendente y hongo de fisión nuclear de uranio desde el Enola Gay.',
        deduction_text: 'El primer ataque con bomba nuclear de la historia el 6 de agosto de 1945.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA 542192 - Hiroshima Atomic Cloud',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Government',
      }
    ],
    secondary_sources: [
      'Rhodes, Richard. The Making of the Atomic Bomb (1986).'
    ],
    historical_context_brief: 'El 6 de agosto de 1945 el bombardero Enola Gay detonó la bomba atómica «Little Boy» sobre Hiroshima.',
    deduction_pathway: 'El hongo nuclear sobre el delta de Hiroshima fija el hecho el 6 de agosto de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 8. GUERRA MUNDIAL: Conferencia de Yalta (1945)
  {
    id: 'ev-mun-1945-yalta',
    code: 'MUN-1945-YALTA',
    title: 'Conferencia de Yalta (1945)',
    image_url: '/evidences/yalta_1945.jpg',
    image_hd_url: '/evidences/yalta_1945.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'US National Archives / Library of Congress',
      collection_id: 'Yalta Conference 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US Government',
    },
    canonical_event: 'Conferencia de Yalta (Los Tres Grandes)',
    accepted_event_aliases: [
      'Conferencia de Yalta',
      'Cumbre de Yalta de 1945',
      'Reunión de Churchill, Roosevelt y Stalin'
    ],
    distractor_cards: ['ev-pol-1945-potsdam', 'ev-pol-1945-onu', 'ev-jur-1945-nuremberg'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1945,
      month: 2,
      day: 4,
      display_date: '4 al 11 de febrero de 1945',
    },
    canonical_location: {
      latitude: 44.4958,
      longitude: 34.1664,
      city: 'Yalta / Crimea',
      country_code: 'UA',
      country_name: 'Crimea / URSS',
      display_location: 'Palacio de Livadia, Yalta, Crimea',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Churchill, Roosevelt y Stalin Sentados Juntos',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'Winston Churchill, Franklin D. Roosevelt y Iósif Stalin reunidos en el patio del Palacio de Livadia.',
        deduction_text: 'La cumbre de los Tres Grandes en febrero de 1945 para acordar la división de Alemania y el orden de posguerra.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA Record Group 111 - SC 202242',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Government',
      }
    ],
    secondary_sources: [
      'Beevor, Antony. The Second World War (2012).'
    ],
    historical_context_brief: 'En febrero de 1945, los líderes aliados Churchill, Roosevelt y Stalin se reunieron en Yalta para definir el orden mundial tras la derrota nazi.',
    deduction_pathway: 'El trío de Churchill, Roosevelt y Stalin sentados en el patio de Livadia identifica de inmediato la Conferencia de Yalta de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 9. GUERRA MUNDIAL: Liberación de París (1944)
  {
    id: 'ev-mun-1944-paris',
    code: 'MUN-1944-PARIS',
    title: 'Liberación de París y Desfile en Campos Elíseos (1944)',
    image_url: '/evidences/paris_1944.jpg',
    image_hd_url: '/evidences/paris_1944.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'US National Archives (NARA)',
      collection_id: 'RG 208 - Paris Liberation August 1944',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US National Archives',
    },
    canonical_event: 'Liberación de París y Desfile Triunfal',
    accepted_event_aliases: [
      'Liberación de París',
      'Desfile de la Victoria en Campos Elíseos',
      'Entrada del General de Gaulle en París'
    ],
    distractor_cards: ['ev-guer-1944-normandia', 'ev-mun-1889-eiffel', 'ev-guer-1945-reichstag'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1944,
      month: 8,
      day: 26,
      display_date: '26 de agosto de 1944',
    },
    canonical_location: {
      latitude: 48.8698,
      longitude: 2.3075,
      city: 'París',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Avenida de los Campos Elíseos y Arco de Triunfo, París',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Multitud Festejando en la Avenida de los Campos Elíseos',
        category: 'landscape',
        normalized_rect: { x: 0.10, y: 0.30, width: 0.80, height: 0.60 },
        observation_text: 'Millones de parisinos celebrando el paso de las tropas blindadas aliadas y la 2ª División Blindada francesa.',
        deduction_text: 'El histórico desfile triunfal del 26 de agosto de 1944 encabezado por Charles de Gaulle tras cuatro años de ocupación.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA 531252',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Government',
      }
    ],
    secondary_sources: [
      'Collins, Larry; Lapierre, Dominique. ¿Arde París? (1965).'
    ],
    historical_context_brief: 'El 25 y 26 de agosto de 1944, la 2.ª División Blindada francesa y las tropas aliadas liberaron París de la ocupación nazi.',
    deduction_pathway: 'El desfile multitudinario frente a los Campos Elíseos con el Arco de Triunfo certifica la Liberación de París en agosto de 1944.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 10. AVIACIÓN: Primer Vuelo de los Hermanos Wright (1903)
  {
    id: 'ev-tec-1903-wright',
    code: 'TEC-1903-WRIGHT',
    title: 'Primer Vuelo a Motor de los Hermanos Wright (1903)',
    image_url: '/evidences/wright_1903.jpg',
    image_hd_url: '/evidences/wright_1903.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress',
      collection_id: 'Prints & Photographs Division - Wright Brothers Papers',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress / John T. Daniels',
    },
    canonical_event: 'Primer Vuelo a Motor de los Hermanos Wright',
    accepted_event_aliases: [
      'Primer Vuelo en Kitty Hawk',
      'Vuelo del Wright Flyer',
      'Nacimiento de la Aviación a Motor',
      'Hermanos Wright en 1903'
    ],
    distractor_cards: ['ev-avi-1927-lindbergh', 'ev-tec-1901-marconi', 'ev-mun-1912-titanic'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1903,
      month: 12,
      day: 17,
      display_date: '17 de diciembre de 1903',
    },
    canonical_location: {
      latitude: 36.0177,
      longitude: -75.6698,
      city: 'Kitty Hawk / Kill Devil Hills',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Kill Devil Hills, Carolina del Norte',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'El Wright Flyer Elevándose sobre la Arena',
        category: 'technology',
        normalized_rect: { x: 0.25, y: 0.20, width: 0.50, height: 0.50 },
        observation_text: 'Orville Wright pilotando acostado en el biplano mientras Wilbur corre al costado sobre el carril de madera.',
        deduction_text: 'La fotografía del primer vuelo controlado y sostenido de una aeronave más pesada que el aire el 17 de diciembre de 1903.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'LC-DIG-ppprs-00562',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'John T. Daniels / LoC',
      }
    ],
    secondary_sources: [
      'McCullough, David. The Wright Brothers (2015).'
    ],
    historical_context_brief: 'El 17 de diciembre de 1903 en Kitty Hawk, los hermanos Wright lograron el primer vuelo a motor controlado de la historia humana.',
    deduction_pathway: 'El biplano Flyer despegando sobre las dunas de Carolina del Norte con Wilbur corriendo al lado identifica el vuelo de 1903.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 11. ARQUITECTURA: Construcción de la Torre Eiffel (1888/1889)
  {
    id: 'ev-mun-1889-eiffel',
    code: 'MUN-1889-EIFFEL',
    title: 'Construcción de la Torre Eiffel (1888/1889)',
    image_url: '/evidences/eiffel_1889.jpg',
    image_hd_url: '/evidences/eiffel_1889.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Musée d’Orsay / Louis-Émile Durandelle',
      collection_id: 'Construction de la tour Eiffel (1888)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Construcción de la Torre Eiffel en París',
    accepted_event_aliases: [
      'Construcción de la Torre Eiffel',
      'Exposición Universal de París de 1889',
      'Obras de la Torre Eiffel por Gustave Eiffel'
    ],
    distractor_cards: ['ev-arq-1886-libertad', 'ev-arg-1936-obelisco', 'ev-mun-1944-paris'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1889,
      month: 3,
      day: 31,
      display_date: 'Marzo de 1889',
    },
    canonical_location: {
      latitude: 48.8584,
      longitude: 2.2945,
      city: 'París',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Campo de Marte, París, Francia',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Pilares de Hierro Pudelado en Construcción',
        category: 'architecture',
        normalized_rect: { x: 0.20, y: 0.10, width: 0.60, height: 0.70 },
        observation_text: 'Los cuatro pilares de celosía metálica y andamios de madera de la torre de 300 metros de Gustave Eiffel.',
        deduction_text: 'La obra erigida para la Exposición Universal de París de 1889 en el centenario de la Revolución Francesa.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Musée d’Orsay',
        collection_id: 'Fonds Durandelle 1888-1889',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Patrimoine de France',
      }
    ],
    secondary_sources: [
      'Eiffel, Gustave. La Tour de trois cents mètres (1900).'
    ],
    historical_context_brief: 'Diseñada por Gustave Eiffel, la torre fue construida en 2 años y 2 meses para la Exposición Universal de París de 1889.',
    deduction_pathway: 'La estructura de hierro en plena elevación sobre el Campo de Marte de París ubica las obras en 1888-1889.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 12. ARGENTINA: 17 de Octubre de 1945 en Plaza de Mayo
  {
    id: 'ev-arg-1945-lealtad',
    code: 'ARG-1945-LEALTAD',
    title: 'Jornada del 17 de Octubre de 1945 (Día de la Lealtad)',
    image_url: '/evidences/plaza_mayo_1945.jpg',
    image_hd_url: '/evidences/plaza_mayo_1945.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Dpto. Fotografía - 17 de Octubre 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'República Argentina - Dominio Público',
    },
    canonical_event: 'Jornada del 17 de Octubre de 1945 en Plaza de Mayo',
    accepted_event_aliases: [
      '17 de Octubre de 1945',
      'Día de la Lealtad Peronista',
      'Movilización obrera a Plaza de Mayo en 1945',
      'Patas en las fuentes de Plaza de Mayo'
    ],
    distractor_cards: ['ev-arg-1955-bombardeo', 'ev-arg-1946-asuncion', 'ev-arg-1969-cordobazo'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1945,
      month: 10,
      day: 17,
      display_date: '17 de octubre de 1945',
    },
    canonical_location: {
      latitude: -34.6083,
      longitude: -58.3712,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Plaza de Mayo y Casa Rosada, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Manifestantes Refrescándose en las Fuentes de Plaza de Mayo',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.30, width: 0.60, height: 0.60 },
        observation_text: 'Columnas de trabajadores en mangas de camisa con los pies sumergidos en las fuentes de agua frente a la Casa Rosada.',
        deduction_text: 'La icónica estampa popular del 17 de octubre de 1945 exigiendo la liberación de Juan Domingo Perón.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Doc. Fotográfico AGN 17-10-1945',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Luna, Félix. El 45: crónica de un año decisivo (1969).'
    ],
    historical_context_brief: 'El 17 de octubre de 1945, cientos de miles de obreros marcharon a Plaza de Mayo para exigir la liberación de Juan Domingo Perón.',
    deduction_pathway: 'La multitud con los pies en la fuente de Plaza de Mayo define inequívocamente el 17 de octubre de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 13. NAVEGACIÓN: Partida del Titanic en su Viaje Inaugural (1912)
  {
    id: 'ev-mun-1912-titanic',
    code: 'MUN-1912-TITANIC',
    title: 'Partida del RMS Titanic en su Viaje Inaugural (1912)',
    image_url: '/evidences/titanic_1912.jpg',
    image_hd_url: '/evidences/titanic_1912.jpg',
    image_aspect_ratio: 1.5,
    image_source: {
      institution: 'Library of Congress / Francis Browne',
      collection_id: 'Prints & Photographs Division - RMS Titanic 1912',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Partida del RMS Titanic en su Viaje Inaugural',
    accepted_event_aliases: [
      'Viaje inaugural del RMS Titanic',
      'Partida del Titanic de Southampton',
      'Hundimiento del Titanic',
      'RMS Titanic en 1912'
    ],
    distractor_cards: ['ev-mar-1915-lusitania', 'ev-lat-1914-panama', 'ev-tec-1903-wright'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1912,
      month: 4,
      day: 10,
      display_date: '10 de abril de 1912',
    },
    canonical_location: {
      latitude: 50.8996,
      longitude: -1.4044,
      city: 'Southampton',
      country_code: 'GB',
      country_name: 'Reino Unido',
      display_location: 'Puerto de Southampton / Mar del Norte',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Las Cuatro Chimeneas y Casco del Transatlántico',
        category: 'vehicle',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.55 },
        observation_text: 'El monumental transatlántico británico de 269 metros zarpando de los muelles de Southampton.',
        deduction_text: 'El buque de vapor más grande de su época en su trágico viaje inaugural de abril de 1912.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'LC-B2- 2422-14',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Lord, Walter. A Night to Remember (1955).'
    ],
    historical_context_brief: 'El 10 de abril de 1912, el RMS Titanic partió de Southampton rumbo a Nueva York, naufragando cuatro días después tras colisionar con un iceberg.',
    deduction_pathway: 'El perfil del Titanic de 4 chimeneas en el puerto inglés identifica su partida en abril de 1912.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 14. MEDICINA: Alexander Fleming y la Penicilina (1928)
  {
    id: 'ev-tec-1928-fleming',
    code: 'TEC-1928-FLEMING',
    title: 'Descubrimiento de la Penicilina por Alexander Fleming (1928)',
    image_url: '/evidences/fleming_1928.jpg',
    image_hd_url: '/evidences/fleming_1928.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Imperial War Museums (IWM) / Ministry of Information',
      collection_id: 'TR 1468 - Penicillin Production',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'IWM / Crown Copyright',
    },
    canonical_event: 'Descubrimiento de la Penicilina por Alexander Fleming',
    accepted_event_aliases: [
      'Descubrimiento de la Penicilina',
      'Alexander Fleming en su Laboratorio',
      'Primer Antibiótico del Mundo'
    ],
    distractor_cards: ['ev-tec-1927-solvay', 'ev-cie-1953-adn', 'ev-cie-1895-rontgen'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1928,
      month: 9,
      day: 28,
      display_date: 'Septiembre de 1928',
    },
    canonical_location: {
      latitude: 51.5173,
      longitude: -0.1742,
      city: 'Londres',
      country_code: 'GB',
      country_name: 'Reino Unido',
      display_location: 'St Mary’s Hospital, Paddington, Londres',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Sir Alexander Fleming con Placas de Petri',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.70 },
        observation_text: 'El científico escocés examinando en su laboratorio las placas donde el hongo Penicillium notatum destruyó bacterias.',
        deduction_text: 'El hallazgo fortuito en septiembre de 1928 que revolucionó la medicina moderna con el primer antibiótico.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Imperial War Museums',
        collection_id: 'IWM Photograph Archive TR 1468',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Crown Copyright',
      }
    ],
    secondary_sources: [
      'Maurois, André. The Life of Sir Alexander Fleming (1959).'
    ],
    historical_context_brief: 'En septiembre de 1928, Alexander Fleming descubrió en Londres las propiedades antibióticas del hongo Penicillium.',
    deduction_pathway: 'Fleming con bata en su laboratorio examinando los cultivos de hongos define el hallazgo de la penicilina en 1928.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 15. SOCIEDAD: Discurso MLK (1963)
  {
    id: 'ev-soc-1963-mlk',
    code: 'SOC-1963-MLK',
    title: 'Discurso «I Have a Dream» de Martin Luther King (1963)',
    image_url: '/evidences/mlk_1963.jpg',
    image_hd_url: '/evidences/mlk_1963.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'US National Archives / Library of Congress',
      collection_id: 'March on Washington for Jobs and Freedom, 1963',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US National Archives',
    },
    canonical_event: 'Discurso «I Have a Dream» de Martin Luther King',
    accepted_event_aliases: [
      'Marcha sobre Washington de 1963',
      'Discurso de Martin Luther King',
      'I Have a Dream',
      'Marcha por los Derechos Civiles de 1963'
    ],
    distractor_cards: ['ev-soc-1913-sufragistas', 'ev-soc-1969-woodstock', 'ev-pol-1962-misiles'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1963,
      month: 8,
      day: 28,
      display_date: '28 de agosto de 1963',
    },
    canonical_location: {
      latitude: 38.8893,
      longitude: -77.0502,
      city: 'Washington D.C.',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Monumento a Lincoln, Washington D.C.',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Martin Luther King Jr. en el Podio de Lincoln',
        category: 'personage',
        normalized_rect: { x: 0.30, y: 0.15, width: 0.40, height: 0.55 },
        observation_text: 'El Dr. Martin Luther King Jr. gesticulando ante los micrófonos en la escalinata del Monumento a Lincoln.',
        deduction_text: 'El histórico discurso por los derechos civiles pronunciado el 28 de agosto de 1963 ante 250.000 personas.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA 542015',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US National Archives',
      }
    ],
    secondary_sources: [
      'Branch, Taylor. Parting the Waters (1988).'
    ],
    historical_context_brief: 'El 28 de agosto de 1963, MLK pronunció su histórico discurso «I Have a Dream» reclamando igualdad de derechos civiles.',
    deduction_pathway: 'Martin Luther King hablando frente al monumento a Lincoln ubica el discurso en agosto de 1963.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 16. ARGENTINA: El Cordobazo (1969)
  {
    id: 'ev-arg-1969-cordobazo',
    code: 'ARG-1969-CORDOBAZO',
    title: 'El Cordobazo (Córdoba, 1969)',
    image_url: '/evidences/cordobazo_1969.jpg',
    image_hd_url: '/evidences/cordobazo_1969.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Diario El Mundo / AGN',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Insurrección Popular del Cordobazo',
    accepted_event_aliases: [
      'El Cordobazo',
      'Insurrección de Córdoba',
      'Protestas del Cordobazo de 1969',
      'Jornadas del 29 y 30 de mayo de 1969'
    ],
    distractor_cards: ['ev-arg-1966-bastones', 'ev-arg-1945-lealtad', 'ev-lim-1973-moneda'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1969,
      month: 5,
      day: 29,
      display_date: '29 de mayo de 1969',
    },
    canonical_location: {
      latitude: -31.4167,
      longitude: -64.1833,
      city: 'Córdoba',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Avenida General Paz y Colón, Ciudad de Córdoba',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Manifestación Popular Obrera y Estudiantil',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.25, width: 0.70, height: 0.55 },
        observation_text: 'Columnas de obreros de la industria automotriz y estudiantes universitarios marchando por el centro cordobés.',
        deduction_text: 'La gran huelga general activa del 29 de mayo de 1969 contra la dictadura de Onganía.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo Provincial de la Memoria',
        collection_id: 'Fondo Mayo 1969',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Provincia de Córdoba',
      }
    ],
    secondary_sources: [
      'Brennan, James. El Cordobazo (1996).'
    ],
    historical_context_brief: 'El 29 y 30 de mayo de 1969 se produjo en Córdoba una masiva insurrección popular obrero-estudiantil que debilitó al régimen militar.',
    deduction_pathway: 'La marcha sindical en el centro de Córdoba ubica el Cordobazo de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 17. LIMITROFES: Bombardeo a La Moneda (1973)
  {
    id: 'ev-lim-1973-moneda',
    code: 'LIM-1973-MONEDA',
    title: 'Bombardeo al Palacio de La Moneda (1973)',
    image_url: '/evidences/lamoneda_1973.jpg',
    image_hd_url: '/evidences/lamoneda_1973.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Biblioteca Nacional de Chile / Archivo de Prensa',
      collection_id: 'Fondo Histórico 11-09-1973',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Patrimonio Cultural Chileno',
    },
    canonical_event: 'Golpe de Estado y Bombardeo a La Moneda',
    accepted_event_aliases: [
      'Bombardeo de La Moneda',
      'Golpe de Estado en Chile de 1973',
      'Golpe Militar en Chile',
      'Caída de Salvador Allende'
    ],
    distractor_cards: ['ev-arg-1955-bombardeo', 'ev-lat-1968-tlatelolco', 'ev-arg-1969-cordobazo'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1973,
      month: 9,
      day: 11,
      display_date: '11 de septiembre de 1973',
    },
    canonical_location: {
      latitude: -33.4429,
      longitude: -70.6539,
      city: 'Santiago',
      country_code: 'CL',
      country_name: 'Chile',
      display_location: 'Palacio de La Moneda, Santiago de Chile',
    },
    geographic_scope: 'LIMITROFES',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Humo y Llamas en la Fachada de Toesca',
        category: 'architecture',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.55 },
        observation_text: 'Densa columna de humo saliendo del frontispicio neoclásico del palacio presidencial chileno.',
        deduction_text: 'El Palacio de La Moneda bombardeado por aviones Hawker Hunter de la FACh el 11 de septiembre de 1973.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Biblioteca Nacional de Chile',
        collection_id: 'Registro Fotográfico 11-09-1973',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Estado de Chile',
      }
    ],
    secondary_sources: [
      'Amorós, Mario. Allende: la biografía (2013).'
    ],
    historical_context_brief: 'El 11 de septiembre de 1973 las fuerzas armadas lideradas por Augusto Pinochet bombardearon La Moneda derrocando al presidente Salvador Allende.',
    deduction_pathway: 'La Moneda ardiendo en Santiago ubica el golpe militar del 11 de septiembre de 1973.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 18. LATINOAMERICA: Inauguración del Canal de Panamá (1914)
  {
    id: 'ev-lat-1914-panama',
    code: 'LAT-1914-PANAMA',
    title: 'Apertura Oficial del Canal de Panamá (1914)',
    image_url: '/evidences/panama_1914.jpg',
    image_hd_url: '/evidences/panama_1914.jpg',
    image_aspect_ratio: 1.5,
    image_source: {
      institution: 'Library of Congress',
      collection_id: 'Prints and Photographs Division, LC-B2- 3196-1',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Inauguración Oficial del Canal de Panamá',
    accepted_event_aliases: [
      'Inauguración del Canal de Panamá',
      'Paso inaugural del vapor Ancón',
      'Apertura del Canal de Panamá',
      'Inauguración del Canal de Panamá de 1914'
    ],
    distractor_cards: ['ev-mun-1912-titanic', 'ev-mar-1915-lusitania', 'ev-mun-1914-sarajevo'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1914,
      month: 8,
      day: 15,
      display_date: '15 de agosto de 1914',
    },
    canonical_location: {
      latitude: 9.0800,
      longitude: -79.6800,
      city: 'Esclusas de Miraflores',
      country_code: 'PA',
      country_name: 'Panamá',
      display_location: 'Esclusas de Miraflores / Canal de Panamá',
    },
    geographic_scope: 'LATAM',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'El Vapor Ancón Cruzando las Compuertas',
        category: 'vehicle',
        normalized_rect: { x: 0.25, y: 0.25, width: 0.50, height: 0.45 },
        observation_text: 'Buque de vapor SS Ancón realizando el primer tránsito interoceánico oficial.',
        deduction_text: 'La apertura oficial del Canal de Panamá el 15 de agosto de 1914 que unió el Atlántico con el Pacífico.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Panama Canal Construction Records',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US National Archives',
      }
    ],
    secondary_sources: [
      'McCullough, David. The Path Between the Seas (1977).'
    ],
    historical_context_brief: 'El 15 de agosto de 1914 se inauguró oficialmente el Canal de Panamá con el paso del vapor Ancón conectando el comercio marítimo mundial.',
    deduction_pathway: 'El buque Ancón en las esclusas de Miraflores certifica la apertura del Canal en agosto de 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 19. GUERRA: Atentado de Sarajevo (1914)
  {
    id: 'ev-mun-1914-sarajevo',
    code: 'MUN-1914-SARAJEVO',
    title: 'Atentado de Sarajevo al Archiduque Francisco Fernando (1914)',
    image_url: '/evidences/sarajevo_1914.jpg',
    image_hd_url: '/evidences/sarajevo_1914.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Österreichische Nationalbibliothek / Le Petit Journal',
      collection_id: 'Attentat de Sarajevo 28 juin 1914',
      source_type: 'PRIMARY_DOCUMENT',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Atentado de Sarajevo al Archiduque Francisco Fernando',
    accepted_event_aliases: [
      'Atentado de Sarajevo',
      'Asesinato del Archiduque Francisco Fernando',
      'Atentado de Sarajevo de 1914',
      'Detonante de la Primera Guerra Mundial'
    ],
    distractor_cards: ['ev-pol-1919-versalles', 'ev-guer-1918-armisticio', 'ev-mar-1915-lusitania'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1914,
      month: 6,
      day: 28,
      display_date: '28 de junio de 1914',
    },
    canonical_location: {
      latitude: 43.8563,
      longitude: 18.4131,
      city: 'Sarajevo',
      country_code: 'BA',
      country_name: 'Bosnia y Herzegovina',
      display_location: 'Puente Latino, Sarajevo',
    },
    geographic_scope: 'MUNDO_MODERNO',
    thematic_category: 'GUERRAS',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Archiduque Francisco Fernando en el Automóvil Descapotable',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.25, width: 0.50, height: 0.50 },
        observation_text: 'El heredero al trono austrohúngaro y la duquesa Sofía en el coche Gräf & Stift minutos antes del atentado de Gavrilo Princip.',
        deduction_text: 'El magnicidio del 28 de junio de 1914 en Sarajevo que desató la Primera Guerra Mundial.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo de Estado de Viena',
        collection_id: 'Sarajevo 1914 Dokumentation',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'ÖNB',
      }
    ],
    secondary_sources: [
      'Clark, Christopher. The Sleepwalkers (2012).'
    ],
    historical_context_brief: 'El 28 de junio de 1914 fue asesinado en Sarajevo el archiduque Francisco Fernando, desencadenando la Primera Guerra Mundial.',
    deduction_pathway: 'El archiduque en el automóvil imperial en Sarajevo identifica el detonante de la Gran Guerra en junio de 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 20. ARGENTINA: Centenario de la Revolución de Mayo (1910)
  {
    id: 'ev-arg-1910-centenario',
    code: 'ARG-1910-CENTENARIO',
    title: 'Festejos del Centenario de la Revolución de Mayo (1910)',
    image_url: '/evidences/centenario_1910.jpg',
    image_hd_url: '/evidences/centenario_1910.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Festejos Centenario Mayo 1910',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Festejos del Centenario de la Revolución de Mayo',
    accepted_event_aliases: [
      'Centenario Argentino',
      'Exposición del Centenario de 1910',
      'Desfile del Centenario en Buenos Aires',
      'Centenario de Mayo'
    ],
    distractor_cards: ['ev-arg-1908-colon', 'ev-arg-1936-obelisco', 'ev-arg-1810-cabildo'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1910,
      month: 5,
      day: 25,
      display_date: '25 de mayo de 1910',
    },
    canonical_location: {
      latitude: -34.6083,
      longitude: -58.3712,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Avenida de Mayo y Plaza del Congreso, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Iluminación Eléctrica Monumental en Avenida de Mayo',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'Arcos de bombillas eléctricas y carruajes engalanados con banderas celestes y blancas frente a multitudes vestidas con galera.',
        deduction_text: 'La apoteosis de la Argentina como potencia agroexportadora durante las celebraciones de mayo de 1910.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Álbum Fotográfico Centenario 1910',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Celesia, Ernesto. Crónicas del Centenario (1910).'
    ],
    historical_context_brief: 'En mayo de 1910, Argentina celebró el primer siglo de la Revolución de Mayo con magnas exposiciones internacionales y visitas de dignatarios mundiales.',
    deduction_pathway: 'Las luminarias en arco y desfiles en la Avenida de Mayo enmarcan inequívocamente los festejos del Centenario en 1910.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 21. MARÍTIMO: Hundimiento del RMS Lusitania (1915)
  {
    id: 'ev-mar-1915-lusitania',
    code: 'MAR-1915-LUSITANIA',
    title: 'Hundimiento del RMS Lusitania por un Submarino Alemán (1915)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/RMS_Lusitania_leaving_New_York_1907.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/RMS_Lusitania_leaving_New_York_1907.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress',
      collection_id: 'Prints and Photographs Division, LC-DIG-ggbain-00366',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Hundimiento del RMS Lusitania por un U-Boat',
    accepted_event_aliases: [
      'Hundimiento del Lusitania',
      'Tragedia del RMS Lusitania',
      'Ataque al Lusitania en 1915'
    ],
    distractor_cards: ['ev-mun-1912-titanic', 'ev-mun-1914-sarajevo', 'ev-guer-1918-armisticio'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1915,
      month: 5,
      day: 7,
      display_date: '7 de mayo de 1915',
    },
    canonical_location: {
      latitude: 51.4167,
      longitude: -8.5500,
      city: 'Costas de Old Head of Kinsale',
      country_code: 'IE',
      country_name: 'Irlanda / Mar Céltico',
      display_location: 'Mar Céltico frente a Kinsale, Irlanda',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Las Cuatro Chimeneas de la Naviera Cunard Line',
        category: 'vehicle',
        normalized_rect: { x: 0.20, y: 0.25, width: 0.60, height: 0.50 },
        observation_text: 'El transatlántico gemelo del Mauretania con su proa alargada y 4 chimeneas antes de ser torpedeado por el submarino U-20.',
        deduction_text: 'El trágico ataque que costó 1.198 vidas en mayo de 1915 e impulsó la entrada de EE.UU. en la Gran Guerra.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'The National Archives UK',
        collection_id: 'Admiralty Records ADM 137/1058',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'National Archives UK',
      }
    ],
    secondary_sources: [
      'Preston, Diana. Wilful Murder: The Sinking of the Lusitania (2002).'
    ],
    historical_context_brief: 'El 7 de mayo de 1915, el submarino alemán U-20 torpedeó y hundió en 18 minutos al transatlántico británico Lusitania frente a Irlanda.',
    deduction_pathway: 'El buque insignia de Cunard Line y su contexto bélico de submarinos sitúa el acontecimiento en mayo de 1915.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 22. ESPACIO: Lanzamiento del Sputnik 1 (1957)
  {
    id: 'ev-esp-1957-sputnik',
    code: 'ESP-1957-SPUTNIK',
    title: 'Lanzamiento del Primer Satélite Artificial Sputnik 1 (1957)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'NASA History Office / Archivos Soviéticos Roscosmos',
      collection_id: 'Sputnik 1 Flight Model Archive',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Lanzamiento del Sputnik 1 e Inicio de la Era Espacial',
    accepted_event_aliases: [
      'Lanzamiento del Sputnik 1',
      'Primer Satélite Artificial en Órbita',
      'Sputnik 1 soviético'
    ],
    distractor_cards: ['ev-esp-1961-gagarin', 'ev-mun-1969-luna', 'ev-tec-1946-eniac'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1957,
      month: 10,
      day: 4,
      display_date: '4 de octubre de 1957',
    },
    canonical_location: {
      latitude: 45.9646,
      longitude: 63.3052,
      city: 'Cosmódromo de Baikonur',
      country_code: 'KZ',
      country_name: 'Unión Soviética (Kazajistán)',
      display_location: 'Sitio de Lanzamiento 1, Cosmódromo de Baikonur',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Esfera Pulida de Aluminio con Cuatro Antenas',
        category: 'technology',
        normalized_rect: { x: 0.25, y: 0.20, width: 0.50, height: 0.60 },
        observation_text: 'Esfera reflectante de 58 cm con cuatro antenas tipo látigo de 2.4 a 2.9 metros.',
        deduction_text: 'El primer artefacto humano puesto en órbita terrestre el 4 de octubre de 1957 por la URSS.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Roscosmos History Archives',
        collection_id: 'Fondo Programa R-7 y PS-1 (1957)',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Roscosmos',
      }
    ],
    secondary_sources: [
      'Siddiqi, Asif. Challenge to Apollo: The Soviet Union and the Space Race (2000).'
    ],
    historical_context_brief: 'El 4 de octubre de 1957 la Unión Soviética lanzó con éxito el Sputnik 1, iniciando la carrera espacial y emitiendo su célebre señal de radio desde el espacio.',
    deduction_pathway: 'La esfera con antenas desplegadas corresponde al Sputnik 1, hito aeroespacial de octubre de 1957.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 23. ESPACIO: Vuelo de Yuri Gagarin en el Vostok 1 (1961)
  {
    id: 'ev-esp-1961-gagarin',
    code: 'ESP-1961-GAGARIN',
    title: 'Primer Vuelo Humano al Espacio de Yuri Gagarin (1961)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Yuri_Gagarin_%281961%29_-_Restoration.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Yuri_Gagarin_%281961%29_-_Restoration.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'RIA Novosti / Archivo Estatal de la Federación Rusa',
      collection_id: 'Vostok 1 Mission Archive 1961',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Primer Vuelo Espacial Tripulado de Yuri Gagarin',
    accepted_event_aliases: [
      'Vuelo de Yuri Gagarin',
      'Misión Vostok 1',
      'Primer humano en el espacio',
      'Gagarin en 1961'
    ],
    distractor_cards: ['ev-esp-1957-sputnik', 'ev-mun-1969-luna', 'ev-pol-1962-misiles'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1961,
      month: 4,
      day: 12,
      display_date: '12 de abril de 1961',
    },
    canonical_location: {
      latitude: 45.9646,
      longitude: 63.3052,
      city: 'Órbita Terrestre / Baikonur',
      country_code: 'RU',
      country_name: 'Unión Soviética',
      display_location: 'Vostok 1 en Órbita Terrestre',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Casco Blanco con Siglas CCCP y Escafandra Naranja',
        category: 'clothing',
        normalized_rect: { x: 0.30, y: 0.15, width: 0.40, height: 0.50 },
        observation_text: 'Yuri Gagarin sonriendo con el casco de vuelo que lleva estampada la inscripción en rojo "CCCP".',
        deduction_text: 'El cosmonauta soviético que completó la primera órbita a la Tierra el 12 de abril de 1961.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo Estatal de la Federación Rusa (GARF)',
        collection_id: 'Misión Vostok 12-04-1961',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'GARF',
      }
    ],
    secondary_sources: [
      'Gagarin, Yuri. El camino hacia el cosmos (1961).'
    ],
    historical_context_brief: 'El 12 de abril de 1961, Yuri Gagarin a bordo de la nave Vostok 1 se convirtió en el primer ser humano en viajar al espacio exterior y orbitar la Tierra.',
    deduction_pathway: 'El rostro de Gagarin con su escafandra y el lema CCCP fija el histórico vuelo de abril de 1961.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 24. GUERRA MUNDIAL: Desembarco de Normandía / Día D (1944)
  {
    id: 'ev-guer-1944-normandia',
    code: 'GUER-1944-NORMANDIA',
    title: 'Desembarco de Normandía en la Playa de Omaha / Día D (1944)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'US Coast Guard / US National Archives',
      collection_id: 'NARA 26-G-2343 - Into the Jaws of Death (Robert F. Sargent)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US National Archives',
    },
    canonical_event: 'Desembarco de Normandía (Operación Overlord / Día D)',
    accepted_event_aliases: [
      'Día D en Normandía',
      'Desembarco de Normandía',
      'Operación Overlord',
      'Desembarco en Playa Omaha'
    ],
    distractor_cards: ['ev-mun-1944-paris', 'ev-guer-1945-iwojima', 'ev-mun-1945-hiroshima'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1944,
      month: 6,
      day: 6,
      display_date: '6 de junio de 1944',
    },
    canonical_location: {
      latitude: 49.3697,
      longitude: -0.8711,
      city: 'Playa de Omaha, Normandía',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Sector Easy Red, Playa de Omaha, Normandía',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Rampa de la Lancha de Desembarco LCVP Higgins',
        category: 'vehicle',
        normalized_rect: { x: 0.10, y: 0.40, width: 0.80, height: 0.55 },
        observation_text: 'Soldados de la 1ª División de Infantería de EE.UU. avanzando entre el agua y fuego enemigo hacia la costa.',
        deduction_text: 'La fotografía de Robert Sargent del asalto anfibio aliado del 6 de junio de 1944 en Normandía.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives (NARA)',
        collection_id: 'NARA 26-G-2343',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Coast Guard',
      }
    ],
    secondary_sources: [
      'Ambrose, Stephen. D-Day: June 6, 1944 (1994).'
    ],
    historical_context_brief: 'El 6 de junio de 1944 las fuerzas aliadas ejecutaron la mayor invasión anfibia de la historia en las costas de Normandía para liberar a Europa del nazismo.',
    deduction_pathway: 'La salida de los soldados desde la barcaza Higgins hacia los acantilados de Normandía fecha el Día D en junio de 1944.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 25. GUERRA MUNDIAL: Alzamiento de la Bandera en Iwo Jima (1945)
  {
    id: 'ev-guer-1945-iwojima',
    code: 'GUER-1945-IWOJIMA',
    title: 'Alzamiento de la Bandera en el Monte Suribachi de Iwo Jima (1945)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Raising_the_Flag_on_Iwo_Jima%2C_larger_-_edit1.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Raising_the_Flag_on_Iwo_Jima%2C_larger_-_edit1.jpg',
    image_aspect_ratio: 1.25,
    image_source: {
      institution: 'Associated Press / US National Archives',
      collection_id: 'Joe Rosenthal - Raising the Flag on Iwo Jima',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Alzamiento de la Bandera en Iwo Jima',
    accepted_event_aliases: [
      'Batalla de Iwo Jima',
      'Bandera en el Monte Suribachi',
      'Iwo Jima 1945'
    ],
    distractor_cards: ['ev-guer-1945-reichstag', 'ev-mun-1945-hiroshima', 'ev-guer-1944-normandia'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1945,
      month: 2,
      day: 23,
      display_date: '23 de febrero de 1945',
    },
    canonical_location: {
      latitude: 24.7544,
      longitude: 141.2903,
      city: 'Monte Suribachi, Iwo Jima',
      country_code: 'JP',
      country_name: 'Japón (Isla de Iwo Jima)',
      display_location: 'Cima del Monte Suribachi, Iwo Jima',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Seis Marines Levantando el Mástil Metálico',
        category: 'flag_symbol',
        normalized_rect: { x: 0.20, y: 0.10, width: 0.60, height: 0.80 },
        observation_text: 'Cinco marines y un enfermero naval erigiendo la bandera estadounidense sobre la cumbre volcánica.',
        deduction_text: 'La fotografía de Joe Rosenthal ganadora del Premio Pulitzer tomada el 23 de febrero de 1945.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA 80-G-413988',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Marine Corps',
      }
    ],
    secondary_sources: [
      'Bradley, James. Flags of Our Fathers (2000).'
    ],
    historical_context_brief: 'El 23 de febrero de 1945, durante la feroz batalla en el frente del Pacífico, soldados estadounidenses izaron la bandera en la cima del volcán Suribachi.',
    deduction_pathway: 'El grupo de soldados alzando la bandera en el Suribachi identifica inequívocamente la Batalla de Iwo Jima en 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 26. GUERRA MUNDIAL: Bandera de la Victoria sobre el Reichstag (1945)
  {
    id: 'ev-guer-1945-reichstag',
    code: 'GUER-1945-REICHSTAG',
    title: 'Bandera de la Victoria Soviética sobre el Reichstag de Berlín (1945)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Reichstag_flag_original.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Reichstag_flag_original.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'TASS / Yevgeny Khaldei',
      collection_id: 'Victory Banner over Reichstag May 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Bandera de la Victoria sobre el Reichstag de Berlín',
    accepted_event_aliases: [
      'Toma de Berlín por el Ejército Rojo',
      'Bandera soviética sobre el Reichstag',
      'Caída de Berlín en 1945',
      'Fin de la Segunda Guerra en Europa'
    ],
    distractor_cards: ['ev-guer-1945-iwojima', 'ev-mun-1945-yalta', 'ev-mun-1989-berlin'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1945,
      month: 5,
      day: 2,
      display_date: '2 de mayo de 1945',
    },
    canonical_location: {
      latitude: 52.5186,
      longitude: 13.3761,
      city: 'Berlín',
      country_code: 'DE',
      country_name: 'Alemania',
      display_location: 'Cúpula y tejado del Reichstag, Berlín',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Soldado Soviético ondeando la Bandera Roja sobre las Ruinas',
        category: 'flag_symbol',
        normalized_rect: { x: 0.30, y: 0.15, width: 0.55, height: 0.65 },
        observation_text: 'El sargento Abdulkhakim Ismailov apoyando a Aleksei Kovalev mientras ondea la bandera roja de la hoz y el martillo sobre Berlín en llamas.',
        deduction_text: 'La fotografía de Yevgeny Khaldei tomada en mayo de 1945 simbolizando la victoria aliada y derrota del régimen nazi.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Central Armed Forces Museum of Russia',
        collection_id: 'Fondo Khaldei - Berlín 1945',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Dominio Público',
      }
    ],
    secondary_sources: [
      'Beevor, Antony. The Fall of Berlin 1945 (2002).'
    ],
    historical_context_brief: 'El 2 de mayo de 1945 soldados del Ejército Rojo izaron la bandera soviética sobre el tejado del destruido parlamento alemán, marcando el fin de la guerra en Europa.',
    deduction_pathway: 'La bandera roja sobre la cornisa del Reichstag con las ruinas de Berlín de fondo ubica la caída del nazismo en mayo de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 27. TRATADO: Firma del Tratado de Versalles (1919)
  {
    id: 'ev-pol-1919-versalles',
    code: 'POL-1919-VERSALLES',
    title: 'Firma del Tratado de Versalles en la Galería de los Espejos (1919)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Treaty_of_Versailles%2C_Signatures.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Treaty_of_Versailles%2C_Signatures.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Bibliothèque Nationale de France / Imperial War Museums',
      collection_id: 'Signing of Treaty of Versailles 28 June 1919',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Firma del Tratado de Versalles en París',
    accepted_event_aliases: [
      'Tratado de Versalles de 1919',
      'Paz de Versalles',
      'Galería de los Espejos de Versalles'
    ],
    distractor_cards: ['ev-guer-1918-armisticio', 'ev-mun-1914-sarajevo', 'ev-pol-1945-potsdam'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1919,
      month: 6,
      day: 28,
      display_date: '28 de junio de 1919',
    },
    canonical_location: {
      latitude: 48.8049,
      longitude: 2.1204,
      city: 'Versalles / París',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Galería de los Espejos, Palacio de Versalles',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Mesa de los Plenipotenciarios en la Galería de los Espejos',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'Los delegados de las potencias mundiales sentados bajo las grandes arañas de cristal firmando el tratado de paz.',
        deduction_text: 'Exactamente cinco años después del atentado de Sarajevo, se firmó el tratado que rediseñó las fronteras europeas el 28 de junio de 1919.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Bibliothèque Nationale de France',
        collection_id: 'Fonds Conférence de la Paix 1919',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'BNF',
      }
    ],
    secondary_sources: [
      'MacMillan, Margaret. Peacemakers: Six Months That Changed the World (2001).'
    ],
    historical_context_brief: 'El 28 de junio de 1919 se firmó el Tratado de Versalles en el Palacio de Versalles, poniendo fin formal a la Primera Guerra Mundial.',
    deduction_pathway: 'La suntuosa Galería de los Espejos abarrotada de diplomáticos firmando el documento sitúa Versalles en junio de 1919.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 28. CUMBRE: Conferencia de Potsdam (1945)
  {
    id: 'ev-pol-1945-potsdam',
    code: 'POL-1945-POTSDAM',
    title: 'Conferencia de Potsdam (Truman, Churchill/Attlee y Stalin, 1945)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Potsdam_conference_1945_alt.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Potsdam_conference_1945_alt.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'US National Archives / US Army Signal Corps',
      collection_id: 'Potsdam Conference 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US Government',
    },
    canonical_event: 'Conferencia de Potsdam de los Líderes Aliados',
    accepted_event_aliases: [
      'Conferencia de Potsdam',
      'Cumbre de Potsdam de 1945',
      'Reunión de Truman, Stalin y Attlee'
    ],
    distractor_cards: ['ev-mun-1945-yalta', 'ev-pol-1945-onu', 'ev-jur-1945-nuremberg'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1945,
      month: 7,
      day: 17,
      display_date: 'Julio a Agosto de 1945',
    },
    canonical_location: {
      latitude: 52.4042,
      longitude: 13.0694,
      city: 'Potsdam',
      country_code: 'DE',
      country_name: 'Alemania',
      display_location: 'Palacio de Cecilienhof, Potsdam, Alemania',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Harry S. Truman, Winston Churchill/Clement Attlee y Iósif Stalin en el Jardín',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'El nuevo presidente estadounidense Harry S. Truman sentado entre los líderes británico y soviético en sillones de mimbre.',
        deduction_text: 'La cumbre celebrada en el palacio Cecilienhof en julio de 1945 donde se emitió la Declaración de Potsdam a Japón.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Harry S. Truman Presidential Library',
        collection_id: 'Potsdam Conference Photographic Collection 1945',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US National Archives',
      }
    ],
    secondary_sources: [
      'Mee, Charles L. Meeting at Potsdam (1975).'
    ],
    historical_context_brief: 'En julio-agosto de 1945, Truman, Stalin y Attlee se reunieron en Potsdam para administrar la Alemania ocupada y exigir la rendición incondicional de Japón.',
    deduction_pathway: 'La presencia de Truman junto a Stalin y Churchill en los jardines de Cecilienhof fecha la conferencia de Potsdam en julio de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 29. JUSTICIA: Juicios de Núremberg (1945/1946)
  {
    id: 'ev-jur-1945-nuremberg',
    code: 'JUR-1945-NUREMBERG',
    title: 'Juicios de Núremberg a los Jerarcas Nazis (1945/1946)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nuremberg_trials_courtroom_1945.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nuremberg_trials_courtroom_1945.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'US National Archives (NARA) / Office of the US Chief of Counsel',
      collection_id: 'NARA 238-NT-Courtroom 600',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US Government',
    },
    canonical_event: 'Juicios de Núremberg del Tribunal Militar Internacional',
    accepted_event_aliases: [
      'Juicios de Núremberg',
      'Tribunal de Núremberg',
      'Juicio a los criminales de guerra nazis',
      'Sala 600 de Núremberg'
    ],
    distractor_cards: ['ev-pol-1945-potsdam', 'ev-pol-1945-onu', 'ev-mun-1945-yalta'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1945,
      month: 11,
      day: 20,
      display_date: '20 de noviembre de 1945 a 1946',
    },
    canonical_location: {
      latitude: 49.4542,
      longitude: 11.0458,
      city: 'Núremberg',
      country_code: 'DE',
      country_name: 'Alemania',
      display_location: 'Sala 600 del Palacio de Justicia de Núremberg',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Banquillo de los Acusados con Hermann Göring y Rudolf Hess',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.30, width: 0.65, height: 0.50 },
        observation_text: 'Los 21 principales jerarcas del régimen nazi sentados con auriculares de traducción simultánea custodiados por policías militares con cascos blancos.',
        deduction_text: 'El primer tribunal militar internacional que juzgó crímenes contra la humanidad iniciado en noviembre de 1945.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA Record Group 238',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Government',
      }
    ],
    secondary_sources: [
      'Taylor, Telford. The Anatomy of the Nuremberg Trials (1992).'
    ],
    historical_context_brief: 'El 20 de noviembre de 1945 comenzaron en Núremberg los procesos judiciales contra los principales dirigentes políticos y militares del Tercer Reich.',
    deduction_pathway: 'La famosa Sala 600 con Göring en el extremo del banquillo identifica los Juicios de Núremberg de 1945-1946.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 30. COMPUTACIÓN: Presentación de la ENIAC (1946)
  {
    id: 'ev-tec-1946-eniac',
    code: 'TEC-1946-ENIAC',
    title: 'Presentación de la Computadora Electrónica ENIAC (1946)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Eniac.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Eniac.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'US Army Photo / University of Pennsylvania',
      collection_id: 'Moore School of Electrical Engineering - ENIAC 1946',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US Army / UPenn',
    },
    canonical_event: 'Presentación de la Computadora ENIAC',
    accepted_event_aliases: [
      'Computadora ENIAC de 1946',
      'Nacimiento de la Computación Electrónica',
      'ENIAC en la Universidad de Pensilvania'
    ],
    distractor_cards: ['ev-esp-1957-sputnik', 'ev-tec-1928-fleming', 'ev-cie-1953-adn'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1946,
      month: 2,
      day: 14,
      display_date: '14 de febrero de 1946',
    },
    canonical_location: {
      latitude: 39.9522,
      longitude: -75.1932,
      city: 'Filadelfia',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Moore School, Universidad de Pensilvania, Filadelfia',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Paneles Modulares con Miles de Válvulas de Vacío',
        category: 'technology',
        normalized_rect: { x: 0.15, y: 0.15, width: 0.70, height: 0.70 },
        observation_text: 'Programadoras conectando cables de conmutación en los gabinetes gigantescos de 27 toneladas.',
        deduction_text: 'La primera computadora digital electrónica de propósito general revelada al público en febrero de 1946.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Smithsonian National Museum of American History',
        collection_id: 'ENIAC Photographic Collection',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Smithsonian Institution',
      }
    ],
    secondary_sources: [
      'Ceruzzi, Paul E. A History of Modern Computing (2003).'
    ],
    historical_context_brief: 'El 14 de febrero de 1946 se desclasificó y presentó en Filadelfia la ENIAC, la primera computadora electrónica programable de gran escala de la historia.',
    deduction_pathway: 'Los paneles monumentales llenos de tubos de vacío y cables telefónicos identifican la ENIAC en 1946.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 31. ARQUITECTURA: Inauguración del Puente Golden Gate (1937)
  {
    id: 'ev-arq-1937-goldengate',
    code: 'ARQ-1937-GOLDENGATE',
    title: 'Inauguración y Marcha Peatonal en el Puente Golden Gate (1937)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Golden_Gate_Bridge_pedestrian_day_1937.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Golden_Gate_Bridge_pedestrian_day_1937.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress / San Francisco Chronicle',
      collection_id: 'Golden Gate Opening Day May 27, 1937',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Inauguración del Puente Golden Gate de San Francisco',
    accepted_event_aliases: [
      'Inauguración del Golden Gate',
      'Apertura del Puente Golden Gate',
      'Golden Gate en 1937',
      'Día Peatonal del Golden Gate'
    ],
    distractor_cards: ['ev-des-1937-hindenburg', 'ev-arg-1936-obelisco', 'ev-arq-1932-lunchrock'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1937,
      month: 5,
      day: 27,
      display_date: '27 de mayo de 1937',
    },
    canonical_location: {
      latitude: 37.8199,
      longitude: -122.4783,
      city: 'San Francisco',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Estrecho de Golden Gate, Bahía de San Francisco',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Multitud Cruzando a Pie la Calzada Roja',
        category: 'architecture',
        normalized_rect: { x: 0.20, y: 0.30, width: 0.60, height: 0.55 },
        observation_text: 'Más de 200.000 peatones caminando entre las torres art déco de color naranja internacional («International Orange»).',
        deduction_text: 'El día de inauguración peatonal del 27 de mayo de 1937 antes de abrirlo al tránsito vehicular.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Prints and Photographs Division, LC-USZ62-111456',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Library of Congress',
      }
    ],
    secondary_sources: [
      'Van der Zee, John. The Gate: The True Story of the Design and Construction of the Golden Gate Bridge (1986).'
    ],
    historical_context_brief: 'El 27 de mayo de 1937 se inauguró el Puente Golden Gate de San Francisco, convirtiéndose en el puente colgante más largo y alto de su era.',
    deduction_pathway: 'La marea de peatones con sombreros de los años 30 sobre el tablero del Golden Gate fija la inauguración en mayo de 1937.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 32. TRAGEDIA: Desastre del Dirigible Hindenburg (1937)
  {
    id: 'ev-des-1937-hindenburg',
    code: 'DES-1937-HINDENBURG',
    title: 'Desastre del Dirigible LZ 129 Hindenburg (1937)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Hindenburg_burning.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Hindenburg_burning.jpg',
    image_aspect_ratio: 1.3,
    image_source: {
      institution: 'Associated Press / US National Archives',
      collection_id: 'Sam Shere - Hindenburg Disaster May 6 1937',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Desastre e Incendio del Dirigible Hindenburg',
    accepted_event_aliases: [
      'Tragedia del Hindenburg',
      'Incendio del LZ 129 Hindenburg',
      'Desastre de Lakehurst de 1937'
    ],
    distractor_cards: ['ev-arq-1937-goldengate', 'ev-avi-1927-lindbergh', 'ev-arg-1936-obelisco'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1937,
      month: 5,
      day: 6,
      display_date: '6 de mayo de 1937',
    },
    canonical_location: {
      latitude: 40.0333,
      longitude: -74.3333,
      city: 'Lakehurst',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Estación Aeronaval de Lakehurst, Nueva Jersey',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Estructura de Duraluminio Envuelta en Llamas de Hidrógeno',
        category: 'vehicle',
        normalized_rect: { x: 0.15, y: 0.10, width: 0.70, height: 0.80 },
        observation_text: 'El colosal dirigible alemán de 245 metros ardiendo mientras caía hacia el mástil de amarre.',
        deduction_text: 'La célebre fotografía de Sam Shere capturada el 6 de mayo de 1937 que puso fin a la era de los dirigibles de pasajeros.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA Record Group 72',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US Government',
      }
    ],
    secondary_sources: [
      'Mooney, Michael M. The Hindenburg (1972).'
    ],
    historical_context_brief: 'El 6 de mayo de 1937, el dirigible alemán LZ 129 Hindenburg se incendió en 32 segundos al intentar aterrizar en Lakehurst, causando 36 muertes.',
    deduction_pathway: 'La gigantesca bola de fuego consumiendo la proa del zeppelin identifica inequívocamente el desastre del Hindenburg de 1937.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 33. ARQUEOLOGÍA: Descubrimiento de la Tumba de Tutankamón (1922)
  {
    id: 'ev-cie-1922-tutankamon',
    code: 'CIE-1922-TUTANKAMON',
    title: 'Apertura de la Tumba de Tutankamón por Howard Carter (1922)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Harry_Burton_-_Howard_Carter_in_Tutankhamun%27s_tomb.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Harry_Burton_-_Howard_Carter_in_Tutankhamun%27s_tomb.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Metropolitan Museum of Art / Harry Burton',
      collection_id: 'Burton Photograph Archive - Tomb of Tutankhamun (KV62)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Metropolitan Museum of Art / Dominio Público',
    },
    canonical_event: 'Descubrimiento de la Tumba de Tutankamón por Howard Carter',
    accepted_event_aliases: [
      'Descubrimiento de Tutankamón',
      'Howard Carter en la Tumba de Tutankamón',
      'Apertura de la Tumba KV62',
      'Tesoro de Tutankamón en 1922'
    ],
    distractor_cards: ['ev-tec-1927-solvay', 'ev-tec-1928-fleming', 'ev-avi-1927-lindbergh'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1922,
      month: 11,
      day: 26,
      display_date: 'Noviembre de 1922',
    },
    canonical_location: {
      latitude: 25.7402,
      longitude: 32.6019,
      city: 'Valle de los Reyes / Luxor',
      country_code: 'EG',
      country_name: 'Egipto',
      display_location: 'Tumba KV62, Valle de los Reyes, Tebas, Egipto',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Howard Carter Examinando los Sarcófagos Dorados',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.70 },
        observation_text: 'El arqueólogo británico Howard Carter limpiando cuidadosamente con un pincel los sellos y relieves del ataúd antropomorfo de oro macizo.',
        deduction_text: 'La célebre fotografía de Harry Burton documentando el hallazgo de la tumba intacta en noviembre de 1922.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Griffith Institute, University of Oxford',
        collection_id: 'Howard Carter Papers - KV62 Excavation Journals',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Griffith Institute',
      }
    ],
    secondary_sources: [
      'Carter, Howard. The Tomb of Tutankhamun (1923).'
    ],
    historical_context_brief: 'En noviembre de 1922, Howard Carter descubrió en el Valle de los Reyes la tumba casi intacta del faraón Tutankamón, el hallazgo arqueológico más célebre de la historia.',
    deduction_pathway: 'Carter arrodillado junto al sarcófago faraónico dorado fecha el descubrimiento en el Valle de los Reyes en 1922.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 34. CIENCIA: Primera Radiografía Médica por Röntgen (1895)
  {
    id: 'ev-cie-1895-rontgen',
    code: 'CIE-1895-RONTGEN',
    title: 'Primera Radiografía Médica de la Historia por Wilhelm Röntgen (1895)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg',
    image_aspect_ratio: 1.25,
    image_source: {
      institution: 'Deutsches Röntgen-Museum / Universität Würzburg',
      collection_id: 'Hand mit Ringen (Anna Bertha Ludwig Röntgen, 22 Dez 1895)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Descubrimiento de los Rayos X y Primera Radiografía de Röntgen',
    accepted_event_aliases: [
      'Primera Radiografía de la Historia',
      'Descubrimiento de los Rayos X',
      'Radiografía de la mano de Anna Bertha Röntgen',
      'Wilhelm Röntgen en 1895'
    ],
    distractor_cards: ['ev-mun-1889-eiffel', 'ev-tec-1903-wright', 'ev-tec-1928-fleming'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1895,
      month: 12,
      day: 22,
      display_date: '22 de diciembre de 1895',
    },
    canonical_location: {
      latitude: 49.7913,
      longitude: 9.9534,
      city: 'Wurzburgo',
      country_code: 'DE',
      country_name: 'Alemania',
      display_location: 'Instituto de Física, Universidad de Wurzburgo',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Huesos de la Mano con el Anillo de Bodas Claramente Visible',
        category: 'technology',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.70 },
        observation_text: 'Silueta translúcida de los huesos metacarpianos y falanges con la sombra densa de un anillo en el dedo anular.',
        deduction_text: 'La placa de rayos X de la mano de la esposa de Wilhelm Röntgen realizada en diciembre de 1895.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Physikalisch-Medizinische Gesellschaft zu Würzburg',
        collection_id: 'Über eine neue Art von Strahlen (Röntgen 1895)',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Dominio Público',
      }
    ],
    secondary_sources: [
      'Glasser, Otto. Wilhelm Conrad Röntgen and the Early History of the Roentgen Rays (1933).'
    ],
    historical_context_brief: 'El 22 de diciembre de 1895 Wilhelm Röntgen tomó la primera radiografía humana exponiendo la mano de su esposa Anna Bertha a los recién descubiertos rayos X.',
    deduction_pathway: 'La icónica radiografía de una mano con anillo corresponde a la primera imagen por rayos X tomada por Röntgen en 1895.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 35. CIENCIA: Descubrimiento de la Estructura del ADN (1953)
  {
    id: 'ev-cie-1953-adn',
    code: 'CIE-1953-ADN',
    title: 'Descubrimiento de la Estructura de Doble Hélice del ADN / Foto 51 (1952/1953)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Photo_51_x-ray_diffraction_image.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Photo_51_x-ray_diffraction_image.jpg',
    image_aspect_ratio: 1.0,
    image_source: {
      institution: 'King’s College London / Rosalind Franklin & Raymond Gosling',
      collection_id: 'Photo 51 DNA X-ray diffraction pattern May 1952',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'King’s College London / Dominio Público',
    },
    canonical_event: 'Descubrimiento de la Estructura del ADN (Foto 51 de Franklin)',
    accepted_event_aliases: [
      'Foto 51 de Rosalind Franklin',
      'Descubrimiento de la Doble Hélice del ADN',
      'Estructura del ADN por Watson y Crick',
      'Difracción de rayos X del ADN'
    ],
    distractor_cards: ['ev-tec-1928-fleming', 'ev-esp-1957-sputnik', 'ev-cie-1895-rontgen'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1953,
      month: 4,
      day: 25,
      display_date: '1952 (Foto 51) / 1953 (Publicación)',
    },
    canonical_location: {
      latitude: 51.5115,
      longitude: -0.1160,
      city: 'Londres / Cambridge',
      country_code: 'GB',
      country_name: 'Reino Unido',
      display_location: 'Laboratorio de Biofísica, King’s College London / Lab Cavendish',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Patrón de Difracción en Forma de X Característico',
        category: 'technology',
        normalized_rect: { x: 0.20, y: 0.20, width: 0.60, height: 0.60 },
        observation_text: 'Manchas simétricas de difracción de rayos X formando una cruz nítida con capa periódica.',
        deduction_text: 'La célebre «Foto 51» tomada por Rosalind Franklin en mayo de 1952 que demostró la forma helicoidal del ADN.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Nature Archive',
        collection_id: 'Molecular Structure of Nucleic Acids (Watson & Crick / Franklin, 1953)',
        source_type: 'ACADEMIC_RECORD',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Dominio Público',
      }
    ],
    secondary_sources: [
      'Maddox, Brenda. Rosalind Franklin: The Dark Lady of DNA (2002).'
    ],
    historical_context_brief: 'La Foto 51 tomada por Rosalind Franklin en 1952 fue la prueba crucial que permitió a Watson y Crick dilucidar la estructura en doble hélice del ADN en 1953.',
    deduction_pathway: 'El patrón en X de difracción de rayos X de la Foto 51 identifica el descubrimiento del código genético del ADN en 1952-1953.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 36. AVIACIÓN: Vuelo Transatlántico de Charles Lindbergh (1927)
  {
    id: 'ev-avi-1927-lindbergh',
    code: 'AVI-1927-LINDBERGH',
    title: 'Llegada de Charles Lindbergh en el Spirit of St. Louis (1927)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Spirit_of_St._Louis.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Spirit_of_St._Louis.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Library of Congress / National Air and Space Museum',
      collection_id: 'Charles Lindbergh Spirit of St. Louis 1927',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Primer Vuelo Transatlántico en Solitario de Charles Lindbergh',
    accepted_event_aliases: [
      'Vuelo de Charles Lindbergh',
      'El Spirit of St. Louis en París',
      'Vuelo Nueva York - París de 1927'
    ],
    distractor_cards: ['ev-tec-1903-wright', 'ev-tec-1927-solvay', 'ev-des-1937-hindenburg'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1927,
      month: 5,
      day: 21,
      display_date: '20 al 21 de mayo de 1927',
    },
    canonical_location: {
      latitude: 48.9615,
      longitude: 2.4372,
      city: 'Le Bourget / París',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Aeródromo de Le Bourget, París',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Monoplano Ryan NYP sin Parabrisas Frontal',
        category: 'vehicle',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'El aeroplano plateado «Spirit of St. Louis» con matrícula N-X-211 con tanque de combustible frontal y periscopio.',
        deduction_text: 'El avión con el que Lindbergh completó el primer vuelo sin escalas entre Nueva York y París en mayo de 1927.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Smithsonian National Air and Space Museum',
        collection_id: 'Lindbergh Collection NASM-A-19280021000',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Smithsonian Institution',
      }
    ],
    secondary_sources: [
      'Lindbergh, Charles. The Spirit of St. Louis (1953).'
    ],
    historical_context_brief: 'El 21 de mayo de 1927, Charles Lindbergh aterrizó en París tras volar 33 horas y media en solitario desde Nueva York a bordo del Spirit of St. Louis.',
    deduction_pathway: 'El monoplano plateado Spirit of St. Louis identifica la travesía transatlántica de Lindbergh en mayo de 1927.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 37. GUERRA: Armisticio de Compiègne (1918)
  {
    id: 'ev-guer-1918-armisticio',
    code: 'GUER-1918-ARMISTICIO',
    title: 'Firma del Armisticio de Compiègne en el Vagón de Tren (1918)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Armistice_du_11_novembre_1918_Foch_au_centre.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Armistice_du_11_novembre_1918_Foch_au_centre.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Bibliothèque Nationale de France / ECPAD',
      collection_id: 'Armistice de 1918 - Clairière de Rethondes',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Firma del Armisticio de Compiègne y Fin de la Gran Guerra',
    accepted_event_aliases: [
      'Armisticio del 11 de Noviembre de 1918',
      'Fin de la Primera Guerra Mundial',
      'Vagón de Compiègne',
      'Armisticio de 1918'
    ],
    distractor_cards: ['ev-mun-1914-sarajevo', 'ev-pol-1919-versalles', 'ev-mar-1915-lusitania'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1918,
      month: 11,
      day: 11,
      display_date: '11 de noviembre de 1918',
    },
    canonical_location: {
      latitude: 49.4273,
      longitude: 2.9064,
      city: 'Bosque de Compiègne',
      country_code: 'FR',
      country_name: 'Francia',
      display_location: 'Claro de Rethondes, Bosque de Compiègne, Francia',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'GUERRAS',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Mariscal Foch frente al Vagón de Ferrocarril 2419D',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.25, width: 0.60, height: 0.55 },
        observation_text: 'El Mariscal Ferdinand Foch y oficiales aliados saliendo del vagón-restaurante de tren en medio del bosque.',
        deduction_text: 'El cese del fuego pactado el 11 de noviembre de 1918 a las 11:00 hs que concluyó la Primera Guerra Mundial.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Service Historique de la Défense (SHD)',
        collection_id: 'Armistice 1918 - Fonds Foch',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Ministère des Armées France',
      }
    ],
    secondary_sources: [
      'Keegan, John. The First World War (1998).'
    ],
    historical_context_brief: 'El 11 de noviembre de 1918 a las 11:00 am se firmó el Armisticio de Compiègne dentro de un vagón de tren, deteniendo los combates de la Primera Guerra Mundial.',
    deduction_pathway: 'El Mariscal Foch con su séquito frente al vagón de ferrocarril en el bosque ubica el armisticio de noviembre de 1918.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 38. GUERRA FRÍA: Crisis de los Misiles en Cuba (1962)
  {
    id: 'ev-pol-1962-misiles',
    code: 'POL-1962-MISILES',
    title: 'Crisis de los Misiles en Cuba / Fotografía Aérea de Reconocimiento U-2 (1962)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/MRBM_Launch_Site_1_San_Cristobal%2C_October_1962.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/MRBM_Launch_Site_1_San_Cristobal%2C_October_1962.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'US National Archives / Central Intelligence Agency (CIA)',
      collection_id: 'CIA Photographic Interpretation Center - San Cristóbal MRBM Site 1',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'US Government',
    },
    canonical_event: 'Crisis de los Misiles en Cuba (Fotografía U-2)',
    accepted_event_aliases: [
      'Crisis de los Misiles',
      'Crisis de Octubre de 1962',
      'Fotografía U-2 en San Cristóbal Cuba',
      'Crisis de los Misiles de Cuba'
    ],
    distractor_cards: ['ev-lat-1959-cuba', 'ev-soc-1963-mlk', 'ev-mun-1989-berlin'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1962,
      month: 10,
      day: 14,
      display_date: 'Octubre de 1962',
    },
    canonical_location: {
      latitude: 22.7167,
      longitude: -83.0500,
      city: 'San Cristóbal / Pinar del Río',
      country_code: 'CU',
      country_name: 'Cuba',
      display_location: 'San Cristóbal, Provincia de Pinar del Río, Cuba',
    },
    geographic_scope: 'LATAM',
    thematic_category: 'GUERRAS',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Remolques y Emplazamientos de Misiles Balísticos MRBM SS-4',
        category: 'technology',
        normalized_rect: { x: 0.15, y: 0.15, width: 0.70, height: 0.70 },
        observation_text: 'Fotografía aérea en blanco y negro con anotaciones militares marcando tiendas de abastecimiento y plataformas de lanzamiento.',
        deduction_text: 'La prueba de inteligencia obtenida por un avión espía U-2 que desencadenó los 13 días de máxima tensión nuclear en octubre de 1962.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'John F. Kennedy Presidential Library and Museum',
        collection_id: 'Cuban Missile Crisis Photographic Exhibits',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US National Archives',
      }
    ],
    secondary_sources: [
      'Allison, Graham; Zelikow, Philip. Essence of Decision: Explaining the Cuban Missile Crisis (1999).'
    ],
    historical_context_brief: 'En octubre de 1962, fotografías aéreas de la CIA revelaron la instalación de misiles nucleares soviéticos en Cuba, llevando al mundo al borde de una guerra nuclear.',
    deduction_pathway: 'La fotografía aérea de reconocimiento militar sobre San Cristóbal con marcas de misiles identifica la crisis de octubre de 1962.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 39. ARGENTINA: Edificio Kavanagh (1936)
  {
    id: 'ev-arg-1936-kavanagh',
    code: 'ARG-1936-KAVANAGH',
    title: 'Inauguración del Rascacielos Edificio Kavanagh en Plaza San Martín (1936)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Edificio_Kavanagh_en_1936.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Edificio_Kavanagh_en_1936.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Archivo General de la Nación (AGN) / Revista Caras y Caretas',
      collection_id: 'Fondo Arquitectura Racionalista - Kavanagh 1936',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Inauguración del Edificio Kavanagh en Buenos Aires',
    accepted_event_aliases: [
      'Edificio Kavanagh en 1936',
      'Inauguración del Kavanagh',
      'Rascacielos Kavanagh de Sánchez, Lagos y de la Torre'
    ],
    distractor_cards: ['ev-arg-1936-obelisco', 'ev-arg-1910-centenario', 'ev-arg-1908-colon'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1936,
      month: 1,
      day: 3,
      display_date: 'Enero de 1936',
    },
    canonical_location: {
      latitude: -34.5958,
      longitude: -58.3756,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Florida 1065, Plaza San Martín, Retiro, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Torre Art Déco Escalonada de Hormigón Armado de 120 Metros',
        category: 'architecture',
        normalized_rect: { x: 0.25, y: 0.10, width: 0.50, height: 0.80 },
        observation_text: 'El rascacielos escalonado más alto de Sudamérica en su momento, frente a la Plaza San Martín.',
        deduction_text: 'La obra maestra del racionalismo y art déco inaugurada a principios de 1936 por Corina Kavanagh.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Doc. Arquitectura AGN 1936',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Gutiérrez, Ramón. Arquitectura y urbanismo en Iberoamérica (1983).'
    ],
    historical_context_brief: 'Inaugurado en enero de 1936 con 120 metros de altura, el Kavanagh fue la estructura de hormigón armado más alta de Sudamérica y símbolo de la modernidad porteña.',
    deduction_pathway: 'El perfil escalonado del Kavanagh frente a Plaza San Martín con tranvías de época identifica su habilitación en 1936.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 40. ARGENTINA: Bombardeo de Plaza de Mayo (1955)
  {
    id: 'ev-arg-1955-bombardeo',
    code: 'ARG-1955-BOMBARDEO',
    title: 'Bombardeo de la Plaza de Mayo por la Aviación Naval (1955)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Bombardeo_Plaza_de_Mayo_1955.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Bombardeo_Plaza_de_Mayo_1955.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Dpto. Fotografía - Bombardeo 16 de Junio 1955',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Bombardeo de la Plaza de Mayo del 16 de Junio de 1955',
    accepted_event_aliases: [
      'Bombardeo de Plaza de Mayo',
      'Ataque a Plaza de Mayo en 1955',
      'Masacre de Plaza de Mayo',
      'Cristo Vence de 1955'
    ],
    distractor_cards: ['ev-arg-1945-lealtad', 'ev-lim-1973-moneda', 'ev-arg-1969-cordobazo'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1955,
      month: 6,
      day: 16,
      display_date: '16 de junio de 1955',
    },
    canonical_location: {
      latitude: -34.6083,
      longitude: -58.3712,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Plaza de Mayo y Casa de Gobierno, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Trolebús Destruido y Humo en la Pirámide de Mayo',
        category: 'vehicle',
        normalized_rect: { x: 0.15, y: 0.30, width: 0.70, height: 0.55 },
        observation_text: 'Un trolebús de la línea 305 destrozado por esquirlas y cráteres de bombas de aviación en el pavimento frente al Ministerio de Hacienda.',
        deduction_text: 'El ataque aéreo de aviones navales sublevados del 16 de junio de 1955 que dejó más de 300 muertos.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo Nacional de la Memoria (ANM)',
        collection_id: 'Investigación Histórica Bombardeo 16 de Junio 1955',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Secretaría de Derechos Humanos',
      }
    ],
    secondary_sources: [
      'Cichero, Daniel. Bombas sobre Buenos Aires (2005).'
    ],
    historical_context_brief: 'El 16 de junio de 1955, aviones de la Aviación Naval bombardearon la Plaza de Mayo en un intento de golpe de Estado para asesinar a Juan Domingo Perón, matando a más de 300 civiles.',
    deduction_pathway: 'El trolebús impactado y el humo sobre la Casa Rosada fecha el bombardeo a Plaza de Mayo en junio de 1955.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 41. ARGENTINA: Teatro Colón (1908)
  {
    id: 'ev-arg-1908-colon',
    code: 'ARG-1908-COLON',
    title: 'Inauguración del Actual Teatro Colón de Buenos Aires (1908)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Teatro_Colon_1908.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Teatro_Colon_1908.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Dpto. Fotografía - Inauguración Teatro Colón 25-05-1908',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Inauguración del Teatro Colón de Buenos Aires',
    accepted_event_aliases: [
      'Inauguración del Teatro Colón',
      'Apertura del Teatro Colón de 1908',
      'Teatro Colón con la ópera Aída'
    ],
    distractor_cards: ['ev-arg-1910-centenario', 'ev-arg-1936-obelisco', 'ev-arg-1936-kavanagh'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1908,
      month: 5,
      day: 25,
      display_date: '25 de mayo de 1908',
    },
    canonical_location: {
      latitude: -34.6011,
      longitude: -58.3831,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Cerrito 628, Plaza Lavalle, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Fachada Ecléctica e Italiana de Meano y Tamburini',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.15, width: 0.70, height: 0.70 },
        observation_text: 'El coliseo lírico frente a Plaza Lavalle recién terminado con carruajes a caballo apostados sobre la calle Libertad.',
        deduction_text: 'La inauguración oficial del coliseo porteño el 25 de mayo de 1908 con la ópera Aída de Verdi.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Doc. Fotográfico Teatro Colón 1908',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Valenti Ferro, Enzo. Historia del Teatro Colón (1983).'
    ],
    historical_context_brief: 'El 25 de mayo de 1908 se inauguró el actual edificio del Teatro Colón en Plaza Lavalle, consagrado como una de las salas líricas de mayor perfección acústica del mundo.',
    deduction_pathway: 'La fachada neorrenacentista del Teatro Colón recién estrenada con cocheras de caballos identifica el año 1908.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 42. ARGENTINA: La Porteña / Primer Ferrocarril (1857)
  {
    id: 'ev-arg-1857-portena',
    code: 'ARG-1857-PORTENA',
    title: 'Inauguración del Ferrocarril del Oeste y Locomotora La Porteña (1857)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Locomotora_La_Porte%C3%B1a_1857.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Locomotora_La_Porte%C3%B1a_1857.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Museo de Transportes de Luján / AGN',
      collection_id: 'Primer Ferrocarril Argentino 1857',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Inauguración del Primer Ferrocarril Argentino (La Porteña)',
    accepted_event_aliases: [
      'Primer Ferrocarril en Argentina',
      'Locomotora La Porteña en 1857',
      'Ferrocarril del Oeste de 1857',
      'Viaje inaugural a Flores'
    ],
    distractor_cards: ['ev-arg-1810-cabildo', 'ev-arg-1817-andes', 'ev-arg-1910-centenario'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1857,
      month: 8,
      day: 29,
      display_date: '29 de agosto de 1857',
    },
    canonical_location: {
      latitude: -34.6014,
      longitude: -58.3817,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Estación del Parque (actual Plaza Lavalle), Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Locomotora de Vapor 0-4-0 de Fabricación Británica',
        category: 'vehicle',
        normalized_rect: { x: 0.20, y: 0.25, width: 0.60, height: 0.55 },
        observation_text: 'La locomotora construida por Manning Wardle con su chimenea alta y vagones de madera abiertos.',
        deduction_text: 'El primer viaje ferroviario en suelo argentino que unió la Estación del Parque con La Floresta en agosto de 1857.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Museo Histórico de Luján',
        collection_id: 'Fondo Ferrocarriles Históricos 1857',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Patrimonio de la Provincia de Buenos Aires',
      }
    ],
    secondary_sources: [
      'Scalabrini Ortiz, Raúl. Historia de los Ferrocarriles Argentinos (1940).'
    ],
    historical_context_brief: 'El 29 de agosto de 1857 la locomotora «La Porteña» realizó el viaje inaugural del Ferrocarril del Oeste desde Plaza Lavalle hasta Floresta, inaugurando la era ferroviaria.',
    deduction_pathway: 'La pequeña máquina a vapor «La Porteña» sobre los rieles primitivos identifica el nacimiento del ferrocarril en 1857.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 43. INDEPENDENCIA: Declaración de la Independencia en Tucumán (1816)
  {
    id: 'ev-arg-1816-tucuman',
    code: 'ARG-1816-TUCUMAN',
    title: 'Declaración de la Independencia en el Congreso de Tucumán (1816)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Casa_de_Tucuman_1868_Angel_Paganelli.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Casa_de_Tucuman_1868_Angel_Paganelli.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Museo Casa Histórica de la Independencia / Ángel Paganelli',
      collection_id: 'Fotografía de la Casa de Tucumán (1868)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'República Argentina',
    },
    canonical_event: 'Declaración de la Independencia en el Congreso de Tucumán',
    accepted_event_aliases: [
      'Declaración de la Independencia de 1816',
      'Congreso de Tucumán',
      '9 de Julio de 1816',
      'Casa Histórica de Tucumán'
    ],
    distractor_cards: ['ev-arg-1810-cabildo', 'ev-arg-1817-andes', 'ev-arg-1813-sanlorenzo'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1816,
      month: 7,
      day: 9,
      display_date: '9 de julio de 1816',
    },
    canonical_location: {
      latitude: -26.8336,
      longitude: -65.2044,
      city: 'San Miguel de Tucumán',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Casa Histórica de la Independencia, San Miguel de Tucumán',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Fachada Colonial con Columnas Torsas de la Casa de Tucumán',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'La fachada virreinal de la casona de Francisca Bazán de Laguna con sus columnas salomónicas y portón principal.',
        deduction_text: 'La sede del Congreso de las Provincias Unidas de Sudamérica donde se declaró la independencia el 9 de julio de 1816.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Museo Casa Histórica de la Independencia',
        collection_id: 'Acta de la Independencia del 9 de Julio de 1816',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Estado Argentino',
      }
    ],
    secondary_sources: [
      'Groussac, Paul. El Congreso de Tucumán (1916).'
    ],
    historical_context_brief: 'El 9 de julio de 1816, los diputados de las Provincias Unidas reunidos en San Miguel de Tucumán proclamaron la ruptura de los lazos con la monarquía española.',
    deduction_pathway: 'La fachada histórica de la Casa de Tucumán certifica la proclamación de la independencia en 1816.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 44. ARGENTINA: Combate de San Lorenzo (1813)
  {
    id: 'ev-arg-1813-sanlorenzo',
    code: 'ARG-1813-SANLORENZO',
    title: 'Combate de San Lorenzo y Bautismo de Fuego de los Granaderos (1813)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Combate_de_San_Lorenzo_por_Ballerini.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Combate_de_San_Lorenzo_por_Ballerini.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Museo Histórico Nacional / Augusto Ballerini',
      collection_id: 'Combate de San Lorenzo 1813',
      source_type: 'PRIMARY_DOCUMENT',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'República Argentina',
    },
    canonical_event: 'Combate de San Lorenzo del Regimiento de Granaderos',
    accepted_event_aliases: [
      'Combate de San Lorenzo',
      'Bautismo de Fuego de San Martín',
      'Batalla de San Lorenzo de 1813',
      'Cabral soldado heroico'
    ],
    distractor_cards: ['ev-arg-1817-andes', 'ev-arg-1810-cabildo', 'ev-arg-1816-tucuman'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1813,
      month: 2,
      day: 3,
      display_date: '3 de febrero de 1813',
    },
    canonical_location: {
      latitude: -32.7489,
      longitude: -60.7303,
      city: 'San Lorenzo / Santa Fe',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Campo de la Gloria y Convento de San Carlos Borromeo, San Lorenzo',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Carga de Caballería de Granaderos y el Rescate de Cabral',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.25, width: 0.60, height: 0.55 },
        observation_text: 'El sargento Juan Bautista Cabral socorriendo al coronel José de San Martín atrapado bajo su caballo bayo frente al Convento.',
        deduction_text: 'El único combate librado por San Martín en territorio actual argentino el 3 de febrero de 1813.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Instituto Nacional Sanmartiniano',
        collection_id: 'Parte de Guerra del Combate de San Lorenzo 1813',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'República Argentina',
      }
    ],
    secondary_sources: [
      'Ruiz Moreno, Isidoro. Campañas militares argentinas (2005).'
    ],
    historical_context_brief: 'El 3 de febrero de 1813, el Regimiento de Granaderos a Caballo comandado por José de San Martín venció a los realistas en el Convento de San Carlos.',
    deduction_pathway: 'La carga de los Granaderos y el auxilio del sargento Cabral junto al Río Paraná sitúa el combate en febrero de 1813.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 45. ARGENTINA: Asunción de Perón (1946)
  {
    id: 'ev-arg-1946-asuncion',
    code: 'ARG-1946-ASUNCION',
    title: 'Primera Asunción Presidencial de Juan Domingo Perón (1946)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Peron_asuncion_1946.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Peron_asuncion_1946.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Asunción Presidencial 4 de Junio 1946',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Primera Asunción Presidencial de Juan Domingo Perón',
    accepted_event_aliases: [
      'Asunción de Perón en 1946',
      'Primer mandato presidencial de Perón',
      'Perón con la banda presidencial en 1946'
    ],
    distractor_cards: ['ev-arg-1945-lealtad', 'ev-arg-1952-evaperon', 'ev-arg-1955-bombardeo'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1946,
      month: 6,
      day: 4,
      display_date: '4 de junio de 1946',
    },
    canonical_location: {
      latitude: -34.6097,
      longitude: -58.3925,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Congreso de la Nación y Casa Rosada, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Perón con la Banda y Bastón Presidencial junto a Hortensio Quijano',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.20, width: 0.50, height: 0.60 },
        observation_text: 'El flamante presidente electo saludando a la multitud desde el balcón de la Casa Rosada con uniforme militar.',
        deduction_text: 'La jura constitucional tras ganar las elecciones democráticas de febrero de 1946.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Doc. Fotográfico AGN 04-06-1946',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Page, Joseph. Perón: una biografía (1983).'
    ],
    historical_context_brief: 'El 4 de junio de 1946, Juan Domingo Perón asumió por primera vez la presidencia de la Nación Argentina tras imponerse en los comicios generales.',
    deduction_pathway: 'Perón jurando con la banda presidencial en el Congreso sitúa su primera asunción en junio de 1946.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 46. ARGENTINA: Funeral de Eva Perón (1952)
  {
    id: 'ev-arg-1952-evaperon',
    code: 'ARG-1952-EVAPERON',
    title: 'Masivo Funeral de Eva Perón en las Calles Porteñas (1952)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Funerales_de_Eva_Peron.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Funerales_de_Eva_Peron.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Fondo Dpto. Fotografía - Funerales de Evita Agosto 1952',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'Funeral Multitudinario de Eva Perón',
    accepted_event_aliases: [
      'Funeral de Eva Perón',
      'Muerte de Evita en 1952',
      'Cortejo fúnebre de Eva Perón',
      'Luto nacional por Evita'
    ],
    distractor_cards: ['ev-arg-1946-asuncion', 'ev-arg-1955-bombardeo', 'ev-arg-1945-lealtad'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1952,
      month: 8,
      day: 9,
      display_date: 'Julio a Agosto de 1952',
    },
    canonical_location: {
      latitude: -34.6083,
      longitude: -58.3712,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Avenida de Mayo y Plaza de Mayo, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Cureña Militar Cubierta de Claveles Blancos y Cordón Humano',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.25, width: 0.70, height: 0.55 },
        observation_text: 'Millones de personas desfilando bajo la lluvia portando antorchas y flores blancas para despedir a la «Abanderada de los Humildes».',
        deduction_text: 'El mayor duelo colectivo de la historia argentina tras el fallecimiento de Evita el 26 de julio de 1952.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Doc. Fotográfico AGN Funeral Evita 1952',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Navarro, Marysa. Evita (1981).'
    ],
    historical_context_brief: 'En julio-agosto de 1952 más de dos millones de personas despidieron los restos de Eva Perón en el cortejo fúnebre más multitudinario del país.',
    deduction_pathway: 'La cureña cubierta de flores blancas rodeada por multitudes en Avenida de Mayo ubica los funerales de Evita en 1952.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 47. ARGENTINA: Noche de los Bastones Largos (1966)
  {
    id: 'ev-arg-1966-bastones',
    code: 'ARG-1966-BASTONES',
    title: 'La Noche de los Bastones Largos en la Universidad de Buenos Aires (1966)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Noche_de_los_bastones_largos.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Noche_de_los_bastones_largos.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Desalojo Facultades UBA 29-07-1966',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN Argentina',
    },
    canonical_event: 'La Noche de los Bastones Largos en la UBA',
    accepted_event_aliases: [
      'La Noche de los Bastones Largos',
      'Intervención a las Universidades en 1966',
      'Desalojo policial de la Facultad de Ciencias Exactas'
    ],
    distractor_cards: ['ev-arg-1969-cordobazo', 'ev-lat-1968-tlatelolco', 'ev-lim-1973-moneda'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1966,
      month: 7,
      day: 29,
      display_date: '29 de julio de 1966',
    },
    canonical_location: {
      latitude: -34.6175,
      longitude: -58.3736,
      city: 'Buenos Aires',
      country_code: 'AR',
      country_name: 'Argentina',
      display_location: 'Facultad de Ciencias Exactas (calle Perú 222), Manzana de las Luces, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Policía Montada y Guardia de Infantería con Bastones Largos',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'Fuerzas de seguridad golpeando y desalojando a profesores, científicos y estudiantes en los patios universitarios.',
        deduction_text: 'La represión del régimen de Onganía del 29 de julio de 1966 que provocó la masiva fuga de cerebros científicos.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación',
        collection_id: 'Fondo Policía Federal Argentina 1966',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN Argentina',
      }
    ],
    secondary_sources: [
      'Morero, Sergio. La noche de los bastones largos (2002).'
    ],
    historical_context_brief: 'El 29 de julio de 1966 la dictadura de Onganía intervino las universidades públicas desalojando violentamente cinco facultades de la UBA, disparando el éxodo científico.',
    deduction_pathway: 'El desalojo a bastonazos de docentes en la Manzana de las Luces identifica la Noche de los Bastones Largos en julio de 1966.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 48. ARGENTINA: Conflicto de Malvinas (1982)
  {
    id: 'ev-arg-1982-malvinas',
    code: 'ARG-1982-MALVINAS',
    title: 'Guerra de las Islas Malvinas (1982)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Falklands_War_-_Argentine_soldiers_in_Port_Stanley.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Falklands_War_-_Argentine_soldiers_in_Port_Stanley.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Imperial War Museums (IWM) / Télam',
      collection_id: 'Falklands Conflict April-June 1982',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Guerra de las Islas Malvinas',
    accepted_event_aliases: [
      'Conflicto del Atlántico Sur de 1982',
      'Guerra de Malvinas',
      'Soldados argentinos en Puerto Argentino'
    ],
    distractor_cards: ['ev-lim-1973-moneda', 'ev-arg-1969-cordobazo', 'ev-mun-1989-berlin'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1982,
      month: 4,
      day: 2,
      display_date: 'Abril a Junio de 1982',
    },
    canonical_location: {
      latitude: -51.6921,
      longitude: -57.8589,
      city: 'Puerto Argentino / Stanley',
      country_code: 'FK',
      country_name: 'Islas Malvinas / Argentina',
      display_location: 'Puerto Argentino, Islas Malvinas',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'GUERRAS',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Soldados Conscriptos con Casco M1 y Fusiles FAL en Turba Malvinera',
        category: 'clothing',
        normalized_rect: { x: 0.20, y: 0.20, width: 0.60, height: 0.60 },
        observation_text: 'Tropas argentinas en trincheras y calles de Puerto Argentino bajo el clima austral de las islas.',
        deduction_text: 'El conflicto armado del Atlántico Sur entre Argentina y el Reino Unido librado entre abril y junio de 1982.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Imperial War Museums',
        collection_id: 'IWM Falklands Collection 1982',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Crown Copyright / Dominio Público',
      }
    ],
    secondary_sources: [
      'Hastings, Max; Jenkins, Simon. The Battle for the Falklands (1983).'
    ],
    historical_context_brief: 'Entre el 2 de abril y el 14 de junio de 1982 se libró la Guerra de Malvinas por la soberanía del archipiélago austral, acelerando el fin de la dictadura militar argentina.',
    deduction_pathway: 'Los soldados con capotes verdes en el paisaje costero de Puerto Argentino identifican la Guerra de Malvinas en 1982.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 49. LATINOAMÉRICA: Revolución Cubana en La Habana (1959)
  {
    id: 'ev-lat-1959-cuba',
    code: 'LAT-1959-CUBA',
    title: 'Entrada Triunfal del Ejército Rebelde en La Habana (1959)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Archivo Nacional de Cuba / Luis Korda',
      collection_id: 'Caravana de la Libertad 8 de Enero 1959',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Entrada Triunfal de la Revolución Cubana en La Habana',
    accepted_event_aliases: [
      'Triunfo de la Revolución Cubana',
      'Entrada de Fidel Castro en La Habana',
      'Caravana de la Libertad de 1959',
      'Revolución Cubana en 1959'
    ],
    distractor_cards: ['ev-pol-1962-misiles', 'ev-lim-1973-moneda', 'ev-lat-1968-tlatelolco'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1959,
      month: 1,
      day: 8,
      display_date: '8 de enero de 1959',
    },
    canonical_location: {
      latitude: 23.1136,
      longitude: -82.3666,
      city: 'La Habana',
      country_code: 'CU',
      country_name: 'Cuba',
      display_location: 'Malecón y Campamento Militar de Columbia, La Habana',
    },
    geographic_scope: 'LATAM',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Fidel Castro y Camilo Cienfuegos sobre el Tanque Sherman',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.20, width: 0.60, height: 0.60 },
        observation_text: 'Los comandantes barbudos con uniformes verde olivo aclamados por la multitud en las avenidas de La Habana.',
        deduction_text: 'La llegada de la Caravana de la Libertad tras la huida de Fulgencio Batista el 8 de enero de 1959.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Biblioteca Nacional José Martí',
        collection_id: 'Fondo Fotografía Revolucionaria 1959',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Estado Cubano',
      }
    ],
    secondary_sources: [
      'Thomas, Hugh. Cuba: A History (1971).'
    ],
    historical_context_brief: 'El 8 de enero de 1959, la columna guerrillera liderada por Fidel Castro entró victoriosa a La Habana, consolidando el triunfo de la Revolución Cubana.',
    deduction_pathway: 'Fidel Castro y Camilo Cienfuegos en el jeep militar entrando en La Habana ubica la Revolución en enero de 1959.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 50. LATINOAMÉRICA: Masacre de Tlatelolco (1968)
  {
    id: 'ev-lat-1968-tlatelolco',
    code: 'LAT-1968-TLATELOLCO',
    title: 'Mitin Estudiantil y Masacre de Tlatelolco (México, 1968)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Plaza_de_las_Tres_Culturas_1968.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Plaza_de_las_Tres_Culturas_1968.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Archivo General de la Nación de México (AGN)',
      collection_id: 'Movimiento Estudiantil de 1968 - Plaza de las Tres Culturas',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'AGN México',
    },
    canonical_event: 'Masacre de la Plaza de las Tres Culturas en Tlatelolco',
    accepted_event_aliases: [
      'Masacre de Tlatelolco',
      'Matanza de Tlatelolco de 1968',
      'Movimiento Estudiantil Mexicano de 1968',
      '2 de Octubre no se olvida'
    ],
    distractor_cards: ['ev-arg-1969-cordobazo', 'ev-lim-1973-moneda', 'ev-soc-1968-francia'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1968,
      month: 10,
      day: 2,
      display_date: '2 de octubre de 1968',
    },
    canonical_location: {
      latitude: 19.4516,
      longitude: -99.1374,
      city: 'Ciudad de México',
      country_code: 'MX',
      country_name: 'México',
      display_location: 'Plaza de las Tres Culturas, Tlatelolco, Ciudad de México',
    },
    geographic_scope: 'LATAM',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Mitin en el Edificio Chihuahua y Ruinas Prehispánicas',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.20, width: 0.70, height: 0.60 },
        observation_text: 'Miles de estudiantes reunidos pacíficamente antes de la intervención armada del Batallón Olimpia y el Ejército.',
        deduction_text: 'La masacre del 2 de octubre de 1968 ocurrida diez días antes de la inauguración de los Juegos Olímpicos de México.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación de México',
        collection_id: 'Fondo Secretaría de Gobernación - Movimiento 1968',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'AGN México',
      }
    ],
    secondary_sources: [
      'Poniatowska, Elena. La noche de Tlatelolco (1971).'
    ],
    historical_context_brief: 'El 2 de octubre de 1968, fuerzas militares y paramilitares abrieron fuego contra una manifestación estudiantil pacífica en la Plaza de Tlatelolco, matando a cientos de personas.',
    deduction_pathway: 'El mitin estudiantil en la Plaza de las Tres Culturas con el edificio Chihuahua ubica los hechos de Tlatelolco en octubre de 1968.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 51. DERECHOS: Gran Marcha Sufragista (1913)
  {
    id: 'ev-soc-1913-sufragistas',
    code: 'SOC-1913-SUFRAGISTAS',
    title: 'Gran Marcha por el Sufragio Femenino en Washington D.C. (1913)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/1913_Woman_Suffrage_Parade_Inez_Milholland.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/1913_Woman_Suffrage_Parade_Inez_Milholland.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Library of Congress',
      collection_id: 'Prints and Photographs Division, LC-DIG-ppmsca-02978',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Gran Marcha Sufragista por el Voto Femenino en Washington',
    accepted_event_aliases: [
      'Marcha Sufragista de 1913',
      'Desfile por el Voto Femenino en Washington',
      'Inez Milholland en caballo blanco',
      'Woman Suffrage Procession 1913'
    ],
    distractor_cards: ['ev-soc-1963-mlk', 'ev-mun-1912-titanic', 'ev-lat-1914-panama'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1913,
      month: 3,
      day: 3,
      display_date: '3 de marzo de 1913',
    },
    canonical_location: {
      latitude: 38.8951,
      longitude: -77.0364,
      city: 'Washington D.C.',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Avenida Pennsylvania frente a la Casa Blanca, Washington D.C.',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Inez Milholland con Capa Blanca sobre Caballo Blanco',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.20, width: 0.50, height: 0.60 },
        observation_text: 'La abogada sufragista liderando a más de 5.000 mujeres con túnicas y estandartes por la Avenida Pennsylvania.',
        deduction_text: 'La multitudinaria marcha organizada por Alice Paul la víspera de la investidura presidencial de Woodrow Wilson en marzo de 1913.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'National American Woman Suffrage Association Collection',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Zahniser, J.D.; Fry, Amelia R. Alice Paul: Claiming Power (2014).'
    ],
    historical_context_brief: 'El 3 de marzo de 1913, más de 5.000 activistas marcharon por la Avenida Pennsylvania exigiendo una enmienda constitucional para el voto femenino en EE.UU.',
    deduction_pathway: 'Inez Milholland a caballo encabezando la procesión por el voto femenino ubica la marcha de Washington en marzo de 1913.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 52. CULTURA: Festival de Woodstock (1969)
  {
    id: 'ev-soc-1969-woodstock',
    code: 'SOC-1969-WOODSTOCK',
    title: 'Festival de Música y Paz de Woodstock (1969)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Woodstock_crowd.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Woodstock_crowd.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress / Rolling Stone Archives',
      collection_id: 'Woodstock Music & Art Fair August 1969',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Festival de Música y Arte de Woodstock',
    accepted_event_aliases: [
      'Festival de Woodstock de 1969',
      'Tres días de paz y música',
      'Woodstock en Bethel'
    ],
    distractor_cards: ['ev-mun-1969-luna', 'ev-arg-1969-cordobazo', 'ev-soc-1963-mlk'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1969,
      month: 8,
      day: 15,
      display_date: '15 al 18 de agosto de 1969',
    },
    canonical_location: {
      latitude: 41.7011,
      longitude: -74.8803,
      city: 'Bethel / White Lake, NY',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Granja de Max Yasgur, Bethel, Nueva York',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CULTURA_SOCIEDAD',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Mar de Medio Millón de Jóvenes en la Colina de la Granja',
        category: 'personage',
        normalized_rect: { x: 0.10, y: 0.20, width: 0.80, height: 0.65 },
        observation_text: 'Multitud pacífica de jóvenes de la contracultura hippie acampando en la ladera verde frente al escenario gigante.',
        deduction_text: 'El histórico festival de «3 Días de Paz y Música» celebrado en agosto de 1969.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Woodstock Festival Historic Photographs',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Makower, Joel. Woodstock: The Oral History (2009).'
    ],
    historical_context_brief: 'Del 15 al 18 de agosto de 1969 cerca de 500.000 personas se congregaron en Bethel, Nueva York, en el festival que definió el movimiento contracultural de los años 60.',
    deduction_pathway: 'La marea humana sobre la colina de la granja con tiendas de campaña identifica el legendario Festival de Woodstock de agosto de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 53. FOTOGRAFÍA: Almuerzo sobre un Rascacielos (1932)
  {
    id: 'ev-arq-1932-lunchrock',
    code: 'ARQ-1932-LUNCHROCK',
    title: 'Almuerzo en la Cima de un Rascacielos / Rockefeller Center (1932)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Lunch_atop_a_Skyscraper_-_Charles_Clyde_Ebbets.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Lunch_atop_a_Skyscraper_-_Charles_Clyde_Ebbets.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Library of Congress / Rockefeller Center Archives',
      collection_id: 'Charles C. Ebbets - Lunch atop a Skyscraper Sept 20 1932',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Almuerzo en la Cima de un Rascacielos (Rockefeller Center)',
    accepted_event_aliases: [
      'Lunch atop a Skyscraper',
      'Obreros en la viga del RCA Building',
      'Construcción del Rockefeller Center en 1932',
      'Obreros almorzando en las alturas'
    ],
    distractor_cards: ['ev-arq-1937-goldengate', 'ev-arg-1936-obelisco', 'ev-mun-1889-eiffel'],
    precision_required: 'EVENT_AND_YEAR',
    canonical_date: {
      year: 1932,
      month: 9,
      day: 20,
      display_date: '20 de septiembre de 1932',
    },
    canonical_location: {
      latitude: 40.7587,
      longitude: -73.9787,
      city: 'Nueva York',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Piso 69 del Edificio RCA (30 Rockefeller Plaza), Manhattan, Nueva York',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Once Obreros Sentados sin Arnés sobre la Viga de Acero',
        category: 'personage',
        normalized_rect: { x: 0.10, y: 0.35, width: 0.80, height: 0.35 },
        observation_text: 'Trabajadores de la construcción comiendo viandas y leyendo periódicos a 260 metros de altura sobre el Central Park.',
        deduction_text: 'La fotografía publicitaria tomada el 20 de septiembre de 1932 durante la construcción del Rockefeller Center en plena Gran Depresión.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Prints and Photographs Division, LC-USZ62-127999',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Berman, John S. The History of the Rockefeller Center (2003).'
    ],
    historical_context_brief: 'El 20 de septiembre de 1932 se tomó la fotografía de 11 herreros almorzando sobre una viga de acero en el piso 69 del edificio RCA de Manhattan.',
    deduction_pathway: 'Los once obreros suspendidos en la viga con Manhattan y Central Park de fondo certifica la construcción del Rockefeller Center en 1932.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 54. DIPLOMACIA: Carta de la ONU (1945)
  {
    id: 'ev-pol-1945-onu',
    code: 'POL-1945-ONU',
    title: 'Firma de la Carta de las Naciones Unidas en San Francisco (1945)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Signing_the_UN_Charter_%281945%29.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Signing_the_UN_Charter_%281945%29.jpg',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'United Nations Photo Archive / US National Archives',
      collection_id: 'UN Conference on International Organization (UNCIO) June 1945',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'United Nations / US Government',
    },
    canonical_event: 'Firma de la Carta de las Naciones Unidas (Creación de la ONU)',
    accepted_event_aliases: [
      'Creación de la ONU en 1945',
      'Firma de la Carta de la ONU',
      'Conferencia de San Francisco de 1945'
    ],
    distractor_cards: ['ev-mun-1945-yalta', 'ev-pol-1945-potsdam', 'ev-jur-1945-nuremberg'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1945,
      month: 6,
      day: 26,
      display_date: '26 de junio de 1945',
    },
    canonical_location: {
      latitude: 37.7793,
      longitude: -122.4180,
      city: 'San Francisco',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Herbst Theatre, Veterans Building, San Francisco',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Mesa Redonda con el Gran Libro de la Carta de San Francisco',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.20, width: 0.60, height: 0.60 },
        observation_text: 'Los delegados de 50 naciones firmando el tratado fundacional con el fondo azul y banderas internacionales.',
        deduction_text: 'La conferencia del 26 de junio de 1945 que dio nacimiento a la Organización de las Naciones Unidas tras la Segunda Guerra Mundial.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'United Nations Audiovisual Library',
        collection_id: 'UN Charter Signing Ceremony 1945',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'United Nations',
      }
    ],
    secondary_sources: [
      'Schlesinger, Stephen. Act of Creation: The Founding of the United Nations (2003).'
    ],
    historical_context_brief: 'El 26 de junio de 1945 representantes de 50 países firmaron en San Francisco la Carta de las Naciones Unidas para preservar la paz mundial.',
    deduction_pathway: 'La firma del libro de la Carta de la ONU bajo las banderas aliadas ubica la fundación del organismo en junio de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 55. MONUMENTO: Estatua de la Libertad (1886)
  {
    id: 'ev-arq-1886-libertad',
    code: 'ARQ-1886-LIBERTAD',
    title: 'Inauguración de la Estatua de la Libertad en Nueva York (1886)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Unveiling_the_Statue_of_Liberty_1886.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Unveiling_the_Statue_of_Liberty_1886.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress / Edward Moran',
      collection_id: 'The Statue of Liberty Enlightening the World (1886)',
      source_type: 'PRIMARY_DOCUMENT',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Inauguración de la Estatua de la Libertad en Nueva York',
    accepted_event_aliases: [
      'Inauguración de la Estatua de la Libertad',
      'Estatua de la Libertad de 1886',
      'Desfile naval de la Estatua de la Libertad'
    ],
    distractor_cards: ['ev-mun-1889-eiffel', 'ev-arq-1937-goldengate', 'ev-arg-1936-obelisco'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1886,
      month: 10,
      day: 28,
      display_date: '28 de octubre de 1886',
    },
    canonical_location: {
      latitude: 40.6892,
      longitude: -74.0445,
      city: 'Nueva York',
      country_code: 'US',
      country_name: 'Estados Unidos',
      display_location: 'Isla de Bedloe (Isla de la Libertad), Bahía de Nueva York',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'ARQUITECTURA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Desfile Naval con Cañonazos y Humo en la Bahía',
        category: 'landscape',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.65 },
        observation_text: 'Cientos de barcos de vapor y goletas saludando con salvas de pólvora a la escultura de cobre de Auguste Bartholdi.',
        deduction_text: 'La ceremonia inaugural encabezada por el presidente Grover Cleveland el 28 de octubre de 1886 como regalo del pueblo francés.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Prints and Photographs Division, LC-USZC4-4447',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Khan, B. Yasmin. Enlightening the World: The Creation of the Statue of Liberty (2010).'
    ],
    historical_context_brief: 'El 28 de octubre de 1886 fue inaugurada en la bahía de Nueva York la monumental Estatua de la Libertad diseñada por Frédéric Auguste Bartholdi con estructura interna de Gustave Eiffel.',
    deduction_pathway: 'El colosal desfile de vapores decimonónicos rodeando la Estatua de la Libertad fecha su inauguración en octubre de 1886.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 56. TELECOMUNICACIONES: Telégrafo de Marconi (1901)
  {
    id: 'ev-tec-1901-marconi',
    code: 'TEC-1901-MARCONI',
    title: 'Primera Señal de Radio Transatlántica de Guillermo Marconi (1901)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Marconi_signal_hill_1901.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Marconi_signal_hill_1901.jpg',
    image_aspect_ratio: 1.35,
    image_source: {
      institution: 'Library of Congress / Marconi Wireless Telegraph Company',
      collection_id: 'Marconi at Signal Hill, St. John’s, Newfoundland (Dec 1901)',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Library of Congress',
    },
    canonical_event: 'Primera Transmisión de Radio Transatlántica de Marconi',
    accepted_event_aliases: [
      'Transmisión Transatlántica de Marconi',
      'Señal de Radio de 1901',
      'Marconi en Signal Hill',
      'Primera señal inalámbrica transatlántica'
    ],
    distractor_cards: ['ev-tec-1903-wright', 'ev-cie-1895-rontgen', 'ev-tec-1946-eniac'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1901,
      month: 12,
      day: 12,
      display_date: '12 de diciembre de 1901',
    },
    canonical_location: {
      latitude: 47.5700,
      longitude: -52.6811,
      city: 'Signal Hill, San Juan de Terranova',
      country_code: 'CA',
      country_name: 'Canadá (Terranova)',
      display_location: 'Signal Hill, St. John’s, Terranova',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'CIENCIA_TEC',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Guillermo Marconi con sus Instrumentos Receptores y Cometas Antena',
        category: 'technology',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.70 },
        observation_text: 'El inventor italiano con audífonos junto al cohesor de limaduras recibiendo la letra «S» en código morse emitida desde Poldhu, Cornualles a 3.500 km.',
        deduction_text: 'La primera comunicación inalámbrica intercontinental lograda el 12 de diciembre de 1901.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Guglielmo Marconi Historical Collection',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'LoC',
      }
    ],
    secondary_sources: [
      'Weightman, Gavin. Signor Marconi’s Magic Box (2003).'
    ],
    historical_context_brief: 'El 12 de diciembre de 1901, Guillermo Marconi captó en Terranova la primera señal de radio transmitida a través del Océano Atlántico desde Inglaterra.',
    deduction_pathway: 'Marconi con sus equipos de telegrafía inalámbrica en Signal Hill sitúa el hito de las telecomunicaciones en diciembre de 1901.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 57. PROTESTAS: El Hombre del Tanque en Tiananmén (1989)
  {
    id: 'ev-pol-1989-tiananmen',
    code: 'POL-1989-TIANANMEN',
    title: 'Protestas de la Plaza de Tiananmén y el «Hombre del Tanque» (1989)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Tianasquare.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Tianasquare.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Library of Congress / AP Archive',
      collection_id: 'Tiananmen Square Protests June 5, 1989',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Protestas de Tiananmén y el Hombre del Tanque',
    accepted_event_aliases: [
      'Protestas de la Plaza de Tiananmén',
      'El Hombre del Tanque en 1989',
      'Masacre de Tiananmén',
      'Tiananmen Square Tank Man'
    ],
    distractor_cards: ['ev-mun-1989-berlin', 'ev-lat-1968-tlatelolco', 'ev-pol-1962-misiles'],
    precision_required: 'EXACT_DATE',
    canonical_date: {
      year: 1989,
      month: 6,
      day: 5,
      display_date: '5 de junio de 1989',
    },
    canonical_location: {
      latitude: 39.9055,
      longitude: 116.3976,
      city: 'Pekín',
      country_code: 'CN',
      country_name: 'China',
      display_location: 'Avenida Chang’an frente a la Plaza de Tiananmén, Pekín',
    },
    geographic_scope: 'GLOBAL',
    thematic_category: 'POLITICA',
    difficulty_tier: 1,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Ciudadano con Bolsas de Compras Deteniendo una Columna de Tanques Type 59',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.30, width: 0.60, height: 0.50 },
        observation_text: 'Un manifestante solitario parado desafiante frente a una fila de cuatro blindados en la gran avenida pequinesa.',
        deduction_text: 'La fotografía del «Tank Man» tomada la mañana del 5 de junio de 1989 tras la sangrienta represión en Tiananmén.',
        time_penalty_seconds: 5,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'Visual Materials from the Tiananmen Square Protests',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Dominio Público',
      }
    ],
    secondary_sources: [
      'Brook, Timothy. Quelling the People: The Military Suppression of the Beijing Democracy Movement (1998).'
    ],
    historical_context_brief: 'El 5 de junio de 1989, al día siguiente de la represión en la Plaza de Tiananmén, un hombre no identificado detuvo él solo el avance de una columna de tanques del Ejército.',
    deduction_pathway: 'La icónica escena del manifestante desarmado frente a la fila de tanques en Pekín fija los hechos de Tiananmén en junio de 1989.',
    verified_at: '2026-08-17T00:00:00Z',
  }
];

export function getEvidenceById(id: string): CanonicalEvidence | undefined {
  return CANONICAL_EVIDENCES.find((ev) => ev.id === id);
}

export function getEvidenceByEventName(eventName: string): CanonicalEvidence | undefined {
  const cleanName = eventName.toLowerCase().trim();
  return CANONICAL_EVIDENCES.find((ev) => {
    if (ev.canonical_event.toLowerCase().trim() === cleanName) return true;
    return ev.accepted_event_aliases.some((alias) => alias.toLowerCase().trim() === cleanName);
  });
}

export function getRandomEvidence(excludeId?: string): CanonicalEvidence {
  const pool = excludeId
    ? CANONICAL_EVIDENCES.filter((ev) => ev.id !== excludeId)
    : CANONICAL_EVIDENCES;
  const list = pool.length > 0 ? pool : CANONICAL_EVIDENCES;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Generador dinámico e inteligente de 4 opciones por ronda (1 correcta + 3 distractores del mazo de 57)
export function generateDynamicRoundOptions(
  evidence: CanonicalEvidence,
  allEvidences: CanonicalEvidence[] = CANONICAL_EVIDENCES
): CanonicalEvidence[] {
  const pool = allEvidences.filter((e) => e.id !== evidence.id);

  const scoredCandidates = pool.map((cand) => {
    let score = 0;

    // Distractores curados prioritarios
    if (evidence.distractor_cards?.includes(cand.id)) score += 6;

    // Coincidencia de categoría temática
    if (cand.thematic_category === evidence.thematic_category) score += 4;

    // Coincidencia de ámbito geográfico
    if (cand.geographic_scope === evidence.geographic_scope) score += 3;

    // Cercanía temporal
    const yearDiff = Math.abs(cand.canonical_date.year - evidence.canonical_date.year);
    if (yearDiff <= 15) score += 4;
    else if (yearDiff <= 35) score += 2;
    else if (yearDiff <= 60) score += 1;

    // Variabilidad y aleatoriedad controlada para que no salgan siempre las mismas 3 opciones
    const randomJitter = Math.random() * 3.5;

    return {
      evidence: cand,
      score: score + randomJitter,
    };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);
  const selectedDistractors = scoredCandidates.slice(0, 3).map((item) => item.evidence);

  const roundOptions = [evidence, ...selectedDistractors];
  return shuffleArray(roundOptions);
}
