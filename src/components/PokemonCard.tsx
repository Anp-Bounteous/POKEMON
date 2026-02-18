import React from "react";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, imageUrl }) => {
  const smallImageUrl = `${imageUrl}?format=webp`; // Use WebP format
  const largeImageUrl = smallImageUrl;

  return (
    <div className="pokemon-card p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-center text-xl font-bold mb-4">{name}</h2>
      <picture>
        <source srcSet={`${smallImageUrl} 300w, ${largeImageUrl} 800w`} type="image/webp" />
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-auto rounded-lg"
          srcSet={`${imageUrl} 300w, ${imageUrl} 800w`}
          sizes="(max-width: 600px) 300px, 800px"
          loading="lazy" // Lazy load images
        />
      </picture>
    </div>
  );
};

export default React.memo(PokemonCard); // Memoize for static components
