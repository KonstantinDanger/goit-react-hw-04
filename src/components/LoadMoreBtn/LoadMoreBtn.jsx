import css from "./LoadMoreBtn.module.css";

export default function LoadMoreButton({ onLoadMore }) {
  return (
    <button className={css.loadMoreButton} onClick={onLoadMore}>
      Load more
    </button>
  );
}
