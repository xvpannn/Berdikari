// components/JsonLd.tsx
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://berdikariconsultant.com/#organization",
        "name": "Berdikari Consultant",
        "alternateName": "PT. Cahaya Kencana Prawira",
        "url": "https://berdikariconsultant.com",
        "logo": "https://berdikariconsultant.com/logo.png",
        "image": "https://berdikariconsultant.com/og-image.jpg",
        "description": "Konsultan perizinan dan legalitas usaha terpercaya di Bali.",
        "telephone": "+628976767762",
        "email": "berdikariconsultantbali@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Pulau Selayar No.18",
          "addressLocality": "Denpasar",
          "addressRegion": "Bali",
          "postalCode": "80113",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -8.6705,
          "longitude": 115.2126
        },
        "areaServed": { "@type": "Place", "name": "Bali, Indonesia" },
        "serviceType": [
          "Perizinan Bangunan",
          "Legalitas Usaha",
          "Tenaga Kerja Asing",
          "Konsultasi Bisnis"
        ],
        "priceRange": "Hubungi Kami",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://berdikariconsultant.com/#website",
        "url": "https://berdikariconsultant.com",
        "name": "Berdikari Consultant",
        "publisher": { "@id": "https://berdikariconsultant.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://berdikariconsultant.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
