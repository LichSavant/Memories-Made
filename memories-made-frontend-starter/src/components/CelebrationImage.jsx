export default function CelebrationImage({ item }) {
  return (
    <div className="editorial-image">
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        width="1600"
        height="1000"
        style={{ objectPosition: item.position }}
      />
    </div>
  );
}
