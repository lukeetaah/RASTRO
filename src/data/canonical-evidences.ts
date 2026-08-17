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
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-2',
        title: 'Parque Automotor de los Años 30',
        category: 'vehicle',
        normalized_rect: { x: 0.05, y: 0.65, width: 0.38, height: 0.30 },
        observation_text: 'Automóviles sedan Ford modelo B y vías de tranvía en la intersección de Corrientes.',
        deduction_text: 'Los modelos de vehículos y el transporte público sitúan la escena inequívocamente a mediados de la década de 1930.',
        time_penalty_seconds: 6,
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
        observation_text: 'Oradores criollos (Juan José Castelli y Juan José Paso) debatiendo acaloradamente ante los cabildantes sobre la soberanía popular tras la caída de Fernando VII.',
        deduction_text: 'El histórico debate del 22 de mayo de 1810 en el Cabildo de Buenos Aires que destituyó al virrey Cisneros y abrió paso a la Primera Junta.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Indumentaria Colonial Virreinal y Galeras',
        category: 'clothing',
        normalized_rect: { x: 0.05, y: 0.45, width: 0.30, height: 0.45 },
        observation_text: 'Casacas, levitas virreinales, sombreros bicornios y uniformes de oficiales del Regimiento de Patricios.',
        deduction_text: 'La indumentaria sitúa la escena en el Virreinato del Río de la Plata a principios del siglo XIX (1810).',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'El 22 de mayo de 1810 se celebró en Buenos Aires el histórico Cabildo Abierto que proclamó la retroversión de la soberanía al pueblo, culminando el 25 de mayo con la creación del primer gobierno patrio.',
    deduction_pathway: 'La célebre pintura de Subercaseaux que retrata la Sala Capitular del Cabildo de Buenos Aires representa el debate del 22 de mayo de 1810.',
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
        deduction_text: 'La célebre hazaña militar de enero-febrero de 1817 para liberar a Chile de la corona española.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Columnas de Granaderos y Cañones a Cuesta',
        category: 'landscape',
        normalized_rect: { x: 0.05, y: 0.50, width: 0.40, height: 0.40 },
        observation_text: 'Granaderos a Caballo y mulas transportando piezas de artillería desarmadas a más de 4.000 metros de altura.',
        deduction_text: 'La división del ejército por seis pasos cordilleranos simultáneos diseñada por San Martín en 1817.',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'En enero de 1817, más de 5.000 soldados del Ejército de los Andes al mando de José de San Martín cruzaron la cordillera rumbo a Chile, derrotando a los realistas en Chacabuco.',
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
        observation_text: 'Marie Curie sentada en el centro junto a Hendrik Lorentz, Albert Einstein, Paul Langevin y Max Planck.',
        deduction_text: 'La reunión de los pioneros de la relatividad y el electromagnetismo en octubre de 1927 en Bruselas.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Fila Superior: Heisenberg, Pauli, Dirac y Schrödinger',
        category: 'personage',
        normalized_rect: { x: 0.18, y: 0.08, width: 0.52, height: 0.38 },
        observation_text: 'Los jóvenes arquitectos de la mecánica cuántica debatiendo el principio de incertidumbre de 1927.',
        deduction_text: 'La cumbre histórica de la física del siglo XX.',
        time_penalty_seconds: 7,
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
    historical_context_brief: 'En octubre de 1927 se celebró en Bruselas la 5.ª Conferencia Solvay bajo el tema «Electrones y fotones», reuniendo a los mayores físicos de la historia.',
    deduction_pathway: 'El grupo de Curie, Einstein, Planck, Heisenberg y Dirac en la célebre foto de Couprie sitúa el encuentro en Bruselas, 1927.',
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
        observation_text: 'El visor bañado en oro de Buzz Aldrin refleja al fotógrafo Neil Armstrong y las patas del módulo lunar Eagle.',
        deduction_text: 'La fotografía histórica tomada con la Hasselblad de 70 mm durante la primera caminata lunar del 20 de julio de 1969.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Regolito Lunar y Huellas',
        category: 'landscape',
        normalized_rect: { x: 0.30, y: 0.78, width: 0.40, height: 0.20 },
        observation_text: 'Polvo gris fino sin atmósfera y huellas marcadas en el suelo del Mar de la Tranquilidad.',
        deduction_text: 'Primer registro directo del suelo lunar pisado por humanos.',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'El 20 de julio de 1969, la misión Apolo 11 aterrizó en el Mar de la Tranquilidad y Neil Armstrong pronunció sus históricas palabras.',
    deduction_pathway: 'La fotografía de Aldrin con el reflejo de Armstrong en el visor dorado fija el hito indiscutiblemente el 20 de julio de 1969.',
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
        observation_text: 'Jóvenes celebrando con los brazos en alto sobre el muro de Berlín.',
        deduction_text: 'Las celebraciones de apertura del muro la noche del 9 al 10 de noviembre de 1989.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-2',
        title: 'Puerta de Brandeburgo en el Sector Oriental',
        category: 'architecture',
        normalized_rect: { x: 0.35, y: 0.08, width: 0.30, height: 0.38 },
        observation_text: 'Monumento neoclásico con la cuadriga en la franja de exclusión fronteriza.',
        deduction_text: 'La Puerta de Brandeburgo quedó liberada tras 28 años de división en noviembre de 1989.',
        time_penalty_seconds: 7,
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
    historical_context_brief: 'El 9 de noviembre de 1989, tras masivas protestas en Alemania Oriental, miles de berlineses cruzaron los puestos fronterizos y derribaron el Muro de Berlín.',
    deduction_pathway: 'La multitud festejando sobre el muro pintado con la Puerta de Brandeburgo al fondo sitúa la caída en noviembre de 1989.',
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
        title: 'Hongo Nuclear de Little Boy a 10.000 Metros',
        category: 'landscape',
        normalized_rect: { x: 0.30, y: 0.05, width: 0.45, height: 0.85 },
        observation_text: 'Columna ascendente de humo y hongo nuclear de fisión de uranio fotografiada desde el B-29 Enola Gay.',
        deduction_text: 'El primer ataque con arma nuclear de la historia lanzado el 6 de agosto de 1945.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Costa del Mar Interior de Seto y Delta fluvial de Ota',
        category: 'landscape',
        normalized_rect: { x: 0.05, y: 0.70, width: 0.90, height: 0.25 },
        observation_text: 'Geografía costera del delta fluvial y bahía de Hiroshima cubierta por la onda expansiva.',
        deduction_text: 'La topografía deltaica del sur de Japón devastada en agosto de 1945.',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'El 6 de agosto de 1945, el bombardero B-29 Enola Gay detonó la bomba atómica «Little Boy» sobre Hiroshima, marcando el inicio de la era nuclear.',
    deduction_pathway: 'El característico hongo nuclear sobre el delta de Hiroshima fija el hecho el 6 de agosto de 1945.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 8. GUERRA: Atentado de Sarajevo (1914)
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
        title: 'Archiduque Francisco Fernando y Sofía en el Automóvil Gräf & Stift',
        category: 'personage',
        normalized_rect: { x: 0.25, y: 0.25, width: 0.50, height: 0.50 },
        observation_text: 'El heredero al trono austrohúngaro y su esposa en el coche descapotable minutos antes de los disparos de Gavrilo Princip.',
        deduction_text: 'El magnicidio del 28 de junio de 1914 que desató la crisis de julio y la Primera Guerra Mundial.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Uniforme Militar Austrohúngaro con Plumas de Pavo Real',
        category: 'clothing',
        normalized_rect: { x: 0.35, y: 0.15, width: 0.30, height: 0.30 },
        observation_text: 'Casco emplumado y casaca de gala de general de caballería austríaco.',
        deduction_text: 'Indumentaria oficial de la corte de los Habsburgo en 1914.',
        time_penalty_seconds: 6,
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
      'Clark, Christopher. The Sleepwalkers: How Europe Went to War in 1914 (2012).'
    ],
    historical_context_brief: 'El 28 de junio de 1914, el nacionalista serbio Gavrilo Princip asesinó en Sarajevo al archiduque Francisco Fernando de Austria, desencadenando la Primera Guerra Mundial.',
    deduction_pathway: 'El archiduque Francisco Fernando en el auto Gräf & Stift en Sarajevo identifica el inicio de la Gran Guerra en 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 9. SOCIEDAD: Discurso "I Have a Dream" de Martin Luther King (1963)
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
        observation_text: 'El Dr. Martin Luther King Jr. gesticulando ante los micrófonos de radio y televisión en la escalinata del Monumento a Lincoln.',
        deduction_text: 'El histórico discurso por los derechos civiles pronunciado el 28 de agosto de 1963.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Multitud de 250.000 Personas en el Reflecting Pool',
        category: 'landscape',
        normalized_rect: { x: 0.05, y: 0.55, width: 0.90, height: 0.40 },
        observation_text: 'Masiva concentración multirracial llenando el Mall de Washington.',
        deduction_text: 'La Marcha sobre Washington por el Trabajo y la Libertad de agosto de 1963.',
        time_penalty_seconds: 6,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'US National Archives',
        collection_id: 'NARA 542015 - March on Washington 1963',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'US National Archives',
      }
    ],
    secondary_sources: [
      'Branch, Taylor. Parting the Waters: America in the King Years (1988).'
    ],
    historical_context_brief: 'El 28 de agosto de 1963, Martin Luther King Jr. pronunció su célebre discurso «I Have a Dream» ante 250.000 personas en Washington D.C., impulsando la Ley de Derechos Civiles.',
    deduction_pathway: 'Martin Luther King hablando frente al monumento a Lincoln rodeado de micrófonos ubica el discurso en agosto de 1963.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 10. ARGENTINA: El Cordobazo (1969)
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
        observation_text: 'Columnas de obreros mecánicos de SMATA y estudiantes universitarios marchando por el centro cordobés.',
        deduction_text: 'La gran huelga general activa del 29 de mayo de 1969 contra el régimen de Onganía.',
        time_penalty_seconds: 7,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo Provincial de la Memoria (Córdoba)',
        collection_id: 'Fondo Mayo 1969',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Provincia de Córdoba',
      }
    ],
    secondary_sources: [
      'Brennan, James. El Cordobazo: las guerras obreras en Córdoba (1996).'
    ],
    historical_context_brief: 'El 29 y 30 de mayo de 1969 se produjo en la ciudad de Córdoba una masiva insurrección popular urbana liderada por obreros y estudiantes contra la dictadura militar de Onganía.',
    deduction_pathway: 'La marcha con pancartas sindicales de Córdoba y ropa de trabajo ubica el Cordobazo de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 11. LIMITROFES: Bombardeo a La Moneda (1973)
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
        observation_text: 'Densa columna de humo saliendo del frontispicio neoclásico del palacio presidencial chileno tras el ataque aéreo.',
        deduction_text: 'El Palacio de La Moneda fue bombardeado por aviones Hawker Hunter al mediodía del 11 de septiembre de 1973.',
        time_penalty_seconds: 8,
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
    historical_context_brief: 'El 11 de septiembre de 1973, las Fuerzas Armadas chilenas derrocaron al presidente Salvador Allende bombardeando el Palacio de La Moneda.',
    deduction_pathway: 'El Palacio de La Moneda ardiendo en Santiago de Chile ubica el golpe del 11 de septiembre de 1973.',
    verified_at: '2026-08-17T00:00:00Z',
  },

  // 12. LATINOAMERICA: Inauguración del Canal de Panamá (1914)
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
        observation_text: 'Buque de vapor SS Ancón completando el cruce inaugural oficial entre los océanos Atlántico y Pacífico.',
        deduction_text: 'La apertura oficial del Canal de Panamá el 15 de agosto de 1914.',
        time_penalty_seconds: 8,
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
    historical_context_brief: 'El 15 de agosto de 1914 se inauguró oficialmente el Canal de Panamá con el paso del vapor SS Ancón.',
    deduction_pathway: 'El buque Ancón ingresando a las esclusas de Miraflores certifica la apertura del Canal en 1914.',
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
