import "./Post.css";

export const Post = ({ title, desc, img, tags, createdBy }) => {
  return (
    <div className="post">
      <img src={img} alt={title} loading="lazy"/>
      <div className="post-infos">
        <h2 className="heading-sm"> {title}</h2>
        <p>{desc}</p>
        <div className="tags">
          {tags.map((tag) => (
            <p key={tag}>#{tag}</p>
          ))}
        </div>
        <small>{createdBy}</small>
      </div>
    </div>
  );
};
