import { BlogPost } from '../interfaces/blog-post';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

type Props = {
  post: BlogPost;
};

const Post: React.FunctionComponent<Props> = ({ post }) => (
  <>
    <a href={post.url} target="_blank" className="xs:w-4/5 sm:w-1/2 md:w-1/4 bg-green-100 mx-1 my-4 rounded">
      <div className="bg-green-100 h-full text-gray-900 overflow-hidden shadow-base rounded flex flex-col justify-between">
        {post.coverImage ? (
          <img className="w-full" src={post.coverImage} alt={post.title}></img>
        ) : (
          ''
        )}
        <div className="px-3 pt-4 pb-1">
          <div className="font-bold sm:text-2xl xs:text-lg mb-1">{post.title}</div>
        </div>
        <div className="px-3 py-1 w-20 flex justify-between text-center">
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
        <div className="px-3 xs:py-1 sm:py-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-purple-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-100 my-1 mr-2"
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
