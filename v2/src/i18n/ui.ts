export const languages = {
  en: 'EN',
  pt: 'PT',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const htmlLang: Record<Lang, string> = {
  en: 'en',
  pt: 'pt-BR',
};

/** Path prefix for each locale ('' for the default locale at the root). */
export function localePath(lang: Lang, path = '') {
  const clean = path.replace(/^\/+/, '');
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  return `${base}${clean}`;
}

const en = {
  meta: {
    title: 'fluxGHG — Measuring carbon and water in the field',
    description:
      'fluxGHG puts measuring towers in your field to record how much carbon and water it takes in and gives off, then uses satellite data to extend the answer across the whole property.',
    ogAlt: 'A measuring tower standing in a wheat field',
  },
  nav: {
    method: 'Method',
    services: 'Services',
    about: 'About',
    team: 'Team',
    contact: 'Contact',
    cta: 'Talk to us',
    menu: 'Menu',
    close: 'Close menu',
    skip: 'Skip to content',
    language: 'Language',
  },
  hero: {
    titleA: 'We measure the',
    titleB: 'carbon and water',
    titleC: 'your land exchanges.',
    lead: 'Most carbon figures used in Brazilian agriculture come from studies carried out in other countries. We install a measuring tower on your land and record the actual exchange of carbon, methane and water at high frequency, continuously, through the entire season.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'How it works',
    scroll: 'Scroll',
    liveLabel: 'Carbon flux · illustrative signal',
    stats: [
      { value: '10 Hz', label: 'High frequency', note: 'Resolves the turbulence of the wind' },
      { value: '24/7', label: 'Continuous operation', note: 'Day, night and the whole season' },
      { value: '~1 km²', label: 'Area covered', note: 'The entire field, not isolated points' },
      { value: 'CO₂ · CH₄ · H₂O', label: 'Variables measured', note: 'Plus the surface energy balance' },
    ],
  },
  strip: {
    label: 'Areas of work',
    items: [
      'Eddy covariance',
      'Micrometeorology',
      'Remote sensing',
      'Soil science',
      'Agronomy',
      'Carbon inventories',
      'Precision irrigation',
    ],
  },
  measure: {
    eyebrow: 'What we measure',
    title: 'Four readings, one continuous record of your field.',
    lead: 'One tower measures the exchange between your land and the atmosphere above it. All four readings come from the same tower, at the same moment.',
    items: [
      {
        symbol: 'CO₂',
        title: 'Carbon',
        unit: 'µmol m⁻² s⁻¹',
        body: 'Whether the area is absorbing or emitting carbon, hour by hour, across the entire crop cycle.',
      },
      {
        symbol: 'CH₄',
        title: 'Methane',
        unit: 'nmol m⁻² s⁻¹',
        body: 'The decisive gas in flooded rice and livestock, and the one where imported estimates deviate most.',
      },
      {
        symbol: 'H₂O',
        title: 'Water use',
        unit: 'mm day⁻¹',
        body: 'The real water consumption of soil and crop combined, measured in the field rather than estimated from an equation.',
      },
      {
        symbol: 'H · LE',
        title: 'Heat and energy',
        unit: 'W m⁻²',
        body: 'How much solar energy warms the air and how much evaporates water. It also serves to verify the consistency of the measurements.',
      },
    ],
  },
  method: {
    eyebrow: 'Method',
    title: 'Eddy covariance: the method the science relies on.',
    lead: 'The air above a field moves in turbulent vortices. Each vortex transports a parcel of air upward or downward, carrying its own gas concentration. The tower measures vertical wind speed and gas concentration at high frequency, and the relationship between the two is the flux itself. The method uses no chambers and does not interfere with the crop.',
    imageCaption: 'The wind sensor and the gas analyser at the top of a fluxGHG tower',
    diagramCaption:
      'The tower accounts for the transport upward and downward; the difference between them is what the area absorbed or emitted.',
    steps: [
      {
        num: '01',
        title: 'Measure',
        body: 'We install and commission the tower on your land: sonic anemometer, gas analyser, and radiation and soil sensors. It operates autonomously and transmits data continuously.',
      },
      {
        num: '02',
        title: 'Quantify',
        body: 'The high-frequency readings undergo quality control and are processed into fluxes — how much carbon the area absorbed and how much it emitted, under your management.',
      },
      {
        num: '03',
        title: 'Extend',
        body: 'The tower becomes the reference for models driven by satellite imagery, extending the result to the rest of the property or to the region.',
      },
    ],
    note: 'Because the tower integrates the entire field around it rather than a few sampling points, the result describes the area an auditor, a buyer or an agronomist is actually asking about.',
  },
  services: {
    eyebrow: 'Services',
    title: 'From a single tower to a regional carbon balance.',
    lead: 'We measure in the field, model the areas without instrumentation, and deliver both in a form that holds up in reports and audits.',
    items: [
      {
        title: 'Installing and running measuring towers',
        body: 'We install and operate the systems that continuously record the greenhouse gas absorption and emission of your area. This is the primary data on which carbon credit projects and product claims are built.',
        tags: ['Equipment', 'Setup', 'Remote data'],
      },
      {
        title: 'Emission and absorption factors',
        body: 'Factors obtained on your own land, under Brazilian conditions, instead of default values from the United States or Europe. Carbon accounting then reflects your production system.',
        tags: ['Inventories', 'Verification', 'Reporting'],
      },
      {
        title: 'Modelling and satellite data',
        body: 'With satellite imagery and modelling, we extend the tower result to the whole property or region, with the validation needed to support the number.',
        tags: ['Satellite', 'Models', 'Scale'],
      },
      {
        title: 'Water and irrigation',
        body: 'Continuous measurement of crop water consumption to guide irrigation: less water pumped, lower energy use and yield preserved.',
        tags: ['Irrigation', 'Water use', 'Drought risk'],
      },
    ],
  },
  water: {
    eyebrow: 'Water',
    title: 'Irrigate on measured consumption, not on an estimate.',
    body1:
      'Our towers measure water use directly and in real time — the water evaporating from the soil plus the water released by the plants. It is the actual consumption of the area, recorded continuously rather than estimated from a reference equation.',
    body2:
      'Combined with soil moisture sensors and weather forecasts, irrigation becomes a decision based on measurement: less water pumped, lower energy consumption and soil moisture held within the range the crop requires.',
    caption: 'Centre-pivot irrigation with continuous water measurement',
    metrics: [
      { value: 'mm day⁻¹', label: 'Measured water consumption' },
      { value: '30 min', label: 'Interval between readings' },
    ],
  },
  modeling: {
    eyebrow: 'Modelling',
    title: 'One tower measures a field. A model covers the region.',
    lead: 'The tower delivers a reliable answer for the area around it. For everywhere else, we develop a model calibrated against those measurements and driven by information available anywhere: satellite imagery showing the condition of the vegetation, and weather data. The tower remains the reference; the model extends that answer across the region.',
    inputsLabel: 'Input data',
    inputs: [
      {
        tag: 'Measurement',
        title: 'Measuring towers',
        detail: 'Direct readings, every 30 minutes',
      },
      {
        tag: 'Satellite',
        title: 'Vegetation images',
        detail: 'How green and active the area is',
      },
      {
        tag: 'Weather',
        title: 'Climate data',
        detail: 'Sun, temperature, rain and soil',
      },
    ],
    modelLabel: 'Model',
    outputLabel: 'Carbon map',
    steps: [
      {
        num: '01',
        title: 'Train',
        body: 'The model is adjusted until it reproduces the carbon measured by the tower from weather and vegetation conditions alone.',
      },
      {
        num: '02',
        title: 'Check',
        body: 'An entire site is withheld from training and then predicted without the model ever having seen it. This is how we verify that it works where no measurement exists.',
      },
      {
        num: '03',
        title: 'Map',
        body: 'Applied to satellite and weather data across a region, the model estimates the carbon balance where there is no tower — the whole property, the region, or the sourcing area.',
      },
    ],
    note: 'The model was developed from years of field measurement and improves continuously: every tower we install adds data and increases the accuracy of the estimates across the surrounding region.',
    caption: 'The area one tower really measures, mapped in the field',
  },
  about: {
    eyebrow: 'About us',
    title: 'A research group that decided to take its instruments to the field.',
    lead: 'fluxGHG exists to replace assumed figures with measured ones in Brazilian agriculture.',
    items: [
      {
        title: 'Expertise',
        body: 'Our team is made of highly qualified professionals from the Federal University of Santa Maria (UFSM), with long experience in greenhouse gas monitoring, weather science, agronomy and soil science.',
      },
      {
        title: 'Vision',
        body: 'We want to become a reference in greenhouse gas monitoring, helping companies decide from measurements rather than assumptions.',
      },
      {
        title: 'Technology',
        body: 'We use eddy covariance to measure absorption and emission quickly and accurately, and models to extend those measurements to areas we cannot reach with a tower.',
      },
    ],
  },
  team: {
    eyebrow: 'Team',
    title: 'The people behind the towers.',
    members: [
      {
        name: 'Alecsander Mergen',
        role: 'Co-founder & CEO',
        body: 'Ph.D. candidate in Physics with long experience installing and setting up eddy covariance systems. Alecsander understands in depth how gas measurement in the field works, and leads the monitoring side of the company.',
      },
      {
        name: 'Josué M. Sehnem',
        role: 'Co-founder & CTO',
        body: 'Electrical Engineer specialising in data processing and analysis. Josué builds the technology behind fluxGHG — the systems and models that turn raw readings into data you can rely on.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Tell us about your land.',
    lead: 'Whether you need a carbon balance for a certification, numbers for an inventory, or water data to irrigate better — write to us and we will get back to you shortly.',
    emailLabel: 'Email',
    locationLabel: 'Location',
    location: 'Santa Maria, RS — Brazil',
    form: {
      name: 'Your name',
      email: 'Your email',
      org: 'Company or institution',
      orgOptional: 'optional',
      message: 'How can we help?',
      messagePlaceholder: 'Crop, area, location and what you need to find out.',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Message sent. We will be in touch shortly.',
      errorFields: 'Please fill in all required fields.',
      errorEmail: 'Please enter a valid email address.',
      errorSend: 'Something went wrong. Please try again or email us directly.',
    },
  },
  footer: {
    punchline:
      'Field measurement of carbon and water in agriculture, extended across regions through modelling and remote sensing.',
    navTitle: 'Navigate',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
    langTitle: 'Language',
  },
  notFound: {
    title: 'Signal lost.',
    body: 'This page is not part of the record. Let us take you back to solid ground.',
    cta: 'Back to home',
  },
};

/** pt-BR mirrors the EN structure exactly. */
const pt: typeof en = {
  meta: {
    title: 'fluxGHG — Medimos carbono e água no campo',
    description:
      'A fluxGHG instala torres de medição na sua área para registrar quanto carbono e quanta água ela absorve e emite, e usa dados de satélite para estender a resposta a toda a propriedade.',
    ogAlt: 'Torre de medição instalada em uma lavoura de trigo',
  },
  nav: {
    method: 'Método',
    services: 'Serviços',
    about: 'Sobre',
    team: 'Equipe',
    contact: 'Contato',
    cta: 'Fale conosco',
    menu: 'Menu',
    close: 'Fechar menu',
    skip: 'Ir para o conteúdo',
    language: 'Idioma',
  },
  hero: {
    titleA: 'Medimos o',
    titleB: 'carbono e a água',
    titleC: 'que a sua área troca.',
    lead: 'A maior parte dos números de carbono usados na agricultura brasileira vem de estudos realizados em outros países. Instalamos uma torre de medição na sua área e registramos a troca real de carbono, metano e água em alta frequência, de forma contínua, ao longo de toda a safra.',
    ctaPrimary: 'Iniciar um projeto',
    ctaSecondary: 'Como funciona',
    scroll: 'Rolar',
    liveLabel: 'Fluxo de carbono · sinal ilustrativo',
    stats: [
      { value: '10 Hz', label: 'Alta frequência', note: 'Resolve a turbulência do vento' },
      { value: '24/7', label: 'Operação contínua', note: 'Dia, noite e safra inteira' },
      { value: '~1 km²', label: 'Área coberta', note: 'A área inteira, não pontos isolados' },
      { value: 'CO₂ · CH₄ · H₂O', label: 'Variáveis medidas', note: 'Mais o balanço de energia da superfície' },
    ],
  },
  strip: {
    label: 'Áreas de atuação',
    items: [
      'Eddy covariance',
      'Micrometeorologia',
      'Sensoriamento remoto',
      'Ciência do solo',
      'Agronomia',
      'Inventários de carbono',
      'Irrigação de precisão',
    ],
  },
  measure: {
    eyebrow: 'O que medimos',
    title: 'Quatro leituras, um registro contínuo da sua área.',
    lead: 'Uma torre mede a troca entre a sua área e a atmosfera acima dela. As quatro leituras vêm da mesma torre, no mesmo instante.',
    items: [
      {
        symbol: 'CO₂',
        title: 'Carbono',
        unit: 'µmol m⁻² s⁻¹',
        body: 'Se a área está absorvendo ou emitindo carbono, hora a hora, ao longo de todo o ciclo da cultura.',
      },
      {
        symbol: 'CH₄',
        title: 'Metano',
        unit: 'nmol m⁻² s⁻¹',
        body: 'O gás determinante em arroz irrigado e pecuária, e aquele em que as estimativas importadas apresentam maior desvio.',
      },
      {
        symbol: 'H₂O',
        title: 'Uso de água',
        unit: 'mm dia⁻¹',
        body: 'O consumo real de água pelo solo e pela cultura somados, medido em campo em vez de estimado por equação.',
      },
      {
        symbol: 'H · LE',
        title: 'Calor e energia',
        unit: 'W m⁻²',
        body: 'Quanto da energia solar aquece o ar e quanto evapora água. Também serve para verificar a consistência das medições.',
      },
    ],
  },
  method: {
    eyebrow: 'Método',
    title: 'Eddy covariance: o método em que a ciência se apoia.',
    lead: 'O ar acima da lavoura se desloca em vórtices turbulentos. Cada vórtice transporta uma porção de ar para cima ou para baixo, com sua própria concentração de gás. A torre mede a velocidade vertical do vento e a concentração do gás em alta frequência, e a relação entre as duas medidas é o próprio fluxo. O método não utiliza câmaras e não interfere na cultura.',
    imageCaption: 'O sensor de vento e o analisador de gases no topo de uma torre fluxGHG',
    diagramCaption:
      'A torre contabiliza o transporte para cima e para baixo; a diferença entre os dois é o que a área absorveu ou emitiu.',
    steps: [
      {
        num: '01',
        title: 'Medir',
        body: 'Instalamos e comissionamos a torre na sua área: anemômetro sônico, analisador de gases e sensores de radiação e de solo. A operação é autônoma, com transmissão contínua de dados.',
      },
      {
        num: '02',
        title: 'Quantificar',
        body: 'As leituras de alta frequência passam por controle de qualidade e são processadas em fluxos — quanto carbono a área absorveu e quanto emitiu, sob o seu manejo.',
      },
      {
        num: '03',
        title: 'Estender',
        body: 'A torre passa a ser a referência de modelos alimentados por imagens de satélite, estendendo o resultado ao restante da propriedade ou à região.',
      },
    ],
    note: 'Como a torre integra a lavoura inteira ao seu redor, e não alguns pontos de amostragem, o resultado representa a área sobre a qual o auditor, o comprador ou o agrônomo está perguntando.',
  },
  services: {
    eyebrow: 'Serviços',
    title: 'De uma torre a um balanço de carbono regional.',
    lead: 'Medimos em campo, modelamos as áreas sem instrumentação e entregamos os dois em formato que se sustenta em relatórios e auditorias.',
    items: [
      {
        title: 'Instalação e operação de torres de medição',
        body: 'Instalamos e operamos os sistemas que registram continuamente a absorção e a emissão de gases de efeito estufa da sua área. É o dado primário sobre o qual se constroem projetos de crédito de carbono e alegações de produto.',
        tags: ['Equipamento', 'Instalação', 'Dados remotos'],
      },
      {
        title: 'Fatores de emissão e absorção',
        body: 'Fatores obtidos na sua própria área, em condições brasileiras, no lugar de valores padrão dos Estados Unidos ou da Europa. A contabilidade de carbono passa a refletir o seu sistema de produção.',
        tags: ['Inventários', 'Verificação', 'Relatórios'],
      },
      {
        title: 'Modelagem e dados de satélite',
        body: 'Com imagens de satélite e modelagem, estendemos o resultado da torre à propriedade inteira ou à região, com a validação necessária para sustentar o número.',
        tags: ['Satélite', 'Modelos', 'Escala'],
      },
      {
        title: 'Água e irrigação',
        body: 'Medição contínua do consumo hídrico da cultura para orientar a irrigação: menos água bombeada, menor consumo de energia e produtividade preservada.',
        tags: ['Irrigação', 'Uso de água', 'Risco de seca'],
      },
    ],
  },
  water: {
    eyebrow: 'Água',
    title: 'Irrigue pelo consumo medido, não por estimativa.',
    body1:
      'Nossas torres medem o uso de água de forma direta e em tempo real — a água que evapora do solo somada à liberada pelas plantas. É o consumo real da área, registrado continuamente em vez de estimado por uma equação de referência.',
    body2:
      'Combinada a sensores de umidade do solo e à previsão do tempo, a irrigação passa a ser decidida com base em medição: menos água bombeada, menor consumo de energia e umidade do solo mantida na faixa exigida pela cultura.',
    caption: 'Pivô central com medição contínua de água',
    metrics: [
      { value: 'mm dia⁻¹', label: 'Consumo hídrico medido' },
      { value: '30 min', label: 'Intervalo entre leituras' },
    ],
  },
  modeling: {
    eyebrow: 'Modelagem',
    title: 'Uma torre mede uma área. Um modelo cobre a região.',
    lead: 'A torre entrega uma resposta confiável para a área ao redor dela. Para as demais áreas, desenvolvemos um modelo calibrado com essas medições e alimentado por informações disponíveis em qualquer lugar: imagens de satélite, que mostram a condição da vegetação, e dados meteorológicos. A torre permanece como referência; o modelo estende essa resposta para toda a região.',
    inputsLabel: 'Dados de entrada',
    inputs: [
      {
        tag: 'Medição',
        title: 'Torres de medição',
        detail: 'Leitura direta, a cada 30 minutos',
      },
      {
        tag: 'Satélite',
        title: 'Imagens da vegetação',
        detail: 'Quão verde e ativa está a área',
      },
      {
        tag: 'Clima',
        title: 'Dados meteorológicos',
        detail: 'Sol, temperatura, chuva e solo',
      },
    ],
    modelLabel: 'Modelo',
    outputLabel: 'Mapa de carbono',
    steps: [
      {
        num: '01',
        title: 'Treinar',
        body: 'O modelo é ajustado até reproduzir o carbono medido pela torre apenas a partir das condições de clima e de vegetação.',
      },
      {
        num: '02',
        title: 'Conferir',
        body: 'Uma área inteira é retirada do treinamento e depois prevista sem que o modelo a tenha conhecido. É assim que verificamos se ele funciona onde não existe medição.',
      },
      {
        num: '03',
        title: 'Mapear',
        body: 'Aplicado aos dados de satélite e de clima de toda uma região, o modelo estima o balanço de carbono onde não há torre — a propriedade inteira, a região ou a área de originação.',
      },
    ],
    note: 'O modelo foi desenvolvido a partir de anos de medição em campo e evolui continuamente: cada nova torre instalada acrescenta dados e aumenta a precisão das estimativas em toda a região ao redor.',
    caption: 'A área que uma torre realmente mede, mapeada no campo',
  },
  about: {
    eyebrow: 'Sobre nós',
    title: 'Um grupo de pesquisa que decidiu levar os instrumentos a campo.',
    lead: 'A fluxGHG existe para substituir números presumidos por números medidos na agricultura brasileira.',
    items: [
      {
        title: 'Expertise',
        body: 'Nossa equipe é formada por profissionais altamente qualificados da Universidade Federal de Santa Maria (UFSM), com longa experiência em monitoramento de gases de efeito estufa, ciência do tempo, agronomia e ciência do solo.',
      },
      {
        title: 'Visão',
        body: 'Queremos nos tornar referência no monitoramento de gases de efeito estufa, ajudando empresas a decidir a partir de medições, e não de suposições.',
      },
      {
        title: 'Tecnologia',
        body: 'Usamos eddy covariance para medir absorção e emissão com rapidez e precisão, e modelos para estender essas medições a áreas que não dá para cobrir com uma torre.',
      },
    ],
  },
  team: {
    eyebrow: 'Equipe',
    title: 'Quem está por trás das torres.',
    members: [
      {
        name: 'Alecsander Mergen',
        role: 'Co-fundador & CEO',
        body: 'Doutorando em Física com longa experiência na instalação e configuração de sistemas de eddy covariance. Alecsander entende a fundo como funciona a medição de gases em campo e lidera a frente de monitoramento da empresa.',
      },
      {
        name: 'Josué M. Sehnem',
        role: 'Co-fundador & CTO',
        body: 'Engenheiro Eletricista especializado em processamento e análise de dados. Josué constrói a tecnologia por trás da fluxGHG — os sistemas e modelos que transformam leituras brutas em dados nos quais se pode confiar.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Conte para nós sobre a sua área.',
    lead: 'Se você precisa de um balanço de carbono para certificação, de números para um inventário ou de dados de água para irrigar melhor — escreva para nós e retornaremos em breve.',
    emailLabel: 'Email',
    locationLabel: 'Localização',
    location: 'Santa Maria, RS — Brasil',
    form: {
      name: 'Seu nome',
      email: 'Seu email',
      org: 'Empresa ou instituição',
      orgOptional: 'opcional',
      message: 'Como podemos ajudar?',
      messagePlaceholder: 'Cultura, área, localização e o que você precisa descobrir.',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      success: 'Mensagem enviada. Entraremos em contato em breve.',
      errorFields: 'Por favor, preencha todos os campos obrigatórios.',
      errorEmail: 'Por favor, informe um endereço de email válido.',
      errorSend: 'Algo deu errado. Tente novamente ou escreva diretamente para nosso email.',
    },
  },
  footer: {
    punchline:
      'Medição em campo de carbono e água na agricultura, estendida a regiões inteiras por modelagem e sensoriamento remoto.',
    navTitle: 'Navegação',
    contactTitle: 'Contato',
    rights: 'Todos os direitos reservados.',
    langTitle: 'Idioma',
  },
  notFound: {
    title: 'Sinal perdido.',
    body: 'Esta página não faz parte do registro. Vamos levar você de volta ao chão firme.',
    cta: 'Voltar ao início',
  },
};

export const ui = { en, pt } as const;

export type Dict = typeof en;

export function useTranslations(lang: Lang): Dict {
  return ui[lang] as Dict;
}

export const site = {
  email: 'contato@fluxghg.com',
  city: 'Santa Maria',
  region: 'RS',
  country: 'BR',
  linkedin: 'https://www.linkedin.com/company/fluxghg',
} as const;
