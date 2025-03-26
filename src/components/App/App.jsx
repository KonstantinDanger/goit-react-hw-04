import fetchImages, { imagesPerPage } from "../../api/axios-api";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../ImageModal/ImageModal.jsx";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreButton from "../LoadMoreBtn/LoadMoreBtn.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [previousQuery, setPreviousQuery] = useState("");
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (imageId) => {
    const targetImage = images.find((image) => image.id === imageId);

    if (!targetImage || targetImage === modalImage) return;

    setModalImage(targetImage);
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const fetchData = async (query, page) => {
    try {
      setIsLoading(true);
      setShowError(false);

      const data = await fetchImages(query, page);
      const fetchedImages = data.results;

      const currentPageIsLast = data.total <= page * imagesPerPage;
      setCanLoadMore(!currentPageIsLast);

      return fetchedImages;
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (currentQuery) => {
    if (currentQuery === previousQuery) return;
    setImages([]);
    setPage(1);
    const fetchedImages = await fetchData(currentQuery, 1);
    setImages([...fetchedImages]);
    setPreviousQuery(currentQuery);
  };

  const handleLoadMoreImages = async () => {
    const nextPage = page + 1;
    const fetchedImages = await fetchData(previousQuery, nextPage);
    setImages([...images, ...fetchedImages]);
    setPage(nextPage);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSubmit} />

      {showError ? (
        <ErrorMessage
          message={"Something went wrong. Please, refresh the page."}
        />
      ) : images.length > 0 ? (
        <div>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {canLoadMore && !isLoading && (
            <LoadMoreButton onLoadMore={handleLoadMoreImages} />
          )}
        </div>
      ) : (
        previousQuery &&
        !isLoading && <ErrorMessage message={"No results found"}></ErrorMessage>
      )}

      <ClipLoader
        loading={isLoading}
        color="light blue"
        size={50}
        cssOverride={{ display: "block", margin: "auto" }}
      />
      <Modal
        isOpen={isModalOpen}
        image={modalImage}
        onRequestClose={closeModal}
      />
    </>
  );
}

export default App;
