// ---------------------------------------------------------------------------
// Envoi d'e-mails via Resend — utilisé par l'authentification, les invitations
// et les notifications de changement de statut.
// ---------------------------------------------------------------------------

export const DESTINATION = process.env.MAIL_DESTINATION || 'sodilame@sodilame.fr';
export const EXPEDITEUR = process.env.MAIL_EXPEDITEUR || 'SODILAME <contact@sodilame.com>';
export const TEL = '04 90 93 98 88';

export const echapper = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Enveloppe HTML commune aux e-mails transactionnels. */
export function gabarit(titre, corpsHtml, bouton = null) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#FAF6EF;padding:24px">
  <table role="presentation" width="100%" style="background:#183253;border-radius:10px 10px 0 0"><tr><td style="padding:18px 24px;color:#fff;font-size:15px;letter-spacing:.05em">
    <b>${echapper(titre).toUpperCase()}</b>
  </td></tr></table>
  <div style="background:#fff;padding:26px;border:1px solid #E4DACA;border-top:0;border-radius:0 0 10px 10px;font-size:15px;color:#1B2430;line-height:1.65">
    ${corpsHtml}
    ${
      bouton
        ? `<p style="margin:26px 0 8px"><a href="${bouton.url}" style="display:inline-block;background:#DFA64F;color:#1B2430;text-decoration:none;font-weight:700;padding:13px 26px;border-radius:8px">${echapper(bouton.label)}</a></p>
           <p style="font-size:12px;color:#8A93A0;margin:14px 0 0;word-break:break-all">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${bouton.url}</p>`
        : ''
    }
    <p style="margin:26px 0 0;padding-top:18px;border-top:1px solid #E4DACA;font-size:12px;color:#8A93A0">
      SODILAME — Cuisines professionnelles<br>
      3 impasse des Apprentis, ZA de la Chapelette — 13310 Saint-Martin-de-Crau<br>
      ${TEL}
    </p>
  </div>
</div>`;
}

/**
 * Envoie un e-mail. Ne lève jamais : renvoie { ok, erreur }.
 * L'appelant décide si un échec est bloquant.
 * `pieces` : [{ filename, content }] où content est du base64 sans préfixe.
 */
export async function envoyer({ to, sujet, html, texte, replyTo, pieces = [] }) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente — e-mail non envoyé :', sujet);
    return { ok: false, erreur: 'Service d’envoi non configuré.' };
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: Array.isArray(to) ? to : [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: sujet,
        ...(html ? { html } : {}),
        ...(texte ? { text: texte } : {}),
        // Pièces jointes : contenu déjà encodé en base64 par l'appelant.
        ...(pieces.length
          ? { attachments: pieces.map((p) => ({ filename: p.filename, content: p.content })) }
          : {}),
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Erreur Resend :', r.status, detail);
      return { ok: false, erreur: 'L’envoi a échoué.' };
    }
    return { ok: true };
  } catch (e) {
    console.error('Erreur envoi :', e?.message);
    return { ok: false, erreur: 'L’envoi a échoué.' };
  }
}

/** Base absolue du site, pour construire les liens des e-mails. */
export function baseUrl(req) {
  const env = process.env.SITE_URL;
  if (env) return env.replace(/\/$/, '');
  const hote = req?.headers?.['x-forwarded-host'] || req?.headers?.host;
  if (hote) return `https://${hote}`;
  return 'https://www.sodilame.com';
}
