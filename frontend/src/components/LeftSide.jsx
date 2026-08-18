// LeftSide.jsx

// This component displays the left side of the authentication pages.
// It contains the background image, platform title,
// short description and platform features.

function LeftSide({ image, title, subtitle }) {

    // Platform Features
    const features = [
        "AI Fabric Recognition",
        "Waste Analytics",
        "Inventory Management",
        "Sustainability Reports",
        "Circular Economy"
    ];

    return (
        <div
            className="hidden lg:flex w-1/2 relative bg-cover bg-center "
            style={{
                backgroundImage: `url(${image})`
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 text-white p-14 flex flex-col justify-between h-full">
                <div>
                    <h1 className="text-5xl font-bold text-sky-700">
                        🌿 EcoWeave AI
                    </h1>

                    <h2 className="mt-12 text-4xl font-bold leading-tight">
                        {title}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        {subtitle}
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-6">
                        Platform Features
                    </h3>

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center mb-4"
                        >
                            <span className="text-green-400 text-xl">✔</span>
                            <span className="ml-4">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeftSide;