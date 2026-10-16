// Legal content for /terms and /privacy, transcribed from the source documents in
// src/assets/Docs (TermsofService*.pdf, PrivacyPolicy*.pdf). Text in [brackets] is a
// placeholder still to be filled in; it is highlighted in development builds.

export type LegalDocId = 'terms' | 'privacy';
export type LegalLang = 'en' | 'es';

/** A list item: plain text, or a [boldLead, text] pair. */
export type LegalItem = string | [string, string];

export type LegalBlock =
  | { k: 'p'; t: string; l?: string }
  | { k: 'h'; t: string }
  | { k: 'c'; l: string; t: string }
  | { k: 'ul'; items: LegalItem[] }
  | { k: 'ol'; items: LegalItem[] }
  | { k: 'table'; head: string[]; rows: string[][] };

export interface LegalSection {
  /** Section number as printed ("1", "10", "A"). */
  n: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalGlance {
  icon: 'shield' | 'chip' | 'trash';
  title: string;
  text: string;
}

export interface LegalDocument {
  title1: string;
  title2: string;
  subtitle: string;
  date: string;
  contactTitle: string;
  address: string;
  glance?: LegalGlance[];
  sections: LegalSection[];
}

/** Public URLs linked from the mobile apps and store listings. Keep them stable. */
export const LEGAL_ROUTES: Record<LegalDocId, string> = {
  terms: '/terms',
  privacy: '/privacy',
};

export const LEGAL_EMAIL = 'alejandro1401@brothersappstudios.com';
const EMAIL = LEGAL_EMAIL;
export const directionLLC = '30 N Gould St Ste R, SHERIDAN, WY, 8280, United States';
const DIRECTION = directionLLC;

const P = (t: string, l?: string): LegalBlock => ({ k: 'p', t, l });
const H = (t: string): LegalBlock => ({ k: 'h', t });
const C = (l: string, t: string): LegalBlock => ({ k: 'c', l, t });
const UL = (items: LegalItem[]): LegalBlock => ({ k: 'ul', items });
const OL = (items: LegalItem[]): LegalBlock => ({ k: 'ol', items });
const T = (head: string[], rows: string[][]): LegalBlock => ({ k: 'table', head, rows });
const S = (n: string, title: string, blocks: LegalBlock[]): LegalSection => ({ n, title, blocks });

export const LEGAL_UI = {
  en: {
    back: 'Back to home', contact: 'Contact me', onPage: 'On this page', updated: 'Last updated:',
    terms: 'Terms of Service', privacy: 'Privacy Policy', termsShort: 'Terms', privacyShort: 'Privacy',
    sections: 'sections', tablist: 'Legal documents', tocAria: 'Table of contents', note: '',
  },
  es: {
    back: 'Volver al inicio', contact: 'Contactarme', onPage: 'En esta página', updated: 'Última actualización:',
    terms: 'Términos de Servicio', privacy: 'Política de Privacidad', termsShort: 'Términos', privacyShort: 'Privacidad',
    sections: 'secciones', tablist: 'Documentos legales', tocAria: 'Tabla de contenidos',
    note: 'Traducción al español ofrecida por conveniencia. Si hay diferencias con la versión en inglés, prevalece la versión en inglés.',
  },
} as const;

export const LEGAL_DOCS: Record<LegalDocId, Record<LegalLang, LegalDocument>> = {
  terms: {
    en: {
      title1: 'Terms of ', title2: 'Service',
      subtitle: 'The agreement that governs every mobile app we publish and our website, brothersappstudios.com.',
      date: 'Oct 13, 2026',
      contactTitle: 'Questions about these Terms?',
      address: `Brothers App Studios LLC · ${DIRECTION}`,
      sections: [
        S('1', 'Agreement and scope', [
          P(`These Terms of Service ("Terms") are a legal agreement between you and Brothers App Studios LLC, a Wyoming limited liability company ("Brothers App Studios", "we", "us"). They govern your use of every mobile app we publish on the Apple App Store and Google Play, and of our website brothersappstudios.com (together, the "Services").`),
          P(`One set of Terms covers all of our apps. The apps currently covered are listed in Appendix A of our Privacy Policy at brothersappstudios.com/privacy. An app may show additional terms for a specific feature; those terms are part of these Terms, and they control if there is a conflict.`),
          P(`By downloading, accessing or using the Services, or by tapping "Continue", "Accept" or a similar button, you agree to these Terms and to our Privacy Policy. If you do not agree, do not use the Services.`),
          C('Important: ', `Section 9 requires most disputes to be resolved through binding individual arbitration and waives class actions and jury trials. You can opt out within 30 days, as Section 9 explains.`)
        ]),
        S('2', 'Eligibility and accounts', [
          P(`You must be at least 13 years old to use the Services (16 in the European Economic Area and the United Kingdom, unless your country sets a lower age). If you are under the age of majority where you live, you may use the Services only with the permission of a parent or legal guardian, who agrees to these Terms on your behalf.`),
          P(`Some apps let you create an account. If you do:`),
          UL([
            `Give accurate information and keep it up to date.`,
            `Keep your login credentials secure. You are responsible for activity on your account.`,
            `Tell us right away at ${EMAIL} if you believe someone has used your account without permission.`
          ]),
          P(`You can delete your account at any time from the app's settings, as our Privacy Policy explains.`)
        ]),
        S('3', 'Subscriptions, free trials and in-app purchases', [
          P(`Some features require a paid subscription or a one-time in-app purchase. The price, billing period and what is included are shown in the app before you buy.`),
          UL([
            ['Billing. ', `Payment is charged to your Apple ID or Google Play account when you confirm the purchase. Apple or Google processes all payments; we never receive your payment card details.`],
            ['Automatic renewal. ', `Subscriptions renew automatically at the end of each period, at the same price and for the same length, unless you cancel at least 24 hours before the current period ends. Your account is charged for renewal within 24 hours before the period ends.`],
            ['Free trials. ', `If a free trial is offered, it converts into a paid subscription when it ends unless you cancel at least 24 hours before. Any unused part of a free trial is forfeited when you buy a subscription.`],
            ['Cancelling. ', `You can manage or cancel your subscription in your Apple ID settings or in the Google Play app (Payments & subscriptions). Deleting the app or your account does not cancel your subscription.`],
            ['Refunds. ', `Refunds are handled by Apple or Google under their own policies. We cannot issue refunds for purchases made through their stores.`],
            ['Price changes. ', `We may change prices. Apple or Google will notify you as their rules require, and you can cancel before the new price applies.`],
            ['Usage limits. ', `Some plans include a limited number of AI generations per period. Unused generations do not carry over unless the app says otherwise.`]
          ])
        ]),
        S('4', 'Your content and AI-generated results', [
          P(`You keep all rights you have in the photos, images, text and other material you submit ("Your Content").`, 'You own your content. '),
          P(`You grant us a worldwide, non-exclusive, royalty-free license to host, copy, process, modify and transmit Your Content, including sending it to our AI providers, only as needed to provide the Services to you. This license ends when Your Content is deleted under our Privacy Policy, except for copies we must keep by law.`, 'License you give us. '),
          P(`By submitting Your Content, you confirm that:`, 'Your promises. '),
          UL([
            `You own it or have all the rights and permissions needed to use it with the Services.`,
            `If it shows another person, you have that person's consent (or their parent's or guardian's consent if they are a minor) to upload and edit their image.`,
            `It does not violate these Terms, the law, or anyone's rights, including copyright, trademark, privacy and publicity rights.`
          ]),
          P(`The images or text our apps generate ("Output") are created automatically by AI models. As between you and us, we assign to you any rights we have in your Output. However:`, 'AI-generated results. '),
          UL([
            `Output may be inaccurate, unexpected, or similar to output generated for other users, and it may not be protected by copyright.`,
            `Output is for personal, creative and entertainment purposes. It is not a professional, medical, cosmetic or historical assessment.`,
            `You are responsible for how you use and share Output, including not presenting it in a way that deceives people about who or what it shows.`
          ])
        ]),
        S('5', 'Acceptable use', [
          P(`You may not use the Services to upload, create or share content that:`),
          UL([
            `Sexualizes or exploits minors in any way. We report apparent child sexual abuse material to the National Center for Missing & Exploited Children (NCMEC) and law enforcement.`,
            `Is sexually explicit or nude imagery of a real person, or any intimate image made or shared without that person's consent.`,
            `Impersonates a real person, or is meant to deceive others about real events, including fake identity documents or political or election disinformation.`,
            `Harasses, threatens, bullies or defames anyone, or promotes violence, terrorism or hatred against protected groups.`,
            `Infringes copyright, trademark, privacy, publicity or other rights.`,
            `Is otherwise illegal where you live or in the United States.`
          ]),
          P(`You also may not:`),
          UL([
            `Copy, modify, decompile, reverse engineer or try to extract the source code of our apps, except where the law expressly allows it.`,
            `Access the Services through bots, scrapers or other automated means, or bypass usage limits, paywalls or security features.`,
            `Interfere with or overload our servers or our providers' systems.`,
            `Resell, sublicense or commercially exploit the Services without our written permission.`
          ]),
          P(`We may remove content, limit features or suspend access if we reasonably believe you have broken this section. Our AI providers also apply their own safety filters, so some requests may be blocked automatically.`)
        ]),
        S('6', 'License, our property and third-party services', [
          P(`Subject to these Terms, we grant you a personal, limited, non-exclusive, non-transferable, revocable license to download and use our apps on devices you own or control, for your personal, non-commercial use. If you downloaded an app from a store, this license is also subject to that store's usage rules.`, 'Your license to use the apps. '),
          P(`The apps, the website, and their software, design, text, graphics, logos and the names of our apps belong to Brothers App Studios or our licensors and are protected by law. These Terms do not give you any right to use our names or logos.`, 'Our property. '),
          P(`If you send us ideas or suggestions, we may use them freely without paying you or owing you anything.`, 'Feedback. '),
          P(`The Services rely on third parties such as Apple, Google, RevenueCat and our AI providers, and may link to other websites. We are not responsible for third-party services, and your use of them may be subject to their own terms.`, 'Third-party services. ')
        ]),
        S('7', 'Termination', [
          P(`You can stop using the Services at any time by deleting the app and, if you have one, your account. Remember to cancel any subscription through Apple or Google.`),
          P(`We may suspend or end your access to the Services, or to any app, if you break these Terms, if required by law, or if we discontinue an app. Where reasonable, we will give you notice first. If we discontinue an app while you have an active subscription to it, you may request a refund from Apple or Google.`),
          P(`Sections 4 (license limits and your promises), 6 (our property), 8, 9, 10 and 11 survive termination.`)
        ]),
        S('8', 'Disclaimers, limitation of liability and indemnification', [
          P(`THE SERVICES AND ALL OUTPUT ARE PROVIDED "AS IS" AND "AS AVAILABLE". TO THE FULLEST EXTENT ALLOWED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT AND ACCURACY. WE DO NOT PROMISE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE, OR THAT AI OUTPUT WILL MEET YOUR EXPECTATIONS.`, 'Disclaimer. '),
          P(`TO THE FULLEST EXTENT ALLOWED BY LAW:`, 'Limitation of liability. '),
          UL([
            `WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA, GOODWILL OR CONTENT, ARISING FROM OR RELATED TO THE SERVICES.`,
            `OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICES WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE APP GIVING RISE TO THE CLAIM IN THE 12 MONTHS BEFORE THE CLAIM AROSE, OR (B) US$50.`
          ]),
          P(`Some jurisdictions do not allow these exclusions or limits, so some of them may not apply to you. Nothing in these Terms limits rights you have as a consumer that cannot be waived by contract.`),
          P(`You agree to defend, indemnify and hold harmless Brothers App Studios and its members, employees and agents from claims, damages and costs (including reasonable attorneys' fees) arising from Your Content, your use of Output, or your breach of these Terms or of anyone's rights.`, 'Indemnification. ')
        ]),
        S('9', 'Dispute resolution: arbitration and class action waiver', [
          C('', `PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS HOW DISPUTES BETWEEN YOU AND US ARE RESOLVED.`),
          P(`Before starting arbitration, you agree to email us at ${EMAIL} with your name, the app involved, a description of the dispute and the relief you want. We will do the same if we have a dispute with you. Both sides will try in good faith to resolve it within 60 days.`, 'Try to resolve it informally first. '),
          P(`If the dispute is not resolved within 60 days, you and Brothers App Studios agree that any dispute, claim or controversy arising from or relating to these Terms or the Services will be resolved by binding arbitration, not in court. The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, before a single arbitrator. The Federal Arbitration Act governs this section.`, 'Binding individual arbitration. '),
          UL([
            `The arbitration may be held by video conference, by phone, on written submissions, or in the county where you live.`,
            `Payment of filing and arbitrator fees will follow the AAA Consumer Arbitration Rules.`,
            `The arbitrator may award the same individual relief a court could, but only to you individually.`
          ]),
          P(`Either party may bring an individual claim in small claims court if it qualifies. Either party may also ask a court for an injunction to stop infringement or misuse of intellectual property.`, 'Exceptions. '),
          P(`YOU AND BROTHERS APP STUDIOS MAY BRING CLAIMS ONLY ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE OR REPRESENTATIVE ACTION. BOTH PARTIES WAIVE THE RIGHT TO A JURY TRIAL. If this class action waiver is found unenforceable for a claim, that claim will proceed in court, not in arbitration.`, 'Class action and jury trial waiver. '),
          P(`You may opt out of this arbitration agreement by emailing ${EMAIL} within 30 days after you first accept these Terms. Include your name, the app you use, and a clear statement that you opt out of arbitration. Opting out does not affect any other part of these Terms.`, 'Your right to opt out. '),
          P(`If you live in a country, such as a member state of the European Union or the United Kingdom, whose consumer laws do not allow pre-dispute arbitration or class waivers, this Section 9 does not apply to you, and you may bring claims in the courts where you live.`, 'Where the law does not allow it. ')
        ]),
        S('10', 'Governing law, changes and general terms', [
          P(`These Terms are governed by the laws of the State of Wyoming and applicable US federal law, without regard to conflict-of-law rules. Any dispute not subject to arbitration will be heard only in the state or federal courts located in Wyoming, and both parties consent to their jurisdiction, except where Section 9 lets you sue where you live.`, 'Governing law. '),
          P(`We may update these Terms, for example when we launch a new app or feature. We will change the "Last updated" date. If a change is material, we will notify you in the app or by email before it takes effect. Continuing to use the Services after that date means you accept the updated Terms. Changes to Section 9 will not apply to disputes we already knew about.`, 'Changes to these Terms. '),
          P(`These Terms and our Privacy Policy are the entire agreement between you and us about the Services. If any provision is unenforceable, the rest stays in effect. Our failure to enforce a provision is not a waiver. You may not transfer these Terms without our consent; we may transfer them as part of a merger, acquisition or sale of assets. These Terms are written in English. A Spanish translation is provided for convenience; if they differ, the English version controls.`, 'General. '),
          P(`Brothers App Studios LLC, ${DIRECTION}· ${EMAIL} · brothersappstudios.com`, 'Contact. ')
        ]),
        S('11', 'Additional terms for apps downloaded from the Apple App Store', [
          P(`If you downloaded one of our apps from the Apple App Store, these terms also apply:`),
          OL([
            ['Parties. ', `These Terms are between you and Brothers App Studios only, not Apple Inc. ("Apple"). Brothers App Studios, not Apple, is solely responsible for the app and its content.`],
            ['License scope. ', `Your license is limited to using the app on Apple-branded products you own or control, as permitted by the Usage Rules in Apple's Media Services Terms and Conditions.`],
            ['Support. ', `Brothers App Studios is solely responsible for maintenance and support of the app. Apple has no obligation to provide any maintenance or support.`],
            ['Warranty. ', `If the app fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any. To the maximum extent allowed by law, Apple has no other warranty obligation for the app.`],
            ['Product claims. ', `Brothers App Studios, not Apple, is responsible for addressing any claims by you or a third party relating to the app, including product liability claims, claims that the app fails to meet legal or regulatory requirements, and claims under consumer protection, privacy or similar laws.`],
            ['Intellectual property. ', `If a third party claims the app or your use of it infringes their intellectual property rights, Brothers App Studios, not Apple, is solely responsible for the investigation, defense, settlement and discharge of that claim.`],
            ['Legal compliance. ', `You confirm that you are not located in a country subject to a US Government embargo or designated as a "terrorist supporting" country, and that you are not on any US Government list of prohibited or restricted parties.`],
            ['Third-party terms. ', `You must comply with any applicable third-party terms when using the app, such as your wireless data service agreement.`],
            ['Third-party beneficiary. ', `Apple and its subsidiaries are third-party beneficiaries of these Terms. Once you accept these Terms, Apple has the right to enforce them against you as a third-party beneficiary.`]
          ]),
          P(`Questions, complaints or claims about the app go to Brothers App Studios LLC at the contact details in Section 10.`)
        ])
      ]
    },
    es: {
      title1: 'Términos de ', title2: 'Servicio',
      subtitle: 'El acuerdo que regula todas las apps móviles que publicamos y nuestro sitio web, brothersappstudios.com.',
      date: '13 de octubre de 2026',
      contactTitle: '¿Preguntas sobre estos Términos?',
      address: 'Brothers App Studios LLC · [dirección postal], Wyoming, Estados Unidos',
      sections: [
        S('1', 'Acuerdo y alcance', [
          P(`Estos Términos de Servicio ("Términos") son un acuerdo legal entre tú y Brothers App Studios LLC, una sociedad de responsabilidad limitada de Wyoming ("Brothers App Studios", "nosotros"). Regulan el uso de todas las apps móviles que publicamos en Apple App Store y Google Play, y de nuestro sitio web brothersappstudios.com (en conjunto, los "Servicios").`),
          P(`Un solo conjunto de Términos cubre todas nuestras apps. Las apps cubiertas actualmente están listadas en el Apéndice A de nuestra Política de Privacidad en brothersappstudios.com/privacy. Una app puede mostrar términos adicionales para una función específica; esos términos forman parte de estos Términos y prevalecen si hay conflicto.`),
          P(`Al descargar, acceder o usar los Servicios, o al tocar "Continuar", "Aceptar" o un botón similar, aceptas estos Términos y nuestra Política de Privacidad. Si no estás de acuerdo, no uses los Servicios.`),
          C('Importante: ', `La Sección 9 exige que la mayoría de las disputas se resuelvan mediante arbitraje individual vinculante y renuncia a demandas colectivas y juicios con jurado. Puedes excluirte dentro de los 30 días, como explica la Sección 9.`)
        ]),
        S('2', 'Requisitos y cuentas', [
          P(`Debes tener al menos 13 años para usar los Servicios (16 en el Espacio Económico Europeo y el Reino Unido, salvo que tu país fije una edad menor). Si eres menor de edad donde vives, solo puedes usar los Servicios con permiso de tu padre, madre o tutor legal, quien acepta estos Términos en tu nombre.`),
          P(`Algunas apps permiten crear una cuenta. Si lo haces:`),
          UL([
            `Proporciona información exacta y mantenla actualizada.`,
            `Mantén seguras tus credenciales de acceso. Eres responsable de la actividad en tu cuenta.`,
            `Avísanos de inmediato a ${EMAIL} si crees que alguien usó tu cuenta sin permiso.`
          ]),
          P(`Puedes eliminar tu cuenta en cualquier momento desde los ajustes de la app, como explica nuestra Política de Privacidad.`)
        ]),
        S('3', 'Suscripciones, pruebas gratuitas y compras dentro de la app', [
          P(`Algunas funciones requieren una suscripción de pago o una compra única dentro de la app. El precio, el periodo de facturación y lo que incluye se muestran en la app antes de comprar.`),
          UL([
            ['Cobro. ', `El pago se carga a tu cuenta de Apple ID o Google Play al confirmar la compra. Apple o Google procesa todos los pagos; nunca recibimos los datos de tu tarjeta.`],
            ['Renovación automática. ', `Las suscripciones se renuevan automáticamente al final de cada periodo, al mismo precio y por la misma duración, salvo que canceles al menos 24 horas antes de que termine el periodo actual. La renovación se cobra dentro de las 24 horas previas al fin del periodo.`],
            ['Pruebas gratuitas. ', `Si se ofrece una prueba gratuita, se convierte en suscripción de pago al terminar, salvo que canceles al menos 24 horas antes. La parte no usada de una prueba gratuita se pierde al comprar una suscripción.`],
            ['Cancelación. ', `Puedes gestionar o cancelar tu suscripción en los ajustes de tu Apple ID o en la app de Google Play (Pagos y suscripciones). Borrar la app o tu cuenta no cancela la suscripción.`],
            ['Reembolsos. ', `Los reembolsos los gestiona Apple o Google según sus propias políticas. No podemos emitir reembolsos de compras hechas en sus tiendas.`],
            ['Cambios de precio. ', `Podemos cambiar los precios. Apple o Google te avisará según sus reglas y podrás cancelar antes de que se aplique el nuevo precio.`],
            ['Límites de uso. ', `Algunos planes incluyen un número limitado de generaciones de IA por periodo. Las generaciones no usadas no se acumulan, salvo que la app indique otra cosa.`]
          ])
        ]),
        S('4', 'Tu contenido y los resultados generados por IA', [
          P(`Conservas todos los derechos que tengas sobre las fotos, imágenes, textos y demás material que envías ("Tu Contenido").`, 'Tu contenido es tuyo. '),
          P(`Nos otorgas una licencia mundial, no exclusiva y sin regalías para alojar, copiar, procesar, modificar y transmitir Tu Contenido, incluido su envío a nuestros proveedores de IA, solo en la medida necesaria para prestarte los Servicios. Esta licencia termina cuando Tu Contenido se borra según nuestra Política de Privacidad, salvo las copias que la ley nos obligue a conservar.`, 'Licencia que nos otorgas. '),
          P(`Al enviar Tu Contenido, confirmas que:`, 'Tus garantías. '),
          UL([
            `Eres su dueño o tienes todos los derechos y permisos necesarios para usarlo con los Servicios.`,
            `Si muestra a otra persona, tienes su consentimiento (o el de su padre, madre o tutor si es menor) para subir y editar su imagen.`,
            `No infringe estos Términos, la ley ni derechos de terceros, incluidos derechos de autor, marcas, privacidad e imagen.`
          ]),
          P(`Las imágenes o textos que generan nuestras apps ("Resultado") los crean automáticamente modelos de IA. Entre tú y nosotros, te cedemos los derechos que tengamos sobre tu Resultado. Sin embargo:`, 'Resultados generados por IA. '),
          UL([
            `El Resultado puede ser inexacto, inesperado o parecido a resultados generados para otros usuarios, y puede no estar protegido por derechos de autor.`,
            `El Resultado es para uso personal, creativo y de entretenimiento. No es una evaluación profesional, médica, estética ni histórica.`,
            `Eres responsable de cómo usas y compartes el Resultado, incluido no presentarlo de forma que engañe sobre quién o qué muestra.`
          ])
        ]),
        S('5', 'Uso aceptable', [
          P(`No puedes usar los Servicios para subir, crear o compartir contenido que:`),
          UL([
            `Sexualice o explote a menores de cualquier forma. Reportamos el material aparente de abuso sexual infantil al National Center for Missing & Exploited Children (NCMEC) y a las autoridades.`,
            `Sea imágenes sexualmente explícitas o de desnudos de una persona real, o cualquier imagen íntima creada o compartida sin el consentimiento de esa persona.`,
            `Suplante a una persona real o busque engañar sobre hechos reales, incluidos documentos de identidad falsos o desinformación política o electoral.`,
            `Acose, amenace, intimide o difame a alguien, o promueva violencia, terrorismo u odio contra grupos protegidos.`,
            `Infrinja derechos de autor, marcas, privacidad, imagen u otros derechos.`,
            `Sea ilegal de cualquier otra forma donde vives o en Estados Unidos.`
          ]),
          P(`Tampoco puedes:`),
          UL([
            `Copiar, modificar, descompilar, aplicar ingeniería inversa o intentar extraer el código fuente de nuestras apps, salvo donde la ley lo permita expresamente.`,
            `Acceder a los Servicios mediante bots, scrapers u otros medios automatizados, ni evadir límites de uso, muros de pago o funciones de seguridad.`,
            `Interferir con nuestros servidores o los sistemas de nuestros proveedores, ni sobrecargarlos.`,
            `Revender, sublicenciar o explotar comercialmente los Servicios sin nuestro permiso por escrito.`
          ]),
          P(`Podemos eliminar contenido, limitar funciones o suspender el acceso si creemos razonablemente que incumpliste esta sección. Nuestros proveedores de IA también aplican sus propios filtros de seguridad, por lo que algunas solicitudes pueden bloquearse automáticamente.`)
        ]),
        S('6', 'Licencia, nuestra propiedad y servicios de terceros', [
          P(`Sujeto a estos Términos, te otorgamos una licencia personal, limitada, no exclusiva, intransferible y revocable para descargar y usar nuestras apps en dispositivos que te pertenezcan o controles, para uso personal y no comercial. Si descargaste una app desde una tienda, esta licencia también está sujeta a las reglas de uso de esa tienda.`, 'Tu licencia para usar las apps. '),
          P(`Las apps, el sitio web y su software, diseño, textos, gráficos, logotipos y los nombres de nuestras apps pertenecen a Brothers App Studios o a nuestros licenciantes y están protegidos por la ley. Estos Términos no te dan derecho a usar nuestros nombres o logotipos.`, 'Nuestra propiedad. '),
          P(`Si nos envías ideas o sugerencias, podemos usarlas libremente sin pagarte ni deberte nada.`, 'Comentarios. '),
          P(`Los Servicios dependen de terceros como Apple, Google, RevenueCat y nuestros proveedores de IA, y pueden enlazar a otros sitios web. No somos responsables de los servicios de terceros, y su uso puede estar sujeto a sus propios términos.`, 'Servicios de terceros. ')
        ]),
        S('7', 'Terminación', [
          P(`Puedes dejar de usar los Servicios en cualquier momento borrando la app y, si tienes una, tu cuenta. Recuerda cancelar cualquier suscripción en Apple o Google.`),
          P(`Podemos suspender o terminar tu acceso a los Servicios o a cualquier app si incumples estos Términos, si la ley lo exige o si descontinuamos una app. Cuando sea razonable, te avisaremos antes. Si descontinuamos una app mientras tienes una suscripción activa, puedes pedir un reembolso a Apple o Google.`),
          P(`Las Secciones 4 (límites de la licencia y tus garantías), 6 (nuestra propiedad), 8, 9, 10 y 11 siguen vigentes tras la terminación.`)
        ]),
        S('8', 'Exenciones, limitación de responsabilidad e indemnización', [
          P(`LOS SERVICIOS Y TODO RESULTADO SE OFRECEN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD". EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, RENUNCIAMOS A TODA GARANTÍA, EXPRESA O IMPLÍCITA, INCLUIDAS LAS DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR, TITULARIDAD, NO INFRACCIÓN Y EXACTITUD. NO GARANTIZAMOS QUE LOS SERVICIOS SEAN ININTERRUMPIDOS, LIBRES DE ERRORES O SEGUROS, NI QUE EL RESULTADO DE LA IA CUMPLA TUS EXPECTATIVAS.`, 'Exención de garantías. '),
          P(`EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:`, 'Limitación de responsabilidad. '),
          UL([
            `NO SEREMOS RESPONSABLES DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES, EJEMPLARES O PUNITIVOS, NI DE PÉRDIDA DE GANANCIAS, DATOS, REPUTACIÓN O CONTENIDO, DERIVADOS DE LOS SERVICIOS O RELACIONADOS CON ELLOS.`,
            `NUESTRA RESPONSABILIDAD TOTAL POR TODOS LOS RECLAMOS RELACIONADOS CON LOS SERVICIOS NO SUPERARÁ LA MAYOR DE ESTAS CANTIDADES: (A) LO QUE NOS PAGASTE POR LA APP QUE ORIGINA EL RECLAMO EN LOS 12 MESES ANTERIORES AL RECLAMO, O (B) US$50.`
          ]),
          P(`Algunas jurisdicciones no permiten estas exclusiones o límites, así que algunos pueden no aplicarse a ti. Nada en estos Términos limita derechos que tengas como consumidor y que no puedan renunciarse por contrato.`),
          P(`Aceptas defender, indemnizar y mantener indemne a Brothers App Studios y a sus miembros, empleados y agentes frente a reclamos, daños y costos (incluidos honorarios razonables de abogados) que surjan de Tu Contenido, tu uso del Resultado o tu incumplimiento de estos Términos o de derechos de terceros.`, 'Indemnización. ')
        ]),
        S('9', 'Resolución de disputas: arbitraje y renuncia a demandas colectivas', [
          C('', `LEE ESTA SECCIÓN CON ATENCIÓN. AFECTA CÓMO SE RESUELVEN LAS DISPUTAS ENTRE TÚ Y NOSOTROS.`),
          P(`Antes de iniciar un arbitraje, aceptas escribirnos a ${EMAIL} con tu nombre, la app involucrada, una descripción de la disputa y lo que pides. Haremos lo mismo si tenemos una disputa contigo. Ambas partes intentarán de buena fe resolverla en 60 días.`, 'Primero intenta resolverlo de manera informal. '),
          P(`Si la disputa no se resuelve en 60 días, tú y Brothers App Studios aceptan que toda disputa, reclamo o controversia derivada de estos Términos o de los Servicios, o relacionada con ellos, se resolverá mediante arbitraje vinculante y no en tribunales. El arbitraje lo administrará la American Arbitration Association (AAA) según sus Reglas de Arbitraje de Consumo, ante un árbitro único. La Federal Arbitration Act rige esta sección.`, 'Arbitraje individual vinculante. '),
          UL([
            `El arbitraje puede realizarse por videoconferencia, por teléfono, por escrito o en el condado donde vives.`,
            `El pago de las tasas de presentación y del árbitro seguirá las Reglas de Arbitraje de Consumo de la AAA.`,
            `El árbitro puede otorgar la misma reparación individual que un tribunal, pero solo a ti de forma individual.`
          ]),
          P(`Cualquiera de las partes puede presentar un reclamo individual ante un tribunal de menor cuantía si califica. También puede pedir a un tribunal una orden para detener la infracción o el mal uso de propiedad intelectual.`, 'Excepciones. '),
          P(`TÚ Y BROTHERS APP STUDIOS SOLO PUEDEN PRESENTAR RECLAMOS DE FORMA INDIVIDUAL, NO COMO DEMANDANTE O MIEMBRO DE UNA ACCIÓN COLECTIVA, GRUPAL O REPRESENTATIVA. AMBAS PARTES RENUNCIAN AL DERECHO A UN JUICIO CON JURADO. Si esta renuncia se declara inaplicable para un reclamo, ese reclamo se tramitará en un tribunal y no en arbitraje.`, 'Renuncia a demandas colectivas y a juicio con jurado. '),
          P(`Puedes excluirte de este acuerdo de arbitraje escribiendo a ${EMAIL} dentro de los 30 días posteriores a aceptar estos Términos por primera vez. Incluye tu nombre, la app que usas y una declaración clara de que te excluyes del arbitraje. Excluirte no afecta ninguna otra parte de estos Términos.`, 'Tu derecho a excluirte. '),
          P(`Si vives en un país cuyas leyes de consumo no permiten el arbitraje previo a la disputa ni la renuncia a demandas colectivas, como los Estados miembros de la Unión Europea o el Reino Unido, esta Sección 9 no se te aplica y puedes presentar reclamos ante los tribunales de tu lugar de residencia.`, 'Donde la ley no lo permite. ')
        ]),
        S('10', 'Ley aplicable, cambios y disposiciones generales', [
          P(`Estos Términos se rigen por las leyes del Estado de Wyoming y la ley federal de EE. UU. aplicable, sin considerar normas de conflicto de leyes. Toda disputa no sujeta a arbitraje se verá solo en los tribunales estatales o federales ubicados en Wyoming, y ambas partes aceptan su jurisdicción, salvo cuando la Sección 9 te permita demandar donde vives.`, 'Ley aplicable. '),
          P(`Podemos actualizar estos Términos, por ejemplo al lanzar una app o función nueva. Cambiaremos la fecha de "Última actualización". Si un cambio es importante, te avisaremos en la app o por correo antes de que entre en vigor. Seguir usando los Servicios después de esa fecha significa que aceptas los Términos actualizados. Los cambios a la Sección 9 no se aplicarán a disputas que ya conocíamos.`, 'Cambios a estos Términos. '),
          P(`Estos Términos y nuestra Política de Privacidad son el acuerdo completo entre tú y nosotros sobre los Servicios. Si alguna disposición es inaplicable, el resto sigue vigente. No hacer valer una disposición no implica renunciar a ella. No puedes transferir estos Términos sin nuestro consentimiento; nosotros podemos transferirlos como parte de una fusión, adquisición o venta de activos.`, 'Disposiciones generales. '),
          P(`Brothers App Studios LLC, [dirección postal], Wyoming, Estados Unidos · ${EMAIL} · brothersappstudios.com`, 'Contacto. ')
        ]),
        S('11', 'Términos adicionales para apps descargadas de Apple App Store', [
          P(`Si descargaste una de nuestras apps desde Apple App Store, también se aplican estos términos:`),
          OL([
            ['Partes. ', `Estos Términos son solo entre tú y Brothers App Studios, no con Apple Inc. ("Apple"). Brothers App Studios, y no Apple, es el único responsable de la app y su contenido.`],
            ['Alcance de la licencia. ', `Tu licencia se limita a usar la app en productos de marca Apple que te pertenezcan o controles, según las Reglas de Uso de los Términos y Condiciones de los Servicios Multimedia de Apple.`],
            ['Soporte. ', `Brothers App Studios es el único responsable del mantenimiento y soporte de la app. Apple no tiene obligación de ofrecer mantenimiento ni soporte.`],
            ['Garantía. ', `Si la app no cumple alguna garantía aplicable, puedes notificarlo a Apple, que reembolsará el precio de compra, si lo hubo. En la máxima medida permitida por la ley, Apple no tiene ninguna otra obligación de garantía sobre la app.`],
            ['Reclamos sobre el producto. ', `Brothers App Studios, y no Apple, es responsable de atender cualquier reclamo tuyo o de terceros relacionado con la app, incluidos reclamos de responsabilidad por productos, de incumplimiento de requisitos legales o regulatorios, y los basados en leyes de protección al consumidor, privacidad o similares.`],
            ['Propiedad intelectual. ', `Si un tercero alega que la app o tu uso de ella infringe sus derechos de propiedad intelectual, Brothers App Studios, y no Apple, es el único responsable de investigar, defender, resolver y liquidar ese reclamo.`],
            ['Cumplimiento legal. ', `Confirmas que no estás en un país sujeto a embargo del Gobierno de EE. UU. ni designado como país que "apoya el terrorismo", y que no figuras en ninguna lista del Gobierno de EE. UU. de partes prohibidas o restringidas.`],
            ['Términos de terceros. ', `Debes cumplir los términos de terceros aplicables al usar la app, como tu contrato de servicio de datos móviles.`],
            ['Tercero beneficiario. ', `Apple y sus subsidiarias son terceros beneficiarios de estos Términos. Una vez que los aceptas, Apple tiene derecho a hacerlos valer frente a ti como tercero beneficiario.`]
          ]),
          P(`Las preguntas, quejas o reclamos sobre la app se dirigen a Brothers App Studios LLC con los datos de contacto de la Sección 10.`)
        ])
      ]
    }
  },
  privacy: {
    en: {
      title1: 'Privacy ', title2: 'Policy',
      subtitle: 'How Brothers App Studios collects, uses and shares information when you use our mobile apps and our website.',
      date: 'Oct 13, 2026',
      contactTitle: 'Questions, requests or complaints about privacy',
      address: `Brothers App Studios LLC · ${DIRECTION}`,
      glance: [
        { icon: 'shield', title: 'We never sell your data', text: 'No third-party ads, and no tracking across other companies’ apps or websites.' },
        { icon: 'chip', title: 'No AI training, no face recognition', text: 'Your photos are used only to create the result you asked for.' },
        { icon: 'trash', title: 'Deleted within [24 hours]', text: 'Uploads and AI results are removed from our servers after processing.' }
      ],
      sections: [
        S('1', 'Who we are and what this policy covers', [
          P(`This Privacy Policy explains how Brothers App Studios LLC ("Brothers App Studios", "we", "us") collects, uses and shares information when you use our mobile applications and our website, brothersappstudios.com (together, the "Services").`),
          P(`Brothers App Studios LLC is a limited liability company organized under the laws of the State of Wyoming, United States. We are the developer named on the App Store and Google Play listings of each app covered by this policy.`),
          P(`This single policy applies to every app listed in Appendix A. Appendix A also describes what each app does with your data. If an app's entry in Appendix A differs from the general sections, the app's entry controls for that app.`),
          P(`By using the Services, you acknowledge that you have read this policy. If you do not agree with it, please do not use the Services.`)
        ]),
        S('2', 'Information we collect', [
          P(`We collect only what each app needs to work. Most of our apps can be used without creating an account.`),
          H('Content you provide'),
          UL([
            `Photos, images and text prompts you choose to upload or enter so an AI feature can process them.`,
            `Messages you send us, for example support requests or feedback, including your email address.`
          ]),
          H('Account information (only in apps that offer an account)'),
          UL([
            `Your email address and, if you choose, your name.`,
            `If you sign in with Apple or Google, the basic profile information that provider shares with us. If you use Sign in with Apple's "Hide My Email" option, we receive a relay address instead of your real email.`,
            `We do not see or store your Apple or Google password.`
          ]),
          H('Purchase information'),
          UL([
            `Subscriptions and in-app purchases are processed by Apple or Google. We never receive your card number or billing details.`,
            `We receive a transaction record (product, price, date, subscription status) and an anonymous app user ID so we can unlock paid features and restore purchases.`
          ]),
          H('Information collected automatically'),
          UL([
            `Device and app information: device model, operating system version, app version, language and region settings.`,
            `Crash reports and diagnostic data: what the app was doing when it crashed or slowed down, so we can fix bugs.`,
            `Basic usage events needed to run the Services, such as how many AI generations you have used.`
          ]),
          H('What we do not collect'),
          P(`Unless an app's entry in Appendix A says otherwise, we do not collect your precise location, contacts, health data, or browsing history in other apps. We do not track you across apps or websites owned by other companies, and we do not show third-party ads.`)
        ]),
        S('3', 'How our AI features handle your photos and content', [
          P(`Our apps use artificial intelligence (AI) models run by third-party providers to edit, restore or generate images and text. When you use an AI feature:`),
          OL([
            ['We ask first. ', `Before your photo or content is sent to an AI provider for the first time, the app tells you and asks for your permission.`],
            ['We send only what is needed. ', `The photo or prompt you selected is sent over an encrypted connection (HTTPS) from our servers to the AI provider, together with the settings you chose. We do not send your name or email with it.`],
            ['The provider returns the result. ', `Our main AI provider is Replicate, Inc. (United States). For requests made through its API, Replicate automatically deletes inputs, outputs and logs about one hour after processing, by default.`],
            ['We delete it from our servers. ', `We keep your original photo and the result on our servers only as long as Section 6 describes.`]
          ]),
          P(`We do not use your photos, prompts or results to train or improve AI models, and we do not sell them.`, 'No training. '),
          P(`Our apps edit the appearance of an image. We do not create face templates, faceprints or other biometric identifiers, and we do not use your photos to identify you or anyone else.`, 'No facial recognition. '),
          P(`AI output can be inaccurate or unexpected. It is a creative edit, not a factual or professional assessment.`, 'Results are generated by AI. ')
        ]),
        S('4', 'How we use information', [
          P(`We use the information described above only to:`),
          UL([
            `Provide the app's features, including processing your photos and content with AI.`,
            `Create and manage your account, in apps that offer one.`,
            `Verify purchases, unlock paid features and restore purchases.`,
            `Fix crashes and bugs, and keep the Services secure and working.`,
            `Prevent fraud, abuse and violations of our Terms of Service.`,
            `Answer your messages and support requests.`,
            `Comply with legal obligations and enforce our rights.`
          ]),
          P(`We do not use your information for targeted advertising, and we do not make decisions about you that produce legal or similarly significant effects based solely on automated processing.`)
        ]),
        S('5', 'How we share information', [
          P(`We do not sell your personal information, and we do not share it for cross-context behavioral advertising. We share it only in the cases below.`),
          P(`These companies process data on our behalf, under contracts that limit their use of it to providing their service to us:`, 'Service providers. '),
          T(['Provider', 'What they do for us', 'Data involved'], [
            ['Replicate, Inc.', 'Runs the AI models', 'Photos, prompts and settings you submit; AI results'],
            ['RevenueCat, Inc.', 'Manages subscriptions and purchases', 'Anonymous app user ID, purchase records, device type'],
            ['Apple Inc. and Google LLC', 'Process payments and optional sign-in', "Handled under Apple's and Google's own privacy policies"],
            ['[Hosting / backend provider, e.g. Supabase]', 'Hosts our servers and, in apps with accounts, our database', 'Account data, uploaded content while it is stored'],
            ['[Crash reporting provider, e.g. Firebase Crashlytics or Sentry]', 'Crash and performance reports', 'Device and app information, crash logs']
          ]),
          P(`We may disclose information if required by law, subpoena or court order, or when we believe in good faith it is necessary to protect the rights, safety or property of our users, the public or Brothers App Studios. This includes reporting apparent child sexual abuse material to the National Center for Missing & Exploited Children (NCMEC).`, 'Legal reasons. '),
          P(`If Brothers App Studios is involved in a merger, acquisition or sale of assets, your information may be transferred as part of that deal. This policy will continue to apply to it.`, 'Business transfers. '),
          P(`For example, when you choose to share an AI result to another app or social network from your device.`, 'With your consent. ')
        ]),
        S('6', 'How long we keep information', [
          P(`We keep information only as long as we need it for the purposes in Section 4, unless the law requires us to keep it longer.`),
          T(['Data', 'How long we keep it'], [
            ['Photos and prompts you upload, and AI results, on our servers', 'Deleted within [24 hours] after processing, unless you save them in an app that offers a gallery or history (see Appendix A)'],
            ['Same data at our AI provider (Replicate)', 'About 1 hour after processing, by default'],
            ["Content saved in your account's gallery or history", 'Until you delete it or delete your account'],
            ['Account information', 'Until you delete your account, then removed within [30 days]'],
            ['Purchase records', 'As long as needed for accounting, tax and legal obligations'],
            ['Crash and diagnostic reports', 'Up to [90 days]'],
            ['Support emails', 'Up to [2 years] after the conversation ends']
          ]),
          P(`Photos and results saved only on your device stay there until you delete them. We cannot access or delete them for you.`)
        ]),
        S('7', 'Your rights and choices', [
          P(`In apps that offer an account, you can delete your account and its data at any time:`, 'Deleting your account and data. '),
          UL([
            `Inside the app: Settings > Account > Delete account.`,
            `Without the app: send a request from [brothersappstudios.com/delete-account], or email us at ${EMAIL} with the app name and the email linked to your account.`
          ]),
          P(`We complete deletion within [30 days]. Deleting an account does not cancel a subscription; cancel it in your Apple or Google account settings.`),
          P(`We do not link your uploads to your identity. You can ask us to delete any data tied to your device's app user ID by emailing us; tell us the app name and, if possible, the app user ID shown in the app's settings.`, 'Apps without an account. '),
          P(`You can deny or remove camera and photo library access in your device settings at any time, though some features will stop working. You can also stop all collection by uninstalling the app.`, 'Other choices. '),
          P(`Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal information, to object to or restrict certain processing, and to withdraw consent. This includes residents of California and other US states with consumer privacy laws, and of the European Economic Area, the United Kingdom and Switzerland.`, 'Privacy rights by location. '),
          UL([
            `To use these rights, email us. We may need to verify your request, and we will answer within the time the law requires.`,
            `You can use an authorized agent where the law allows it.`,
            `We will not discriminate against you for using your rights.`,
            `If you are in the EEA, UK or Switzerland, we rely on these legal bases: performing our contract with you (providing the app), your consent (AI processing of your photos), and our legitimate interests (security, bug fixing). You may also complain to your local data protection authority.`
          ])
        ]),
        S('8', 'Children, security and international transfers', [
          P(`Our apps are not directed to children under 13, and we do not knowingly collect personal information from them. In the EEA and UK, the minimum age is 16 unless your country sets a lower age. If you believe a child has given us personal information, contact us and we will delete it.`, 'Children. '),
          P(`We use encryption in transit (HTTPS), access controls and short retention periods to protect your information. No system is completely secure, so we cannot guarantee absolute security.`, 'Security. '),
          P(`We are based in the United States, and our providers process data mainly in the United States. If you use the Services from another country, your information will be transferred to and processed in the United States. Where the law requires it, we use appropriate safeguards, such as the European Commission's Standard Contractual Clauses.`, 'International transfers. ')
        ]),
        S('9', 'Changes to this policy and how to contact us', [
          P(`We may update this policy, for example when we launch a new app or change a provider. We will change the "Last updated" date at the top. If a change materially affects how we use information we already hold, we will notify you in the app or by email before it takes effect and, where the law requires it, ask for your consent again.`),
          P(`Questions, requests or complaints about privacy:`),
          UL([
            ['Email: ', EMAIL],
            ['Mail: ', `Brothers App Studios LLC, ${DIRECTION}`],
            ['Website: ', `brothersappstudios.com`]
          ]),
          P(`This policy is written in English. A Spanish translation is provided for convenience; if they differ, the English version controls.`)
        ]),
        S('A', 'Appendix A: Apps covered by this policy', [
          P(`This policy applies to the apps below, published by Brothers App Studios LLC on the Apple App Store and Google Play. When we publish a new app, we add it here and update the date at the top.`),
          T(['App', 'Account', 'Data the app processes', 'Saved history on our servers'], [
            ['Photo Old', '[No]', 'Photos you upload; AI results; purchase records; crash reports', '[No: deleted within 24 hours]'],
            ['StyleMe AI', '[No]', 'Face photos you upload; chosen hairstyle and hair color; AI results; purchase records; crash reports', '[No: deleted within 24 hours]']
          ])
        ])
      ]
    },
    es: {
      title1: 'Política de ', title2: 'Privacidad',
      subtitle: 'Cómo Brothers App Studios recopila, usa y comparte información cuando usas nuestras apps móviles y nuestro sitio web.',
      date: '13 de octubre de 2026',
      contactTitle: 'Preguntas, solicitudes o quejas sobre privacidad',
      address: 'Brothers App Studios LLC · [dirección postal], Wyoming, Estados Unidos',
      glance: [
        { icon: 'shield', title: 'Nunca vendemos tus datos', text: 'Sin anuncios de terceros ni rastreo en apps o sitios web de otras empresas.' },
        { icon: 'chip', title: 'Sin entrenamiento de IA ni reconocimiento facial', text: 'Tus fotos solo se usan para crear el resultado que pediste.' },
        { icon: 'trash', title: 'Se borran dentro de [24 horas]', text: 'Lo que subes y los resultados de IA se eliminan de nuestros servidores tras el procesamiento.' }
      ],
      sections: [
        S('1', 'Quiénes somos y qué cubre esta política', [
          P(`Esta Política de Privacidad explica cómo Brothers App Studios LLC ("Brothers App Studios", "nosotros") recopila, usa y comparte información cuando usas nuestras aplicaciones móviles y nuestro sitio web, brothersappstudios.com (en conjunto, los "Servicios").`),
          P(`Brothers App Studios LLC es una sociedad de responsabilidad limitada constituida conforme a las leyes del Estado de Wyoming, Estados Unidos. Somos el desarrollador que figura en las fichas de App Store y Google Play de cada app cubierta por esta política.`),
          P(`Esta única política se aplica a todas las apps listadas en el Apéndice A, que además describe qué hace cada app con tus datos. Si la ficha de una app en el Apéndice A difiere de las secciones generales, prevalece la ficha de esa app.`),
          P(`Al usar los Servicios, reconoces que has leído esta política. Si no estás de acuerdo, no uses los Servicios.`)
        ]),
        S('2', 'Información que recopilamos', [
          P(`Recopilamos solo lo que cada app necesita para funcionar. La mayoría de nuestras apps se pueden usar sin crear una cuenta.`),
          H('Contenido que nos proporcionas'),
          UL([
            `Fotos, imágenes y textos (prompts) que eliges subir o escribir para que una función de IA los procese.`,
            `Mensajes que nos envías, por ejemplo solicitudes de soporte o comentarios, incluido tu correo electrónico.`
          ]),
          H('Información de cuenta (solo en apps que ofrecen cuenta)'),
          UL([
            `Tu correo electrónico y, si lo deseas, tu nombre.`,
            `Si inicias sesión con Apple o Google, la información básica de perfil que ese proveedor nos comparte. Si usas la opción "Ocultar mi correo" de Apple, recibimos una dirección de reenvío en lugar de tu correo real.`,
            `No vemos ni guardamos tu contraseña de Apple o Google.`
          ]),
          H('Información de compras'),
          UL([
            `Las suscripciones y compras dentro de la app las procesa Apple o Google. Nunca recibimos el número de tu tarjeta ni tus datos de facturación.`,
            `Recibimos un registro de la transacción (producto, precio, fecha, estado de la suscripción) y un ID de usuario anónimo de la app para activar funciones de pago y restaurar compras.`
          ]),
          H('Información que se recopila automáticamente'),
          UL([
            `Información del dispositivo y la app: modelo, versión del sistema operativo, versión de la app, idioma y región.`,
            `Reportes de fallos y datos de diagnóstico: qué hacía la app cuando falló o se volvió lenta, para corregir errores.`,
            `Eventos de uso básicos necesarios para operar los Servicios, como cuántas generaciones de IA has usado.`
          ]),
          H('Lo que no recopilamos'),
          P(`Salvo que la ficha de una app en el Apéndice A diga otra cosa, no recopilamos tu ubicación precisa, contactos, datos de salud ni tu historial de navegación en otras apps. No te rastreamos a través de apps o sitios web de otras empresas y no mostramos anuncios de terceros.`)
        ]),
        S('3', 'Cómo nuestras funciones de IA tratan tus fotos y contenido', [
          P(`Nuestras apps usan modelos de inteligencia artificial (IA) operados por proveedores externos para editar, restaurar o generar imágenes y texto. Cuando usas una función de IA:`),
          OL([
            ['Primero te preguntamos. ', `Antes de enviar tu foto o contenido a un proveedor de IA por primera vez, la app te lo informa y te pide permiso.`],
            ['Enviamos solo lo necesario. ', `La foto o el texto que elegiste se envía por una conexión cifrada (HTTPS) desde nuestros servidores al proveedor de IA, junto con los ajustes que elegiste. No enviamos tu nombre ni tu correo.`],
            ['El proveedor devuelve el resultado. ', `Nuestro principal proveedor de IA es Replicate, Inc. (Estados Unidos). En las solicitudes hechas por su API, Replicate borra automáticamente las entradas, salidas y registros cerca de una hora después del procesamiento, por defecto.`],
            ['Lo borramos de nuestros servidores. ', `Guardamos tu foto original y el resultado en nuestros servidores solo durante el tiempo que indica la Sección 6.`]
          ]),
          P(`No usamos tus fotos, textos ni resultados para entrenar o mejorar modelos de IA, y no los vendemos.`, 'Sin entrenamiento. '),
          P(`Nuestras apps editan la apariencia de una imagen. No creamos plantillas faciales, huellas faciales ni otros identificadores biométricos, y no usamos tus fotos para identificarte a ti ni a nadie.`, 'Sin reconocimiento facial. '),
          P(`El resultado de la IA puede ser inexacto o inesperado. Es una edición creativa, no una evaluación factual ni profesional.`, 'Los resultados los genera una IA. ')
        ]),
        S('4', 'Cómo usamos la información', [
          P(`Usamos la información descrita solo para:`),
          UL([
            `Ofrecer las funciones de la app, incluido el procesamiento de tus fotos y contenido con IA.`,
            `Crear y administrar tu cuenta, en las apps que la ofrecen.`,
            `Verificar compras, activar funciones de pago y restaurar compras.`,
            `Corregir fallos y errores, y mantener los Servicios seguros y en funcionamiento.`,
            `Prevenir fraude, abuso e incumplimientos de nuestros Términos de Servicio.`,
            `Responder tus mensajes y solicitudes de soporte.`,
            `Cumplir obligaciones legales y hacer valer nuestros derechos.`
          ]),
          P(`No usamos tu información para publicidad dirigida ni tomamos decisiones sobre ti con efectos legales o igualmente significativos basadas únicamente en procesos automatizados.`)
        ]),
        S('5', 'Cómo compartimos la información', [
          P(`No vendemos tu información personal ni la compartimos para publicidad conductual entre contextos. Solo la compartimos en estos casos.`),
          P(`Estas empresas tratan datos en nuestro nombre, bajo contratos que limitan su uso a prestarnos su servicio:`, 'Proveedores de servicios. '),
          T(['Proveedor', 'Qué hace para nosotros', 'Datos involucrados'], [
            ['Replicate, Inc.', 'Ejecuta los modelos de IA', 'Fotos, textos y ajustes que envías; resultados de IA'],
            ['RevenueCat, Inc.', 'Gestiona suscripciones y compras', 'ID de usuario anónimo de la app, registros de compra, tipo de dispositivo'],
            ['Apple Inc. y Google LLC', 'Procesan pagos e inicio de sesión opcional', 'Tratados según las políticas de privacidad propias de Apple y Google'],
            ['[Proveedor de hosting / backend, p. ej. Supabase]', 'Aloja nuestros servidores y, en apps con cuenta, nuestra base de datos', 'Datos de cuenta, contenido subido mientras se almacena'],
            ['[Proveedor de reportes de fallos, p. ej. Firebase Crashlytics o Sentry]', 'Reportes de fallos y rendimiento', 'Información del dispositivo y la app, registros de fallos']
          ]),
          P(`Podemos revelar información si lo exige la ley, una citación u orden judicial, o cuando creamos de buena fe que es necesario para proteger los derechos, la seguridad o los bienes de nuestros usuarios, del público o de Brothers App Studios. Esto incluye reportar material aparente de abuso sexual infantil al National Center for Missing & Exploited Children (NCMEC).`, 'Motivos legales. '),
          P(`Si Brothers App Studios participa en una fusión, adquisición o venta de activos, tu información puede transferirse como parte de esa operación. Esta política seguirá aplicándose a ella.`, 'Transferencias de negocio. '),
          P(`Por ejemplo, cuando eliges compartir un resultado de IA con otra app o red social desde tu dispositivo.`, 'Con tu consentimiento. ')
        ]),
        S('6', 'Cuánto tiempo conservamos la información', [
          P(`Conservamos la información solo mientras la necesitemos para los fines de la Sección 4, salvo que la ley exija conservarla más tiempo.`),
          T(['Dato', 'Cuánto tiempo lo conservamos'], [
            ['Fotos y textos que subes, y resultados de IA, en nuestros servidores', 'Se borran dentro de [24 horas] tras el procesamiento, salvo que los guardes en una app que ofrezca galería o historial (ver Apéndice A)'],
            ['Los mismos datos en nuestro proveedor de IA (Replicate)', 'Cerca de 1 hora tras el procesamiento, por defecto'],
            ['Contenido guardado en la galería o historial de tu cuenta', 'Hasta que lo borres o elimines tu cuenta'],
            ['Información de cuenta', 'Hasta que elimines tu cuenta; luego se borra dentro de [30 días]'],
            ['Registros de compra', 'El tiempo necesario por obligaciones contables, fiscales y legales'],
            ['Reportes de fallos y diagnóstico', 'Hasta [90 días]'],
            ['Correos de soporte', 'Hasta [2 años] después de terminar la conversación']
          ]),
          P(`Las fotos y resultados guardados solo en tu dispositivo permanecen ahí hasta que los borres. No podemos acceder a ellos ni borrarlos por ti.`)
        ]),
        S('7', 'Tus derechos y opciones', [
          P(`En las apps que ofrecen cuenta, puedes eliminar tu cuenta y sus datos en cualquier momento:`, 'Eliminar tu cuenta y tus datos. '),
          UL([
            `Dentro de la app: Ajustes > Cuenta > Eliminar cuenta.`,
            `Sin la app: envía una solicitud desde [brothersappstudios.com/delete-account] o escríbenos a ${EMAIL} con el nombre de la app y el correo vinculado a tu cuenta.`
          ]),
          P(`Completamos la eliminación dentro de [30 días]. Eliminar la cuenta no cancela una suscripción; cancélala en los ajustes de tu cuenta de Apple o Google.`),
          P(`No vinculamos lo que subes con tu identidad. Puedes pedirnos que borremos cualquier dato asociado al ID de usuario de la app en tu dispositivo escribiéndonos; indica el nombre de la app y, si es posible, el ID que aparece en los ajustes de la app.`, 'Apps sin cuenta. '),
          P(`Puedes negar o retirar el acceso a la cámara y a la galería de fotos en los ajustes de tu dispositivo en cualquier momento, aunque algunas funciones dejarán de funcionar. También puedes detener toda recopilación desinstalando la app.`, 'Otras opciones. '),
          P(`Según tu lugar de residencia, puedes tener derecho a acceder, corregir, borrar o recibir una copia de tu información personal, a oponerte o limitar ciertos tratamientos y a retirar tu consentimiento. Esto incluye a residentes de California y otros estados de EE. UU. con leyes de privacidad del consumidor, y del Espacio Económico Europeo, el Reino Unido y Suiza.`, 'Derechos de privacidad según dónde vivas. '),
          UL([
            `Para ejercer estos derechos, escríbenos. Podemos necesitar verificar tu solicitud y responderemos dentro del plazo que exija la ley.`,
            `Puedes usar un agente autorizado cuando la ley lo permita.`,
            `No te discriminaremos por ejercer tus derechos.`,
            `Si estás en el EEE, Reino Unido o Suiza, nos basamos en estas bases legales: la ejecución de nuestro contrato contigo (ofrecer la app), tu consentimiento (procesamiento de tus fotos con IA) y nuestros intereses legítimos (seguridad, corrección de errores). También puedes presentar una queja ante tu autoridad local de protección de datos.`
          ])
        ]),
        S('8', 'Menores, seguridad y transferencias internacionales', [
          P(`Nuestras apps no están dirigidas a menores de 13 años y no recopilamos a sabiendas información personal de ellos. En el EEE y el Reino Unido, la edad mínima es 16 años, salvo que tu país fije una menor. Si crees que un menor nos dio información personal, contáctanos y la borraremos.`, 'Menores. '),
          P(`Usamos cifrado en tránsito (HTTPS), controles de acceso y plazos de conservación cortos para proteger tu información. Ningún sistema es completamente seguro, así que no podemos garantizar una seguridad absoluta.`, 'Seguridad. '),
          P(`Estamos en Estados Unidos y nuestros proveedores tratan los datos principalmente allí. Si usas los Servicios desde otro país, tu información se transferirá y tratará en Estados Unidos. Cuando la ley lo exija, usamos garantías adecuadas, como las Cláusulas Contractuales Tipo de la Comisión Europea.`, 'Transferencias internacionales. ')
        ]),
        S('9', 'Cambios a esta política y cómo contactarnos', [
          P(`Podemos actualizar esta política, por ejemplo al lanzar una app nueva o cambiar de proveedor. Cambiaremos la fecha de "Última actualización". Si un cambio afecta de forma importante cómo usamos información que ya tenemos, te avisaremos en la app o por correo antes de que entre en vigor y, cuando la ley lo exija, te pediremos de nuevo tu consentimiento.`),
          P(`Preguntas, solicitudes o quejas sobre privacidad:`),
          UL([
            ['Correo: ', EMAIL],
            ['Dirección postal: ', `Brothers App Studios LLC, [dirección postal], Wyoming, Estados Unidos`],
            ['Sitio web: ', `brothersappstudios.com`]
          ])
        ]),
        S('A', 'Apéndice A: Apps cubiertas por esta política', [
          P(`Esta política se aplica a las apps siguientes, publicadas por Brothers App Studios LLC en Apple App Store y Google Play. Cuando publicamos una app nueva, la agregamos aquí y actualizamos la fecha.`),
          T(['App', 'Cuenta', 'Datos que procesa la app', 'Historial guardado en nuestros servidores'], [
            ['Photo Old', '[No]', 'Fotos que subes; resultados de IA; registros de compra; reportes de fallos', '[No: se borran dentro de 24 horas]'],
            ['StyleMe AI', '[No]', 'Fotos de rostro que subes; peinado y color elegidos; resultados de IA; registros de compra; reportes de fallos', '[No: se borran dentro de 24 horas]']
          ])
        ])
      ]
    }
  }
};
