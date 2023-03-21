import useIpfs from "hooks/useIpfs";
import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import checkInViewIntersectionObserver from "utils/isInViewPortIntersectionObserver";
import PlaceIcon from "./PlaceIcon";
import axios from "axios";

const RenderPoem: FC<{ src: string }> = ({ src }) => {
  const [content, setContent] = useState<string[]>([]);
  useEffect(() => {
    axios.get(src).then((res) => {
      const { data } = res;
      setContent(data.split("\n"));
    });
  }, []);

  return (
    <div className="h-fit">
      <div className={`grid grid-cols-2 items-center poem-box rounded-3xl max-h-52`}>
        {content.map((item, index) => (
          <p key={index} className="leading-relaxed prose prose-xl Montserrat">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  contentType?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  contentType,
  ...args
}) => {
  const _containerRef = useRef(null);
  let _imageEl: HTMLImageElement | null = null;

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const _checkInViewPort = () => {
    if (!_containerRef.current) return;
    checkInViewIntersectionObserver({
      target: _containerRef.current as any,
      options: {
        root: null,
        rootMargin: "0%",
        threshold: 0,
      },
      freezeOnceVisible: true,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src) {
      _handleImageLoaded();
      return true;
    }
    _imageEl = new Image();
    if (_imageEl) {
      _imageEl.src = src;
      _imageEl.addEventListener("load", _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    setImageLoaded(true);
    set__src(src);
  };

  useEffect(() => {
    _checkInViewPort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  if (!contentType || contentType.includes("image")) {
    return (
      <div
        className={` ${containerClassName}`}
        data-nc-id="NcImage"
        ref={_containerRef}
      >
        {__src && imageLoaded ? (
          <img src={__src} className={className} alt={alt} {...args} />
        ) : (
          renderLoadingPlaceholder()
        )}
      </div>
    );
  }

  if (contentType.includes("text")) {
    return (
      <div data-nc-id="NcImage">
        <RenderPoem src={src} />
      </div>
    );
  }

  return <div data-nc-id="NcImage">{renderLoadingPlaceholder()}</div>;
};

export default NcImage;
