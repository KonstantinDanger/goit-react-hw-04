import css from "./ImageCard.module.css";

export default function Image({ image, onImageClick }) {
  const handleImageClick = () => {
    onImageClick(image.id);
  };

  return (
    <img
      className={css.image}
      src={image.urls.small}
      alt={image.alt_description}
      id={image.id}
      onClick={handleImageClick}
    />
  );
}
