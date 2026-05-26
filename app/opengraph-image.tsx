import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'TNS - Transportadores de Norte de Santander';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'radial-gradient(circle at 85% 15%, rgba(187, 4, 0, 0.35) 0%, rgba(187, 4, 0, 0) 45%), linear-gradient(135deg, #000000 0%, #111111 100%)',
          color: '#ffffff',
          padding: '56px 72px',
          position: 'relative',
          textAlign: 'center',
          gap: 26,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 41px, rgba(225, 232, 253, 0.08) 41px, rgba(225, 232, 253, 0.08) 42px), repeating-linear-gradient(90deg, transparent, transparent 41px, rgba(225, 232, 253, 0.08) 41px, rgba(225, 232, 253, 0.08) 42px)',
            opacity: 0.35,
          }}
        />

        <div
          style={{
            position: 'relative',
            width: 220,
            height: 220,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(241, 243, 255, 0.06)',
            border: '3px solid rgba(187, 4, 0, 0.75)',
            boxShadow: '0 18px 46px rgba(0, 0, 0, 0.35)',
          }}
        >
          <img
            src="https://www.transportadorestns.com/tns-logo.png"
            alt="TNS"
            width="150"
            height="58"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.08,
              maxWidth: 980,
              textTransform: 'uppercase',
            }}
          >
            Transportadores de Norte de Santander
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#F1F3FF',
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            Transporte de carga líquida y seca en Colombia.
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            fontSize: 24,
            color: '#E1E8FD',
            textTransform: 'uppercase',
            letterSpacing: 1.6,
            borderTop: '2px solid rgba(187, 4, 0, 0.8)',
            paddingTop: 16,
            width: '100%',
            maxWidth: 720,
          }}
        >
          www.transportadorestns.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
