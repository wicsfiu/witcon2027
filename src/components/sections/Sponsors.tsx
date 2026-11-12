import akamaiLogo from "../../assets/logos/akamai.svg";
import googleLogo from "../../assets/logos/google.svg";
import microsoftLogo from "../../assets/logos/microsoft.svg";
import ukgLogo from "../../assets/logos/ukg.svg";
import fordLogo from "../../assets/logos/ford.svg";

// Replace these with your actual pond background asset paths when ready
// import pondAssetMobile from "../../assets/stickers/pond-mobile.svg";
// import pondAssetDesktop from "../../assets/stickers/pond-desktop.svg";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

export default function Sponsors() {
  const sponsors: Sponsor[] = [
    { id: 1, name: "Akamai", logo: akamaiLogo },
    { id: 2, name: "Google", logo: googleLogo },
    { id: 3, name: "Microsoft", logo: microsoftLogo },
    { id: 4, name: "UKG", logo: ukgLogo },
    { id: 5, name: "Akamai", logo: akamaiLogo },
    { id: 6, name: "Ford", logo: fordLogo },
    { id: 7, name: "Microsoft", logo: microsoftLogo },
    { id: 8, name: "UKG", logo: ukgLogo },
    { id: 9, name: "Ford", logo: fordLogo },
    { id: 10, name: "Google", logo: googleLogo },
  ];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 md:px-16 md:py-24">
      
      {/* Section Title */}
      <h2 className="mb-8 text-center font-emilys-candy text-4xl tracking-wide text-[color:var(--color-hot-pink)] md:mb-12 md:text-5xl">
        Past Sponsors
      </h2>

      {/* Pond Container */}
      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center p-6 sm:p-10 md:p-14">
        
        {/* Placeholder / Background Pond Asset Layer */}
        {/* Uncomment once your SVG is ready:
        <img 
          src={pondAssetMobile} 
          alt="" 
          className="block md:hidden absolute inset-0 w-full h-full object-contain pointer-events-none select-none" 
        />
        <img 
          src={pondAssetDesktop} 
          alt="" 
          className="hidden md:block absolute inset-0 w-full h-full object-contain pointer-events-none select-none" 
        />
        */}

        {/* Lily Pads (2x5 on Mobile, 5x2 on Desktop) */}
        <div className="relative z-10 grid w-full max-w-2xl grid-cols-2 gap-x-8 gap-y-10 md:max-w-5xl md:grid-cols-5 md:gap-x-6 md:gap-y-14">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className={`flex flex-col items-center justify-center text-center ${
                index % 2 === 1
                  ? "translate-y-4 md:translate-y-6"
                  : "-translate-y-2 md:translate-y-0"
              }`}
            >
              {/* Lily Pad Circle / Sponsor Node */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white p-4 shadow-md transition hover:scale-105 sm:h-28 sm:w-28 md:h-28 md:w-28 lg:h-32 lg:w-32">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}