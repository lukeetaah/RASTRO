import { CanonicalEvidence } from '@/types/evidence';

export const CANONICAL_EVIDENCES: CanonicalEvidence[] = [
  {
    id: 'ev-arg-1936-obelisco',
    code: 'ARG-1936-OBELISCO',
    title: 'Inauguración del Obelisco de Buenos Aires (1936)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Construccion_del_Obelisco_%28Buenos_Aires%29.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Construccion_del_Obelisco_%28Buenos_Aires%29.jpg',
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
        title: 'Parque Automotor y Tranvías de los Años 30',
        category: 'vehicle',
        normalized_rect: { x: 0.05, y: 0.65, width: 0.38, height: 0.30 },
        observation_text: 'Automóviles sedan Ford modelo B y vías de tranvía en la intersección de Corrientes.',
        deduction_text: 'Los modelos de vehículos y el transporte público sitúan la escena inequívocamente a mediados de la década de 1930.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-3',
        title: 'Ensanche de Avenida Corrientes y Cartelería',
        category: 'text_sign',
        normalized_rect: { x: 0.68, y: 0.40, width: 0.28, height: 0.45 },
        observation_text: 'Demolición de manzanas coloniales y carteles comerciales de comercios porteños históricos.',
        deduction_text: 'Las obras de ensanche de Corrientes culminaron en 1936 para crear el cruce con la futura Av. 9 de Julio.',
        time_penalty_seconds: 7,
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
      'Prebisch, Alberto. Memoria descriptiva de las obras de Plaza de la República (1936).',
      'Municipalidad de la Ciudad de Buenos Aires - Actas del IV Centenario (1936).'
    ],
    historical_context_brief: 'El Obelisco de Buenos Aires fue diseñado por el arquitecto Alberto Prebisch y construido en un tiempo récord de 31 días por la empresa GEOPE. Conmemora los 400 años de la primera fundación de la ciudad por Pedro de Mendoza en 1536.',
    deduction_pathway: 'El Obelisco con andamios de construcción en el cruce de Corrientes junto a los autos de los años 30 ubica inmediatamente la fecha en 1936.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-tec-1927-solvay',
    code: 'TEC-1927-SOLVAY',
    title: 'Quinta Conferencia Solvay de Física (1927)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Solvay_conference_1927.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Solvay_conference_1927.jpg',
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
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Primera Fila: Marie Curie y Albert Einstein',
        category: 'personage',
        normalized_rect: { x: 0.35, y: 0.52, width: 0.32, height: 0.42 },
        observation_text: 'Marie Curie sentada en el centro junto a Hendrik Lorentz, Albert Einstein, Paul Langevin y Max Planck.',
        deduction_text: 'La reunión conjunta de estos pioneros consagró la conferencia de octubre de 1927 en Bruselas como el mayor hito de la física moderna.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Fila Superior: Heisenberg, Pauli, Dirac y Schrödinger',
        category: 'personage',
        normalized_rect: { x: 0.18, y: 0.08, width: 0.52, height: 0.38 },
        observation_text: 'Los jóvenes arquitectos de la mecánica cuántica (Heisenberg, Pauli, Dirac, De Broglie, Schrödinger).',
        deduction_text: 'Representa el momento en que se debatió el principio de incertidumbre formulado ese mismo año (1927).',
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-3',
        title: 'Niels Bohr en Segunda Fila',
        category: 'personage',
        normalized_rect: { x: 0.70, y: 0.40, width: 0.22, height: 0.35 },
        observation_text: 'Niels Bohr observando a Einstein en la fila contigua.',
        deduction_text: 'Símbolo del célebre debate cuántico («Dios no juega a los dados»).',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'En octubre de 1927 se celebró en Bruselas la 5.ª Conferencia Solvay bajo el tema «Electrones y fotones», donde 17 de los 29 asistentes eran o serían premios Nobel, debatiendo los cimientos de la física cuántica.',
    deduction_pathway: 'El grupo de Curie, Einstein, Planck y los jóvenes Heisenberg y Dirac en la foto de Couprie sitúa el encuentro en Bruselas, 1927.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-mun-1969-luna',
    code: 'MUN-1969-LUNA',
    title: 'Primer Alunizaje del Ser Humano (Apolo 11, 1969)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
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
        deduction_text: 'La fotografía tomada con la cámara Hasselblad de 70 mm montada en el pecho certifica la primera caminata lunar del 20 de julio de 1969.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Insignia y Traje Presurizado A7L',
        category: 'clothing',
        normalized_rect: { x: 0.30, y: 0.35, width: 0.20, height: 0.25 },
        observation_text: 'Bandera de EE.UU. en la manga del hombro izquierdo y mochila de soporte vital PLSS.',
        deduction_text: 'El traje A7L fue confeccionado por ILC Dover específicamente para las misiones Apolo 11 a 14.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-3',
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
    historical_context_brief: 'El 20 de julio de 1969, la misión Apolo 11 de la NASA aterrizó con éxito en el Mar de la Tranquilidad. Neil Armstrong y Buzz Aldrin se convirtieron en los primeros seres humanos en caminar sobre la Luna.',
    deduction_pathway: 'La fotografía de Aldrin con el reflejo de Armstrong en el visor dorado fija el hito indiscutiblemente el 20 de julio de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-mun-1989-berlin',
    code: 'MUN-1989-BERLIN',
    title: 'Caída del Muro de Berlín (1989)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Berlinermauer.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Berlinermauer.jpg',
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
        observation_text: 'Jóvenes alemanes occidentales y orientales subidos a lo alto del muro celebrando con los brazos en alto.',
        deduction_text: 'Las celebraciones masivas sobre el muro se desataron la noche del 9 al 10 de noviembre de 1989.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-2',
        title: 'Puerta de Brandeburgo en el Sector Oriental',
        category: 'architecture',
        normalized_rect: { x: 0.35, y: 0.08, width: 0.30, height: 0.38 },
        observation_text: 'Monumento neoclásico con la cuadriga en la franja de exclusión fronteriza.',
        deduction_text: 'La Puerta de Brandeburgo quedó atrapada en la franja de la muerte entre 1961 y noviembre de 1989.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-3',
        title: 'Grafitis en el Lado Occidental',
        category: 'text_sign',
        normalized_rect: { x: 0.05, y: 0.65, width: 0.35, height: 0.30 },
        observation_text: 'Pintadas de arte callejero y mensajes por la paz en los paneles de hormigón.',
        deduction_text: 'El muro del sector occidental estaba profusamente pintado antes de su demolición pública.',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'El 9 de noviembre de 1989, tras semanas de protestas en Alemania Oriental y una conferencia de prensa que habilitó el libre tránsito, miles de berlineses se reunieron en los puestos fronterizos y derribaron el Muro de Berlín.',
    deduction_pathway: 'La multitud festejando sobre el muro pintado con la Puerta de Brandeburgo al fondo sitúa la caída en noviembre de 1989.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-arg-1969-cordobazo',
    code: 'ARG-1969-CORDOBAZO',
    title: 'El Cordobazo (Córdoba, 1969)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cordobazo_-_Marcha.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cordobazo_-_Marcha.jpg',
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
        title: 'Columnas de Obreros y Estudiantes en Marcha',
        category: 'personage',
        normalized_rect: { x: 0.15, y: 0.35, width: 0.50, height: 0.45 },
        observation_text: 'Masiva columna de manifestantes con ropa de trabajo fabril y pancartas sindicales.',
        deduction_text: 'Los sindicatos automotrices de SMATA (IKA-Renault) y Luz y Fuerza lideraron la movilización de mayo de 1969.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Hoguera y Barricada en la Avenida Central',
        category: 'landscape',
        normalized_rect: { x: 0.60, y: 0.55, width: 0.35, height: 0.40 },
        observation_text: 'Fuego y restos de barricadas urbanas en el cruce de avenidas del centro de la ciudad.',
        deduction_text: 'La quema de neumáticos y defensa de esquinas forzó el repliegue policial en las primeras horas.',
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
    historical_context_brief: 'El 29 y 30 de mayo de 1969 se produjo en la ciudad de Córdoba una masiva insurrección popular urbana liderada por los sindicatos obreros y movimientos estudiantiles contra la dictadura militar de Juan Carlos Onganía.',
    deduction_pathway: 'La combinación de columnas de obreros automotrices y barricadas céntricas en Córdoba identifica el Cordobazo de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-lim-1973-moneda',
    code: 'LIM-1973-MONEDA',
    title: 'Bombardeo al Palacio de La Moneda (1973)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Palacio_de_la_moneda_11_septiembre_1973.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Palacio_de_la_moneda_11_septiembre_1973.jpg',
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
        normalized_rect: { x: 0.28, y: 0.20, width: 0.44, height: 0.50 },
        observation_text: 'Densa columna de humo negro saliendo del frontispicio neoclásico del palacio presidencial tras el ataque de cohetes Sura.',
        deduction_text: 'El Palacio de La Moneda fue bombardeado por aviones Hawker Hunter de la FACh al mediodía del 11 de septiembre de 1973.',
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-2',
        title: 'Vehículos Militares en Plaza de la Constitución',
        category: 'vehicle',
        normalized_rect: { x: 0.05, y: 0.65, width: 0.40, height: 0.30 },
        observation_text: 'Carros blindados y tropas del Ejército chileno cercando el perímetro de gobierno.',
        deduction_text: 'El asedio terrestre del general Javier Palacios precedió al asalto final.',
        time_penalty_seconds: 6,
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
    historical_context_brief: 'El 11 de septiembre de 1973, las Fuerzas Armadas chilenas encabezadas por el general Augusto Pinochet derrocaron al presidente constitucional Salvador Allende, atacando el palacio presidencial por tierra y aire.',
    deduction_pathway: 'El Palacio de La Moneda ardiendo bajo bombardeo aéreo en Santiago ubica el 11 de septiembre de 1973.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-lat-1914-panama',
    code: 'LAT-1914-PANAMA',
    title: 'Apertura Oficial del Canal de Panamá (1914)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Ancon_at_Miraflores_Locks_1914.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Ancon_at_Miraflores_Locks_1914.jpg',
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
    difficulty_tier: 3,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'El Vapor Ancón Cruzando las Compuertas',
        category: 'vehicle',
        normalized_rect: { x: 0.22, y: 0.22, width: 0.52, height: 0.48 },
        observation_text: 'Buque de vapor SS Ancón decorado con banderines completando la primera travesía oficial entre océanos.',
        deduction_text: 'El buque de carga Ancón fue la nave seleccionada para el cruce inaugural del 15 de agosto de 1914.',
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-2',
        title: 'Muros de Hormigón de las Esclusas de Miraflores',
        category: 'architecture',
        normalized_rect: { x: 0.05, y: 0.40, width: 0.25, height: 0.50 },
        observation_text: 'Muros masivos de hormigón y torres de control con cables de tracción eléctrica.',
        deduction_text: 'El sistema de esclusas diseñado por Goethals representó la mayor obra de ingeniería hidráulica de inicios del siglo XX.',
        time_penalty_seconds: 7,
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
      'McCullough, David. The Path Between the Seas: The Creation of the Panama Canal (1977).'
    ],
    historical_context_brief: 'El 15 de agosto de 1914 se inauguró oficialmente el Canal de Panamá con el paso inaugural del buque de vapor SS Ancón, uniendo los océanos Atlántico y Pacífico.',
    deduction_pathway: 'El buque Ancón ingresando a las flamantes esclusas de Miraflores certifica la apertura del Canal en 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-arg-1910-centenario',
    code: 'ARG-1910-CENTENARIO',
    title: 'Festejos del Centenario de la Revolución de Mayo (1910)',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Cabildo_de_Buenos_Aires_-_1910.jpg',
    image_hd_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Cabildo_de_Buenos_Aires_-_1910.jpg',
    image_aspect_ratio: 1.45,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Colección Centenario / AGN',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Centenario de la Revolución de Mayo',
    accepted_event_aliases: [
      'Festejos del Centenario',
      'Centenario Argentino',
      'Exposición del Centenario 1910',
      'Centenario de Mayo'
    ],
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
      display_location: 'Plaza de Mayo y Cabildo, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Cabildo Histórico de Buenos Aires',
        category: 'architecture',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.55 },
        observation_text: 'Fachada del Cabildo de Buenos Aires con su torre y arcos ornamentados antes de las reformas de la Av. de Mayo.',
        deduction_text: 'El Cabildo lucía su aspecto de principios de siglo previo a la restauración neocolonial de Bustillo de 1940.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Farolas e Iluminación de Gala en Plaza de Mayo',
        category: 'technology',
        normalized_rect: { x: 0.05, y: 0.55, width: 0.45, height: 0.35 },
        observation_text: 'Postes ornamentales de fundición francesa e iluminación festiva para la visita de la Infanta Isabel.',
        deduction_text: 'Las luminarias monumentales fueron instaladas exclusivamente para los banquetes de mayo de 1910.',
        time_penalty_seconds: 6,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación (AGN)',
        collection_id: 'Caras y Caretas - Centenario 1910',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Biblioteca Nacional',
      }
    ],
    secondary_sources: [
      'Gorelik, Adrián. La grilla y el parque (1887-1936).'
    ],
    historical_context_brief: 'En mayo de 1910, Argentina celebró el primer centenario de la Revolución de Mayo de 1810 con fastuosos desfiles militares y visitas de dignatarios internacionales en Plaza de Mayo.',
    deduction_pathway: 'El Cabildo de Buenos Aires engalanado para el Centenario en Plaza de Mayo fija la fecha en mayo de 1910.',
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
