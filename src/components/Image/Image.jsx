import css from "./Image.module.css";

export default function Image({ src, alt, id }) {
  return <img className={css.image} src={src} alt={alt} id={id} />;
}
