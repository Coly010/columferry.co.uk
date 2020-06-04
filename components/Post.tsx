import { BlogPost } from '../interfaces/blog-post';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

type Props = {
  post: BlogPost;
};

const Post: React.FunctionComponent<Props> = ({ post }) => (
  <>
    <a href={post.url} target="_blank">
      <div className="xs:w-4/5 sm:w-3/4 mx-auto bg-teal-100 my-4 text-teal-900 rounded overflow-hidden shadow-base">
        {post.coverImage ? (
          <img className="w-full" src={post.coverImage} alt={post.title}></img>
        ) : (
          ''
        )}
        <div className="px-6 pt-4 pb-1">
          <div className="font-bold text-xl mb-1">{post.title}</div>
        </div>
        <div className="px-8 py-1 w-40 flex justify-around text-center">
          <div className="w-4 inline">
            <span>
              <FontAwesomeIcon icon={faCommentDots} className="mx-auto" fixedWidth />
            </span>
            <span>{post.comments}</span>
          </div>
          <div className="w-4 inline">
            <span>
              <FontAwesomeIcon icon={faThumbsUp} className="mx-auto" fixedWidth />
            </span>
            <span>{post.reactions}</span>
          </div>
        </div>
        <div className="px-6 py-4 text-right">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-indigo-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 my-1 mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  </>
);

export default Post;
