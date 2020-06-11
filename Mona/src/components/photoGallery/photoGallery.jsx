import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const PhotoGallery = ({ photos }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    // Настройка сетки для отображения изображений
    const settings = [{ width: 4, height: 3 }, { width: 4, height: 3 }, { width: 3, height: 2 }, { width: 3, height: 2 }, { width: 3, height: 2 },
        { width: 4, height: 1 }];

    const photosObjects = photos.map((image, index) => ({
        src: `https://image.tmdb.org/t/p/w780${image}`,
        width: settings[index % settings.length].width,
        height: settings[index % settings.length].height
    }));

    return (
        <div>
            <Gallery photos={photosObjects} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photosObjects.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default PhotoGallery;