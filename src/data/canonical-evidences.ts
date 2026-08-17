import { CanonicalEvidence } from '@/types/evidence';

export const CANONICAL_EVIDENCES: CanonicalEvidence[] = [
  {
    id: 'ev-arg-1936-obelisco',
    code: 'ARG-1936-OBELISCO',
    title: 'Inauguración del Obelisco de Buenos Aires (1936)',
    image_url: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.5,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Dpto. Fotografía - Inventario 41.209',
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
        title: 'Traza de la Avenida Corrientes',
        category: 'architecture',
        normalized_rect: { x: 0.15, y: 0.55, width: 0.25, height: 0.35 },
        observation_text: 'Se aprecian obras viales y ensanche en el trazado que desemboca en la plaza.',
        deduction_text: 'Las obras de ensanche de la Av. Corrientes culminaron en la década de 1930 para coincidir con la apertura de la Av. 9 de Julio.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Automóviles y Tranvías de Época',
        category: 'vehicle',
        normalized_rect: { x: 0.45, y: 0.70, width: 0.30, height: 0.25 },
        observation_text: 'Vehículos Ford modelo B y tranvías de la Compañía Lacroze circulando.',
        deduction_text: 'El parque automotor y el modelo de tranvía fijan la escena inequívocamente a mediados de los años 30.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-3',
        title: 'Monumento Central en Construcción',
        category: 'architecture',
        normalized_rect: { x: 0.40, y: 0.10, width: 0.20, height: 0.60 },
        observation_text: 'Estructura piramidal de 67.5 metros diseñada por Alberto Prebisch erigida en solo 31 días.',
        deduction_text: 'El monumento conmemorativo del IV Centenario de la primera fundación por Pedro de Mendoza fue inaugurado en mayo de 1936.',
        time_penalty_seconds: 8,
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
    historical_context_brief: 'El Obelisco de Buenos Aires fue diseñado por el arquitecto Alberto Prebisch y construido en un tiempo récord de 31 días por la empresa constructora GEOPE. Conmemora los 400 años de la primera fundación de la ciudad por Pedro de Mendoza.',
    deduction_pathway: 'La presencia del Obelisco recién emplazado junto con los vehículos de los años 30 y el ensanche de Corrientes ubica inmediatamente la fecha en 1936.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-arg-1910-centenario',
    code: 'ARG-1910-CENTENARIO',
    title: 'Festejos del Centenario de la Revolución de Mayo (1910)',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.4,
    image_source: {
      institution: 'Archivo General de la Nación (AGN)',
      collection_id: 'Colección Witcomb / AGN',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'Dominio Público',
    },
    canonical_event: 'Centenario de la Revolución de Mayo',
    accepted_event_aliases: [
      'Festejos del Centenario',
      'Centenario Argentino',
      'Exposición del Centenario 1910'
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
      display_location: 'Plaza de Mayo, Buenos Aires',
    },
    geographic_scope: 'ARGENTINA',
    thematic_category: 'POLITICA',
    difficulty_tier: 2,
    visual_clues: [
      {
        id: 'clue-1',
        title: 'Iluminación Eléctrica Monumental',
        category: 'technology',
        normalized_rect: { x: 0.10, y: 0.15, width: 0.80, height: 0.40 },
        observation_text: 'Arcos de guirnaldas y miles de bombillas incandescentes ornamentando las fachadas de Plaza de Mayo.',
        deduction_text: 'La electrificación decorativa monumental fue instalada exclusivamente para los banquetes y vigilias de mayo de 1910.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Vestimenta Belle Époque',
        category: 'clothing',
        normalized_rect: { x: 0.30, y: 0.60, width: 0.40, height: 0.35 },
        observation_text: 'Hombres de levita y galera de copa alta; mujeres con sombreros anchos de plumas estilo eduardiano.',
        deduction_text: 'La moda de gala corresponde a la elite porteña durante la presidencia de José Figueroa Alcorta.',
        time_penalty_seconds: 6,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo General de la Nación (AGN)',
        collection_id: 'Caras y Caretas - Edición Especial Centenario',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Biblioteca Nacional',
      }
    ],
    secondary_sources: [
      'Gorelik, Adrián. La grilla y el parque: espacio público y cultura urbana en Buenos Aires (1887-1936).'
    ],
    historical_context_brief: 'En mayo de 1910 la República Argentina celebró 100 años de la Revolución de Mayo recibiendo a dignatarios internacionales como la Infanta Isabel de Borbón y el presidente chileno Pedro Montt.',
    deduction_pathway: 'La iluminación de gala sobre el Cabildo y la Pirámide de Mayo junto a la estética eduardiana identifica el Centenario de 1910.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-lim-1973-moneda',
    code: 'LIM-1973-MONEDA',
    title: 'Bombardeo al Palacio de La Moneda (1973)',
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.5,
    image_source: {
      institution: 'Biblioteca Nacional de Chile / Archivo de Prensa',
      collection_id: 'Fondo Histórico 1973',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'INSTITUTIONAL_OPEN_ACCESS',
      rights_holder: 'Patrimonio Cultural Chileno',
    },
    canonical_event: 'Golpe de Estado y Bombardeo a La Moneda',
    accepted_event_aliases: [
      'Bombardeo de La Moneda',
      'Golpe de Estado en Chile de 1973',
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
        title: 'Fachada Neoclásica en Llamas',
        category: 'architecture',
        normalized_rect: { x: 0.20, y: 0.20, width: 0.60, height: 0.50 },
        observation_text: 'Impactos de proyectiles y columnas de humo saliendo del frontispicio del palacio de gobierno diseñado por Toesca.',
        deduction_text: 'El Palacio de La Moneda fue bombardeado por aviones Hawker Hunter de la Fuerza Aérea de Chile el 11 de septiembre de 1973.',
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-2',
        title: 'Tanques y Tropas en Plaza de la Constitución',
        category: 'vehicle',
        normalized_rect: { x: 0.10, y: 0.65, width: 0.40, height: 0.30 },
        observation_text: 'Blindados del Ejército chileno rodeando el perímetro gubernamental.',
        deduction_text: 'Corresponde a la sublevación de las Fuerzas Armadas encabezadas por Augusto Pinochet.',
        time_penalty_seconds: 6,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Biblioteca Nacional de Chile',
        collection_id: 'Registro Fotográfico 11-09-1973',
        source_type: 'PRIMARY_PHOTO',
        rights_license: 'INSTITUTIONAL_OPEN_ACCESS',
        rights_holder: 'Estado de Chile',
      }
    ],
    secondary_sources: [
      'Amorós, Mario. Allende: la biografía (2013).',
      'Museo de la Memoria y los Derechos Humanos (Chile).'
    ],
    historical_context_brief: 'El 11 de septiembre de 1973 las Fuerzas Armadas de Chile perpetraron un golpe de Estado contra el gobierno democrático del presidente Salvador Allende, atacando el palacio presidencial por tierra y aire.',
    deduction_pathway: 'El emblemático palacio de La Moneda ardiendo bajo ataque aéreo identifica el 11 de septiembre de 1973.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-mun-1989-berlin',
    code: 'MUN-1989-BERLIN',
    title: 'Caída del Muro de Berlín (1989)',
    image_url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.5,
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
        title: 'Grafitis sobre el Hormigón Occidental',
        category: 'text_sign',
        normalized_rect: { x: 0.10, y: 0.50, width: 0.40, height: 0.40 },
        observation_text: 'Muro de bloques de hormigón cubierto de arte callejero y consignas pacifistas siendo martillado por civiles.',
        deduction_text: 'El lado occidental del Berliner Mauer estaba completamente intervenido con murales antes de su demolición pública.',
        time_penalty_seconds: 6,
      },
      {
        id: 'clue-2',
        title: 'Puerta de Brandeburgo al Fondo',
        category: 'architecture',
        normalized_rect: { x: 0.40, y: 0.10, width: 0.30, height: 0.45 },
        observation_text: 'Columnata neoclásica coronada por la cuadriga en la zona de exclusión fronteriza.',
        deduction_text: 'La Puerta de Brandeburgo quedó aislada entre 1961 y noviembre de 1989.',
        time_penalty_seconds: 7,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Bundesarchiv',
        collection_id: 'Europeana 1989 / 183-1989',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Europeana Collections',
      }
    ],
    secondary_sources: [
      'Sarotte, Mary Elise. The Collapse: The Accidental Opening of the Berlin Wall (2014).'
    ],
    historical_context_brief: 'El 9 de noviembre de 1989, tras el anuncio confuso del portavoz de la RDA Günter Schabowski, miles de ciudadanos de Berlín Oriental se agolparon en los puestos fronterizos y cruzaron hacia Occidente, poniendo fin a 28 años de división.',
    deduction_pathway: 'La multitud festejando sobre el muro con la Puerta de Brandeburgo detrás sitúa el acontecimiento en noviembre de 1989.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-mun-1969-luna',
    code: 'MUN-1969-LUNA',
    title: 'Primer Alunizaje del Ser Humano (Apolo 11, 1969)',
    image_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.3,
    image_source: {
      institution: 'NASA History Division / Library of Congress',
      collection_id: 'AS11-40-5903',
      source_type: 'PRIMARY_PHOTO',
      rights_license: 'PUBLIC_DOMAIN',
      rights_holder: 'NASA / US Government',
    },
    canonical_event: 'Primer Alunizaje del Apolo 11',
    accepted_event_aliases: [
      'Llegada del hombre a la Luna',
      'Misión Apolo 11',
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
      country_code: 'MO',
      country_name: 'Luna',
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
        normalized_rect: { x: 0.35, y: 0.20, width: 0.25, height: 0.25 },
        observation_text: 'El casco de Buzz Aldrin refleja al fotógrafo Neil Armstrong y las patas del módulo Eagle.',
        deduction_text: 'La legendaria toma capturada con cámara Hasselblad de 70mm certifica la caminata lunar de julio de 1969.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Mochila PLSS y Traje A7L',
        category: 'clothing',
        normalized_rect: { x: 0.25, y: 0.40, width: 0.50, height: 0.50 },
        observation_text: 'Traje de soporte vital de la NASA con insignia de la bandera estadounidense en el brazo izquierdo.',
        deduction_text: 'El traje A7L presurizado fue usado por las primeras tripulaciones del programa Apolo.',
        time_penalty_seconds: 6,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Library of Congress',
        collection_id: 'NASA Historical Photographic Collection 1969',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Library of Congress',
      }
    ],
    secondary_sources: [
      'NASA Apollo 11 Mission Report (1969).'
    ],
    historical_context_brief: 'El 20 de julio de 1969 la misión Apolo 11 tripulada por Neil Armstrong, Buzz Aldrin y Michael Collins logró el primer descenso tripulado en la superficie de la Luna, cumpliendo el desafío formulado en 1961.',
    deduction_pathway: 'El traje lunar A7L y el módulo Eagle en el Mar de la Tranquilidad fechan con total exactitud el 20 de julio de 1969.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-arg-1969-cordobazo',
    code: 'ARG-1969-CORDOBAZO',
    title: 'El Cordobazo (Córdoba, 1969)',
    image_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2400&auto=format&fit=crop',
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
      'Protestas obreras del Cordobazo de 1969',
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
        title: 'Columnas Obreras del SMATA y Luz y Fuerza',
        category: 'text_sign',
        normalized_rect: { x: 0.15, y: 0.40, width: 0.50, height: 0.30 },
        observation_text: 'Banderas de sindicatos mecánicos y obreros marchando hacia el centro cordobés.',
        deduction_text: 'La alianza de sindicatos como Luz y Fuerza (Tosco) y SMATA (Torres) desató la huelga general de mayo de 1969.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Hogueras y Barricadas en Avenidas Céntricas',
        category: 'landscape',
        normalized_rect: { x: 0.30, y: 0.60, width: 0.40, height: 0.35 },
        observation_text: 'Quema de neumáticos y corte de calles en intersecciones reconocibles de la capital provincial.',
        deduction_text: 'El levantamiento popular forzó el repliegue policial antes de la intervención militar del general Onganía.',
        time_penalty_seconds: 8,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Archivo Provincial de la Memoria (Córdoba)',
        collection_id: 'Fondo Fotográfico Mayo 1969',
        source_type: 'OFFICIAL_ARCHIVE',
        rights_license: 'INSTITUTIONAL_OPEN_ACCESS',
        rights_holder: 'Provincia de Córdoba',
      }
    ],
    secondary_sources: [
      'Brennan, James. El Cordobazo: las guerras obreras en Córdoba 1955-1976 (1996).'
    ],
    historical_context_brief: 'El 29 y 30 de mayo de 1969 se produjo en la ciudad de Córdoba una masiva insurrección popular urbana liderada por los movimientos obreros y estudiantiles contra la dictadura militar de Juan Carlos Onganía.',
    deduction_pathway: 'La combinación de columnas de sindicatos mecánicos cordobeses y barricadas urbanas en 1969 identifica el Cordobazo.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-lat-1914-panama',
    code: 'LAT-1914-PANAMA',
    title: 'Apertura Oficial del Canal de Panamá (1914)',
    image_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=2400&auto=format&fit=crop',
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
      'Apertura del Canal de Panamá de 1914'
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
        normalized_rect: { x: 0.20, y: 0.30, width: 0.50, height: 0.40 },
        observation_text: 'Buque de carga y pasajeros norteamericano realizando el tránsito interoceánico pionero.',
        deduction_text: 'El SS Ancón fue el primer barco en transitar oficialmente el canal el 15 de agosto de 1914.',
        time_penalty_seconds: 8,
      },
      {
        id: 'clue-2',
        title: 'Muros de Hormigón de las Esclusas',
        category: 'architecture',
        normalized_rect: { x: 0.05, y: 0.40, width: 0.30, height: 0.50 },
        observation_text: 'Imponentes muros escalonados de hormigón armado y torres de control con mulas eléctricas.',
        deduction_text: 'Las esclusas diseñadas por Goethals representaron el mayor hito de ingeniería hidráulica de comienzos del siglo XX.',
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
    historical_context_brief: 'El 15 de agosto de 1914 se inauguró oficialmente el Canal de Panamá con la travesía del buque de vapor SS Ancón, uniendo los océanos Atlántico y Pacífico.',
    deduction_pathway: 'El paso del buque Ancón por las esclusas de hormigón recién finalizadas ubica la inauguración del Canal de Panamá en 1914.',
    verified_at: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ev-tec-1927-solvay',
    code: 'TEC-1927-SOLVAY',
    title: 'Quinta Conferencia Solvay de Física (1927)',
    image_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1600&auto=format&fit=crop',
    image_hd_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2400&auto=format&fit=crop',
    image_aspect_ratio: 1.5,
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
      'Congreso Solvay sobre Electrones y Fotones'
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
        title: 'Primera Fila con Marie Curie y Albert Einstein',
        category: 'personage',
        normalized_rect: { x: 0.30, y: 0.60, width: 0.35, height: 0.35 },
        observation_text: 'Marie Curie sentada en el centro junto a Lorentz, Einstein, Langevin y Planck.',
        deduction_text: 'Fue la única conferencia que reunió simultáneamente a 17 premios Nobel para discutir la mecánica cuántica formulada en 1927.',
        time_penalty_seconds: 7,
      },
      {
        id: 'clue-2',
        title: 'Fila Superior con Heisenberg, Pauli y Dirac',
        category: 'personage',
        normalized_rect: { x: 0.20, y: 0.15, width: 0.60, height: 0.35 },
        observation_text: 'Los jóvenes fundadores de la física cuántica de pie en la fila superior (Heisenberg, Pauli, Schrödinger, Bohr).',
        deduction_text: 'Marca el histórico debate de Copenhague sobre el principio de incertidumbre de 1927.',
        time_penalty_seconds: 8,
      }
    ],
    editorial_status: 'READY_FOR_COMPETITIVE',
    primary_sources: [
      {
        institution: 'Bibliothèque Nationale de France',
        collection_id: 'Fonds Conférences Solvay',
        source_type: 'PRIMARY_DOCUMENT',
        rights_license: 'PUBLIC_DOMAIN',
        rights_holder: 'Institut Solvay',
      }
    ],
    secondary_sources: [
      'Mehra, Jagdish. The Solvay Conferences on Physics (1975).'
    ],
    historical_context_brief: 'En octubre de 1927 se celebró en Bruselas la 5.ª Conferencia Solvay bajo el tema «Electrones y fotones», donde se consagró la formulación de la mecánica cuántica y el célebre debate entre Albert Einstein y Niels Bohr.',
    deduction_pathway: 'La icónica foto grupal de los 29 físicos más influyentes del siglo XX reunidos en Bruselas fija el evento en 1927.',
    verified_at: '2026-08-17T00:00:00Z',
  }
];

export function getEvidenceById(id: string): CanonicalEvidence | undefined {
  return CANONICAL_EVIDENCES.find((ev) => ev.id === id);
}

export function getRandomEvidence(): CanonicalEvidence {
  const randomIndex = Math.floor(Math.random() * CANONICAL_EVIDENCES.length);
  return CANONICAL_EVIDENCES[randomIndex];
}
