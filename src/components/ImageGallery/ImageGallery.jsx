import Image from "../Image/Image";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images }) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <Image
              src={image.urls.small}
              alt={image.alt_description}
              id={image.id}
            />
          </li>
        );
      })}
    </ul>
  );
}
