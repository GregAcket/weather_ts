import { styled } from "styled-components";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const StyledList = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 5px;
`;

type PhotosProps = {
  photo: Basic;
};

export default function Pictures({ image }: { image: Basic[] }) {
  console.log(image);
  const PhotoComp = ({ photo }: PhotosProps) => {
    const { user, urls, alt_description } = photo;

    if (alt_description !== null) {
      return (
        <>
          <img src={urls.small} alt={alt_description} />
          <a
            className="credit"
            target="_blank"
            rel="noreferrer"
            href={`https://unsplash.com/@${user.username}`}
          >
            {user.name}
          </a>
        </>
      );
    }
  };

  const Frame = image.map((photo) => {
    return (
      <StyledList key={photo.id}>
        <PhotoComp photo={photo} />
      </StyledList>
    );
  });

  return <>{Frame}</>;
}
