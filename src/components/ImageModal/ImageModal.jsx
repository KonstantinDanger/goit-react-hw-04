import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    image && (
      <ReactModal
        className={css.modal}
        overlayClassName={css.overlay}
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onRequestClose}
        contentLabel={image.alt_description}
      >
        <div className={css.container}>
          <img
            onClick={(e) => e.stopPropagation()}
            className={css.modalImage}
            src={image.urls.full}
            alt={image.alt_description}
          />
          <p className={css.modalLabel}>{image.alt_description}</p>
        </div>
      </ReactModal>
    )
  );
}
