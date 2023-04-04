
import goldFrame from "../images/frame.gif";
import galleryImage_1 from "../gallery/1.gif";
import galleryImage_2 from "../gallery/2.gif";
import galleryImage_3 from "../gallery/3.gif";
import galleryImage_4 from "../gallery/4.gif";
import galleryImage_5 from "../gallery/5.gif";
import galleryImage_6 from "../gallery/6.gif";
import galleryImage_7 from "../gallery/7.gif";
import galleryImage_8 from "../gallery/8.gif";

function Gallery() {
    
    return (
        <header>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <div>
                <img className="gallery-image-1" src={galleryImage_1} alt="" />
                <img className="gold-frame-gallery-image-1" src={goldFrame} alt="" />
                <img className="gallery-image-2" src={galleryImage_2} alt="" />
                <img className="gold-frame-gallery-image-2" src={goldFrame} alt="" />
                <img className="gallery-image-3" src={galleryImage_3} alt="" />
                <img className="gold-frame-gallery-image-3" src={goldFrame} alt="" />
                <img className="gallery-image-4" src={galleryImage_4} alt="" />
                <img className="gold-frame-gallery-image-4" src={goldFrame} alt="" />
                <img className="gallery-image-5" src={galleryImage_5} alt="" />
                <img className="gold-frame-gallery-image-5" src={goldFrame} alt="" />
                <img className="gallery-image-6" src={galleryImage_6} alt="" />
                <img className="gold-frame-gallery-image-6" src={goldFrame} alt="" />
                <img className="gallery-image-7" src={galleryImage_7} alt="" />
                <img className="gold-frame-gallery-image-7" src={goldFrame} alt="" />
                <img className="gallery-image-8" src={galleryImage_8} alt="" />
                <img className="gold-frame-gallery-image-8" src={goldFrame} alt="" />
            </div>
        </header>
    );
}

export default Gallery;