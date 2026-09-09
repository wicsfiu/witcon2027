interface Sponsor {
  name: string;
  image?: string;
  link?: string;
}

interface CommunityPartner {
  name: string;
  image?: string;
  link?: string;
}

const sponsors: Sponsor[] = [
  // Add sponsors here as they are confirmed.
  // Example:
  // {
  //   name: "Company Name",
  //   image: "/images/sponsors/company-name.png",
  //   link: "https://company.com",
  // },
];

const communityPartners: CommunityPartner[] = [
  // Add community partners here as they are confirmed.
  // Example:
  // {
  //   name: "KFSCIS",
  //   image: "/images/partners/KFSCIS_Logo.png",
  //   link: "https://www.cis.fiu.edu/",
  // },
];

export default function Sponsors() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Sponsors */}
      <div>
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-witcon-pink">
            Our supporters
          </p>

          <h2 className="font-display text-4xl font-bold text-witcon-deep-forest sm:text-5xl">
            Sponsors
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-witcon-deep-forest/70 sm:text-lg">
            We are grateful to the organizations that support WiTCON and
            help us create meaningful opportunities for students and the
            technology community.
          </p>
        </div>

        {sponsors.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <SponsorTile key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-witcon-deep-forest/20 bg-witcon-sage/10 px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold text-witcon-deep-forest/70">
              Sponsor logos coming soon
            </p>
          </div>
        )}
      </div>

      {/* Community Partners */}
      <div className="mt-20">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-witcon-pink">
            Growing together
          </p>

          <h2 className="font-display text-4xl font-bold text-witcon-deep-forest sm:text-5xl">
            Community Partners
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-witcon-deep-forest/70 sm:text-lg">
            WiTCON is made possible through the support of organizations
            and communities that believe in creating a more inclusive
            future in technology.
          </p>
        </div>

        {communityPartners.length > 0 ? (
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {communityPartners.map((partner) => (
              <PartnerTile key={partner.name} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-witcon-deep-forest/20 bg-witcon-sage/10 px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold text-witcon-deep-forest/70">
              Community partners coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="flex h-32 items-center justify-center rounded-2xl border border-witcon-deep-forest/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:h-36">
      {sponsor.image ? (
        <img
          src={sponsor.image}
          alt={`${sponsor.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-center font-semibold text-witcon-deep-forest/60">
          {sponsor.name}
        </span>
      )}
    </div>
  );

  if (!sponsor.link) {
    return content;
  }

  return (
    <a
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
    >
      {content}
    </a>
  );
}

function PartnerTile({ partner }: { partner: CommunityPartner }) {
  const content = (
    <div className="flex h-32 w-full max-w-sm items-center justify-center rounded-2xl border border-witcon-deep-forest/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:h-36">
      {partner.image ? (
        <img
          src={partner.image}
          alt={`${partner.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-center font-semibold text-witcon-deep-forest/60">
          {partner.name}
        </span>
      )}
    </div>
  );

  if (!partner.link) {
    return content;
  }

  return (
    <a
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${partner.name}`}
    >
      {content}
    </a>
  );
}