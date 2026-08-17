import { CanonicalEvidence } from '@/types/evidence';

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
    distractor_events: [
      'Inauguración del Edificio Kavanagh',
      'Construcción del Puente Alsina',
      'Apertura del Ensanche de Av. Corrientes',
      'Inauguración del Obelisco de Buenos Aires'
    ],
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
    distractor_events: [
      'Jura de la Constitución de 1853',
      'Declaración de la Independencia en Tucumán',
      'Invasiones Inglesas al Río de la Plata',
      'Cabildo Abierto del 22 de Mayo de 1810'
    ],
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
    distractor_events: [
      'Batalla de San Lorenzo',
      'El Cruce de los Andes del General San Martín',
      'Batalla de Maipú',
      'Éxodo Jujeño y Batalla de Salta'
    ],
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
    canonical_event: 'Quinta Conferencia Solvay',
    accepted_event_aliases: [
      'Conferencia Solvay de 1927',
      'Debate Bohr-Einstein en Bruselas',
      'Congreso Solvay sobre Electrones y Fotones',
      'Conferencia Solvay'
    ],
    distractor_events: [
      'Conferencia de Física Cuántica de Copenhague',
      'Premio Nobel de Física a Einstein y Planck',
      'Quinta Conferencia Solvay',
      'Primer Congreso Internacional de Radiología'
    ],
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
    historical_context_brief: 'En octubre de 1927 se celebró en Bruselas la 5.ª Conferencia Solvay reuniendo a los mayores físicos de la historia.',
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
    canonical_event: 'Primer Alunizaje del Apolo 11',
    accepted_event_aliases: [
      'Llegada del hombre a la Luna',
      'Misión Apolo 11',
      'Alunizaje del Apolo 11',
      'Paseo lunar de Neil Armstrong y Buzz Aldrin'
    ],
    distractor_events: [
      'Misión Apolo 8 orbitando la Luna',
      'Primer Alunizaje del Apolo 11',
      'Lanzamiento del Sputnik 1',
      'Primera caminata espacial del Gemini 4'
    ],
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
        observation_text: 'El visor dorado de Buzz Aldrin refleja al fotógrafo Neil Armstrong y el módulo lunar.',
        deduction_text: 'La fotografía de la primera caminata lunar del 20 de julio de 1969.',
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
    historical_context_brief: 'El 20 de julio de 1969, la misión Apolo 11 aterrizó en el Mar de la Tranquilidad y Neil Armstrong pisó la Luna.',
    deduction_pathway: 'Aldrin fotografiado por Armstrong en suelo lunar fija el hito el 20 de julio de 1969.',
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
    distractor_events: [
      'Revolución de Terciopelo en Praga',
      'Construcción del Muro de Berlín en 1961',
      'Caída del Muro de Berlín',
      'Protestas de la Plaza de Tiananmén'
    ],
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
    historical_context_brief: 'El 9 de noviembre de 1989 los berlineses derribaron pacíficamente el Muro de Berlín.',
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
    distractor_events: [
      'Bombardeo de Dresde',
      'Bombardeo Atómico de Hiroshima',
      'Prueba Nuclear Trinity en Los Álamos',
      'Bombardeo de Pearl Harbor'
    ],
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
    historical_context_brief: 'El 6 de agosto de 1945 detonó la bomba atómica sobre Hiroshima.',
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
    distractor_events: [
      'Conferencia de Potsdam',
      'Conferencia de Yalta (Los Tres Grandes)',
      'Conferencia de Teherán',
      'Firma de la Carta de las Naciones Unidas'
    ],
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
        observation_text: 'Winston Churchill con uniforme de la RAF, Franklin D. Roosevelt con capa oscura y Iósif Stalin con uniforme de mariscal soviético.',
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
    historical_context_brief: 'En febrero de 1945, los líderes aliados se reunieron en Yalta para planear el final de la Segunda Guerra Mundial en Europa.',
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
    distractor_events: [
      'Desembarco de Normandía (Día D)',
      'Liberación de París y Desfile Triunfal',
      'Batalla de las Ardenas',
      'Rendición de Berlín en 1945'
    ],
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
        observation_text: 'Millones de parisinos celebrando el paso de las tropas blindadas aliadas y francesas.',
        deduction_text: 'El histórico desfile triunfal del 26 de agosto de 1944 encabezado por Charles de Gaulle.',
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
    distractor_events: [
      'Primer vuelo de Santos Dumont en París',
      'Primer Vuelo a Motor de los Hermanos Wright',
      'Cruce del Canal de la Mancha por Louis Blériot',
      'Construcción del primer dirigible Zeppelin'
    ],
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
    canonical_event: 'Construcción de la Torre Eiffel',
    accepted_event_aliases: [
      'Construcción de la Torre Eiffel',
      'Exposición Universal de París de 1889',
      'Obras de la Torre Eiffel por Gustave Eiffel'
    ],
    distractor_events: [
      'Inauguración de la Estatua de la Libertad en Nueva York',
      'Construcción de la Torre Eiffel',
      'Apertura de la Ópera Garnier de París',
      'Construcción del Puente de la Torre de Londres'
    ],
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
    canonical_event: 'Jornada del 17 de Octubre de 1945 (Día de la Lealtad)',
    accepted_event_aliases: [
      '17 de Octubre de 1945',
      'Día de la Lealtad Peronista',
      'Movilización obrera a Plaza de Mayo en 1945',
      'Patas en las fuentes de Plaza de Mayo'
    ],
    distractor_events: [
      'Bombardeo de Plaza de Mayo en 1955',
      'Jornada del 17 de Octubre de 1945 (Día de la Lealtad)',
      'Asunción presidencial de Juan Domingo Perón en 1946',
      'El Cordobazo de 1969'
    ],
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
        observation_text: 'Columnas de trabajadores en mangas de camisa con los pies sumergidos en las fuentes de agua frente al Cabildo y la Casa Rosada.',
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
    historical_context_brief: 'El 17 de octubre de 1945, cientos de miles de obreros marcharon a Plaza de Mayo para exigir la liberación de Juan Domingo Perón, marcando el nacimiento del peronismo.',
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
    canonical_event: 'Partida del Titanic en su Viaje Inaugural',
    accepted_event_aliases: [
      'Viaje inaugural del RMS Titanic',
      'Partida del Titanic de Southampton',
      'Hundimiento del Titanic',
      'RMS Titanic en 1912'
    ],
    distractor_events: [
      'Hundimiento del RMS Lusitania en 1915',
      'Partida del Titanic en su Viaje Inaugural',
      'Viaje inaugural del SS Normandie',
      'Construcción del puerto de Southampton'
    ],
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
        observation_text: 'El monumental transatlántico británico de 269 metros navegando en aguas abiertas.',
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

  // 14. MEDICINA: Alexander Fleming y el Descubrimiento de la Penicilina (1928)
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
    canonical_event: 'Descubrimiento y Síntesis de la Penicilina',
    accepted_event_aliases: [
      'Descubrimiento de la Penicilina',
      'Alexander Fleming en su Laboratorio',
      'Primer Antibiótico del Mundo'
    ],
    distractor_events: [
      'Descubrimiento de la Vacuna contra la Polio por Salk',
      'Descubrimiento y Síntesis de la Penicilina',
      'Premio Nobel a Louis Pasteur por la Rabia',
      'Descubrimiento de la Estructura del ADN en 1953'
    ],
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
        title: 'Sir Alexander Fleming con Placas de Petri y Cultivos de Penicillium',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.70 },
        observation_text: 'El científico escocés examinando en su laboratorio las placas donde el hongo Penicillium notatum destruyó bacterias estafilococos.',
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
    distractor_events: [
      'Marchas de Selma a Montgomery',
      'Discurso «I Have a Dream» de Martin Luther King',
      'Boicot de Autobuses de Montgomery',
      'Firma de la Ley de Derechos Civiles de 1964'
    ],
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
        observation_text: 'El Dr. Martin Luther King Jr. gesticulando ante los micrófonos en la escalinata de Lincoln.',
        deduction_text: 'El histórico discurso por los derechos civiles pronunciado el 28 de agosto de 1963.',
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
    historical_context_brief: 'El 28 de agosto de 1963, MLK pronunció su histórico discurso «I Have a Dream» en Washington D.C.',
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
    canonical_event: 'El Cordobazo',
    accepted_event_aliases: [
      'Insurrección de Córdoba',
      'Protestas del Cordobazo de 1969',
      'El Cordobazo',
      'Jornadas del 29 y 30 de mayo de 1969'
    ],
    distractor_events: [
      'El Rosariazo de mayo de 1969',
      'El Cordobazo',
      'La Noche de los Bastones Largos (1966)',
      'El Viborazo en Córdoba (1971)'
    ],
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
        observation_text: 'Columnas de obreros y estudiantes marchando por el centro cordobés.',
        deduction_text: 'La gran huelga general activa del 29 de mayo de 1969 contra Onganía.',
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
    historical_context_brief: 'El 29 y 30 de mayo de 1969 se produjo la insurrección del Cordobazo.',
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
    distractor_events: [
      'El Tanquetazo en Santiago',
      'Golpe de Estado y Bombardeo a La Moneda',
      'Plebiscito Nacional de Chile de 1988',
      'Nacionalización de la Gran Minería del Cobre'
    ],
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
        deduction_text: 'El Palacio de La Moneda bombardeado por aviones de combate el 11 de septiembre de 1973.',
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
    historical_context_brief: 'El 11 de septiembre de 1973 fue derrocado Salvador Allende tras el bombardeo a La Moneda.',
    deduction_pathway: 'La Moneda ardiendo en Santiago ubica el golpe del 11 de septiembre de 1973.',
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
    canonical_event: 'Inauguración del Canal de Panamá',
    accepted_event_aliases: [
      'Paso inaugural del vapor Ancón',
      'Apertura del Canal de Panamá',
      'Inauguración del Canal de Panamá de 1914'
    ],
    distractor_events: [
      'Tratado Hay-Bunau Varilla',
      'Construcción del Ferrocarril Transístmico de Panamá',
      'Inauguración del Canal de Panamá',
      'Apertura del Canal de Suez en Egipto'
    ],
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
        observation_text: 'Buque de vapor SS Ancón en el paso inaugural oficial.',
        deduction_text: 'La apertura del Canal de Panamá el 15 de agosto de 1914.',
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
    historical_context_brief: 'El 15 de agosto de 1914 se inauguró oficialmente el Canal de Panamá con el paso del vapor Ancón.',
    deduction_pathway: 'El buque Ancón en las esclusas de Miraflores certifica la apertura del Canal en 1914.',
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
    canonical_event: 'Atentado de Sarajevo',
    accepted_event_aliases: [
      'Asesinato del Archiduque Francisco Fernando',
      'Atentado de Sarajevo de 1914',
      'Detonante de la Primera Guerra Mundial'
    ],
    distractor_events: [
      'Firma del Tratado de Versalles',
      'Atentado de Sarajevo',
      'Batalla de Verdún',
      'Crisis diplomática de Agadir'
    ],
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
        title: 'Archiduque Francisco Fernando y Sofía en el Automóvil Descapotable',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.25, width: 0.50, height: 0.50 },
        observation_text: 'El heredero al trono austrohúngaro en el coche descapotable minutos antes del atentado.',
        deduction_text: 'El magnicidio del 28 de junio de 1914 que desató la Primera Guerra Mundial.',
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
    historical_context_brief: 'El 28 de junio de 1914 fue asesinado en Sarajevo el archiduque Francisco Fernando.',
    deduction_pathway: 'El archiduque en el automóvil imperial en Sarajevo identifica el detonante de la Gran Guerra en 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  }
];

export function getEvidenceById(id: string): CanonicalEvidence | undefined {
  return CANONICAL_EVIDENCES.find((ev) => ev.id === id);
}

export function getRandomEvidence(excludeId?: string): CanonicalEvidence {
  const pool = excludeId
    ? CANONICAL_EVIDENCES.filter((ev) => ev.id !== excludeId)
    : CANONICAL_EVIDENCES;
  const list = pool.length > 0 ? pool : CANONICAL_EVIDENCES;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
